// Modeled after quarter-cycle of sine wave
function sineEaseIn (p) {
    return sin((p - 1) * W.Math.PI_2) + 1;
}