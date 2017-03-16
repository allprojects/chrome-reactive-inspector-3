var textInput = document.querySelector('#textInput');
var throttledInput = Rx.DOM.keyup(textInput)
    .pluck('target','value')
    .filter( function (text) {
        return text.length > 2;
    })
    .debounce(500)
    .distinctUntilChanged();