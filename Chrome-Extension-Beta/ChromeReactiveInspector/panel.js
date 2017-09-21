// console.log("panel.js");

$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
});

$(".dropdown-menu li a").click(function() {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

$("#dialog").hide();

$("#dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons : {
        "Confirm" : function() {
            // setCriStatus($('#cri-rec-status'), false);
            sendObjectToInspectedPage(
                {
                    action: "threshold",
                    content: {
                        "status": false
                    }
                }
            );
            $(this).dialog("close");
        },
        "Cancel" : function() {
            configRecStatusButton.click();
            $(this).dialog("close");
            sendObjectToInspectedPage(
                {
                    action: "threshold",
                    content: {
                        "status": false
                    }
                }
            );
        }
    }
});


// Simple function to style the tooltip for the given node.
var styleTooltip = function (id, name, type, source, method) {
    return "<div class='custom_tooltip'><p>" + 'Id: '+  id + "</p>" +
        "<p>" + 'Name: '+  name + "</p><p>" + 'Type: '+ type + "</p>" +
        "<p>" + 'Source Code Line: '+ source + "</p> "+
        "<p>" + 'Method: '+ method + "</p></div>";
};

var g = '',
    render = '',
    svg = '',
    svgGroup = '',
    inner = '';

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

var debouncedRedrawGraph = _.debounce(redrawGraphFromUI,250);

var lastDrawnStep = null;
/**
 * Prevent unnecessary redraws of the dependency graph.
 * This catches debounced calls from causing a redraw for a single stage twice.
 * @param stage
 */
