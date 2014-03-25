// Modeled after the quartic y = 1 - (x - 1)^4
function quarticEaseOut( p ) {
    var f = (p - 1);
    return f * f * f * (1 - p) + 1;
}