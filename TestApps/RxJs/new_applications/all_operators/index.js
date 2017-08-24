/**
 * Test case 2
 * verify Dependency graph when observable is created and subscribed without operators.
 * Status - Done
 */
// /*
var observable = Rx.Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});
observable.subscribe(
    function (value) {
        console.log('Next: ' + value);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    }
);

// */

/**
 * Test case 3
 * Status - Done
 */

/*

var observer = {
    next: function (x) {
        console.log('Next: ' + x);
    },
    error: function (err) {
        console.log('Error: ' + err);
    },
    complete: function () {
        console.log('Completed');
    },
};
var source1 = Rx.Observable.range(0, 3);
//
var subscription = source1.subscribe(observer);
// var observable = Rx.Observable.create(function(source) {
//     source.next(Math.random());
// });
//
// observable.subscribe(function(v) {
//     console.log('consumer A: ' + v);
// })
// observable.subscribe(function(v) {
//     console.log('consumer B: ' + v);
// })
 */

/**
 * Test case 4
 * Status - Done
 */
/*
var evenNumbers = Rx.Observable.create(function(observer) {
        var value = 0;
        var interval = setInterval(function(){
            if(value % 2 === 0){
                observer.next(value);
            }
            value++;
        }, 1000);

        return function(){clearInterval(interval)};
    });
//output: 0...2...4...6...8
var custom_subscribe = evenNumbers.subscribe(function(val) {console.log(val)});
//unsubscribe after 10 seconds
setTimeout(function(){
    custom_subscribe.unsubscribe();
}, 10000);

*/

/**
 * Support for from Observable
 * Test case 5
 */
/*
var arraySource = Rx.Observable.from([1,2,3,4,5])
    .map(function (x) {
        if(x > 2){
            return x;
        }
    });
//output: 1,2,3,4,5
var subscribe = arraySource.subscribe(function(val){ return val });
*/

/**
 * Support for of Observable
 * Test case 6
 * status Done
 */
/*
var numbers = Rx.Observable.of(10, 20, 30);
var letters = Rx.Observable.of('a', 'b', 'c');
// var interval = Rx.Observable.interval(1000);
var result = numbers.concat(letters);
// setTimeout(function(){
    result.subscribe(function(x) {console.log(x)});
// }, 10000);
*/

/**
 * Support for buffer operator
 * Test case 7
 * Status Done
 */
/*
 var myInterval = Rx.Observable.interval(1000);
 //Create an observable that emits every time document is clicked
 var bufferBy = Rx.Observable.fromEvent(document, 'click');

 // Collect all values emitted by our interval observable until we click document.
// This will cause the bufferBy Observable to emit a value,
// satisfying the buffer. Pass us all collected values since last buffer as an array.

var myBufferedInterval = myInterval.buffer(bufferBy);
//Print values to console
//ex. output: [1,2,3] ... [4,5,6,7,8]
var subscribe = myBufferedInterval.subscribe(function(val){ console.log(' Buffered Values:', val)});
 */

/**
 * Support for bufferCount operator
 * Test case 8
 * Status Done
 */
/*
var myInterval = Rx.Observable.interval(1000);
//After three values are emitted, pass on as an array of buffered values
var bufferThree = myInterval.bufferCount(3);
//Print values to console
//ex. output [0,1,2]...[3,4,5]
var subscribe = bufferThree.subscribe(function(val){ console.log(' Buffered Values:', val)});
*/

/**
 * Support for bufferTime operator
 * Test case 9
 * Status Done
 */
/*
var myInterval = Rx.Observable.interval(500);
//After 2 seconds have passed, emit buffered values as an array
var bufferTime = myInterval.bufferTime(2000);
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
var subscribe = bufferTime.subscribe(function(val){console.log('Buffered with Time:', val)});
*/

/**
 * Support for bufferToggle operator
 * Test case 10
 * Status Done
 */
/*
var sourceInterval = Rx.Observable.interval(1000);
//start first buffer after 5s, and every 5s after
var startInterval = Rx.Observable.interval(5000);
//emit value after 3s, closing corresponding buffer
var closingInterval = function(val) {
    console.log('Value ' +val +' emitted, starting buffer! Closing in 3s!')
    return Rx.Observable.interval(3000);
}
//every 5s a new buffer will start, collecting emitted values for 3s then emitting buffered values
var bufferToggleInterval = sourceInterval.bufferToggle(startInterval, closingInterval);
//log to console
//ex. emitted buffers [4,5,6]...[9,10,11]
var subscribe = bufferToggleInterval.subscribe(function(val){console.log('Emitted Buffer:', val)});

 */

/**
 * BufferWhen Operator
 * Test case 11
 * Status Done
 */

/*
 //  emit value every 1 second
 var oneSecondInterval = Rx.Observable.interval(1000);
 //return an observable that emits value every 5 seconds
 var fiveSecondInterval = function() {return Rx.Observable.interval(5000)};
 //every five seconds, emit buffered values
 var bufferWhenExample = oneSecondInterval.bufferWhen(fiveSecondInterval);
 //log values
 //ex. output: [0,1,2,3]...[4,5,6,7,8]
 var subscribe = bufferWhenExample.subscribe(function(val){ console.log('Emitted Buffer: ', val)});

 */
