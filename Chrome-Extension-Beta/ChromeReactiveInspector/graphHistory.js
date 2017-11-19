var cri = cri || {};

cri.graphHistory = (function (window) {
    const cacheMax = 5;
    const cacheMin = 2;
    const deltaWindowSize = 10;

    function History() {
        this.nextStageId = 0;
        this.storage = [];
        this.currentBase = null;
        this.currentStageId = 0;
    }

    cri.stageStorage.initialize();

    History.prototype.saveStage = function (graph, change) {
        // its very important to keep this function fast, because it will directly affect the recording

        let stageId = ++this.nextStageId;

        if (isBaseStageId(stageId)) {
            let stage = new BaseStage(createStage(stageId, graph));
            this.currentBase = stage;
            this.storage.push(stage);
        } else {
            this.currentBase.deltas.push(new DeltaStage(change));
        }

        if (this.storage.length > cacheMax) {
            let toPersist = this.storage.splice(0, this.storage.length - cacheMin);
            cri.stageStorage.storeOnDisk(toPersist);
        }
        return stageId;
    };

    function createStage(id, graph) {
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

        return new Stage(id, nodes, edges);
    }

    function isBaseStageId(id) {
        return (id - 1) % deltaWindowSize === 0;
    }

    function getBaseIndex(id) {
        return Math.floor((id - 1) / deltaWindowSize);
    }

    function belongsToBase(stageId, baseStageId) {
        return getBaseIndex(stageId) === getBaseIndex(baseStageId);
    }

    /**
     * Calls the callback with a restored graph
     * @param stageId
     * @param callback
     */
    History.prototype.loadStage = function (stageId, callback) {
        let self = this;
        let previousStageId = this.currentStageId;
        this.currentStageId = stageId;

        if (isBaseStageId(stageId)) {
            // case: is base id, so always load
            loadBaseStage(this, stageId, function () {
                callback(self.currentBase.stage, null);
            });
        } else if (belongsToBase(stageId, this.currentBase.stage.id)) {
            let upper = (stageId - 1) % deltaWindowSize;
            if (previousStageId < stageId) {
                // case: direction is forward and the requested stageId is not a base stage. just apply changes
                let deltaOffset = this.currentBase.deltas.slice(previousStageId - 1, upper);
                callback(null, deltaOffset)
            } else {
                // case: direction is NOT forward, but the requested stageId belongs to the current base stage
                let deltaOffset = this.currentBase.deltas.slice(0, upper);
                callback(this.currentBase.stage, deltaOffset)
            }
        } else {
            // case: not base and not the current
            loadBaseStage(this, getBaseIndex(stageId) * deltaWindowSize + 1, function () {
                callback(self.currentBase.stage, self.currentBase.deltas.slice(0, (stageId - 1) % deltaWindowSize));
            });
        }
    };

    function loadBaseStage(self, stageId, callback) {

        let isInStorage = _.find(self.storage, function (base) {
            return base.stage.id === stageId;
        });

        if (isInStorage) {
            self.currentBase = isInStorage;
            callback();
        } else {
            let baseIndex = getBaseIndex(stageId);
            let lower = baseIndex - Math.floor(cacheMax / 2);
            let upper = baseIndex + Math.floor(cacheMax / 2);
            let highest = getBaseIndex(this.highestStageId);

            if (lower < 0) {
                lower = 0;
                upper = highest > cacheMax ? cacheMax : highest;
            } else if (upper > highest) {
                upper = highest;
            }

            cri.stageStorage.loadFromDisk(lower, upper, function (baseStages) {
                self.storage = baseStages;
                self.currentBase = _.find(self.storage, function (base) {
                    return base.stage.id === stageId;
                });
                callback();
            });
        }
    }

    History.prototype.getStageCount = function () {
        return this.nextStageId;
    };

    History.prototype.clear = function () {
        this.nextStageId = 0;
        this.storage = [];
        this.currentBase = null;
        cri.stageStorage.clear();
        console.log("cri: history cleared")
    };

    // if Stage should get a real prototype sometime, be sure to go to stageStorage.loadFromDisk
    // and comment in the initialization of the stages with the correct type. Currently all stages are
    // just key:value collections after loading.
    function Stage(id, nodes, edges) {
        this.id = id;
        this.nodes = nodes;
        this.edges = edges;
    }

    function BaseStage(stage) {
        this.stage = stage;
        this.deltas = [];
    }

    function DeltaStage(change) {
        // used for easy check if an object is a delta stage. This is useful, because serialization will
        // recreate objects without a linked prototype.
        this.isDelta = true;
        this.change = change;
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