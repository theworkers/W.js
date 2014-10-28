// Modeled after the damped sine wave y = sin(13pi/2*x)*pow(2, 10 * (x - 1))
function elasticEaseIn (p) {
    return Math.sin(13 * ( Math.PI / 2 ) * p) * Math.pow(2, 10 * (p - 1));
}