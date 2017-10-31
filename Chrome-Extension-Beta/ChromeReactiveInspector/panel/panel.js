var $document = $(document);
$document.ready(function () {
    $(".dropdown-toggle").dropdown();
});

$(".dropdown-menu li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

var $dialog = $("#dialog");
$dialog.hide();

$dialog.dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        "Confirm": function () {
            //setCriStatus($('#cri-rec-status'), false);
            // sendObjectToInspectedPage(
            //     {
            //         action: "threshold",
            //         content: {
            //             "status": false
            //         }
            //     }
            // );
            $(this).dialog("close");
        },
        "Cancel": function () {
            configRecStatusButton.click();
            $(this).dialog("close");
            // sendObjectToInspectedPage(
            //     {
            //         action: "threshold",
            //         content: {
            //             "status": false
            //         }
            //     }
            // );
        }
    }
});


// Simple function to style the tooltip for the given node.
var styleTooltip = function (id, name, type, method, sourceInfo) {
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

    var $tooltip = $("<div>").addClass("custom_tooltip");
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
};

var g = '',
    render = '',
    svg = '',
    svgGroup = '',
    inner = '',
    $canvasContainer = $("#canvas-container");

var initialiseGraph = function () {
    // Create the input graph
    g = new dagreD3.graphlib.Graph()
        .setGraph({rankdir: "LR"})
        .setDefaultEdgeLabel(function () {
            return {};
        });

    // Create the renderer
    render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.
    svg = d3.select("svg");
    svgGroup = svg.append("g");
    inner = svg.select("g");
};

initialiseGraph();
// Set up zoom support
var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([-8, 8])
    .on('zoom', zoomed);
//
svg
    .call(zoom) // delete this line to disable free zooming
    .call(zoom.event);

function zoomed() {
    inner.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
}

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

/**
 * Slider to navigate the steps in the dependency graph.
 * @type {jQuery}
 */
var rxSlider = $("#slider")
    .slider({
        min: 0,
        max: 0,
        change: function (event, ui) {
            // The delay is smaller than the delay for graph updates via the slider,
            // because the buttons allow for a much more fine grained navigation in big graphs.
            $('.ui-slider-handle').text(ui.value);
            redrawGraphFromUI(ui.value);
        },
        slide: function (event, ui) {
            $('.ui-slider-handle').text(ui.value);
            debouncedRedrawGraph(ui.value);
        }
    })
    .slider("pips");

var debouncedRedrawGraph = _.debounce(redrawGraphFromUI, 250);

var lastDrawnStep = null;

/**
 * Prevent unnecessary redraws of the dependency graph.
 * This catches debounced calls from causing a redraw for a single stage twice.
 * @param stage
 */
function redrawGraphFromUI(stage) {

    if (lastDrawnStep !== null && lastDrawnStep === stage) {
        return;
    }

    lastDrawnStep = stage;
    redrawGraphToStage(stage);
}

// slider controls
$('#down').click(function () {
    rxSlider.slider('value', rxSlider.slider('value') + rxSlider.slider("option", "step"));
});
$('#up').click(function () {
    rxSlider.slider('value', rxSlider.slider('value') - rxSlider.slider("option", "step"));
});

rxSlider.slider("option", "min", 0);
rxSlider.slider("option", "max", 0);
rxSlider.slider("option", "value", 0);
rxSlider.slider("pips", "refresh");
var _node = '';

// This method redraw dependency graph to given stage
function redrawGraphToStage(stageToRedraw) {

    initialiseGraph();

    // get data for asked stage
    var stageDataToDraw = '';
    var nodesToDraw = '';
    var edgesToDraw = '';
    if (stageToRedraw) {
        stageDataToDraw = rxGraphStages[stageToRedraw - 1].stageData;
        nodesToDraw = stageDataToDraw.nodes;
        edgesToDraw = stageDataToDraw.edges;

        nodesToDraw.forEach(function (node) {
            g.setNode(node.nodeId, node);
        });

        edgesToDraw.forEach(function (edge) {
            var edgeLabel = "";
            if (edge.edgeLabel) {
                edgeLabel = edge.edgeLabel;
            }
            g.setEdge(edge.edgeStart, edge.edgeEnd, {
                label: edgeLabel
            });
        });
    }

    // draw graph with asked stage data
    render(d3.select("svg g"), g);
    applyRxRyAttribute();
    applyNodeExtensions();
}

