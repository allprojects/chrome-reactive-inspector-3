var cri = cri || {};

(function () {

////////////////////////////////////////////////////////////////////////////////
// helper for communication between content script and background
// * sending message to devtool via background as page starts loading
//   sendObjectToDevTools({content: "message from content script"});
// * method to send object to dev tool via background page
//   will be only recieved if dev tool + panel  is opened

    window.addEventListener("message", function(event) {
        if (event.data.destination == "panel")
            chrome.runtime.sendMessage(event.data);
    });

    // Listen message from background page, that may be sent from panel
    chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
        // message received to content script from background js
        if (msg.action === 'node_details') {
            console.log("Node details");
            console.log("Node id " + msg.content.id);
            console.log("Node value " + msg.content.value);
        }
        else if (msg.action === 'getSourceCode') {
            sendResponse({
                code: cri.instrumentor.getCode(msg.content.filename, msg.content.from, msg.content.to)
            });
        }
    });

////////////////////////////////////////////////////////////////////////////////
// storage

    let recordStatus = null;
    let nodesDoNotSave = null;
    cri.reactiveBreakPoints = null;
    let isPrintOptionSelected = null;

    // initialize config once
    chrome.storage.sync.get({
      printAllValue: '',
      nodesDoNotSave: [],
      reactiveBreakPoints: [],
      isPrintOptionSelected: false,
    }, result => {
      printAllValue         = result.printAllValue;
      nodesDoNotSave        = result.nodesDoNotSave;
      cri.reactiveBreakPoints   = result.reactiveBreakPoints;
      isPrintOptionSelected = result.isPrintOptionSelected;
    });

    // listen to config changes
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (namespace !== "sync") return;
        recordStatus           = changes.recordStatus.newValue;
        nodesDoNotSave         = changes.nodesDoNotSave.newValue;
        cri.reactiveBreakPoints    = changes.reactiveBreakPoints.newValue;
        isPrintOptionSelected  = changes.printAllValue.newValue;
    });

////////////////////////////////////////////////////////////////////////////////
// public methods

    // returns true if query matches
    function shouldSaveNodeValue(nodeId) {
        return nodesDoNotSave.some(node => +node === nodeId); // david: why +
    }

    function sendObjectToDevTools(message) {
        if (recordStatus === null) throw "dude wtf: config setting was not initialized yet..."
        if (recordStatus) chrome.runtime.sendMessage(message); // check the config settings whether to record or not
    }

    // This method will print the values to console if the user has selected to do so.
    function printValues(currentStep, value, nodeId) {
        if (isPrintOptionSelected)
            console.log("-- Value at step: " + currentStep + " of Node " + nodeId + " is " + value + " --");
    }

    // returns true if query matches
    function shouldBreakNow(currentEvent, param1, param2) {
        console.log(currentEvent, param1, param2, reactiveBreakPoints);
        return reactiveBreakPoints.some(bp => currentEvent === bp.query
                                           && param1 === bp.param1
                                           && param2 === bp.param2)
    }

    // export
    cri.shouldSaveNodeValue = shouldSaveNodeValue;
    cri.printValues = printValues;
    cri.shouldBreakNow = shouldBreakNow;
    cri.sendObjectToDevTools = sendObjectToDevTools;

}());
