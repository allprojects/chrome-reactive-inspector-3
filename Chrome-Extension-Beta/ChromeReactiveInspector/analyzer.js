/*
 This file contain analysis code , using jalangi api and bacon.js spy and Rx lift override.
 Jalangi use to get reference to js variable names
 Bacon spy is used to log internal activities on bacon library
 Rx list override is used to log Rx internal activities
 */
// closure to prevent intervention with pages javascripts since this is a content script
var chromeReactiveInspector = chromeReactiveInspector || {};

var rxObsCounter = 0;

chromeReactiveInspector.analyzer = (function (window) {
    var allNodes = [];
    var allEdges = [];
    var updatedVar = {};
    var nodesWithDetails = [];
    var previousData = {
        nodeId: '',
        value: ''
    };
    var subscriberList = [];

    // Jalangi Analysis Start
    J$.analysis = {};

    var currentStep = 0;

    (function (sandbox) {
        function AnalysisEngine() {
            var iidToLocation = sandbox.iidToLocation;

            this.literal = function (iid, val) {
                return val;
            };

            this.invokeFunPre = function (iid, f, base, args, isConstructor) {
                // function call intercepted before invoking
                // f.constructor.name;
            };

            this.invokeFun = function (iid, f, base, args, val, isConstructor, filename) {
                // function call intercepted after invoking
                if (!val || !val.constructor || !val.constructor.name) {
                    return val;
                }

                if (val.id && isObservable(val)) {
                    var sourceInfo = getSourceInfo(iid, filename);
                    submitJalangiNodeInfo(val, '', sourceInfo);
                }

                return val;
            };

            this.getField = function (iid, base, offset, val) {
                // get field operation intercepted (offset)
                return val;
            };

            this.read = function (iid, name, val, isGlobal) {
                // reading variable operation intercepted (name)
                return val;
            };

            this.binary = function (iid, op, left, right, result_c) {
                // binary operation intercepted (op)
                return result_c;
            };

            // Use this Jalangi API to check if value being written to js var is an observable
            // if it is so then send message to dev tool to record variable name etc..
            // this will log if any Observable being assigned to js variable
            this.write = function (iid, name, val, oldValue, filename) {
                if (iid === -1) {
                    // End of file reading;
                    sendAllNodesAndEdges();
                    return;
                }

                // just return value if value is not set or type can not be inferred from constructor name
                if (!val || !val.constructor) {
                    return val;
                }

                var sourceInfo = getSourceInfo(iid, filename);

                var currentType = val.constructor.name || "";
                var currentTypeToDisplay = getTypeToDisplay(val) || currentType;

                if (isObservable(val)) {
                    checkObservableForMeta(val, name, sourceInfo);
                    return val;
                }

                if (currentType === 'Subscriber') {
                    addOrUpdatDetails(val.id, name);
                    if (!val.hasOwnProperty("_id")) {
                        return val;
                    }

                    // test case 53
                    if (currentType === val.obsType) {
                        // update name of subscriber and update nodesWithDetails
                        if (!checkIfNodeAlreadyExists(val._id, name, currentType)) {
                            logNodeData({
                                id: val._id,
                                type: currentTypeToDisplay,
                                name: name,
                                location: sourceInfo
                            });
                            addOrUpdatDetails(val._id, name);
                            updateNodeEdgeName(val._id, name)
                        }
                    }
                    else if (name) {
                        val.destination._id = ++window.rxObsCounter;
                        var tempVal = '';
                        if (previousData.nodeId === val._id) {
                            tempVal = previousData.value;
                            previousData = {}
                        }
                        logNodeData({
                            id: val.destination._id,
                            type: currentTypeToDisplay,
                            name: name,
                            value: tempVal,
                            location: sourceInfo
                        });
                        logEdgeData(val._id, val.destination._id, '');
                    }

                    if (val._subscriptions && val._subscriptions.length) {
                        val._subscriptions.forEach(function (subscription) {
                            if (!subscription._id) {
                                return;
                            }
                            // Test case 41 - example 2
                            if (subscription._parent && subscription._parent._id)
                                if (!checkIfEdgeAlreadyExists(subscription._parent._id, subscription._id)) {
                                    logEdgeData(subscription._id, subscription._parent._id, '')
                                }
                                else if (!checkIfEdgeAlreadyExists(val._id, subscription._id)) {
                                    logEdgeData(val._id, subscription._id, '')
                                }
                        });
                    }

                }
                return val;
            };

            function getTypeToDisplay(val) {
                if (val._isEventStream) {
                    return "Eventstream";
                } else if (val._isProperty) {
                    return "Property";

                } else if (val._isScalar) {
                    return "Scalar";
                } else {
                    return null;
                }
            }

            function getSourceInfo(iid, filename) {
                var sourceInfo = '';
                var SourceLocation = window.iidToLocationMap[iid];
                if (SourceLocation) {
                    sourceInfo = {
                        begin: {line: SourceLocation[1], column: SourceLocation[2]},
                        end: {line: SourceLocation[3], column: SourceLocation[4]},
                        filename: filename
                    };
                }
                return sourceInfo;
            }

            function isObservable(val) {
                if (!val || !val.constructor.name) {
                    return false;
                }
                var typeToLower = val.constructor.name.toLowerCase();
                return (typeToLower.search("observable") !== -1 || typeToLower.search("subject") !== -1);
            }

            function submitJalangiNodeInfo(val, name, sourceInfo) {

                var currentTypeToDisplay = getTypeToDisplay(val) || val.constructor.name || "";
                // bacon observer already has the id attribute
                val = checkAndAssignId(val);

                addOrUpdatDetails(val.id, name);

                // Check if there was already details submitted with a name.
                // If so, the submitted details came from write which has greater position precision than
                // from invoke function.
                var existing = _.find(nodesWithDetails, {id: val.id});
                if (!name && existing && existing.name) {
                    return;
                }

                logNodeData({
                    id: val.id,
                    type: currentTypeToDisplay,
                    name: name,
                    location: sourceInfo
                });
                updateNodeEdgeName(val.id, name);
            }

            /**
             * Checks if the value is an observable and has an operator. If not, recursively checks until
             * an observable is found in the values source property that does have an operator.
             * @param val
             * @param name
             * @param sourceInfo
             */
            function checkObservableForMeta(val, name, sourceInfo) {
                if (!isObservable(val)) {
                    return;
                }

                if (!val.hasOwnProperty('operator') || val.operator !== undefined) {
                    // this will not be executed twice, only if all previous values did not have an operator
                    submitJalangiNodeInfo(val, name, sourceInfo);
                } else if (val.hasOwnProperty("source") && isObservable(val.source)) {
                    // if val has no operator it does not provide valuable information, but its source may not
                    // have extended info (name and location info) provided by jalangi yet.
                    // (See Rx.js test apps son-father-wallet "eventClick" variable)

                    checkObservableForMeta(val.source, name, sourceInfo);
                }

            }

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
            logNodeData({id: currentObsId, type: nodeType, method: nodeMethod});

            // Log Observable dependencies
            obs.desc.deps().forEach(function (entry) {
                if (obs.desc.method && obs.desc.method !== nodeMethod) {
                    console.log('nodeMethod changed in observable dependencies from ' + nodeMethod + ' to ' + obs.desc.method);
                    nodeMethod = obs.desc.method;
                }
                logEdgeData(entry.id, obs.id, nodeMethod)
            });

            // Log observable value
            obs.onValue(function (val) {
                var constructorName = '';
                if (val) {
                    constructorName = val.constructor.name;
                }

                logNodeData({id: currentObsId, type: nodeType, value: val});
            });

            obs.onError(function (error) {
                console.log('Error: ', error);
            });
        });
    }

    // Bacon Analysis End

    // Rx-js v-5 Analysis Start
    if (Rx !== undefined) {

        const _lift = Rx.Observable.prototype.lift;

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

            if (operator) {
                var operatorName = operator.constructor.name;
                // check type of source obs is it an ArrayObservable or not
                // append id if not exist
                if (sourceObs.constructor.name === "ArrayObservable" && flattenOperators.includes(operatorName)) {
                    for (var i = 0; i < sourceObs.array.length; i++) {
                        sourceObs.array[i] = checkAndAssignId(sourceObs.array[i]);
                    }
                    resultantObservable = checkAndAssignId(resultantObservable);
                } else {
                    if (operatorName !== 'RefCountOperator') {
                        sourceObs = checkAndAssignId(sourceObs);
                        resultantObservable = checkAndAssignId(resultantObservable);
                    }
                }

                // Multicast support with refCount example & test case 42
                if (operator.constructor.name === 'RefCountOperator') {
                    if (sourceObs.getSubject().id) { // for test case 42
                        CriLogObserverFactory(operator, sourceObs.getSubject(), resultantObservable)
                    }
                    //for mario game example
                    else if (sourceObs.source && sourceObs.source.id) {
                        resultantObservable = checkAndAssignId(resultantObservable);
                        CriLogObserverFactory(operator, sourceObs.source, resultantObservable)
                    }
                } else {
                    if (resultantObservable.id)
                        CriLogObserverFactory(operator, sourceObs, resultantObservable);
                }
            }
            return resultantObservable;
        };

        Rx.Subject.prototype.lift = function (operator) {
            var subject = new Rx.AnonymousSubject(this, this);
            subject = checkAndAssignId(subject);
            logNodeData({id: subject.id, type: subject.constructor.name});
            if (subject.source && subject.source.array && subject.source.array.length) {
                subject.source.array.forEach(function (sub) {
                    if (sub.id && !checkIfEdgeAlreadyExists(sub.id, subject.id)) {
                        logEdgeData(sub.id, subject.id, operator.constructor.name)
                    }
                })
            }
            subject.operator = operator;
            return subject;
        };

        // Todo
        const create_observable = Rx.Observable.create;
        Rx.Observable.create = function (observer) {
            var resultantObservable = create_observable(observer);
            resultantObservable.id = ++rxObsCounter;
            resultantObservable._type = 'createObservable';
            return resultantObservable
        };

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
            if (sink.constructor.name === 'SubjectSubscriber') {
                if (!checkIfEdgeAlreadyExists(this.id, observerOrNext.id)) {
                    logEdgeData(this.id, observerOrNext.id, '')
                }
            } else if (sink.constructor.name === 'ConnectableSubscriber') {
                if (sink.connectable.hasOwnProperty("id"))
                    if (!checkIfEdgeAlreadyExists(this.id, sink.connectable.id)) {
                        logEdgeData(this.id, sink.connectable.id, '')
                    }
                if (sink.destination.observers.length) {
                    var observers = _.uniq(sink.destination.observers, function (e) {
                        return e.id;
                    });
                    var observerId = '';
                    if (observers.length > 0) {
                        for (var i = 0; i < observers.length; i++) {
                            try {
                                observerId = observers[i]._id;
                            } catch (err) {
                                observerId = observers[i].id;
                            }
                            if (!checkIfEdgeAlreadyExists(sink.connectable.id, observerId)) {
                                logEdgeData(sink.connectable.id, observerId, '')
                            }
                        }
                    }
                    else {
                        if (!checkIfEdgeAlreadyExists(sink.connectable.source.id, sink.destination.id)) {
                            logEdgeData(sink.connectable.source.id, sink.destination.id, '')
                        }
                    }

                }
            }
            if (!sink.hasOwnProperty('_id'))
                sink._id = this.id;
            if (operator) {
                sink._operatorName = operator.constructor.name;
            } else {
                sink._operatorName = '';
            }
            var obsType = '';
            if (this.constructor.name) {
                obsType = this.constructor.name;
            }
            sink.obsType = obsType;

            function getSourceId(source) {
                if (source.source && source.source.id) {
                    getSourceId(source.source)
                } else {
                    return source.id
                }
            }

            //for crop example
            if (sink.parent && sink.parent._id && this.source && this.source.id) {
                var tempSourceId = getSourceId(this.source);
                if (tempSourceId) {
                    if (sink.parent._id !== tempSourceId) {
                        if (!checkIfEdgeAlreadyExists(sink.parent._id, tempSourceId)) {
                            logEdgeData(sink.parent._id, tempSourceId, sink._operatorName);
                        }
                        if (sink.parent._parent && sink.parent._parent._id) {
                            if (!checkIfEdgeAlreadyExists(this.id, sink.parent._parent._id)) {
                                chromeReactiveInspector.sendObjectToDevTools({
                                    content: {
                                        "edgeStart": sink.parent._id,
                                        "edgeStartName": '',
                                        "edgeEnd": sink.parent._parent._id,
                                        "edgeEndName": '',
                                        "edgeLabel": sink._operatorName.replace('Operator', '')
                                    },
                                    action: "removeEdge",
                                    destination: "panel"
                                }, fileReadOver);
                                logEdgeData(this.id, sink.parent._parent._id, sink._operatorName);
                            }
                        }
                    }
                }
            }


            if (operator) {
                // Test case 7 - for buffer operator
                if (operator.closingNotifier && operator.closingNotifier.id) {
                    logEdgeData(operator.closingNotifier.id, this.source.id, '')
                }
                // Test case 10 - bufferToggle operator
                else if (operator.openings && operator.openings.id) {
                    logEdgeData(operator.openings.id, this.source.id, '')
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
            var self = this;
            if (!self.isStopped) {
                if (value !== '') {
                    constructorName = '';
                    if (value !== undefined && value !== null) {
                        constructorName = value.constructor.name;

                        nextValue = value;
                    }

                    else if (value === undefined)
                        nextValue = 'undefined';
                    //Todo check for other type of events or similar kind

                    if (self._id) {
                        logNodeData({id: self._id, type: self.obsType, value: nextValue});
                        // Added this condition for animation test example
                        // Make sure it does not affect other
                        // if(self._parent && self._parent.constructor.name === 'Subscriber' && !self._operatorName){
                        //     if(self._parent.destination && self._parent.destination._complete && !self._parent.destination._id)
                        //         logNodeData(this._parent._id, self._parent.obsType, '', '', nextValue, '');
                        // }
                        // Test case 35
                        if (self._subscriptions && self._subscriptions.length) {
                            self._subscriptions.forEach(function (subscription) {
                                if (subscription._id && subscriberNames.includes(subscription.constructor.name)) {
                                    logNodeData({
                                        id: subscription._id,
                                        type: subscription.constructor.name,
                                        value: nextValue
                                    });
                                }
                            })
                        }
                        if (self.destination._id && checkIfNodeAlreadyExists(self.destination._id, '', 'Subscriber')) {
                            logNodeData({id: self.destination._id, type: 'Subscriber', value: nextValue});
                        }

                        // for animation example
                        else if (self.destination.constructor.name === 'SafeSubscriber' && !self.destination._id) {
                            if (self._parent && this._parent._id) {
                                logNodeData({id: self._parent._id, type: self._parent.obsType, value: nextValue});
                                if (self._parent.destination && self._parent.destination._id) {
                                    logNodeData({
                                        id: self._parent.destination._id,
                                        type: 'Subscriber',
                                        value: nextValue
                                    });
                                }
                            }
                        }
                        if (self.parent && self.parent._id) {
                            if (!checkIfEdgeAlreadyExists(self._id, self.parent._id)) {
                                if (self.parent._parent && self.parent._parent._id && !checkIfEdgeAlreadyExists(self._id, self.parent._parent._id)) {
                                    // logEdgeData(self.parent._id, self._id, self._operatorName);
                                    logEdgeData(self._id, self.parent._parent._id, self._operatorName);
                                }
                            }
                        }
                    } else if (self.outerValue && self.outerValue.id && self.outerValue.constructor.name === 'ScalarObservable') {
                        logNodeData({
                            id: self.outerValue.id,
                            type: self.outerValue.constructor.name,
                            value: nextValue
                        });
                    }
                }
                this._next(value);
            }
        };

        Rx.Subscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                if (this._id) {
                    logNodeData({id: this._id, type: this.obsType, value: JSON.stringify(err)});
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

            logNodeData({id: obsResult.id, type: resultNodeType});

            var name = '';
            var res = '';
            var location = '';
            if (obsSource.sourceObj && obsSource.sourceObj.id && !isNaN(obsSource.sourceObj.id)) {
                res = _.find(nodesWithDetails, {id: obsSource.sourceObj.id});
                if (res) {
                    name = res.name;
                    location = res.location;

                    // remove id from variable (reason unknown)
                    updatedVar = {'id': '', 'name': name};
                    _.extend(_.findWhere(nodesWithDetails, {name: updatedVar.name}), updatedVar);
                }
            } else if (obsSource.id) {
                res = _.find(nodesWithDetails, {id: obsSource.id});
                if (res) {
                    name = res.name;
                    location = res.location;
                }
            }

            // source obs are the dependencies of resultant obs
            var temp_val = '';
            if (obsSource.constructor.name === "ArrayObservable" && flattenOperators.includes(operName)) {
                for (var i = 0; i < obsSource.array.length; i++) {
                    var tempObsSource = obsSource.array[i];
                    temp_val = '';
                    if (tempObsSource.id) {
                        if (tempObsSource.constructor.name === 'ScalarObservable' && tempObsSource.value !== undefined)
                            logNodeData({
                                id: tempObsSource.id,
                                type: tempObsSource.constructor.name,
                                value: tempObsSource.value
                            });
                        if (!checkIfNodeAlreadyExists(tempObsSource.id, '', tempObsSource.constructor.name)) {
                            logNodeData({
                                id: tempObsSource.id,
                                type: tempObsSource.constructor.name,
                                value: temp_val
                            });
                        }
                        logEdgeData(tempObsSource.id, obsResult.id, operName);
                    }
                    else {
                        if (!checkIfEdgeAlreadyExists(obsSource.id, obsResult.id)) {
                            logEdgeData(obsSource.id, obsResult.id, operName);
                        }
                    }

                    //Special case because of twitter follow example
                    if (tempObsSource.constructor.name === 'Observable') {
                        if (tempObsSource.source && tempObsSource.source.id) {
                            if (!checkIfEdgeAlreadyExists(tempObsSource.source.id, tempObsSource.id)) {
                                logEdgeData(tempObsSource.source.id, tempObsSource.id, operName)
                            }
                        }
                    }
                }
            } else {
                if (!checkIfNodeAlreadyExists(obsSource.id, name, sourceNodeType)) {
                    logNodeData({id: obsSource.id, type: sourceNodeType, name: name, location: location});
                    //for mario game example
                    if (operName === 'ScanOperator') {
                        if (obsSource.source && obsSource.source.id) {
                            if (!checkIfEdgeAlreadyExists(obsSource.id, obsSource.source.id)) {
                                logEdgeData(obsSource.source.id, obsSource.id, '')
                            }
                        }
                    }
                }
                logEdgeData(obsSource.id, obsResult.id, operName);

                // Test case 18 - for ConcatMapTo operator
                if (flattenOperators.includes(operName)) {
                    if (obsResult.operator) {
                        if (obsResult.operator.ish && obsResult.operator.ish.id) {
                            logNodeData({
                                id: obsResult.operator.ish.id,
                                type: obsResult.operator.ish.constructor.name,
                                value: obsResult.operator.ish.value
                            });
                            logEdgeData(obsResult.operator.ish.id, obsResult.id, operName);
                        }
                    }
                } else if (operName === 'WithLatestFromOperator') {
                    var obsResultObservables = obsResult.operator.observables;
                    if (obsResultObservables.length) {
                        obsResultObservables.forEach(function (observable) {
                            if (observable.id && !checkIfEdgeAlreadyExists(obsResult.id, observable.id)) {
                                logEdgeData(observable.id, obsResult.id, operName);
                            }
                        })
                    }
                }
            }
        }
    }

    // Rx-js Analysis End

    /**
     * Utility methods
     */

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

        if (!chromeReactiveInspector.shouldSaveNodeValue(fileReadOver, id)) {
            // if(checkPauseNow()){
            //     debugger;
            // }
            ++currentStep;
            chromeReactiveInspector.printValues(currentStep, value, id);
            var val = getValue(value);
            chromeReactiveInspector.sendObjectToDevTools({
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
            if (chromeReactiveInspector.shouldBreakNow('nodeCreated', id, false)) {
                debugger;
            }
        } else {
            if (chromeReactiveInspector.shouldBreakNow('nodeUpdated', id, false)) {
                debugger;
            }

            if (chromeReactiveInspector.shouldBreakNow('evaluationYielded', id, val)) {
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
        name = name.replace('Operator', '');
        allEdges.push({'startId': startId, 'endId': endId});
        var edgeStart = _.find(nodesWithDetails, {id: startId});
        var edgeEnd = _.find(nodesWithDetails, {id: endId});
        chromeReactiveInspector.sendObjectToDevTools({
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
        if (chromeReactiveInspector.shouldBreakNow('dependencyCreated', startId, endId)) {
            debugger;
        }
    }


    function updateNodeEdgeName(id, name) {
        chromeReactiveInspector.sendObjectToDevTools({
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
            if (window.rxObsCounter !== undefined) {
                obj.id = ++window.rxObsCounter;
            }
        }
        return obj;
    }

    var fileReadOver = false;

    function sendAllNodesAndEdges() {
        fileReadOver = true;
        chromeReactiveInspector.sendObjectToDevTools({
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

    /**
     * Add variable to variableCache or updated the existing one. Prevents multiple variables with same values in cache.
     * @param id id of the observable variable
     * @param name name of the observable variable
     */
    function addOrUpdatDetails(id, name) {
        var existing = hasDetails(id, name);

        // update or add new variable
        if (existing) {
            if (id) {
                _.extend(existing, {id: id});
            }
            if (name) {
                _.extend(existing, {name: name});
            }
        } else {
            nodesWithDetails.push({id: id, name: name});
        }
    }

    /**
     * Returns the the details object if there is one.
     */
    function hasDetails(id, name) {
        var existing = "";
        var result = _.filter(nodesWithDetails, function (v) {
            return v.id === id || v.name === name
        });
        var idResult = _.find(result, {id: id});
        var nameResults = _.filter(result, {name: name});

        // check id and name to prevent finding of variables with id or name set to undefined
        if (id && idResult) {
            // found one with id so take it
            existing = idResult;
        }
        else if (name && nameResults.length > 0) {
            if (nameResults.length === 1) {
                existing = nameResults[0];
            } else {
                //TODO: implement support for multiple variables with the same name
                // or one variable been assigned a value a second time.
                throw "Multiple variables with same name. This is currently not supported!";
            }
        }
        return existing;
    }

    return {};
})(this);