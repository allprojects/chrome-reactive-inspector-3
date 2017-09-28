var anon = function() {
  alert('I an anonymous function');
};
anon();
setTimeout(function() {
  alert('hello after 1000 ms');
}, 1000);

$(function () { alert("in jquery ready shortcut"); });