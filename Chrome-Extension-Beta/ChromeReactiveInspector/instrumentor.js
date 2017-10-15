var scriptCache = {};

/** DOCUMENT LOAD INTERCEPTION Start ***/
// load current document and
// All scripts will be rendered inert,
var request = new XMLHttpRequest();
request.open('GET', location.href);

var shouldReactiveDebuggerRun = true;

var filesShouldNotInclude = ["Rx.js", "rx.lite.js", "Bacon.js", "Bacon.UI.js", "jquery.js", "rx.all.js", "jquery-2.1.4.js"];
var fileReadOver = false;
request.onload = function (event) {

    var respText = request.responseText;
    // check if this page contains bacon / rx , if not then debugger should not run
    var validFiles = ["Rx.js", "Bacon.js", "rx.lite.js", "rx.lite.compat.js", "rx.all.js"];

    shouldReactiveDebuggerRun = _.some(validFiles, function (v) {
        return respText.search(v) !== -1;
    });
};
request.send(null);


/** DOCUMENT LOAD INTERCEPTION End ***/

if (shouldReactiveDebuggerRun === true) {
    /**     SEQUENTIAL Loader Start    ***/
//Sequential loader To get all scripts and insert in document after instrumentation
// script can be with source or without source (in page JS code)
    setTimeout(function next(index) {

        var script = document.scripts[index];
        if (script === null || script === undefined) {
            //return setTimeout(callback, 0);
            return false;
        }

        if (!script.hasAttribute('src')) {
            // script tag contains inline code.
            var code = instrumentInline(index, script.textContent);
            eval(code);
            fileReadOver = true;
            setTimeout(next, 0, ++index);
            return;
        }

        // if script tag contain source file
        var filename = script.getAttribute('src').replace(/^.*[\\\/]/, '');

        var request = new XMLHttpRequest();
        request.open('GET', script.getAttribute('src'));
        request.onload = function () {

            // check if file should be included
            if (filesShouldNotInclude.indexOf(filename) !== -1) {
                setTimeout(next, 0, ++index);
                return;
            }

            chrome.storage.sync.get('criconfigincludes', function (items) {
                var filesToInstrument = items.criconfigincludes || false;

                // check if file should be instrumented. If setting is not set, instrument all files.
                if (filesToInstrument === false || _.contains(filesToInstrument, filename)) {


                    chrome.storage.sync.get('developerMode', function (items) {
                        var developerMode = items.developerMode;

                        var code = instrumentFile(filename, request.responseText, developerMode);
                        eval(code);
                        J$.W(-1, '', '', '');
                        fileReadOver = true;

                        // next
                        setTimeout(next, 0, ++index);
                    });
                } else {
                    eval(request.responseText);
                    // next
                    setTimeout(next, 0, ++index);
                }
            });
        };
        request.send(null);
    }, 0, 0);

    /**     SEQUENTIAL Loader End    ***/

    /**
     * This method will do instrumentation of given code using Jalangi.
     * If Jalangi is not found the original code will be returned.
     * @param filename name/url of the script file
     * @param code to instrument
     * @param developerMode If true, adds sourceFileName comment to instrumented file to make it visible in devtools.
     * @returns {string|*|Number|number|string|string}
     */
    function instrumentFile(filename, code, developerMode) {
        scriptCache[filename] = code;
        var instrumented = getInstrumentedCode(code, filename);

        var escapedFileName = filename.replace("'", "").replace("\\", "");

        // Wrap instrumented code in closure and replace write method of jalangi with a custom one that passes
        // the current filename. This is not done for inline scripts due to possible performance impact if there are many.
        instrumented =
            "var X$ = window.J$;var J$ = jQuery.extend({}, X$);J$.W = function(iid, name, val, lhs, isGlobal, isPseudoGlobal){return X$.W(iid, name, val, lhs, isGlobal, isPseudoGlobal,'" + escapedFileName + "');};\n"
            + instrumented;

        if (developerMode) {

            var instrumentedFileName = filename;
            if (instrumentedFileName.lastIndexOf('.') !== -1) {
                instrumentedFileName = instrumentedFileName.substring(0, instrumentedFileName.lastIndexOf('.')) + '_instrumented.js';
            } else {
                instrumentedFileName = instrumentedFileName + '_instrumented.js'
            }

            var documentDomain = document.URL;
            if (documentDomain.lastIndexOf('/') !== -1) {
                documentDomain = documentDomain.substring(0, documentDomain.lastIndexOf("/") + 1);
            }

            instrumented += '\n//# sourceURL=' + documentDomain + instrumentedFileName;
        }
        return instrumented;
    }

    /**
     * This method will do instrumentation of given code using Jalangi.
     * If Jalangi is not found the original code will be returned.
     * @param scriptNumber index of the script tag on the page
     * @param code to instrument
     * @returns {string|*|Number|number|string|string}
     */
    function instrumentInline(scriptNumber, code) {
        // collect all inline scripts under url name
        if (scriptCache[document.domain] === undefined) {
            scriptCache[document.domain] = code;
        } else {
            // double comment to prevent any mess up of inline code
            scriptCache[document.domain] += "/*<!-- code from script tag with index " + scriptNumber + " -->*/  " + code
        }
        return getInstrumentedCode(code, document.domain);
    }

    function getInstrumentedCode(code, filename) {
        var instrumentedCode = code;
        if (J$.instrumentCode !== undefined) {
            instrumentedCode = J$.instrumentCode(code, {wrapProgram: false, isEval: false}).code;
        }
        return instrumentedCode;
    }

    function getCode(file, from, to) {
        var code = scriptCache[file];
        if (!code || code.length === 0) {
            return ''
        }

        var lines = code.split(/\r?\n/g);
        if (to > lines.length) {
            to = lines.length;
        }
        if (from < 0) {
            from = 0;
        }

        return {
            lines: lines.slice(from, to),
            from: from, to: to
        }
    }
}
