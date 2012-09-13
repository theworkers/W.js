//      ________       _       __           __                        ___
//     /_  __/ /_  ___| |     / /___  _____/ /_____  __________      /  /
//      / / / __ \/ _ \ | /| / / __ \/ ___/ //_/ _ \/ ___/ ___/     /  /
//     / / / / / /  __/ |/ |/ / /_/ / /  / ,< /  __/ /  (__  )    _/ ./
//    /_/ /_/ /_/\___/|__/|__/\____/_/  /_/|_|\___/_/  /____/    / ./
//                                                      .net    / /
//                                                         .   /./
//    W.js - http://theworkers.github.com/W.js/       ..   |  //  .
//                                                 .   \\  | /' .'  .
//                                                  ~-. `     ' .-~
//
//    Portions of W.js are inspired or borrowed from:
//     - [underscore.js](http://underscorejs.org/)
//     - [backbone.js](http://backbonejs.org/)
//     - [pathjs](https://github.com/mtrpcic/pathjs)
//
(function () {
    // module setup inspired by underscore.js
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    /** Current version. */
    W.version = '2.1.0';

    // Inspired/taken from underscore.js
    // Underscore.js 1.3.1
    // (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
    // Underscore is freely distributable under the MIT license.
    // Portions of Underscore are inspired or borrowed from Prototype,
    // Oliver Steele's Functional, and John Resig's Micro-Templating.
    // For all details and documentation:
    // http://documentcloud.github.com/underscore
    var nativeForEach   = Array.prototype.forEach,
        nativeBind      = Function.prototype.bind,
        slice           = Array.prototype.slice,
        breaker         = {};
    W.extend = function(obj) {
        W.each(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    };
    W.each = function(obj, iterator, context) {
        if (obj === null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (_.has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };
    var ctor = function(){};
    /**
     * Bind function to scope. Useful for events.
     * @param   {Function}   fn     function
     * @param   {Object}     scope    Scope of the function to be executed in
     * @example $("div").fadeIn(100, W.bind(this, this.transitionDidFinish));
    */
    W.bind = function bind(fn, scope) {
        var bound, args;
        if (fn.bind === nativeBind && nativeBind) return nativeBind.apply(fn, slice.call(arguments, 1));
        args = slice.call(arguments, 2);
        // @todo: don't link this
        return bound = function() {
            if (!(this instanceof bound)) return fn.apply(scope, args.concat(slice.call(arguments)));
            ctor.prototype = fn.prototype;
            var self = new ctor();
            var result = fn.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };

    W.clone = function (obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    };

    // for help with snippets, and
    // for people who don't like namespacing
    // reservse bind. If no context will bind to W.
    W.use = function (lib, context) {
        lib = (typeof lib == "string") ? W.snippet[lib] : lib;
        if (!context) {
             W.extend(W, lib);
            return lib;
        } else {
            W.extend(context, lib);
        }
        return lib;
    };

    /**
    * Asynchronous Loop
    *
    * @param   {Number}    iterations      Number of times to run
    * @param   {Function}  fn            Function to execute in  iteration.
    *                                      Must call loop.next() when finished.
    * @param   {Function}  callback        On loop finshed call back
    *
    * @example
    *      W.aloop(10,
    *           function (index, next, end) {
    *               log(index);
    *               next();
    *           },
    *           function () {
    *               log('finished');
    *           }
    *       );
    */
    W.loop = function (iterations, fn, callback) {
        var index = 0;
        var done = false;
        var end =  function() {
            done = true;
            callback();
        };
        var next = function() {
            if (done) { return; }
            if (index < iterations) {
                index++;
                fn(index-1, next, end);
            } else {
                done = true;
                if (callback) { callback(); }
            }
        };
        next();
        return next;
    };
})();
////
/// W
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

    // From Backbone
    // (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    // Backbone may be freely distributed under the MIT license.
    var ctor = function(){};
    var inherits = function(parent, protoProps, staticProps) {
        var child;
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ parent.apply(this, arguments); };
        }
        W.extend(child, parent);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        if (protoProps) W.extend(child.prototype, protoProps);
        if (staticProps) W.extend(child, staticProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };

    // The self-propagating extend function that Backbone classes use.
    var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };

    W.Object = function () {};
    W.Object.extend = extend;
}());
////
/// W.HSLGradient
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


    W.HSLtoStringMixin = {
        toRGBString : function () {
            // risky!
            var rgb = hslToRgb((this.h/255)-0.20, this.s/100, this.l/100);
            return "rgb("+~~(rgb[0])+","+~~(rgb[1])+","+~~(rgb[2])+")";
        },
        toHSLString : function () {
            return 'rgb('+~~(this.h)+','+~~(this.s)+','+~~(this.l)+')';
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
                W.extend(color, W.HSLtoStringMixin);

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

}());////
/// W.Router
// @author Ross Cairns
// Based on [pathjs](https://github.com/mtrpcic/pathjs) by Mike Trpcic. Stripped to not use the location hash matching

