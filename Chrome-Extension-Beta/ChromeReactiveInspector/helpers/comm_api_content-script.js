// This file is helper for communication between content script and background

//sending message to devtool via background as page starts loading
//sendObjectToDevTools({content: "message from content script"});

// method to send object to dev tool via background page
// will be only recieved if dev tool + panel  is opened
function sendObjectToDevTools(message) {
    //console.log("content script - send object to dev tool via background");
    //console.log("message content to be sent from content script" + message.content);
    // The callback here can be used to execute something on receipt


    // check the config settings weather to record or not

    chrome.storage.sync.get('cri_config_rec_status', function (items) {
        if (items.cri_config_rec_status !== undefined) {
            console.log(items.cri_config_rec_status);
            if (items.cri_config_rec_status === 1) {
                chrome.extension.sendMessage(message, function (message) {
                    console.log("message sent");
                });
            }

        }
    });
}

// Listen message from background page , that may be sent from panel
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    //console.log("message received to content script from background js");
    if (msg.action === 'test') {
        console.log("Message received!" + msg.content);
    }
});