/*
var clicks = Rx.Observable.fromEvent(document, 'click');
var buffered = clicks.bufferWhen(function () {
        return Rx.Observable.interval(1000 + Math.random() * 4000);
    });
buffered.subscribe(function (x) {
    return console.log(x);
});

 */

/**
 * CombineAll Operator
 * Test case 12
 * Status Done
 */

/*
// Ex -1
    //emit after five seconds then complete
var fiveSecondTimer = Rx.Observable.timer(5000);
//once timer (outer observable) fires and completes, latest emitted values from inner observables will be output, in this case there is a single value
var example = fiveSecondTimer.mapTo(Rx.Observable.of('Hello', 'World'));
var combined = example.combineAll();
//ex output: ["Hello"]...["World"]
var subscribe = combined.subscribe(function (val) {
    return console.log('Values from inner observable:', val);
});
*/

/*
    // Ex-2
    //combineAll also takes a projection function that receives emitted values
var fiveSecondTimer = Rx.Observable.timer(5000);
var example = fiveSecondTimer.mapTo(Rx.Observable.of('Hello', 'Goodbye'));
var combined = example.combineAll(function (val) {
    return val + ' Friend!';
});
//ex output: "Hello Friend!"..."Goodbye Friend!"
var subscribeProjected = combined.subscribe(function (val) {
    return console.log('Values Using Projection:', val);
});

*/

/**
 * CombineLatest
 * Test case 13
 * Status Done
 */

/*


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//timerOne emits first value at 1s, then once every 4s
var timerOne = Rx.Observable.timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
var timerTwo = Rx.Observable.timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
var timerThree = Rx.Observable.timer(3000, 4000);

//when one timer emits, emit the latest values from each timer as an array
var combined = Rx.Observable.combineLatest(timerOne, timerTwo, timerThree);

var subscribe = combined.subscribe(function (latestValues) {
    //grab latest emitted values for timers one, two, and three
    var _latestValues = _slicedToArray(latestValues, 3),
        timerValOne = _latestValues[0],
        timerValTwo = _latestValues[1],
        timerValThree = _latestValues[2];
     // Example:
     // timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
     // timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
     // timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1


    console.log("Timer One Latest: " + timerValOne + ", \n     Timer Two Latest: " + timerValTwo + ", \n     Timer Three Latest: " + timerValThree);
});

*/



/**
 * concat operator
 * Test case 14
 * Status
 */

// /*

/**
 *  Status
 */
/*
    // emits 1,2,3
 var sourceOne = Rx.Observable.of(1, 2, 3);
 //emits 4,5,6
 var sourceTwo = Rx.Observable.of(4, 5, 6);
 //emit values from sourceOne, when complete, subscribe to sourceTwo
 var concatSource = sourceOne.concat(sourceTwo);
 //output: 1,2,3,4,5,6
 var subscribe = concatSource.subscribe(function (val) {
 return console.log('Example 1: Basic concat:', val);
 });

 //delay 3 seconds then emit
 var delayedSourceOne = sourceOne.delay(3000);
 //sourceTwo waits on sourceOne to complete before subscribing
 var concatDelayedSource = delayedSourceOne.concat(sourceTwo);
 //output: 1,2,3,4,5,6
 var subscribeDelayed = concatDelayedSource.subscribe(function (val) {
 return console.log('Example 2: Delayed source one:', val);
 });
*/

/**
 * Status Done
 */
/*

//when sourceOne never completes, the subsequent observables never run
var sourceOneNeverComplete = Rx.Observable.concat(Rx.Observable.interval(1000), Rx.Observable.of('This', 'Never', 'Runs'))
//for logging clarity
.delay(5000);
//outputs: 1,2,3,4....
var subscribeNeverComplete = sourceOneNeverComplete.subscribe(function (val) {
return console.log('Example 3: Source one never completes, second observable never runs:', val);
});
 */

/**
 * Support for ScalarObservable
 * Test case 15
 * status Done
 */
/*
  var a$ = Rx.Observable.of(1, 2);
  var b$ = Rx.Observable.of(10);

  var c$ = Rx.Observable.combineLatest(a$, b$, function (a, b) {
      return a + b;
  });

  c$.subscribe(function (c) {
      return console.log(c);
  });
*/
/**
 *  concatAll
 *  Test case 16
 *  Status Done
 */

/*
//emit a value every 2 seconds
var sourceOne = Rx.Observable.interval(15000);
var example = sourceOne
//for demonstration, add 10 to and return as observable
    .map(function (val) {
            return Rx.Observable.of(val + 10);
        }
        //merge values from inner observable
    ).concatAll();
//output: 'Example with Basic Observable 0', 'Example with Basic Observable 2'...
var subscribe = example.subscribe(function (val) {
    return console.log('Example with Basic Observable:', val);
});

//create and resolve basic promise
var samplePromise = function samplePromise(val) {
    return new Promise(function (resolve) {
        return resolve(val);
    });
};
var exampleTwo = sourceOne.map(function (val) {
        return samplePromise(val);
    }
    //merge values from resolved promise
).concatAll();
//output: 'Example with Promise 0', 'Example with Promise 1'...
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log('Example with Promise:', val);
});
// */

