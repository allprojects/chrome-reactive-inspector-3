// Search Movies for a given term
function searchMovie(query) {
    return jQuery.get(
        '//api.themoviedb.org/3/search/movie?api_key=9eae05e667b4d5d9fbb75d27622347fe&query=' + query
    ).then(function (r) {
        return r.results;
    });
}
var $input = $('#textInput');
var $results = $('#results');

// Get all distinct key up events from the input
// and only fire if long enough and distinct
var keyup = Rx.Observable.fromEvent($input, 'keyup');
var mappedValue = keyup.map(function (e) {
    return e.target.value; // Project the text from the input
});
var filteredValue = mappedValue.filter(function (text) {
    return text.length > 2; // Only if the text is longer than 2 characters
});
var afterDebounce = filteredValue.debounceTime(750 /* Pause for 750ms */);
var distinctUntilChnaged = afterDebounce.distinctUntilChanged(); // Only if the value has changed
// Final Stream
var searcher = distinctUntilChnaged.switchMap(searchMovie);
// Subscribe to Final Stream
searcher.subscribe(
    function (data) {
        $results
            .empty()
            .append($.map(data, function (v) {
                return $('<li>').html('<img height="50" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2' + v.poster_path + '"> ' + v.title + " - " + v.release_date);
            }));
    },
    function (error) {
        $results
            .empty()
            .append($('<li>'))
            .text('Error:' + error);
    });