test("Included", function () {
    ok(W.Math, "Math included");
});

module("W.Math.map");

test("Basic map", function () {
    equal(W.Math.map(0.5, 0, 1, 0, 1),      0.5, "Mapping with input 0:1 ouput 0:1");
    equal(W.Math.map(0.5, 0, 1, 0, 4),      2, "Mapping with input 0:1 ouput 0:4");
    equal(W.Math.map(3.5, 3, 4, 0, 1),      0.5, "Mapping with input 3:4 ouput 0:1");
    equal(W.Math.map(0.5, 0, 1, 3, 4),      3.5, "Mapping with input 0:1 ouput 3:4");
    equal(W.Math.map(0.5, 0, 1, -4, -3),    -3.5, "Mapping with input 0:1 ouput -4:-3");
    equal(W.Math.map(-3.5, -4, -3, 0, 1),   0.5, "Mapping with input 0:1 ouput -4:-3");
    equal(W.Math.map(1, 0, 4, 0, 1),        0.25, "Mapping with input 0:4 ouput 0:1");
});

test("Input above and below input range (no clamping by default)", function () {
    equal(W.Math.map(2, 0, 1, 0, 1),        2, "Mapping with input 0:1 ouput 0:1, above input range");
    equal(W.Math.map(-1, 0, 1, 0, 1),       -1, "Mapping with input 0:1 ouput 0:1, below input range");
});

test("Output range inverted", function () {
    equal(W.Math.map(0.5, 0, 1, 1, 0),      0.5, "Mapping with input 0:1 ouput 1:0");
    equal(W.Math.map(3.5, 3, 4, 1, 0),      0.5, "Mapping with input 3:4 ouput 1:0");
    equal(W.Math.map(-3.5, -4, -3, 1, 0),   0.5, "Mapping with input 0:1 ouput 1:0");
});

test("Clamping", function () {
    // as above "Basic map"
    equal(W.Math.map(0.5, 0, 1, 0, 1, true),      0.5, "Mapping with input 0:1 ouput 0:1");
    equal(W.Math.map(0.5, 0, 1, 0, 4, true),      2, "Mapping with input 0:1 ouput 0:4");
    equal(W.Math.map(3.5, 3, 4, 0, 1, true),      0.5, "Mapping with input 3:4 ouput 0:1");
    equal(W.Math.map(0.5, 0, 1, 3, 4, true),      3.5, "Mapping with input 0:1 ouput 3:4");
    equal(W.Math.map(0.5, 0, 1, -4, -3, true),    -3.5, "Mapping with input 0:1 ouput -4:-3");
    equal(W.Math.map(-3.5, -4, -3, 0, 1, true),   0.5, "Mapping with input 0:1 ouput -4:-3");
    equal(W.Math.map(1, 0, 4, 0, 1, true),        0.25, "Mapping with input 0:4 ouput 0:1");
    // as above "Output range inverted"
    equal(W.Math.map(0.5, 0, 1, 1, 0, true),      0.5, "Mapping with input 0:1 ouput 1:0");
    equal(W.Math.map(3.5, 3, 4, 1, 0, true),      0.5, "Mapping with input 3:4 ouput 1:0");
    equal(W.Math.map(-3.5, -4, -3, 1, 0, true),   0.5, "Mapping with input 0:1 ouput 1:0");
    // should be clamped
    equal(W.Math.map(10, 0, 1, 0, 1, true), 1, "Mapping with input 0:1 ouput 0:1");
    equal(W.Math.map(1.1, 0, 1, 0, 4, true), 4, "Mapping with input 0:1 ouput 0:4");
    equal(W.Math.map(5, 0, 4, 0, 1, true),  1, "Mapping with input 0:4 ouput 0:1");
    equal(W.Math.map(-1, 0, 4, -1, 1, true),  -1, "Mapping with input 0:4 ouput -1:1");
    equal(W.Math.map(5, 0, 4, -10, -7, true),  -7, "Mapping with input 0:4 ouput -10:-17");
    equal(W.Math.map(5, 0, 4, -7, -10, true),  -10, "Mapping with input 0:4 ouput -10:-17");
});

test("Easing", function () {
    equal("no tests yet", "nope", "stub!");
});

module("W.Math.close");

test("Basic close", function () {
    equal("no tests yet", "nope", "stub!");
});

module("W.Math.clamp");


test("Clamping", function () {
    equal(W.Math.clamp(0,0,1), 0, "No clamping low");
    equal(W.Math.clamp(5,5,10), 5, "No clamping low");
    equal(W.Math.clamp(-5,-5,10), -5, "No clamping low");

    equal(W.Math.clamp(1,0,1),1, "No clamping high");
    equal(W.Math.clamp(10,5,10), 10, "No clamping high");
    equal(W.Math.clamp(10,-5,10), 10, "No clamping high");

    equal(W.Math.clamp(0.5,0,1), 0.5, "No clamping high");
    equal(W.Math.clamp(6,5,10), 6, "No clamping high");
    equal(W.Math.clamp(-1,-5,10), -1, "No clamping high");
    equal(W.Math.clamp(2,-5,10), 2, "No clamping high");

    equal(W.Math.clamp(2,0,1),1, "Clamping high");
    equal(W.Math.clamp(20,5,10), 10, "Clamping high");
    equal(W.Math.clamp(20,-5,10), 10, "Clamping high");

    equal(W.Math.clamp(-100,0,1), 0, "Clamping low");
    equal(W.Math.clamp(0,5,10), 5, "Clamping low");
    equal(W.Math.clamp(-15,-5,10), -5, "Clamping low");
});

