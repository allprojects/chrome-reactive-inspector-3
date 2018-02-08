var keyup = $("#title")
    .asEventStream("keyup")
    .debounce(100) /* don't call me more often than every 100ms*/
    .onValue(function (event, args) {
        $("#blog-url").html(parameterize(event.target.value));
    });

function parameterize(string) {
    var sep = "-";
    // Turn unwanted chars into the separator
    var safeStr = string.replace(/[^-\w]+/gi, sep);

    // No more than one of the separator in a row.
    safeStr = safeStr.replace(/-{2,}/gi, sep);

    // Remove leading/trailing separator.
    safeStr = safeStr.replace(/^-|-$/gi, "");

    return safeStr.toLowerCase();
}