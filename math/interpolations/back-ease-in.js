// Modeled after the overshooting cubic y = x^3-x*sin(x*pi)
function backEaseIn (p) {
    return p * p * p - p * Math.sin(p * Math.PI);
}