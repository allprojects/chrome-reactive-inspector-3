var cri = cri || {};

cri.graphHistory = (function (window) {
    function History() {
        this.nextStageId = 0;
        this.storage = [];
    }

    History.prototype.saveStage = function (graph, event) {
        let stageId = ++this.nextStageId;

        let edges = _.map(graph.edges(), function (e) {
            return new Edge(e.v, e.w, graph.edge(e).label);
        });

        let nodes = _.map(graph.nodes(), function (n) {

            let uiNode = _.clone(graph.node(n));
            // remove classes added by findNode feature
            uiNode.class = uiNode.class
                .replace(/fade/g, '')
                .replace(/highlight/g, '');

            return uiNode;
        });

        let stage = new Stage(stageId, event, nodes, edges);
        this.storage.push(stage);
        return stageId;
    };

    History.prototype.loadStage = function (stageId) {
        let stage = _.find(this.storage, function (s) {
            return s.id === stageId
        });

        return stage;
    };

    History.prototype.getStageCount = function () {
        return this.nextStageId;
    };

    History.prototype.clear = function () {
        this.nextStageId = 0;
        this.storage = [];
    };

    function Stage(id, event, nodes, edges) {
        this.id = id;
        this.event = event;
        this.nodes = nodes;
        this.edges = edges;
    }

    function Edge(from, to, label) {
        this.from = from;
        this.to = to;
        this.label = label;
    }

    return {
        History: History,
        Stage: Stage,
        Edge: Edge
    }
})(window);