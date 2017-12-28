//$(function() {
$(document).ready(function () {

    var d_len = 10,
        w = 20,
        h = 80;

    var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, w]);

    var y = d3.scale.linear()
        .domain([0, 100])
        .rangeRound([0, h]);

    var chart = d3.select("body").append("svg")
        .attr("class", "chart")
        .attr("width", w * d_len - 1)
        .attr("height", h);

    chart.append("line")
        .attr("x1", 0)
        .attr("x2", w * d_len)
        .attr("y1", h - 0.5)
        .attr("y2", h - 0.5)
        .style("stroke", "#000");
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function redraw(data) {
        var rect = chart.selectAll("rect")
            .data(data, function (d) {
                return d.time;
            });

        rect.enter().insert("rect", "line")
            .attr("x", function (d, i) {
                return x(i + 1) - .5;
            })
            .attr("y", function (d) {
                return h - y(d.value) - .5;
            })
            .attr("width", w)
            .attr("height", function (d) {
                return y(d.value);
            })
            .attr("fill", getRandomColor())
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return x(i) - .5;
            });

        rect.transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return x(i) - .5;
            });

        rect.exit().transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return x(i - 1) - .5;
            })
            .remove();
    }

// The Bacon awesomeness

var initial = {
    time: 1297110663,
    value: 70
}

function walk(prev, rand) {
    return {
        time: prev.time + 1,
        value: ~~Math.max(10, Math.min(90, prev.value + 10 * (rand - .5)))
    };
}

function rand() {
    return new Bacon.Next(Math.random());
}
var intervalStream = Bacon.interval(15000);
var mapedToRandom = intervalStream.map(Math.random);
var ScanTo = mapedToRandom.scan(initial, walk);
var withSlidingWindow = ScanTo.slidingWindow(10)
withSlidingWindow.onValue(redraw);

}(jQuery));
