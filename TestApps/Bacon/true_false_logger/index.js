var $display = $('#display'),
    $trueButton = $('#true'),
    $falseButton = $('#false');

var timeNow = function(){
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

/////////////////////////////
//// create eventstreams \\\\
/////////////////////////////

var logTrue = function(event){
    return timeNow();
}

var logFalse = function(event){
    return timeNow();
}

trueClick = $trueButton.asEventStream('click').map(logTrue)
falseClick = $falseButton.asEventStream('click').map(logFalse)

trueClick.assign($('#log-true'), 'text');
falseClick.assign($('#log-false'), 'text');

//////////////////////
//// simple merge \\\\
//////////////////////

var trueCount = $trueButton.asEventStream('click').map(+1)
var falseCount = $falseButton.asEventStream('click').map(+1)

trueCount
    .scan(0, function(sum, value) { return sum + value })
    .assign($('#count-true'), 'text');

falseCount
    .scan(0, function(sum, value) { return sum + value })
    .assign($('#count-false'), 'text');

var totalCount = trueCount.merge(falseCount)

totalCount
    .scan(0, function(sum, value) { return sum + value })
    .assign($('#count-total'), 'text');

///////////////////////
//// message queue \\\\
///////////////////////

// http://neethack.com/2013/02/bacon-dot-js-for-dummies/

var trueEvent = $trueButton.asEventStream('click')
var falseEvent = $falseButton.asEventStream('click')

var messageQueue = new Bacon.Bus()

//plug eventstreams to queue
messageQueue.plug(trueEvent.map({type: 'click', element: 'true button'}))
messageQueue.plug(falseEvent.map({type: 'click', element: 'false button'}))

// listen and alert event state
messageQueue.onValue(function(event){
    console.log('EVENT: ', event.type, '\nELEMENT: ', event.element || 'none')
})

// push event manually, alert event
messageQueue.push({ type: 'initialize'});