/**
 * ConcatMap
 * Test case 17
 * Status Done
 */

/*
//emit 'Hello' and 'Goodbye'
var source = Rx.Observable.of('Hello', 'Goodbye');
// map value from source into inner observable, when complete emit result and move to next
var exampleOne = source.concatMap(function (val) {
    return Rx.Observable.of(val + ' World!');
});
//output: 'Example One: 'Hello World', Example One: 'Goodbye World'
var subscribe = exampleOne.subscribe(function (val) {
    return console.log('Example One:', val);
});

//example with promise
var examplePromise = function examplePromise(val) {
    return new Promise(function (resolve) {
        return resolve(val + ' World!');
    });
};
// map value from source into inner observable, when complete emit result and move to next
var exampleTwo = source.concatMap(function (val) {
    return examplePromise(val);
}
//output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
);
var subscribeTwo = exampleTwo
//delay for logging clarity
    .delay(1000).subscribe(function (val) {
        return console.log('Example w/ Promise:', val);
    });

 */

/**
 * ConcatMapTo
 * Test case 18
 * Status Done
 */
/*
//emit value every 2 seconds
var interval = Rx.Observable.interval(2000);
var message = Rx.Observable.of('Second(s) elapsed!');
//when interval emits, subscribe to message until complete, merge for result
var example = interval.concatMapTo(message, function (time, msg) {
    return time + ' ' + msg;
});
//output: '0 Second(s) elapsed', '1 Second(s) elapsed'
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});

//emit value every second for 5 seconds
var basicTimer = Rx.Observable.interval(1000).take(5);

//basicTimer will complete after 5 seconds, emitting 0,1,2,3,4
var exampleTwo = interval.concatMapTo(basicTimer, function (firstInterval, secondInterval) {
    return firstInterval + ' ' + secondInterval;
});

//  output: 0 0
//  0 1
//  0 2
//  0 3
//  0 4
//  1 0
//  1 1
//  continued...

var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});

*/

/**
 * Count
 * Test case 19
 * Status Done
 */

/*
// Example 1
//emit 1,2,3 then complete
var threeItems = Rx.Observable.of(1, 2, 3);
//when threeItems completes, return count of items emitted
var exampleOne = threeItems.count();
//output: 'Count from Example One: 3'
var subscribe = exampleOne.subscribe(function (val) {
    return console.log("Count from Example One: " + val);
});

// Example 2
//count of basic array
// var myArray = [1, 2, 3, 4, 5];
// var myObsArray = Rx.Observable.from(myArray);
// var exampleTwo = myObsArray.count();
// //output: 'Count of Basic Array: 5'
// var subscribeTwo = exampleTwo.subscribe(function (val) {
//     return console.log("Count of Basic Array: " + val);
// });
//
// //count emitted items from source that satisfy predicate expression
// var evensCount = myObsArray.count(function (val) {
//     return val % 2 === 0;
// });
// //output: 'Count of Even Numbers: 2'
// var subscribeThree = evensCount.subscribe(function (val) {
//     return console.log("Count of Even Numbers: " + val);
// });

*/

/**
 * debounce
 * Test case 20
 * Status Done
 */

/*
//emit four strings
var example = Rx.Observable.of('WAIT', 'ONE', 'SECOND', 'Last will display');

// Only emit values after a second has passed between the last emission,
// throw away all other values

var debouncedExample = example.debounce(function () {
    return Rx.Observable.timer(1000);
});
//In this example, all values but the last will be omitted
// output: 'Last will display'
var subscribe = debouncedExample.subscribe(function (val) {
    return console.log(val);
});

//emit value every 1 second, ex. 0...1...2
// var interval = Rx.Observable.interval(1000);
// //raise the debounce time by 200ms each second
// var debouncedInterval = interval.debounce(function (val) {
//     return Rx.Observable.timer(val * 200);
// }
//     // After 5 seconds, debounce time will be greater than interval time,
//     //all future values will be thrown away
//     // output: 0...1...2...3...4......(debounce time over 1s, no values emitted)
// );
//
// var subscribeTwo = debouncedInterval.subscribe(function (val) {
//     return console.log('Example Two: ' + val);
// });

*/

/**
 * debounceTime
 * Test case 21
 * Status Done
 */
/*
var input = document.getElementById('toCount');

//for every keyup, map to current input value
var example = Rx.Observable.fromEvent(input, 'keyup').map(function (i) {
    return i.currentTarget.value;
});

//wait .5s between keyups to emit current value
//throw away all other values
var debouncedInput = example.debounceTime(500);

//log values
var subscribe = debouncedInput.subscribe(function (val) {
    console.log('Debounced Input: ' + val);
});

*/

/**
 * defaultIfEmpty
 * Test case 22
 * Status Done
 */

/*
//   var empty = Rx.Observable.of();
//   //emit 'Observable.of() Empty!' when empty, else any values from source
//   var exampleOne = empty.defaultIfEmpty('Observable.of() Empty!');
//   //output: 'Observable.of() Empty!'
//   var subscribe = exampleOne.subscribe(function (val) {
//       return console.log(val);
//   });

 //empty observable
 var emptyTwo = Rx.Observable.empty();
 //emit 'Observable.empty()!' when empty, else any values from source
 var exampleTwo = emptyTwo.defaultIfEmpty('Observable.empty()!');
 //output: 'Observable.empty()!'
 var subscribe = exampleTwo.subscribe(function (val) {
 return console.log(val);
 });
  */

