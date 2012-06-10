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

    W.snippet.math = W.math || {};
    W.snippet.math.version = "2.0.0";

    W.snippet.math.clipNormalized = function (x, min, max) { // or (value, max), or (value)
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
    };

    W.snippet.math.fitScaleRatio = function (width, height, boundsWidth, boundsHeight) {
        var widthScale = boundsWidth / width;
        var heightScale = boundsHeight / height;
        return Math.min(widthScale, heightScale);
    };

    W.snippet.math.map = function (value, inputMin, inputMax, output, clamp) {
        var outVal = ((value-inputMin)/(inputMax-inputMin)*(outputMax-outputMin)+outputMin);
        if (clamp) {
            if (outputMax<outputMin) {
                if (outVal<outputMax) {
                    outVal = outputMax;
                } else if (outVal>outputMin) {
                    outVal = outputMin;
                }
            } else {
                if (outVal>outputMax) {
                    outVal = outputMax;
                } else if (outVal<outputMin) {
                    outVal = outputMin;
                }
            }
        }
        return outVal;
    };

    // @todo test
    W.snippet.math.close = function (num, test, tolerance) {
        tolerance = tolerance || 1;
        return (num > test-tolerance && num < test+tolerance);
    };

     // @todo accept numbers and test
    W.snippet.math.angleBetween = function (center, point) {
        var angle = Math.atan2(center.x-point.x,center.y-point.y)*(180/Math.PI);
        if(angle < 0) {
            angle = Math.abs(angle);
        } else {
            angle = 360 - angle;
        }
        return angle;
    };

    // @todo accept numbers and test
    W.snippet.math.distance = function (obj1, obj2) {
        var x = obj2.x - obj1.x;
        var y = obj2.y - obj1.y;
        return Math.sqrt((x*x)+(y*y));
    };

}());