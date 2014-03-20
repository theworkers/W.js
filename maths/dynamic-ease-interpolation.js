// Negative ease produces ease out, positive produces ease in. 
// Range around -1 to 1
function getDynamicallyEasedInterpolation (ease) { 
    return function (p) {
        return dynamicEaseInterpolation(p, ease);
    };
}

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