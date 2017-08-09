var $inputSearch = $('#inpt_search');
var $gname = $('#gname');
var $grepos = $('#grepos');
var $gemail = $('#gemail');

$inputSearch.on('focus', function () {
    $(this).parent('label').addClass('active');
});
$inputSearch.on('blur', function () {
    if ($(this).val().length == 0) $(this).parent('label').removeClass('active');
});

// RxJS 5 DEMO
var uri1 = 'https://api.github.com/users/';

function getUser(username) {
    console.log(username);
    return $.ajax({
        url: uri1 + username,
        dataType: 'jsonp'
    }).promise();
}

// sample 1
// const sourceInput$ = Rx.Observable.fromEvent($inputSearch, 'keyup')
//   .debounceTime(500)
//   .filter(event => event.target.value.length > 2)
//   .map(e => e.target.value)
//   .switchMap(e => {
//     return Rx.Observable.fromPromise(getUser(e));
//   });

// sample 2
var sourceInput$ = Rx.Observable.fromEvent($inputSearch, 'input').map(function (e) {
    return e.target.value;
}).filter(function (value) {
    return value.length > 2;
}).debounceTime(500).distinctUntilChanged //濾掉重複
().switchMap(function (e) {
    return Rx.Observable.fromPromise(getUser(e));
});

sourceInput$.subscribe(function (x) {
    console.log(x.data);
    $gname.text(x.data.name);
    $grepos.text(x.data.html_url);
    $gemail.text(x.data.bio);
});