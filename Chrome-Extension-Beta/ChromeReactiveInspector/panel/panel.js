if (!cri) {
    throw "cri namespace not initialized. something went wrong during loading of js files";
}

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

let g = '',
    render = new dagreD3.render(),
    svg = '',
    svgGroup = '',
    inner = '';

let $canvasContainer = $("#canvas-container");
let tooltipManager = new cri.TooltipManager($canvasContainer);
let history = new cri.graphHistory.History();

var initialiseGraph = function () {
    // Create the input graph
    g = new dagreD3.graphlib.Graph()
        .setGraph({rankdir: "LR"})
        .setDefaultEdgeLabel(function () {
            return {};
        });

    // Set up an SVG group so that we can translate the final graph.

    inner = d3.select("svg g");
    if (inner.size() === 1) {
        // clear previous nodes
        inner.html(null);
    } else {
        svg = d3.select("svg");
        svgGroup = svg.append("g");
        inner = svg.select("g");
    }
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

let debouncedRedrawGraph = _.debounce(redrawGraphFromUI, 250);

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
    if (stageToRedraw) {

        history.loadStage(stageToRedraw, function (stage) {
            stage.nodes.forEach(function (node) {
                g.setNode(node.nodeId, node);
            });

            stage.edges.forEach(function (edge) {
                g.setEdge(edge.from, edge.to, {label: edge.label ? edge.label : ""});
            });

            // draw graph with asked stage data
            render(d3.select("svg g"), g);
            applyRxRyAttribute();
            applyNodeExtensions();
        });
    } else {
        // draw graph with asked stage data
        render(d3.select("svg g"), g);
        applyRxRyAttribute();
        applyNodeExtensions();
    }
}

function applyRxRyAttribute() {
    var $canvasRects = $("#svg-canvas").find("rect");
    $canvasRects.attr("rx", "5");
    $canvasRects.attr("ry", "5");
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
    history.clear();
    historyEntries = [];
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
        //TODO: currently wont trigger a download from chrome
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
    //TODO: if keyup and blur right after, this will fire twice with same values
    // same for paste + blur
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
var $breakpointContainer = $('#cri-breakpoints-container');
var reactiveBreakpointManager = new cri.ReactiveBreakpointManager($breakpointContainer);

var $breakpointSelect = $('#cri-breakpoint-select');
$breakpointSelect.editableSelect({filter: false});

$('#cri-breakpoint-query-submit').click(function () {
    reactiveBreakpointManager.submitBreakpoints($breakpointSelect.val());
});

$breakpointContainer.on("click", "span.bpoint-remove", function () {
    var bpointIndexToRemove = $(this).data('bpoint-index');
    reactiveBreakpointManager.removeBreakPointByIndex(bpointIndexToRemove);
});

function applyNodeExtensions() {
    tooltipManager.initializeTooltips(svg.selectAll("g.node"));
}

/* force focus on canvas on mouse over to enable ctrl capture on the canvas */
$canvasContainer.on("mouseenter.focus", function () {
    var scrollLeft = $document.scrollLeft();
    var scrollTop = $document.scrollTop();

    this.focus();

    $document.scrollTop(scrollTop);
    $document.scrollLeft(scrollLeft);
});