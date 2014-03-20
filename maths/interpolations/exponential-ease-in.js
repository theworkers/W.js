// Modeled after the exponential function y = 2^(10(x - 1))
function exponentialEaseIn (p) {
    return (p === 0.0) ? p : Math.pow(2, 10 * (p - 1));
}