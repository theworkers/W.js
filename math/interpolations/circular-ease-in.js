// Modeled after shifted quadrant IV of unit circle
function circularEaseIn (p) {
    return 1 - Math.sqrt(1 - (p * p));
}