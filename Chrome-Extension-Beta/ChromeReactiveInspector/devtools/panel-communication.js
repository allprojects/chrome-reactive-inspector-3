// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
// channel is created when we open dev tool and move to our panel.

var cri = cri || {};

(function() {
    console.log("creating channel in messaging js that is part of panel ");

    // create a port with background page for continuous message communication
    let port = chrome.runtime.connect({name: "reactive-debugger"});

    let handlers = {
        // loading is called on page refresh,
        // then reset the graph and slider and load it again.
        loading() {
            cri.graphManager.clearGraph();
            cri.adjustSlider(0);
            // Send current tabId to background page. Also trigger injection.
            // signal background page that everything is cleaned up and the injection can begin.
            port.postMessage({
              tabId: chrome.devtools.inspectedWindow.tabId,
              action: "inject"
            });
        },

        saveNode(message) {
//            console.log(message);
            let id = message.content.nodeId;
            let previousNode = cri.graphManager.graph.node(id) || {};
            let currentAction = previousNode === undefined ? "nodeCreated" : "nodeUpdated";

            let truncatedVal = "";
            let value = message.content.nodeValue || previousNode.value;
            if (value || value !== undefined && typeof value.toString === "function") {
                // "0", "false" and "" are falsy but should be shown non the less.
                value = value.toString();
                truncatedVal = value.substring(0, 25);
            }

            // the new or updated node will have the class "current"
            let node = {
                class: (message.content.nodeRef ? " nodeWithRef" : " nodeWithoutRef")
                     + (message.content.sourceInfo ? " has-source-info" : ""),
                label: getNodeLabel(node, truncatedVal),
                labelType: "html",
                value: value,
                nodeId: id,
                nodeUpdates: (previousSavedNode.nodeUpdates || 0) + 1,
                ref: message.content.nodeRef, // || node.ref,
                type: message.content.nodeType, // || node.type,
                method: message.content.nodeMethod, // || node.method,
                sourceInfo: message.content.sourceInfo, // || node.sourceInfo,
            };

            // mark only this node as 'current'
            node.class += " current";
            cri.graphManager.graph.nodes().forEach(n => {
                let node = cri.graphManager.graph.node(n);
                node.class = node.class.replace(/current/g, "");
            });

            cri.graphManager.graph.setNode(id, node);

            // capture current dependency graph
            let tempNode = {};
            tempNode.type = currentAction;
            tempNode.nodeId = message.content.nodeId;
            tempNode.nodeName = node.ref;
            tempNode.nodeValue = truncatedVal;
            saveStageAndAdvance(currentAction, node, tempNode);
        },

        saveEdge(message) {
            if (!message.content.edgeStart || !message.content.edgeEnd) {
                console.error("Tried to save edge with start or end not set.");
            }

            // clear current from previous nodes
            _.each(cri.graphManager.graph.edges(), function (e) {
                let edge = cri.graphManager.graph.edge(e);
                if (edge.class) {
                    // replace class on graph edge, not just via DOM to make it persistent
                    edge.class = edge.class.replace(/current/g, "");
                }
            });

            cri.graphManager.graph.setEdge(message.content.edgeStart, message.content.edgeEnd, {
                class: "current",
                label: message.content.edgeLabel
            });

            saveStageAndAdvance("dependencyCreated", message.content, message.content);
        },

        updateSavedEdge(message) {
            _.find(cri.historyEntries, function (history) {
                if (history.type === 'dependencyCreated') {
                    if (history.endNodeId === message.content.id) {
                        history.endNodeName = message.content.name
                    }
                    else if (history.startNodeId === message.content.id) {
                        history.startNodeName = message.content.name
                    }
                }
            });
        },

        allNodesAndEdges(message) {
            allNodes = message.content.nodes;
            allEdges = message.content.edges;
        },

        removeEdge(message) {
            cri.graphManager.graph.removeEdge(message.content.edgeStart, message.content.edgeEnd, message.content.edgeLabel);
            saveStageAndAdvance("removeEdge", message.content, message.content);
        },

        scriptNames(message) {
            let scriptNames = message.content.names;
            initIncludeTokenField(scriptNames);
        },
   }

    // force clear. This is necessary if the inspector is closed and opened on the same page later.
    handlers.loading();

    function handleGraphMessage(message) {
//        console.log("panel received: ", message);
        let handler = handlers[message.action];
        if (handler) handler(message)
        else console.warn("Unknown message received. '" + message.action + "' is not implemented. (panel)");
    }

    // listen to messages from the background page
    port.onMessage.addListener(event => {
//        console.log("panel received by port:")
        handleGraphMessage(event)
    });

// david: i thought it is impossible for panel to receive from content?
//    // listen to messages from content
//    window.addEventListener("message", event => {
////        console.log("panel received by message", event);
//        handleGraphMessage(event.data);
//    });

// david: unreliable because the extensions id changes on each computer
//    // listen to messages from external
//    chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
////        console.log("panel received by external: ", request, sender);
//        handleGraphMessage(request);
////        sendResponse("yay")
//    });

//    function getOrDefault(newValue, defaultValue) {
//        return !newValue || newValue.length === 0 ? defaultValue : newValue;
//    }

    // this method is to capture all nodes and edges save the graph to the history.
    function saveStageAndAdvance(action, data, value) {
        let stageId = cri.history.saveStage(cri.graphManager.graph, {event: action, data: data});

        // Here we should increase steps count in step slider
        // this will cause the value changed event to fire and thus load and render the new stage.
        cri.adjustSlider(stageId);

        if (action === 'dependencyCreated')
            cri.historyEntries.push({
                'stageId': stageId,
                'type': 'dependencyCreated',
                'startNodeName': value.edgeStartName,
                'startNodeId': value.edgeStart,
                'endNodeName': value.edgeEndName,
                'endNodeId': value.edgeEnd
            })
        else
            cri.historyEntries.push({
                'stageId': stageId,
                'type': value.type,
                'nodeName': value.nodeName,
                'nodeId': value.nodeId,
                'nodeValue': value.nodeValue
            })
    }

    function getNodeLabel(node, truncatedValue) {
        let lines = [];
        if (node.nodeId) lines.push("Id: " + node.nodeId);
        if (node.type != "Evt" && node.type != "Event" && truncatedValue)
          lines.push("Value: " + truncatedValue)
        // wrap in html to ensure valid html
        return $("<div>").append(lines.join("<br />")).html();
    }

    // export
    cri.allNodes = [];
    cri.allEdges = [];

}());

