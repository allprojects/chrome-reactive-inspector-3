// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*

chrome.extension.onConnect.addListener(function (port) {
    // come here when we click on our dev tool panel only once for the life of dev tool window
    // alert("chrome.extension.onConnect.addListener");
    var extensionListener = function (message, sender, sendResponse) {

        // alert("background.js extensionListener");

        if (message.destination == "panel") {
            // alert("background.js - destination is panel");
            port.postMessage(message);
        } else {

            if (message.tabId && message.content) {

                //  alert("background.js - got from panel and send to content script");

                chrome.tabs.sendMessage(message.tabId, message, sendResponse);

                // This accepts messages from the inspectedPage and
                // sends them to the panel
            } else {
                // alert("background.js - got from content script and send to panel script");
                port.postMessage(message);
            }

        }


        sendResponse(message);
    }

    // Listens to messages sent from the panel
    chrome.extension.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function (port) {
        // this will be executed when we close dev tool window
        // alert("background.js - port disconneccted");

        /*
         chrome.storage.sync.remove("graphData", function () {

         console.log('Settings removed from local storage');

         });
         */

        chrome.extension.onMessage.removeListener(extensionListener);
    });

    // port.onMessage.addListener(function (message) {
    //     port.postMessage(message);
    // });

});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    return true;
});