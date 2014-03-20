Maths.inRange = function (test, min, max) {
    if (min === max) { return false; }
    if (min > max) {
        return (test < min && test > max);
    } else {
        return (test > min && test < max);
    }
};
