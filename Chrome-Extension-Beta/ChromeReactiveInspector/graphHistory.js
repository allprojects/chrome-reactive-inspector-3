var cri = cri || {};

cri.graphHistory = (function (window) {
    const cacheSize = 60;

    function History() {
        this.nextStageId = 0;
        this.storage = [];
        this.storageOffset = 1;
    }

    cri.stageStorage.initialize();

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
        if (this.storage.length > cacheSize) {
            let toPersist = this.storage.splice(0, cacheSize / 2);
            cri.stageStorage.storeOnDisk(toPersist);
            this.storageOffset = this.storage[0].id;
        }
        return stageId;
    };

    History.prototype.loadStage = function (stageId, callback) {
        let self = this;
        if (stageId < this.storageOffset || stageId > this.storageOffset + this.storage.length - 1) {
            let lowerBounds = stageId - cacheSize / 2;
            if (lowerBounds < 1) {
                lowerBounds = 1;
            }

            let upperBounds = stageId + cacheSize / 2;
            if (upperBounds >= this.nextStageId) {
                upperBounds = this.nextStageId;

                if (upperBounds - lowerBounds >= cacheSize - 10) {
                    // increase lower bounds to prevent instant need to reload from disk if a new step is generated,
                    // but only increase if a (nearly) full cache is to be loaded.
                    lowerBounds += 10;
                }
            }

            // stage is not in cache, retrieve a block from local disk where the requested stage is in the middle
            cri.stageStorage.storeOnDisk(this.storage);
            cri.stageStorage.loadFromDisk(lowerBounds, upperBounds, function (stages) {
                self.storage = stages;
                self.storageOffset = self.storage[0].id;
                callback(_.find(self.storage, function (s) {
                    return s.id === stageId;
                }));
            });
        } else {
            // stage is in storage so just return it
            callback(_.find(this.storage, function (s) {
                return s.id === stageId;
            }));
        }
    };

    History.prototype.getStageCount = function () {
        return this.nextStageId;
    };

    History.prototype.clear = function () {
        this.nextStageId = 0;
        this.storage = [];
        this.storageOffset = 1;
        cri.stageStorage.clear();
        console.log("cri: history cleared")
    };

    // if Stage should get a real prototype sometime, be sure to go to stageStorage.loadFromDisk
    // and comment in the initialization of the stages with the correct type. Currently all stages are
    // just key:value collections after loading.
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