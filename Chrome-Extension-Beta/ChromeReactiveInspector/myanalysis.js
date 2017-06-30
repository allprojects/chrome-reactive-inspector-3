/*
 This file contain analysis code , using jalangi api and bacon.js spy and Rx lift override.
 Jalangi use to get reference to js variable names
 Bacon spy is used to log internal activities on bacon library
 Rx list override is used to log Rx internal activities
 */

var allNodes = [];
var allEdges= [];
var updatedVar = {};
var SourceLocation;
var SourceLocationLine;

// Jalangi Analysis Start
J$.analysis = {};

(function (sandbox) {
    function AnalysisEngine() {
        var iidToLocation = sandbox.iidToLocation;

        function showLocation(iid) {
            console.log('  Source Location iss: ' + iidToLocation(iid));
        }

        this.literal = function (iid, val) {
            console.log('creating literal operation intercepted: ' + val);
            showLocation(iid);
            return val;
        };

        this.invokeFunPre = function (iid, f, base, args, isConstructor) {
            console.log('function call intercepted before invoking');
            console.log(f);
            // console.log(f.constructor.name);
            showLocation(iid);
        };

        this.invokeFun = function (iid, f, base, args, val, isConstructor) {
            console.log('function call intercepted after invoking');
            showLocation(iid);
            return val;
        };

        this.getField = function (iid, base, offset, val) {
            console.log('get field operation intercepted: ' + offset);
            showLocation(iid);
            return val;
        }

        this.read = function (iid, name, val, isGlobal) {
            console.log('reading variable operation intercepted: ' + name);
            showLocation(iid);
            return val;
        };

        // Use this Jalangi API to check if value being written to js var is an observable
        // if it is so then send message to dev tool to record variable name etc..
        // this will log if any Observable being assigned to js variable
        this.write = function (iid, name, val, oldValue) {
            if(iid === -1){
                console.log('End of file reading!');
            }else{
                var currentType = "";
                console.log('writing variable operation intercept: ' + name);
                SourceLocationLine = '';
                // source location
                SourceLocation = window.iidToLocationMap[iid];
                if(SourceLocation)
                    SourceLocationLine = SourceLocation[1];
                else
                    SourceLocationLine = '';

                if (val) {
                    console.log('type is : ' + val.constructor.name);
                    console.log('val id  is : ' + val.id);
                    window.variables.push({'name': name, 'id': val.id, 'location': SourceLocationLine });
                    // For Bacon and Rx-js
                    currentType = val.constructor.name;
                }

                var currentTypeInSmall = currentType.toLowerCase();
                var currentNodeId = '';

                // todo what about property here , please check other types that we need to log here ..
                if (currentTypeInSmall.search("observable") !== -1 || currentTypeInSmall.search("subject") !== -1) {
                    if(!(val.hasOwnProperty('operator') && val.operator === undefined)){
                        // bacon observer already has the id attribute
                        if (val.hasOwnProperty("id")) {
                            currentNodeId = val.id
                        } else {
                            if (window.rxObsCounter !== undefined) {
                                currentNodeId = ++window.rxObsCounter;
                            }
                            val.id = currentNodeId;
                        }

                        logNodeData(currentNodeId, currentType, '', name, '', SourceLocationLine);
                        updatedVar = {'id': currentNodeId, 'name': name};
                        _.extend(_.findWhere(window.variables, { name: updatedVar.name }), updatedVar);
                    }
                }
                else if(val.constructor.name === 'Subscriber'){
                    if (val.hasOwnProperty("_id")) {
                        if(val._subscriptions && val._subscriptions.length){
                            val._subscriptions.forEach(function (subscription) {
                                if(subscription._id){
                                    // Test case 41 - example 2
                                    if(subscription._parent && subscription._parent._id)
                                        if(!checkIfEdgeAlreadyExists(subscription._parent._id, subscription._id)) {
                                            logEdgeData(subscription._id,subscription._parent._id, '')
                                        }
                                    else if(!checkIfEdgeAlreadyExists(val._id, subscription._id)) {
                                        logEdgeData(val._id, subscription._id, '')
                                    }
                                }else{
                                    subscription._id = ++window.rxObsCounter;
                                    logNodeData(subscription._id, currentType, '', name, '', SourceLocationLine);
                                    logEdgeData(val._id, subscription._id, '')
                                }
                            })
                        }
                    }
                }

                showLocation(iid);

                return val;
            }
        };

        this.binary = function (iid, op, left, right, result_c) {
            console.log('binary operation intercepted: ' + op);
            showLocation(iid);
            return result_c;
        };
    }

    sandbox.analysis = new AnalysisEngine();
})(J$);
// Jalangi Analysis End


