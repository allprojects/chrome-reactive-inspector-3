// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.

// channel is created when we open dev tool and move to our panel
let currentAction = "";
let tempNode = {
    'type': '',
    'nodeName': '',
    'nodeId': '',
    'nodeValue': ''
};

let allNodes = [];
let allEdges = [];

(function createChannel() {
    console.log("creating channel in messaging js that is part of panel ");
    //Create a port with background page for continuous message communication
    let port = chrome.extension.connect({
        name: "reactive-debugger" //Given a Name
    });

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
        history.clear();
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
        let id = message.content.nodeId;
        let node = {};
        let previousNode = g.node(id);

        if (previousNode !== undefined) {
            // node already existed
            node = previousNode;
            currentAction = "updateNode";
        } else {
            currentAction = "newNode";
        }

        // fill with new data

        let truncatedVal = "";
        let value = getOrDefault(message.content.nodeValue, node.value);
        if (value || typeof value !== "undefined" && typeof value.toString === "function") {
            // "0", "false" and "" are falsy but should be shown non the less.
            value = value.toString();
            truncatedVal = value.substring(0, 25);
        }

        node = {
            label: "",
            labelType: "html",
            ref: getOrDefault(message.content.nodeRef, node.ref),
            value: value,
            type: getOrDefault(message.content.nodeType, node.type),
            method: getOrDefault(message.content.nodeMethod, node.method),
            nodeId: id,
            sourceInfo: getOrDefault(message.content.sourceInfo, node.sourceInfo),
            class: ""
        };

        // the new or updated node will have the class "current"
        node.class = "current " + (node.ref ? "nodeWithRef" : "nodeWithoutRef");
        node.label = getNodeLabel(id, node.ref, truncatedVal);

        // clear current from previous nodes
        _.each(g.nodes(), function (n) {
            let node = g.node(n);
            // replace class on graph node, not just via DOM to make it persistent
            node.class = node.class.replace(/current/g, "");
        });

        g.setNode(id, node);

        // update tempNode
        tempNode.type = previousNode !== undefined ? 'nodeUpdated' : 'nodeCreated';
        tempNode.nodeId = id;
        tempNode.nodeName = node.ref;
        tempNode.nodeValue = truncatedVal;

        // capture current dependency graph
        let stageId = saveStageAndAdvance(currentAction);
        saveHistory(stageId, currentAction, tempNode);
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

        let stageId = saveStageAndAdvance("saveEdge");
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
        let stageId = saveStageAndAdvance("saveEdge");
        saveHistory(stageId, "saveEdge", message.content)
    }
}());

function getOrDefault(newValue, defaultValue) {
    if (!newValue || newValue.length === 0) {
        return defaultValue
    }
    return newValue;
}

let isConfirmed = false;

// this method is to capture all nodes and edges save the graph to the history.
function saveStageAndAdvance(event) {
    let stageId = history.saveStage(g, event);

    let lastStageId = history.getStageCount();

    // Here we should increase steps count in step slider
    rxSlider.slider("option", "min", 0);
    rxSlider.slider("option", "max", lastStageId);
    // this will cause the value changed event to fire and thus load and render the new stage.
    rxSlider.slider("option", "value", lastStageId);
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
    return stageId;
}

let historyEntries = [];

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


