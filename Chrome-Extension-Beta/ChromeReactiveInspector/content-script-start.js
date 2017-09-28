// console.log("from content-script-start.js");

var reactiveBreakPoints;
chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    reactiveBreakPoints = result.criReactiveBreakPoints;
});

// returns true if query matches
function shouldBreakNow(currentEvent, param1, param2) {
    for (var index in reactiveBreakPoints) {
        var currentBreakPoint = reactiveBreakPoints[index];
        var currentBreakPointQuery = currentBreakPoint.query;

        if (currentEvent === currentBreakPointQuery) {
            if ((currentEvent === "nodeCreated") || (currentEvent === "nodeUpdated")) {
                if (currentBreakPoint.params[0] !== undefined) {
                    if (currentBreakPoint.params[0] == param1) {
                        return true;
                    }
                }
            } else if ((currentEvent === "evaluationYielded") || (currentEvent === "dependencyCreated")) {
                if ((currentBreakPoint.params[0] !== undefined) && (currentBreakPoint.params[1] !== undefined)) {
                    if ((+currentBreakPoint.params[0] === param1) && (currentBreakPoint.params[1] == param2 || String(param2).includes(currentBreakPoint.params[1]) )) {
                        return true;
                    }
                }
            }
        }
        if (currentBreakPoint.params[0] !== undefined) {
            currentBreakPointQuery = currentBreakPointQuery + "[" + currentBreakPoint.params[0] + "]";
        }
        if (currentBreakPoint.params[1] !== undefined) {
            currentBreakPointQuery = currentBreakPointQuery + "[" + currentBreakPoint.params[1] + "]";
        }
    }
    return false;
}


/**
 * It will get the value from the localStorage and set the value to isPrintOptionSelected
 * @type {boolean}
 */
var isPrintOptionSelected = false;

function setPrintOptionValue() {
    chrome.storage.sync.get({printAllValue: ''}, function (items) {
        isPrintOptionSelected = items.printAllValue;
    });
}

setPrintOptionValue();

// Listen to change in storage data
chrome.storage.onChanged.addListener(function (changes, namespace) {
    setPrintOptionValue();
});

/**
 * This method will print the values to console if the user has selected to do so.
 * @param currentStep
 * @param value
 * @param nodeId
 */
function printValues(currentStep, value, nodeId) {
    if (isPrintOptionSelected) {
        console.log("------------------------------Value at step: " + currentStep + " of Node " + nodeId + " is----------------------------------------");
        console.log(value);
    }
}


var nodesDoNotSave;
chrome.storage.sync.get({nodesDoNotSave: []}, function (result) {
    nodesDoNotSave = result.nodesDoNotSave;
});

// returns true if query matches
function shouldSaveNodeValue(fileReadOver, nodeId) {
    if (!fileReadOver) {
        return false;
    }
    else {
        var found = false;
        nodesDoNotSave.forEach(function (node) {
            if (+node === nodeId)
                found = true
        });
        return found;
    }
}
