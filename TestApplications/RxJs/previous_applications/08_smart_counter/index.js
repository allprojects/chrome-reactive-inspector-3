// utility functions
var takeUntilFunc = function takeUntilFunc(endRange, currentNumber) {
    return endRange > currentNumber ? function (val) {
        return val <= endRange;
    } : function (val) {
        return val >= endRange;
    };
};

var positiveOrNegative = function positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
};

var updateHTML = function updateHTML(id) {
    return function (val) {
        return document.getElementById(id).innerHTML = val;
    };
};
// display
var input = document.getElementById('range');
var updateButton = document.getElementById('update');

var subscription = function (currentNumber) {
    return Rx.Observable.fromEvent(updateButton, 'click').map(function (_) {
        return parseInt(input.value);
    }).switchMap(function (endRange) {
        return Rx.Observable.timer(0, 20).take(5).mapTo(positiveOrNegative(endRange, currentNumber)).startWith(currentNumber).scan(function (acc, curr) {
            return acc + curr;
        })
        // .delayWhen(//easing here)
            .takeWhile(takeUntilFunc(endRange, currentNumber));
    }).do(function (v) {
        return currentNumber = v;
    }).startWith(currentNumber).subscribe(updateHTML('display'));
}(0);