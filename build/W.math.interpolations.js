(function () {
	//  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
	// Create the namespace
	var W = W || {};
	W.Maths = W.Maths || {};
	W.Maths.interpolations = W.Maths.interpolations || {};
	// Set the context for adding
	var ctx = W.Maths.interpolations;
	// A list of all the interpolations, useful for adding to a selectbox
	ctx.all = ['linearInterpolation', 'quadraticEaseIn', 'quadraticEaseOut', 'quadraticEaseInOut', 'cubicEaseIn', 'cubicEaseOut', 'cubicEaseInOut', 'quarticEaseIn', 'quarticEaseOut', 'quarticEaseInOut', 'quinticEaseIn', 'quinticEaseOut', 'quinticEaseInOut', 'sineEaseIn', 'sineEaseOut', 'sineEaseInOut', 'circularEaseIn', 'circularEaseOut', 'circularEaseInOut', 'exponentialEaseIn', 'exponentialEaseOut', 'exponentialEaseInOut', 'elasticEaseIn', 'elasticEaseOut', 'elasticEaseInOut', 'backEaseIn', 'backEaseOut', 'backEaseInOut', 'bounceEaseIn', 'bounceEaseOut', 'bounceEaseInOut'];
	// Add each interpolations to the context
	for ( var i = 0; i < all.length; ++i ) {
		ctx.interpolations = this[all[i]];
	}
	
// Modeled after the piecewise overshooting cubic function:
// y = (1/2)*((2x)^3-(2x)*sin(2*x*pi))           ; [0, 0.5)
// y = (1/2)*(1-((1-x)^3-(1-x)*sin((1-x)*pi))+1) ; [0.5, 1]
function backEaseInOut (p) {
    var f;
    if(p < 0.5) {
        f = 2 * p;
        return 0.5 * (f * f * f - f * Math.sin(f * W.Math.PI));
    } else {
        f = (1 - (2*p - 1));
        return 0.5 * (1 - (f * f * f - f * Math.sin(f * W.Math.PI))) + 0.5;
    }
}
// Modeled after the overshooting cubic y = x^3-x*sin(x*pi)
function backEaseIn (p) {
    return p * p * p - p * Math.sin(p * W.Math.PI);
}
// Modeled after overshooting cubic y = 1-((1-x)^3-(1-x)*sin((1-x)*pi))
function backEaseOut (p) {
    var f = (1 - p);
    return 1 - (f * f * f - f * Math.sin(f * W.Math.PI));  
}
function bounceEaseInOut (p) {
    if(p < 0.5) {
        return 0.5 * W.Math.bounceEaseIn(p*2);
    } else {
        return 0.5 * W.Math.bounceEaseOut(p * 2 - 1) + 0.5;
    }
}
function bounceEaseIn (p) {
    return 1 - W.Math.bounceEaseOut(1 - p);
}
function bounceEaseOut (p) {
    if(p < 4/11.0) {
        return (121 * p * p)/16.0;
    } else if(p < 8/11.0) {
        return (363/40.0 * p * p) - (99/10.0 * p) + 17/5.0;
    } else if(p < 9/10.0) {
        return (4356/361.0 * p * p) - (35442/1805.0 * p) + 16061/1805.0;
    } else {
        return (54/5.0 * p * p) - (513/25.0 * p) + 268/25.0;
    }
}
// Modeled after the piecewise circular function
// y = (1/2)(1 - sqrt(1 - 4x^2))           ; [0, 0.5)
// y = (1/2)(sqrt(-(2x - 3)*(2x - 1)) + 1) ; [0.5, 1]
function circularEaseInOut (p) {
    if(p < 0.5) {
        return 0.5 * (1 - Math.sqrt(1 - 4 * (p * p)));
    } else {
        return 0.5 * (Math.sqrt(-((2 * p) - 3) * ((2 * p) - 1)) + 1);
    }
}
// Modeled after shifted quadrant IV of unit circle
function circularEaseIn (p) {
    return 1 - Math.sqrt(1 - (p * p));
}
// Modeled after shifted quadrant II of unit circle
function circularEaseOut (p)  {
    return Math.sqrt((2 - p) * p);
}
// Modeled after the piecewise cubic
// y = (1/2)((2x)^3)       ; [0, 0.5)
// y = (1/2)((2x-2)^3 + 2) ; [0.5, 1]
function cubicEaseInOut (p) {
    if(p < 0.5) {
        return 4 * p * p * p;
    } else {
        var f = ((2 * p) - 2);
        return 0.5 * f * f * f + 1;
    }
}
// Modeled after the cubic y = x^3
function cubicEaseIn (p) {
    return p * p * p;
}
// Modeled after the cubic y = (x - 1)^3 + 1
function cubicEaseOut (p) {
    var f = (p - 1);
    return f * f * f + 1;
}
// Modeled after the piecewise exponentially-damped sine wave:
// y = (1/2)*sin(13pi/2*(2*x))*pow(2, 10 * ((2*x) - 1))      ; [0,0.5)
// y = (1/2)*(sin(-13pi/2*((2x-1)+1))*pow(2,-10(2*x-1)) + 2) ; [0.5, 1]
function elasticEaseInOut (p) {
    if(p < 0.5) {
        return 0.5 * Math.sin(13 * M_PI_2 * (2 * p)) * Math.pow(2, 10 * ((2 * p) - 1));
    } else {
        return 0.5 * (Math.sin(-13 * M_PI_2 * ((2 * p - 1) + 1)) * Math.pow(2, -10 * (2 * p - 1)) + 2);
    }
}
// Modeled after the damped sine wave y = sin(13pi/2*x)*pow(2, 10 * (x - 1))
function elasticEaseIn (p) {
    return Math.sin(13 * W.Math.PI_2 * p) * Math.pow(2, 10 * (p - 1));
}
// Modeled after the damped sine wave y = sin(-13pi/2*(x + 1))*pow(2, -10x) + 1
function elasticEaseOut (p) {
    return Math.sin(-13 * W.Math.PI_2 * (p + 1)) * Math.pow(2, -10 * p) + 1;
}
// Modeled after the piecewise exponential
// y = (1/2)2^(10(2x - 1))         ; [0,0.5)
// y = -(1/2)*2^(-10(2x - 1))) + 1 ; [0.5,1]
function exponentialEaseInOut (p) {
    if(p === 0.0 || p === 1.0) return p;
    if(p < 0.5) {
        return 0.5 * Math.pow(2, (20 * p) - 10);
    } else {
        return -0.5 * Math.pow(2, (-20 * p) + 10) + 1;
    }
}
// Modeled after the exponential function y = 2^(10(x - 1))
function exponentialEaseIn (p) {
    return (p === 0.0) ? p : Math.pow(2, 10 * (p - 1));
}
// Modeled after the exponential function y = -2^(-10x) + 1
function exponentialEaseOut (p) {
    return (p === 1.0) ? p : 1 - Math.pow(2, -10 * p);
}
// Modeled after the line y = x
function linearInterpolation (p) { return p; }
// Modeled after the piecewise quadratic
// y = (1/2)((2x)^2)             ; [0, 0.5)
// y = -(1/2)((2x-1)*(2x-3) - 1) ; [0.5, 1]
function quadraticEaseInOut (p) {
    if(p < 0.5) {
        return 2 * p * p;
    } else {
        return (-2 * p * p) + (4 * p) - 1;
    }
}
// Modeled after the parabola y = x^2
function quadraticEaseIn (p) { return p * p; }
// Modeled after the parabola y = -x^2 + 2x
function quadraticEaseOut (p) { 
	return -(p * (p - 2)); 
}
// Modeled after the piecewise quartic
// y = (1/2)((2x)^4)        ; [0, 0.5)
// y = -(1/2)((2x-2)^4 - 2) ; [0.5, 1]
function quarticEaseInOut (p) {
    if(p < 0.5) {
        return 8 * p * p * p * p;
    } else {
        var f = (p - 1);
        return -8 * f * f * f * f + 1;
    }
}
// Modeled after the quartic x^4
function quarticEaseIn (p) { 
	return p * p * p * p; 
}
// Modeled after the quartic x^4
function quarticEaseIn (p) { 
	return p * p * p * p; 
}
// Modeled after the piecewise quintic
// y = (1/2)((2x)^5)       ; [0, 0.5)
// y = (1/2)((2x-2)^5 + 2) ; [0.5, 1]
function quinticEaseInOut (p) {
    if(p < 0.5) {
        return 16 * p * p * p * p * p;
    } else {
        var f = ((2 * p) - 2);
        return  0.5 * f * f * f * f * f + 1;
    }
}
// Modeled after the quintic y = x^5
function quinticEaseIn (p) {
    return p * p * p * p * p;
}
// Modeled after the quintic y = (x - 1)^5 + 1
function quinticEaseOut (p) {
    var f = (p - 1);
    return f * f * f * f * f + 1;
}
// Modeled after half sine wave
function sineEaseInOut (p) {
    return 0.5 * (1 - cos(p * W.Math.PI));
}
// Modeled after quarter-cycle of sine wave
function sineEaseIn (p) {
    return sin((p - 1) * W.Math.PI_2) + 1;
}
// Modeled after quarter-cycle of sine wave (different phase)
function sineEaseOut (p) {
    return sin(p * W.Math.PI_2);
}

}());
