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
    let port = chrome.runtime.connect({
        name: "reactive-debugger" //Given a Name
    });

    // force clear. This is necessary if the inspector is closed and opened on the same page later.
    handleLoading();
    // Send current tabId to background page. Also trigger injection.
    port.postMessage({
        tabId: chrome.devtools.inspectedWindow.tabId,
        action: "inject"
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {

        switch (message.action) {
            case "loading":
                // If the user refreshes the page, then reset the graph and slider and load it again.
                handleLoading();
                // signal background page that everything is cleaned up and the injection can begin.
                port.postMessage({action: "inject"});
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
            case "scriptNames":
                handleScriptNames(message);
                break;
            default:
                console.warn("Unknown message received. '" + message.action + "' is not implemented. (panel)");
        }
    });

    function handleLoading() {
        graphManager.clearGraph();
        adjustSlider(0, 0);
    }

    function handleSaveNode(message) {
        let id = message.content.nodeId;
        let node = {};
        let previousNode = graphManager.graph.node(id);

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
        node.class = "current"
            + (node.ref ? " nodeWithRef" : " nodeWithoutRef")
            + (node.sourceInfo ? " has-source-info" : "");
        node.label = getNodeLabel(id, node.ref, truncatedVal);

        let previousSavedNode = graphManager.getNode(id);
        if (previousSavedNode) {
            node.nodeUpdates = previousSavedNode.nodeUpdates + 1;
        } else {
            node.nodeUpdates = 1;
        }

        // clear current from previous nodes
        _.each(graphManager.graph.nodes(), function (n) {
            let node = graphManager.graph.node(n);
            // replace class on graph node, not just via DOM to make it persistent
            node.class = node.class.replace(/current/g, "");
        });

        graphManager.graph.setNode(id, node);

        // update tempNode
        tempNode.type = previousNode !== undefined ? 'nodeUpdated' : 'nodeCreated';
        tempNode.nodeId = id;
        tempNode.nodeName = node.ref;
        tempNode.nodeValue = truncatedVal;

        // capture current dependency graph
        let stageId = saveStageAndAdvance(currentAction, node);
        saveHistory(stageId, currentAction, tempNode);
    }

    function handleSaveEdge(message) {
        if (!message.content.edgeStart || !message.content.edgeEnd) {
            console.error("Tried to save edge with start or end not set.");
        }

        // clear current from previous nodes
        _.each(graphManager.graph.edges(), function (e) {
            let edge = graphManager.graph.edge(e);
            if (edge.class) {
                // replace class on graph edge, not just via DOM to make it persistent
                edge.class = edge.class.replace(/current/g, "");
            }
        });

        graphManager.graph.setEdge(message.content.edgeStart, message.content.edgeEnd, {
            class: "current",
            label: message.content.edgeLabel
        });

        let stageId = saveStageAndAdvance("saveEdge", message.content);
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
        graphManager.graph.removeEdge(message.content.edgeStart, message.content.edgeEnd, message.content.edgeLabel);
        let stageId = saveStageAndAdvance("removeEdge", message.content);
        saveHistory(stageId, "removeEdge", message.content)
    }

    function handleScriptNames(message) {
        let scriptNames = message.content.names;
        initIncludeTokenField(scriptNames);
    }
}());

function getOrDefault(newValue, defaultValue) {
    if (!newValue || newValue.length === 0) {
        return defaultValue
    }
    return newValue;
}

// this method is to capture all nodes and edges save the graph to the history.
function saveStageAndAdvance(event, data) {
    let stageId = history.saveStage(graphManager.graph, {event: event, data: data});

    let lastStageId = history.getStageCount();

    // Here we should increase steps count in step slider
    // this will cause the value changed event to fire and thus load and render the new stage.
    adjustSlider(lastStageId, lastStageId);
    return stageId;
}

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


