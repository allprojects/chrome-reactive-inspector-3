// var threeItems = Rx.Observable.of(1,2,3);
// //when threeItems completes, return count of items emitted
// var exampleOne = threeItems.count();
// //output: 'Count from Example One: 3'
// var subscribe = exampleOne.subscribe(function(val) {
//     console.log('Count from Example One: '+val);
// });



var notifA = new Rx.Notification('A', 'A');
var notifB = new Rx.Notification('N', 'B');
var notifE = new Rx.Notification('E', null, new TypeError('x.toUpperCase is not a function'));

var letters = Rx.Observable.of('a', 'b', 'd');
var upperCase = letters.map(function(x) { x.toUpperCase() });
var materialized = upperCase.materialize();
materialized.subscribe(function(x) { console.log(x) });