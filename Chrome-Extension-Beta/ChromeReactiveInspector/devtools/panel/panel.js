var cri = cri || {};

(function (){

// exports
    cri.historyEntries = [];
    cri.history = new cri.History();

    // This sends an object to the background page 
    // where it can be relayed to the inspected page
    cri.sendObjectToInspectedPage = function (message, handleResponse) {
        message.tabId = chrome.devtools.inspectedWindow.tabId;
        chrome.extension.sendMessage(message, handleResponse);
    }

    cri.graphManager = new cri.GraphManager(
        d3.select("svg"),
        () => tooltipManager.initializeTooltips(d3.selectAll("svg g.node")), // after changed callback
        () => cri.historyEntries = [],                                       // after reset callback
    );

    cri.adjustSlider = function(value) {
    //    if (!$slider) { // david: $slider was defined some lines above, so it cannot be undefined now?
    //        return console.log("cri: $slider was not initialized yet!");
        $slider.slider("option", "min", 0);
        $slider.slider("option", "max", value);
        $slider.slider("option", "value", value);
        $slider.slider("pips", "refresh");
    };

//    $('#cri-breakpoint-select').editableSelect({filter: false});
    // it is important to query the element after "editableSelect" has been called, because
    // otherwise the selector will not have the proper value due to weird behavior of jquery-editable-select

// defines
    let $document = $(document);
//    let $toolsContainer = $("#cri-tools-container");
//    let $toolsCollapseButton = $("#cri-tools-collapse");
    let $searchNode = $("#cri-node-search-val");
    let $breakpointContainer = $('#cri-breakpoints-container');
    let $breakpointSelect = $('#cri-breakpoint-select');
    let $slider = $("#slider")
    let $canvasContainer = $("#canvas-container");
    let $configIncludeFilesField = $('#cri-config-includes');
    let $configRecStatusButton = $('#cri-rec-status');

    let historyQueryResult = [];
    let previousConfigFiles = [];
//    let toolsContainerVisible = true;

// imports
    let tooltipManager = new cri.TooltipManager($canvasContainer, cri.graphManager);
    let searchGraphManager = new cri.SearchGraphManager(cri.graphManager, $searchNode);
    let breakpointManager = new cri.BreakpointManager($breakpointContainer);

// dropdown
    $document.ready(() => $(".dropdown-toggle").dropdown());
    $(".dropdown-menu li a").click(function () {
        $(this).parents(".dropdown").find('.btn')
            .html($(this).text() + ' <span class="caret"></span>')
            .val($(this).data('value'));
    });

// dialog
    $("#dialog").hide().dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Confirm": function () {
                $(this).dialog("close");
            },
            "Cancel": function () {
                $configRecStatusButton.click();
                $(this).dialog("close");
            }
        }
    });

//// collapse
//    $toolsCollapseButton.click(function () {
//        toolsContainerVisible = !toolsContainerVisible;
//        if (toolsContainerVisible) {
//            $toolsCollapseButton.find("span").removeClass("glyphicon-chevron-down")
//                .addClass("glyphicon-chevron-up");
//            $toolsContainer.show();
//        } else {
//            $toolsCollapseButton.find("span").removeClass("glyphicon-chevron-up")
//                .addClass("glyphicon-chevron-down");
//            $toolsContainer.hide();
//        }
//    });

// zoom
    // Set up zoom support
    let zoom = d3.behavior.zoom()
        .translate([20, 70])
        .scale(1)
        .scaleExtent([-8, 8])
        .on('zoom', () => {
            cri.graphManager.graphElement.attr("transform",
                "translate(" + zoom.translate() + ")" +
                "scale(" + zoom.scale() + ")"
            );
        });
    d3.select("svg")
        .call(zoom)        // delete this line to disable free zooming
        .call(zoom.event); // david: maybe redundant, or initializes zoom?

// slider
    $slider.slider({
            min: 0,
            max: 0,
            change(event, ui) {
                $('.ui-slider-handle').text(ui.value);
                drawStageFromUI(ui.value);
            },
//            slide(event, ui) { // david: redundant to .change ?
//                $('.ui-slider-handle').text(ui.value);
//                drawStageFromUI(ui.value);
//            }
        })
        .slider("pips");

    // slider controls
    $('#down').click(() => $slider.slider('value', $slider.slider('value') + 1));
    $('#up')  .click(() => $slider.slider('value', $slider.slider('value') - 1));

    let drawStageFromUI = _.debounce(stageId => { // debounce redraws
        if (cri.graphManager.currentStage !== stageId) // only redraw when stageId changed
            cri.graphManager.drawStage(stageId);
    }, 250);

    cri.adjustSlider(0);

