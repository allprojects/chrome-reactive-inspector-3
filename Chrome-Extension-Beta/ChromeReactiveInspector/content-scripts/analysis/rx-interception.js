/*
 Rx lift override is used to log Rx internal activities.
 */
// closure to prevent intervention with pages javascripts since this is a content script
var chromeReactiveInspector = chromeReactiveInspector || {};
chromeReactiveInspector.analysis = chromeReactiveInspector.analysis || {};

chromeReactiveInspector.analysis.bacon = (function (window) {
    // remap pseudo include to shorten calls
    var recording = chromeReactiveInspector.analysis.recording;

    var updatedVar = {};
    var subscriberList = [];

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
                        sourceObs.array[i] = recording.checkAndAssignId(sourceObs.array[i]);
                    }
                    resultantObservable = recording.checkAndAssignId(resultantObservable);
                } else {
                    if (operatorName !== 'RefCountOperator') {
                        sourceObs = recording.checkAndAssignId(sourceObs);
                        resultantObservable = recording.checkAndAssignId(resultantObservable);
                    }
                }

                // Multicast support with refCount example & test case 42
                if (operator.constructor.name === 'RefCountOperator') {
                    if (sourceObs.getSubject().id) { // for test case 42
                        CriLogObserverFactory(operator, sourceObs.getSubject(), resultantObservable)
                    }
                    //for mario game example
                    else if (sourceObs.source && sourceObs.source.id) {
                        resultantObservable = recording.checkAndAssignId(resultantObservable);
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
            subject = recording.checkAndAssignId(subject);
            recording.logNodeData({id: subject.id, type: subject.constructor.name});
            if (subject.source && subject.source.array && subject.source.array.length) {
                subject.source.array.forEach(function (sub) {
                    if (sub.id && !recording.checkIfEdgeAlreadyExists(sub.id, subject.id)) {
                        recording.logEdgeData(sub.id, subject.id, operator.constructor.name)
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
            resultantObservable.id = recording.getNextId();
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
                if (!recording.checkIfEdgeAlreadyExists(this.id, observerOrNext.id)) {
                    recording.logEdgeData(this.id, observerOrNext.id, '')
                }
            } else if (sink.constructor.name === 'ConnectableSubscriber') {
                if (sink.connectable.hasOwnProperty("id"))
                    if (!recording.checkIfEdgeAlreadyExists(this.id, sink.connectable.id)) {
                        recording.logEdgeData(this.id, sink.connectable.id, '')
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
                            if (!recording.checkIfEdgeAlreadyExists(sink.connectable.id, observerId)) {
                                recording.logEdgeData(sink.connectable.id, observerId, '')
                            }
                        }
                    }
                    else {
                        if (!recording.checkIfEdgeAlreadyExists(sink.connectable.source.id, sink.destination.id)) {
                            recording.logEdgeData(sink.connectable.source.id, sink.destination.id, '')
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
                        if (!recording.checkIfEdgeAlreadyExists(sink.parent._id, tempSourceId)) {
                            recording.logEdgeData(sink.parent._id, tempSourceId, sink._operatorName);
                        }
                        if (sink.parent._parent && sink.parent._parent._id) {
                            if (!recording.checkIfEdgeAlreadyExists(this.id, sink.parent._parent._id)) {
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
                                recording.logEdgeData(this.id, sink.parent._parent._id, sink._operatorName);
                            }
                        }
                    }
                }
            }


            if (operator) {
                // Test case 7 - for buffer operator
                if (operator.closingNotifier && operator.closingNotifier.id) {
                    recording.logEdgeData(operator.closingNotifier.id, this.source.id, '')
                }
                // Test case 10 - bufferToggle operator
                else if (operator.openings && operator.openings.id) {
                    recording.logEdgeData(operator.openings.id, this.source.id, '')
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
                        recording.logNodeData({id: self._id, type: self.obsType, value: nextValue});
                        // Added this condition for animation test example
                        // Make sure it does not affect other
                        // if(self._parent && self._parent.constructor.name === 'Subscriber' && !self._operatorName){
                        //     if(self._parent.destination && self._parent.destination._complete && !self._parent.destination._id)
                        //         recording.logNodeData(this._parent._id, self._parent.obsType, '', '', nextValue, '');
                        // }
                        // Test case 35
                        if (self._subscriptions && self._subscriptions.length) {
                            self._subscriptions.forEach(function (subscription) {
                                if (subscription._id && subscriberNames.includes(subscription.constructor.name)) {
                                    recording.logNodeData({
                                        id: subscription._id,
                                        type: subscription.constructor.name,
                                        value: nextValue
                                    });
                                }
                            })
                        }
                        if (self.destination._id && recording.checkIfNodeAlreadyExists(self.destination._id, '', 'Subscriber')) {
                            recording.logNodeData({id: self.destination._id, type: 'Subscriber', value: nextValue});
                        }

                        // for animation example
                        else if (self.destination.constructor.name === 'SafeSubscriber' && !self.destination._id) {
                            if (self._parent && this._parent._id) {
                                recording.logNodeData({
                                    id: self._parent._id,
                                    type: self._parent.obsType,
                                    value: nextValue
                                });
                                if (self._parent.destination && self._parent.destination._id) {
                                    recording.logNodeData({
                                        id: self._parent.destination._id,
                                        type: 'Subscriber',
                                        value: nextValue
                                    });
                                }
                            }
                        }
                        if (self.parent && self.parent._id) {
                            if (!recording.checkIfEdgeAlreadyExists(self._id, self.parent._id)) {
                                if (self.parent._parent && self.parent._parent._id && !recording.checkIfEdgeAlreadyExists(self._id, self.parent._parent._id)) {
                                    // recording.logEdgeData(self.parent._id, self._id, self._operatorName);
                                    recording.logEdgeData(self._id, self.parent._parent._id, self._operatorName);
                                }
                            }
                        }
                    } else if (self.outerValue && self.outerValue.id && self.outerValue.constructor.name === 'ScalarObservable') {
                        recording.logNodeData({
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
                    recording.logNodeData({id: this._id, type: this.obsType, value: JSON.stringify(err)});
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

            recording.logNodeData({id: obsResult.id, type: resultNodeType});

            var name = '';
            var res = '';
            var location = '';
            if (obsSource.sourceObj && obsSource.sourceObj.id && !isNaN(obsSource.sourceObj.id)) {
                res = _.find(recording.nodesWithDetails, {id: obsSource.sourceObj.id});
                if (res) {
                    name = res.name;
                    location = res.location;

                    // remove id from variable (reason unknown)
                    updatedVar = {'id': '', 'name': name};
                    _.extend(_.findWhere(recording.nodesWithDetails, {name: updatedVar.name}), updatedVar);
                }
            } else if (obsSource.id) {
                res = _.find(recording.nodesWithDetails, {id: obsSource.id});
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
                            recording.logNodeData({
                                id: tempObsSource.id,
                                type: tempObsSource.constructor.name,
                                value: tempObsSource.value
                            });
                        if (!recording.checkIfNodeAlreadyExists(tempObsSource.id, '', tempObsSource.constructor.name)) {
                            recording.logNodeData({
                                id: tempObsSource.id,
                                type: tempObsSource.constructor.name,
                                value: temp_val
                            });
                        }
                        recording.logEdgeData(tempObsSource.id, obsResult.id, operName);
                    }
                    else {
                        if (!recording.checkIfEdgeAlreadyExists(obsSource.id, obsResult.id)) {
                            recording.logEdgeData(obsSource.id, obsResult.id, operName);
                        }
                    }

                    //Special case because of twitter follow example
                    if (tempObsSource.constructor.name === 'Observable') {
                        if (tempObsSource.source && tempObsSource.source.id) {
                            if (!recording.checkIfEdgeAlreadyExists(tempObsSource.source.id, tempObsSource.id)) {
                                recording.logEdgeData(tempObsSource.source.id, tempObsSource.id, operName)
                            }
                        }
                    }
                }
            } else {
                if (!recording.checkIfNodeAlreadyExists(obsSource.id, name, sourceNodeType)) {
                    recording.logNodeData({id: obsSource.id, type: sourceNodeType, name: name, location: location});
                    //for mario game example
                    if (operName === 'ScanOperator') {
                        if (obsSource.source && obsSource.source.id) {
                            if (!recording.checkIfEdgeAlreadyExists(obsSource.id, obsSource.source.id)) {
                                recording.logEdgeData(obsSource.source.id, obsSource.id, '')
                            }
                        }
                    }
                }
                recording.logEdgeData(obsSource.id, obsResult.id, operName);

                // Test case 18 - for ConcatMapTo operator
                if (flattenOperators.includes(operName)) {
                    if (obsResult.operator) {
                        if (obsResult.operator.ish && obsResult.operator.ish.id) {
                            recording.logNodeData({
                                id: obsResult.operator.ish.id,
                                type: obsResult.operator.ish.constructor.name,
                                value: obsResult.operator.ish.value
                            });
                            recording.logEdgeData(obsResult.operator.ish.id, obsResult.id, operName);
                        }
                    }
                } else if (operName === 'WithLatestFromOperator') {
                    var obsResultObservables = obsResult.operator.observables;
                    if (obsResultObservables.length) {
                        obsResultObservables.forEach(function (observable) {
                            if (observable.id && !recording.checkIfEdgeAlreadyExists(obsResult.id, observable.id)) {
                                recording.logEdgeData(observable.id, obsResult.id, operName);
                            }
                        })
                    }
                }
            }
        }
    }
    return {};
})(window);