/**
 * delay
 * Test case 23
 * Status Done
 */

/*
//emit one item
var example = Rx.Observable.of(null);
//delay output of each by an extra second
var message = Rx.Observable.merge(example.mapTo('Hello'), example.mapTo('World!').delay(1000), example.mapTo('Goodbye').delay(2000), example.mapTo('World!').delay(3000));
//output: 'Hello'...'World!'...'Goodbye'...'World!'
var subscribe = message.subscribe(function (val) {
    return console.log(val);
});
*/

/**
 * delayWhen
 * Test case 23
 * Status Done
 */

/*
//emit value every second
var message = Rx.Observable.interval(1000);
//emit value after five seconds
var delayForFiveSeconds = function delayForFiveSeconds() {
    return Rx.Observable.timer(5000);
};
//after 5 seconds, start emitting delayed interval values
var delayWhenExample = message.delayWhen(delayForFiveSeconds);
//log values, delayed for 5 seconds
//ex. output: 5s....1...2...3
var subscribe = delayWhenExample.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * dematerialize
 * Test case 24
 * Status Done
 */

/*
//emit next and error notifications
var source = Rx.Observable.from([Rx.Notification.createNext('SUCCESS!'), Rx.Notification.createError('ERROR!')]
  //turn notification objects into notification values
    ).dematerialize();

//output: 'NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
var subscription = source.subscribe({
    next: function next(val) {
        return console.log('NEXT VALUE: ' + val);
    },
    error: function error(val) {
        return console.log('ERROR VALUE: ' + val);
    }
});
*/

/**
 * do
 * Test case 25
 * Status Done
 */

/*
var source = Rx.Observable.of(1, 2, 3, 4, 5);
//transparently log values from source with 'do'
var example = source.do(function (val) {
    return console.log("BEFORE MAP: " + val);
}).map(function (val) {
    return val + 10;
}).do(function (val) {
    return console.log("AFTER MAP: " + val);
});
//'do' does not transform values
//output: 11...12...13...14...15
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * every
 * Test case 26
 * Status Done
 */

/*

//emit 5 values
var source = Rx.Observable.of(1, 2, 3, 4, 5);
var example = source
//is every value even?
    .every(function (val) {
        return val % 2 === 0;
    }
  //output: false
    );var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
//emit 5 values
var allEvens = Rx.Observable.of(2, 4, 6, 8, 10);
var exampleTwo = allEvens
//is every value even?
    .every(function (val) {
        return val % 2 === 0;
    });
//output: true
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});

*/


/**
 * expand
 * Test case26
 * Status Done
 */

/*
//emit 2
var source = Rx.Observable.of(2);
var example = source
//recursively call supplied function
    .expand(function (val) {
        //2,3,4,5,6
        console.log("Passed value: " + val);
        //3,4,5,6
        return Rx.Observable.of(1 + val);
    }
//call 5 times
    ).take(5);

 // "RESULT: 2"
 // "Passed value: 2"
 // "RESULT: 3"
 // "Passed value: 3"
 // "RESULT: 4"
 // "Passed value: 4"
 // "RESULT: 5"
 // "Passed value: 5"
 // "RESULT: 6"
 // "Passed value: 6"

//output: 2,3,4,5,6
var subscribe = example.subscribe(function (val) {
    return console.log("RESULT: " + val);
});

*/

/**
 * filter
 * Test case26
 * Status Done
 */

/*

    //emit (1,2,3,4,5)
var source = Rx.Observable.from([1, 2, 3, 4, 5]);
//filter out non-even numbers
var example = source.filter(function (num) {
    return num % 2 === 0;
});
//output: "Even number: 2", "Even number: 4"
var subscribe = example.subscribe(function (val) {
    return console.log('Even number: ' + val);
});

//emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
var sourceTwo = Rx.Observable.from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }]);
//filter out people with age under 30
var exampleTwo = sourceTwo.filter(function (person) {
    return person.age >= 30;
});
//output: "Over 30: Joe"
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log('Over 30: ' + val.name);
});
 */


/**
 * first
 * Test case26
 * Status Done
 */

/*
var source = Rx.Observable.from([1, 2, 3, 4, 5]);
//no arguments, emit first value
var example = source.first();
//output: "First value: 1"
var subscribe = example.subscribe(function (val) {
    return console.log("First value: " + val);
});

//emit first item to pass test
var exampleTwo = source.first(function (num) {
    return num === 5;
});
//output: "First to pass test: 5"
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log("First to pass test: " + val);
});

//using optional projection function
var exampleThree = source.first(function (num) {
    return num % 2 === 0;
}, function (result, index) {
    return "First even: " + result + " is at index: " + index;
});
//output: "First even: 2 at index: 1"
var subscribeThree = exampleThree.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * first
 * Test case26
 * Status Done
 */

