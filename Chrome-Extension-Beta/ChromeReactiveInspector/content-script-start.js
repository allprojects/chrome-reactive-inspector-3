console.log("from content-script-start.js");

var reactiveBreakPoints;
chrome.storage.local.get({criReactiveBreakPoints: []}, function (result) {
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
                    if (+currentBreakPoint.params[0] === param1) {
                        return true;
                    }
                }
            } else if ((currentEvent === "evaluationYielded") || (currentEvent === "dependencyCreated")) {
                if ((currentBreakPoint.params[0] !== undefined) && (currentBreakPoint.params[1] !== undefined)) {
                    if ((+currentBreakPoint.params[0] === param1) && (+currentBreakPoint.params[1] === param2)) {
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