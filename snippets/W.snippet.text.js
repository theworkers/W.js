(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }
    W.snippet = W.snippet || {};

    W.snippet.text = W.text || {};
    W.snippet.text.version = "2.0.0";

    /** Add Commas to number */
    W.snippet.text.addCommas = function (number) {
        number = '' + number;
        if(number.indexOf(",") > 0) { return number; }
        if (number.length > 3) {
            var mod = number.length % 3;
            var output = (mod > 0 ? (number.substring(0,mod)) : '');
            for (i=0 ; i < Math.floor(number.length / 3); i++) {
                if ((mod === 0) && (i === 0)) {
                    output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
                } else {
                    output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
            }
            return (output);
        }
        else return number;
    };

    /** String has string */
    W.snippet.text.contains = function (str, test) { return (str.indexOf(test) != -1 ); };
    
    /** String trim leading and ending whitespace */
    W.snippet.text.trim = function(str) { return (str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };
    
    /** String string starts with 
    http://stackoverflow.com/a/646643/179015 */
    W.snippet.text.startsWith = function(str, test) { return str.slice(0, test.length) == test; };
    /** String string ends with 
    http://stackoverflow.com/a/646643/179015 */
    W.snippet.text.endsWith = function(str, test) { return str.slice(-test.length) == test; };

}());