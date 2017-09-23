 function activate() {
            alert("test");
        }

window.onload = function () {
    document.getElementById('runbtn').onclick = activate;
}

var timer = Rx.Observable.interval(1000).take(4);
var sequence = Rx.Observable.range(1, 10);
var result = Rx.Observable.concat(timer, sequence);
result.subscribe(function (x) {
    console.log('Next: %s', x);
});