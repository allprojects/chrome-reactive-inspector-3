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

(function createChannel() {
    console.log("creating channel in messaging js that is part of panel ");
    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "reactive-debugger" //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
        //console.log("messaging.js part of panel script , message from background page");
        //console.log("messaging.js part of panel script , message content is = " + message.content);
        //console.log(message);

        var currentNodeId = false;

        if (message.action == "saveNode") {

            if (message.content.nodeId) {
                currentNodeId = message.content.nodeId;
            }

            var currentAction = "";
            if (g.node(message.content.nodeId) != undefined) {
                // this node already exist , only change label if there is no value in message
                // Label  = nodeRef + node val

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


                if ((currentRef.length == 0) || (currentRef == undefined)) {
                    var newRef = prevRef;
                } else {
                    var newRef = currentRef;
                }

                if (currentValue != "") {
                    var newValue = currentValue;
                } else {
                    var newValue = prevValue;
                }

                if (currentSourceCodeLine != "") {
                    var newSourceCodeLine = currentSourceCodeLine;
                } else {
                    var newSourceCodeLine = prevSourceCodeLine;
                }

                if ((currentMethod.length == 0) || (currentMethod == undefined)) {
                    var newMethod = prevMethod;
                } else {
                    var newMethod = currentMethod;
                }

                if ((currentType.length == 0) || (currentType == undefined)) {
                    var newType = prevType;
                } else {
                    var newType = currentType;
                }


                console.log(newValue);
                var truncatedVal = "";
                if(newValue){
                    newValue = newValue.toString();
                  truncatedVal =   newValue.substring(0, 25);
                }

                g.setNode(message.content.nodeId, {
                    label: "NodeId :" + message.content.nodeId + "<br> Type :" + newType + "<br>  Method :" + newMethod + "<br> Name:" + newRef + "<br> Value: " + truncatedVal + "<br> Source: " + newSourceCodeLine,
                    labelType: "html",
                    ref: newRef,
                    value: newValue,
                    type: newType,
                    method: newMethod,
                    sourceCodeLine: newSourceCodeLine,
                    nodeId: message.content.nodeId,
                    class: "current",
                    description: "test desc "
                });

            } else {

                currentAction = "newNode";
                g.setNode(message.content.nodeId, {
                    label: "NodeId :" + message.content.nodeId + "<br> Type :" + message.content.nodeType + "<br>  Method :" + message.content.nodeMethod + "<br> Name:" + message.content.nodeRef + "<br> Value: " + message.content.nodeValue + "<br> Source: " + message.content.sourceCodeLine,
                    labelType: "html",
                    ref: message.content.nodeRef,
                    value: message.content.nodeValue,
                    type: message.content.nodeType,
                    method: message.content.nodeMethod,
                    nodeId: message.content.nodeId,
                    sourceCodeLine: message.content.sourceCodeLine,
                    class: "current",
                    description: "test desc "
                });


            }


            render(d3.select("svg g"), g);

            inner.selectAll("g.node")
                .attr("title", function (v) {
                    return styleTooltip(v, g.node(v).label, g.node(v).description)
                })
                .each(function (v) {
                    $(this).tipsy({gravity: "w", opacity: 1, html: true});
                });

            // capture current dependency graph
            captureGraphAndSaveAsNewStage(currentAction, currentNodeId);

        }
        if (message.action == "saveEdge") {

            g.setEdge(message.content.edgeStart, message.content.edgeEnd, {
                label: message.content.edgeLabel
            });
            render(d3.select("svg g"), g);

            captureGraphAndSaveAsNewStage("saveEdge", false);

        }

    });

}());

// this method is to capture all nodes and edges and add this as new stage in rxGraphStages
function captureGraphAndSaveAsNewStage(event, currentNodeId) {
    //alert(currentNodeId);
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


    // get current nodes from graph
    d3.selectAll('g.node')  //here's how you get all the nodes
        .each(function (d) {

            /*
             console.log("val of d");
             console.log(d);
             console.log("what is edge here");
             console.log(g.nodeEdges(d));
             */
            /*
             g.edges(d).forEach(function (e) {
             console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
             });
             */

            var currentNodeEdges = g.nodeEdges(d);
            if (currentNodeEdges.length > 0) {
                currentNodeEdges.forEach(function (singleEdge) {
                    console.log("singleEdge");
                    console.log(g.edge(singleEdge).label);
                    var edgeLabel = "";
                    if (g.edge(singleEdge).label) {
                        edgeLabel = g.edge(singleEdge).label;
                    }
                    newStage.stageData.edges.push({"edgeStart": singleEdge.v, "edgeEnd": singleEdge.w, "edgeLabel": edgeLabel});
                });

            }

            var nodeToPush = g.node(d);

            //console.log("current node to push");
            //console.log(nodeToPush);
            if (nodeToPush.nodeId == currentNodeId) {
                nodeToPush.class = "current";
            } else {
                nodeToPush.class = "normal";
            }
            newStage.stageData.nodes.push(nodeToPush);

        });

    rxGraphStages.push(newStage);
    //console.log("all stages are");
    //console.log(rxGraphStages);

    // Here we should increase steps count in step slider
    rxSlider.slider("option", "min", 0);
    rxSlider.slider("option", "max", rxSlider.slider("option", "max") + 1);
    rxSlider.slider("option", "value", rxSlider.slider("option", "max"));
    rxSlider.slider("pips", "refresh");

}

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}


// Listen to change in storage data
chrome.storage.onChanged.addListener(function (changes, namespace) {
    /*
     for (key in changes) {
     var storageChange = changes[key];
     console.log('Storage key "%s" in namespace "%s" changed. ' +
     'Old value was "%s", new value is "%s".',
     key,
     namespace,
     storageChange.oldValue,
     storageChange.newValue);
     }
     */
    chrome.storage.sync.get("graphData", function (items) {
        console.log('Settings retrieved');
        console.log('Settings retrieved', items);
    });

});