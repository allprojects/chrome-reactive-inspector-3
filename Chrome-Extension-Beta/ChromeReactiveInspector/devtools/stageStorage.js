var cri = cri || {};

(function () {

    let storageQueue = [];
    // used to remember what to delete on clear()
    let highestId = -1;

    /**
     * Stores a set of BaseStages on disk.
     * @param stages the set of stages
     * @param getSequentialIdFunction a function returning the base index to a given BaseStage.
     */
    function storeOnDisk(stages, getSequentialIdFunction) {
        let storageObject = {};
        let oldHighest = highestId;
        stages.forEach(s => {
            let id = getSequentialIdFunction(s);
            if (id <= highestId) return; // no need to save if id is not new
            highestId = id;
            storageObject["stage" + id] = s;
        });

        // abort if nothing new to store
        if (Object.keys(storageObject).length === 0) return;

        let operation = function (callBackQueue) {
            chrome.storage.local.set(storageObject, function () {
                if (chrome.runtime.lastError)
                    console.error("Chrome local storage api threw an exception. "
                      + "This is possibly because the local storage ran out of capacity.")
                console.log("cri: stored stages on disk.");
                callBackQueue();
            });
        };

        // set highest to storage as well in case the extension closes unexpectedly.
        if (oldHighest !== highestId) {
            chrome.storage.local.set({highestStageId: highestId}, () => {
                if (chrome.runtime.lastError)
                    console.error("Chrome local storage api threw an exception. "
                      + "This is possibly because the local storage ran out of capacity.")
            });
        }

        queueStorageOperation(operation);
    }

    function loadFromDisk(idsToLoad, callback) {
        let toRetrieve = _.map(idsToLoad, function (i) {
            return "stage" + i;
        });

        let operation = function (callBackQueue) {

            chrome.storage.local.get(toRetrieve, function (items) {
                console.log("cri: received stages from disk.");
                let stages = [];
                for (let key in items) {
                    if (!items.hasOwnProperty(key)) continue;

                    let stage = items[key];
                    if (typeof stage !== "undefined") {
                        /* # Comment in if loaded stage objects should be of type cri.graphHistory.Stage
                           # currently not necessary, because cri.graphHistory.Stage has no prototype.
                        let typedStage = Object.create(cri.graphHistory.Stage, stage);
                        stages.push(typedStage);
                        */
                        stages.push(stage);
                    }
                }
                // release items storage, because due to the callback chains it may be kept longer than necessary
                items = {};
                callback(stages);
                callBackQueue();
            });
        };
        queueStorageOperation(operation);
    }

    function queueStorageOperation(operation) {
        // ensure sequential execution by building a callback queue
        // not exactly thread save, but close enough for long running operations
        if (storageQueue.length > 0) {
            storageQueue.push(operation);
        } else {
            // signal operation in progress
            storageQueue.push(null);
            operation(queueProgressCallback);
        }
    }

    function queueProgressCallback() {
        storageQueue.shift();
        console.log("cri: storage operation completed. Remaining: " + storageQueue.length);
        if (storageQueue.length > 0) {
            storageQueue[0](queueProgressCallback);
        }
    }

    function clear() {
        clearUpTo(highestId);
        highestId = -1;
    }

    function clearUpTo(highest) {
        let toDelete = _.map(_.range(1, highest + 1), function (i) {
            return "stage" + i;
        });

        chrome.storage.local.remove(toDelete, function () {
            chrome.storage.local.remove("highestStageId");
        });
    }

    function initialize() {
        // clean up local storage
        chrome.storage.local.get({highestStageId: null}, function (items) {
            if (typeof items.highestStageId === "undefined" || items.highestStageId === -1) return;
            clearUpTo(items.highestStageId);
            chrome.storage.local.remove("highestStageId");
        });
    }

    // exports
    cri.stageStorage = {};
    cri.stageStorage.loadFromDisk = loadFromDisk;
    cri.stageStorage.storeOnDisk = storeOnDisk;
    cri.stageStorage.clear = clear,
    cri.stageStorage.initialize = initialize;
}());
