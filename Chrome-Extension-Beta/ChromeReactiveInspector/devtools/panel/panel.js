if (!cri) {
    throw "cri namespace not initialized. something went wrong during loading of js files";
}

let $document = $(document);
$document.ready(function () {
    $(".dropdown-toggle").dropdown();
});

$(".dropdown-menu li a").click(function () {
    $(this).parents(".dropdown").find('.btn')
        .html($(this).text() + ' <span class="caret"></span>')
        .val($(this).data('value'));
});

let $dialog = $("#dialog").hide();
$dialog.dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        "Confirm": function () {
            $(this).dialog("close");
        },
        "Cancel": function () {
            configRecStatusButton.click();
            $(this).dialog("close");
        }
    }
});

let $criToolsContainer = $("#cri-tools-container");
let toolsContainerVisible = true;
let $criToolsCollapseButton = $("#cri-tools-collapse");
$criToolsCollapseButton.click(function () {
    toolsContainerVisible = !toolsContainerVisible;
    if (toolsContainerVisible) {
        $criToolsCollapseButton.find("span").removeClass("glyphicon-chevron-down")
            .addClass("glyphicon-chevron-up");
        $criToolsContainer.show();
    } else {
        $criToolsCollapseButton.find("span").removeClass("glyphicon-chevron-up")
            .addClass("glyphicon-chevron-down");
        $criToolsContainer.hide();
    }
});

let historyEntries = [];
let isConfirmed = false;

let $canvasContainer = $("#canvas-container");

let tooltipManager = null;
let history = new cri.graphHistory.History();
let graphManager = new cri.dependencyGraph.GraphManager(d3.select("svg"), history,
    function () { // after changed callback
        tooltipManager.initializeTooltips(d3.selectAll("svg g.node"));
    }, function () { // after reset callback
        historyEntries = [];
        isConfirmed = false
    });
tooltipManager = new cri.TooltipManager($canvasContainer, graphManager);

// Set up zoom support
let zoom = d3.behavior.zoom()
    .translate([20, 70])
    .scale(1)
    .scaleExtent([-8, 8])
    .on('zoom', zoomed);

d3.select("svg").call(zoom) // delete this line to disable free zooming
    .call(zoom.event);

function zoomed() {
    graphManager.graphElement.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
}

/**
 * Slider to navigate the steps in the dependency graph.
 * @type {jQuery}
 */
let rxSlider = $("#slider")
    .slider({
        min: 0,
        max: 0,
        change: function (event, ui) {
            $('.ui-slider-handle').text(ui.value);

            // throttle redraws to reduce performance impact on websites that generate changes really quick.
            drawStageFromUI(ui.value);
        },
        slide: function (event, ui) {
            $('.ui-slider-handle').text(ui.value);
            debouncedRedrawGraph(ui.value);
        }
    })
    .slider("pips");

let debouncedRedrawGraph = _.debounce(drawStageFromUI, 250);

/**
 * Prevent unnecessary redraws of the dependency graph.
 * This catches debounced calls from causing a redraw for a single stageId twice.
 * @param stageId
 */
function drawStageFromUI(stageId) {

    if (graphManager.currentStage !== null && graphManager.currentStage === stageId) {
        return;
    }
    graphManager.drawStage(stageId);
}

// slider controls
$('#down').click(function () {
    rxSlider.slider('value', rxSlider.slider('value') + rxSlider.slider("option", "step"));
});
$('#up').click(function () {
    rxSlider.slider('value', rxSlider.slider('value') - rxSlider.slider("option", "step"));
});

let adjustSlider = _.throttle(function (value, max) {
    if (rxSlider) {
        rxSlider.slider("option", "min", 0);
        rxSlider.slider("option", "max", max);
        rxSlider.slider("option", "value", value);
        rxSlider.slider("pips", "refresh");
    }
    else {
        console.log("cri: rxSlider was not initialized yet!");
    }
}, 230);

adjustSlider(0, 0);

