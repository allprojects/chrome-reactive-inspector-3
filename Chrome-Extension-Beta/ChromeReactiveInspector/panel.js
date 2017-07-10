console.log("panel.js");

// Simple function to style the tooltip for the given node.
var styleTooltip = function (id, name, type, source) {
    return "<div class='custom_tooltip'><p>" + 'Id: '+  id + "</p>" +
        "<p>" + 'Name: '+  name + "</p><p>" + 'Type: '+ type + "</p>" +
        "<p>" + 'Source: '+ source + "</p></div>";
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
 *  Slider feature
 *  */
// Slider initialization , that is used to access history steps
var rxSlider = $("#slider")
    .slider({
        min: 0,
        max: 0,
        change: function (event, ui) {
            $('.ui-slider-handle').text(ui.value);
            // on slider change destroy current graph and re build based on slider value
            // Check if the even is triggered by Manual sliding or programmatically.
            if (event.originalEvent) {
                redrawGraphToStage(ui.value);
            }
        }
    })
    .slider("pips");

// slider controls
$('#down').click(function () {
    rxSlider.slider('value', rxSlider.slider('value') + rxSlider.slider("option", "step"));
    redrawGraphToStage(rxSlider.slider('value'));
});
$('#up').click(function () {
    rxSlider.slider('value', rxSlider.slider('value') - rxSlider.slider("option", "step"));
    redrawGraphToStage(rxSlider.slider('value'));
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
    inner.selectAll("g.node")
        .attr("title", function (v) {
            return styleTooltip(g.node(v).nodeId, g.node(v).ref, g.node(v).type, g.node(v).sourceCodeLine)
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
(function () {
    var configRecStatusButton = document.getElementById('cri-rec-status');
    // populate
    chrome.storage.sync.get('criconfigincludes', function (items) {
        console.log("config from storage");
        console.log(items.criconfigincludes);
        previousConfigFiles = items.criconfigincludes || [];
        configIncludeFilesField.value = $('#cri-config-includes').tokenfield('setTokens', items.criconfigincludes) || '';
    });
    chrome.storage.sync.get('cri_config_rec_status', function (items) {
        if (items.cri_config_rec_status !== undefined) {
            var recStatusFromStorage = items.cri_config_rec_status;
            $(this).data("rec-status", recStatusFromStorage);
            if (recStatusFromStorage) {
                $(this).html('Pause Recording');
            } else {
                $(this).html('Start Recording');
            }
        }
        // to fix the initial loading
        else{
            $(this).data("rec-status", true);
            $(this).html('Pause Recording');
            chrome.storage.sync.set({
                'cri_config_rec_status': true
            });
        }
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
        var currentStatus = $(this).data("rec-status");

        $(this).data("rec-status",!currentStatus);
        chrome.storage.sync.set({
            'cri_config_rec_status': !currentStatus
        });
        if (currentStatus){
            $(this).html('Start Recording');
        }else{
            $(this).html('Pause Recording');
        }
    }, this);

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
    });

    /**
     * Whenever user searches for node, below method will be called.
     */
    $("#cri-node-search").on('change keyup paste', function() {
        var all_nodes = Object.keys(g._nodes).map(function (key) { return g._nodes[key]; });
        var searchNode = $("#cri-node-search").val();
        all_nodes.forEach(function (node) {
            if (node.ref && searchNode && node.ref.includes(searchNode))
                node.class = 'highlight';
            else
                node.class = 'normal'
        });

        render(d3.select("svg g"), g);
    });

    /**
     * editable select for find by query feature
     */
    $('#cri-findnode-select').editableSelect({filter: false});
    debugger;
    $("#cri-history-current-step").text(0);
    $("#cri-history-last-step").text(0);

    var stage = '';
    $('#cri-history-query-submit').click(function () {
        var historyQuery, param1, param2 = '';
        var currentHistoryQuery = $('#cri-findnode-select').val();
        historyQuery = currentHistoryQuery.substring(0, currentHistoryQuery.indexOf('['))
        //var matches = currentHistoryQuery.match(/\[(.*?)\]/);
        var matches = currentHistoryQuery.match(/\[(.*?)\]/g).map(function (val) {
            return val.replace('[', '').replace(']', '');
        });

        if (matches) {
            var param1 = matches[0];
            if (matches[1]) {
                var param2 = matches[1];
            }
            if (historyQuery === "nodeCreated") {
                stage = historyEntries.filter( function(history){
                    if(history.type === 'nodeCreated' && history.nodeName === param1)
                        return history.stageId;
                });
                if(stage.length){
                    redrawGraphToStage(stage[0].stageId);
                    rxSlider.slider('value', stage[0].stageId ,rxSlider.slider("option", "step"));
                    $("#cri-history-current-step").text(1);
                    $("#cri-history-last-step").text(stage.length);
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
                var nodeName = param1;
                var targetValue = param2;

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
})();

