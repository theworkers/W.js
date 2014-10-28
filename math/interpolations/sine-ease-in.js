// Modeled after quarter-cycle of sine wave
function sineEaseIn (p) {
    return Math.sin( (p - 1) * ( Math.PI / 2 ) ) + 1;
}