function redrawGraphFromUI(stage) {

    if(lastDrawnStep !== null && lastDrawnStep === stage){
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
    if (stageToRedraw){
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
    $("#svg-canvas rect").attr("rx", "5");
    $("#svg-canvas rect").attr("ry", "5");

    /**
     * This will display node details on mouse hover.
     */
    inner.selectAll("g.node")
        .attr("title", function (v) {
            return styleTooltip(g.node(v).nodeId, g.node(v).ref, g.node(v).type, g.node(v).sourceCodeLine, g.node(v).method)
        })
        .each(function (v) {
            $(this).tipsy({gravity: "w", opacity: 1, html: true});
        });

    /**
     * This will send node details to console whenever an user clicks on it.
     */
    svg.selectAll("g.node").on("click", function(id) {
        _node = g.node(id);
        sendObjectToInspectedPage(
            {
                action: "node_details",
                content: {
                    "id": _node.nodeId,
                    "value": _node.value,
                    "source_line_number": _node.sourceCodeLine
                }
            }
        );
    });

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
                configRecStatusButton.innerHTML = 'Pause Recording';
                configRecStatusButton.classList.add('btn-info');
                configRecStatusButton.classList.remove('btn-danger');
            } else {
                configRecStatusButton.innerHTML = 'Start Recording';
                configRecStatusButton.classList.remove('btn-info');
                configRecStatusButton.classList.add('btn-danger');
            }
        }
    });

    chrome.storage.sync.get('thresholdValue', function(items) {
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
        if(val){
            if(!_.contains(previousConfigFiles, fileName)){
                previousConfigFiles.push(fileName)
            }
        }
        else{
            if(_.contains(previousConfigFiles, fileName)){
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
    configRecStatusButton.addEventListener('click', function (e) {
        var currentStatus = $(this).attr('data-rec-status');
        var temp = (currentStatus === 'true');
        // $(this).data("rec-status",!currentStatus);
        $(this).attr('data-rec-status', !temp);
        setCriStatus($(this), !temp);

    }, this);

    function setCriStatus(element, status){
        chrome.storage.sync.set({
            'cri_config_rec_status': status
        });
        sendObjectToInspectedPage(
            {
                action: "cri_config_rec_status",
                content: {
                    "status": status
                }
            }
        );
        if (status){
            // isConfirmed = false;
            element.html('Pause Recording');
            element.addClass('btn-info');
            element.removeClass('btn-danger');
        }else{
            element.html('Start Recording');
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
        sendObjectToInspectedPage({destination: "background", action:"tabInfo"}, function (response) {
            var currentTabUrl = response.currentTabUrl;
            if(!currentTabUrl) {
                console.log('Error retrieving url of current inspected tab.');
                return;
            }

            var filename = currentTabUrl.substring(currentTabUrl.lastIndexOf('/') + 1);
            if(!filename || filename === ""){
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
        if(type === 'Search')
            searchNodeFunction();
        else if(type === 'Dependents')
            dependency('dependents');
        else if(type === 'Dependencies')
            dependency('dependencies');
    });


    var searchNode = '';
    function setSearchNode() {
        searchNode = $("#cri-node-search-val");
    }

    setSearchNode();

    var nodeFound = false;
    $("#cri-node-search-val").on('change keyup paste', function() {
        if(!searchNode){
            setSearchNode();
        }
        var searchNodeVal = searchNode.val();
        if(searchNodeVal === ''){
            redrawGraphToStage(rxSlider.slider('value'))
        }
        searchNode.removeClass('error');
    });


    /**
     * Whenever user searches for node, below method will be called.
     */
    function searchNodeFunction() {
        searchNode.removeClass('error');
        var all_nodes = Object.keys(g._nodes).map(function (key) { return g._nodes[key]; });

        var searchNodeVal = searchNode.val();
        if(searchNodeVal){
            nodeFound = false;
            all_nodes.forEach(function (node) {
                if (node.ref && searchNodeVal && node.ref.includes(searchNodeVal)){
                    nodeFound = true;
                    node.class = node.class.replace(/current/g,'').trim().replace(/normal/g,'').trim()  + ' highlight';
                }
                else{
                   node.class = node.class.replace(/highlight/g,'') + ' fade';
                }
            });
            if(nodeFound){
                searchNode.removeClass('error');
                render(d3.select("svg g"), g);
                $("#svg-canvas rect").attr("rx", "5");
                $("#svg-canvas rect").attr("ry", "5");
            }else {
                searchNode.addClass('error');
            }

        }else{
            redrawGraphToStage(rxSlider.slider('value'))
        }
    }

    function dependency(type) {
        var all_nodes = Object.keys(g._nodes).map(function (key) { return g._nodes[key]; });
        var searchNodeVal = searchNode.val();
        var tempNode = '';
        var edges = [];
        if(searchNodeVal){
            nodeFound = false;
            all_nodes.forEach(function (node) {
                if (node.ref && searchNodeVal && node.ref === searchNodeVal){
                    tempNode = node;
                    nodeFound = true
                }
            });
            if(nodeFound){
                searchNode.removeClass('error');
            }else {
                searchNode.addClass('error');
            }
        }
        allEdges.forEach(function (edge) {
            if(type=== 'dependencies'){
                if(edge.endId === tempNode.nodeId){
                    edges.push(edge.startId);
                }
            }
            else{
                if(edge.startId === tempNode.nodeId){
                    edges.push(edge.endId);
                }
            }
        });
        if(edges.length){
            var tempArray = []
            if(type === 'dependencies'){
                var allEdgesReverse = allEdges.slice().reverse();
                allEdgesReverse.forEach(function (edge) {
                    if(_.contains(edges, edge.endId))
                        edges.push(edge.startId);
                    else
                        tempArray.push(edge)
                });

                tempArray.forEach(function (edge) {
                    if(_.contains(edges, edge.endId))
                        edges.push(edge.startId);
                });

                edges=_.unique(edges)
            }
            else {
                allEdges.forEach(function (edge) {
                    if(_.contains(edges, edge.startId))
                        edges.push(edge.endId);
                    else
                        tempArray.push(edge)
                });
                tempArray.forEach(function (edge) {
                    if(_.contains(edges, edge.startId))
                        edges.push(edge.endId);
                });
                edges=_.unique(edges)
            }
        }

        edges.push(tempNode.nodeId)

        all_nodes.forEach(function (node) {
            if (searchNodeVal && _.contains(edges, node.nodeId)){
                node.class = node.class.replace(/current/g,'').trim().replace(/normal/g,'').trim()  + ' highlight';
            }
            else{
                node.class = node.class.replace(/highlight/g,'') + ' fade';
            }
        });
        render(d3.select("svg g"), g);
        $("#svg-canvas rect").attr("rx", "5");
        $("#svg-canvas rect").attr("ry", "5");
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
        historyQuery = currentHistoryQuery.substring(0, currentHistoryQuery.indexOf('['))
        var matches = currentHistoryQuery.match(/\[(.*?)\]/g).map(function (val) {
            return val.replace('[', '').replace(']', '');
        });

        if (matches) {
            param1 = matches[0];
            if (matches[1]) {
                param2 = matches[1];
            }
            if (historyQuery === "nodeCreated") {
                var _tNode = _.find(allNodes, {name:param1});
                if(_tNode){
                    stage = historyEntries.filter( function(history){
                        if(history.type === 'nodeCreated' && history.nodeId === _tNode.nodeId)
                            return history.stageId;
                    });
                    if(stage.length){
                        redrawGraphToStage(stage[0].stageId);
                        rxSlider.slider('value', stage[0].stageId ,rxSlider.slider("option", "step"));
                        $("#cri-history-current-step").text(1);
                        $("#cri-history-last-step").text(stage.length);
                    }
                }
            } else if (historyQuery === "nodeUpdated") {
                stage = historyEntries.filter( function(history){
                    if(history.type === 'nodeUpdated' && history.nodeName === param1)
                        return history.stageId;
                });
                if(stage.length){
                    redrawGraphToStage(stage[0].stageId);
                    rxSlider.slider('value', stage[0].stageId ,rxSlider.slider("option", "step"));
                    $("#cri-history-current-step").text(1);
                    $("#cri-history-last-step").text(stage.length);
                }
            } else if (historyQuery === "evaluationYielded") {
                stage = historyEntries.filter( function(history){
                    if(history.type === 'nodeUpdated' && history.nodeName === param1){
                        if(history.nodeValue === param2 || history.nodeValue.indexOf(param2) !== -1)
                            return history.stageId;
                    }
                });
                if(stage.length){
                    redrawGraphToStage(stage[0].stageId);
                    rxSlider.slider('value', stage[0].stageId ,rxSlider.slider("option", "step"));
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
                    if(history.startNodeName === nodeNameSource && history.endNodeName === nodeNameDest){
                        result = history;
                    }else if(history.startNodeName === nodeNameSource){
                        tempResult.push(history)
                    }
                });

                if(!result){
                    if(tempResult.length){
                        tempResult.forEach(function (temp) {
                            if(temp.endNodeName === nodeNameDest  && !result){
                                result = temp
                            }else{
                                tempResult.pop(temp);
                                checkFurtherNodes(temp)
                            }
                        });
                    }
                }

                function checkFurtherNodes(h) {
                    filteredHistoryEntries.forEach(function (history) {
                        if(!result){
                            if(history.startNodeName === h.endNodeName && history.endNodeName === nodeNameDest){
                                result = history;
                            }else if(history.startNodeName === h.endNodeName){
                                tempResult.push(history)
                            }
                        }
                    });
                }

                if(result){
                    redrawGraphToStage(result.stageId);
                    rxSlider.slider('value', result.stageId ,rxSlider.slider("option", "step"));
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
            rxSlider.slider('value', firstFoundStageId , rxSlider.slider("option", "step"));
            redrawGraphToStage(firstFoundStageId);
            $("#cri-history-current-step").text(nextStepToAccess+1);
        }

    });
    $('#cri-history-query-next').click(function () {
        var currentStepFromHistoryQuery = $("#cri-history-current-step").text();
        var nextStepToAccess = parseInt(currentStepFromHistoryQuery);
        if (stage && (stage.length > 1)) {
            var firstFoundStageId = stage[nextStepToAccess].stageId;
            rxSlider.slider('value', firstFoundStageId, rxSlider.slider("option", "step"));
            redrawGraphToStage(firstFoundStageId);
            $("#cri-history-current-step").text(nextStepToAccess+1);
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
                if(param2 === 'nodeId')
                    return false
            }
            if(param1 === 'nodeId')
                return false;


            // NOW we have query and parameter
            // check which query to apply , find data from current stages
            var breakPointToStore = {
                query: historyQuery,
                params: matches
            };

            var x =  _.some(allBreakPoints, function (bp) {
                if(param2)
                    return bp.params[0] === breakPointToStore.params[0] && bp.params[1] === breakPointToStore.params[1] && bp.query === breakPointToStore.query;
                else
                    return bp.params[0] === breakPointToStore.params[0] && bp.query === breakPointToStore.query;
            });
            if (!x) {
                storeBreakPoint(breakPointToStore);
            }
        }
    });


    // This method append breakpoint object to local storage
    function storeBreakPoint(breakPointToStore) {
        allBreakPoints.push(breakPointToStore);
        // by passing an object you can define default values e.g.: []
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var currentBreakPoints = result.criReactiveBreakPoints;
            currentBreakPoints.push(breakPointToStore);
            // set the new array value to the same key
            chrome.storage.sync.set({criReactiveBreakPoints: currentBreakPoints}, function () {
                // you can use strings instead of objects
                // if you don't  want to define default values
                chrome.storage.sync.get('criReactiveBreakPoints', function (result) {
                });
                // refresh front end , where we list current breakpoints
                refreshCurrentBreakPointsFrontEnd();
            });
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
                // you can use strings instead of objects
                // if you don't  want to define default values
                chrome.storage.sync.get('criReactiveBreakPoints', function (result) {
                    //console.log(result.criReactiveBreakPoints)
                });
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

