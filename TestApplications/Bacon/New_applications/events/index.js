// asEventStream
$("#click").asEventStream("click").onValue(function () {
    $("#output").text(Math.random(1));
});

$("#text").asEventStream("keyup").onValue(function () {
    $("#output").text($("#text").val());
});

// fromArray
$("#runArray").click(function () {
    $("#output").text('');
    var arr = [1, 2, 3, 4, 5];
    Bacon.fromArray(arr).onValue(function (val) {
        $("#output").append(val + ', ');
    });
});

// fromCallback
$("#runCallback").click(function () {
    Bacon.fromCallback(function (callback) {
        setTimeout(function () {
            callback("Bacon!");
        }, 1000);
    }).onValue(function (val) {
        $("#output").text(val);
    });
});

// fromPromise
$("#runPromise").click(function () {
    function doSearch(query) {
        var url = 'http://en.wikipedia.org/w/api.php?action=opensearch'
            + '&format=json'
            + '&search=' + encodeURI(query);
        return Bacon.fromPromise($.ajax({url: url, dataType: "jsonp"}));
    }

    doSearch('Aardvark').onValue(function (val) {
        $("#output").html(val[1].join('<br />'));
    });
});
alert("please open the CRI now");//#CRI-Test#