function applyRxRyAttribute() {
    var $canvasRects = $("#svg-canvas").find("rect");
    $canvasRects.attr("rx", "5");
    $canvasRects.attr("ry", "5");
}

var codePreviewCanceled = [];

function applyNodeExtensions() {
    // This will display node details on mouse hover.
    inner.selectAll("g.node")
    /* add tooltips */
        .attr("title", function (v) {
            var data = g.node(v);
            return styleTooltip(data.nodeId, data.ref, data.type, data.method, data.sourceInfo)
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

    // add events for code previews
    svg.selectAll("g.node")
        .on("mouseenter.code", function (v) {
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
        });
}

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
        // source info is not set yet, so no code preview can be shown

        //TODO: replace this with a message being displayed in the tooltip
        // telling the user about this
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

    requestCodePreview(data, function (answer) {

        if (!answer.code) {
            return;
        }

        var codeInfo = answer.code;
        var codeHtml = createCodePreviewHtml(data.sourceInfo.begin, data.sourceInfo.end, codeInfo);
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

function refreshTooltip($element) {
    $element.tipsy("hide");
    $element.tipsy("show");
}

var configIncludeFilesField = $('#cri-config-includes');
var previousConfigFiles = [];
var threshold = '';
var configRecStatusButton = document.getElementById('cri-rec-status');
// (function () {
// populate
chrome.storage.sync.get('criconfigincludes', function (items) {
    // console.log("config from storage");
    // console.log(items.criconfigincludes);
    previousConfigFiles = items.criconfigincludes || [];
    configIncludeFilesField.value = $('#cri-config-includes').tokenfield('setTokens', items.criconfigincludes) || '';
});
chrome.storage.sync.get('cri_config_rec_status', function (items) {
    if (items.cri_config_rec_status !== undefined) {
        var recStatusFromStorage = items.cri_config_rec_status;
        configRecStatusButton.setAttribute('data-rec-status', recStatusFromStorage);
        $(this).data("rec-status", recStatusFromStorage);
        if (recStatusFromStorage) {
            configRecStatusButton.innerText = 'Pause Recording';
            configRecStatusButton.classList.add('btn-info');
            configRecStatusButton.classList.remove('btn-danger');
        } else {
            configRecStatusButton.innerText = 'Start Recording';
            configRecStatusButton.classList.remove('btn-info');
            configRecStatusButton.classList.add('btn-danger');
        }
    }
});
//TODO: Warning, this is not a synchronous call so threshold may not be set when its used
chrome.storage.sync.get('thresholdValue', function (items) {
    threshold = items.thresholdValue;
});

configIncludeFilesField
    .on('tokenfield:createtoken', function (e) {
        setCricConfigFiles(1, e.attrs.value)
    })
    .on('tokenfield:removedtoken', function (e) {
        setCricConfigFiles(0, e.attrs.value)
    })
    .tokenfield();

function setCricConfigFiles(val, fileName) {
    if (val) {
        if (!_.contains(previousConfigFiles, fileName)) {
            previousConfigFiles.push(fileName)
        }
    }
    else {
        if (_.contains(previousConfigFiles, fileName)) {
            previousConfigFiles = _.without(previousConfigFiles, _.findWhere(previousConfigFiles, fileName));
        }
    }
    chrome.storage.sync.set({
        'criconfigincludes': previousConfigFiles
    });
}


configIncludeFilesField.tokenfield();
/**
 * This method is called whenever the user clicks on 'Pause' or 'Start' recording button.
 */
configRecStatusButton.addEventListener('click', function () {
    var currentStatus = $(this).attr('data-rec-status');
    var temp = (currentStatus === 'true');
    // $(this).data("rec-status",!currentStatus);
    $(this).attr('data-rec-status', !temp);
    setCriStatus($(this), !temp);

});

function setCriStatus(element, status) {
    chrome.storage.sync.set({
        'cri_config_rec_status': status
    });
    // sendObjectToInspectedPage(
    //     {
    //         action: "cri_config_rec_status",
    //         content: {
    //             "status": status
    //         }
    //     }
    // );
    if (status) {
        // isConfirmed = false;
        element.text('Pause Recording');
        element.addClass('btn-info');
        element.removeClass('btn-danger');
    } else {
        element.text('Start Recording');
        element.addClass('btn-danger');
        element.removeClass('btn-info');
    }
}

// Reset everything
$("#cri-reset").click(function () {
    d3.selectAll("svg g").remove();
    initialiseGraph();

    //2 reset step slider
    rxSlider.slider("option", "min", 0);
    rxSlider.slider("option", "max", 0);
    rxSlider.slider("option", "value", 0);
    rxSlider.slider("pips", "refresh");

    // remove saved data
    rxGraphStages = [];
    isConfirmed = false
});

$('#cri-download-graph').click(function () {
    sendObjectToInspectedPage({destination: "background", action: "tabInfo"}, function (response) {
        var currentTabUrl = response.currentTabUrl;
        if (!currentTabUrl) {
            console.log('Error retrieving url of current inspected tab.');
            return;
        }

        var filename = currentTabUrl.substring(currentTabUrl.lastIndexOf('/') + 1);
        if (!filename || filename === "") {
            return;
        }

        var svgElement = document.getElementById('svg-canvas');
        var simg = new Simg(svgElement);
        // Replace the current SVG with an image version of it.
        // simg.replace();
        // And trigger a download of the rendered image.
        simg.download('dependency_graph_' + filename);
    });
});


$('#cri-find-btn').click(function () {
    var type = $('#featureType').text().trim();
    if (type === 'Search')
        searchNodeFunction();
    else if (type === 'Dependents')
        dependency('dependents');
    else if (type === 'Dependencies')
        dependency('dependencies');
});


var searchNode = '';

function setSearchNode() {
    searchNode = $("#cri-node-search-val");
}

setSearchNode();

var nodeFound = false;
$("#cri-node-search-val").on('change keyup paste', function () {
    if (!searchNode) {
        setSearchNode();
    }
    var searchNodeVal = searchNode.val();
    if (searchNodeVal === '') {
        redrawGraphToStage(rxSlider.slider('value'))
    }
    searchNode.removeClass('error');
});


/**
 * Whenever user searches for node, below method will be called.
 */
function searchNodeFunction() {
    searchNode.removeClass('error');
    var all_nodes = Object.keys(g._nodes).map(function (key) {
        return g._nodes[key];
    });

    var searchNodeVal = searchNode.val();
    if (searchNodeVal) {
        nodeFound = false;
        all_nodes.forEach(function (node) {
            if (node.ref && searchNodeVal && node.ref.includes(searchNodeVal)) {
                nodeFound = true;
                node.class = node.class.replace(/current/g, '').trim().replace(/normal/g, '').trim() + ' highlight';
            }
            else {
                node.class = node.class.replace(/highlight/g, '') + ' fade';
            }
        });
        if (nodeFound) {
            searchNode.removeClass('error');
            render(d3.select("svg g"), g);
            var $rect = $("#svg-canvas rect");
            $rect.attr("rx", "5");
            $rect.attr("ry", "5");
        } else {
            searchNode.addClass('error');
        }

    } else {
        redrawGraphToStage(rxSlider.slider('value'));
    }
}

function dependency(type) {
    var all_nodes = Object.keys(g._nodes).map(function (key) {
        return g._nodes[key];
    });
    var searchNodeVal = searchNode.val();
    var tempNode = '';
    var edges = [];
    if (searchNodeVal) {
        nodeFound = false;
        all_nodes.forEach(function (node) {
            if (node.ref && searchNodeVal && node.ref === searchNodeVal) {
                tempNode = node;
                nodeFound = true;
            }
        });
        if (nodeFound) {
            searchNode.removeClass('error');
        } else {
            searchNode.addClass('error');
        }
    }
    allEdges.forEach(function (edge) {
        if (type === 'dependencies') {
            if (edge.endId === tempNode.nodeId) {
                edges.push(edge.startId);
            }
        }
        else {
            if (edge.startId === tempNode.nodeId) {
                edges.push(edge.endId);
            }
        }
    });
    if (edges.length) {
        var tempArray = [];
        if (type === 'dependencies') {
            var allEdgesReverse = allEdges.slice().reverse();
            allEdgesReverse.forEach(function (edge) {
                if (_.contains(edges, edge.endId))
                    edges.push(edge.startId);
                else
                    tempArray.push(edge)
            });

            tempArray.forEach(function (edge) {
                if (_.contains(edges, edge.endId))
                    edges.push(edge.startId);
            });

            edges = _.unique(edges)
        }
        else {
            allEdges.forEach(function (edge) {
                if (_.contains(edges, edge.startId))
                    edges.push(edge.endId);
                else
                    tempArray.push(edge)
            });
            tempArray.forEach(function (edge) {
                if (_.contains(edges, edge.startId))
                    edges.push(edge.endId);
            });
            edges = _.unique(edges);
        }
    }

    edges.push(tempNode.nodeId);

    all_nodes.forEach(function (node) {
        if (searchNodeVal && _.contains(edges, node.nodeId)) {
            node.class = node.class.replace(/current/g, '').trim().replace(/normal/g, '').trim() + ' highlight';
        }
        else {
            node.class = node.class.replace(/highlight/g, '') + ' fade';
        }
    });
    render(d3.select("svg g"), g);
    var $rect = $("#svg-canvas rect");
    $rect.attr("rx", "5");
    $rect.attr("ry", "5");
}

/**
 * editable select for find by query feature
 */
$('#cri-findnode-select').editableSelect({filter: false});
$("#cri-history-current-step").text(0);
$("#cri-history-last-step").text(0);

var stage = '';
$('#cri-history-query-submit').click(function () {
    var historyQuery, param1, param2 = '';
    var currentHistoryQuery = $('#cri-findnode-select').val();
    historyQuery = currentHistoryQuery.substring(0, currentHistoryQuery.indexOf('['));
    var matches = currentHistoryQuery.match(/\[(.*?)\]/g).map(function (val) {
        return val.replace('[', '').replace(']', '');
    });

    if (matches) {
        param1 = matches[0];
        if (matches[1]) {
            param2 = matches[1];
        }
        if (historyQuery === "nodeCreated") {
            var _tNode = _.find(allNodes, {name: param1});
            if (_tNode) {
                stage = historyEntries.filter(function (history) {
                    if (history.type === 'nodeCreated' && history.nodeId === _tNode.nodeId)
                        return history.stageId;
                });
                if (stage.length) {
                    redrawGraphToStage(stage[0].stageId);
                    rxSlider.slider('value', stage[0].stageId, rxSlider.slider("option", "step"));
                    $("#cri-history-current-step").text(1);
                    $("#cri-history-last-step").text(stage.length);
                }
            }
        } else if (historyQuery === "nodeUpdated") {
            stage = historyEntries.filter(function (history) {
                if (history.type === 'nodeUpdated' && history.nodeName === param1)
                    return history.stageId;
            });
            if (stage.length) {
                redrawGraphToStage(stage[0].stageId);
                rxSlider.slider('value', stage[0].stageId, rxSlider.slider("option", "step"));
                $("#cri-history-current-step").text(1);
                $("#cri-history-last-step").text(stage.length);
            }
        } else if (historyQuery === "evaluationYielded") {
            stage = historyEntries.filter(function (history) {
                if (history.type === 'nodeUpdated' && history.nodeName === param1) {
                    if (history.nodeValue === param2 || history.nodeValue.indexOf(param2) !== -1)
                        return history.stageId;
                }
            });
            if (stage.length) {
                redrawGraphToStage(stage[0].stageId);
                rxSlider.slider('value', stage[0].stageId, rxSlider.slider("option", "step"));
                $("#cri-history-current-step").text(1);
                $("#cri-history-last-step").text(stage.length);
            }

        } else if (historyQuery === "dependencyCreated") {
            var nodeNameSource = param1;
            var nodeNameDest = param2;
            var result;
            var tempResult = [];
            stage = '';
            var filteredHistoryEntries = _.filter(historyEntries, function (history) {
                return history.type === 'dependencyCreated'
            });

            filteredHistoryEntries.forEach(function (history) {
                if (history.startNodeName === nodeNameSource && history.endNodeName === nodeNameDest) {
                    result = history;
                } else if (history.startNodeName === nodeNameSource) {
                    tempResult.push(history)
                }
            });

            if (!result) {
                if (tempResult.length) {
                    tempResult.forEach(function (temp) {
                        if (temp.endNodeName === nodeNameDest && !result) {
                            result = temp
                        } else {
                            tempResult.pop(temp);
                            checkFurtherNodes(temp)
                        }
                    });
                }
            }

            function checkFurtherNodes(h) {
                filteredHistoryEntries.forEach(function (history) {
                    if (!result) {
                        if (history.startNodeName === h.endNodeName && history.endNodeName === nodeNameDest) {
                            result = history;
                        } else if (history.startNodeName === h.endNodeName) {
                            tempResult.push(history)
                        }
                    }
                });
            }

            if (result) {
                redrawGraphToStage(result.stageId);
                rxSlider.slider('value', result.stageId, rxSlider.slider("option", "step"));
                $("#cri-history-current-step").text(1);
                $("#cri-history-last-step").text(1);
            }
        }
    }
});


$('#cri-history-query-prev').click(function () {
    var currentStepFromHistoryQuery = $("#cri-history-current-step").text();
    var nextStepToAccess = parseInt(currentStepFromHistoryQuery) - 2;
    if (stage && stage.length && nextStepToAccess > -1) {
        var firstFoundStageId = stage[nextStepToAccess].stageId;
        rxSlider.slider('value', firstFoundStageId, rxSlider.slider("option", "step"));
        redrawGraphToStage(firstFoundStageId);
        $("#cri-history-current-step").text(nextStepToAccess + 1);
    }
});
$('#cri-history-query-next').click(function () {
    var currentStepFromHistoryQuery = $("#cri-history-current-step").text();
    var nextStepToAccess = parseInt(currentStepFromHistoryQuery);
    if (stage && (stage.length > 1) && stage.length > nextStepToAccess) {
        var firstFoundStageId = stage[nextStepToAccess].stageId;
        rxSlider.slider('value', firstFoundStageId, rxSlider.slider("option", "step"));
        redrawGraphToStage(firstFoundStageId);
        $("#cri-history-current-step").text(nextStepToAccess + 1);
    }
});

/**
 * Reactive Breakpoints feature
 */
$('#cri-breakpoint-select').editableSelect({filter: false});
var allBreakPoints = [];

$('#cri-breakpoint-query-submit').click(function () {

    var historyQuery, param1, param2 = '';

    var currentHistoryQuery = $('#cri-breakpoint-select').val();

    historyQuery = currentHistoryQuery.substring(0, currentHistoryQuery.indexOf('['));

    var matches = currentHistoryQuery.match(/\[(.*?)\]/g).map(function (val) {
        return val.replace('[', '').replace(']', '');
    });

    if (matches) {
        param1 = matches[0];
        if (matches[1]) {
            param2 = matches[1];
            if (param2 === 'nodeId')
                return false
        }
        if (param1 === 'nodeId')
            return false;


        // NOW we have query and parameter
        // check which query to apply, find data from current stages
        var breakPointToStore = {
            query: historyQuery,
            params: matches
        };
        storeBreakPoint(breakPointToStore);
    }
});

// This method append breakpoint object to local storage
function storeBreakPoint(breakPointToStore) {
    // by passing an object you can define default values e.g.: []
    chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var currentBreakPoints = result.criReactiveBreakPoints;

        var alreadyExists = _.some(currentBreakPoints, function (bp) {
            if (bp.params[0] === breakPointToStore.params[0] && bp.query === breakPointToStore.query) {
                if (breakPointToStore.params.length > 1) {
                    return bp.params.length > 1 && breakPointToStore.params[1] === bp.params[1];
                }
                return true;
            }
            return false;
        });
        if (!alreadyExists) {
            currentBreakPoints.push(breakPointToStore);
            // set the new array value to the same key
            chrome.storage.sync.set({criReactiveBreakPoints: currentBreakPoints}, function () {
                // refresh front end , where we list current breakpoints
                refreshCurrentBreakPointsFrontEnd();
            });
        }
    });
}

function removeBreakPointByIndex(index) {
    chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var currentBreakPoints = result.criReactiveBreakPoints;
        currentBreakPoints.splice(index, 1);
        // set the new array value to the same key
        chrome.storage.sync.set({criReactiveBreakPoints: currentBreakPoints}, function () {
            // refresh front end , where we list current breakpoints
            refreshCurrentBreakPointsFrontEnd();
        });
    });

}

