var cri = cri || {};

(function () {
    /**
     * Handles the displayed Dependency Graph and the current stage.
     * @param d3container The parent of the Dependency Graph selected by a d3 selector.
     * @param history The history that should be used to load stages.
     * @param afterChangedCallback A callback that is invoked after the graph changed and was rendered.
     * @param afterResetCallback A callback that is invoked if the graph is reset.
     * @returns {GraphManager}
     * @constructor {GraphManager}
     */
    function GraphManager(d3container, history, afterChangedCallback, afterResetCallback) {
        this.container = d3container;
        this.graph = null;
        this.history = history;

        // currentStage is initially null but if the stage is later set back to stage 0 it will have the value 0.
        this.currentStage = null;

        this.render = new dagreD3.render();
        this.afterChangedCallback = afterChangedCallback;
        this.afterResetCallback = afterResetCallback;
        this.graphElement = null;
        initializeGraph(this);
        return this;
    }

    GraphManager.prototype.clearGraph = function () {
        // clear graph
        this.graphElement.selectAll("*").remove();
        this.graph = createGraph();

        // remove saved data
        this.history.clear();
        this.afterResetCallback();
        console.log("cleared graph",);
    };

    GraphManager.prototype.drawStage = function (stageId) {
        let self = this;

        if (stageId === 0) {
            self.graph = createGraph();
            self.currentStage = 0;
            //this.clearGraph();
            self.reRender();
            self.afterChangedCallback();
            return;
        }

        if (!stageId) {
            console.error("Unset stage Id with value '" + stageId + "'");
            return;
        }
        //TODO: prevent reload of current stage.

        // get data for asked stage
        this.history.loadStage(stageId, function (baseStage, deltaStages) {
            self.currentStage = stageId;

            if (baseStage) {
                // clear graph here and not earlier to prevent flickering of the ui if the loading takes a few milliseconds.
                self.graph = createGraph();

                baseStage.nodes.forEach(function (node) {
                    self.graph.setNode(node.nodeId, node);
                });

                baseStage.edges.forEach(function (edge) {
                    self.graph.setEdge(edge.from, edge.to, edge.data);
                });
            }
            if (deltaStages) {
                self.clearClasses();
                deltaStages.forEach(function (delta, index) {
                    applyDeltaStage(self, delta, index === deltaStages.length - 1);
                });
            }

            // draw graph with asked stage data
            self.reRender();
            self.afterChangedCallback();
        });
    };

    GraphManager.prototype.getNode = function (id) {
        return this.graph.node(id);
    };

    GraphManager.prototype.getNodes = function () {
        let self = this;
        return this.graph.nodes().map(function (n) {
            return self.getNode(n);
        });
    };

    GraphManager.prototype.clearClasses = function () {
        let self = this;

        // clear previously marked edges and nodes
        self.graph.nodes().forEach(n => {
            let node = self.graph.node(n);
            // remove multiple spaces
            node.class = (node.class || "").replace(/current/g, "").replace(/ +(?= )/g, "");
        });

        self.graph.edges().forEach(e => {
            let edge = self.graph.edge(e);
            edge.class = (edge.class || "").replace(/current/g, "");
        });

        // clear ui, because dagre-d3 does not clean up old classes properly
        self.container.selectAll("g.current").classed("current", false);
    };

    //TODO: make this function obsolete and remove it. Rendering should not be directly influenced from
    // outside this class
    GraphManager.prototype.reRender = function () {
        this.render(this.graphElement, this.graph);
    };

    function initializeGraph(self) {
        // do not use jquery for any access to the svg or g elements - it behaves unexpectedly with svg elements.
        self.graph = createGraph();
        self.graphElement = self.container.append("g");
    }

    function createGraph() {
        return new dagreD3.graphlib.Graph()
            .setGraph({rankdir: "LR"}) // left to right
            .setDefaultEdgeLabel(function () { return {}; });
    }

    function applyDeltaStage(self, delta, isLast) {
        let data = delta.change.data;
        let ev = delta.change.event;
        if (ev === "newNode" || ev === "updateNode") {
            if (isLast) data.class = (data.class || "") + " current";
            self.graph.setNode(data.nodeId, data);
        } else if (ev === "saveEdge")
            self.graph.setEdge(data.edgeStart, data.edgeEnd, {
                label: data.edgeLabel,
                class: isLast ? "current" : ""
            });
        else if (ev === "removeEdge")
            self.graph.removeEdge(data.edgeStart, data.edgeEnd, data.edgeLabel);
        else
            console.error("Unknown change '" + delta.change.event + "' to the graph detected. " +
                          "Please report this error to the owner of the Chrome Reactive Inspector.");
    }

    cri.GraphManager = GraphManager
})();
