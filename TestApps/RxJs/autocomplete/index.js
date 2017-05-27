// Search Wikipedia for a given term

/**
 * This test case is verified on May 25th
 * @param query
 */


function searchWikipedia(query) {
    return jQuery.get(
        '//api.themoviedb.org/3/search/movie?api_key=9eae05e667b4d5d9fbb75d27622347fe&query=' + query
    ).then(function (r) {
        return r.results;
    });
}


function main() {

    var $input = $('#textInput'),
        $results = $('#results');

// Get all distinct key up events from the input and only fire if long enough and distinct
    var keyup = Rx.Observable.fromEvent($input, 'keyup')
        .map(function (e) {
            return e.target.value; // Project the text from the input
        })
        .filter(function (text) {
            return text.length > 2; // Only if the text is longer than 2 characters
        })
        .debounceTime(750 /* Pause for 750ms */)
        .distinctUntilChanged(); // Only if the value has changed

    var searcher = keyup.switchMap(searchWikipedia);

    searcher.subscribe(
        function (data) {
            $results
                .empty()
                .append($.map(data[1], function (v) {
                    return $('<li>').text(v);
                }));
        },
        function (error) {
            $results
                .empty()
                .append($('<li>'))
                .text('Error:' + error);
        });


}

main();


