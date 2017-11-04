var cri = cri || {};

_.extend(cri, (function (window) {

    function TooltipManager($canvasContainer) {
        var self = this;
        var codePreviewCanceled = [];

        function getTooltip(d3node) {
            if (d3node.classed("show-code")) {
                var nodeinfo = d3node.attr("nodeinfo");
                if (nodeinfo === "-pending-") {
                    // create loading icon as placeholder
                    return $("<div>").append(
                        $("<img>").attr("src", chrome.extension.getURL("resources/loading.gif")).addClass("code-placeholder")
                    ).html();
                } else {
                    return nodeinfo;
                }
            } else {
                return d3node.attr("original-title");
            }
        }

        function initCodePreview(d3node, data, $node) {
            if (!data.sourceInfo) {
                // source info is not set yet, so no code preview can be show
                return;
            }

            if (d3node.classed("show-code")) {
                // code preview is already displayed
                return;
            }

            if (d3node.attr("nodeinfo")) {
                // code info is already loaded
                // activate code preview
                d3node.classed("show-code", true);
                refreshTooltip($node);
                return;
            }

            // set pending to prevent multiple code requests
            d3node.attr("nodeinfo", "-pending-");

            requestCodeSnippetAsync(data.sourceInfo, function (answer) {

                if (!answer.code) {
                    return;
                }

                var codeInfo = answer.code;
                var codeHtml = createCodeTooltipContent(data.sourceInfo.begin, data.sourceInfo.end, codeInfo);
                d3node.attr("nodeinfo", codeHtml);

                // do not display code preview if user already moved the mouse outside of the node
                if (codePreviewCanceled[data.nodeId]) {
                    codePreviewCanceled[data.node] = null;
                    return;
                }
                // display code preview
                d3node.classed("show-code", true);
                refreshTooltip($node);
            });
        }

        /**
         * Queries content script for code corresponding to the provided source info.
         * @param sourceInfo source info object
         * @param callback called when the result is received.
         */
        function requestCodeSnippetAsync(sourceInfo, callback) {
            chrome.storage.sync.get({codePreviewScope: '', codePreviewMax: ''}, function (items) {
                var codePreviewScope = items.codePreviewScope ? parseInt(items.codePreviewScope) : 4;
                var codePreviewMax = items.codePreviewMax ? parseInt(items.codePreviewMax) : Number.POSITIVE_INFINITY;

                // cap the maximum scope to be displayed
                var codeLength = (sourceInfo.end.line - sourceInfo.begin.line);
                if (codePreviewMax && codeLength + 2 * codePreviewScope > codePreviewMax) {
                    codePreviewScope = Math.round((codePreviewMax - codeLength) / 2);
                    if (codePreviewScope < 0) codePreviewScope = 0;
                }

                var from = sourceInfo.begin.line - codePreviewScope;
                var to = sourceInfo.end.line + codePreviewScope;
                var filename = sourceInfo.filename;

                sendObjectToInspectedPage({
                    destination: 'instrumented',
                    action: 'getSourceCode',
                    content: {to: to, from: from, filename: filename}
                }, callback);
            });
        }

        function cancelCodePreview(d3node, data) {
            var nodeinfo = d3node.attr("nodeinfo");
            if (!nodeinfo) {
                return;
            }
            if (nodeinfo === "-pending-") {
                // signal pending request to not display code preview
                codePreviewCanceled[data.nodeId] = true;
            }

            // switch back to tooltip
            d3node.classed("show-code", false);
        }

        function createNormalTooltipContent(id, name, type, method, sourceInfo) {
            // use jquery to construct html strings to prevent layout breaks
            // if "weird" values are displayed. (also prevents xss)

            var sourceInfoText = '';
            if (sourceInfo && sourceInfo.begin) {
                sourceInfoText = sourceInfo.begin.line;
                if (sourceInfo.begin.column) {
                    sourceInfoText += ':' + sourceInfo.begin.column;
                }

                // if filename is not set the source code is inline of the html
                sourceInfoText += ' (' + (sourceInfo.filename ? sourceInfo.filename : 'html') + ')';
            }

            var $tooltip = $("<div>").addClass("custom-tooltip");
            if (id) {
                $tooltip.append($("<p>").text('Id: ' + id));
            }
            if (name) {
                $tooltip.append($("<p>").text('Name: ' + name));
            }
            if (type) {
                $tooltip.append($("<p>").text('Type: ' + type));
            }
            if (sourceInfoText) {
                $tooltip.append($("<p>").text('Location: ' + sourceInfoText));
                $tooltip.append($("<p>").text('Press CTRL to view source code.').addClass("tooltip-hint"));
            }
            if (method) {
                $tooltip.append($("<p>").text('Method: ' + method));
            }

            return $("<div>")
                .append($tooltip).html();
        }

        /**
         * Create html for code preview
         * @param codeInfo object containing code lines, "from" and "to". "from" and "to" describe the actual
         * used boundaries of the code snippet
         * @param begin object with line and column info
         * @param end object with line and column info
         * @returns {string}
         */
        function createCodeTooltipContent(begin, end, codeInfo) {
            var tags = _.map(codeInfo.lines, function (currentLine, i) {
                var lineNumber = codeInfo.from + i;
                var $p = $("<p>");

                if (lineNumber === begin.line && lineNumber === end.line) {
                    // start and end in the same line
                    return $p.append("" + lineNumber + ": " + currentLine.substring(0, begin.column - 1)
                        + "<em>" + currentLine.substring(begin.column - 1, end.column - 1) + "</em>"
                        + currentLine.substring(end.column - 1, currentLine.length));

                } else if (lineNumber === begin.line) {
                    $p.text("" + lineNumber + ": " + currentLine.substring(0, begin.column - 1));
                    return $p.append($("<em>").text(currentLine.substring(begin.column - 1, currentLine.length)));

                } else if (lineNumber === end.line) {
                    $p.text(currentLine.substring(end.column - 1, currentLine.length));
                    return $p.prepend($("<em>").text("" + lineNumber + ": " + currentLine.substring(0, end.column - 1)));

                } else if (lineNumber > begin.line && lineNumber < end.line) {
                    // inside multiline write statement
                    return $p.append($("<em>").text("" + lineNumber + ": " + currentLine));

                } else {
                    return $p.text("" + lineNumber + ": " + currentLine);
                }
            });

            var $container = $("<div class='custom-tooltip'>");
            tags.forEach(function (p) {
                $container.append(p);
            });
            return ($("<div>").append($container)).html();
        }

        function refreshTooltip($element) {
            $element.tipsy("show");
        }

        /**
         * initializes tooltips on all nodes. The nodes must be located somewhere inside the $canvasContainer or
         * the ui events wont be received.
         * @param d3nodeCollection
         */
        function initializeTooltips(d3nodeCollection) {
            // add tipsy to nodes
            d3nodeCollection.attr("title", function (v) {
                var data = g.node(v);
                return createNormalTooltipContent(data.nodeId, data.ref, data.type, data.method, data.sourceInfo)
            })
                .each(function () {
                    // add tooltips
                    $(this).tipsy({
                        gravity: "w", opacity: 1, html: true, className: function () {
                            return d3.select(this).classed("show-code") ? "code-tooltip" : "node-tooltip"
                        }, title: function () {
                            return getTooltip(d3.select(this));
                        }
                    });
                });

            // register ui events
            d3nodeCollection.on("mouseenter.code", function (v) {
                var node = this;
                var d3node = d3.select(node);
                var data = g.node(v);

                if (d3.event.ctrlKey) {
                    initCodePreview(d3node, data, $(node));
                }

                $canvasContainer
                    .on("keydown.code", function (e) {
                        if (e.ctrlKey) {
                            initCodePreview(d3node, data, $(node));
                        }
                    })
                    .on("keyup.code", function (e) {
                        if (!e.ctrlKey) {
                            cancelCodePreview(d3node, data);
                            refreshTooltip($(node));
                        }
                    });

                d3node.on("mouseleave.code", function () {

                    // unregister events
                    d3node.on("mouseleave.code", null);
                    $canvasContainer
                        .off("keydown.code")
                        .off("keyup.code");
                    cancelCodePreview(d3node, data, $(node));
                })
            })
        }

        this.initializeTooltips = initializeTooltips;

        return this;
    }

    return {TooltipManager: TooltipManager}
})(window));