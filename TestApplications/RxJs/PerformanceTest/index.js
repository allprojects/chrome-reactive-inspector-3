var intervalObservable = Rx.Observable.interval(5)
    .timestamp()
    .bufferCount(2, 1)
    .map(function (w) {
        return w[1].timestamp - w[0].timestamp;
    })
    .share();

var pauser = new Rx.Subject();
var pausable = pauser.switchMap(function (paused) {
    return paused ? Rx.Observable.never() : intervalObservable;
});
// generates approximately 1000 steps
setTimeout(function () {
    pauser.next(true);
}, 5000);

pausable.subscribe(function (value) {
    console.log("Value: " + value);
});
pauser.next(false);
