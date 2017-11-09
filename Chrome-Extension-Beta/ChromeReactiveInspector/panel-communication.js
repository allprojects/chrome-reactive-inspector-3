// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.

// channel is created when we open dev tool and move to our panel
var rxGraphStages = [];
var _node = '';
var currentAction = "";
var tempNode = {
    'type': '',
    'nodeName': '',
    'nodeId': '',
    'nodeValue': ''
};

var allNodes = [];
var allEdges = [];

(function createChannel() {
    console.log("creating channel in messaging js that is part of panel ");
    //Create a port with background page for continuous message communication
    let port = chrome.extension.connect({
        name: "reactive-debugger" //Given a Name
    });

    console.log(rxGraphStages);
    // Send current tabId to background page
    port.postMessage(
        Object.assign({
            tabId: chrome.devtools.inspectedWindow.tabId
        })
    );

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {

        switch (message.action) {
            case "loading":
                // If the user refreshes the page, then reset the graph and slider and load it again.
                handleLoading();
                break;
            case "saveNode":
                handleSaveNode(message);
                break;
            case "saveEdge":
                handleSaveEdge(message);
                break;
            case "updateSavedEdge":
                handleUpdateSavedEdge(message);
                break;
            case "allNodesEdges":
                handleAllNodesAndEdges(message);
                break;
            case "removeEdge":
                handleRemoveEdge(message);
                break;
            default:
                console.warn("Unknown message received. '" + message.action + "' is not implemented. (panel)");
        }
    });

    function handleLoading() {
        if (rxSlider) {
            rxSlider.slider("option", "min", 0);
            rxSlider.slider("option", "max", 0);
            rxSlider.slider("option", "value", 0);
            rxSlider.slider("pips", "refresh");
        }
        initialiseGraph();
        rxGraphStages = [];
        historyEntries = [];
        isConfirmed = false;
        // chrome.storage.sync.get('cri_config_rec_status', function (items) {
        //     if (items.cri_config_rec_status !== undefined) {
        //         if (!items.cri_config_rec_status) {
        //             configRecStatusButton.click();
        //         }
        //     }
        // });
    }

    function handleSaveNode(message) {
        let currentNodeId = false;
        let truncatedVal = "";

        if (message.content.nodeId) {
            currentNodeId = message.content.nodeId;
        }

        if (g.node(message.content.nodeId) !== undefined) {
            currentAction = "updateNode";
            let node = g.node(message.content.nodeId);

            let prevRef = node.ref;
            let prevValue = node.value;
            let prevType = node.type;
            let prevMethod = node.method;

            let currentRef = message.content.nodeRef;
            let currentValue = message.content.nodeValue;
            let currentMethod = message.content.nodeMethod;
            let currentType = message.content.nodeType;


            let newRef = getOrDefault(currentRef, prevRef);
            let newValue = getOrDefault(currentValue, prevValue);
            let newSourceInfo = getOrDefault(message.content.sourceInfo, node.sourceInfo);
            let newMethod = getOrDefault(currentMethod, prevMethod);
            let newType = getOrDefault(currentType, prevType);


            if (newValue || newValue.constructor.name === 'Boolean') {
                newValue = newValue.toString();
                truncatedVal = newValue.substring(0, 25);
            }
            let currentClasses = "current";
            if (newRef !== "") {
                currentClasses = currentClasses + " nodeWithRef";
            } else {
                currentClasses = currentClasses + " nodeWithoutRef";
            }

            g.setNode(message.content.nodeId, {
                label: getNodeLabel(message.content.nodeId, newRef, truncatedVal),
                labelType: "html",
                ref: newRef,
                value: newValue,
                type: newType,
                method: newMethod,
                sourceInfo: newSourceInfo,
                nodeId: message.content.nodeId,
                class: currentClasses
            });

            tempNode.type = 'nodeUpdated';
            tempNode.nodeId = message.content.nodeId;
            tempNode.nodeName = newRef;
            tempNode.nodeValue = truncatedVal;
        }
        else {
            currentAction = "newNode";

            let currentClasses = "current";
            if (message.content.nodeRef !== "") {
                currentClasses = "current nodeWithRef";
            } else {
                currentClasses = "current nodeWithoutRef";
            }

            let tempVal = message.content.nodeValue;
            if (tempVal || tempVal.constructor.name === 'Boolean') {
                let newValue = tempVal.toString();
                truncatedVal = newValue.substring(0, 25);
            }

            g.setNode(message.content.nodeId, {
                label: getNodeLabel(message.content.nodeId, message.content.nodeRef, truncatedVal),
                labelType: "html",
                ref: message.content.nodeRef,
                value: message.content.nodeValue,
                type: message.content.nodeType,
                method: message.content.nodeMethod,
                nodeId: message.content.nodeId,
                sourceInfo: message.content.sourceInfo,
                class: currentClasses
            });
            tempNode.type = 'nodeCreated';
            tempNode.nodeId = message.content.nodeId;
            tempNode.nodeName = message.content.nodeRef;
            tempNode.nodeValue = message.content.nodeValue;
        }
        render(d3.select("svg g"), g);
        applyRxRyAttribute();
        applyNodeExtensions();

        // capture current dependency graph
        let stageId = captureGraphAndSaveAsNewStage(currentAction, currentNodeId);
        saveHistory(stageId, currentAction, tempNode)
    }

    function handleSaveEdge(message) {
        if (!message.content.edgeStart || !message.content.edgeEnd) {
            console.error("Tried to save edge with start or end not set.");
        }

        g.setEdge(message.content.edgeStart, message.content.edgeEnd, {
            label: message.content.edgeLabel
        });
        render(d3.select("svg g"), g);
        applyRxRyAttribute();

        let stageId = captureGraphAndSaveAsNewStage("saveEdge", false);
        saveHistory(stageId, "saveEdge", message.content)
    }

    function handleUpdateSavedEdge(message) {
        _.find(historyEntries, function (history) {
            if (history.type === 'dependencyCreated') {
                if (history.endNodeId === message.content.id) {
                    history.endNodeName = message.content.name
                }
                else if (history.startNodeId === message.content.id) {
                    history.startNodeName = message.content.name
                }
            }
        });
    }

    function handleAllNodesAndEdges(message) {
        allNodes = message.content.nodes;
        allEdges = message.content.edges;
    }

    function handleRemoveEdge(message) {
        g.removeEdge(message.content.edgeStart, message.content.edgeEnd, message.content.edgeLabel);
        render(d3.select("svg g"), g);
        applyRxRyAttribute();
        let stageId = captureGraphAndSaveAsNewStage("saveEdge", false);
        saveHistory(stageId, "saveEdge", message.content)
    }
}());

