var cri = cri || {};

_.extend(cri, (function (window) {

    let pendingIcon = "<div class='code-tooltip custom-tooltip'><img class='code-placeholder' src='"+chrome.extension.getURL("resources/loading.gif")+"'></div>";

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
        this.$canvasContainer = $canvasContainer;
        return this;
    }

    function loadCodeIfNotThere(node, data) {
//        if (!data || !data.sourceInfo) return; // missing source code file

        // only load code once
        let d3node = d3.select(node);
        if (d3node.attr("data-require-code")) return;
        d3node.attr("data-require-code", true);

        // refresh tipsy / sidebar
        d3node.attr("original-title", "this"); $(node).tipsy("show");
        let norm = createNormalTooltipContent(data);
        d3node.attr("tooltip", norm + (data.sourceInfo ? pendingIcon : ""));
        $("#sidebar").html(d3node.attr("tooltip"));

        // async, refresh tipsy with source code preview
        if (data.sourceInfo) requestCodeSnippetAsync(data.sourceInfo, function (answer) {
            if (!answer.code) return;
            let codeHtml = createCodeTooltipContent(data.sourceInfo.begin, data.sourceInfo.end, answer.code);

            // refresh tipsy / sidebar
            d3node.attr("tooltip", norm + codeHtml);
            $("#sidebar").html(d3node.attr("tooltip"));
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

    function createNormalTooltipContent(data) {
        let sourceInfo = data.sourceInfo;
        let sourceInfoText = '';
        if (sourceInfo && sourceInfo.begin) {
            let columnInfo = sourceInfo.begin.column ? ':' + sourceInfo.begin.column : '';
            // if filename is not set, the source code is inline the html file
            let fileInfo = ' (' + (sourceInfo.filename ? sourceInfo.filename : 'html') + ')';
            sourceInfoText = sourceInfo.begin.line + columnInfo + fileInfo;
        }

        let tooltip = $("<div class='custom-tooltip node-tooltip'>");
        let addText = (label, text, cls) => tooltip.append($("<div style='margin-bottom:1em'>", {"class":cls}).append(
          $("<p>").append($("<b>").text(label)),
          $("<p>").text(text)
        ));
//          tooltip.append($("<p>", {"class":cls}).text(text))

        if (data.nodeId)      addText('Id:', data.nodeId);
        if (data.type)        addText('Type:', data.type);
        if (data.method)      addText('Method:', data.method);

        tooltip.append($("<div style='margin-bottom:1em'>").append(
          $("<p>").append($("<b>").text("Value:")),
          $("<p>").append($("<input>"), $("<button>").text("Fire!"))
        ));

//        if (data.nodeUpdates && data.nodeUpdates > 1)
//                              addText('Number of Updates: ' + data.nodeUpdates);
//        if (data.value)
//            addText('Value: ' + data.value.substring(0, 300)); // value can get very long
        if (sourceInfoText) {
            addText('Location:', sourceInfoText);
//            addText('(Press CTRL to view source code, click to focus panel if not working.)');
        }

        // jquery sanitizes strings to prevent layout breaks and xss attacks
        return $("<div>").append(tooltip).html();
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
        let tags = $.map(codeInfo.lines, function (currentLine, i) {
            let lineNumber = codeInfo.from + i;

            let before = lineNumber < begin.line   ? currentLine.length:
                         lineNumber === begin.line ? begin.column-1:
                                                     0;
            let after  = lineNumber < end.line     ? currentLine.length:
                         lineNumber === end.line   ? end.column-1:
                                                     0;

            let ln = $("<span>").html("" + cri.utils.pad(lineNumber, padding) + " ");
            let alpha = $("<span>").append(currentLine.substring(0, before));
            let beta  = $("<em>").text(currentLine.substring(before, after));
            let gamma = $("<span>").append(currentLine.substring(after, currentLine.length));
            return $("<p>").append(ln, alpha, beta, gamma);
        });
        let $container = $("<div class='custom-tooltip code-tooltip'>").append(tags);
        return $("<div>").append($container).html();
    }

    /**
     * initializes tooltips on all nodes. The nodes must be located somewhere inside the $canvasContainer or
     * the ui events wont be received.
     * @param d3nodeCollection
     */
    TooltipManager.prototype.initializeTooltips = function (d3nodeCollection) {
        let self = this;

        // give each node a tipsy tooltip
        d3nodeCollection.each(function () { $(this).tipsy({
            gravity: "w", opacity: 1, html: true,
        }) });

        // register ui events
        $("body")
            .on("keydown", (e) => { if (e.ctrlKey)  $("body").addClass("ctrl-key") })
            .on("keyup",   (e) => { if (!e.ctrlKey) $("body").removeClass("ctrl-key") });

        d3nodeCollection.on("mouseenter.code", function (v) {
            loadCodeIfNotThere(this, self.graphManager.getNode(v));
            $("#sidebar").html(d3.select(this).attr("tooltip"));
        });
    };

    return {TooltipManager: TooltipManager}
})(window));
