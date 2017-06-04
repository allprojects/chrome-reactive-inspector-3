// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*
var tabPorts = {};

chrome.runtime.onConnect.addListener(function (port) {
    // come here when we click on our dev tool panel only once for the life of dev tool window
    // alert("chrome.extension.onConnect.addListener");
    var tabId;
    port.onMessage.addListener(function(message){
        if (!tabId) {
            // this is a first message from devtools so let's set the tabId-port mapping
            tabId = message.tabId;
            tabPorts[tabId] = port;
        }
    });

    var extensionListener = function (message, sender, sendResponse) {

        // alert("background.js extensionListener");

        const port = sender.tab && tabPorts[sender.tab.id];
        if (port && message.destination === "panel") {
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
    };

    // Listens to messages sent from the panel
    chrome.runtime.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function (port) {
        delete tabPorts[tabId];
        chrome.extension.onMessage.removeListener(extensionListener);
    });
});


chrome.tabs.onRemoved.addListener(function (tabId) {
    delete tabPorts[tabId];
});

chrome.tabs.onReplaced.addListener(function(newTabId, oldTabId) {
    delete tabPorts[oldTabId];
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === 'loading'){
        chrome.tabs.sendMessage(tabId, {action: 'loading'}, function(response) {});
    }
});
