var optionKeys = {
    thresholdValue: 'thresholdValue',
    printAllValue: 'printAllValue',
    developerMode: 'developerMode',
    criconfigincludes: 'criconfigincludes'
};

var optionsAccess = (function () {
    return {
        $getOption: function $getOption(optionKey) {
            return $.when(chrome.storage.sync.get(optionKey, function (items) {
                return items[optionKey];
            }));
        }
    };
})();

optionsAccess.$getOption();



