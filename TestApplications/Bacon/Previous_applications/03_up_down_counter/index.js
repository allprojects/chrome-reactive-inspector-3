var up = $('#up').asEventStream('click');
var down = $('#down').asEventStream('click');
var upClick = up.map(1);
var downClick = down.map(-1);
var counter = upClick.merge(downClick).scan(0, function (x, y) {
    return x + y;
});
counter.assign($('#counter'), 'text');