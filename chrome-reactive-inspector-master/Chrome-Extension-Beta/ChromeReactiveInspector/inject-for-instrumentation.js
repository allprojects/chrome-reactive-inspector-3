console.log("inject-for-instrumentation.js");

// Get file names from configuration text field displayed in panel
var filesShouldOnlyInstrument = false;
chrome.storage.sync.get('criconfigincludes', function (items) {
    if (items.criconfigincludes != undefined) {
        filesShouldOnlyInstrument = items.criconfigincludes.split(',');
    }
});

/** DOCUMENT LOAD INTERCEPTION Start ***/
// stop loading document so that we can load the instrumented version
window.stop();
// load current document and
// All scripts will be rendered inert,
var request = new XMLHttpRequest();
request.open('GET', location.href);

var shouldReactiveDebuggerRun = true;
// This is list of files that should skip while doing instrumentation
// Later this should be overwritten from options page of extension
var filesShouldNotInstrument = [ "underscore.js", "hammer.js" , "d3.v3.min.js" ];

var filesShouldNotInclude = ["Rx.js", "Bacon.js", "Bacon.UI.js", "jquery.js"];

request.onload = function (event) {

    // here check if response text contain Bacon / Rxjs then continue otherwise do not do anything
    var respText = request.responseText;
    // check if this page contains bacon / rx , if not then debugger should not run
    if ((respText.search("Rx.js") == -1) && (respText.search("Bacon.js") == -1) && (respText.search("rx.lite.js") == -1) && (respText.search("rx.lite.compat.js") == -1) && (respText.search("rx.all.js") == -1)) {
        shouldReactiveDebuggerRun = false;
    }

    if (shouldReactiveDebuggerRun == true) {
        // change to type of js tags so that js not able to execute
        var html = request.responseText
            .replace(/type=\"text\/javascript\"/g, '')
            .replace(/<script/g, '<script type="rx-instrument/javascript"');
        document.open();
        document.write(html);
        document.close();
    } else {
        // Reactive inspector should not run , so load page original content
        var html = request.responseText;
        document.open();
        document.write(html);
        document.close();

    }

};
request.send(null);


/** DOCUMENT LOAD INTERCEPTION End ***/

if (shouldReactiveDebuggerRun == true) {
    /**     SEQUENTIAL Loader Start    ***/
//Sequential loader To get all scripts and insert in document after instrumentation
// script can be with source or without source (in page JS code)
    setTimeout(function next(index) {

        var script = document.scripts[index];
        if (script == null) {
            //return setTimeout(callback, 0);
            return false;
        }
        if (script.getAttribute('type') != 'rx-instrument/javascript') {
            return false;
        }
        // if script tag contain source file
        if (script.hasAttribute('src')) {
            var filename = script.getAttribute('src').replace(/^.*[\\\/]/, '');

            var request = new XMLHttpRequest();
            request.open('GET', script.getAttribute('src'));
            request.onload = function () {

                if (filesShouldOnlyInstrument == false) {
                    // NO CONFIG SET
                    if (filesShouldNotInclude.indexOf(filename) != -1) {

                    } else if (filesShouldNotInstrument.indexOf(filename) != -1) {
                        // do not instrument these files
                        eval(request.responseText);
                        //script.getAttribute('type', 'text/javascript');
                        // script.setAttribute('type', 'text/javascript');
                    } else {

                        var code = CriInstrument(request.responseText);
                        //console.log("code after inst");
                        //console.log(code);
                        eval(code);
                        //(new Function(code))();

                    }
                } else {
                    //CONFIG SET
                    // CONFIG SET SO only instrument files mentioned in config
                    if (filesShouldNotInclude.indexOf(filename) != -1) {

                    } else if (filesShouldOnlyInstrument.indexOf(filename) != -1) {
                        var code = CriInstrument(request.responseText);
                        // console.log("code after inst");
                        // console.log(code);
                        eval(code);

                    } else {
                        eval(request.responseText);
                        //script.setAttribute('type', 'text/javascript');
                    }
                }

                setTimeout(next, 0, ++index);
            };
            request.send(null);
        } else {
            // script tag contains inline code.
            var code = CriInstrument(script.textContent);
            //console.log("code after inst");
            //       console.log(code);
            eval(code);
            setTimeout(next, 0, ++index);
        }
    }, 0, 0);

    /**     SEQUENTIAL Loader End    ***/

    /**
     * This method will do instrumentation of given code using Jalangi
     * If Jalangi did not found then it will return same code back
     * @param code
     * @returns {string|*|Number|number|string|string}
     */
    function CriInstrument(code) {

        if (J$.instrumentCode != undefined) {
            var instrumentedCode = J$.instrumentCode(code, {wrapProgram: false, isEval: false}).code;
            //console.log("instrumentedCodeeeee");
            //console.log(instrumentedCode);
        } else {
            var instrumentedCode = code;
        }

        return instrumentedCode;
    }
}