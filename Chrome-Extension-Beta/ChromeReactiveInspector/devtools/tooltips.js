var cri = cri || {};

_.extend(cri, (function (window) {

    /**
     * Handles creation and displaying of tooltips for all nodes in the Dependency Graph.
     * @param $canvasContainer A jquery selector for the element that contains the canvas used to display
     * the Dependency Graph.
     * @param graphManager The GraphManger instance that handles the Dependency Graph.
     * @returns {TooltipManager}
     * @constructor {TooltipManager}
     */
    function TooltipManager($canvasContainer, graphManager) {
        this.graphManager = graphManager;
        this.codePreviewCanceled = [];
        this.$canvasContainer = $canvasContainer;
        return this;
    }

    function getTooltip(d3node) {
        if (d3node.classed("show-code")) {
            let nodeinfo = d3node.attr("nodeinfo");
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

    function initCodePreview(self, d3node, data, $node) {
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

            let codeInfo = answer.code;
            let codeHtml = createCodeTooltipContent(data.sourceInfo.begin, data.sourceInfo.end, codeInfo);
            d3node.attr("nodeinfo", codeHtml);

            // do not display code preview if user already moved the mouse outside of the node
            if (self.codePreviewCanceled[data.nodeId]) {
                self.codePreviewCanceled[data.node] = null;
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
            let codePreviewScope = items.codePreviewScope ? parseInt(items.codePreviewScope) : 4;
            let codePreviewMax = items.codePreviewMax ? parseInt(items.codePreviewMax) : Number.POSITIVE_INFINITY;

            // cap the maximum scope to be displayed
            let codeLength = (sourceInfo.end.line - sourceInfo.begin.line);
            if (codePreviewMax && codeLength + 2 * codePreviewScope > codePreviewMax) {
                codePreviewScope = Math.round((codePreviewMax - codeLength) / 2);
                if (codePreviewScope < 0) codePreviewScope = 0;
            }

            let from = sourceInfo.begin.line - codePreviewScope;
            let to = sourceInfo.end.line + codePreviewScope;
            let filename = sourceInfo.filename;

            sendObjectToInspectedPage({
                destination: 'instrumented',
                action: 'getSourceCode',
                content: {to: to, from: from, filename: filename}
            }, callback);
        });
    }

    function cancelCodePreview(self, d3node, data) {
        let nodeinfo = d3node.attr("nodeinfo");
        if (!nodeinfo) {
            return;
        }
        if (nodeinfo === "-pending-") {
            // signal pending request to not display code preview
            self.codePreviewCanceled[data.nodeId] = true;
        }

        // switch back to tooltip
        d3node.classed("show-code", false);
    }

    function createNormalTooltipContent(type, method, sourceInfo, value, nodeUpdates) {
        // use jquery to construct html strings to prevent layout breaks
        // if "weird" values are displayed. (also prevents xss)

        let sourceInfoText = '';
        if (sourceInfo && sourceInfo.begin) {
            sourceInfoText = sourceInfo.begin.line;
            if (sourceInfo.begin.column) {
                sourceInfoText += ':' + sourceInfo.begin.column;
            }

            // if filename is not set the source code is inline of the html
            sourceInfoText += ' (' + (sourceInfo.filename ? sourceInfo.filename : 'html') + ')';
        }

        let $tooltip = $("<div>").addClass("custom-tooltip");
        if (type) {
            $tooltip.append($("<p>").text('Type: ' + type));
        }
        if (method) {
            $tooltip.append($("<p>").text('Method: ' + method));
        }
        if (sourceInfoText) {
            $tooltip.append($("<p>").text('Location: ' + sourceInfoText));
            $tooltip.append($("<p>").text('Press CTRL to view source code.').addClass("tooltip-hint"));
        }
        if (nodeUpdates && nodeUpdates > 1) {
            $tooltip.append($("<p>").text('Number of Updates: ' + nodeUpdates));
        }
        if (value) {
            // if the value gets much bigger than 300, all other info in the tooltip can not be viewed anymore
            let cropped = value.substring(0, 300);
            $tooltip.append($("<p>").text('Value: ' + cropped));
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

        let padding = codeInfo.to.toString().length;
        let tags = _.map(codeInfo.lines, function (currentLine, i) {
            let lineNumber = codeInfo.from + i;
            let $p = $("<p>");

            if (lineNumber === begin.line && lineNumber === end.line) {
                return $p.html(cri.utils.createMixed(
                    createLineNumber(lineNumber, padding),
                    currentLine.substring(0, begin.column - 1),
                    $("<em>").text(currentLine.substring(begin.column - 1, end.column - 1)),
                    currentLine.substring(end.column - 1, currentLine.length)
                ));

            } else if (lineNumber === begin.line) {
                return $p.html(cri.utils.createMixed(
                    createLineNumber(lineNumber, padding),
                    currentLine.substring(0, begin.column - 1),
                    $("<em>").text(currentLine.substring(begin.column - 1, currentLine.length))
                ));

            } else if (lineNumber === end.line) {
                return $p.html(cri.utils.createMixed(
                    createLineNumber(lineNumber, padding),
                    $("<em>").text(currentLine.substring(0, end.column - 1)),
                    currentLine.substring(end.column - 1, currentLine.length)
                ));

            } else if (lineNumber > begin.line && lineNumber < end.line) {
                // inside multiline write statement

                return $p.html(cri.utils.createMixed(
                    createLineNumber(lineNumber, padding),
                    $("<em>").text(currentLine)
                ));

            } else {
                return $p.html(cri.utils.createMixed(
                    createLineNumber(lineNumber, padding),
                    currentLine));
            }
        });

        let $container = $("<div class='custom-tooltip'>");
        tags.forEach(function (p) {
            $container.append(p);
        });
        return ($("<div>").append($container)).html();
    }

    function createLineNumber(number, padding) {
        return $("<span>")
            .html("" + cri.utils.pad(number, padding) + " ")
            .addClass("line-number");
    }

    function refreshTooltip($element) {
        $element.tipsy("show");
    }


    /**
     * initializes tooltips on all nodes. The nodes must be located somewhere inside the $canvasContainer or
     * the ui events wont be received.
     * @param d3nodeCollection
     */
    TooltipManager.prototype.initializeTooltips = function (d3nodeCollection) {
        let self = this;
        // add tipsy to nodes
        d3nodeCollection.attr("title", function (v) {
            let data = self.graphManager.getNode(v);
            return createNormalTooltipContent(data.type, data.method, data.sourceInfo, data.value, data.nodeUpdates);
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
            let node = this;
            let d3node = d3.select(node);
            let data = self.graphManager.getNode(v);

            if (d3.event.ctrlKey) {
                initCodePreview(self, d3node, data, $(node));
            }

            self.$canvasContainer
                .on("keydown.code", function (e) {
                    if (e.ctrlKey) {
                        initCodePreview(self, d3node, data, $(node));
                    }
                })
                .on("keyup.code", function (e) {
                    if (!e.ctrlKey) {
                        cancelCodePreview(self, d3node, data);
                        refreshTooltip($(node));
                    }
                });

            d3node.on("mouseleave.code", function () {

                // unregister events
                d3node.on("mouseleave.code", null);
                self.$canvasContainer
                    .off("keydown.code")
                    .off("keyup.code");
                cancelCodePreview(self, d3node, data, $(node));
            })
        })
    };

    return {TooltipManager: TooltipManager}
})(window));