/*

var source = Rx.Observable.from([1, 2, 3, 4, 5]);
//emit first item to pass test
var example = source.first(function (num) {
    return num === 5;
});
//output: "First to pass test: 5"
var subscribe = example.subscribe(function (val) {
    return console.log("First to pass test: " + val);
});
*/

/**
 * ignoreElements
 * Test case 27
 * Status Done
 */
/*

//emit value every 100ms
var source = Rx.Observable.interval(100);
//ignore everything but complete
var example = source.take(5).ignoreElements();
//output: "COMPLETE!"
var subscribe = example.subscribe(function (val) {
    return console.log('NEXT: ' + val);
}, function (val) {
    return console.log('ERROR: ' + val);
}, function () {
    return console.log('COMPLETE!');
});

//ignore everything but error
var error = source.flatMap(function (val) {
    if (val === 4) {
        return Rx.Observable.throw('ERROR AT ' + val);
    }
    return Rx.Observable.of(val);
}).ignoreElements();
//output: "ERROR: ERROR AT 4"
var subscribeTwo = error.subscribe(function (val) {
    return console.log('NEXT: ' + val);
}, function (val) {
    return console.log('ERROR: ' + val);
}, function () {
    return console.log('SECOND COMPLETE!');
});
 */

/**
 * last
 * Test case 28
 * Status Done
 */

/*
var source = Rx.Observable.from([1, 2, 3, 4, 5]);
//no arguments, emit last value
var example = source.last();
//output: "Last value: 5"
var subscribe = example.subscribe(function (val) {
    return console.log("Last value: " + val);
});

//emit last even number
var exampleTwo = source.last(function (num) {
    return num % 2 === 0;
});
//output: "Last to pass test: 4"
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log("Last to pass test: " + val);
});
 */

/**
 * let
 * Test case 29
 * Status Done
 */

/*
var myArray = [1, 2, 3, 4, 5];
var myObservableArray = Rx.Observable.from(myArray);
//demonstrating the difference between let and other operators
var test = myObservableArray.map(function (val) {
    return val + 1;
}
//this fails, let behaves differently than most operators
//val in this case is an observable
//.let(val => val + 2)
).subscribe(function (val) {
    return console.log('VALUE FROM ARRAY: ', val);
});

var letTest = myObservableArray.map(function (val) {
    return val + 1;
}
//'let' me have the entire observable
).let(function (obs) {
    return obs.map(function (val) {
        return val + 2;
    });
}).subscribe(function (val) {
    return console.log('VALUE FROM ARRAY WITH let: ', val);
});

//let provides flexibility to add multiple operators to source observable then return
var letTestThree = myObservableArray.map(function (val) {
    return val + 1;
}).let(function (obs) {
    return obs.map(function (val) {
            return val + 2;
        }
        //also, just return evens
    ).filter(function (val) {
        return val % 2 === 0;
    });
}).subscribe(function (val) {
    return console.log('let WITH MULTIPLE OPERATORS: ', val);
});

//pass in your own function to add operators to observable
var obsArrayPlusYourOperators = function obsArrayPlusYourOperators(yourAppliedOperators) {
    return myObservableArray.map(function (val) {
        return val + 1;
    }).let(yourAppliedOperators);
};
var addTenThenTwenty = function addTenThenTwenty(obs) {
    return obs.map(function (val) {
        return val + 10;
    }).map(function (val) {
        return val + 20;
    });
};
var letTestFour = obsArrayPlusYourOperators(addTenThenTwenty).subscribe(function (val) {
    return console.log('let FROM FUNCTION:', val);
});
 */

/**
 * mapTo
 * Test case 30
 * Status Done
 */

/*
    //emit value every two seconds
var source = Rx.Observable.interval(2000);
//map all emissions to one value
var example = source.mapTo('HELLO WORLD!');
//output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});

//emit every click on document
var clickSource = Rx.Observable.fromEvent(document, 'click');
//map all emissions to one value
var exampleTwo = clickSource.mapTo('GOODBYE WORLD!');
//output: (click)'GOODBYE WORLD!'...
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});

*/

/**
 * merge
 * Test case 31
 * Status Done
 */
/*
    //emit every 2.5 seconds
var first = Rx.Observable.interval(2500);
//emit every 2 seconds
var second = Rx.Observable.interval(2000);
//emit every 1.5 seconds
var third = Rx.Observable.interval(1500);
//emit every 1 second
var fourth = Rx.Observable.interval(1000);

//emit outputs from one observable
var example = Rx.Observable.merge(first.mapTo('FIRST!'), second.mapTo('SECOND!'), third.mapTo('THIRD'), fourth.mapTo('FOURTH'));
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});


//used as instance method
// var exampleTwo = first.merge(fourth);
// //output: 0,1,0,2....
// var subscribeTwo = exampleTwo.subscribe(function (val) {
//     return console.log(val);
// });
 // */

/**
 * mergeMap
 * Test case 32
 * Status Done
 */
