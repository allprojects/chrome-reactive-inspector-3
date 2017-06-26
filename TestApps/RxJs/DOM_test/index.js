/**
 * Status Done
 */

var textInput = document.querySelector('#textInput');
var throttledInput = Rx.Observable.fromEvent(textInput, 'keyup')
    .map (function (x) {
        return x.currentTarget.value;
    })
    .filter( function (text) {
        return text.length > 2;
    })
    .debounceTime(500)
    .distinctUntilChanged();


throttledInput.subscribe();