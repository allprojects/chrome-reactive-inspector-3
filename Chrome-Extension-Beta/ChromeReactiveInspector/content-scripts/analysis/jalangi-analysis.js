/*
    Jalangi is used to get reference to js variable names and source code location information.
 */

var cri = cri || {};
cri.analysis = cri.analysis || {};


cri.analysis.jalangi = (function (window) {
    // remap pseudo include to shorten calls
    let recording = cri.analysis.recording;

    // Jalangi Analysis Start
    J$.analysis = {};

    (function (sandbox) {
        function AnalysisEngine() {
            let iidToLocation = sandbox.iidToLocation;

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
                //TODO: submit nodeinfo to update nodes but do not add new step to history.
                // although a step makes sense because some info provided to the user changes,
                // it is not directly visible to the user (because it is just visible as a tooltip) and
                // the extra step provides no real value.

                if (val.id && isObservable(val)) {
                    let sourceInfo = getSourceInfo(iid, filename);
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
                    recording.sendAllNodesAndEdges();
                    return;
                }

                // just return value if value is not set or type can not be inferred from constructor name
                if (!val || !val.constructor) {
                    return val;
                }

                let sourceInfo = getSourceInfo(iid, filename);

                let currentType = val.constructor.name || "";
                let currentTypeToDisplay = getTypeToDisplay(val) || currentType;

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
                        // update name of subscriber and update recording.nodesWithDetails
                        if (!recording.checkIfNodeAlreadyExists(val._id, name, currentType)) {
                            recording.logNodeData({
                                id: val._id,
                                type: currentTypeToDisplay,
                                name: name,
                                location: sourceInfo
                            });
                            addOrUpdatDetails(val._id, name);
                            recording.updateNodeEdgeName(val._id, name)
                        }
                    }
                    else if (name) {
                        val.destination._id = recording.getNextId();
                        let tempVal = '';
                        if (recording.getPreviousData().nodeId === val._id) {
                            tempVal = recording.getPreviousData().value;
                            recording.resetPreviousData();
                        }
                        recording.logNodeData({
                            id: val.destination._id,
                            type: currentTypeToDisplay,
                            name: name,
                            value: tempVal,
                            location: sourceInfo
                        });
                        recording.logEdgeData(val._id, val.destination._id, '');
                    }

                    if (val._subscriptions && val._subscriptions.length) {
                        val._subscriptions.forEach(function (subscription) {
                            if (!subscription._id) {
                                return;
                            }
                            // Test case 41 - example 2
                            if (subscription._parent && subscription._parent._id)
                                if (!recording.checkIfEdgeAlreadyExists(subscription._parent._id, subscription._id)) {
                                    recording.logEdgeData(subscription._id, subscription._parent._id, '')
                                }
                                else if (!recording.checkIfEdgeAlreadyExists(val._id, subscription._id)) {
                                    recording.logEdgeData(val._id, subscription._id, '')
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
                let sourceInfo = '';
                let SourceLocation = window.iidToLocationMap[iid];
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
                let typeToLower = val.constructor.name.toLowerCase();
                return (typeToLower.search("observable") !== -1 || typeToLower.search("subject") !== -1);
            }

            function submitJalangiNodeInfo(val, name, sourceInfo) {

                let currentTypeToDisplay = getTypeToDisplay(val) || val.constructor.name || "";
                // bacon observer already has the id attribute
                val = recording.checkAndAssignId(val);

                addOrUpdatDetails(val.id, name);

                // Check if there was already details submitted with a name.
                // If so, the submitted details came from write which has greater position precision than
                // from invoke function.
                let existing = _.find(recording.nodesWithDetails, {id: val.id});
                if (!name && existing && existing.name) {
                    return;
                }

                recording.logNodeData({
                    id: val.id,
                    type: currentTypeToDisplay,
                    name: name,
                    location: sourceInfo
                });
                recording.updateNodeEdgeName(val.id, name);
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

    /**
     * Add variable to variableCache or updated the existing one. Prevents multiple variables with same values in cache.
     * @param id id of the observable variable
     * @param name name of the observable variable
     */
    function addOrUpdatDetails(id, name) {
        let existing = hasDetails(id, name);

        // update or add new variable
        if (existing) {
            if (id) {
                _.extend(existing, {id: id});
            }
            if (name) {
                _.extend(existing, {name: name});
            }
        } else {
            recording.nodesWithDetails.push({id: id, name: name});
        }
    }

    /**
     * Returns the the details object if there is one.
     */
    function hasDetails(id, name) {
        let existing = "";
        let result = _.filter(recording.nodesWithDetails, function (v) {
            return v.id === id || v.name === name
        });
        let idResult = _.find(result, {id: id});
        let nameResults = _.filter(result, {name: name});

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

    return {
        addOrUpdatDetails: addOrUpdatDetails,
        hasDetails: addOrUpdatDetails
    };
})(window);