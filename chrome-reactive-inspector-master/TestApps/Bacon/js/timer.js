  var timer = Bacon.fromBinder(function(sink) {
    var id = setInterval(function() {
        sink(new Date().getTime())
    }, 1000)
    return function() {
        clearInterval(id)
    }
});
var timer2TakeFive = timer.take(5);