$("#cri-breakpoints-container").on("click", "span.bpoint-remove", function () {
    var bpointIndexToRemove = $(this).data('bpoint-index');
    removeBreakPointByIndex(bpointIndexToRemove);
});


function refreshCurrentBreakPointsFrontEnd() {
    // remove everything
    $('#cri-breakpoints-container').html("");
    // get current breakpoints from storage and list down

    chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var currentBreakPoints = result.criReactiveBreakPoints;
        for (var index in currentBreakPoints) {
            var currentBreakPoint = currentBreakPoints[index];
            var currentBreakPointQuery = currentBreakPoint.query;
            if (currentBreakPoint.params[0] !== undefined) {
                currentBreakPointQuery = currentBreakPointQuery + "[" + currentBreakPoint.params[0] + "]";
            }
            if (currentBreakPoint.params[1] !== undefined) {
                currentBreakPointQuery = currentBreakPointQuery + "[" + currentBreakPoint.params[1] + "]";
            }
            var bPointHtml = "<div class='bpoint-entry'><span data-bpoint-index='" + index + "' class='bpoint-remove'>X</span><span class='bpoint-query'>" + currentBreakPointQuery + "</span></div>";
            $('#cri-breakpoints-container').append(bPointHtml);
        }

    });
}

refreshCurrentBreakPointsFrontEnd();

