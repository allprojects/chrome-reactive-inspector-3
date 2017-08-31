
    var canvas, drawLines, g, mouseDown, mouseMoves, mouseUp, pointsAreEqual, rand, resizeCanvas, toCoords;

    rand = function() {
        return Math.floor(Math.random() * 0xFF);
    };

    canvas = document.getElementById("canvas");

    g = canvas.getContext("2d");

    resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        g.rect(0, 0, canvas.width, canvas.height);
        return g.fillStyle = "rgb(0,0,0)";
    };

    $(window).asEventStream('resize').onValue(resizeCanvas);

    resizeCanvas();

    toCoords = function(e) {
        return [e.clientX, e.clientY];
    };

    pointsAreEqual = function(a, b) {
        return a && b && a.clientX === b.clientX && a.clientY === b.clientY;
    };

    mouseDown = $(canvas).asEventStream("mousedown").doAction(".preventDefault");

    mouseUp = $(document).asEventStream("mouseup").doAction(".preventDefault");

    mouseMoves = $(document).asEventStream("mousemove").skipDuplicates(pointsAreEqual).map(toCoords);




    drawLines = mouseDown.flatMap(function() {
        console.log("sdf");
        return mouseMoves.takeUntil(mouseUp);
    });


drawLines.onValue(function (a) {
    console.log(a);
    var end, start;
    start = a[0], end = a[1];
    g.beginPath();
    g.lineWidth = 10 + Math.floor(20 * Math.random());
    g.strokeStyle = "rgb(" + (rand()) + ", " + (rand()) + ", " + (rand()) + ")";
    g.moveTo(start, end);
    g.lineTo(start+2, end+2);
    return g.stroke();
});


