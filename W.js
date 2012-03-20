//      ________       _       __           __                        ___
//     /_  __/ /_  ___| |     / /___  _____/ /_____  __________      /  /
//      / / / __ \/ _ \ | /| / / __ \/ ___/ //_/ _ \/ ___/ ___/     /  /
//     / / / / / /  __/ |/ |/ / /_/ / /  / ,< /  __/ /  (__  )    _/ ./
//    /_/ /_/ /_/\___/|__/|__/\____/_/  /_/|_|\___/_/  /____/    / ./
//                                                      .net    / /
//                                                         .   /./
//    Copyright The Workers Ltd. 2012                 ..   |  //  .
//                                                 .   \\  | /' .'  .
//                                                  ~-. `     ' .-~
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
    W.version = '2';

    // From underscore.js
    // Underscore.js 1.3.1
    // (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
    // Underscore is freely distributable under the MIT license.
    // Portions of Underscore are inspired or borrowed from Prototype,
    // Oliver Steele's Functional, and John Resig's Micro-Templating.
    // For all details and documentation:
    // http://documentcloud.github.com/underscore
    var nativeForEach   = Array.prototype.forEach,
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

    /**
     * Bind function to scope. Useful for events.
     * @param   {Function}   fn     function
     * @param   {Object}     scope    Scope of the function to be executed in
     * @example $("div").fadeIn(100, W.bind(this, this.transitionDidFinish));
    */
    W.bind = function bind(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
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
    *           function (index, loop) {
    *               log(index);
    *               loop.next();
    *           },
    *           function () {
    *               log('finished');
    *           }
    *       );
    */
    W.loop = function (iterations, fn, callback) {
        var index = 0;
        var done = false;
        var loop = {
            next: function() {
                if (done) { return; }
                if (index < iterations) {
                    index++;
                    fn(index-1, loop);
                } else {
                    done = true;
                    callback();
                }
            },
            endLoop: function() {
                done = true;
                callback();
            }
        };
        loop.next();
        return loop;
    };
})();