// })();


function requestCodePreview(node, callback) {
    chrome.storage.sync.get({codePreviewScope: '', codePreviewMax: ''}, function (items) {
        var codePreviewScope = items.codePreviewScope ? parseInt(items.codePreviewScope) : 4;
        var codePreviewMax = items.codePreviewMax ? parseInt(items.codePreviewMax) : -1;

        // cap the maximum scope to be displayed
        var codeLength = (node.sourceInfo.end.line - node.sourceInfo.begin.line);
        if (codePreviewMax && codeLength + 2 * codePreviewScope > codePreviewMax) {
            codePreviewScope = Math.round((codePreviewMax - codeLength) / 2);
            if (codePreviewScope < 0) codePreviewScope = 0;
        }

        var from = node.sourceInfo.begin.line - codePreviewScope;
        var to = node.sourceInfo.end.line + codePreviewScope;
        var filename = node.sourceInfo.filename;

        sendObjectToInspectedPage({
            destination: 'instrumented',
            action: 'getSourceCode',
            content: {to: to, from: from, filename: filename}
        }, callback);
    });
}

/**
 * Create html for code preview
 * @param codeInfo object containing code lines, "from" and "to". "from" and "to" describe the actual
 * used boundaries of the code snippet
 * @param begin object with line and column info
 * @param end object with line and column info
 * @returns {string}
 */
function createCodePreviewHtml(begin, end, codeInfo) {
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
            $p.text(currentLine.substring(begin.column - 1, currentLine.length));
            return $p.prepend($("<em>").text("" + lineNumber + ": " + currentLine.substring(0, begin.column - 1)));

        } else if (lineNumber > begin.line && lineNumber < end.line) {
            // inside multiline write statement
            return $p.append($("<em>").text("" + lineNumber + ": " + currentLine));

        } else {
            return $p.text("" + lineNumber + ": " + currentLine);
        }
    });

    var $container = $("<code>");
    tags.forEach(function (p) {
        $container.append(p);
    });
    return ($("<div>").append($container)).html();
}

/* force focus on canvas on mouse over to enable ctrl capture on the canvas */
$canvasContainer.on("mouseenter.focus", function () {
    var scrollLeft = $document.scrollLeft();
    var scrollTop = $document.scrollTop();

    this.focus();

    $document.scrollTop(scrollTop);
    $document.scrollLeft(scrollLeft);
});