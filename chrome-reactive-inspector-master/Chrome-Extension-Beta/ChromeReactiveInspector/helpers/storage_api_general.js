/*
 Data structure

 graphData = [
 {
 "stageId": '',
 "stageEvent": '',
 "stageData": {
 "nodes": [{"nodeId": '', "nodeLabel": '', "nodeValue": ''}],
 "edges": [{"edgeStart": '', "edgeEnd": ''}]
 }
 }

 ];

 */
chrome.storage.sync.remove("graphData", function () {
    //console.log('Settings removed from local storage');
});


var getGraphData = function () {
    // get data from chrome storage
    chrome.storage.sync.get("graphData", function (graphStages) {
        console.log('Settings retrieved');
        console.log('Settings retrieved', graphStages);
        return graphStages;
    });

    // return false;

}

var saveGraphData = function (objectToSave) {
    // save data from chrome storage
    chrome.storage.sync.set(objectToSave, function () {
        console.log('Settings saved');
    });

}
/*
 var getLastStageDataFromStorage = function () {
 // get last stage from storage
 var graphStages = getGraphData();
 if (graphStages != false) {
 return graphStages[graphStages.length - 1];
 }

 return false;
 }
 */

var addNewStageInData = function (newStage) {
    console.log("addNewStageInData called");
    var newGraphStages = [];
    // this will add new stage to existing data , by copy last stage data and overwrite with new data if any

    chrome.storage.sync.get("graphData", function (graphStagesObj) {

        var graphStages = graphStagesObj.graphData;


        if ((graphStages != false) && (graphStages != undefined)) {
            newGraphStages = graphStages.push(newStage);
        } else {
            newGraphStages.push(newStage);
        }

        saveGraphData({"graphData": newGraphStages});

    });


}

var saveGraphNode = function (singleNode) {
    console.log("saveGraphNode called")
    var newStage = {
        "stageId": '',
        "stageEvent": '',
        "stageData": {
            "nodes": [],
            "edges": []
        }
    };
    // get last stage from storage and add new node to id / update if it exist already and save new stage to storage
    //var lastStageInStorage = getLastStageDataFromStorage();

    chrome.storage.sync.get("graphData", function (graphStagesObj) {

        var graphStages = graphStagesObj.graphData;
        console.log("graphStages");
        console.log(graphStagesObj);

        if ((graphStages != false) && (graphStages != undefined)) {
            var lastStageInStorage = graphStages[graphStages.length - 1];
        }


        if ((lastStageInStorage != false) && (lastStageInStorage != undefined)) {
            newStage.stageId = lastStageInStorage.stageId + 1;

            var lastStageData = lastStageInStorage.stageData;
            var lastStageNodes = lastStageData.nodes;

            console.log("last stage nodes", lastStageNodes);

            if (lastStageNodes.length > 0) {
                // check if singleNode exist already in this stage


                var otherNodes = lastStageNodes.filter(function (node) {
                    return node.nodeId != singleNode.nodeId;
                });


                if (otherNodes.length != lastStageNodes.length) {
                    newStage.stageEvent = "updateNode";
                } else {
                    newStage.stageEvent = "newNode";
                }

                //newStage.stageData.nodes = lastStageNodes;
                newStage.stageData.nodes.push(lastStageNodes);
                newStage.stageData.nodes.push(singleNode);


            } else {
                // last stage has no node
                newStage.stageEvent = "newNode";
                newStage.stageData.nodes.push(singleNode);

            }
            newStage.stageData.edges = lastStageInStorage.stageData.edges;

        } else {
            // seems there is no data so create first stage and store to storage
            newStage.stageId = 1;
            newStage.stageEvent = "newNode";
            newStage.stageData.nodes = [singleNode];
            newStage.stageData.edges = [];

        }


        // ADD NEW stage to storage
        addNewStageInData(newStage);

    });


}
/*
 var saveGraphEdge = function (singleEdge) {
 // get last stage from storage and add new edge to it and save new stage to storage
 var newStage = {
 "stageId": '',
 "stageEvent": '',
 "stageData": {
 "nodes": [],
 "edges": []
 }
 };
 var lastStageInStorage = getLastStageDataFromStorage();
 if ((lastStageInStorage != false)&&(lastStageInStorage != undefined)) {

 var lastStageData = lastStageInStorage.stageData;
 var lastStageNodes = lastStageData.nodes;
 var lastStageEdges = lastStageData.edges;


 newStage.stageId = lastStageInStorage.stageId + 1;
 newStage.stageData.nodes = lastStageNodes;
 newStage.stageData.edges = lastStageEdges.push(singleEdge);


 } else {
 newStage.stageId = 1;
 newStage.stageEvent = "newEdge";
 newStage.stageData.edges = [singleEdge];
 newStage.stageData.nodes = [];
 }

 addNewStageInData(newStage);

 }
 */