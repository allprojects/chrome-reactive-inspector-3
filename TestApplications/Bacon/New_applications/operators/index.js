// Array data source
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Filter
$("#runBaconFilter").click(function () {
    var baconSourceStream = Bacon.sequentially(1000, arr);
    var baconFilteredEvenStream = baconSourceStream.filter(function (x) {
        return x % 2 == 0;
    });
    baconFilteredEvenStream.onValue(function (val) {
        $("#baconFilter").text(val);
    });

});
// Sum of array elements with Fold
$("#runBaconFold").click(function () {
    var baconStream = Bacon.sequentially(500, arr);
    var baconFoldStream = baconStream.fold(0, function (x, acc) {
        return x + acc;
    });
    baconFoldStream.onValue(function (val) {
        $("#baconFold").text(val);
    });
});
// Sum of array elements with Scan
$("#runBaconScan").click(function () {
    var baconStream = Bacon.sequentially(500, arr);
    var baconScanStream = baconStream.scan(0, function (x, acc) {
        return x + acc;
    });
    baconScanStream.onValue(function (val) {
        $("#baconScan").text(val);
    });
});