/*
    //emit 'Hello'
var source = Rx.Observable.of('Hello');
//map to inner observable and flatten
var example = source.mergeMap(function (val) {
    return Rx.Observable.of(val + ' World!');
});
//output: 'Hello World!'
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});

//mergeMap also emits result of promise
var myPromise = function myPromise(val) {
    return new Promise(function (resolve) {
        return resolve(val + ' World From Promise!');
    });
};
//map to promise and emit result
var exampleTwo = source.mergeMap(function (val) {
    return myPromise(val);
});
//output: 'Hello World From Promise'
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});

 // you can also supply a second argument which recieves the source value and emitted
 // value of inner observable or promise

var exampleThree = source.mergeMap(function (val) {
    return myPromise(val);
}, function (valueFromSource, valueFromPromise) {
    return 'Source: ' + valueFromSource + ', Promise: ' + valueFromPromise;
});
//output: "Source: Hello, Promise: Hello World From Promise!"
var subscribeThree = exampleThree.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * partition
 * Test case 33
 * Status Done
 */
/*
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var source = Rx.Observable.from([1, 2, 3, 4, 5, 6]);
//first value is true, second false

var _source$partition = source.partition(function (val) {
        return val % 2 === 0;
    }),
    _source$partition2 = _slicedToArray(_source$partition, 2),
    evens = _source$partition2[0],
    odds = _source$partition2[1];
 // Output:
 // "Even: 2"
 // "Even: 4"
 // "Even: 6"
 // "Odd: 1"
 // "Odd: 3"
 // "Odd: 5"


var subscribe = Rx.Observable.merge(evens.map(function (val) {
    return "Even: " + val;
}), odds.map(function (val) {
    return "Odd: " + val;
})).subscribe(function (val) {
    return console.log(val);
});
//if greater than 3 throw
var example = source.map(function (val) {
    if (val > 3) {
        throw val + " greater than 3!";
    }
    return { success: val };
}).catch(function (val) {
    return Rx.Observable.of({ error: val });
});
//split on success or error

var _example$partition = example.partition(function (res) {
        return res.success;
    }

    ),
    _example$partition2 = _slicedToArray(_example$partition, 2),
    success = _example$partition2[0],
    error = _example$partition2[1];

var subscribeTwo = Rx.Observable.merge(success.map(function (val) {
    return "Success! " + val.success;
}), error.map(function (val) {
    return "Error! " + val.error;
})).subscribe(function (val) {
    return console.log(val);
});
 */


/**
 * pluck
 * Test case 34
 * Status Done
 */
/*
var source = Rx.Observable.from([{ name: 'Joe', age: 30 }, { name: 'Sarah', age: 35 }]);
//grab names
var example = source.pluck('name');
//output: "Joe", "Sarah"
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});

var sourceTwo = Rx.Observable.from([{ name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
//will return undefined when no job is found
    { name: 'Sarah', age: 35 }]);
//grab title property under job
var exampleTwo = sourceTwo.pluck('job', 'title');
//output: "Developer" , undefined
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});
 */



/**
 * publish
 * Test case 35
 * Status Done
 */
/*
  //emit value every 1 second
var source = Rx.Observable.interval(1000);
var example = source
//side effects will be executed once
    .do(function () {
        return console.log('Do Something!');
    }
//do nothing until connect() is called
    ).publish();

 // source will not emit values until connect() is called
 // output: (after 5s)
 // "Do Something!"
 // "Subscriber One: 0"
 // "Subscriber Two: 0"
 // "Do Something!"
 // "Subscriber One: 1"
 // "Subscriber Two: 1"

var subscribeOne = example.subscribe(function (val) {
    return console.log('Subscriber One: ' + val);
});
var subscribeTwo = example.subscribe(function (val) {
    return console.log('Subscriber Two: ' + val);
});

//call connect after 5 seconds, causing source to begin emitting items
setTimeout(function () {
    example.connect();
}, 5000);
*/

/**
 * race
 * Test case 36
 * Status Done
 */

/*
var example = Rx.Observable.race(
//emit every 1.5s
    Rx.Observable.interval(1500),
//emit every 1s
    Rx.Observable.interval(1000).mapTo('1s won!'),
//emit every 2s
    Rx.Observable.interval(2000),
//emit every 2.5s
    Rx.Observable.interval(2500));
//output: "1s won!"..."1s won!"...etc
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * repeat
 * Test case 37
 * Status Done
 */

/*
//emit "Repeat this!"
var source = Rx.Observable.of('Repeat this!');
//repeat items emitted from source 3 times
var example = source.repeat(3);
//output: "Repeat this!"..."Repeat this!"..."Repeat this!"
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
//emit every second
var sourceTwo = Rx.Observable.interval(1000);
//take 5 values, repeat 2 times
var exampleTwo = sourceTwo.take(5).repeat(2);
//output: 0,1,2,3,4,5...0,1,2,3,4,5
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * retry
 * Test case 38
 * Status Done
 */
/*
  var source = Rx.Observable.interval(1000);
  var example = source.flatMap(function (val) {
      //throw error for demonstration
      if (val > 5) {
          return Rx.Observable.throw('Error!');
      }
      return Rx.Observable.of(val);
  }
//retry 2 times on error
  ).retry(2);
   // output:
   // 0..1..2..3..4..5..
   // 0..1..2..3..4..5..
   // 0..1..2..3..4..5..
   // "Error!: Retried 2 times then quit!"
  var subscribe = example.subscribe({
      next: function next(val) {
          return console.log(val);
      },
      error: function error(val) {
          return console.log(val + ': Retried 2 times then quit!');
      }
  });

*/

