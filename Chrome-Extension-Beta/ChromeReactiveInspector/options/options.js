// Load the previous options
document.addEventListener('DOMContentLoaded', restore_options);

let $developerMode = $("#debug");
let $printAllValues = $('#printAllValues');
let $codePreviewScope = $('#codePreviewScope');
let $codePreviewMax = $('#codePreviewMax');
let $defaultIgnores = $('#defaultIgnores');
let $reloadOnInstrument = $('#reloadOnInstrument');

const defaultDefaultIgnores = ["Rx.js", "rx.lite.js", "Bacon.js", "Bacon.UI.js",
    "jquery.js", "rx.all.js", "jquery-2.1.4.js", "jquery-1.9.1.min.js", "jquery-1.12.4.min.js",
    "underscore.js", "underscore-min.js"];

// Saves options to chrome.storage
function save_options() {
    let defaultIgnores = $defaultIgnores.tokenfield('getTokens');
    defaultIgnores = _.map(defaultIgnores, function (item) {
        return item.value;
    });

    chrome.storage.sync.set({
            printAllValue: $printAllValues.prop('checked'),
            developerMode: $developerMode.prop('checked'),
            codePreviewScope: $codePreviewScope.val(),
            codePreviewMax: $codePreviewMax.val(),
            defaultIgnores: defaultIgnores,
            reloadOnInstrument: $reloadOnInstrument.prop('checked')
        }, function () {
            dataSaved();
        }
    );
}

function restore_options() {
    chrome.storage.sync.get({
        printAllValue: false,
        developerMode: false,
        codePreviewScope: 4,
        codePreviewMax: 10,
        defaultIgnores: defaultDefaultIgnores,
        reloadOnInstrument: true
    }, function (items) {
        $printAllValues.prop('checked', items.printAllValue);
        $developerMode.prop('checked', items.developerMode);
        $codePreviewScope.val(items.codePreviewScope);
        $codePreviewMax.val(items.codePreviewMax);
        $defaultIgnores.tokenfield("setTokens", items.defaultIgnores);
        $reloadOnInstrument.prop('checked', items.reloadOnInstrument);
    });
    chrome.storage.sync.set({
        'nodesDoNotSave': []
    });
}

function dataSaved() {
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
        status.textContent = '';
    }, 2000);
}

let $nodeInput = $('#nodeId');
jQuery(document).ready(function ($) {

    $nodeInput.tokenfield();
    $nodeInput
        .on('tokenfield:createtoken', function (e) {
            if (isNaN(e.attrs.value))
                e.preventDefault();
            let existingTokens = $(this).tokenfield('getTokens');
            $.each(existingTokens, function (index, token) {
                if (token.value === e.attrs.value)
                    e.preventDefault();
            });
            setCricConfigFiles(1, e.attrs.value)
        })
        .on('tokenfield:removedtoken', function (e) {
            setCricConfigFiles(0, e.attrs.value)
        })
        .tokenfield();

    function setCricConfigFiles(val, nodeId) {
        if (val) {
            if (!_.contains(previousNodes, nodeId)) {
                previousNodes.push(nodeId)
            }
        }
        else {
            if (_.contains(previousNodes, nodeId)) {
                previousNodes = _.without(previousNodes, nodeId);
            }
        }
        chrome.storage.sync.set({
            'nodesDoNotSave': previousNodes
        });
    }
});


let previousNodes = [];
chrome.storage.sync.get('nodesDoNotSave', function (items) {
    previousNodes = items.nodesDoNotSave || [];
    $nodeInput.value = $('#nodeId').tokenfield('setTokens', items.nodesDoNotSave) || '';
});


$('#save').button().click(save_options);
$('#reset').button().click(restore_options);
$defaultIgnores.tokenfield({
    autocomplete: {
        source: defaultDefaultIgnores,
        delay: 100
    },
    delimiter: ";",
    showAutocompleteOnFocus: true
});