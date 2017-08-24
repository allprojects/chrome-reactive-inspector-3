// Load the previous options
document.addEventListener('DOMContentLoaded', restore_options);

// Saves options to chrome.storage
function save_options() {
    chrome.storage.sync.set({
        thresholdValue: $("#threshold").val()
    }, function() {
        dataSaved();
    });
    chrome.storage.sync.set({
        printAllValue: $('#printAllValues').prop('checked')
    }, function() {
        dataSaved();
    });
}

var thresholdValue = '';
function restore_options() {
    chrome.storage.sync.get({
        thresholdValue: ''
    }, function(items) {
        $("#threshold").val(items.thresholdValue);
    });
    chrome.storage.sync.get({
        printAllValue: ''
    }, function(items) {
        $('#printAllValues').prop('checked', items.printAllValue);
    });
    chrome.storage.sync.set({
        'nodesDoNotSave': []
    });
}

function dataSaved() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
        status.textContent = '';
    }, 750);
}

var nodeInput = $('#nodeId');
jQuery( document ).ready(function( $ ) {

    nodeInput.tokenfield();
    nodeInput
        .on('tokenfield:createtoken', function (e) {
            if(isNaN(e.attrs.value))
                e.preventDefault();
            var existingTokens = $(this).tokenfield('getTokens');
            $.each(existingTokens, function(index, token) {
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


var previousNodes = [];
chrome.storage.sync.get('nodesDoNotSave', function (items) {
    previousNodes = items.nodesDoNotSave || [];
    nodeInput.value = $('#nodeId').tokenfield('setTokens', items.nodesDoNotSave) || '';
});


$('#save').button().click(save_options);
$('#reset').button().click(restore_options);
