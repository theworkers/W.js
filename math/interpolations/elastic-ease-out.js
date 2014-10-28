// Modeled after the damped sine wave y = sin(-13pi/2*(x + 1))*pow(2, -10x) + 1
function elasticEaseOut (p) {
    return Math.sin(-13 * ( Math.PI / 2 ) * (p + 1)) * Math.pow(2, -10 * p) + 1;
}