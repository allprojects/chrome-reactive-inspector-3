
function getData(url) {
  var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
  return Rx.Observable.create(function (observer) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
      if (req.status === 200) {
        observer.next(req.response);
        observer.complete();
      } else {
        observer.error(new Error(req.statusText));
      }
    };

    req.onerror = function () {
      observer.error(new Error('An error occured'));
    };

    req.send();
  });
}

//const source = get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');

Rx.Observable.interval(50000).flatMap(getData).flatMap(function (result) {
  var jsres = JSON.parse(result);
  console.log(jsres.features);
  return Rx.Observable.from(jsres.features);
}).distinct(function (quake) {
  console.log(quake)
  return quake.properties.code;
}).subscribe(function (response) {
    return console.log(response);
}, function (error) {
    return console.error(error);
}, function () {
    return console.log('done');
});