(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    W.Router = W.Object.extend({
        version :  "2.0.0",
        constructor : function () {
            this.routes = {
                fallback : null
            };
        },
        map : function (path) {
            if (this.routes.hasOwnProperty(path)) {
                return  this.routes[path];
            } else {
                var route = new W.Route({path:path, router:this});
                this.routes[path] = route;
                return route;
            }
        },
        fallback : function (fn) {
             return this.routes.fallback = fn;
        },
        match : function (path) {
            var params = {};
            var route = null;
            var i = null;
            for (route in this.routes) {
                if (route !== null && route !== undefined) {
                    var compare = path; 
                    if (route.indexOf(":") > -1) {
                        for (i = 0; i < route.split("/").length; i++) {
                            if ((i < compare.split("/").length) && (route.split("/")[i].charAt(0) === ":")) {
                                params[route.split('/')[i].replace(":", '')] = compare.split("/")[i];
                                compare = compare.replace(compare.split("/")[i], route.split("/")[i]);
                            }
                        }
                    }
                    if (route === compare) {
                        this.routes[route].params = params;
                        return  this.routes[route];
                    }
                }
            }
            return false;
        },
        trigger : function (path) {
            var match =  this.match(path);
            if (match) {
                match.run();
            } else {
                if (this.routes.fallback !== null) {
                    this.routes.fallback();
                }
            }
            return this;
        }
    });

    W.Route = W.Object.extend({
        constructor : function (options) {
            this.path = options.path;
            this.router = options.router;

            this.action = null;
            this.params = {};
        },
        to : function (fn, context) {
            if (context) {
                fn = W.bind(fn, context);
            }
            this.action = fn;
            return this.router;
        },
        run : function () {
            this.router.routes[this.path].action(this.router.routes[this.path].params);
        }
    });

 }());////
/// W.Timer
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

    W.Timer = W.Object.extend({
        constructor : function (options) {
            W.extend(this, W.EventMixin);
            this.options = W.extend({
                updateTime : 1000,
                loops : true,
                eventName : "fired",
                stoppedEventName : "stop",
                restartEventName : "restart"
            }, options);
            this.setIntervalID = undefined;
            this._count = 0; 
        },
        restart : function () {
            clearInterval(this._intervalId);
            this.trigger("restarting", this);
            this.start();
            return this;
        },
        start : function () {
            if (this._intervalId) { return false; }
            this.lastUpdate  = new Date().getTime();
            this._intervalId = setInterval(W.bind(this.update, this), 10 );
            return true;
        },
        // Blackberry uses stop
        stopTimer : function  () {
            if (this._intervalId) {
                clearInterval(this._intervalId);
                this._intervalId = undefined;
                this.trigger(this.options.stoppedEventName, this);
                return true;
            }
            return false;
        },
        update : function () {
            var currentTime = new Date().getTime();
            if (this.options.updateTime + this.lastUpdate < currentTime) {
                this._count++;
                this.trigger(this.options.eventName, this);
                if (this.options.loops) {
                    this.lastUpdate = currentTime;
                } else {
                    this.stopTimer();
                }
            }
            return this;
        },
        count : function () {
            return this._count;
        },
        resetCounter : function  () {
            this._count = 0;
        }
    });

}());////
/// W.TouchEventViewMixin
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
     * Add touch events to a view.
     *
     * @example
     *          W.extend(this, W.TouchEventViewMixin);
     *          this.enableTouchEvents();
     *          this.bind("touchStart", this.touchStart, this);
     *
     */
    W.TouchEventViewMixin = {
        version : 1,
        enableTouchEvents : function () {
            this.el.ontouchstart = _.bind(function (event) {
                this.trigger("touchStart", event);
            }, this);
            this.el.ontouchmove = _.bind(function (event) {
                this.trigger("touchMove", event);
            }, this);
            this.el.ontouchend = _.bind(function (event) {
                this.trigger("touchEnd", event);
            }, this);
            this.el.ontouchcancel = _.bind(function (event) {
                this.trigger("touchCancel", event);
            }, this);
        }
    };
}());