// Bacon Analysis Start
// User Bacon.spy to log all internal activities of Bacon
if (Bacon !== undefined) {
    // https://baconjs.github.io/api.html#bacon-spy
    Bacon.spy(function (obs) {

        var nodeType = "";
        var nodeMethod = "";

        if (obs._isEventStream) {
            nodeType = "Eventstream";
        }
        if (obs._isProperty) {
            nodeType = "Property";
        }

        if (obs.desc.method) {
            nodeMethod = obs.desc.method;
        }

        var currentObsId = obs.id;
        logNodeData(currentObsId, nodeType, nodeMethod, '', '', '');

        // Log Observable dependencies
        obs.desc.deps().forEach(function (entry) {
            logEdgeData(entry.id, obs.id, nodeMethod)
        });

        // Log observable value
        obs.onValue(function (val) {
            /*
             console.log(obs);
             console.log("observer id on val is = ", obs.id);
             console.log("val is = ", val);
             console.log("type of val is = ", typeof val);
             console.log("jquery type of val is = ", $.type(val));
             console.log("constructor.name of val is = ", val.constructor.name);
             console.log(Object.prototype.toString.call(val));
             console.log(val instanceof jQuery.Event);
             */
            if (val instanceof jQuery.Event) {
                val = val.type;
            }

            if (val && val.constructor === Array) {
                val = JSON.stringify(val);
            }else if(val.constructor.name === 'Object'){
                val = JSON.stringify(val)
            }
            //val = JSON.stringify(val);

            logNodeData(currentObsId, '', '', '', val, '');

        });

        obs.onError(function (error) {
            console.log('Error: ', error);
        });
    });
}

// Bacon Analysis End

