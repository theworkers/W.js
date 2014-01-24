
/** Add Commas to number */
var addCommas = function (number) {
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
var contains = function (str, test) { return (str.indexOf(test) != -1 ); };

/** String trim leading and ending whitespace */
var trim = function(str) { return (str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };

/** String string starts with 
http://stackoverflow.com/a/646643/179015 */
var startsWith = function(str, test) { return str.slice(0, test.length) == test; };
/** String string ends with 
http://stackoverflow.com/a/646643/179015 */
var endsWith = function(str, test) { return str.slice(-test.length) == test; };

/** String contains a top level domain */
var hasTld = function(str) { var result = str.match(/[a-z0-9.\-]+[.][a-z]{1,4}[\/:]?([\d]{1,5})?/m); return (!!result); };
