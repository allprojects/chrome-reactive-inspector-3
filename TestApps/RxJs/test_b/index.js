// function concatAll() {
//     var source = Rx.Observable.range(0, 3).map(function (x) {
//         return Rx.Observable.range(x, 3);
//     }).concatAll();
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function combineLatestFunc() {
//     /* Have staggering intervals */
//     var source1 = Rx.Observable.interval(100).map(function (i) {
//         return 'First: ' + i;
//     });
//
//     var source2 = Rx.Observable.interval(150).map(function (i) {
//         return 'Second: ' + i;
//     });
//
//     // Combine latest of source1 and source2 whenever either gives a value
//     // var source = Rx.Observable.combineLatest(
//     //     source1,
//     //     source2
//     //   ).take(4);
//
//     var source = source1.combineLatest(source2).take(4);
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', JSON.stringify(x));
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function loose() {
//     var sourceElement = document.getElementById("dom-event-source");
//     var elements = ["#dom-event-output .left p", "#dom-event-output .right p"].map(document.querySelector.bind(document));
//     var elementRect = sourceElement.getBoundingClientRect();
//
//     var observers = Rx.Observable.fromEvent(sourceElement, 'mousemove').map(function (e) {
//         return {
//             x: Math.floor(e.clientX - elementRect.left),
//             y: Math.floor(e.clientY - elementRect.top)
//         };
//     }).partition(function (pos) {
//         return pos.x < sourceElement.clientWidth / 2;
//     }
//
//     // elements.forEach((n, i, a) =>
//     //                  observers[i].subscribe(displayCoordinates.bind(displayCoordinates, n)));
//
//     );elements.forEach(function (n, i, a) {
//         observers[i].subscribe(displayCoordinates.bind(displayCoordinates, n));
//     });
//
//     function displayCoordinates(element, pos) {
//         element.textContent = '(x: ' + pos.x + ', y: ' + pos.y + ')';
//     }
// }
//
// function degToRad() {
//     var degreeInput = document.querySelector('input#degree');
//     var radianInput = document.querySelector('input#radian');
//
//     var degreeInputStream = Rx.Observable.fromEvent(degreeInput, 'input').map(function () {
//         return degreeInput.value;
//     }).filter(function (x) {
//         return x > 10;
//     }).map(function (degreeInputValue) {
//         return degreeInputValue * Math.PI / 180;
//     });
//
//     var radianInputStream = Rx.Observable.fromEvent(radianInput, 'input').map(function () {
//         return radianInput.value * 180 / Math.PI;
//     });
//
//     if (typeof collectVars !== 'undefined') {
//         var degreeInputValueInRadObserver = Rx.Observer.create(function (degreeInputValueInRad) {
//             radianInput.value = degreeInputValueInRad;
//         });
//         collectVars.set(degreeInputValueInRadObserver, "degreeInputValueInRadObserver");
//         degreeInputStream.subscribe(degreeInputValueInRadObserver);
//     } else {
//         degreeInputStream.subscribe(function (degreeInputValueInRad) {
//             radianInput.value = degreeInputValueInRad;
//         });
//     }
//
//     radianInputStream.subscribe(function (radianInputInDegree) {
//         degreeInput.value = radianInputInDegree;
//     });
// }
//
// function bufferTime() {
//     //Create an observable that emits a value every 500ms
//     var source = Rx.Observable.interval(500);
//     //After 2 seconds have passed, emit buffered values as an array
//     var example = source.bufferTime(2000).take(2).map(function (x) {
//         return 'This is an Array ' + x;
//     });
//     //Print values to console
//     //ex. output [0,1,2]...[3,4,5,6]
//     var subscribe = example.subscribe(function (val) {
//         return console.log('Buffered with Time:', val);
//     });
// }
//
// function concatMerge() {
//     var source1 = Rx.Observable.interval(100).map(function (val) {
//         return 'Source 1: ' + val;
//     }).take(5);
//
//     var source2 = Rx.Observable.interval(100).map(function (val) {
//         return 'Source 2: ' + val * 10;
//     }).take(5);
//
//     var concat_table = $('#concat-table-body'),
//         merge_table = $('#merge-table-body');
//
//     source1.concat(source2).subscribe(function (value) {
//         var row = document.createElement('tr');
//         row.innerHTML = value;
//         // Source 1 values populate BEFORE Source 2
//         concat_table.append(row);
//     });
// }
//
// function flatMapFunc() {
//     var source = Rx.Observable.interval(100).take(2).selectMany(function (x) {
//         return Rx.Observable.range(x, 2).map(function (x) {
//             return 'Calling map on ' + x;
//         });
//     });
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: ' + x);
//     }, function (err) {
//         console.log('Error: ' + err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function as() {
//     var delayedRange = Rx.Observable.range(0, 5).delay(100);
//     var subject = new Rx.Subject();
//
//     delayedRange.subscribe(subject);
//     subject.subscribe(function (x) {
//         return console.log(x);
//     }, function (error) {
//         return console.error(error);
//     }, function () {
//         return console.log('done');
//     });
// }
//
// function sampleTime() {
//     Rx.Observable.from([1, 2, 2, 3, 2, 4]).distinctUntilChanged().subscribe(function (x) {
//         return console.log(x);
//     }, function (error) {
//         return console.error(error);
//     }, function () {
//         return console.log('done');
//     });
// }
//
// function distinctCheck() {
//     Rx.Observable.from([1, 2, 2, 3]).distinct().subscribe(function (x) {
//         return console.log(x);
//     }, function (error) {
//         return console.error(error);
//     }, function () {
//         return console.log('done');
//     });
// }
//
//
// function checkFirst() {
//     Rx.Observable.range(0, 10).filter(function (x) {
//         return x % 2 === 0;
//     }).first(function (x, index, observable) {
//         return x > 5;
//     }).subscribe(function (x) {
//         return console.log(x);
//     }, function (error) {
//         return console.error(error);
//     }, function () {
//         return console.log('done');
//     });
// }
//
// function checkAgain() {
//     var ENDPOINT = 'users',
//         ROOT = 'https://jsonplaceholder.typicode.com';
//
//     var makeRequest = function makeRequest(path, item) {
//         return new Promise(function (resolve, reject) {
//             // Assumes jQuery
//             path ? path = '/' + path : path = '/';
//             item ? item = '/' + item : item = '/';
//             var url = ROOT + path + item;
//
//             $.getJSON(url).done(function (data) {
//                 resolve(data);
//             }).fail(function () {
//                 reject();
//             });
//         });
//     };
//
//     // BOILERPLATE
//     var PROMISE = makeRequest(ENDPOINT),
//         source = Rx.Observable.fromPromise(PROMISE).flatMap(Rx.Observable.from);
//
//     var myObserver = Rx.Observer.create(function (website) {
//         var row = document.createElement('tr');
//         row.innerHTML = website;
//
//         $('#email-table-body').append(row);
//         console.log(website);
//     });
//     collectVars.set(myObserver, "myObserver");
//
//     source.map(function (user) {
//         return user.website;
//     }).filter(function (website) {
//         return website.endsWith('net') || website.endsWith('org');
//     }).subscribe(myObserver);
// }
//
// function checkDebounce() {
//     var times = [{ value: 0, time: 100 }, { value: 1, time: 600 }, { value: 2, time: 400 }, { value: 3, time: 700 }, { value: 4, time: 200 }];
//
//     // Delay each item by time and project value;
//     var source = Rx.Observable.from(times).flatMap(function (item) {
//         return Rx.Observable.of(item.value).delay(item.time);
//     }).debounce(500 /* ms */);
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkTakeMap() {
//     var myObservable = Rx.Observable.range(0, 15).take(5).map(function (x) {
//         return x + 10;
//     }).filter(function (x) {
//         return x % 2 == 0;
//     });
//
//     var myObserver = Rx.Observer.create(function (x) {
//         console.log('PRINT: ' + x);
//     }
//
//     //collectVars.set(myObserver, "myObserver");
//     );var subscription = myObservable.subscribe(myObserver);
// }
//
// function activate() {
//     callJaredForsyth2();
// }
//
// function callSkipMapTake() {
//     var source = Rx.Observable.range(1, 10).skip(5).map(function (x) {
//         return x + 100;
//     }).take(3).map(function (x) {
//         return 'Marbles ' + x;
//     });
//
//     var skipMapTakeObserver = Rx.Observer.create(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     }
//
//     // collectVars.set(skipMapTakeObserver, "skipMapTakeObserver");
//     );var subscription = source.subscribe(skipMapTakeObserver);
// }
//
// function checkTakeWhile() {
//     var source = Rx.Observable.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//     source = source.takeWhile(function (x) {
//         return x < 7;
//     });
//
//     var takeWhileObserver = Rx.Observer.create(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     }
//
//     //collectVars.set(takeWhileObserver, "takeWhileObserver");
//     );
//
//     var subscription = source.subscribe(takeWhileObserver);
// }
//
// function checkReduce() {
//     var source = Rx.Observable.range(1, 4).reduce(function (acc, x, idx, source) {
//         return acc * x;
//     }, 2).map(function (x) {
//         return x + 7;
//     });
//
//     var reduceObserver = Rx.Observer.create(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     }
//
//     //collectVars.set(reduceObserver, "reduceObserver");
//     );var subscription = source.subscribe(reduceObserver);
// }
//
// function setProceedToTrue() {
//     proceed = true;
// }
//
// function waqasFunction2() {
//     var src = Rx.Observable.timer(0, 1000).timeInterval().map(function (x) {
//         return x.value + ': ' + x.interval;
//     }).take(5);
//
//     var sub = src.subscribe(function (val) {
//         return console.log('val is ', val);
//     });
// }
//
// function waqasFunction() {
//     var src = Rx.Observable.from([1, 2, 3, 4, 5]);
//     var ex = src.map(function (val) {
//         return val + 10;
//     });
//     var sub = ex.subscribe(function (val) {
//         return console.log('val is ', val);
//     });
// }
//
// function directDraw() {
//     setDOMInfo(objectsMap);
// }
//
// function draw() {
//     if (document.getElementsByName("newData")[0] != null) {
//         var newData = document.getElementsByName("newData")[document.getElementsByName("newData").length - 1].value;
//         var newInfo = {
//             total: 5,
//             mapOfObservables: newData
//         };
//         setDOMInfo(newInfo);
//     }
// }
//
// function checkColdAndHot() {
//     var obs = Rx.Observable.create(function (observer) {
//         return observer.next(Date.now());
//     }).publish
//     // .share()
//     ();obs.subscribe(function (dateValue) {
//         return console.log("1st subscriber: " + dateValue);
//     });
//     obs.subscribe(function (dateValue) {
//         return console.log("2nd subscriber: " + dateValue);
//     });
//
//     obs.connect();
// }
//
// function checkNextThing() {
//     var obs = Rx.Observable.interval(1000).take(5).publish().refCount();
//
//     obs.subscribe(function (v) {
//         return console.log("1st subscriber:" + v);
//     });
//     setTimeout(function () {
//         return obs.subscribe(function (v) {
//             return console.log("2nd subscriber:" + v);
//         });
//     }, 1100);
// }
//
// function checkSubjects() {
//     var source = Rx.Observable.interval(100).take(5);
//     var subject = new Rx.Subject();
//
//     var subSource = source.subscribe(subject);
//
//     var subjObserver1 = Rx.Observer.create(function (x) {
//         console.log('Value published to observer #1: ' + x);
//     }, function (e) {
//         console.log('onError: ' + e.message);
//     }, function () {
//         console.log('onCompleted');
//     });
//
//     var subSubject1 = subject.subscribe(subjObserver1);
//
//     var subjObserver2 = Rx.Observer.create(function (x) {
//         console.log('Value published to observer #2: ' + x);
//     }, function (e) {
//         console.log('onError: ' + e.message);
//     }, function () {
//         console.log('onCompleted');
//     });
//
//     var subSubject2 = subject.map(function (x) {
//         return x + 100;
//     }).subscribe(subjObserver2);
// }
//
// function checkOnErrorResumeNext() {
//     var source = Rx.Observable.onErrorResumeNext(Rx.Observable.just(42), Rx.Observable.throw(new Error()), Rx.Observable.just(56), Rx.Observable.throw(new Error()), Rx.Observable.just(78));
//
//     var subscription = source.subscribe(function (data) {
//         console.log(data);
//     });
// }
//
// function checkErrors() {
//     var observable = Rx.Observable.create(function (observer) {
//         observer.onNext("bhargava");
//         observer.onNext("siri");
//         observer.onNext("subba");
//         observer.onError(100);
//         observer.onCompleted();
//     });
//     observable = observable.map(function (x) {
//         return x + ' some string';
//     });
//
//     observable.subscribe(function (x) {
//         console.log('succeeded with ' + x);
//     }, function (x) {
//         console.log('This is the error ' + x);
//     }, function () {
//         console.log('completed');
//     });
// }
//
// function CreateObservable(element, eventType) {
//     return Rx.Observable.create(function (observer) {
//         function eventHandler(eventObj) {
//             observer.onNext(eventObj);
//         }
//         element.addEventListener(eventType, eventHandler);
//     });
// };
//
// function callFirstCase() {
//     var observable = CreateObservable(document.getElementById('button'), 'click').skip(2).take(2).map(function (evt) {
//         return "button was clicked";
//     });
//
//     var observer = Rx.Observer.create(function (evt) {
//         alert(evt);
//     }, function (err) {
//         alert('error');
//     }, function () {
//         alert('done');
//     });
//     observable.subscribe(observer);
//
//     //collectVars.set(observer, "observer");
// }
//
// function checkFromPromise() {
//     var promise1 = Promise.resolve(42);
//     var source1 = Rx.Observable.fromPromise(promise1);
//
//     var subscription1 = source1.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkCount() {
//     var source = Rx.Observable.range(0, 10).count();
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: ' + x.toString());
//     }, function (err) {
//         console.log('Error: ' + err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkCountPredicate() {
//     var source = Rx.Observable.range(0, 10).count(function (x) {
//         return x % 2 === 0;
//     });
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: ' + x.toString());
//     }, function (err) {
//         console.log('Error: ' + err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkDistinct() {
//     var source = Rx.Observable.of(42, 24, 42, 24).distinct();
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkDistinct2() {
//     var source = Rx.Observable.of({ value: 42 }, { value: 24 }, { value: 42 }, { value: 24 }).distinct(function (x) {
//         return x.value;
//     });
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkDistinctUntilChanged() {
//     /* Without key selector */
//     var source = Rx.Observable.of(42, 42, 24, 32).distinctUntilChanged();
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkEmpty() {
//     var source = Rx.Observable.empty();
//
//     var subscription = source.subscribe(function (x) {
//         console.log('Next: %s', x);
//     }, function (err) {
//         console.log('Error: %s', err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function checkSimpleFlatMap() {
//     var source = Rx.Observable.fromArray([1, 2]).selectMany(function (x) {
//         return Rx.Observable.range(x, 2);
//     }).map(function (x) {
//         return x + 100;
//     });
//
//     var subscription = source.subscribe(function (x) {
//         console.log('checkSimpleFlatMap Next: ' + x);
//     }, function (err) {
//         console.log('Error: ' + err);
//     }, function () {
//         console.log('Completed');
//     });
// }
//
// function callJaredForsyth2() {
//     var btn = $('#callFourthCase');
//     var clicks = CreateObservable(document.getElementById('callFourthCase'), 'click').map(function (x) {
//         return 10;
//     });
//
//     clicks = clicks.share();
//     clicks.subscribe(function (value) {
//         return console.log('clicked!');
//     });
//
//     var values = clicks.filter(function (x, idx, obs) {
//         return x % 2 === 0;
//     });
//     values = values.map(function (x) {
//         return x + x;
//     });
//     values = values.share();
//     var less1 = values.map(function (value) {
//         return value - 1;
//     });
//     var less1observer = Rx.Observer.create(function (value) {
//         console.log('i got a value', value);
//     }
//     //collectVars.set(less1observer, "less1observer");
//     );less1.subscribe(less1observer);
//     less1.subscribe(function (value) {
//         return console.log('clicked!');
//     });
//
//     var jfobserver = Rx.Observer.create(function (value) {
//         console.log('the original was', value);
//     }
//     //collectVars.set(jfobserver, "jfobserver");
//     );values
//     // .take(1)
//     // .map(x => x+10)
//     .subscribe(jfobserver );
// }
//


function concatAllA() {
    Rx.Observable.range(0, 3).map(function (x) {
        return Rx.Observable.range(x, 3);
    }).concatAll().subscribe(function (x) {
        return console.log(x);
    }, function (error) {
        return console.error(error);
    }, function () {
        return console.log('done');
    });
}

