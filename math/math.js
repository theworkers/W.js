    
var Maths = {
    PI : Math.PI,
    PI_2 : Math.PI/2
};

Maths.clipNormalized = function (x, min, max) { // or (value, max), or (value)
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

Maths.clamp = function (value, min, max, callbackOnClamp) {
    if (max < min) {
        if (value < max) {
            if (typeof callbackOnClamp === 'function') {
                callbackOnClamp(value, max);
            }
            value = max;
        }
        else if (value > min) {
            if (typeof callbackOnClamp === 'function') {
                callbackOnClamp(value, min);
            }
            value = min;
        }
    } else {
        if (value > max) {
            if (typeof callbackOnClamp === 'function') {
                callbackOnClamp(value, max);
            }
            value = max;
        }
        else if (value < min) {
            if (typeof callbackOnClamp === 'function') {
                callbackOnClamp(value, min);
            }
            value = min;
        }
    }
    return value;
};

// Used for interpolation between two points
Maths.lerp = function (start, end, scalar) {
    return start + (end - start) * scalar;
};

Maths.fitScaleRatio = function (width, height, boundsWidth, boundsHeight) {
    var widthScale = boundsWidth / width;
    var heightScale = boundsHeight / height;
    return Math.min(widthScale, heightScale);
};

Maths.randomBetween = function (from, to) {
    return W.snippet.math.map(Math.random(), 0, 1, from, to);
};

Maths.inRange = function (test, min, max) {
    if (min === max) { return false; }
    if (min > max) {
        return (test < min && test > max);
    } else {
        return (test > min && test < max);
    }
};

// @todo test
Maths.close = function (num, test, tolerance) {
    tolerance = tolerance || 1;
    return (num > test-tolerance && num < test+tolerance);
};

 // @todo accept numbers and test
Maths.angleBetween = function (center, point) {
    var angle = Math.atan2(center.x-point.x,center.y-point.y)*(180/Math.PI);
    if(angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }
    return angle;
};

// @todo accept numbers and test
Maths.distance = function (obj1, obj2) {
    var x = obj2.x - obj1.x;
    var y = obj2.y - obj1.y;
    return Math.sqrt((x*x)+(y*y));
};

Maths.normalize = function (value, min, max, ease) {
    value = W.Math.clamp((value-min)/(max-min),0,1);
    return ease ? ease(value) : value;
};

// Fisher-Yates shuffle.
// source http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
Maths.shuffleArray = function (arr, leaveOriginalUntouched) {
    var array = (leaveOriginalUntouched) ? arr.slice(0) : arr;
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
};

Maths.hexStringToColorArray  = function (hex)  {
    // modified from http://stackoverflow.com/a/5624139/179015
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [];
};

Maths.colorStringToHex = function (color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2], 10);
    var green = parseInt(digits[3], 10);
    var blue = parseInt(digits[4], 10);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