////
/// W.EventMixin
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

    W.EventMixin = {
        version : 2,
        /** Add event listener. Callback will recieve (context, details) arguments */
        on : function (/** String */ event, /** Function */ callback, /** Object */ scope) {
            if (typeof callback !== 'function') {
                throw "callback not function";
            }
            this.events()[event] = this.events()[event] || [];
            if (this.events()[event]) {
                if (scope) {
                    this.events()[event].push(W.bind(callback,scope));
                } else {
                    this.events()[event].push(callback);
                }
            }
        },
        /** Remove event listener */
        off : function (/** String */ event, /** Function */ callback) {
            if (!callback) {
                throw "No callback function given for 2nd argument of `removeEventlistener` so can not remove event listener. Be sure to store the event callback as a varible if you wish to remove it";
            }
            if (this.events()[event]) {
                var listeners = this.events()[event];
                for (var i = listeners.length-1; i>=0;--i){
                    if (listeners[i] === callback) {
                        listeners.splice(i,1);
                        return true;
                    }
                }
            }
            return false;
        },
        /** Fire the event  */
        trigger : function (event, eventData) {
            var data = eventData || {};
            if (this.events()[event]) {
                var listeners = this.events()[event], 
                    len = listeners.length;
                if (len <= 0) { return false; }
                while (len--) {
                    if (typeof listeners[len]==='function') {
                        listeners[len](data);  //callback with self
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        /** get all the events  */
        events : function () {
            this.eventsArray = this.eventsArray || [];
            return this.eventsArray;
        }
    };

    W.EventMixin.version = 2;

}());////
/// W.DisplayViewMixin
// @author Ross Cairns
// @notes  Not suitable for heavy usage (i.e. particles) as produces 
//         many object with in turn will cause big
//         garbage collections delays 
(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }
    
    W.DisplayViewMixin = {
        version : 1,
        setPosition : function (x, y) { // or setXY(array) or setXY({x:y:})
            if (typeof x === "[object Array]") {
                this.x(x[0]);
                this.y(y[1]);
            } else if (typeof x === "number") {
                this.x(x);
                this.y(y);
            } else {
                this.x(x.x);
                this.y(x.y);
            }
            return this;
        },
        setSize : function (width, height) { // or setSize(Array) or setSize({width:height}) or setSize(DOMElement)
            if (!!width.tagName && typeof jQuery === 'function') {
                this.width(jQuery(width).width());
                this.height(jQuery(width).height());
            } else if (!!width.tagName) {
                this.width = width.width;
                this.height = width.height;
            } else if (typeof width === "number") {
                this.width(width);
                this.height(height);
            } else if (typeof width === "array") {
                this.width(width[0]);
                this.height(width[1]);
            } else if (typeof(width) == 'function') {
                this.width(width());
                this.height(height());
            } else {
                var obj = width;
                this.width(typeof(obj.width) == 'function' ? obj.width() : obj.width);
                this.height(typeof(obj.height) == 'function' ? obj.height() : obj.height);
            }
            return this;
        },
        x : function (x) {
            if (arguments.length > 0) { this._x = x; }
            if (typeof this._x === "undefined") { this._x = 0; }
            return this._x;
        },
        y : function (y) {
            if (arguments.length > 0) { this._y = y; }
            if (typeof this._y === "undefined") { this._y = 0; }
            return this._y;
        },
        width : function (width)  {
            if (arguments.length > 0) { this._width = width; }
            if (typeof this._width === "undefined") { this._width = 0; }
            return this._width;
        },
        height : function (height) {
            if (arguments.length > 0) { this._height = height; }
            if (typeof this._height === "undefined") { this._height = 0; }
            return this._height;
        }
    };

}());