// Rx-js v-5 Analysis Start
if (Rx !== undefined) {

    // Override LIFT of RX JS 5
    const _lift = Rx.Observable.prototype.lift;
    var rxObsCounter = 0;
    var observableList = [];
    var subscriberList = [];
    var variables = [];
    /**
     * Below operators do Flattens an Observable-of-Observables
     * @type {Array}
     */
    var flattenOperators = ['MergeAllOperator', 'CombineLatestOperator', 'SwitchFirstOperator', 'MergeMapOperator',
        'MergeMapToOperator', 'SwitchMapToOperator', 'SwitchMapOperator', 'ZipOperator', 'RaceOperator'];

    var subscriberNames = ['SubjectSubscription', 'RaceSubscriber'];

    Rx.Observable.prototype.lift = function (operator) {

        var sourceObs = this;
        var resultantObservable = _lift.call(sourceObs, operator);

        if(operator){
            var operatorName = operator.constructor.name;
            // check type of source obs is it an ArrayObservable or not
            // append id if not exist
            if (sourceObs.constructor.name === "ArrayObservable" && flattenOperators.includes(operatorName)) {
                for(var i=0; i<sourceObs.array.length; i++){
                    if(!sourceObs.array[i].hasOwnProperty("id")){
                        sourceObs.array[i].id = ++rxObsCounter;
                    }
                }
            } else {

                if (!sourceObs.hasOwnProperty("id") && operatorName !== 'RefCountOperator') {
                    sourceObs.id = ++rxObsCounter;
                }
            }
            if (!(resultantObservable.hasOwnProperty("id"))) {
                resultantObservable.id = ++rxObsCounter;
            }
            // Multicast support with refCount example & test case 42
            if(operator.constructor.name === 'RefCountOperator'){
                if(sourceObs.getSubject().id)  // for test case 42
                    CriLogObserverFactory(operator, sourceObs.getSubject(), resultantObservable)
            }else{
                CriLogObserverFactory(operator, sourceObs, resultantObservable);
            }
        }
        return resultantObservable;
    };

    // Todo
    const create_observable = Rx.Observable.create;
    Rx.Observable.create = function (observer) {
        var resultantObservable = create_observable(observer)
        resultantObservable.id = ++rxObsCounter;
        resultantObservable._type = 'createObservable';
        return resultantObservable

    };

    // Rx.Subscriber.prototype.next = function (value) {
    //
    //     debugger
    // };
    // TOdo
    Rx.Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };


    /**
     * This will override the subscribe method for Observable
     * and add extra fields to each subscriber so that we can log the values in graph
     * @param observerOrNext
     * @param error
     * @param complete
     * @returns {*}
     */
    Rx.Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = Rx.toSubscriber(observerOrNext, error, complete);
        if(sink.constructor.name === 'SubjectSubscriber'){
            if(!checkIfEdgeAlreadyExists(this.id, observerOrNext.id)) {
                logEdgeData(this.id, observerOrNext.id, '')
            }
        }else if(sink.constructor.name === 'ConnectableSubscriber'){
            if(sink.connectable.hasOwnProperty("id"))
                if(!checkIfEdgeAlreadyExists(this.id, sink.connectable.id)) {
                    logEdgeData(this.id, sink.connectable.id, '')
                }
            if(sink.destination.observers.length){
                var observers = _.uniq(sink.destination.observers, function (e) {
                    return e.id;
                });
                var observerId = '';
                if(observers.length > 0){
                    for(var i=0; i< observers.length; i++){
                        try{
                            observerId = observers[i]._id;
                        }catch(err) {
                            observerId = observers[i].id;
                        }
                        if(!checkIfEdgeAlreadyExists(sink.connectable.id, observerId)) {
                            logEdgeData(sink.connectable.id, observerId, '')
                        }
                    }
                }
                else{
                    if(!checkIfEdgeAlreadyExists(sink.connectable.source.id, sink.destination.id)) {
                        logEdgeData(sink.connectable.source.id, sink.destination.id, '')
                    }
                }

            }
        }
        if(!sink.hasOwnProperty('_id'))
            sink._id = this.id;
        sink._operatorName = operator;
        var obsType = '';
        if (this.constructor.name) {
            obsType = this.constructor.name;
        }
        sink.obsType = obsType;

        if (operator) {
            // Test case 7 - for buffer operator
            if(operator.closingNotifier && operator.closingNotifier.id){
                logEdgeData(operator.closingNotifier.id, this.source.id,  '')
            }
            // Test case 10 - bufferToggle operator
            else if(operator.openings && operator.openings.id){
                logEdgeData(operator.openings.id, this.source.id,  '')
            }
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }

        //Todo Think of what to do with the list of subscribers. Help anywhere or just remove it?
        subscriberList.push(sink);
        return sink;
    };

    /**
     * This will override the next method to get the values in each subscriber
     * and log the values to graph.
     * @param value
     */
    var constructorName = '';
    var nextValue = '';
    Rx.Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            if(value !== ''){
                constructorName = '';
                if(value !== undefined && value !== null){

                    constructorName = value.constructor.name;
                    switch(constructorName){
                        case 'KeyboardEvent':
                            nextValue = value.currentTarget.value;
                            break;
                        case 'Number':
                            nextValue = JSON.stringify(value);
                            break;
                        case 'Array':
                            nextValue = JSON.stringify(value);
                            break;
                        case 'Object':
                            if(value.hasOwnProperty('type') &&  value.type === 'keyup')
                                nextValue = value.key;
                            else if(value.hasOwnProperty('type')){
                                if(value.type ==='mousemove')
                                    nextValue = JSON.stringify({'screenX':value.screenX, 'screenY':value.screenY});
                                else
                                    nextValue = JSON.stringify(value);
                            }else{
                                nextValue = JSON.stringify(value);
                            }
                            break;
                        case 'MouseEvent':
                            nextValue = JSON.stringify({'clientX':value.clientX, 'clientY':value.clientY});
                            break;
                        case 'Promise':
                            //TODO get value from promised object
                            nextValue = JSON.stringify(value);
                            break;
                        case 'String':
                            nextValue = value;
                            break;
                        case 'Boolean':
                            nextValue = value;
                            break;
                        case 'GroupedObservable':
                            nextValue = value.key;
                            break;
                        case 'Observable':
                            nextValue = value;
                            break;
                        default:
                            nextValue = JSON.stringify(value);
                            break;
                    }
                }
                else
                    if(value === undefined)
                        nextValue = 'undefined';
                    //Todo check for other type of events or similar kind

                    if(this._id){
                        // Added this condition for animation test example
                        // Make sure it does not affect other
                        if(this._parent && this._parent.constructor.name === 'Subscriber' && !this._operatorName){
                            if(this._parent.destination && this._parent.destination._complete && !this._parent.destination._id)
                                logNodeData(this._parent._id, this._parent.obsType, '', '', nextValue, '');
                        }
                        logNodeData(this._id, this.obsType, '', '', nextValue, '');
                        // if(this.constructor.name === 'ConnectableSubscriber' && this.connectable.hasOwnProperty("id")){
                        //     logNodeData(this.connectable.id, this.connectable.constructor.name, '', '', nextValue, '');
                        // }
                        // Test case 35
                        if(this._subscriptions && this._subscriptions.length){
                            this._subscriptions.forEach(function (subscription) {
                                if(subscription._id && subscriberNames.includes(subscription.constructor.name)){
                                    logNodeData(subscription._id, subscription.constructor.name, '', '', nextValue, '');
                                }
                            })
                        }
                    }else if(this.outerValue && this.outerValue.id && this.outerValue.constructor.name === 'ScalarObservable'){
                        logNodeData(this.outerValue.id, this.outerValue.constructor.name, '', '', nextValue, '');
                    }
                }
            this._next(value);
        }
    };

    Rx.Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            if(this._id){
                logNodeData(this._id, this.obsType, '', '', JSON.stringify(err), '');
            }
            this.isStopped = true;
            this._error(err);
        }
    };

    Rx.Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };

    // Rx.Observable.prototype.multicast = function (subjectOrSubjectFactory, selector) {
    //     if (typeof subjectOrSubjectFactory !== 'function') {
    //         console.log(subjectOrSubjectFactory)
    //         if(!checkIfEdgeAlreadyExists(this.id, subjectOrSubjectFactory.id)) {
    //             logEdgeData(this.id, subjectOrSubjectFactory.id, '')
    //         }
    //     }
    //     return Rx.Observable.prototype.multicast.call(subjectOrSubjectFactory, selector);
    // }

    /**
     * This method log RX js Data
     * @param operator
     * @param obsSource
     * @param obsResult
     */
    function CriLogObserverFactory(operator, obsSource, obsResult) {
        var operName = "";
        if (operator && operator.constructor.name) {
            operName = operator.constructor.name;
        }

        var sourceNodeType = "";
        if (obsSource.constructor.name) {
            sourceNodeType = obsSource.constructor.name;
        }

        var resultNodeType = "";
        if (obsSource.constructor.name) {
            resultNodeType = obsResult.constructor.name;
        }
        // create nodes for source and des obs

        logNodeData(obsResult.id, resultNodeType, '', '', '', '');

        var name = '';
        var res = '';
        var location = '';
        if(obsSource.sourceObj && obsSource.sourceObj.id){
            res = _.find(window.variables, {id:obsSource.sourceObj.id});
            name = res.name;
            location = res.location;
        }else{
            res = _.find(window.variables, {id:obsSource.id});
            if(res)
                name = res.name;
        }

        // source obs are the dependencies of resultant obs
        var temp_val = '';
        if (obsSource.constructor.name === "ArrayObservable" && flattenOperators.includes(operName)) {
            for(var i=0; i<obsSource.array.length; i++){
                var tempObsSource = obsSource.array[i];
                temp_val = '';
                if(tempObsSource.id){
                    if(!checkIfNodeAlreadyExists(tempObsSource.id, '', tempObsSource.constructor.name)){
                        if(tempObsSource.constructor.name === 'ScalarObservable' && tempObsSource.value !== undefined)
                            temp_val = tempObsSource.value;
                        logNodeData(tempObsSource.id, tempObsSource.constructor.name, '', '', temp_val, '')
                    }
                    logEdgeData(tempObsSource.id, obsResult.id, operName);
                }
                else{
                    if(!checkIfEdgeAlreadyExists(obsSource.id, obsResult.id)) {
                        logEdgeData(obsSource.id, obsResult.id, operName);
                    }
                }

                //Special case because of twitter follow example
                if(tempObsSource.constructor.name === 'Observable'){
                    if(tempObsSource.source && tempObsSource.source.id){
                        if(!checkIfEdgeAlreadyExists(tempObsSource.source.id, tempObsSource.id)) {
                            logEdgeData(tempObsSource.source.id, tempObsSource.id, operName)
                        }
                    }
                }
            }
        } else {
            if(!checkIfNodeAlreadyExists(obsSource.id, name, sourceNodeType)){
                logNodeData(obsSource.id, sourceNodeType, '', name, '', location)
            }
            logEdgeData(obsSource.id, obsResult.id, operName);

            // Test case 18 - for ConcatMapTo operator
            if(flattenOperators.includes(operName)){
                if(obsResult.operator){
                    if(obsResult.operator.ish && obsResult.operator.ish.id){
                        logNodeData(obsResult.operator.ish.id, obsResult.operator.ish.constructor.name, '', '', obsResult.operator.ish.value, '')
                        logEdgeData(obsResult.operator.ish.id, obsResult.id, operName);
                    }
                }
            }
        }
    }
}
// Rx-js Analysis End

