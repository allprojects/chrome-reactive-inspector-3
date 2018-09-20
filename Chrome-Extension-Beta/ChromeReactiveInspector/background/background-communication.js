// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*
var tabPorts = {};
chrome.tabs.onRemoved.addListener(function (tabId) {
    delete tabPorts[tabId];
});
chrome.tabs.onReplaced.addListener(function (newTabId, oldTabId) {
    delete tabPorts[oldTabId];
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // this will be called on ANY tab that is updated, so check if it is an active
    // cri devtools tab.
    if (changeInfo.status === 'loading') {
        let port = tabPorts[tabId];
        // this will result in a "inject" response from the panel once it has finished resetting.
        if (port) port.postMessage({action: "loading"});
    }
});

chrome.runtime.onConnect.addListener(function (port) {
    // connection from panel

    // come here when we click on our dev tool panel only once for the life of dev tool window
    // alert("chrome.extension.onConnect.addListener");
    let tabId;

    function handleMessage() {
        if (message.action === "tabInfo") {
            // retrieve url for download feature
            let response = tab => sendResponse({currentTabUrl: tab.url});
            chrome.tabs.get(tabId, response);
            return true; // return true to enable async answer
        }

        throw "NotYetImplemented";
    }

    function extensionListener(message, sender, sendResponse) {

        if (message.destination === "background") {
            handleMessage();
        } else if (message.destination === "panel") {
            let port = sender.tab && tabPorts[sender.tab.id];
            if (port) port.postMessage(message); // Change
            sendResponse(message); // FIXME superflous ???
        } else if (message.tabId) {
            chrome.tabs.sendMessage(message.tabId, message, sendResponse);
        } else {
          throw "unknown destination " + JSON.stringify(message);
        }
    };

    // Listens to messages sent from the panel
    chrome.runtime.onMessage.addListener(extensionListener);

    port.onMessage.addListener(function (message) {
        if (!tabId) {
            // this is a first message from devtools so let's set the tabId-port mapping
            tabId = message.tabId;
            tabPorts[tabId] = port;
        }
//        if (message.action === "inject") {
//            injectScripts(tabId);
//        }
    });
    port.onDisconnect.addListener(function (port) {
        delete tabPorts[tabId];
        chrome.runtime.onMessage.removeListener(extensionListener);
    });
});

//function injectScripts(tabId) {
  // // test if underscore is loaded in example for all content scripts specified in the manifest.json
  // // if it is not loaded - the user updated the extension without reloading the inspected page.#
  // // to prevent errors all content-scripts specified in the manifest must be loaded manually.
  // const testContentScriptsLoadedSnippet = "typeof _ === \"undefined\";";
  //
  // chrome.tabs.executeScript(tabId, {code: testContentScriptsLoadedSnippet}, function (resultArray) {
  //     if (resultArray.length > 0 && resultArray[0] === true) {
  //         console.log("reloaded content scripts");
  //         executeScriptsSync(tabId, contentScriptsFromManifest.concat(scriptsToInject), 0);
  //     } else {
  //         executeScriptsSync(tabId, scriptsToInject, 0);
  //     }
  // });
//}

//const scriptsToInject = [
//    "libraries/Bacon.js",
//    "libraries/Rx.js",
//    "content-scripts/analysis/recording.js",
//    "content-scripts/analysis/jalangi-analysis.js",
//    "content-scripts/analysis/bacon-interception.js",
//    "content-scripts/analysis/rx-interception.js",
//    "content-scripts/analysis/instrumentor.js"];

//const contentScriptsFromManifest = [
//    "libraries/jquery-1.12.4.min.js",
//    "content-scripts/content-scripts-start.js",
//    "content-scripts/content-script-communication.js",
//    "content-scripts/jalangi-framework.js",
//    "libraries/underscore-min.js"];

//function executeScriptsSync(tabId, scripts, index) {
//    if (index === scripts.length)
//        return;

//    chrome.tabs.executeScript(tabId, {file: scripts[index]}, function () {
//        executeScriptsSync(tabId, scripts, ++index);
//    });
//}
