var cri = cri || {};

(function () {
    const cacheMax = 5;
    const cacheMin = 2;
    const deltaWindowSize = 100;

    function History() {
        this.nextStageId = 0;
        this.storage = [];
        this.currentBase = null;
        this.currentStageId = 0;
    }

    cri.stageStorage.initialize();

    History.prototype.saveStage = function (change) {
        // its very important to keep this function fast, because it will directly affect the recording

        let stageId = ++this.nextStageId;

        if (isBaseStageId(stageId)) {
            let stage = new BaseStage(createStage(stageId));
            this.currentBase = stage;
            this.storage.push(stage);
        } else {
            this.currentBase.deltas.push(new DeltaStage(change));
        }

        if (this.storage.length > cacheMax) {
            let toPersist = this.storage.splice(0, this.storage.length - cacheMin);
            cri.stageStorage.storeOnDisk(toPersist, getBaseKey);
        }
        return stageId;
    };

    function createStage(id) {
        let edges = cri.graphManager.graph.edges().map(e =>
            new Edge(e.v, e.w, cri.graphManager.graph.edge(e)));

        let nodes = cri.graphManager.graph.nodes().map(n => {
            let node = {...cri.graphManager.graph.node(n)};

            // remove classes added by findNode feature
            node.class = node.class
                .replace(/fade/g, '')
                .replace(/highlight/g, '');

            return node;
        });

        return new Stage(id, nodes, edges);
    }

    function isBaseStageId(id) {
        return (id - 1) % deltaWindowSize === 0;
    }

    function getBaseIndex(id) {
        return Math.floor((id - 1) / deltaWindowSize);
    }

    function getStageIdForBaseIndex(index) {
        return index * deltaWindowSize + 1
    }

    function belongsToBase(stageId, baseStageId) {
        return getBaseIndex(stageId) === getBaseIndex(baseStageId);
    }

    function getBaseKey(baseStage) {
        return getBaseIndex(baseStage.stage.id);
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
            loadBaseStage(this, stageId, () =>
                callback(self.currentBase.stage, null));
        } else if (belongsToBase(stageId, this.currentBase.stage.id)) {
            let upper = (stageId - 1) % deltaWindowSize;
            let lower = (previousStageId - 1) % deltaWindowSize;
            if (previousStageId < stageId) {
                // case: direction is forward and the requested stageId is not a base stage. just apply changes
                let deltaOffset = this.currentBase.deltas.slice(lower, upper);
                callback(null, deltaOffset)
            } else {
                // case: direction is NOT forward, but the requested stageId belongs to the current base stage
                let deltaOffset = this.currentBase.deltas.slice(0, upper);
                callback(this.currentBase.stage, deltaOffset)
            }
        } else {
            // case: not base and not the current
            loadBaseStage(this, getBaseIndex(stageId) * deltaWindowSize + 1, () =>
                callback(self.currentBase.stage, self.currentBase.deltas.slice(0, (stageId - 1) % deltaWindowSize)));
        }
    };

    function loadBaseStage(self, stageId, callback) {
        function findInStorage(stageId) {
            return self.storage.find(base => base.stage.id === stageId);
        }

        let isInStorage = findInStorage(stageId);
        if (isInStorage) {
            self.currentBase = isInStorage;
            callback();
            return
        }

        // store current storage on disk, because the last stages may not be stored yet.
        cri.stageStorage.storeOnDisk(self.storage, getBaseKey);

        let baseIndex = getBaseIndex(stageId);
        let lowerbound  = 0;
        let upperbound = getBaseIndex(self.nextStageId); // get the last BaseStage as a dynamic upper bound.
        let lower = Math.max(lowerbound, baseIndex - Math.floor(cacheMax / 2));
        let upper = Math.min(upperbound, lower + cacheMax);
        let therange      = range(lower, upper + 1);
        let loaded = therange.filter(id => findInStorage(getStageIdForBaseIndex(id)));
        let toload = therange.filter(id => !findInStorage(getStageIdForBaseIndex(id)));

        let stagesToKeep = self.storage
          .filter(idx => loaded.includes(getBaseIndex(baseStage.stage.id)));

        cri.stageStorage.loadFromDisk(toload, baseStages => {
            self.storage = baseStages.concat(stagesToKeep);
            self.storage.sort((x, y) => x.stage.id < y.stage.id);
            self.currentBase = findInStorage(stageId);
            callback();
        });
    }

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

    function Edge(from, to, data) {
        this.from = from;
        this.to = to;
        this.data = data;
    }

    function range(from, to) {
        return Array.from({length: to}, (x,i) => from+i);
    }

    // exports
    cri.History = History;
    cri.Stage = Stage;
}());