let $configIncludeFilesField = $('#cri-config-includes');
let previousConfigFiles = [];
let configRecStatusButton = document.getElementById('cri-rec-status');
// (function () {
// populate
chrome.storage.sync.get({cri_config_rec_status: true}, function (items) {
    let recStatusFromStorage = items.cri_config_rec_status;
    configRecStatusButton.setAttribute('data-rec-status', recStatusFromStorage);
    $(this).data("rec-status", recStatusFromStorage);
    if (recStatusFromStorage) {
        configRecStatusButton.innerText = 'Pause Recording';
        configRecStatusButton.classList.add('btn-info');
        configRecStatusButton.classList.remove('btn-danger');
    } else {
        configRecStatusButton.innerText = 'Start Recording';
        configRecStatusButton.classList.remove('btn-info');
        configRecStatusButton.classList.add('btn-danger');
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
            optionsAccess.$getOption(optionKeys.reloadOnInstrument).done(function (shouldReload) {
                if (shouldReload) {
                    reload();
                }
            });
            reload();
        }).on('tokenfield:removedtoken.cri', function (e) {
            setCricConfigFiles(0, e.attrs.value);
            validateIncludeList();
            optionsAccess.$getOption(optionKeys.reloadOnInstrument).done(function (shouldReload) {
                if (shouldReload) {
                    reload();
                }
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
    if (tokens.length === 0) {
        $configIncludeParent.addClass('validation-error');
    } else {
        $configIncludeParent.removeClass('validation-error');
    }
}

/**
 * This method is called whenever the user clicks on 'Pause' or 'Start' recording button.
 */
configRecStatusButton.addEventListener('click', function () {
    let currentStatus = $(this).attr('data-rec-status');
    let temp = (currentStatus === 'true');
    // $(this).data("rec-status",!currentStatus);
    $(this).attr('data-rec-status', !temp);
    setCriStatus($(this), !temp);

});

function setCriStatus(element, status) {
    chrome.storage.sync.set({cri_config_rec_status: status});
    if (status) {
        // isConfirmed = false;
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
    graphManager.clearGraph();
    adjustSlider(0, 0);
});

$('#cri-download-graph').click(function () {
    sendObjectToInspectedPage({destination: "background", action: "tabInfo"}, function (response) {
        let currentTabUrl = response.currentTabUrl;
        if (!currentTabUrl) {
            console.log('Error retrieving url of current inspected tab.');
            return;
        }

        let filename = currentTabUrl.substring(currentTabUrl.lastIndexOf('/') + 1);
        if (!filename || filename === "") {
            return;
        }

        let svgElement = document.getElementById('svg-canvas');
        let simg = new Simg(svgElement);
        // Replace the current SVG with an image version of it.
        // simg.replace();
        // And trigger a download of the rendered image.
        simg.download('dependency_graph_' + filename);
    });
});

let $searchNode = $("#cri-node-search-val");

let searchGraphManager = new cri.SearchGraphManager(graphManager, $searchNode);

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
$('#cri-findnode-select').editableSelect({filter: false});
$("#cri-history-current-step").text(0);
$("#cri-history-last-step").text(0);

let historyQueryResult = '';
$('#cri-history-query-submit').click(function () {
    let historyQuery, param1, param2 = '';
    let currentHistoryQuery = $('#cri-findnode-select').val();
    historyQuery = currentHistoryQuery.substring(0, currentHistoryQuery.indexOf('['));

    if (!currentHistoryQuery || !historyQuery) {
        // if the the query is empty, reset the history query feature.
        $("#cri-history-current-step").text(0);
        $("#cri-history-last-step").text(0);
        historyQueryResult = '';
        return;
    }
    let matches = currentHistoryQuery.match(/\[(.*?)\]/g).map(function (val) {
        return val.replace('[', '').replace(']', '');
    });

    if (matches) {
        param1 = matches[0];
        if (matches[1]) {
            param2 = matches[1];
        }
        if (historyQuery === "nodeCreated") {
            let _tNode = _.find(allNodes, {name: param1});
            if (_tNode) {
                historyQueryResult = historyEntries.filter(function (history) {
                    if (history.type === 'nodeCreated' && history.nodeId === _tNode.nodeId)
                        return history.stageId;
                });
                displayHistoryQueryResult(historyQueryResult);
            }
        } else if (historyQuery === "nodeUpdated") {
            historyQueryResult = historyEntries.filter(function (history) {
                if (history.type === 'nodeUpdated' && history.nodeName === param1)
                    return history.stageId;
            });
            displayHistoryQueryResult(historyQueryResult);
        } else if (historyQuery === "evaluationYielded") {
            historyQueryResult = historyEntries.filter(function (history) {
                if (history.type === 'nodeUpdated' && history.nodeName === param1) {
                    // using indexOf here would be problematic, because it would find "5" in "15".
                    //TODO: this should have an option to provide a regex. For now indexOf replaced with exact match to avoid confusing the user.
                    if (String(history.nodeValue) === String(param2))
                        return history.stageId;
                }
            });
            displayHistoryQueryResult(historyQueryResult);

        } else if (historyQuery === "dependencyCreated") {
            let nodeNameSource = param1;
            let nodeNameDest = param2;
            let tempResult = [];
            let filteredHistoryEntries = _.filter(historyEntries, function (history) {
                return history.type === 'dependencyCreated'
            });

            filteredHistoryEntries.forEach(function (history) {
                if (history.startNodeName === nodeNameSource && history.endNodeName === nodeNameDest) {
                    historyQueryResult = [history];
                } else if (history.startNodeName === nodeNameSource) {
                    tempResult.push(history)
                }
            });

            if (!historyQueryResult.length) {
                if (tempResult.length) {
                    tempResult.forEach(function (temp) {
                        if (temp.endNodeName === nodeNameDest && !historyQueryResult.length) {
                            historyQueryResult = [temp];
                        } else {
                            //TODO: check the desired behavior here. "pop(temp)" does not pop the element temp!
                            // -> it used pop on the last element, because the function only takes one argument
                            tempResult.pop(temp);
                            checkFurtherNodes(temp)
                        }
                    });
                }
            }

            function checkFurtherNodes(h) {
                filteredHistoryEntries.forEach(function (history) {
                    if (!historyQueryResult.length) {
                        if (history.startNodeName === h.endNodeName && history.endNodeName === nodeNameDest) {
                            historyQueryResult = [history];
                        } else if (history.startNodeName === h.endNodeName) {
                            tempResult.push(history)
                        }
                    }
                });
            }

            displayHistoryQueryResult(historyQueryResult);
        }
    }
});

function displayHistoryQueryResult(queryResult) {
    if (queryResult.length) {
        graphManager.drawStage(historyQueryResult[0].stageId);
        rxSlider.slider('value', historyQueryResult[0].stageId, rxSlider.slider("option", "step"));
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
        rxSlider.slider('value', firstFoundStageId, rxSlider.slider("option", "step"));
        graphManager.drawStage(firstFoundStageId);
        $("#cri-history-current-step").text(nextStepToAccess + 1);
    }
});

$('#cri-history-query-next').click(function () {
    let currentStepFromHistoryQuery = $("#cri-history-current-step").text();
    let nextStepToAccess = parseInt(currentStepFromHistoryQuery);
    if (historyQueryResult && (historyQueryResult.length > 1) && historyQueryResult.length > nextStepToAccess) {
        let firstFoundStageId = historyQueryResult[nextStepToAccess].stageId;
        rxSlider.slider('value', firstFoundStageId, rxSlider.slider("option", "step"));
        graphManager.drawStage(firstFoundStageId);
        $("#cri-history-current-step").text(nextStepToAccess + 1);
    }
});

/**
 * Reactive Breakpoints feature
 */
let $breakpointContainer = $('#cri-breakpoints-container');
let reactiveBreakpointManager = new cri.ReactiveBreakpointManager($breakpointContainer);

$('#cri-breakpoint-select').editableSelect({filter: false});
// it is important to query the element after "editableSelect" has been called, because
// otherwise the selector will not have the proper value due to weird behavior of jquery-editable-select
let $breakpointSelect = $('#cri-breakpoint-select');

$('#cri-breakpoint-query-submit').click(function () {
    reactiveBreakpointManager.submitBreakpoints($breakpointSelect.val());
});

$breakpointContainer.on("click", "span.bpoint-remove", function () {
    let bpointIndexToRemove = $(this).data('bpoint-index');
    reactiveBreakpointManager.removeBreakPointByIndex(bpointIndexToRemove);
});

/* force focus on canvas on mouse over to enable ctrl capture on the canvas used in code tooltips */
$canvasContainer.on("mouseenter.focus", function () {
    let scrollLeft = $document.scrollLeft();
    let scrollTop = $document.scrollTop();

    this.focus();

    $document.scrollTop(scrollTop);
    $document.scrollLeft(scrollLeft);
});