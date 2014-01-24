// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }
    W.math = W.math || {};
    W.math.util = W.math.util || {};
    W.math.util = {
        version : 1,
        clipNormalized : function (x, min, max) { // or (value, max), or (value)
            if (arguments.length === 2) {
                max = min;
                min = 0;
            } else if (arguments.length === 1) {
                max = 1;
                min = 0;
            }
            if (x<min) { return min; }
            if (x>max) { return max; }
            return x;
        }
    };
}());