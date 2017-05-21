  /**
   * Test case 1
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
  //
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
   */

  /*
  var observer1 = Rx.Observable.create(
      function (x) {
          console.log('Next: ' + x);
      },
      function (err) {
          console.log('Error: ' + err);
      },
      function () {
          console.log('Completed');
      });
  //
  var source1 = Rx.Observable.range(0, 3);
  //
  var subscription = source1.subscribe(observer1);
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
   */
  /*
  var evenNumbers = Rx.Observable.create(function(observer) {
          var value = 0;
          var interval = setInterval(function(){
              if(value % 2 === 0){
                  observer.next(value / 2);
              }
              value++;
          }, 1000);

          return function(){clearInterval(interval)};
      });
  //output: 0...2...4...6...8
  var subscribe = evenNumbers.subscribe(function(val) {console.log(val)});
  //unsubscribe after 10 seconds
  setTimeout(function(){
      subscribe.unsubscribe();
  }, 10000);

  */

  /**
   * Support for from Observable
   * Test case 5
   */
  var arraySource = Rx.Observable.from([1,2,3,4,5])
      .map(function (x) {
          if(x > 2){
              return x;
          }
      });
  //output: 1,2,3,4,5
  var subscribe = arraySource.subscribe(function(val){ return val });


  // var a = 1
  // var b = 2
  // var s = Signal{ a() + b() }
  // 4 val t = Signal{ s() + 1 }
  // 5 println(s.get()) // 3
  // 6 println(t.get()) // 4
  // 7
  // 8 a()=4
  // 9 println(s.get()) // 6
  // 10 println(t.get())


  //
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