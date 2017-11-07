var cri = cri || {};

_.extend(cri, (function (window) {

    function ReactiveBreakpointManager($breakpointContainer) {
        this.$breakpointContainer = $breakpointContainer;
        this.refreshUI();
        return this;
    }

    ReactiveBreakpointManager.prototype.submitBreakpoints = function(historyQueryString) {
        var historyQuery, param1, param2 = '';

        historyQuery = historyQueryString.substring(0, historyQueryString.indexOf('['));

        var matches = historyQueryString.match(/\[(.*?)\]/g).map(function (val) {
            return val.replace('[', '').replace(']', '');
        });

        if (matches) {
            param1 = matches[0];
            if (matches[1]) {
                param2 = matches[1];
                if (param2 === 'nodeId')
                    return false
            }
            if (param1 === 'nodeId')
                return false;

            // NOW we have query and parameter
            // check which query to apply, find data from current stages
            var breakPointToStore = {
                query: historyQuery,
                params: matches
            };
            this.storeBreakPoint(breakPointToStore);
        }
    };

    // This method append breakpoint object to local storage
    ReactiveBreakpointManager.prototype.storeBreakPoint = function(breakPointToStore) {
        var self = this;
        // by passing an object you can define default values e.g.: []
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var currentBreakPoints = result.criReactiveBreakPoints;

            var alreadyExists = _.some(currentBreakPoints, function (bp) {
                if (bp.params[0] === breakPointToStore.params[0] && bp.query === breakPointToStore.query) {
                    if (breakPointToStore.params.length > 1) {
                        return bp.params.length > 1 && breakPointToStore.params[1] === bp.params[1];
                    }
                    return true;
                }
                return false;
            });
            if (!alreadyExists) {
                currentBreakPoints.push(breakPointToStore);
                // set the new array value to the same key
                chrome.storage.sync.set({criReactiveBreakPoints: currentBreakPoints}, function () {
                    // refresh front end , where we list current breakpoints
                    self.refreshUI();
                });
            }
        });
    };

    ReactiveBreakpointManager.prototype.removeBreakPointByIndex = function(index) {
        var self = this;
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var currentBreakPoints = result.criReactiveBreakPoints;
            currentBreakPoints.splice(index, 1);
            // set the new array value to the same key
            chrome.storage.sync.set({criReactiveBreakPoints: currentBreakPoints}, function () {
                // refresh front end , where we list current breakpoints
                self.refreshUI();
            });
        });

    };

    /**
     *
     * @param callback function(array of {index, query})
     */
    ReactiveBreakpointManager.prototype.getBreakpointsAsync=function(callback) {
        var self = this;
        // get current breakpoints from storage and list down
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var currentBreakPoints = result.criReactiveBreakPoints;
            var breakpointData = [];
            for (var index in currentBreakPoints) {
                var currentBreakPoint = currentBreakPoints[index];
                var currentBreakPointQuery = currentBreakPoint.query;
                if (currentBreakPoint.params[0] !== undefined) {
                    currentBreakPointQuery = currentBreakPointQuery + "[" + currentBreakPoint.params[0] + "]";
                }
                if (currentBreakPoint.params[1] !== undefined) {
                    currentBreakPointQuery = currentBreakPointQuery + "[" + currentBreakPoint.params[1] + "]";
                }
                breakpointData.push({index: index, query: currentBreakPointQuery});
            }
            callback(breakpointData);
        });
    };

    ReactiveBreakpointManager.prototype.refreshUI = function() {
        var self = this;

        self.getBreakpointsAsync(function (data) {
            // remove everything
            self.$breakpointContainer.html("");

            data.forEach(function () {
                var breakpoint = this;
                var $breakpoint = $("<div class='bpoint-entry'>")
                    .append($("<span class='bpoint-remove'>")
                        .attr("data-bpoint-index", breakpoint.index)
                        .text("X"))
                    .append($("<span class='bpoint-query'>")
                        .text(breakpoint.query));
                self.$breakpointContainer.append($breakpoint);
            });
        });
    };

    return {ReactiveBreakpointManager: ReactiveBreakpointManager};
})(window));

