  /**
   * Test case 1
   * Status Done
   */
  /*
  var $toCount = document.querySelector('#toCount');
  var $result = document.querySelector('#result');

  var source = Rx.Observable.fromEvent($toCount, 'keyup')
    .map(function (e) { return 'length: ' + e.target.value.length; })
    .distinctUntilChanged();

  function setHtml(text) {
    console.log(text);
    this.innerHTML = text;
  }

  source.subscribe(setHtml.bind($result));

  */


  // var $toCount1 = document.querySelector('#toC   ount1');
  // var $result1 = document.querySelector('#result1');
  //
  // var source1 = Rx.Observable.fromEvent($toCount1, 'keyup')
  //     .map(function (e) { return 'length: ' + e.target.value.length; })
  //     .distinctUntilChanged();
  //
  // source1.subscribe(setHtml.bind($result1));

  /**
   * Test case 2
   * verify Dependency graph when observable is created and subscribed without operators.
   * Status - Done
   */
  /*
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

  */

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


  // var custom_observable = Rx.Observable.create(function (observer) {
  //     observer.next(1);
  //     observer.next(2);
  //     observer.next(3);
  //     observer.complete();
  // }).map(function (v) {
  //   if(v > 1) {
  //       return v
  //   }});
  // custom_observable.subscribe(
  //     function (value) {
  //         console.log('value is: '+value)
  //     },
  //     function (err) {
  //         console.log(err)
  //     },
  //     function () {
  //         console.log('this is the end')
  //     }
  // );

  // var array = [10, 20, 30];
  // var result = Rx.Observable.from(array);
  // result.subscribe(function(x){
  //     console.log(x)
  // });


  // var replay = new Rx.ReplaySubject();
  //
  // var observable = Rx.Observable.create(function(observer){
  //     replay.subscribe(observer);
  // });
  //
  // var mySubject = Rx.Subject.create(replay, observable);
  //
  //
  // mySubject.next(1);
  // mySubject.next(2);
  // mySubject.next(3);
  //
  // mySubject.subscribe(function(x){
  //     console.log(x)
  // });
  //
  // mySubject.next(4);
  // mySubject.next(5);