Maths.colorValuesToHex = function (r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Ease function can be a interpolation function as below
Maths.map = function (input, inputMin, inputMax, outputMin, outputMax, clamp, ease) {
    input = (input - inputMin) / (inputMax - inputMin);
    if (ease) {
        input = ease(input);
    } 
    var output = input * (outputMax - outputMin) + outputMin;
    if (!!clamp) {
        if (outputMax < outputMin) {
            if (output < outputMax) {
                output = outputMax;
            }
            else if (output > outputMin) {
                output = outputMin;
            }
        } else {
            if (output > outputMax) {
                output = outputMax;
            }
            else if (output < outputMin) {
                output = outputMin;
            }
        }
    }
    return output;
};

/////
//// Interpolation Methods
//

// Negative ease produces ease out, positive produces ease in. 
// Range around -1 to 1
Maths.getDynamicallyEasedInterpolation = function (ease) { 
    return function (p) {
        return dynamicEaseInterpolation(p, ease);
    };
};

Maths.dynamicEaseInterpolation = dynamicEaseInterpolation;

function dynamicEaseInterpolation(p, ease) { 
     // invert negative value and positive so they work on the same logarithmic scale.
    if (ease >= 0.0) {
        ease = ease * 2.25 + 1;
        // superelipse
        return  Math.pow( 1 - Math.pow( 1 - p, ease ), 1 / ease );
    } else {
        ease = Math.abs(ease) * 2.25 + 1;
        // superelipse shifted
        return 1 - Math.pow( 1 - Math.pow(p, ease ), 1 / ease );
    }

}

///  From the Penner equations 
///  and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c

// Modeled after the line y = x
Maths.linearInterpolation = function(p) { return p; };
// Modeled after the parabola y = x^2
Maths.quadraticEaseIn = function(p) { return p * p; };
// Modeled after the parabola y = -x^2 + 2x
Maths.quadraticEaseOut = function(p) { return -(p * (p - 2)); };
// Modeled after the piecewise quadratic
// y = (1/2)((2x)^2)             ; [0, 0.5)
// y = -(1/2)((2x-1)*(2x-3) - 1) ; [0.5, 1]
Maths.quadraticEaseInOut = function(p) {
    if(p < 0.5) {
        return 2 * p * p;
    } else {
        return (-2 * p * p) + (4 * p) - 1;
    }
};
// Modeled after the cubic y = x^3
Maths.cubicEaseIn = function(p) {
    return p * p * p;
};
// Modeled after the cubic y = (x - 1)^3 + 1
Maths.cubicEaseOut = function(p) {
    var f = (p - 1);
    return f * f * f + 1;
};
// Modeled after the piecewise cubic
// y = (1/2)((2x)^3)       ; [0, 0.5)
// y = (1/2)((2x-2)^3 + 2) ; [0.5, 1]
Maths.cubicEaseInOut = function(p) {
    if(p < 0.5) {
        return 4 * p * p * p;
    } else {
        var f = ((2 * p) - 2);
        return 0.5 * f * f * f + 1;
    }
};
// Modeled after the quartic x^4
Maths.quarticEaseIn = function(p) { return p * p * p * p; };
// Modeled after the quartic y = 1 - (x - 1)^4
Maths.quarticEaseOut = function(p) {
    var f = (p - 1);
    return f * f * f * (1 - p) + 1;
};
// Modeled after the piecewise quartic
// y = (1/2)((2x)^4)        ; [0, 0.5)
// y = -(1/2)((2x-2)^4 - 2) ; [0.5, 1]
Maths.quarticEaseInOut = function(p) {
    if(p < 0.5) {
        return 8 * p * p * p * p;
    } else {
        var f = (p - 1);
        return -8 * f * f * f * f + 1;
    }
};
// Modeled after the quintic y = x^5
Maths.quinticEaseIn = function(p) {
    return p * p * p * p * p;
};
// Modeled after the quintic y = (x - 1)^5 + 1
Maths.quinticEaseOut = function(p) {
    var f = (p - 1);
    return f * f * f * f * f + 1;
};
// Modeled after the piecewise quintic
// y = (1/2)((2x)^5)       ; [0, 0.5)
// y = (1/2)((2x-2)^5 + 2) ; [0.5, 1]
Maths.quinticEaseInOut = function(p) {
    if(p < 0.5) {
        return 16 * p * p * p * p * p;
    } else {
        var f = ((2 * p) - 2);
        return  0.5 * f * f * f * f * f + 1;
    }
};
// Modeled after quarter-cycle of sine wave
Maths.sineEaseIn = function(p) {
    return sin((p - 1) * W.Math.PI_2) + 1;
};
// Modeled after quarter-cycle of sine wave (different phase)
Maths.sineEaseOut = function(p) {
    return sin(p * W.Math.PI_2);
};

// Modeled after half sine wave
Maths.sineEaseInOut = function(p) {
    return 0.5 * (1 - cos(p * W.Math.PI));
};

// Modeled after shifted quadrant IV of unit circle
Maths.circularEaseIn = function(p) {
    return 1 - Math.sqrt(1 - (p * p));
};

// Modeled after shifted quadrant II of unit circle
Maths.circularEaseOut = function(p)  {
    return Math.sqrt((2 - p) * p);
};

// Modeled after the piecewise circular function
// y = (1/2)(1 - sqrt(1 - 4x^2))           ; [0, 0.5)
// y = (1/2)(sqrt(-(2x - 3)*(2x - 1)) + 1) ; [0.5, 1]
Maths.circularEaseInOut = function(p) {
    if(p < 0.5) {
        return 0.5 * (1 - Math.sqrt(1 - 4 * (p * p)));
    } else {
        return 0.5 * (Math.sqrt(-((2 * p) - 3) * ((2 * p) - 1)) + 1);
    }
};
// Modeled after the exponential function y = 2^(10(x - 1))
Maths.exponentialEaseIn = function(p) {
    return (p === 0.0) ? p : Math.pow(2, 10 * (p - 1));
};
// Modeled after the exponential function y = -2^(-10x) + 1
Maths.exponentialEaseOut = function(p) {
    return (p === 1.0) ? p : 1 - Math.pow(2, -10 * p);
};
// Modeled after the piecewise exponential
// y = (1/2)2^(10(2x - 1))         ; [0,0.5)
// y = -(1/2)*2^(-10(2x - 1))) + 1 ; [0.5,1]
Maths.exponentialEaseInOut = function(p) {
    if(p === 0.0 || p === 1.0) return p;
    if(p < 0.5) {
        return 0.5 * Math.pow(2, (20 * p) - 10);
    } else {
        return -0.5 * Math.pow(2, (-20 * p) + 10) + 1;
    }
};
// Modeled after the damped sine wave y = sin(13pi/2*x)*pow(2, 10 * (x - 1))
Maths.elasticEaseIn = function(p) {
    return Math.sin(13 * W.Math.PI_2 * p) * Math.pow(2, 10 * (p - 1));
};
// Modeled after the damped sine wave y = sin(-13pi/2*(x + 1))*pow(2, -10x) + 1
Maths.elasticEaseOut = function(p) {
    return Math.sin(-13 * W.Math.PI_2 * (p + 1)) * Math.pow(2, -10 * p) + 1;
};
// Modeled after the piecewise exponentially-damped sine wave:
// y = (1/2)*sin(13pi/2*(2*x))*pow(2, 10 * ((2*x) - 1))      ; [0,0.5)
// y = (1/2)*(sin(-13pi/2*((2x-1)+1))*pow(2,-10(2*x-1)) + 2) ; [0.5, 1]
Maths.elasticEaseInOut = function(p) {
    if(p < 0.5) {
        return 0.5 * Math.sin(13 * M_PI_2 * (2 * p)) * Math.pow(2, 10 * ((2 * p) - 1));
    } else {
        return 0.5 * (Math.sin(-13 * M_PI_2 * ((2 * p - 1) + 1)) * Math.pow(2, -10 * (2 * p - 1)) + 2);
    }
};
// Modeled after the overshooting cubic y = x^3-x*sin(x*pi)
Maths.backEaseIn = function(p) {
    return p * p * p - p * Math.sin(p * W.Math.PI);
};
// Modeled after overshooting cubic y = 1-((1-x)^3-(1-x)*sin((1-x)*pi))
Maths.backEaseOut = function(p) {
    var f = (1 - p);
    return 1 - (f * f * f - f * Math.sin(f * W.Math.PI));  
};
// Modeled after the piecewise overshooting cubic function:
// y = (1/2)*((2x)^3-(2x)*sin(2*x*pi))           ; [0, 0.5)
// y = (1/2)*(1-((1-x)^3-(1-x)*sin((1-x)*pi))+1) ; [0.5, 1]
Maths.backEaseInOut = function(p) {
    var f;
    if(p < 0.5) {
        f = 2 * p;
        return 0.5 * (f * f * f - f * Math.sin(f * W.Math.PI));
    } else {
        f = (1 - (2*p - 1));
        return 0.5 * (1 - (f * f * f - f * Math.sin(f * W.Math.PI))) + 0.5;
    }
};
Maths.bounceEaseIn = function(p) {
    return 1 - W.Math.bounceEaseOut(1 - p);
};
Maths.bounceEaseOut = function(p) {
    if(p < 4/11.0) {
        return (121 * p * p)/16.0;
    } else if(p < 8/11.0) {
        return (363/40.0 * p * p) - (99/10.0 * p) + 17/5.0;
    } else if(p < 9/10.0) {
        return (4356/361.0 * p * p) - (35442/1805.0 * p) + 16061/1805.0;
    } else {
        return (54/5.0 * p * p) - (513/25.0 * p) + 268/25.0;
    }
};
Maths.bounceEaseInOut = function(p) {
    if(p < 0.5) {
        return 0.5 * W.Math.bounceEaseIn(p*2);
    } else {
        return 0.5 * W.Math.bounceEaseOut(p * 2 - 1) + 0.5;
    }
};