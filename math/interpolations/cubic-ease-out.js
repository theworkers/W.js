// Modeled after the cubic y = (x - 1)^3 + 1
function cubicEaseOut (p) {
    var f = (p - 1);
    return f * f * f + 1;
}