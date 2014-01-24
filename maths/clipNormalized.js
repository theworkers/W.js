Maths.clipNormalized = function (x, min, max) { // or (value, max), or (value)
    if (arguments.length === 2) {
        max = min;
        min = 0;
    } else if (arguments.length === 1) {
        max = 1;
        min = 0;
    }
    if (x<min) { return min; }
    if (x>max) { return max; }
    return x;
};