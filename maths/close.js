Maths.close = function (num, test, tolerance) {
    tolerance = tolerance || 1;
    return (num > test-tolerance && num < test+tolerance);
};
