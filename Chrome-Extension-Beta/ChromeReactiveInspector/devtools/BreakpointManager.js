var cri = cri || {};

(function () {

    /**
     * Implements Reactive Breakpoints.
     * @param $breakpointContainer A jquery selector for the UI element that contains the
     * list of currently used breakpoints.
     * @returns {BreakpointManager}
     * @constructor {BreakpointManager}
     */
    function BreakpointManager($breakpointContainer) {
        this.$breakpointContainer = $breakpointContainer;
        chrome.storage.sync.get({reactiveBreakPoints: []},
          result => refreshUI(this, result.reactiveBreakPoints));
        return this;
    }

    BreakpointManager.prototype.submitBreakpoints = function (queryString) {
        if (!queryString) return false; // do not store empty query

        let self = this;
        chrome.storage.sync.get({reactiveBreakPoints: []}, result => {
            let currentBreakPoints = result.reactiveBreakPoints;
            let notFound = currentBreakPoints.indexOf(queryString) === -1;
            if (notFound) {
                currentBreakPoints.push(queryString);
                chrome.storage.sync.set({reactiveBreakPoints: currentBreakPoints},
                  // then refresh front end, where we list current breakpoints
                  () => refreshUI(self, currentBreakPoints));
            }
        });
    };

    BreakpointManager.prototype.removeBreakPointByIndex = function (index) {
        let self = this;
        chrome.storage.sync.get({reactiveBreakPoints: []}, result => {
            let currentBreakPoints = result.reactiveBreakPoints;
            currentBreakPoints.splice(index, 1);
            chrome.storage.sync.set({reactiveBreakPoints: currentBreakPoints},
              // then refresh front end, where we list current breakpoints
              () => refreshUI(self, currentBreakPoints));
        });
    };

    function refreshUI(self, currentBreakPoints) {
        self.$breakpointContainer.html(""); // remove everything
        
        if (currentBreakPoints.length === 0) { // no break points
            self.$breakpointContainer.css("margin", "0");
            return;
        }

        self.$breakpointContainer.css("margin", "auto");
        currentBreakPoints.forEach((breakpoint, index) => {
            let $breakpoint = $("<div class='bpoint-entry'>")
                .append($("<span class='bpoint-remove'>")
                    .attr("data-bpoint-index", index)
                    .text("X"))
                .append($("<span class='bpoint-query'>")
                    .text(breakpoint));
            self.$breakpointContainer.append($breakpoint);
        });
    }

    // export
    cri.BreakpointManager = BreakpointManager;
}());

