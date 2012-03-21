(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    /** @namespace W.text */
    W.text = {
        version : 1
    };

    /**
    * Add Commas
    */
    W.text.addCommas = function (number) {
        number = '' + number;
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
    
    /** Trim leading and ending whitespace */
    W.text.contains = function (str, test) { return (str.indexOf(test) != -1 ); };
    
    /** Trim leading and ending whitespace */
    W.text.trim = function(str) { return (str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };
    
    /** Test string starts with */
    W.text.startsWith = function(str, test) { return (test.match("^"+test)==test); };
    
    /** Test string ends with */
    W.text.endsWith = function(str, test) { return (str.match(test+"$")==test); };
    
    /* add W.text functionality to string Prototype
    * <strong>incomplete / todo</strong>
    */
   // W.text.enableStringPrototype = function () {
        // W.extend() String.protoype = 
    //};

}());
