  /**
   * Test case 1
   * Status Done
   */
  // var $toCount = document.querySelector('#toCount');
  // var $result = document.querySelector('#result');
  //
  // var source = Rx.Observable.fromEvent($toCount, 'keyup')
  //   .map(function (e) { return 'length: ' + e.target.value.length; })
  //   .distinctUntilChanged();
  //
  // function setHtml(text) {
  //   console.log(text);
  //   this.innerHTML = text;
  // }

  // source.subscribe(setHtml.bind($result));
  //
  //
  // var $toCount1 = document.querySelector('#toCount1');
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
  //

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