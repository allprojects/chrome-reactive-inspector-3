var cri = cri || {};

cri.utils = (function (window) {

    /**
     * Accepts multiple mixed jquery and string object ands concatenates them to one html-string.
     * Parameter: arguments
     */
    function createMixed(/*arguments*/) {
        let result = "";
        for (let arg = 0; arg < arguments.length; ++arg) {
            let part = arguments[arg];

            if (typeof part === "string") {
                result += $("<div>").text(part).html();
            } else if (part instanceof jQuery) {
                result += $("<div>").append(part).html();
            } else {
                throw "invalid arguments";
            }
        }
        return result;
    }

    /**
     * adds padding to a string
     */
    function pad(str, count) {
        return String(" " +
            " ".repeat(count) + str).slice(-count).replace(/ /g, "&nbsp;");
    }


    return {
        createMixed: createMixed,
        pad: pad
    }
}(window));