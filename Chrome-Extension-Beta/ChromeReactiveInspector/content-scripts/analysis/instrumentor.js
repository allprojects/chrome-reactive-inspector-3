var cri = cri || {};

// closure to make createInstrumentor private
(function () {
    function createInstrumentor(window, options) {
        let scriptCache = {};
        /* DOCUMENT LOAD INTERCEPTION Start  */
        // load current document and
        // All scripts will be rendered inert,
        let request = new XMLHttpRequest();
        request.open('GET', location.href);

        let shouldReactiveDebuggerRun = true;

        let filesShouldNotInclude = options.defaultIgnores;
        let fileReadOver = false;
        request.onload = function () {

            let respText = request.responseText;
            // check if this page contains bacon / rx , if not then debugger should not run
            let validFiles = ["Rx.js", "Bacon.js", "rx.lite.js", "rx.lite.compat.js", "rx.all.js"];

            shouldReactiveDebuggerRun = _.some(validFiles, function (v) {
                return respText.search(v) !== -1;
            });
        };
        request.send(null);
        /* DOCUMENT LOAD INTERCEPTION End */

        if (shouldReactiveDebuggerRun === false) {
            return;
        }

        function getFileName(scriptTag) {
            return scriptTag.getAttribute('src').replace(/^.*[\\\/]/, '');
        }

        /**     SEQUENTIAL Loader Start    ***/
        //Sequential loader To get all scripts and insert in document after instrumentation
        // script can be with source or without source (in page JS code)

        function next(index, finishedCallback) {
            let script = window.document.scripts[index];
            if (script === null || script === undefined) {
                // all scripts handled now
                if (finishedCallback) finishedCallback();
                return false;
            }

            if (!script.hasAttribute('src')) {
                // script tag contains inline code.
                let code = instrumentInline(index, script.textContent);
                executeInContext(code);
                fileReadOver = true;
                setTimeout(next, 0, ++index, finishedCallback);
                return;
            }

            // if script tag contain source file

            let filename = getFileName(script);
            let request = new XMLHttpRequest();
            request.open('GET', script.getAttribute('src'));
            request.onload = function () {

                // check if file should be included
                if (filesShouldNotInclude.indexOf(filename) !== -1) {
                    setTimeout(next, 0, ++index, finishedCallback);
                    return;
                }

                let filesToInstrument = options.criconfigincludes || false;

                // check if file should be instrumented. If setting is not set, instrument all files.
                if (filesToInstrument === false || _.contains(filesToInstrument, filename)) {

                    let code = instrumentFile(filename, request.responseText, options.developerMode);
                    executeInContext(code);
                    J$.W(-1, '', '', '');
                    fileReadOver = true;

                    // next
                    setTimeout(next, 0, ++index, finishedCallback);
                } else {
                    executeInContext(request.responseText);
                    // next
                    setTimeout(next, 0, ++index, finishedCallback);
                }
            };
            request.send(null);
        }

        // script names should be sent before execution to initialize the tokenfield on time.
        (function sendFileNamesToPanel() {
            let scriptTags = window.document.scripts;

            let scriptNames = _.filter(scriptTags, function (s) {
                // prevents Rx.js etc. to show up in suggestions
                return typeof s !== "undefined" && s.hasAttribute('src');
            }).map(function (s) {
                return getFileName(s);
            }).filter(function (f) {
                return filesShouldNotInclude.indexOf(f) === -1;
            });

            cri.sendObjectToDevTools({
                content: {names: scriptNames},
                action: "scriptNames", destination: "panel"
            });
        })();

        // iterate scripts and execute sequentially
        setTimeout(next, 0, 0, null);

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
            let instrumented = getInstrumentedCode(code, filename);

            let escapedFileName = filename.replace("'", "").replace("\\", "");

            // Wrap instrumented code in closure and replace method of jalangi with a custom one that passes
            // the current filename. This is not done for inline scripts due to possible performance impact if there are many.
            instrumented = jalangiOverrideSnippet.replace(/PLACEHOLDER/g, escapedFileName) + instrumented;

            if (developerMode) {

                let instrumentedFileName = filename;
                if (instrumentedFileName.lastIndexOf('.') !== -1) {
                    instrumentedFileName = instrumentedFileName.substring(0, instrumentedFileName.lastIndexOf('.')) + '_instrumented.js';
                } else {
                    instrumentedFileName = instrumentedFileName + '_instrumented.js'
                }

                let documentDomain = document.URL;
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
            return getInstrumentedCode(code);
        }

        function getInstrumentedCode(code) {
            let instrumentedCode = code;
            if (J$.instrumentCode !== undefined) {
                instrumentedCode = J$.instrumentCode(code, {wrapProgram: false, isEval: false}).code;
            }
            return instrumentedCode;
        }

        /**
         *
         * @param file
         * @param from 1 based and included
         * @param to included
         * @returns {*}
         */
        function getCode(file, from, to) {
            let code = scriptCache[file];
            if (!code || code.length === 0) {
                return ''
            }

            let lines = code.split(/\r?\n/g);
            if (to > lines.length) {
                to = lines.length;
            }
            if (from < 1) {
                from = 1;
            }

            return {
                lines: lines.slice(from - 1, to),
                from: from, to: to
            }
        }

        /**
         * Execute code with original page context.
         * @param code
         */
        function executeInContext(code) {
            let fun = new Function(code);
            fun.call(window);
        }

        /**
         * For formatted version see FilenameHookSnippet.js
         * @type {string}
         */
        let jalangiOverrideSnippet = "var X$ = window.J$;var J$ = jQuery.extend({}, X$);J$.W = function (iid, name, val, lhs,"
            + "isGlobal, isPseudoGlobal) {return X$.W(iid, name, val, lhs, isGlobal, isPseudoGlobal, 'PLACEHOLDER');};J$.M ="
            + "function (iid, base, offset, isConstructor) {return X$.M(iid, base, offset, isConstructor, 'PLACEHOLDER');};"
            + "J$.F = function (iid, f, isConstructor) {return X$.F(iid, f, isConstructor, 'PLACEHOLDER');};\n";

        return {
            getCode: getCode
        };
    }

// set cri.instrument only after all settings are retrieved.
    chrome.storage.sync.get({
        defaultIgnores: ["Rx.js", "rx.lite.js", "Bacon.js", "Bacon.UI.js",
            "jquery.js", "rx.all.js", "jquery-2.1.4.js", "jquery-1.9.1.min.js", "jquery-1.12.4.min.js",
            "underscore.js", "underscore-min.js"],
        developerMode: false,
        criconfigincludes: []
    }, function (items) {
        cri.instrumentor = createInstrumentor(window, items);
    });
}());
