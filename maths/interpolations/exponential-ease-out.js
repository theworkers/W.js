// Modeled after the exponential function y = -2^(-10x) + 1
function exponentialEaseOut (p) {
    return (p === 1.0) ? p : 1 - Math.pow(2, -10 * p);
}