/**
 * retryWhen
 * Test case 39
 * Status Done
 */
/*
//emit value every 1s
var source = Rx.Observable.interval(1000);
var example = source.map(function (val) {
    if (val > 5) {
        //error will be picked up by retryWhen
        throw val;
    }
    return val;
}).retryWhen(function (errors) {
    return errors
    //log error message
        .do(function (val) {
                return console.log("Value " + val + " was too high!");
            }
            //restart in 5 seconds
        ).delayWhen(function (val) {
            return Rx.Observable.interval(val * 1000);
        });
});
 // output:
 // 0
 // 1
 // 2
 // 3
 // 4
 // 5
 // "Value 6 was too high!"
 // --Wait 5 seconds then repeat
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * sample
 * Test case 40
 * Status Done
 */
/*
    //emit value every 1s
var source = Rx.Observable.interval(1000);
//sample last emitted value from source every 2s
var example = source.sample(Rx.Observable.interval(2000));
//output: 2..4..6..8..
debugger;
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
*/
/*
var sourceTwo = Rx.Observable.zip(
//emit 'Joe', 'Frank' and 'Bob' in sequence
    Rx.Observable.from(['Joe', 'Frank', 'Bob']),
//emit value every 2s
    Rx.Observable.interval(2000));
//sample last emitted value from source every 2.5s
var exampleTwo = sourceTwo.sample(Rx.Observable.interval(2500));
//output: ["Joe", 0]...["Frank", 1]...........
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * scan
 * Test case 41
 * Status Done
 */
/*
//    example 1
var testSubject = new Rx.Subject();
//basic scan example, sum over time starting with zero
var basicScan = testSubject.startWith(0).scan(function (acc, curr) {
    return acc + curr;
});
//log accumulated values
var subscribe = basicScan.subscribe(function (val) {
    return console.log('Accumulated total:', val);
});
//next values into subject, adding to the current sum
testSubject.next(1); //1
testSubject.next(2); //3
testSubject.next(3); //6

*/

/*
 // Example 2
var testSubjectTwo = new Rx.Subject();
//scan example building an object over time
var objectScan = testSubjectTwo.scan(function (acc, curr) {
    return Object.assign({}, acc, curr);
}, {});
//log accumulated values
var subscribe = objectScan.subscribe(function (val) {
    return console.log('Accumulated object:', val);
});
//next values into subject, adding properties to object
testSubjectTwo.next({ name: 'Joe' }); // {name: 'Joe'}
testSubjectTwo.next({ age: 30 }); // {name: 'Joe', age: 30}
testSubjectTwo.next({ favoriteLanguage: 'JavaScript' }); // {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
 */

/**
 * share
 * Test case 42
 * Status Done
 */

// /*

var source = Rx.Observable.timer(1000);
//log side effect, emit result
var example = source.do(function () {
    return console.log('***SIDE EFFECT***');
}).mapTo('***RESULT***');
 // ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
 // output:
 // "***SIDE EFFECT***"
 // "***RESULT***"
 // "***SIDE EFFECT***"
 // "***RESULT***"
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
var subscribeTwo = example.subscribe(function (val) {
    return console.log(val);
});

//share observable among subscribers
var sharedExample = example.share();
 // ***SHARED, SIDE EFFECT EXECUTED ONCE***
 // output:
 // "***SIDE EFFECT***"
 // "***RESULT***"
 // "***RESULT***"
var subscribeThree = sharedExample.subscribe(function (val) {
    return console.log(val);
});
var subscribeFour = sharedExample.subscribe(function (val) {
    return console.log(val);
});
 // */


/**
 * single
 * Test case 43
 * Status Done
 */

/*
//emit (1,2,3,4,5)
var source = Rx.Observable.from([1, 2, 3, 4, 5]);
//emit one item that matches predicate
var example = source.single(function (val) {
    return val === 4;
});
//output: 4
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * skip
 * Test case 44
 * Status Done
 */

/*
//emit every 1s
var source = Rx.Observable.interval(1000);
//skip the first 5 emitted values
var example = source.skip(5);
//output: 5...6...7...8........
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
*/

/**
 * skipUntil
 * Test case 45
 * Status Done
 */

/*

//emit every 1s
var source = Rx.Observable.interval(1000);
//skip emitted values from source until inner observable emits (6s)
var example = source.skipUntil(Rx.Observable.timer(6000));
//output: 5...6...7...8........
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * skipWhile
 * Test case 46
 * Status Done
 */

/*

//emit every 1s
var source = Rx.Observable.interval(1000);
//skip emitted values from source while value is less than 5
var example = source.skipWhile(function (val) {
    return val < 5;
});
//output: 5...6...7...8........
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */
/**
 * startWith
 * Test case 47
 * Status Done
 */
