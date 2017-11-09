// This file is helper for communication between content script and background

//sending message to devtool via background as page starts loading
//sendObjectToDevTools({content: "message from content script"});

// method to send object to dev tool via background page
// will be only recieved if dev tool + panel  is opened

var cri = cri || {};

$.extend(cri, (function (window) {
    var cri_config_rec_status = '';
    var pauseNow = false;
    // chrome.storage.sync.get('cri_config_rec_status', function (items) {
    //     cri_config_rec_status = items.cri_config_rec_status;
    // })
    function sendObjectToDevTools(message, fileReadOver) {
        // The callback here can be used to execute something on receipt

        // This is added because chrome communication is asynchronous. Initially messages were not sent to panel page,
        // because of which it was not generating dependency graph as soon as we send message from analyzer.
        // it was affecting setting up break point when nodeCreated or dependencyCreated.
        if (!fileReadOver) {
            chrome.extension.sendMessage(message, function (message) {
                // console.log("message sent");
            });
        } else {
            // check the config settings weather to record or not
            chrome.storage.sync.get('cri_config_rec_status', function (items) {
                if (items.cri_config_rec_status !== undefined) {
                    if (items.cri_config_rec_status && fileReadOver) {
                        chrome.extension.sendMessage(message, function (message) {
                            // console.log("message sent");
                        });
                    }
                }
            });
        }

    }

    function checkPauseNow() {
        return pauseNow;
    }

    // Listen message from background page s, that may be sent from panel
    chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
        // message received to content script from background js
        if (msg.action === 'node_details') {
            console.log("Node details");
            console.log("Node id " + msg.content.id);
            console.log("Node value " + msg.content.value);
        }
        else if (msg.action === 'loading') {
            chrome.extension.sendMessage(msg, function (msg) {
                // console.log("Page reload message sent!");
            });
        }

        else if (msg.action === 'cri_config_rec_status') {
            cri_config_rec_status = msg.content.status;
        }
        else if (msg.action === 'threshold') {
            pauseNow = msg.content.status;
        }
        else if (msg.action === 'getSourceCode') {
            sendResponse({
                code: cri.instrumentor.getCode(msg.content.filename, msg.content.from, msg.content.to)
            });
        }
    });

    return {
        sendObjectToDevTools: sendObjectToDevTools,
        checkPauseNow: checkPauseNow
    };
})(this));