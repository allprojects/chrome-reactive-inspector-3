function show(x) {
    console.log(x)
}
function nonEmpty(x) {
    return x.length > 0
}
function setVisibility(element, visible) {
    element.toggle(visible)
}
var usernameEventStream = $("#username input").asEventStream("keyup")
    .map(function (event) {
    var typedValue = $(event.target).val();
    // Umlaut Characters are not allowed
    if ((typedValue.indexOf('ä') !== -1) || (typedValue.indexOf('ö') !== -1) || (typedValue.indexOf('ü') !== -1)) {
        return 'false';
    } else {
        return typedValue;
    }
});
var username = usernameEventStream.toProperty("");
var fullnameEventStream = $("#fullname input").asEventStream("keyup")
    .map(function (event) {
    return $(event.target).val()
});
var fullname = fullnameEventStream.toProperty("");
var usernameEntered = username.map(nonEmpty)
fullnameEntered = fullname.map(nonEmpty)
function toResultStream(request) {
    return Bacon.fromPromise($.ajax(request))
}
availabilityRequest = username.changes()
    .map(function (user) {
    return {url: "/server-validation.php?uname=" + user}
});
availabilityResponse = availabilityRequest.flatMap(toResultStream)
usernameAvailable = availabilityResponse.toProperty(true)
usernameAvailable.not().onValue(function (show) {
    setVisibility($("#username-unavailable"), show);
})
var buttonEnabled = usernameEntered.and(fullnameEntered).and(usernameAvailable)
//var buttonEnabled = fullnameEntered.and(usernameAvailable)
buttonEnabled.onValue(function (enabled) {
    $("#register button").attr("disabled", !enabled)
})