/*
  //emit (1,2,3)
  var source = Rx.Observable.of(1, 2, 3);
  //start with 0
  var example = source.startWith(0);
  //output: 0,1,2,3
  var subscribe = example.subscribe(function (val) {
      return console.log(val);
  });
  //-----------Second example ---------------
  //emit ('World!', 'Goodbye', 'World!')
  var sourceTwo = Rx.Observable.of('World!', 'Goodbye', 'World!');
  //start with 'Hello', concat current string to previous
  var exampleTwo = sourceTwo.startWith('Hello').scan(function (acc, curr) {
      return acc + ' ' + curr;
  });
   // output:
   // "Hello"
   // "Hello World!"
   // "Hello World! Goodbye"
   // "Hello World! Goodbye World!"

  var subscribeTwo = exampleTwo.subscribe(function (val) {
      return console.log(val);
  });
 */

/**
 * switchMap
 * Test case 48
 * Status Done
 */
/*
    //emit immediately, then every 5s
var source = Rx.Observable.timer(0, 5000);
//switch to new inner observable when source emits, emit items that are emitted
var example = source.switchMap(function () {
    return Rx.Observable.interval(500);
});
//output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
// -------- example 2 ----------

//emit every click
var sourceTwo = Rx.Observable.fromEvent(document, 'click');
//if another click comes within 3s, message will not be emitted
var exampleTwo = sourceTwo.switchMap(function (val) {
    // This will create new pair od nodes each time its clicked
    return Rx.Observable.interval(3000).mapTo('Hello, I made it!');
});
//(click)...3s...'Hello I made it!'...(click)...2s(click)...
var subscribeTwo = exampleTwo.subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * window
 * Test case 49
 * Status - Done
 */
/*
//emit immediately then every 1s
var source = Rx.Observable.timer(0, 1000);
var example = source.window(Rx.Observable.interval(3000));
var count = example.scan(function (acc, curr) {
        return acc + 1;
    }, 0
     // "Window 1:"
     // 0
     // 1
     // 2
     // "Window 2:"
     // 3
     // 4
     // 5
     // ...
);

var subscribe = count.subscribe(function (val) {
    return console.log("Window " + val + ":");
});
var subscribeTwo = example.mergeAll().subscribe(function (val) {
    return console.log(val);
});
 */

/**
 * windowCount
 * Test case 50
 * Status - Done
 */
/*
    //emit every 1s
var source = Rx.Observable.interval(1000);
var example = source
//start new window every 4 emitted values
    .windowCount(4).do(function () {
        return console.log('NEW WINDOW!');
    });

var subscribeTwo = example
//window emits nested observable
    .mergeAll().subscribe(function (val) {
        return console.log(val);
    });
  */

/**
 * windowTime
 * Test case 51
 * Status Done
 */


/*
    //emit immediately then every 1s
var source = Rx.Observable.timer(0, 1000);
var example = source
//start new window every 3s
    .windowTime(3000).do(function () {
        return console.log('NEW WINDOW!');
    });

var subscribeTwo = example
//window emits nested observable
    .mergeAll().subscribe(function (val) {
        return console.log(val);
    });
 */

/**
 * windowToggle
 * Test case 52
 * Status Done
 */


/*
 //emit immediately then every 1s
    //emit immediately then every 1s
var source = Rx.Observable.timer(0, 1000);
//toggle window on every 5
var toggle = Rx.Observable.interval(5000);
var example = source
//turn window on every 5s
    .windowToggle(toggle, function (val) {
        return Rx.Observable.interval(val * 1000);
    }).do(function () {
        return console.log('NEW WINDOW!');
    });

var subscribeTwo = example
//window emits nested observable
    .mergeAll().subscribe(function (val) {
        return console.log(val);
    });
 */

/**
 * windowWhen
 * Test case 53
 * Status Done
 */
/*
    //emit immediately then every 1s
var source = Rx.Observable.timer(0, 1000);
var example = source
//close window every 5s and emit observable of collected values from source
    .windowWhen(function (val) {
        return Rx.Observable.interval(5000);
    }).do(function () {
        return console.log('NEW WINDOW!');
    });

var subscribeTwo = example
//window emits nested observable
    .mergeAll().subscribe(function (val) {
        return console.log(val);
    });
 */

/**
 * withLatestFrom
 * Test case 53
 * Status Done
 */
/*
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//emit every 5s
var source = Rx.Observable.interval(5000);
//emit every 1s
var secondSource = Rx.Observable.interval(1000);
var example = source.withLatestFrom(secondSource).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        first = _ref2[0],
        second = _ref2[1];

    return "First Source (5s): " + first + " Second Source (1s): " + second;
});
 // "First Source (5s): 0 Second Source (1s): 4"
 // "First Source (5s): 1 Second Source (1s): 9"
 // "First Source (5s): 2 Second Source (1s): 14"
 // ...
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});

 */

/**
 * zip
 * Test case 54
 * Status Done
 */
/*
var sourceOne = Rx.Observable.of('Hello');
var sourceTwo = Rx.Observable.of('World!');
var sourceThree = Rx.Observable.of('Goodbye');
var sourceFour = Rx.Observable.of('World!');
//wait until all observables have emitted a value then emit all as an array
var example = Rx.Observable.zip(sourceOne, sourceTwo.delay(1000), sourceThree.delay(2000), sourceFour.delay(3000));
//output: ["Hello", "World!", "Goodbye", "World!"]
var subscribe = example.subscribe(function (val) {
    return console.log(val);
});
 */