var cri = cri || {};

cri.stageStorage = (function (window) {

    let storageQueue = [];
    // used to remember what to delete on clear()
    let highestId = 0;

    function storeOnDisk(stages) {
        let storageObject = {};
        let oldHighest = highestId;
        stages.forEach(function (s) {
            storageObject["stage" + s.id] = s;
            if (s.id > highestId) highestId = s.id;
        });

        let operation = function (callBackQueue) {
            chrome.storage.local.set(storageObject, callBackQueue);
        };

        // set highest to storage as well in case the extension closes unexpectedly.
        if (oldHighest !== highestId) {
            chrome.storage.local.set({highestStageId: highestId});
        }

        queueStorageOperation(operation);
    }

    function loadFromDisk(fromId, toId, callback) {
        let toRetrieve = _.map(_.range(fromId, toId + 1), function (i) {
            return "stage" + i;
        });

        let operation = function (callBackQueue) {

            chrome.storage.local.get(toRetrieve, function (items) {
                let stages = [];
                for (let key in items) {
                    if (!items.hasOwnProperty(key)) continue;

                    let stage = items[key];
                    if (typeof stage !== "undefined") {
                        stages.push(stage);
                    }
                }
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
        if (storageQueue.length > 0) {
            storageQueue[0](queueProgressCallback);
        }
    }

    function clear() {
        clearUpTo(highestId);
    }

    function clearUpTo(highest) {
        let toDelete = _.map(_.range(1, highest + 1), function (i) {
            return "stage" + i;
        });
        chrome.storage.local.remove(toDelete);
    }

    function initialize() {
        // clean up local storage
        chrome.storage.local.get({highestStageId: null}, function (items) {
            if (!items.highestStageId) return;
            clearUpTo(items.highestStageId);
            chrome.storage.local.remove("highestStageId");
        });
    }

    return {
        loadFromDisk: loadFromDisk,
        storeOnDisk: storeOnDisk,
        clear: clear,
        initialize: initialize
    }
})(window);