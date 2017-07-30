// Saves options to chrome.storage
function save_options() {
    chrome.storage.sync.set({
        thresholdValue: $("#threshold").val()
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}
var thresholdValue = '';
function restore_options() {
    chrome.storage.sync.get({
        thresholdValue: ''
    }, function(items) {
        $("#threshold").val(items.thresholdValue);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);

$('#save').button().click(save_options);
$('#reset').button().click(restore_options);