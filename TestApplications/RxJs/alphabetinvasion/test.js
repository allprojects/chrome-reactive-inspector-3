// const { Observable, Subject, ReplaySubject } = Rx;

// const replay = new Rx.ReplaySubject();
//
// const observable = Rx.Observable.create(observer => {
//     replay.subscribe(observer);
// });

// let source = Rx.Observable.range(1, 5);
//
// let mySubject = new Rx.Subject();
//
// mySubject.subscribe(source)


var subject = new Rx.Subject();

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

subject.onNext(42);

// => Next: 42

subject.onNext(56);

// => Next: 56

subject.onCompleted();

// mySubject.onNext(1);
// mySubject.onNext(2);
// mySubject.onNext(3);
//
// mySubject.subscribe(x => console.log(x));
//
// mySubject.onNext(4);
// mySubject.onNext(5);