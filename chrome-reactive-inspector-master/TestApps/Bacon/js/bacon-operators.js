// Original
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Bacon
$("#runBaconFilter").click(function() {
    var baconSourceStream = Bacon.sequentially(1000, arr);
    var baconFilteredEvenStream = baconSourceStream.filter(function(x) {
        return x % 2 == 0;
    });
});

// Bacon
$("#runBaconFold").click(function() {
    var baconStream = Bacon.sequentially(500, arr);
   var baconFoldStream =  baconStream.fold(0, function(x, acc) {
        return x + acc;
    });
    baconFoldStream.onValue(function(val) {
        $("#baconFold").text(val);
    });
});

$("#runBaconScan").click(function() {
    var baconStream = Bacon.sequentially(500, arr);
   var baconScanStream = baconStream.scan(0, function(x, acc) {
        return x + acc;
    });
    baconScanStream.onValue(function(val) {
        $("#baconScan").text(val);
    });
});

var arr1 = [1, 2, 3, 4, 5];
var arr2 = ['a', 'b', 'c', 'd', 'e'];

$("#runBaconZip").click(function() {
    var baconStream1 = Bacon.sequentially(500, arr1);
    var baconStream2 = Bacon.sequentially(500, arr2);
    var baconStreamZip = baconStream1.zip(baconStream2);
    baconStreamZip.onValue(function(val) {
        $("#baconZip").append(val.join(', ') + ', ');
    });
});