// Modeled after half sine wave
function sineEaseInOut (p) {
    return 0.5 * (1 - cos(p * W.Math.PI));
}