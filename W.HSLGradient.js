// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

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
     * To do:
     *
     * - make generic gradient class
     * - make colorGradientClass
     *     - make ColorAttributeClass
     *     - make huePolar
     */

    W.HSLtoStringMixin = {
        toHSLString : function () {
            return 'rgb('+~~(this.h)+','+~~(this.s)+','+~~(this.l)+')';
        },
        toHexString : function () {
            return"#"+((256+this.h<<8|this.s)<<8|this.l).toString(16).slice(1);
        }
    };

    W.HSLGradient = W.Object.extend({
        version : 1,
        constructor : function (initColor) {
            this._hStops = [];
            this._sStops = [];
            this._lStops = [];

            this._hasChanged = false;
            this._resolution = 10;
            this._gradientArray = undefined;
        },
        addColorStop : function (position, color) {
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
        },
        resolution : function (res) {
            if(arguments.length) {
                if (res != this._resolution) {
                    this._resolution = res;
                }
            }
            return this._resolution;
        },
        compute : function (res) {
            this._resolution = res || this._resolution;
            var computedArray = [];

            for (var i=0; i<this._resolution; i++) {
                var percentOfResultion = i/this._resolution,
                    color = {};
                color.h = this._calcPoint(percentOfResultion, this._hStops);
                color.s = this._calcPoint(percentOfResultion, this._sStops);
                color.l = this._calcPoint(percentOfResultion, this._lStops);
                

                _.extend(color, W.HSLtoStringMixin);

                computedArray.push(color);
            }

            // finish up
            this._gradientArray = computedArray;
            this._hasChange = false;
            return this._gradientArray;
        },
        getGradientArray : function (res) {
            var resolution = res || this._resolution;
            if (!this._gradientArray || !this._hasChange || this._resolution !== resolution) {
                this.compute(resolution);
            }
            return this._gradientArray;
        },
        // Notes for improvement.
        // - Values should be polar.
        // - Color values should be form 0-1 and allow for transformation at the end
        // - Could use a polar beizer
        _calcPoint : function (position, stops) {

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
        }
    });

}());