// For logging values
function logNodeData(id, type, method, name, val, lineNumber){
    allNodes.push({'nodeId': id, 'type': type, 'name': name});
    sendObjectToDevTools({
        content: {
            'nodeId': id,
            'nodeType': type,
            'nodeMethod': method,
            'nodeRef': name,
            'nodeValue': val,
            'sourceCodeLine': lineNumber
        }, action: "saveNode", destination: "panel"
    });
}

function logEdgeData(startId, endId, name){
    allEdges.push({'startId': startId, 'endId': endId});
    sendObjectToDevTools({
        content: {
            "edgeStart": startId,
            "edgeEnd": endId,
            "edgeLabel": name
        },
        action: "saveEdge",
        destination: "panel"
    });
}

function checkIfNodeAlreadyExists(nodeId, name, type){
    return  _.some(allNodes, function (node) {
        if(name)
            return node.nodeId === nodeId && node.name === name && node.type === type;
        else
            return node.nodeId === nodeId && node.type === type;
    });
}

function checkIfEdgeAlreadyExists(startId, endId){
    if(startId !== endId){
        return  _.some(allEdges, function (edge) {
            return (edge.startId === startId && edge.endId === endId) || edge.startId === endId && edge.endId === startId;
        });
    }else{
        return true
    }

}
