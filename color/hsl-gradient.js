
////
/// W.HSLGradient
// @author Ross Cairns


/**
 *
 * Example:
 *
 * ```
 * var gradient = new W.HSLGradient();
 *
 * gradient.addColorStop(0, { "h":255, "s":0, "l":50 });
 * gradient.addColorStop(1, { "h":255, "s":0, "l":100 });
 * gradient.addColorStop(1, { "h":125, "s":100, "l":100 });
 *
 * var gradientArray = gradient.getGradientArray();
 * $(".box").each(function(i, el) {
 *     $(el).css({
 *          "background-color" : 'hsl('+gradientArray[i].h+','+gradientArray[i].s+'%,'+gradientArray[i].l+'%)'
 *      });
 * });
 * ```
 *
 * Bugs:
 *  toRGBString is not perfect
 *
 * To do:
 * - need propery
 * - make generic gradient class
 * - make colorGradientClass
 *     - make ColorAttributeClass
 *     - make huePolar
 */

// from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
var hue2rgb = function hue2rgb(p, q, t){
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
};

var hslToRgb = function (h, s, l){
    var r, g, b;
    if(s === 0) {
        r = g = b = l; // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255];
};

var HSLtoStringMixin = {
    toRGBString : function () {
        // risky!
        var rgb = hslToRgb((this.h/255)-0.20, this.s/100, this.l/100);
        return "rgb("+~~(rgb[0])+","+~~(rgb[1])+","+~~(rgb[2])+")";
    },
    toHSLString : function () {
        return 'rgb('+~~(this.h)+','+~~(this.s)+','+~~(this.l)+')';
    }
};

function HSLGradient (initColor) {
    this._hStops = [];
    this._sStops = [];
    this._lStops = [];
    this._hasChanged = false;
    this._resolution = 10;
    this._gradientArray = undefined;
}

HSLGradient.prototype.addColorStop = function (position, color) {
    var wrappedPointColor;

    W.extend(color, W.HSLtoStringMixin);

    if (!_.isUndefined(color.h)) {
        wrappedPointColor = {position:position, value:color.h};
        this._hStops.splice(_.sortedIndex(this._hStops, wrappedPointColor, function (pointColor) {
            return pointColor.position;
        }), 0, wrappedPointColor);
        this._hasChanged = true;
    }
    if (!_.isUndefined(color.s)) {
        wrappedPointColor = {position:position, value:color.s};
        this._sStops.splice(_.sortedIndex(this._sStops, wrappedPointColor, function (pointColor) {
            return pointColor.position;
        }), 0, wrappedPointColor);
        this._hasChanged = true;
    }
    if (!_.isUndefined(color.l)) {
        wrappedPointColor = {position:position, value:color.l};
        this._lStops.splice(_.sortedIndex(this._lStops, wrappedPointColor, function (pointColor) {
            return pointColor.position;
        }), 0, wrappedPointColor);
        this._hasChanged = true;
    }
};

HSLGradient.prototype.resolution  = function (res) {
    if(arguments.length) {
        if (res != this._resolution) {
            this._resolution = res;
        }
    }
    return this._resolution;
};

HSLGradient.prototype.compute = function (res) {
    this._resolution = res || this._resolution;
    var computedArray = [];

    for (var i=0; i<this._resolution; i++) {
        var percentOfResultion = i/this._resolution,
            color = {};
        color.h = this._calcPoint(percentOfResultion, this._hStops);
        color.s = this._calcPoint(percentOfResultion, this._sStops);
        color.l = this._calcPoint(percentOfResultion, this._lStops);
        W.extend(color, W.HSLtoStringMixin);

        computedArray.push(color);
    }

    // finish up
    this._gradientArray = computedArray;
    this._hasChange = false;
    return this._gradientArray;
};

HSLGradient.prototype.getGradientArray  = function (res) {
    var resolution = res || this._resolution;
    if (!this._gradientArray || !this._hasChange || this._resolution !== resolution) {
        this.compute(resolution);
    }
    return this._gradientArray;
};

// Notes for improvement.
// - Values should be polar.
// - Color values should be form 0-1 and allow for transformation at the end
// - Could use a polar beizer
HSLGradient.prototype._calcPoint = function (position, stops) {
    if (!stops || stops.length === 0) {
        return 0;
    }

    // see if the array even only has that value
    if (stops.length === 1) {  return stops[0].value; }

    // see if the position is __before__ any set point
    if (position <= _.first(stops).position) { return _.first(stops).value; }
    
    // see if the position is __after__ any set point
    if (position >= _.last(stops).position) { return _.last(stops).value; }

    // find the lower & higher stops in stops
    var lowStop, highStop;
    _(stops).each(function (stop, i) {
        if (position > stop.position) {
            lowStop = stops[i];
            highStop = stops[i+1];
        }
    }, this);

    if (lowStop === undefined) {
        console.log(position);
        console.log(stops);
    }

    // get the positon between stops
    var relativePosition = (position-lowStop.position) / (highStop.position - lowStop.position);

    // get the relative color change
    var relativeChange = highStop.value - lowStop.value;
    var value = (relativeChange * relativePosition) + lowStop.value;

    return value;
};
