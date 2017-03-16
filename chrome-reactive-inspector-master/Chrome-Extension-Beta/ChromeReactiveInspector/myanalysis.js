/*
 This file contain analysis code , using jalangi api and bacon.js spy and Rx lift override.
 Jalangi use to get reference to js variable names
 Bacon spy is used to log internal activities on bacon library
 Rx list override is used to log Rx internal activities
 */

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

            var currentType = "";
            console.log('writing variable operation intercept: ' + name);
            if (val) {
                console.log('type is : ' + val.constructor.name)
                console.log('val id  is : ' + val.id)

                // For Bacon and Rx-js
                currentType = val.constructor.name;
            }

            var currentTypeInSmall = currentType.toLowerCase();
            // todo what about property here , please check other types that we need to log here ..
            if (currentTypeInSmall.search("observable") != -1) {

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

                sendObjectToDevTools({
                    content: {
                        'nodeId': currentNodeId,
                        'nodeType': currentType,
                        'nodeMethod': '',
                        'nodeRef': name,
                        'nodeValue': '',
                        'sourceCodeLine': SourceLocationLine
                    }, action: "saveNode", destination: "panel"
                });

            }

            showLocation(iid);
            return val;
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
if (Bacon != undefined) {
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
        sendObjectToDevTools({
            content: {
                'nodeId': currentObsId,
                'nodeType': nodeType,
                'nodeMethod': nodeMethod,
                'nodeRef': '',
                'nodeValue': '',
                'sourceCodeLine': ''
            }, action: "saveNode", destination: "panel"
        });

        // Log Observable dependencies
        obs.desc.deps().forEach(function (entry) {
            sendObjectToDevTools({
                content: {"edgeStart": entry.id, "edgeEnd": obs.id, "edgeLabel":nodeMethod},
                action: "saveEdge",
                destination: "panel"
            });

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

            if (val.constructor == Array) {
                val = '';
            }
            //val = JSON.stringify(val);

            sendObjectToDevTools({
                content: {
                    'nodeId': currentObsId,
                    'nodeType': '',
                    'nodeMethod': '',
                    'nodeRef': '',
                    'nodeValue': val,
                    'sourceCodeLine': ''
                }, action: "saveNode", destination: "panel"
            });

        });

        obs.onError(function (error) {
            console.log('Error: ', error);
        });
    });
}

// Bacon Analysis End

// Rx-js v-5 Analysis Start
if (Rx != undefined) {

    // Override LIFT of RX JS 5
    const _lift = Rx.Observable.prototype.lift;
    var rxObsCounter = 0;
    Rx.Observable.prototype.lift = function (operator) {

        var sourceObs = this;

        // check type of source obs is it an ArrayObservable or what
        // append id if not exist
        if (sourceObs.constructor.name == "ArrayObservable") {
            sourceObs.forEach(function (entry) {
                if (!(entry.hasOwnProperty("id"))) {
                    entry.id = ++rxObsCounter;
                }
            });
        } else {

            if (!(sourceObs.hasOwnProperty("id"))) {
                sourceObs.id = ++rxObsCounter;
            }
        }


        var resultantObservable = _lift.call(sourceObs, operator);
          console.log("OPR");
        console.log(operator);
         console.log("sourceOBS");
        console.log(sourceObs);
        console.log("resultOBS");
        console.log(resultantObservable);
        if (!(resultantObservable.hasOwnProperty("id"))) {
            resultantObservable.id = ++rxObsCounter;
        }

        CriLogObserverFactory(operator, sourceObs, resultantObservable);
        return resultantObservable;
    };

    /**
     * This method subscribe to given observable and send message to dev tool on value received
     * @param obs
     * @constructor
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
     * @constructor
     */
    function CriLogObserverFactory(operator, obsSource, obsResult) {
        console.log("CriLogObserverFactory");
        //console.log(obsSource.constructor.name);
        //console.log(obsSource);
        //console.log(obsResult.constructor.name);
        //console.log(obsResult);

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

        sendObjectToDevTools({
            content: {
                'nodeId': obsResult.id,
                'nodeType': resultNodeType,
                'nodeMethod': operator,
                'nodeRef': '',
                'nodeValue': '',
                'sourceCodeLine': ''
            }, action: "saveNode", destination: "panel"
        });


        // source obs are the dependencies of resultat obs

        if (obsSource.constructor.name == "ArrayObservable") {
            obsSource.forEach(function (entry) {

                sendObjectToDevTools({
                    content: {
                        'nodeId': entry.id,
                        'nodeType': sourceNodeType,
                        'nodeMethod': '',
                        'nodeRef': '',
                        'nodeValue': '',
                        'sourceCodeLine': ''
                    }, action: "saveNode", destination: "panel"
                });

                sendObjectToDevTools({
                    content: {"edgeStart": entry.id, "edgeEnd": obsResult.id, "edgeLabel": operName},
                    action: "saveEdge",
                    destination: "panel"
                });

                CriSubscriptRxObservableToLog(entry);

            });

        } else {
            sendObjectToDevTools({
                content: {
                    'nodeId': obsSource.id,
                    'nodeType': sourceNodeType,
                    'nodeMethod': '',
                    'nodeRef': '',
                    'nodeValue': '',
                    'sourceCodeLine': ''
                }, action: "saveNode", destination: "panel"
            });
            sendObjectToDevTools({
                content: {"edgeStart": obsSource.id, "edgeEnd": obsResult.id, "edgeLabel": operName},
                action: "saveEdge",
                destination: "panel"
            });
            CriSubscriptRxObservableToLog(obsSource);
        }
        CriSubscriptRxObservableToLog(obsResult);
    }
}
// Rx-js Analysis End