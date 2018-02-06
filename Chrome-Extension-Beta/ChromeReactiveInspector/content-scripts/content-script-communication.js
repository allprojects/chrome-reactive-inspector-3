// This file is helper for communication between content script and background

//sending message to devtool via background as page starts loading
//sendObjectToDevTools({content: "message from content script"});

// method to send object to dev tool via background page
// will be only recieved if dev tool + panel  is opened

var cri = cri || {};

$.extend(cri, (function (window) {
    let recordStatus = null;

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            if (key === "cri_config_rec_status" && namespace === "sync") {
                recordStatus = changes[key].newValue;
            }
        }
    });

    function sendObjectToDevTools(message) {

        // check the config settings weather to record or not
        if (recordStatus === null) {
            // config setting was not initialized yet so wait for the value
            chrome.storage.sync.get({cri_config_rec_status: true}, function (items) {
                recordStatus = items.cri_config_rec_status;
                if (recordStatus) {
                    chrome.runtime.sendMessage(message, function (message) {
                    });
                }
            });
        } else {
            // if a value was previously set, do not read the status sync again to lower performance impact
            if (recordStatus === true) {
                chrome.runtime.sendMessage(message, function (message) {
                });
            }
        }
    }

    // Listen message from background page s, that may be sent from panel
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

    return {
        sendObjectToDevTools: sendObjectToDevTools
    };
})(window));