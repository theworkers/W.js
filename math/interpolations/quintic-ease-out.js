// Modeled after the quintic y = (x - 1)^5 + 1
function quinticEaseOut (p) {
    var f = (p - 1);
    return f * f * f * f * f + 1;
}