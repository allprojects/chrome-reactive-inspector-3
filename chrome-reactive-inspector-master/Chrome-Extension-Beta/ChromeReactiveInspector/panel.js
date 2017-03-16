console.log("panel.js");


// Simple function to style the tooltip for the given node.
var styleTooltip = function (name, label, description) {
    return "<p class='name'>" + label + "</p><p class='description'>" + description + "</p>";
};


// Create the input graph
var g = new dagreD3.graphlib.Graph()
    .setGraph({rankdir: "LR"})
    .setDefaultEdgeLabel(function () {
        return {};
    });
// g.setNode(0, {label: "TOP", class: "type-TOP"});

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    svgGroup = svg.append("g")
inner = svg.select("g");

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

// Slider initialization , that is used to access history steps
var rxSlider = $("#slider")
    .slider({
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

// This method redraw dependency graph to given stage
function redrawGraphToStage(stageToRedraw) {
//d3.select("svg").remove();

    // Create the input graph
    var g = new dagreD3.graphlib.Graph()
        .setGraph({rankdir: "LR"})
        .setDefaultEdgeLabel(function () {
            return {};
        });

    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select("svg"),
        svgGroup = svg.append("g")
    inner = svg.select("g");

    // Set up zoom support
    var zoom = d3.behavior.zoom().on("zoom", function () {
        inner.attr("transform", "translate(" + d3.event.translate + ")" +
            "scale(" + d3.event.scale + ")");
    });
    svg.call(zoom);


    // Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), g);


    //destroy current graph
    // inner.selectAll().remove();
    //d3.select("svg").remove();
    //d3.select("svg").selectAll("*").remove();

    // get data for asked stage
    var stageDataToDraw = rxGraphStages[stageToRedraw - 1].stageData;
    var nodesToDraw = stageDataToDraw.nodes;
    var edgesToDraw = stageDataToDraw.edges;

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

    // draw graph with asked stage data
    render(d3.select("svg g"), g);

}

(function () {

    var configIncludeFilesField = document.getElementById('cri-config-includes');
    var configRecStatusButton = document.getElementById('cri-rec-status');
    // populate
    chrome.storage.sync.get('criconfigincludes', function (items) {
        console.log("config from storage");
        console.log(items.criconfigincludes);

        configIncludeFilesField.value = items.criconfigincludes;
    });
    chrome.storage.sync.get('cri_config_rec_status', function (items) {
        if (items.cri_config_rec_status != undefined) {
            var recStatusFromStorage = items.cri_config_rec_status;
            if (recStatusFromStorage == 1) {
                $(this).data("rec-status", 1);
                $(this).html('Pause Recording');

            } else {
                $(this).data("rec-status", 0);
                $(this).html('Start Recording');

            }
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

        if (currentStatus == 1){
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
        var rxGraphStages = [];

        redrawGraphToStage(0);
    });


})();

