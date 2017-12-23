var cri = cri || {};

_.extend(cri, (function (window) {

    function SearchGraphManager(graphManager, $searchNode) {
        this.graphManager = graphManager;
        this.$searchNode = $searchNode;
        return this;
    }

    SearchGraphManager.prototype.searchNodeFunction = function (searchNodeVal) {
        this.$searchNode.removeClass('error');

        if (!searchNodeVal) {
            this.resetSearch();
            return;
        }

        let all_nodes = this.graphManager.getNodes();
        let nodeFound = false;
        all_nodes.forEach(function (node) {
            if (node.ref && searchNodeVal && node.ref.includes(searchNodeVal)) {
                nodeFound = true;
                node.class = applySearchClass(node.class, 'highlight', true);
            }
            else {
                node.class = applySearchClass(node.class, 'fade');
            }
        });
        if (nodeFound) {
            this.$searchNode.removeClass('error');
            this.graphManager.reRender();
        } else {
            this.$searchNode.addClass('error');
        }
    };

    SearchGraphManager.prototype.dependency = function (searchNodeVal, type) {
        let all_nodes = this.graphManager.getNodes();
        let tempNode = '';
        let edges = [];

        if (!searchNodeVal) {
            this.resetSearch();
            return;
        }

        let nodeFound = false;
        all_nodes.forEach(function (node) {
            if (node.ref && node.ref === searchNodeVal) {
                tempNode = node;
                nodeFound = true;
            }
        });
        if (nodeFound) {
            this.$searchNode.removeClass('error');
        } else {
            this.$searchNode.addClass('error');
        }
        allEdges.forEach(function (edge) {
            if (type === 'dependencies') {
                if (edge.endId === tempNode.nodeId) {
                    edges.push(edge.startId);
                }
            }
            else {
                if (edge.startId === tempNode.nodeId) {
                    edges.push(edge.endId);
                }
            }
        });
        if (edges.length) {
            let tempArray = [];
            if (type === 'dependencies') {
                let allEdgesReverse = allEdges.slice().reverse();
                allEdgesReverse.forEach(function (edge) {
                    if (_.contains(edges, edge.endId))
                        edges.push(edge.startId);
                    else
                        tempArray.push(edge)
                });

                tempArray.forEach(function (edge) {
                    if (_.contains(edges, edge.endId))
                        edges.push(edge.startId);
                });

                edges = _.unique(edges)
            }
            else {
                allEdges.forEach(function (edge) {
                    if (_.contains(edges, edge.startId))
                        edges.push(edge.endId);
                    else
                        tempArray.push(edge)
                });
                tempArray.forEach(function (edge) {
                    if (_.contains(edges, edge.startId))
                        edges.push(edge.endId);
                });
                edges = _.unique(edges);
            }
        }

        edges.push(tempNode.nodeId);

        all_nodes.forEach(function (node) {
            if (_.contains(edges, node.nodeId)) {
                node.class = applySearchClass(node.class, 'highlight', true);
            }
            else {
                node.class = applySearchClass(node.class, 'fade');
            }
        });
        this.graphManager.reRender();
    };

    SearchGraphManager.prototype.resetSearch = function () {
        let all_nodes = this.graphManager.getNodes();
        // kind of a hack, because the highlighting for "current" will still be erased by the search.
        all_nodes.forEach(function (node) {
            node.class = applySearchClass(node.class, "", false);
        });
        this.graphManager.reRender();
    };

    function applySearchClass(nodeClass, classString, doClearCurrent = false) {
        let newClassList = nodeClass
            .replace(/normal/g, '').trim()
            .replace(/fade/g, '').trim()
            .replace(/highlight/g, '').trim();
        if (doClearCurrent) {
            newClassList = newClassList.replace(/current/g, '').trim();
        }
        return newClassList + " " + classString;
    }

    return {SearchGraphManager: SearchGraphManager}
})(window));