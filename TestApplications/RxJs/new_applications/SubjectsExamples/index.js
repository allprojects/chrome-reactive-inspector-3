/**
 * In the example below, we have two Observers attached to a Subject, and we feed some values to the Subject:
 * Test case 1
 * Status Done
 */
/*
var subject = new Rx.Subject();

var x=subject.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});
var y = subject.subscribe({
    next: function next(v) {
        return console.log('observerB: ' + v);
    }
});

subject.next(1);
subject.next(2);



*/

/**
 * Since a Subject is an Observer, this also means you may provide a Subject as the argument
 * to the subscribe of any Observable, like the example below shows:
 * Test case 2
 * Status Done
 */
/*

var subject = new Rx.Subject();

subject.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});
subject.subscribe({
    next: function next(v) {
        return console.log('observerB: ' + v);
    }
});

var observable = Rx.Observable.from([1, 2, 3]);

observable.subscribe(subject);

 */

/**
 * Multicast support
 * Status Done
 */

/*
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});
multicasted.subscribe({
    next: function next(v) {
        return console.log('observerB: ' + v);
    }
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();
*/
/**
 * Multicast support with refCount
 * Status Done
 */

/*
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});

setTimeout(function () {
    console.log('observerB subscribed');
    subscription2 = refCounted.subscribe({
        next: function next(v) {
            return console.log('observerB: ' + v);
        }
    });
}, 600);

setTimeout(function () {
    console.log('observerA unsubscribed');
    subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(function () {
    console.log('observerB unsubscribed');
    subscription2.unsubscribe();
}, 2000);

  */

/**
 * BehaviorSubject
 * Status Done
 */
// /*
var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});

subject.next(1);
subject.next(2);

subject.subscribe({
    next: function next(v) {
        return console.log('observerB: ' + v);
    }
});

subject.next(3);
// */

/**
 * ReplaySubject
 * Status Done
 */
// Case 1
    /*
var subject = new Rx.ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
    next: function next(v) {
        return console.log('observerB: ' + v);
    }
});

subject.next(5);
*/

// Case 2
/*
 var subject = new Rx.ReplaySubject(100, 500);

subject.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});

var i = 1;
setInterval(function () {
    return subject.next(i++);
}, 200);

setTimeout(function () {
    subject.subscribe({
        next: function next(v) {
            return console.log('observerB: ' + v);
        }
    });
}, 1000);

*/

/**
 * AsyncSubject
 * Status Done
 */
/*
var subject = new Rx.AsyncSubject();

var x = subject.subscribe({
    next: function next(v) {
        return console.log('observerA: ' + v);
    }
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

var y = subject.subscribe({
    next: function next(v) {
        return console.log('observerB: ' + v);
    }
});

subject.next(5);
subject.complete();

  */