////
/// W.CountedCallbackMixin
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

    W.CountedCallbackMixin = {
        getCountedCallback : function () {
            var self = this;
            self._totalCallbacks =  self._totalCallbacks || 0;
            self._totalCallbacks++;
            // saves a refernce for unbinding from events
            this.callbackComplete =  this.callbackComplete || function () { 
                if (!--self._totalCallbacks) {
                    // executed when all the callbacks are finished
                    self.trigger("allCallbacksComplete", self);
                }
            };
            return this.callbackComplete;
        }
    };


}());////
/// W.snippet.dom
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
    W.snippet = W.snippet || {};

    W.snippet.dom = W.dom || {};
    W.snippet.dom.version = "2.0.0";

    W.snippet.dom.viewportSize = function () {
		var e = window, 
			a = 'inner';
		if ( !( 'innerWidth' in window ) ){
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {width:e[a+'Width'],height:e[ a+'Height']};
	}; 

    // @note webkit only
    // @requires W.snippets.math
    // W.cssGradientString().add(0, "#FF0000").add(0, "#00FF00").add(0, "#0000FF").get();
    W.snippet.dom.cssGradientString = function(stops) {
        var values = [];
        var _direction = "left"; // "top", "right", "bottom", "left", "-45.0deg"
        var promise = {
            direction : function (direction) {
                _direction = direction;
                return promise;
            },
            add : function (precentage, value) {
                values.push([precentage, value]);
                return promise;
            },
            get : function () {
                var str = "-webkit-linear-gradient(" + _direction + ", ";
                for (var i = 0; i<values.length; i++) {
                    str += values[i][1] + " " + values[i][0] + "%";
                    if (i<values.length-1) { str += ","; }
                }
                str += ")";
                return str;
            }
        };
        return promise;
    };


    var privateNamespace = {};
    (function(namespace){
            /*
             * Modified from 
             * Canvas Context2D Wrapper <http://github.com/millermedeiros/CanvasContext2DWrapper>
             * Released under WTFPL <http://sam.zoy.org/wtfpl/>.
             * @author Miller Medeiros <http://millermedeiros.com>
             * @version 1.0 (2010/08/08)
             */
        var _context2DMethods = 'arc arcTo beginPath bezierCurveTo clearRect clip closePath createImageData createLinearGradient createRadialGradient createPattern drawFocusRing drawImage fill fillRect fillText getImageData isPointInPath lineTo measureText moveTo putImageData quadraticCurveTo rect restore rotate save scale setTransform stroke strokeRect strokeText transform translate'.split(' '),
            _context2DProperties = 'canvas fillStyle font globalAlpha globalCompositeOperation lineCap lineJoin lineWidth miterLimit shadowOffsetX shadowOffsetY shadowBlur shadowColor strokeStyle textAlign textBaseline'.split(' ');
        function chainMethod(fn, scope, chainReturn){
            return function(){
                return fn.apply(scope, arguments) || chainReturn;
            };
        }
        function chainProperty(propName, scope, chainReturn){
            return function(value){
                if(typeof value === 'undefined'){
                    return scope[propName];
                }else{
                    scope[propName] = value;
                    return chainReturn;
                }
            };
        }
        namespace.Context2DWrapper = function(target){
            var n = _context2DMethods.length, curProp;
            this.context = target;
            while(n--){
                curProp = _context2DMethods[n];
                this[curProp] = chainMethod(target[curProp], target, this);
            }
            n = _context2DProperties.length;
            while(n--){
                curProp = _context2DProperties[n];
                this[curProp] = chainProperty(curProp, target, this);
            }
        };
    }(privateNamespace));

    W.snippet.dom.wrappedContext = function (context) {
        return new privateNamespace.Context2DWrapper(context);
    };

}());////
/// W.snippet.math
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
    W.snippet = W.snippet || {};

    W.snippet.math = W.math || {};
    W.snippet.math.version = "2.0.0";

    W.snippet.math.clipNormalized = function (x, min, max) { // or (value, max), or (value)
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

    W.snippet.math.fitScaleRatio = function (width, height, boundsWidth, boundsHeight) {
        var widthScale = boundsWidth / width;
        var heightScale = boundsHeight / height;
        return Math.min(widthScale, heightScale);
    };

    W.snippet.math.map = function (value, inputMin, inputMax, outputMin, outputMax, clamp) {
        var outVal = ((value-inputMin)/(inputMax-inputMin)*(outputMax-outputMin)+outputMin);
        if (clamp) {
            if (outputMax<outputMin) {
                if (outVal<outputMax) {
                    outVal = outputMax;
                } else if (outVal>outputMin) {
                    outVal = outputMin;
                }
            } else {
                if (outVal>outputMax) {
                    outVal = outputMax;
                } else if (outVal<outputMin) {
                    outVal = outputMin;
                }
            }
        }
        return outVal;
    };

    W.snippet.math.randomBetween = function (from, to) {
        return W.snippet.math.map(Math.random(), 0, 1, from, to);
    };

    // @todo test
    W.snippet.math.close = function (num, test, tolerance) {
        tolerance = tolerance || 1;
        return (num > test-tolerance && num < test+tolerance);
    };

     // @todo accept numbers and test
    W.snippet.math.angleBetween = function (center, point) {
        var angle = Math.atan2(center.x-point.x,center.y-point.y)*(180/Math.PI);
        if(angle < 0) {
            angle = Math.abs(angle);
        } else {
            angle = 360 - angle;
        }
        return angle;
    };

    // @todo accept numbers and test
    W.snippet.math.distance = function (obj1, obj2) {
        var x = obj2.x - obj1.x;
        var y = obj2.y - obj1.y;
        return Math.sqrt((x*x)+(y*y));
    };

    // Fisher-Yates shuffle.
    // source http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
    W.snippet.math.shuffleArray = function (arr, leaveOriginalUntouched) {
        var array = (leaveOriginalUntouched) ? arr.slice(0) : arr;
        var tmp, current, top = array.length;
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    };

    W.snippet.math.colorStringToHex = function (color) {
        if (color.substr(0, 1) === '#') {
            return color;
        }
        var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
        
        var red = parseInt(digits[2], 10);
        var green = parseInt(digits[3], 10);
        var blue = parseInt(digits[4], 10);
        
        var rgb = blue | (green << 8) | (red << 16);
        return digits[1] + '#' + rgb.toString(16);
    };

    W.snippet.math.colorValuesToHex = function (r, g, b) {

        var red = parseInt(r, 10);
        var green = parseInt(g, 10);
        var blue = parseInt(b, 10);
        
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + rgb.toString(16);
    };
}());////
/// W.ColorUtil
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

    W.RandomColorSequence = W.Object.extend({
        constructor : function (options) {
            this.r = Math.random() * 255;
            this.g = Math.random() * 255;
            this.b = Math.random() * 255;
            this.rStep = Math.random() * 10 - 5;
            this.gStep = Math.random() * 10 - 5;
            this.bStep = Math.random() * 10 - 5;
            
        },
        start : function () {
            if (!this.timer) {
                this.timer = new W.Timer({
                    updateTime : 10
                });
                this.timer.on("fired", this.update, this);
            }
            this.timer.start();
            return this;
        },
        stop : function () {
            this.timer.stop();
            this.timer.off("fired", this.update);
            this.timer = undefined;
            return this;
        },
        update : function () {
            this.r += this.rStep;
            this.g += this.gStep;
            this.b += this.bStep;
            if (this.r>255) { this.r=0+(this.r-255); }
            if (this.r<0) { this.r=255-this.r; }
            if (this.g>255) { this.g=0+(this.g-255); }
            if (this.g<0) { this.g=255-this.g; }
            if (this.b>255) { this.b=0+(this.b-255); }
            if (this.b<0) { this.b=255-this.b; }
            return this;
        },
        getHex : function () {
            return W.colorValuesToHex(this.r&this.r, this.g&this.g, this.b&this.b);
        }
    });

    /*
    // modified from https://raw.github.com/gist/1590079/bb457e888c3b6ce4d16f5e8ebf767bd4302a7bea/gistfile1.js

    W.ColorUtil = {

        version : 0.1,

        hslObjectToRGBObject : function (hsl) {
            return W.ColorUtil.hslToRGBObject(hsl.h, hsl.s, hsl.l);
        },

        hslObjectToHex : function (hsl) {
            return W.ColorUtil.rgbObjectToHex(W.ColorUtil.hslObjectToRGBObject(hsl));
        },

        hslToHex : function (h,s,l) {
            console.log(h,s,l, " = (rbg) ", W.ColorUtil.hslToRGBObject(h, s, l).r, W.ColorUtil.hslToRGBObject(h, s, l).g, W.ColorUtil.hslToRGBObject(h, s, l).b);
            return W.ColorUtil.rgbObjectToHex( W.ColorUtil.hslToRGBObject(h, s, l) );
        },

        rgbToHex : function (r,g,b) {
            return"#"+((256+r<<8|g)<<8|b).toString(16).slice(1);
        },

        rgbObjectToHex : function (rgb) {
            return  W.ColorUtil.rgbToHex(rgb.r, rgb.g, rgb.h);
        },

        hslToRGBObject : function (h, s, l) {
            var m1, m2, hue, r, g, b;
            s /=100;
            l /= 100;
            if (s === 0) {
                r = g = b = (l * 255);
            } else {
                if (l <= 0.5) {
                    m2 = l * (s + 1);
                } else {
                    m2 = l + s - l * s;
                }
                m1 = l * 2 - m2;
                hue = h / 360;
                r = W.ColorUtil.hueToRGB(m1, m2, hue + 1/3);
                g = W.ColorUtil.hueToRGB(m1, m2, hue);
                b = W.ColorUtil.hueToRGB(m1, m2, hue - 1/3);
            }
            return {r: r, g: g, b: b};
        },

        hueToRGB : function (m1, m2, hue) {
            var v;
            if (hue < 0) {
                hue += 1;
            } else if (hue > 1) {
                hue -= 1;
            }
            if (6 * hue < 1) {
                v = m1 + (m2 - m1) * hue * 6;
            } else if (2 * hue < 1) {
                v = m2;
            } else if (3 * hue < 2) {
                v = m1 + (m2 - m1) * (2/3 - hue) * 6;
            } else {
                v = m1;
            }
            return 255 * v;
        },

        rgbStringToHex : function (color) {
            if (color.substr(0, 1) === '#') {
                return color;
            }
            var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color),
                red = parseInt(digits[2], 10),
                green = parseInt(digits[3], 10),
                blue = parseInt(digits[4], 10),
                rgb = blue | (green << 8) | (red << 16);
            return digits[1] + '#' + rgb.toString(16);
        },

        hexToRGBObject : function (hex) {

            if (hex[0] == '#') {
              hex = hex.substr(1, hex.length-1);
            }

            if (hex.length == 6) {
                rgb = [
                    hex[0]+hex[1],
                    hex[2]+hex[3],
                    hex[4]+hex[5]
                ];
            } else if (hex.length == 3) {
                rgb = [
                    hex[0]+hex[0],
                    hex[1]+hex[1],
                    hex[2]+hex[2]
                ];
            }
            else {
                return false;
            }

            return {
                r : parseInt(rgb[0],16),
                g : parseInt(rgb[1],16),
                b : parseInt(rgb[2],16)
            };
        },

        rgbObjectToHSLObject : function (rgb){
            rgb.r /= 255;
            rgb.g /= 255;
            rgb.b /= 255;
            var max = Math.max(rgb.r, rgb.g, rgb.b), min = Math.min(rgb.r, rgb.g, rgb.b);
            var h, s, l = (max + min) / 2;

            if(max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case rgb.r: h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0); break;
                    case rgb.g: h = (rgb.b - rgb.r) / d + 2; break;
                    case rgb.b: h = (rgb.r - rgb.g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h:Math.floor(h * 360),
                s:Math.floor(s * 100),
                l:Math.floor(l * 100)
            };
        },

        hexToHSLString : function (hex){
            var hsl = W.ColorUtil.rgbObjectToHSLObject(W.ColorUtil.HexToRGBObject(hex));
            return 'hsl('+hsl.h+','+hsl.s+'%,'+hsl.l+'%)';
        },

        conall : function (str){
            var colors = str.match(/#(\w+)/g);
            for (var i = colors.length - 1; i >= 0; i--) {
                str = str.replace(colors[i], W.ColorUtil.HexToRGBObject(colors[i]));
            }
            return str;
        }

    };
    */

  }());////
