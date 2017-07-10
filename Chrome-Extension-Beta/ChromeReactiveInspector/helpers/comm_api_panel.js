// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
//
// In this example, messages are JSON objects
// {
//   action: ['code'|'script'|'message'], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

// channel is created when we open dev tool and move to our panel
var rxGraphStages = [];
var _node = '';
var currentAction = "";
var tempNode = {
    'type':'',
    'nodeName': '',
    'nodeId': '',
    'nodeValue': ''
};
(function createChannel() {
    console.log("creating channel in messaging js that is part of panel ");
    //Create a port with background page for continuous message communication
    var port = chrome.extension.connect({
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
        /**
         * If the user refreshes the page, then reset the graph and slider and load it again.
         */
        if(message.action === 'loading'){
            if(rxSlider){
                rxSlider.slider("option", "min", 0);
                rxSlider.slider("option", "max", 0);
                rxSlider.slider("option", "value", 0);
                rxSlider.slider("pips", "refresh");
            }
            initialiseGraph();
            rxGraphStages = [];
            historyEntries = [];
        }

        var currentNodeId = false;
        var stageId = 0;
        if (message.action === "saveNode") {

            if (message.content.nodeId) {
                currentNodeId = message.content.nodeId;
            }


            if (g.node(message.content.nodeId) !== undefined) {
                currentAction = "updateNode";

                var prevRef = g.node(message.content.nodeId).ref;
                var prevValue = g.node(message.content.nodeId).value;
                var prevType = g.node(message.content.nodeId).type;
                var prevMethod = g.node(message.content.nodeId).method;
                var prevSourceCodeLine = g.node(message.content.nodeId).sourceCodeLine;

                var currentRef = message.content.nodeRef;
                var currentValue = message.content.nodeValue;
                var currentMethod = message.content.nodeMethod;
                var currentType = message.content.nodeType;
                var currentSourceCodeLine = message.content.sourceCodeLine;


                var newRef = '';
                if ((currentRef.length === 0) || (currentRef === undefined)) {
                    newRef = prevRef;
                } else {
                    newRef = currentRef;
                }

                var newValue = '';
                if (currentValue !== "") {
                    newValue = currentValue;
                } else {
                    newValue = prevValue;
                }

                var newSourceCodeLine = '';
                if (currentSourceCodeLine !== "") {
                    newSourceCodeLine = currentSourceCodeLine;
                } else {
                    newSourceCodeLine = prevSourceCodeLine;
                }

                var newMethod = '';
                if ((currentMethod.length === 0) || (currentMethod === undefined)) {
                    newMethod = prevMethod;
                } else {
                    newMethod = currentMethod;
                }

                var newType = '';
                if ((currentType.length === 0) || (currentType === undefined)) {
                    newType = prevType;
                } else {
                    newType = currentType;
                }


                console.log(newValue);
                var truncatedVal = "";
                if(newValue || newValue.constructor.name === 'Boolean'){
                    newValue = newValue.toString();
                    truncatedVal = newValue.substring(0, 25);
                }

                g.setNode(message.content.nodeId, {
                    label: "Id: " + message.content.nodeId + "<br> Name:" + newRef + "<br> Value: " + truncatedVal + "<br> Source: " + newSourceCodeLine,
                    labelType: "html",
                    ref: newRef,
                    value: newValue,
                    type: newType,
                    method: newMethod,
                    sourceCodeLine: newSourceCodeLine,
                    nodeId: message.content.nodeId,
                    class: "current"
                });

                tempNode.type = 'nodeUpdated';
                tempNode.nodeId = message.content.nodeId;
                tempNode.nodeName = newRef;
                tempNode.nodeValue = truncatedVal;
            }
            else {

                currentAction = "newNode";
                g.setNode(message.content.nodeId, {
                    label: "Id: " + message.content.nodeId + "<br> Name:" + message.content.nodeRef + "<br> Value: " + message.content.nodeValue + "<br> Source: " + message.content.sourceCodeLine,
                    labelType: "html",
                    ref: message.content.nodeRef,
                    value: message.content.nodeValue,
                    type: message.content.nodeType,
                    method: message.content.nodeMethod,
                    nodeId: message.content.nodeId,
                    sourceCodeLine: message.content.sourceCodeLine,
                    class: "current"
                });
                tempNode.type = 'nodeCreated';
                tempNode.nodeId = message.content.nodeId;
                tempNode.nodeName = message.content.nodeRef;
                tempNode.nodeValue = message.content.nodeValue;
            }
            render(d3.select("svg g"), g);

            inner.selectAll("g.node")
                .attr("title", function (v) {
                    return styleTooltip(g.node(v).nodeId, g.node(v).ref, g.node(v).type, g.node(v).sourceCodeLine)
                })
                .each(function (v) {
                    $(this).tipsy({gravity: "w", opacity: 1, html: true});
                });

            /**
             * This will send node details to console whenever an user clicks on it.
             */
            svg.selectAll("g.node").on("click", function(id) {
                _node = g.node(id);
                sendObjectToInspectedPage(
                    {
                        action: "node_details",
                        content: {
                            "id": _node.nodeId,
                            "value": _node.value,
                            "source_line_number": _node.sourceCodeLine
                        }
                    }
                );
            });

            // capture current dependency graph
            stageId = captureGraphAndSaveAsNewStage(currentAction, currentNodeId);
            saveHistory(stageId, currentAction, tempNode)
        }
        else if (message.action === "saveEdge") {
            g.setEdge(message.content.edgeStart, message.content.edgeEnd, {
                label: message.content.edgeLabel
            });
            render(d3.select("svg g"), g);
            stageId = captureGraphAndSaveAsNewStage("saveEdge", false);
            saveHistory(stageId, "saveEdge", message.content)
        }else if(message.action === "updateSavedEdge"){
            var match = _.find(historyEntries, function(history) {
                if(history.type === 'dependencyCreated'){
                    if(history.endNodeId === message.content.id ){
                        history.endNodeName =  message.content.name
                    }
                    else if(history.startNodeId === message.content.id){
                        history.startNodeName = message.content.name
                    }
                }
            })
        }

    });

}());

