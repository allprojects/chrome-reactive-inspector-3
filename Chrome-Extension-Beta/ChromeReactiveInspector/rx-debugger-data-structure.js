var GraphNode = function (rawData) {
    var node = {};
    node.id = rawData.id || '';
    node.label = rawData.label || '';
    node.value = rawData.vale || '';
    node.fooBar = function () {
        return strMerge(node.id, node.label);
    }
    return node;
}

var GraphEdge = function (rawData) {
    var edge = {};
    edge.start = rawData.start || '';
    edge.end = rawData.end || '';

    return edge;
}