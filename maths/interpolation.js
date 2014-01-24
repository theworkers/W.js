//  From the Penner equations 
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
