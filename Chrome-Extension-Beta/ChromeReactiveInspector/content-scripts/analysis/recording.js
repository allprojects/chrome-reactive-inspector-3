var cri = cri || {};
cri.analysis = cri.analysis || {};

cri.analysis.recording = (function () {

    let allNodes = [];
    let allEdges = [];
    let nodesWithDetails = [];
    let previousData = {
        nodeId: '',
        value: ''
    };

    let currentStep = 0;
    let rxObsCounter = 0;

    /**
     * This method will log node data.
     * @param data data is an object that contains all or partial node info. It's structure is as follows
     * [id, type, method, name, value, location:{line,column,filename}}
     */
    function logNodeData(data) {
        var id = getValueOrEmpty(data.id);
        var type = getValueOrEmpty(data.type);
        var method = getValueOrEmpty(data.method);
        var name = getValueOrEmpty(data.name);
        var value = getValueOrEmpty(data.value);

        if (!cri.shouldSaveNodeValue(fileReadOver, id)) {
            // if(checkPauseNow()){
            //     debugger;
            // }
            ++currentStep;
            cri.printValues(currentStep, value, id);
            var val = getValue(value);
            cri.sendObjectToDevTools({
                content: {
                    'nodeId': id,
                    'nodeType': type,
                    'nodeMethod': method,
                    'nodeRef': name,
                    'nodeValue': val,
                    'sourceInfo': data.location
                }, action: "saveNode", destination: "panel"
            }, fileReadOver);
            previousData.nodeId = id;
            previousData.value = value;
        }


        if (!checkIfNodeAlreadyExists(id, '', type)) {
            if (cri.shouldBreakNow('nodeCreated', id, false)) {
                debugger;
            }
        } else {
            if (cri.shouldBreakNow('nodeUpdated', id, false)) {
                debugger;
            }

            if (cri.shouldBreakNow('evaluationYielded', id, val)) {
                debugger;
            }
        }
        allNodes.push({'nodeId': id, 'type': type, 'name': name});
    }

    /**
     * This method will log the edgeData
     * @param startId
     * @param endId
     * @param name
     */
    function logEdgeData(startId, endId, name) {
        if (!startId || !endId) {
            // this caused exceptions in RxJs canvas painting example, because an edge was added with one
            // target being undefined.
            console.log("Prevented logging of edge because either start or end id was undefined.");
            return;
        }
        name = name.replace('Operator', '');
        allEdges.push({'startId': startId, 'endId': endId});
        var edgeStart = _.find(nodesWithDetails, {id: startId});
        var edgeEnd = _.find(nodesWithDetails, {id: endId});
        cri.sendObjectToDevTools({
            content: {
                "edgeStart": startId,
                "edgeStartName": edgeStart ? edgeStart.name : '',
                "edgeEnd": endId,
                "edgeEndName": edgeEnd ? edgeEnd.name : '',
                "edgeLabel": name
            },
            action: "saveEdge",
            destination: "panel"
        }, fileReadOver);
        currentStep++;
        if (cri.shouldBreakNow('dependencyCreated', startId, endId)) {
            debugger;
        }
    }


    function updateNodeEdgeName(id, name) {
        cri.sendObjectToDevTools({
            content: {
                "id": id,
                "name": name
            },
            action: "updateSavedEdge",
            destination: "panel"
        }, fileReadOver);
    }

    /**
     * This method will check if the node already exists. return true if exists.
     * @param nodeId
     * @param name
     * @param type
     * @returns {boolean}
     */
    function checkIfNodeAlreadyExists(nodeId, name, type) {
        return _.some(allNodes, function (node) {
            return node.nodeId === nodeId && (!name || node.name === name) && node.type === type;
        });
    }

    /**
     * This method will check if the edge between two nodes is already exists. return true if exists.
     * @param startId
     * @param endId
     * @returns {boolean}
     */
    function checkIfEdgeAlreadyExists(startId, endId) {
        if (startId !== endId) {
            return _.some(allEdges, function (edge) {
                return (edge.startId === startId && edge.endId === endId) || edge.startId === endId && edge.endId === startId;
            });
        } else {
            return true
        }

    }

    /**
     * This method will check if the passed object has property 'id', if not assign it with a new value.
     * @param obj
     * @returns {*}
     */
    function checkAndAssignId(obj) {
        if (!obj.hasOwnProperty("id")) {
            obj.id = getNextId();
        }
        return obj;
    }

    let fileReadOver = false;

    function sendAllNodesAndEdges() {
        fileReadOver = true;
        cri.sendObjectToDevTools({
            content: {
                "nodes": allNodes,
                "edges": allEdges
            },
            action: "allNodesEdges",
            destination: "panel"
        }, fileReadOver);
    }

    var tempConstructorName = '';

    function getValue(value) {
        tempConstructorName = '';
        if (value !== null)
            tempConstructorName = value.constructor.name;
        switch (tempConstructorName) {
            case 'KeyboardEvent':
                value = value.currentTarget.value || value.key;
                if (value === undefined) {
                    value = JSON.stringify(value);
                }
                break;
            case 'Number':
                value = JSON.stringify(value);
                break;
            case 'Array':
                value = value.toString();
                break;
            case 'Object':
                if (value.hasOwnProperty('type')) {
                    if (value.type === 'mousemove' || value.type === 'mousedown' || value.type === 'mouseup' || value.type === 'mousehover' || value.type === 'click')
                        value = JSON.stringify({
                            'type': value.type,
                            'screenX': value.screenX,
                            'screenY': value.screenY
                        });
                    else if (value.type === 'keydown' || value.type === 'keyup')
                        value = value.key;
                    else {
                        try {
                            value = JSON.stringify(value);
                        }
                        catch (err) {
                            // catches error - Error converting circular Json
                            value = value.type;
                        }
                    }
                } else {
                    value = JSON.stringify(value);
                }
                break;
            case 'MouseEvent':
                value = JSON.stringify({'clientX': value.clientX, 'clientY': value.clientY});
                break;
            case 'Promise':
                //TODO get value from promised object
                value = JSON.stringify(value);
                break;
            case 'String':
                // keep value
                break;
            case 'Boolean':
                // keep value
                break;
            case 'GroupedObservable':
                value = value.key;
                break;
            case 'Observable':
                // keep value
                break;
            case 'BehaviorSubject':
                // keep value
                break;
            case 'Function':
                var tempType = value.constructor.name;
                if (value.name === '') {
                    tempType = 'AnonymousFunction'
                }
                value = JSON.stringify({'type': tempType, 'name': value.name});
                break;
            default:
                value = JSON.stringify(value);
                break;
        }

        return value;
    }

    function getValueOrEmpty(value) {
        if (typeof value === 'undefined') {
            return '';
        } else {
            return value;
        }
    }

    function getNextId() {
        return ++rxObsCounter;
    }

    return {
        logNodeData: logNodeData,
        logEdgeData: logEdgeData,
        updateNodeEdgeName: updateNodeEdgeName,
        sendAllNodesAndEdges: sendAllNodesAndEdges,
        getValue: getValue,
        getValueOrEmpty: getValueOrEmpty,
        checkIfEdgeAlreadyExists: checkIfEdgeAlreadyExists,
        checkIfNodeAlreadyExists: checkIfNodeAlreadyExists,
        checkAndAssignId: checkAndAssignId,
        nodesWithDetails: nodesWithDetails,
        getPreviousData: function () {
            return previousData;
        },
        resetPreviousData: function () {
            previousData = {};
        },
        getNextId: getNextId,
        getFileReadOver: function () {
            return fileReadOver;
        }
    };
})();