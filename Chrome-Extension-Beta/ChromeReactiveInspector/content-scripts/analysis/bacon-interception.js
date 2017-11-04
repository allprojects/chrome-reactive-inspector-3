/*
    Use Bacon.spy to log all internal activities of Bacon.js
 */

// closure to prevent intervention with pages javascripts since this is a content script
var chromeReactiveInspector = chromeReactiveInspector || {};
chromeReactiveInspector.analysis = chromeReactiveInspector.analysis || {};

chromeReactiveInspector.analysis.bacon = (function (window) {
    // remap pseudo include to shorten calls
    var recording = chromeReactiveInspector.analysis.recording;

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
            recording.logNodeData({id: currentObsId, type: nodeType, method: nodeMethod});

            // Log Observable dependencies
            obs.desc.deps().forEach(function (entry) {
                if (obs.desc.method && obs.desc.method !== nodeMethod) {
                    console.log('nodeMethod changed in observable dependencies from ' + nodeMethod + ' to ' + obs.desc.method);
                    nodeMethod = obs.desc.method;
                }
                recording.logEdgeData(entry.id, obs.id, nodeMethod)
            });

            // Log observable value
            obs.onValue(function (val) {
                var constructorName = '';
                if (val) {
                    constructorName = val.constructor.name;
                }

                recording.logNodeData({id: currentObsId, type: nodeType, value: val});
            });

            obs.onError(function (error) {
                console.log('Error: ', error);
            });
        });
    }
    return {};
})(window);