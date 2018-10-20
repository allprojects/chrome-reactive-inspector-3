/*
    Use Bacon.spy to log all internal activities of Bacon.js
 */

var cri = cri || {};
cri.analysis = cri.analysis || {};

cri.analysis.bacon = (function (window) {
    // remap pseudo include to shorten calls
    let recording = cri.analysis.recording;

    if (Bacon !== undefined) {
        // https://baconjs.github.io/api.html#bacon-spy
        Bacon.spy(function (obs) {

            let nodeType = "";
            let nodeMethod = "";

            if (obs._isEventStream) {
                nodeType = "Eventstream";
            }
            if (obs._isProperty) {
                nodeType = "Property";
            }

            if (obs.desc.method) {
                nodeMethod = obs.desc.method;
            }

            let currentObsId = obs.id;
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
                recording.logNodeData({id: currentObsId, type: nodeType, value: val});
            });

            obs.onError(function (error) {
                console.log('Error: ', error);
            });
        });
    }
    return {};
})(window);