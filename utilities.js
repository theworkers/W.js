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
var extend = function(obj) {
    W.each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
};
var each = function(obj, iterator, context) {
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
var bind = function bind(fn, scope) {
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

var clone = function (obj) {
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
var use = function (lib, context) {
    lib = (typeof lib == "string") ? W.snippet[lib] : lib;
    if (!context) {
         W.extend(W, lib);
        return lib;
    } else {
        W.extend(context, lib);
    }
    return lib;
};