/// W.snippet.social
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
    W.snippet = W.snippet || {};

    W.snippet.social = W.social || {};
    W.snippet.social.version = "2.0.0";

    ///
    // Twitter
    W.snippet.social.twitter = W.snippet.social.tiwtter || {};
    /** tweet link and/or message */
    W.snippet.social.twitter.tweet = function (options) {
        var string = W.use("string");
        if (!string.hasTld(window.location.href) && console) {
            console.warn("window.location.href does not have a top level domain, will not tweet");
            return;
        }
        var twitterurl = "https://twitter.com/share?";
        if (options && options.message) { twitterurl += "&text=" + encodeURIComponent(string.trim(options.message)); } else { throw "no message to send to twitter"; }
        if (options && options.link) { twitterurl += "&url="+options.link; }
        window.open(twitterurl, 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, menubar=0, directories=0, scrollbars=0'); //location=0, 
    };

    ///
    // Facebook
    W.snippet.social.facebook = W.snippet.social.facebook || {};
    /** tweet link and/or message */
    W.snippet.social.facebook.post  = function (options) {
        var string = W.use("string");
        if (!string.hasTld(window.location.href) && console) {
            console.warn("window.location.href does not have a top level domain, will not post on facebook");
            return;
        }
        var facebookurl = "http://www.facebook.com/sharer.php?";
        if (options && options.link) { facebookurl += "&u="+ encodeURIComponent(string.trim(options.link)); }
        if (options && options.message) { facebookurl += "&t="+ encodeURIComponent(string.trim(options.message)); }
        console.log(facebookurl);
        window.open(facebookurl, 'facebookwindow', 'height=400, width=800, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, menubar=0, directories=0, scrollbars=0'); //location=0, 
    };

}());////
/// W.snippet.string
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
    W.snippet = W.snippet || {};

    W.snippet.string = W.string || {};
    W.snippet.string.version = "2.0.0";

    /** Add Commas to number */
    W.snippet.string.addCommas = function (number) {
        number = '' + number;
        if(number.indexOf(",") > 0) { return number; }
        if (number.length > 3) {
            var mod = number.length % 3;
            var output = (mod > 0 ? (number.substring(0,mod)) : '');
            for (i=0 ; i < Math.floor(number.length / 3); i++) {
                if ((mod === 0) && (i === 0)) {
                    output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
                } else {
                    output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
            }
            return (output);
        }
        else return number;
    };

    /** String has string */
    W.snippet.string.contains = function (str, test) { return (str.indexOf(test) != -1 ); };
    
    /** String trim leading and ending whitespace */
    W.snippet.string.trim = function(str) { return (str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };
    
    /** String string starts with 
    http://stackoverflow.com/a/646643/179015 */
    W.snippet.string.startsWith = function(str, test) { return str.slice(0, test.length) == test; };
    /** String string ends with 
    http://stackoverflow.com/a/646643/179015 */
    W.snippet.string.endsWith = function(str, test) { return str.slice(-test.length) == test; };

    /** String contains a top level domain */
    W.snippet.string.hasTld = function(str) { var result = str.match(/[a-z0-9.\-]+[.][a-z]{1,4}[\/:]?([\d]{1,5})?/m); return (!!result); };

}());////
/// W.List
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

    // inspired by 
    // http://blog.jcoglan.com/2007/07/23/writing-a-linked-list-in-javascript/
    W.List = W.Object.extend({
        constructor : function (options) {
            this.length = 0;
            this.first = null;
            this.last = null;
        },
        append : function(obj) {
            if (this.first === null) {
                obj.prev = obj;
                obj.next = obj;
                this.first = obj;
                this.last = obj;
            } else {
                obj.prev = this.last;
                obj.next = this.first;
                this.first.prev = obj;
                this.last.next = obj;
                this.last = obj;
            }
            ++this.length;
            return this;
        },
        insertAfter : function(after, obj) {
            obj.prev = after;
            obj.next = after.next;
            after.next.prev = obj;
            after.next = obj;
            if (obj.prev == this.last) { 
                this.last = obj; 
            }
            ++this.length;
            return this;
        },
        remove : function (obj) {
            if (this.length > 1) {
                obj.prev.next = obj.next;
                obj.next.prev = obj.prev;
                if (obj == this.first) { this.first = obj.next; }
                if (obj == this.last) { this.last = obj.prev; }
            } else {
                this.first = null;
                this.last = null;
            }
            obj.prev = null;
            obj.next = null;
            --this.length;
            return this;
        },
        at : function (index) {
            if (index >= this.length) {
                return false;
            }
            var obj = this.first;
            if (index===0) {
                return obj;
            }  
            for (var i=0; i<index;++i) {
                obj = obj.next;
            }
            return obj;
        },
        each : function (fn, context) {
            var bound = (context) ? W.bind(fn, context) : fn;
            var next = this.first;
            for (var i=0;i<this.length;++i) {
                bound(next, i);
                next = next.next;
            }
            return this;
        }
    });


}());