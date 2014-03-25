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