console.log("panel.js");


// Simple function to style the tooltip for the given node.
var styleTooltip = function (id, name, type, source) {
    return "<div class='custom_tooltip'><p>" + 'Id: '+  id + "</p><p>" + 'Name: '+  name + "</p><p>" + 'Type: '+ type + "</p>" +
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
var zoom = d3.behavior.zoom().on("zoom", function () {
    inner.attr("transform", "translate(" + d3.event.translate + ")" +
        "scale(" + d3.event.scale + ")");
});
svg.call(zoom);


// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

// Center the graph
/*
 var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
 svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
 svg.attr("height", g.graph().height + 40);
 */

/**
 *
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
            // redrawGraphToStage(ui.value);
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
//d3.select("svg").remove();

    d3.selectAll("svg g").remove();
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
            //console.log(entry);
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

(function () {

    var configIncludeFilesField = document.getElementById('cri-config-includes');
    var configRecStatusButton = document.getElementById('cri-rec-status');
    // populate
    chrome.storage.sync.get('criconfigincludes', function (items) {
        console.log("config from storage");
        console.log(items.criconfigincludes);

        configIncludeFilesField.value = items.criconfigincludes || '';
    });
    chrome.storage.sync.get('cri_config_rec_status', function (items) {
        if (items.cri_config_rec_status !== undefined) {
            var recStatusFromStorage = items.cri_config_rec_status;
            if (recStatusFromStorage === 1) {
                $(this).data("rec-status", 1);
                $(this).html('Pause Recording');

            } else {
                $(this).data("rec-status", 0);
                $(this).html('Start Recording');

            }
        }
        // to fix the initial loading
        else{
            $(this).data("rec-status", 1);
            $(this).html('Pause Recording');
            chrome.storage.sync.set({
                'cri_config_rec_status': 1
            });
        }
    });


    // change
    configIncludeFilesField.addEventListener('change', function (e) {
        console.log("config changed");
        console.log(this.value);
        // save setting
        chrome.storage.sync.set({
            'criconfigincludes': this.value
        });
    }, this);


    configRecStatusButton.addEventListener('click', function (e) {
        var currentStatus = $(this).data("rec-status");

        if (currentStatus === 1){
            $(this).data("rec-status",0);
            $(this).html('Start Recording');
            chrome.storage.sync.set({
                'cri_config_rec_status': 0
            });
        }else{
            $(this).data("rec-status",1);
            $(this).html('Pause Recording');
            chrome.storage.sync.set({
                'cri_config_rec_status': 1
            });
        }
    }, this);

    // Reset everything
    $("#cri-reset").click(function () {
        // 1 clear graph

        //2 reset step slider
        rxSlider.slider("option", "min", 0);
        rxSlider.slider("option", "max", 0);
        rxSlider.slider("option", "value", 0);
        rxSlider.slider("pips", "refresh");

        // remove saved data
        rxGraphStages = [];
        d3.selectAll("svg g").remove();
        initialiseGraph();
    });

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

})();

