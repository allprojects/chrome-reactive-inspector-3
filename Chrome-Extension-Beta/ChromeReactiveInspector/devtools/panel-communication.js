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
            let previousNode = cri.graphManager.graph.node(message.content.nodeId) || {};
            message.content.nodeUpdates = (previousNode.nodeUpdates || 0) + 1

            saveStageAndAdvance("saveNode", message.content);
            cri.graphManager.graph.setNode(message.content.nodeId, cri.inflateNode(message.content)); // update node
        },

        saveEdge(message) {
            if (!message.content.edgeStart || !message.content.edgeEnd)
                console.error("Tried to save edge with start or end not set.");

            // clear current from previous nodes
            cri.graphManager.graph.edges().forEach(e => {
                let edge = cri.graphManager.graph.edge(e);
                // replace class on graph edge, not just via DOM to make it persistent
                if (edge.class) edge.class = edge.class.replace(/current/g, "");
            });

            cri.graphManager.graph.setEdge(message.content.edgeStart, message.content.edgeEnd, {
                class: "current",
                label: message.content.edgeLabel
            });

            saveStageAndAdvance("saveEdge", message.content);
        },

//        updateSavedEdge(message) {
//            cri.historyEntries.find(history => {
//                if (history.type === 'dependencyCreated') {
//                    if (history.endNodeId === message.content.id) {
//                        history.endNodeName = message.content.name
//                    } else if (history.startNodeId === message.content.id) {
//                        history.startNodeName = message.content.name
//                    }
//                }
//            });
//        },

        allNodesAndEdges(message) {
            allNodes = message.content.nodes;
            allEdges = message.content.edges;
        },

        removeEdge(message) {
            cri.graphManager.graph.removeEdge(message.content.edgeStart, message.content.edgeEnd, message.content.edgeLabel);
            saveStageAndAdvance("removeEdge", message.content);
        },

//        scriptNames(message) {
//            let scriptNames = message.content.names;
//            initIncludeTokenField(scriptNames);
//        },
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
    port.onMessage.addListener(handleGraphMessage);

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
    function saveStageAndAdvance(action, message) {
        let stageId = cri.history.saveStage({event: action, data: message});

        // Here we should increase steps count in step slider
        // this will cause the value changed event to fire and thus load and render the new stage.
        cri.adjustSlider(stageId);

        cri.historyEntries.push({ stageId: stageId, nodeType: action, ...message })
    }

    function getNodeLabel(node, truncatedValue) {
        let lines = [];
        if (node.nodeId) lines.push("Id: " + node.nodeId);
//        if (node.type != "Evt" && node.type != "Event" && truncatedValue)
        lines.push("Value: " + truncatedValue)
        // wrap in html to ensure valid html
        return $("<div>").append(lines.join("<br />")).html();
    }

    // export
    cri.allNodes = [];
    cri.allEdges = [];
    cri.inflateNode = function (message) {
        let node = {
             // the new or updated node will have the class "current"
            class: ""
                 + (message.nodeRef ? " nodeWithRef" : " nodeWithoutRef")
//                 + (message.sourceInfo ? " has-source-info" : "")
            ,
            labelType: "html", label: "",
//            value: value,
            nodeUpdates: message.nodeUpdates,
            nodeId: message.nodeId,
//            ref: message.nodeRef, // || node.ref,
//            method: message.nodeMethod, // || node.method,
//            sourceInfo: message.sourceInfo, // || node.sourceInfo,
        };

        let value = message.nodeValue; // || previousNode.value;
        if (value !== undefined) value = (""+value).substring(0, 25);
        node.label = getNodeLabel(node, value);

        // mark only this node as 'current'
        node.class += " current";
        cri.graphManager.graph.nodes().forEach(n => {
            let node = cri.graphManager.graph.node(n);
            node.class = (node.class || "").replace(/current/g, "");
        });

        return node
    }

}());

