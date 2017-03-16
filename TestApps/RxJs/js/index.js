(function () {
    function main() {



        var mouseclick = Rx.Observable.fromEvent(document, 'click').map(function (e) {
                return 'clientX: ' + e.clientX + ', clientY: ' + e.clientY;
            });
        mouseclick.subscribe(function (text) {
            console.log(text);
        });

    }

    window.onload = main();
}());