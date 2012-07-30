// module("W.HSLGradient");
var gradient = new W.HSLGradient();

test("Created", function () {

    // Setup
    ok(gradient, "Creating gradient object");

    // Add colorstop
    var firstColor = { h:0, s:39, l:12 },
        firstPoint = 0.435;
    ok(gradient.addColorStop(firstPoint, firstColor)===undefined, "Adding first color");

    // Check the internal arrays
    equal(gradient._hStops.length, 1, "H stop added");
    equal(gradient._sStops.length, 1, "S stop added");
    equal(gradient._lStops.length, 1, "L stop added");

    // test internal arrays agains what was given. not h is O but still needs to be added
    deepEqual({
        point: gradient._hStops[0].position,
        color: _.extend({
            h: gradient._hStops[0].value,
            s: gradient._sStops[0].value,
            l: gradient._lStops[0].value
        }, W.HSLtoStringMixin)
    },
    {   point: firstPoint,
        color: firstColor
    },
        "Adding color stop. Note having to add a W.HSLtoStringMixin"
    );

    // Add colorstop
    var secondColor = { h:132, s:100, l:0 },
        secondPoint = 0.1;
    ok(gradient.addColorStop(secondPoint, secondColor)===undefined, "Adding second color");

    // Add colorstop
    var thirdColor = { h:0, s:39, l:100 },
        thirdPoint = 0.8;
    ok(gradient.addColorStop(thirdPoint, thirdColor)===undefined, "Adding third color");

    // Add part colorstop
    var fourthColor = { h:220 },
        fourthPoint = 0.9;
    ok(gradient.addColorStop(fourthPoint, fourthColor)===undefined, "Adding fourth color");

    // Check the internal arrays
    equal(gradient._hStops.length, 4, "Other H stops added");
    equal(gradient._sStops.length, 3, "Other S stops added");
    equal(gradient._lStops.length, 3, "Other L stops added");

    // Check to see the right values went where they should
    equal(_.last(gradient._hStops).value, 220, "Checking last H is 220");
    equal(_.first(gradient._lStops).value, 0, "Checking last L is 0");
    equal(gradient._sStops[1].value, 39, "Checking middle S is 39");

    // Set default resolution
    equal(gradient.resolution(), 10, "Default resolution is 10");
    gradient.resolution(8);
    equal(gradient.resolution(), 8, "Default resolution set to 8");

    // test the H Stops only
    ok(gradient._calcPoint(0.2, gradient._hStops), "Caluated 1 point in the array");
    ok(_.isNumber(gradient._calcPoint(0.5, gradient._hStops)), "Caluated 1 point in the array");
    ok(gradient._calcPoint(0.85, gradient._hStops), "Caluated 1 point in the array");

    // Compute the values
    ok(gradient.compute(), "Computing gradient");

});

var getByClass = function (className) {
    var descendants=document.getElementsByTagName('*'), i=-1, e, result=[];
    while ((e=descendants[++i])) {
        if ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) {
            result.push(e); 
        }
    }
    return result;
};

window.onload = function () {

    var gradient = new W.HSLGradient();

    test("Empty", function () {
        ok(gradient.compute(), "Computing empty gradient");
        gradient.addColorStop(0, { "h":255, "s":0, "l":50 });
        ok(gradient.compute(), "Computing one gradient stop");

    });

    test("Display", function () {
        gradient.addColorStop(1, { "h":255, "s":0, "l":100 });
        gradient.addColorStop(1, { "h":125, "s":100, "l":100 });
        ok(gradient.compute(getByClass("box").length), "Computing a gradient for each div.box");
        
        var gradientArray = gradient.getGradientArray();
        ok(gradientArray && gradientArray.length > 0, "Got gradients");

        W.each(getByClass("box"), function(el, i) {
           el.style.backgroundColor = gradientArray[i].toRGBString();
        });

        W.each(getByClass("box2"), function(el, i) {
            el.style.backgroundColor = 'hsl('+gradientArray[i].h+','+gradientArray[i].s+'%,'+gradientArray[i].l+'%)';
        });

        ok("colors set", "Colors set on DOM");

    });
};