// config / storage
    // populate
    chrome.storage.sync.get({recordStatus: true}, function (items) {
        let recStatusFromStorage = items.recordStatus;
        $configRecStatusButton.attr('data-rec-status', recStatusFromStorage);
        $(this).data("rec-status", recStatusFromStorage);
        if (recStatusFromStorage) {
            $configRecStatusButton.text('Pause Recording');
            $configRecStatusButton.addClass('btn-info');
            $configRecStatusButton.removeClass('btn-danger');
        } else {
            $configRecStatusButton.text('Start Recording');
            $configRecStatusButton.removeClass('btn-info');
            $configRecStatusButton.addClass('btn-danger');
        }
    });

    let $configIncludeParent = null;

    function initIncludeTokenField(scriptNames) {
        chrome.storage.sync.get('criconfigincludes', function (items) {
            let includes = items.criconfigincludes;

            previousConfigFiles = includes || [];

            // remove previous events (e.g. during reload the field is already initialized)
            $configIncludeFilesField.off(".cri");
            $configIncludeFilesField.tokenfield({
                tokens: previousConfigFiles,
                autocomplete: {
                    source: scriptNames,
                    delay: 100
                },
                showAutocompleteOnFocus: true
            }).on('tokenfield:createtoken.cri', function (e) {
                setCricConfigFiles(1, e.attrs.value);
                validateIncludeList();
                optionsAccess.$getOption(optionKeys.reloadOnInstrument).done(shouldReload => {
                    if (shouldReload) reload();
                });
                reload();
            }).on('tokenfield:removedtoken.cri', function (e) {
                setCricConfigFiles(0, e.attrs.value);
                validateIncludeList();
                optionsAccess.$getOption(optionKeys.reloadOnInstrument).done(shouldReload => {
                    if (shouldReload) reload();
                });
            });
            $configIncludeParent = $configIncludeFilesField.closest(".tokenfield");
            validateIncludeList();
        });
    }

    function setCricConfigFiles(val, fileName) {
        if (val) {
            if (!_.contains(previousConfigFiles, fileName)) {
                previousConfigFiles.push(fileName)
            }
        }
        else {
            if (_.contains(previousConfigFiles, fileName)) {
                previousConfigFiles = _.without(previousConfigFiles, _.findWhere(previousConfigFiles, fileName));
            }
        }
        chrome.storage.sync.set({
            'criconfigincludes': previousConfigFiles
        });
    }

    function validateIncludeList() {
        let tokens = $configIncludeFilesField.tokenfield('getTokens');
        if (tokens.length === 0)
            $configIncludeParent.addClass('validation-error');
        else
            $configIncludeParent.removeClass('validation-error');
    }

    /**
     * This method is called whenever the user clicks on 'Pause' or 'Start' recording button.
     */
    $configRecStatusButton.click(function () {
        let currentStatus = $(this).attr('data-rec-status');
        let temp = (currentStatus === 'true');
        // $(this).data("rec-status",!currentStatus);
        $(this).attr('data-rec-status', !temp);
        setCriStatus($(this), !temp);

    });

    function setCriStatus(element, status) {
        chrome.storage.sync.set({recordStatus: status});
        if (status) {
            element.text('Pause Recording');
            element.addClass('btn-info');
            element.removeClass('btn-danger');
        } else {
            element.text('Start Recording');
            element.addClass('btn-danger');
            element.removeClass('btn-info');
        }
    }

    $("#cri-reload").click(reload);

    function reload() {
        chrome.tabs.reload(chrome.devtools.inspectedWindow.tabId, {}, function () {
        });
    }

    // Reset everything
    $("#cri-reset").click(function () {
        cri.graphManager.clearGraph();
        cri.adjustSlider(0);
    });

    $('#cri-download-graph').click(function () {
        cri.sendObjectToInspectedPage({destination: "background", action: "tabInfo"}, function (response) {
            let currentTabUrl = response.currentTabUrl;
            console.log("download response", response)
            if (!currentTabUrl) {
                console.log('Error retrieving url of current inspected tab.');
//                return;
            }

            let filename = currentTabUrl.substring(currentTabUrl.lastIndexOf('/') + 1);
//            if (!filename || filename === "") {
//                console.log("too short url");
//                return;
//            }

            let svgElement = document.getElementById('svg-canvas');
            let html = svgElement.outerHTML.replace(/>/g, ">\n").replace(/<br>/g, "<br />")
            fetch(document.styleSheets[6].href).then(x => x.text()).then(style => {
              html = html.replace(/<svg.*?>/, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">')
              html = html.substring(0, html.length-7) + "<style type=\"text/css\"> <![CDATA[ " + style + " ]]> </style></svg>";
              let a = document.createElement("a");
              a.download = "chart";
              a.href = 'data:image/svg+xml;base64,' + window.btoa(html);
              a.click();

  //            let simg = new Simg(svgElement);
  //            // Replace the current SVG with an image version of it.
  //            console.log(simg)
  //            simg.replace();
  //            // And trigger a download of the rendered image.
  //            let fullname = 'dependency_graph_' + filename + Math.random();
  //            console.log("download response", response)
  //            console.log(simg.download(fullname));
  //            console.log("download response", response)
            });
        });
    });

    $('#cri-find-btn').click(function () {
        let type = $('#featureType').text().trim();
        if (type === 'Search')
            searchGraphManager.searchNodeFunction($searchNode.val());
        else if (type === 'Dependents')
            searchGraphManager.dependency($searchNode.val(), 'dependents');
        else if (type === 'Dependencies')
            searchGraphManager.dependency($searchNode.val(), 'dependencies');
    });

    $searchNode.on('keyup paste', function () {
        //TODO: check if this resets the search correctly.
        let searchNodeVal = $searchNode.val();
        if (searchNodeVal === '') {
            // resets all search styles etc.
            //TODO: make search solely with css instead of resetting the data.
            searchGraphManager.resetSearch();
        }
        $searchNode.removeClass('error');
    });


    /**
     * editable select for find by query feature
     */
//    $('#cri-findnode-select').editableSelect({filter: false});
    $("#cri-history-current-step").text(0);
    $("#cri-history-last-step").text(0);

    $('#cri-history-query-submit').click(e => {
        e.preventDefault();

        let queryString = $('#cri-findnode-select').val();
        if (!queryString) {
            // if the the query is empty, reset the history query feature.
            $("#cri-history-current-step").text(0);
            $("#cri-history-last-step").text(0);
            historyQueryResult = [];
            return;
        }

        let [action, param1, param2] = queryString.split(":");

// TODO differentiate node creation from node value change?
//            if (action === "nodeCreated") {
//                let _tNode = _.find(cri.allNodes, {name: param1});
//                if (_tNode) {
//                    historyQueryResult = cri.historyEntries.filter(function (history) {
//                        if (history.type === 'nodeCreated' && history.nodeId === _tNode.nodeId)
//                            return history.stageId;
//                    });
//                    displayHistoryQueryResult(historyQueryResult);
//                }
//            }

        if (action === "saveNode" || action === "nodeWithValue")
            historyQueryResult = cri.historyEntries.filter(history =>
                   history.nodeType === action
                && history.nodeId === param1
                // using indexOf here would be problematic, because it would find "5" in "15".
                // TODO: this should have an option to provide a regex.
                // For now indexOf replaced with exact match to avoid confusing the user.
                && (action === "saveNode" || history.nodeValue === param2) );
        else if (action === "saveEdge")
            historyQueryResult = cri.historyEntries.filter(history =>
                   history.nodeType === action
                && history.edgeStartName === param1
                && history.edgeEndName === param2 );
            // TODO: there once was support to find transitive edges.
            //       maybe add it again.

        console.log(historyQueryResult);
        displayHistoryQueryResult(historyQueryResult);
    });

    function displayHistoryQueryResult(queryResult) {
        if (queryResult.length) {
            cri.graphManager.drawStage(historyQueryResult[0].stageId);
            $slider.slider('value', historyQueryResult[0].stageId, $slider.slider("option", "step"));
            $("#cri-history-current-step").text(1);
            $("#cri-history-last-step").text(historyQueryResult.length);
        } else {
            $("#cri-history-current-step").text(0);
            $("#cri-history-last-step").text(0);
        }
    }

    $('#cri-history-query-prev').click(function () {
        let currentStepFromHistoryQuery = $("#cri-history-current-step").text();
        let nextStepToAccess = parseInt(currentStepFromHistoryQuery) - 2;
        if (historyQueryResult && historyQueryResult.length && nextStepToAccess > -1) {
            let firstFoundStageId = historyQueryResult[nextStepToAccess].stageId;
            $slider.slider('value', firstFoundStageId, $slider.slider("option", "step"));
            cri.graphManager.drawStage(firstFoundStageId);
            $("#cri-history-current-step").text(nextStepToAccess + 1);
        }
    });

    $('#cri-history-query-next').click(function () {
        let currentStepFromHistoryQuery = $("#cri-history-current-step").text();
        let nextStepToAccess = parseInt(currentStepFromHistoryQuery);
        if (historyQueryResult && (historyQueryResult.length > 1) && historyQueryResult.length > nextStepToAccess) {
            let firstFoundStageId = historyQueryResult[nextStepToAccess].stageId;
            $slider.slider('value', firstFoundStageId, $slider.slider("option", "step"));
            cri.graphManager.drawStage(firstFoundStageId);
            $("#cri-history-current-step").text(nextStepToAccess + 1);
        }
    });

    // Reactive Breakpoints feature
    $('#cri-breakpoint-query-submit').click(e => {
        e.preventDefault();
        breakpointManager.submitBreakpoints($breakpointSelect.val());
    });
    $breakpointContainer.on("click", "span.bpoint-remove", function () {
        let bpointIndexToRemove = $(this).data('bpoint-index');
        breakpointManager.removeBreakPointByIndex(bpointIndexToRemove);
    });

    /* force focus on canvas on mouse over to enable ctrl capture on the canvas used in code tooltips */
    $canvasContainer.on("mouseenter.focus", function () {
        let scrollLeft = $document.scrollLeft();
        let scrollTop = $document.scrollTop();

        this.focus();

        $document.scrollTop(scrollTop);
        $document.scrollLeft(scrollLeft);
    });

}());
