  /**
   * Test case 1
   * Status Done
   */
  // /*
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

  // */


  // var $toCount1 = document.querySelector('#toC   ount1');
  // var $result1 = document.querySelector('#result1');
  //
  // var source1 = Rx.Observable.fromEvent($toCount1, 'keyup')
  //     .map(function (e) { return 'length: ' + e.target.value.length; })
  //     .distinctUntilChanged();
  //
  // source1.subscribe(setHtml.bind($result1));

