var cri = cri || {};

cri.dependencyGraph = (function () {
    function GraphManager($container, history, afterChangedCallback, afterResetCallback) {
        this.$container = $container;
        this.graph = null;
        this.history = history;
        this.currentStage = null;
        this.render = new dagreD3.render();
        this.afterChangedCallback = afterChangedCallback;
        this.afterResetCallback = afterResetCallback;
        this.$graphElement = null;
        initializeGraph(this);
        return this;
    }

    GraphManager.prototype.clearGraph = function () {
        // clear graph
        this.$graphElement.html(null);
        this.graph = createGraph();

        // remove saved data
        this.history.clear();
        this.afterResetCallback();
    };

    GraphManager.prototype.drawStage = function (stageId) {
        let self = this;

        if (!stageId) {
            this.clearGraph();
            self.render(d3.select(self.$graphElement.get(0)), self.graph);
            self.afterChangedCallback();
            return;
        }
        //TODO: prevent reload of current stage.

        // get data for asked stage
        history.loadStage(stageId, function (baseStage, deltaStages) {
            self.currentStage = stageId;
            if (baseStage) {

                // clear graph here and not earlier to prevent flickering of the ui if the loading takes a few milliseconds.
                self.clearGraph();

                baseStage.nodes.forEach(function (node) {
                    self.graph.setNode(node.nodeId, node);
                });

                baseStage.edges.forEach(function (edge) {
                    self.graph.setEdge(edge.from, edge.to, {label: edge.label ? edge.label : ""});
                });
            }
            if (deltaStages) {
                deltaStages.forEach(function (delta) {
                    applyDeltaStage(self, delta);
                });
            }

            // draw graph with asked stage data
            self.render(d3.select(self.$graphElement.get(0)), self.graph);
            self.afterChangedCallback();
        });
    };

    //TODO: make this function obsolete and remove it
    GraphManager.prototype.reRender = function () {
        this.render(d3.select(this.$graphElement.get(0)), this.graph);
    };

    function initializeGraph(self) {
        self.graph = createGraph();
        self.$graphElement = $("<g>");
        self.$container.append(self.$graphElement);
    }

    function createGraph() {
        return new dagreD3.graphlib.Graph()
            .setGraph({rankdir: "LR"})
            .setDefaultEdgeLabel(function () {
                return {};
            });
    }

    function applyDeltaStage(self, delta) {
        let node = delta.change.data;
        let edge = delta.change.data;

        switch (delta.change.event) {
            case "newNode":
            case "updateNode":
                self.graph.setNode(node.nodeId, node);
                break;
            case "saveEdge":
                self.graph.setEdge(edge.edgeStart, edge.edgeEnd, {label: edge.edgeLabel});
                break;
            case "removeEdge":
                self.graph.removeEdge(edge.edgeStart, edge.edgeEnd, edge.edgeLabel);
                break;
            default:
                console.error("Unknown change '" + delta.change.event + "' to the graph detected. " +
                    "Please report this error to the owner of the Chrome Reactive Inspector.");
                break;
        }
    }

    return {GraphManager: GraphManager}
})(window);