// this method is to capture all nodes and edges and add this as new stage in rxGraphStages
function captureGraphAndSaveAsNewStage(event, currentNodeId) {
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
    var tempStageId = newStage.stageId;

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
                    newStage.stageData.edges.push({"edgeStart": singleEdge.v, "edgeEnd": singleEdge.w, "edgeLabel": edgeLabel});
                });

            }

            nodeToPush = g.node(d);

            // Check if its the current node, if yes set it as current node
            if (nodeToPush.nodeId === currentNodeId) {
                nodeToPush.class = "current";
            } else {
                nodeToPush.class = "normal";
            }
            newStage.stageData.nodes.push(_.clone(nodeToPush));
        });
    // if(rxSlider.slider('value') !== rxGraphStages.length){
    //     redrawGraphToStage(rxGraphStages.length)
    // }
    rxGraphStages.push(_.clone(newStage));
    // Here we should increase steps count in step slider
    rxSlider.slider("option", "min", 0);
    rxSlider.slider("option", "max", rxSlider.slider("option", "max") + 1);
    rxSlider.slider("option", "value", rxSlider.slider("option", "max"));
    rxSlider.slider("pips", "refresh");
    return tempStageId
}

var historyEntries = [];

function saveHistory(stageId, type, value) {
    if(type !== 'saveEdge'){
        historyEntries.push({
            'stageId': stageId,
            'type': value.type,
            'nodeName': value.nodeName,
            'nodeId': value.nodeId,
            'nodeValue': value.nodeValue
        })

    }else{
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

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}

// Listen to change in storage data
chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.sync.get("graphData", function (items) {
        console.log('Settings retrieved');
        console.log(items);
    });

});


