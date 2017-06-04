/*
 This file contain analysis code , using jalangi api and bacon.js spy and Rx lift override.
 Jalangi use to get reference to js variable names
 Bacon spy is used to log internal activities on bacon library
 Rx list override is used to log Rx internal activities
 */

var allNodes = []
var allEdges= []

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
            console.log(f.constructor.name);
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
                var temp_list = _.uniq(observableList)
                // temp_list.forEach(function(obs) {
                //     CriSubscriptRxObservableToLog(obs)
                // });

                var getChild = function (observables_list) {
                    var o = {}
                    observables_list.forEach(function(obs){
                        if(obs.prev_source){
                            o = obs
                        }
                    })
                    return o
                }
                // var last_child = getChild(temp_list)
                // CriSubscriptRxObservableToLog(last_child)
            }else{
                var currentType = "";
                console.log('writing variable operation intercept: ' + name);
                if (val) {
                    console.log('type is : ' + val.constructor.name)
                    console.log('val id  is : ' + val.id)
                    window.variables.push({'name': name, 'id': val.id });
                    // For Bacon and Rx-js
                    currentType = val.constructor.name;
                }

                var currentTypeInSmall = currentType.toLowerCase();
                // todo what about property here , please check other types that we need to log here ..
                if (currentTypeInSmall.search("observable") !== -1) {
                    if(!(val.hasOwnProperty('operator') && val.operator === undefined)){
                        var currentNodeId = '';
                        // bacon observer already has the id attribute
                        if (val.hasOwnProperty("id")) {
                            currentNodeId = val.id
                        } else {
                            if (window.rxObsCounter !== undefined) {
                                currentNodeId = ++window.rxObsCounter;
                            }
                            val.id = currentNodeId;
                        }

                        // source location
                        var SourceLocation = window.iidToLocationMap[iid];
                        var SourceLocationLine = SourceLocation[1];

                        logNodeData(currentNodeId, currentType, '', name, '', SourceLocationLine);

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
        'MergeMapToOperator', 'SwitchMapToOperator', 'SwitchMapOperator', 'ZipOperator'];

    Rx.Observable.prototype.lift = function (operator) {

        var sourceObs = this;
        var resultantObservable = _lift.call(sourceObs, operator);
        if(operator){
            // check type of source obs is it an ArrayObservable or not
            // append id if not exist
            if (sourceObs.constructor.name === "ArrayObservable" && flattenOperators.includes(operator.constructor.name)) {
                for(var i=0; i<sourceObs.array.length; i++){
                    if(!sourceObs.array[i].hasOwnProperty("id")){
                        sourceObs.array[i].id = ++rxObsCounter;
                    }
                }
            } else {

                if (!(sourceObs.hasOwnProperty("id"))) {
                    sourceObs.id = ++rxObsCounter;
                }
            }
            if (!(resultantObservable.hasOwnProperty("id"))) {
                resultantObservable.id = ++rxObsCounter;
            }
            CriLogObserverFactory(operator, sourceObs, resultantObservable);
        }
        return resultantObservable;
    };

    // Todo
    const _sub_lift = Rx.Subject.prototype.lift;
    Rx.Subject.prototype.lift = function (operator) {

        var resultantSubject = _sub_lift.call(operator);
        // var subject = new AnonymousSubject(this, this);
        // subject.operator = operator;
        console.log(resultantSubject)
        return resultantSubject;
    };


   // Todo
    const create_observable = Rx.Observable.create;
    Rx.Observable.create = function (observer) {
        var resultantObservable = create_observable(observer)
        console.log(resultantObservable)
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
    var constructorName = ''
    Rx.Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {

            var nextValue = '';

            // Check if it has a custom _id else continue
            if(this._id){
                if(value || value === 0){
                    constructorName = value.constructor.name
                    //Todo check for other type of events or similar kind
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
                            else
                                nextValue = JSON.stringify(value);
                            break;
                        default:
                            nextValue = JSON.stringify(value);
                            break;
                    }
                    logNodeData(this._id, this.obsType, '', '', nextValue, '');
                }

            }
            this._next(value);
        }
    };

    /**
     * This method subscribe to given observable and send message to dev tool on value received
     * @param obs
     */
    function CriSubscriptRxObservableToLog(obs) {

        var obsType = "";
        if (obs.constructor.name) {
            obsType = obs.constructor.name;
        }

        obs.subscribe(function (x) {

            console.log("next val in subscribe");
            console.log(obs);
            console.log(x);
                if (x instanceof jQuery.Event) {
                    x = x.type;
                }

                if(x){
                    //if (x.constructor == Array) {
                        x = JSON.stringify(x);
                    //}
                }


                var nodeMethod = "";

                sendObjectToDevTools({
                    content: {
                        'nodeId': obs.id,
                        'nodeType': obsType,
                        'nodeMethod': '',
                        'nodeRef': '',
                        'nodeValue': x,
                        'sourceCodeLine': ''
                    }, action: "saveNode", destination: "panel"
                });

            },
            function (err) {
                //console.log('LOG Error: ' + err);
            },
            function () {
                //console.log('LOG Completed');
            });

    }

    /**
     * This method log RX js Data
     * @param operator
     * @param obsSource
     * @param obsResult
     */
    function CriLogObserverFactory(operator, obsSource, obsResult) {
        console.log("CriLogObserverFactory");

        var operName = "";
        if (operator) {
            if (operator.constructor.name) {
                operName = operator.constructor.name;
            }
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
        if(obsSource.sourceObj){
            var res = _.find(window.variables, {id:obsSource.sourceObj.id});
            name = res.name;
        }


        // source obs are the dependencies of resultant obs

        if (obsSource.constructor.name === "ArrayObservable" && flattenOperators.includes(operName)) {
            for(var i=0; i<obsSource.array.length; i++){
                var tempObsSource = obsSource.array[i];
                if(!checkIfNodeAlreadyExists(tempObsSource.id, '', sourceNodeType)){
                    logNodeData(tempObsSource.id, sourceNodeType, '', '', '', '')
                }
                logEdgeData(tempObsSource.id, obsResult.id, operName)

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
                logNodeData(obsSource.id, sourceNodeType, '', name, '', '')
            }
            logEdgeData(obsSource.id, obsResult.id, operName)
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
    return  _.some(allEdges, function (edge) {
        return edge.startId === startId && edge.endId === endId;
    });
}
