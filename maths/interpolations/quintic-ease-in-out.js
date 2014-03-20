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