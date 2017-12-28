// Combination lock example
function isEqual(a, b) {  return eq(a, b); };
// Internal recursive comparison function for `isEqual`.
var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case '[object RegExp]':
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return '' + a === '' + b;
        case '[object Number]':
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN
            if (+a !== +a) return +b !== +b;
            // An `egal` comparison is performed for other numeric values.
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;
    }
    var areArrays = className === '[object Array]';
    if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object') return false;

        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
            _.isFunction(bCtor) && bCtor instanceof bCtor)
            && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length) return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
    } else {
        // Deep compare objects.
        var keys = _.keys(a), key;
        length = keys.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (_.keys(b).length !== length) return false;
        while (length--) {
            // Deep compare each member
            key = keys[length];
            if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
};

function isEmpty(s) { return s.length == 0 }


function always(value) { return function() { return value }}

function keyCodeIs(keyCode) {
    return function(event) { return event.keyCode == keyCode }
}

function keyDownEvents(keyCode) {
    return $(document).asEventStream("keydown").filter(keyCodeIs(keyCode))
    }

function keyUpEvents(keyCode) {
    return $(document).asEventStream("keyup").filter(keyCodeIs(keyCode))
    }

function keyStateProperty(keyCode) {
    var keyDown = keyDownEvents(keyCode).map(always("DOWN"));
    var keyUp = keyUpEvents(keyCode).map(always("UP"));
    var mergeResult = keyDown.merge(keyUp).toProperty("UP");
    return mergeResult;
    }

//$(function() {
    // Simple click example
    var clickMe = $("#clikme")
        .asEventStream("click");

clickMe.subscribe(function(event) { alert("mmmm... bacon!") })

// Combinators example
keyStateProperty(32)
.onValue(function(value) { $("#spacebar-value").text(value) })

// Enable/disable example
$("#enabling input")
.asEventStream("keyup")
.map(function(event) { return $(event.target).val() })
.toProperty("")
.map(isEmpty)
.assign($("#enabling button"), "attr", "disabled")

// Echo example
$("#echo input")
.asEventStream("keyup")
.map(function(event) { return $(event.target).val() })
.toProperty("")
.assign($("#echo .output"), "text")

// Combination lock example
function selectElementValue(el) {
    function getValue() {
        return el.val()
    }
return el.asEventStream("change")
.map(getValue)
.toProperty(getValue())
}
Bacon.combineAsArray(
$("#combo select").map(function() {
    return selectElementValue($(this)).map(parseInt)
    }).get()
).map(isEqual, [1,8,0])
.toProperty()
.not()
.assign($("#combo button"), "attr", "disabled")
$("#combo button").click(function() { $("#combo .vault-contents").slideDown() })

// Strikeout (skip/take) example
function strikeout () {
    $("#batter-up .ump-call").text("Strike three, you're out!")
    }

$("#batter-up button")
.asEventStream("click").skip(2).take(1).onValue(strikeout)

//})
