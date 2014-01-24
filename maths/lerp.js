// Used for interpolation between two points
Maths.lerp = function (start, end, scalar) {
    return start + (end - start) * scalar;
};
