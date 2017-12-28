var cri = cri || {};

_.extend(cri, (function (window) {

    function ReactiveBreakpointManager($breakpointContainer) {
        this.$breakpointContainer = $breakpointContainer;
        this.refreshUI();
        return this;
    }

    ReactiveBreakpointManager.prototype.submitBreakpoints = function (historyQueryString) {
        let historyQuery, param1, param2 = '';

        historyQuery = historyQueryString.substring(0, historyQueryString.indexOf('['));

        if (!historyQuery) {
            // this happens when the user typed in something without '['
            return false;
        }
        let matches = historyQueryString.match(/\[(.*?)\]/g).map(function (val) {
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
            let breakPointToStore = {
                query: historyQuery,
                params: matches
            };
            this.storeBreakPoint(breakPointToStore);
        }
    };

    // This method append breakpoint object to local storage
    ReactiveBreakpointManager.prototype.storeBreakPoint = function (breakPointToStore) {
        let self = this;
        // by passing an object you can define default values e.g.: []
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            let currentBreakPoints = result.criReactiveBreakPoints;

            let alreadyExists = _.some(currentBreakPoints, function (bp) {
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

    ReactiveBreakpointManager.prototype.removeBreakPointByIndex = function (index) {
        let self = this;
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            let currentBreakPoints = result.criReactiveBreakPoints;
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
    ReactiveBreakpointManager.prototype.getBreakpointsAsync = function (callback) {
        let self = this;
        // get current breakpoints from storage and list down
        chrome.storage.sync.get({criReactiveBreakPoints: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            let currentBreakPoints = result.criReactiveBreakPoints;
            let breakpointData = [];
            for (let index in currentBreakPoints) {
                let currentBreakPoint = currentBreakPoints[index];
                let currentBreakPointQuery = currentBreakPoint.query;
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

    ReactiveBreakpointManager.prototype.refreshUI = function () {
        let self = this;

        self.getBreakpointsAsync(function (data) {
            // remove everything
            self.$breakpointContainer.html("");
            if (data.length === 0) {
                self.$breakpointContainer.css("margin", "0");
            } else {
                self.$breakpointContainer.css("margin", "auto");
                data.forEach(function (breakpoint) {
                    let $breakpoint = $("<div class='bpoint-entry'>")
                        .append($("<span class='bpoint-remove'>")
                            .attr("data-bpoint-index", breakpoint.index)
                            .text("X"))
                        .append($("<span class='bpoint-query'>")
                            .text(breakpoint.query));
                    self.$breakpointContainer.append($breakpoint);
                });
            }
        });
    };

    return {ReactiveBreakpointManager: ReactiveBreakpointManager};
})(window));

