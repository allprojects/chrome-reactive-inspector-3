function queryMovie(query) {
    return jQuery.get(
        '//api.themoviedb.org/3/search/movie?api_key=9eae05e667b4d5d9fbb75d27622347fe&query=' + query
    ).then(function (r) {
        return r.results;
    });
}

function showMovie(result) {
    var link = $('<a/>')
        .attr('href', 'https://www.themoviedb.org/movie/' + result.id)
        .text(result.title);
    return $('<div/>').append(link).css('padding', '0.1em 0');
}

function movieSearch(query) {
    if (query.length < 3)
    // show no results for queries of length &lt; 3
        return singleValStream =  Bacon.once([]);
    return eventStreamFromPromise =  Bacon.fromPromise(queryMovie(query));
}

var textAsEventStream  = $('#input')
// stream of keydown events from text-field
    .asEventStream('keydown');

    // limit the rate of queries
var debounsedStream =     textAsEventStream.debounce(300);
    // get input text value from each event
var mapDebouncedStreamToVal =    debounsedStream.map(function (event) {
        return event.target.value;
    })
    // Ignore duplicate events with same text
    .skipDuplicates();


// React to text changes by doing a lookup with
// api function movieSearch, creating a new observable
// with the results.
//
// Make sure to always react to the latest, value even
// if responses from the server arrives out of order

var suggestions =
    mapDebouncedStreamToVal.flatMapLatest(movieSearch);

// Display "Searching..." when waiting for the results

mapDebouncedStreamToVal.awaiting(suggestions).onValue(function (x) {
    if (x) $('#results').html('Searching...');
});

// Render suggestion results to DOM

suggestions.onValue(function (results) {
    $('#results').html($.map(results, showMovie));
});