//Creates an extension panel.
chrome.devtools.panels.create("Reactive-Inspector", "reactive-debugger.png", "panel/panel.html", function (extensionPanel) {
    //A function that is called when the panel is created.
    //An ExtensionPanel object representing the created panel.
});

// chrome.devtools.inspectedWindow.onResourceAdded.addListener(function (resource){
//     console.log("resources added" + resource.url);
//     console.log("resources type " + resource.type);
//     // alert("resources content added " + resource.content);
// });

