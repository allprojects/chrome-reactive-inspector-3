// This file is helper for communication between content script and background

//sending message to devtool via background as page starts loading
//sendObjectToDevTools({content: "message from content script"});

// method to send object to dev tool via background page
// will be only recieved if dev tool + panel  is opened
var cri_config_rec_status = '';
var pauseNow = false;
chrome.storage.sync.get('cri_config_rec_status', function (items) {
    cri_config_rec_status = items.cri_config_rec_status;
})
function sendObjectToDevTools(message) {
    //console.log("content script - send object to dev tool via background");
    //console.log("message content to be sent from content script" + message.content);
    // The callback here can be used to execute something on receipt
    if(cri_config_rec_status){
        chrome.extension.sendMessage(message, function (message) {
            // console.log("message sent");
        });
    }
}

function checkPauseNow() {
    return pauseNow;
}

// Listen message from background page s, that may be sent from panel
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    //console.log("message received to content script from background js");
    if (msg.action === 'test') {
        // console.log("Message received!" + msg.content);
    }
    else if (msg.action === 'node_details') {
        console.log("Node details");
        console.log("Node id " + msg.content.id);
        console.log("Node value " + msg.content.value);
        console.log("Source Code Line No. " + msg.content.source_line_number);
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
        pauseNow =  msg.content.status;
    }
});