function getOrDefault(newValue, defaultValue) {
    if (!newValue || newValue.length === 0) {
        return defaultValue
    }
    return newValue;
}

var isConfirmed = false;

// this method is to capture all nodes and edges and add this as new stage in rxGraphStages
function captureGraphAndSaveAsNewStage(event, currentNodeId) {
    var tempStageId = '';
    var newStage = {
        "stageId": '',
        "stageEvent": '',
        "stageData": {
            "nodes": [],
            "edges": []
        }
    };

    newStage.stageEvent = event;
    newStage.stageId = rxGraphStages.length + 1;
    tempStageId = newStage.stageId;

    var nodeToPush = {};
    // get current nodes from graph
    d3.selectAll('g.node')
        .each(function (d) {
            var currentNodeEdges = g.nodeEdges(d);
            if (currentNodeEdges.length > 0) {
                currentNodeEdges.forEach(function (singleEdge) {
                    var edgeLabel = "";
                    if (g.edge(singleEdge).label) {
                        edgeLabel = g.edge(singleEdge).label;
                    }
                    newStage.stageData.edges.push({
                        "edgeStart": singleEdge.v,
                        "edgeEnd": singleEdge.w,
                        "edgeLabel": edgeLabel
                    });
                });

            }

            nodeToPush = g.node(d);

            // Check if its the current node, if yes set it as current node
            var tempClass = nodeToPush.class.replace(/current/g, '').replace(/normal/g, '').replace(/highlight/g, '').replace(/fade/g, '').trim();
            if (nodeToPush.nodeId === currentNodeId) {
                nodeToPush.class = nodeToPush.class + " current";
            } else {
                nodeToPush.class = tempClass + " normal";
            }
            newStage.stageData.nodes.push(_.clone(nodeToPush));
        });
    rxGraphStages.push(_.clone(newStage));
    // Here we should increase steps count in step slider
    rxSlider.slider("option", "min", 0);
    rxSlider.slider("option", "max", rxSlider.slider("option", "max") + 1);
    rxSlider.slider("option", "value", rxSlider.slider("option", "max"));
    rxSlider.slider("pips", "refresh");


    if (threshold && rxSlider.slider('value') > +threshold && !isConfirmed) {
        // setCriStatus($('#cri-rec-status'), 1);
        // sendObjectToInspectedPage(
        //     {
        //         action: "threshold",
        //         content: {
        //             "status": true
        //         }
        //     }
        // );
        // configRecStatusButton.click();
        $("#dialog").dialog("open");
        isConfirmed = true
    }
    return tempStageId
}

var historyEntries = [];

function saveHistory(stageId, type, value) {
    if (type !== 'saveEdge') {
        historyEntries.push({
            'stageId': stageId,
            'type': value.type,
            'nodeName': value.nodeName,
            'nodeId': value.nodeId,
            'nodeValue': value.nodeValue
        })

    } else {
        historyEntries.push({
            'stageId': stageId,
            'type': 'dependencyCreated',
            'startNodeName': value.edgeStartName,
            'startNodeId': value.edgeStart,
            'endNodeName': value.edgeEndName,
            'endNodeId': value.edgeEnd
        })
    }
}

function getNodeLabel(id, name, value) {
    let lines = [];
    if (id) {
        lines.push("Id: " + id);
    }
    if (name) {
        lines.push("Name: " + name);
    }
    if (value) {
        lines.push("Value: " + value)
    }
    // wrap in html to ensure valid html
    return $("<div>").append(lines.join("<br />")).html();
}

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message, sendResponse) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message, sendResponse);
}

// Listen to change in storage data
chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.sync.get("graphData", function (items) {
        console.log('Settings retrieved');
        console.log(items);
    });
});


