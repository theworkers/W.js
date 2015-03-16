var W = {};
if (typeof module !== 'undefined' && module.exports) {
	module.exports = W;
}
(function ( W ) {
    //  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
    // Create the namespace
    var W = W || {};
    
var nativeBind = Function.prototype.bind;
/**
 * Bind function to scope. Useful for events.
 * @param   {Function}   fn     function
 * @param   {Object}     scope    Scope of the function to be executed in
 * @example $("div").fadeIn(100, W.bind(this, this.transitionDidFinish));
*/
function bind( fn, scope ) {
    var bound, args;
    if ( fn.bind === nativeBind && nativeBind ) return nativeBind.apply( fn, Array.prototype.slice.call( arguments, 1 ) );
    args = Array.prototype.slice.call( arguments, 2 );
    // @todo: don't link this
    bound = function() {
        if ( !(this instanceof bound) ) return fn.apply( scope, args.concat( Array.prototype.slice.call( arguments ) ) );
        W.ctor.prototype = fn.prototype;
        var self = new ctor();
        var result = fn.apply( self, args.concat( Array.prototype.slice.call( arguments ) ) );
        if ( Object( result ) === result ) return result;
        return self;
    };
    return bound;
}
// Calls `fn` with any other passed arguments when `fn` is a function (i.e. not defined).
// For example:
//     function ( callback ) {
//         var err = null;
//         var result = 1;
//         W.call( callback, err, result );
//     }
//   
function call ( fn ) {
    if ( typeof fn === 'function' ) {
        fn.apply( this, rest( toArray( arguments ) ) );
    }
}
function clone ( obj ) {
    var target = {};
    for ( var i in obj ) {
        if ( obj.hasOwnProperty( i ) ) {
            target[ i ] = obj[ i ];
        }
    }
    return target;
}

// __Description:__ Composes an array of functions into a single function which, when 
// called, will execute each of the functions sequentially and asynchronously, 
// passing on any returned arguments on to the next and finally the callback of the 
// return signature. When each of the functions in the array is called, the final
// argument will be the caller of the next.  
// __Arguments:__ `fns<Functions>...`
// __Returns:__ a function with the signture (args...<any>, callback<function>).
function composeAsync () {
    var fns = toArray( arguments );
    return function () {
        var args = toArray( arguments );
        var finishedCallback = W.last( args );
        var initialArgs = W.withoutLast( args );
        var idx = -1;
        function next () {
            var args = toArray( arguments );
            if ( ++idx === fns.length-1 ) {
                args.push( finishedCallback );
            } else {
                args.push( next );
            }
            fns[ idx ].apply( this, args );
        }
        next.apply( this, initialArgs );
    };
}

function compose( fns ) {
    var args = arguments;
    return function () {
       return W.toArray( args ).reduce( function ( acc, fn, idx ) {
            return ( idx === 0 ) ? fn.apply( this, acc ) : fn( acc );
        }, arguments ); 
    };
}
var countedCallbackMixin = {
    getCountedCallback : function () {
        var self = this;
        self._totalCallbacks =  self._totalCallbacks || 0;
        self._totalCallbacks++;
        // saves a reference for unbinding from events
        this.callbackComplete =  this.callbackComplete || function () { 
            if ( !--self._totalCallbacks ) {
                // executed when all the callbacks are finished
                self.trigger("allCallbacksComplete", self);
            }
        };
        return this.callbackComplete;
    }
};

var breaker = {};
var nativeForEach = Array.prototype.forEach;
function each ( obj, iterator, context ) {
    if ( obj === null ) return;
    if ( nativeForEach && obj.forEach === nativeForEach ) {
        obj.forEach( iterator, context );
    } else if ( obj.length === +obj.length ) {
        for ( var i = 0, l = obj.length; i < l; i++ ) {
            if ( i in obj && iterator.call( context, obj[ i ], i, obj ) === breaker ) return;
        }
    } else {
        for ( var key in obj ) {
            if ( _.has(obj, key )) {
                if ( iterator.call( context, obj[ key ], key, obj ) === breaker) return;
            }
        }
    }
}

var eventMixin = {
    on : function ( event,  callback ) {
        if ( typeof callback !== 'function' ) {
            throw "callback not function";
        }
        this.events()[ event ] = this.events()[ event ] || [];
        if ( this.events()[ event ] ) {
            this.events()[ event ].push( callback );
        }
        return this;
    },
    off : function ( event, callback ) {
        if ( !callback ) {
            delete this.events()[ event ];
        } else {
            if ( this.events()[ event ] ) {
                var listeners = this.events()[ event ];
                for ( var i = listeners.length-1; i>=0; --i ){
                    if ( listeners[ i ] === callback ) {
                        listeners.splice( i, 1 );
                    }
                }
            }
        }
        return this;
    },
    // Call the event with name, calling handlers with all other arguments
    // e.g. trigger( name, ... )
    trigger : function ( name, data ) {
        var args = Array.prototype.slice.call( arguments, 1 );
        var listeners;
        var length;
        // Find match listeners
        if ( name !== "*" && this.events()[ name ] ) {
            listeners = this.events()[ name ];
            length = listeners.length;
            while ( length-- ) {
                if ( typeof listeners[ length ] === 'function' ) {
                    listeners[ length ].apply( this, args );
                }
            }
        }
        // Send to any listeners bound to '*'
        if ( this.events()[ "*" ] ) {
            listeners = this.events()[ "*" ];
            length = listeners.length;
            // Add the event name to the first callback arg
            args.unshift( name );
            while ( length-- ) {
                if ( typeof listeners[ length ] === 'function' ) {
                    listeners[ length ].apply( this, args );
                }
            }
        }

        return this;
    },
    // Added function to avoid the use of a constuctor
    events : function () {
        this.eventsArray = this.eventsArray || [];
        return this.eventsArray;
    }
};

// Underscore.js 1.6.0
// http://underscorejs.org
// (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Underscore may be freely distributed under the MIT license.
function extend ( obj ) {
    each( Array.prototype.slice.call( arguments, 1 ), function ( source ) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
 }
function first( arr ) {
    return arr[ 0 ];
}
function flatten( arr ) {
	return [].concat.apply( [], arr );
}
function flip( fn ) {
    return function () { 
        return fn.apply( fn, Array.prototype.slice.call( arguments ).reverse() ); 
    };
}
// interpose( array, seperator ) returns [ item, seperator, item, seperator, item ]
function interpose( arr, seperator) {
    var result = [];
    for ( var i = 0; i < arr.length-1; ++i ) {
        result.push( arr[ i ] );
        result.push( seperator );
    }
    result.push( arr[ arr.length-1 ] );
    return result;
}
function isNotOk( obj ) {
    return !isOk( obj );
}
function isNotUndefined ( v ) { 
	return typeof v !== 'undefined';
}
function isOk( obj ) {
    if (typeof obj === "undefined") {
        return false;
    }
    if (typeof obj === "string") {
        if ( obj.length === 0 ) {
            return false;
        } else {
            return (/([^\s])/.test(obj));
        }
    }
    if (typeof obj === "number") {
        return true;
    }
    if (obj === null) {
        return false;
    }
    if ( Object.prototype.toString.call( obj ) === '[object Array]' ) {
        return obj.length > 0;
    }
    return !!obj;
}
// Checks that all passed arguments are not undefined
function isUndefined () {
	return Array.prototype.every.call( arguments, function (v) { return typeof v === 'undefined'; } );
}
function last( arr ) {
    return arr[ arr.length - 1 ];
}
// inspired by http://blog.jcoglan.com/2007/07/23/writing-a-linked-list-in-javascript/
function List ( options ) {
    this.length = 0;
    this.first = null;
    this.last = null;
}

List.prototype = {
    append : function( obj ) {
        if ( this.first === null ) {
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
    insertAfter : function( after, obj ) {
        obj.prev = after;
        obj.next = after.next;
        after.next.prev = obj;
        after.next = obj;
        if ( obj.prev == this.last ) { 
            this.last = obj; 
        }
        ++this.length;
        return this;
    },
    remove : function ( obj ) {
        if ( this.length > 1 ) {
            obj.prev.next = obj.next;
            obj.next.prev = obj.prev;
            if ( obj == this.first ) { this.first = obj.next; }
            if ( obj == this.last ) { this.last = obj.prev; }
        } else {
            this.first = null;
            this.last = null;
        }
        obj.prev = null;
        obj.next = null;
        --this.length;
        return this;
    },
    at : function ( index ) {
        if ( index >= this.length ) {
            return false;
        }
        var obj = this.first;
        if ( index===0 ) {
            return obj;
        }  
        for ( var i=0; i<index; ++i ) {
            obj = obj.next;
        }
        return obj;
    },
    each : function ( fn, context ) {
        var bound = ( context ) ? W.bind( fn, context ) : fn;
        var next = this.first;
        for ( var i=0; i<this.length; ++i ) {
            bound( next, i );
            next = next.next;
        }
        return this;
    },
    sendToBack : function ( obj ) {
        this.remove( obj );
        this.append( obj );
    }
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
function loop ( iterations, fn, callback ) {
    var index = 0;
    var done = false;
    var end =  function() {
        done = true;
        callback();
    };
    var next = function() {
        if ( done ) { return; }
        if ( index < iterations ) {
            index++;
            fn( index-1, next, end );
        } else {
            done = true;
            if ( callback ) { callback(); }
        }
    };
    next();
    return next;
}

function Middleware ( options ) {
    var middleware = [];
    
    // Middleware handlers
    this.add = function ( fn ) {
        middleware.push( fn );
    };

    // Trigger to pass data through the middleware. Arguments passed will be sent to each middleware function + a `next` function.
    this.route = function () {
        var args = Array.prototype.slice.call( arguments );
        args.push( next );
        var middlewareCounter = -1;
        next();

        function next () {
            if ( ++middlewareCounter < middleware.length ) {
                middleware[ middlewareCounter ].apply( this, args );
            }
        }
    };
}
    
function noop () {}

// From Backbone
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
var ctor = function(){};
function objInherits (parent, protoProps, staticProps) {
    var child;
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ parent.apply(this, arguments); };
    }
    extend(child, parent);
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    if (protoProps) extend(child.prototype, protoProps);
    if (staticProps) extend(child, staticProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
}

// The self-propagating extend function that Backbone classes use.
function objExtend (protoProps, classProps) {
    var child = objInherits(this, protoProps, classProps);
    child.extend = objExtend;
    return child;
}

function Obj () {}
Obj.extend = objExtend;
function partialRight ( fn ) {
    var args = W.rest( W.toArray( arguments ) );
    return function () {
        return fn.apply( this, W.toArray( arguments ).concat( args ) );
    };
} 
function partial( fn, arg1, arg2, etc ) {
    var rest = Array.prototype.slice.call( arguments, 1 );
    return function () {
        return fn.apply( this, Array.prototype.concat.apply( rest, arguments ) );
    };
}
function partition ( arr, size ) {
    return arr.reduce( toPartition( size ), [] );
}
// ## promise
// Returns a promise when passed a function with the signature ( resolve<Function>, reject<Function> ).
// ### Usage:
// 
//    function foo () {
//        return W.promise( function ( resolve, reject )  {
//            // if something went wrong
//            reject( new Error( 'failed' ) );
//            // if all went well
//            resolve( 1, 2 );
//        });
//    }
//    
//    foo()
//        .success( handler )
//        .error( handler )
//        .done( function ( err, a, b ) {} )
//        .timeout( 2000 );
//  
// ### Methods
// #### .success
// Called when resolved with any arguments passed to it.
// #### .error
// Called upon rejected. If no arguments are provided, the handler will be called with a single argument
// with is a n Error 'promise rejected'
// #### .done ( fn<Function> ) 
// Similar to a node callback, the signature of `fn` is `( errOrNull, arg1, arg2... )`. 
// This handler will be called after `error` or `done` handlers. Like `error` if no arguments
// are provided to a `reject` the error will be an Error 'promise rejected'
// #### .timeout( delay<Number>, fn<Function>_optional_ )
// If `.timeoutAfter` is set, it will fire a reject with the error `promised timed out`. An optional `fn` may
// be passed with will also be be triggered
// ### Implmentation
function promise ( fn ) {
    if ( typeof fn !== 'function' ) {
        throw new Error( 'Promise constructor needs to be passed a function' );
    }
    var success = noop;
    var error = noop;
    var done = noop;
    var debug = false;
    var timeoutId;
    var resolve = function () {
        clearTimeout( timeoutId );
        success.apply( this, arguments );
        Array.prototype.unshift.call( arguments, null );
        done.apply( this, arguments );
        if ( debug ) {
           console.log( 'Promise resolved with', arguments );
        }
    };
    var reject = function () {
        clearTimeout( timeoutId );
        if ( arguments.length === 0 ) {
            Array.prototype.unshift.call( arguments, new Error( 'Promise rejected' ) );
        }
        error.apply( this, arguments );
        done.apply( this, arguments );
        if ( debug ) {
           console.log( 'Promise rejected with', arguments );
        }
    };
    setTimeout( function () {
        fn ( resolve, reject );
    }, 0 );
    var chain = {
        success : function ( fn ) { success = fn; return chain; },
        error : function ( fn ) { error = fn; return chain; },
        done : function ( fn ) { done = fn; return chain; },
        timeoutAfter : function ( delay, fn ) { 
            timeoutId = setTimeout( function () {
                success = noop;
                reject( new Error( 'Promise timed out' ) );
                reject = noop;
                if ( typeof fn === 'function' ) {
                    fn();
                }
            }, delay );
            return chain; 
        },
        debug : function () {
            debug = true;
        } 
    };
    return chain;
}

function range ( start, stop ) {
    if ( typeof stop === 'undefined' ) { stop = start; start = 0;  }
    return Array.apply( null, Array( stop - start ) ).map( function ( _, i ) { return start + i; } );
}

function rest ( arr, n ) {
	return arr.splice( n || 1 );
} 
// Inspired by express.js and path.js
var noOp = function (){};

// # Router
// _Note the router is async and will never trigger synchronously._
// ## Example 
// ### Setup
//
//     var router = new Router();
//     router
//         .map( '/a/:b/' )
//             .to( function ( route, next ) {
//                 next();
//             })
//             .to( function ( route ) {
//                 console.log( "b", route.params.b );
//             })
//         .map( '/a/:b/:c', 'GET' )
//             .to( function ( route ) {
//     
//             })
//         .map( '/a/:b/:c', [ 'POST', 'PUT' ] )
//             .to( function ( route, next ) {
//                  next();
//             })
//             .whenMethod( 'POST', route, next, function () {
//                  next();
//              })
//             .whenMethod( ['POST', 'PUT'], route, next, function () {
//                  next();
//              })
//         .map( 'extra args' )
//             .to( function ( route, x, y, z ) {
//     
//             })
//         .noMatch( function ( route, extra ) {
//             console.log( 'no route for', route.path );
//         });
// ### Triggering
//
// With `onDone` as trigger will happen in next tick 
//
//     router.trigger( '/a/10/' ).onDone( function () {} );
//
// With method
//
//     router.trigger( '/a/1/2/' ).withMethod( 'GET' );
//
// With extra arguments
//
//     router.trigger( '/a/1/2/', 1, 2, 3 );

function Router () {
    this.routes = [];
    this.noMatch = function () {};
}

// ## Trigger
// Arguments:
// * path <String:URL/Pattern>
// * args...
Router.prototype.trigger = function (path) {
    var self = this;
    var triggerArguments = arguments;
    
    
    var promise = new RouterTriggerPromise(noOp,noOp);

    setTimeout((function (promise) {
        return function () {
            // Route detection
            var matchingRoute;
            var i = 0;
            while ( i < self.routes.length ) {
                if ( self.routes[i].method === promise.method && self.routes[i].match(path) ) {
                    matchingRoute = self.routes[i];
                    break;
                }
                ++i;
            }
            if (matchingRoute) {
                // convert the array with keys back to an object
                var route = {
                    method : promise.method,
                    params : {},
                    path : path
                };
                Object.keys(matchingRoute.params).forEach(function (key) {
                    route.params[key] = matchingRoute.params[key];
                });
                var args = [route];
                for (var j=1; j<triggerArguments.length; j++) {
                    args.push(triggerArguments[j]);
                }
                args.push( null ); // holder for next
                // Action all sequentally
                W.loop(matchingRoute.callbacks.length, function ( i, next, end ) {
                    var callback = matchingRoute.callbacks[ i ];
                    // Updated the 
                    args[ args.length - 1 ] = next;
                    callback.apply(this, args);
                }, function () {
                    promise.allCallbacksDidNext();
                });
                promise.done();
            } else {
                var route = {
                    method : promise.method,
                    params : {},
                    path : path
                };
                var args = [route];
                for (var j=1; j<triggerArguments.length; j++) {
                    args.push(triggerArguments[j]);
                }
                self.noMatch.apply(this, args);
                promise.done();
            }
        };
    }(promise)),0);

    return promise;
};

Router.prototype.map = function ( path, methods ) {
    var routerContext = this;
    var routes = [];

    if ( typeof methods === 'undefined' || methods === null ) { methods = ['none']; }
    if ( typeof methods === 'string' ) { methods = [methods]; } 

    methods.forEach(function (method) {   
        routes.push( new Route(method, path, [], {sensitive:true, strict:true}) );
    });

    this.routes = this.routes.concat(routes);

    return new RouterMapPromise(routes, routerContext);

};

function RouterTriggerPromise(allCallbacksDidNext, onNoMatch) {
    this.allCallbacksDidNext = allCallbacksDidNext;
    this.onAllCallbacksDidNext = function ( fn ) {
        this.allCallbacksDidNext = fn;
        return this;
    };
    this.done = noOp;
    this.onDone = function ( fn ) {
        this.done = fn;
        return this;
    };
    this.method = 'none';
    this.withMethod = function ( method ) {
        this.method = method;
        return this;
    };
}

function RouterMapPromise(routes, routerContext) {
    var self = this;
    this.to = function (fn) {
        routes.forEach(function (route) {
            route.callbacks.push(fn);
        });
        return self;
    };
    this.toWhenMethod = function (methods, fn) {
        if ( !(methods instanceof Array) ) {
            methods = [methods];
        }
        routes.forEach(function (route) {
            route.callbacks.push(function (req) {
                if ( methods.indexOf( req.method ) > -1 ) {
                    fn.apply( this, arguments );
                } else {
                    // take the last argument, which is next and call it
                    arguments[ arguments.length-1 ]();
                }
            });
        });
        return self;
    };
    this.map = function () {
        return routerContext.map.apply(routerContext, arguments);
    };
    this.trigger = function () {
        return routerContext.trigger.apply(routerContext, arguments);
    };
    this.noMatch = function ( fn ) {
        routerContext.noMatch = fn;
        return this;
    };
    return this;
}

/**
 * Initialize `Route` with the given HTTP `method`, `path`,
 * and an array of `callbacks` and `options`.
 *
 * Options:
 *
 *   - `sensitive`    enable case-sensitive routes
 *   - `strict`       enable strict matching for trailing slashes
 *
 * @param {String} method
 * @param {String} path
 * @param {Array} callbacks
 * @param {Object} options.
 * @api private
 */

function Route(method, path, callbacks, options) {
  options = options || {};
  this.path = path;
  this.method = method;
  this.callbacks = callbacks;
  this.regexp = pathRegexp(path, this.keys = [], options.sensitive, options.strict);
}

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Route.prototype.match = function(path){
    var keys = this.keys;
    var params = this.params = [];
    var m = this.regexp.exec(path);

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];

        if (key) {
            params[key.name] = val;
        } else {
            params.push(val);
        }
  }

  return true;
};

// Borrowed from express utils
function pathRegexp(path, keys, sensitive, strict) {
    if (''+path == '[object RegExp]') return path;
    if (Array.isArray(path)) path = '(' + path.join('|') + ')';
    path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
            keys.push({ name: key, optional: !! optional });
            slash = slash || '';
            return ''
                + (optional ? '' : slash)
                + '(?:'
                + (optional ? slash : '')
                + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
                + (optional || '')
                + (star ? '(/*)?' : '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}

function Sequence(fn) {
    var self = this;
    var fns = [];
    var done = function () {
        fns.shift();
        if (fns.length > 0) { triggerFn(fns[0]); }
        return self;
    };
    this.then = function (fn) {
        fns.push(fn);
        return self;
    };
    this.delay = function (ms) {
        self.then(function (done) {
            setTimeout(done, ms);
        });
        return self;
    };
    this.start = function () {
        triggerFn(fns[0]);
        return self;
    };
    function triggerFn (fn) {
        // it expects an done object
        if (fn.length > 0) {
            fn(done);
        } else {
            fn();
            done();
        }
    }
    if (typeof fn === 'function') {
        this.then(fn);
    }
    return this;
}

/**
 * A function sequencer with `delay` and `then` methods. Functions passed to `then` can have an optional argument `done` which can be used to trigger the function finishing
 * @param  {Function} fn optional first argument
 * @return {[Sequencer]} object with `delay` and `then` methods.
 * @example
 *     sequence(function (done) {
 *         console.log(0);
 *         done();
 *     })
 *     .then(function (done) {
 *         console.log(1);
 *         done();
 *     })
 *     .delay(1000)
 *     .then(function () {
 *         console.log(2);
 *     })
 *     .delay(1000)
 *     .then(function (done) {
 *         console.log(3);
 *         done();
 *     })
 *     .delay(1000)
 *     .then(function (done) {
 *         console.log(4);
 *         done();
 *     })
 *     .start();
 */
function sequence (fn) {
    return new Sequence(fn);
}

// Returns the elasped time since last
// tick. Also overriding so the time
// can be maually set so as not a
// realtime timer
function TickTimer (options) {
    extend(this, eventMixin);
    this.lastTickTime = Date.now();
}

TickTimer.prototype = {
    start: function () {
        if (this.isStarted===true) {
            return;
        }
        this.lastTickTime = Date.now();
        this.isStarted = true;
        this.trigger("started", this);
    },
    stopTicker: function () { 
        if (!this.isStarted) {
            return;
        }
        this.isStarted = false;
        this.trigger("stopped", this);

    },
    reset: function () {
        this.trigger("reset", this);
        this.lastTickTime = Date.now();
    },
    tick: function () {
        if (this.usesEvents) {
            this.trigger("tick", this);
        }
        this.lastTickTime = Date.now();
    },
    getTimeSinceLastTickMS: function () {
        return (this.isStarted) ? Date.now() - this.lastTickTime : 0;
    },
    getTimeSinceLastTickSec: function () {
        return (this.isStarted) ? (Date.now() - this.lastTickTime) / 1000 : 0;
    }
};
// IE fix
Date.now = Date.now || function() { return +new Date(); }; 

function Timer (options) {
    extend(this, eventMixin);
    this.options = extend({
        updateTime : 1000,
        loops : true,
        eventName : "fired",
        stoppedEventName : "stop",
        restartEventName : "restart"
    }, options);
    this.setIntervalID = undefined;
    this._count = 0; 
}

Timer.prototype = {
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
};

// Can be used to turn arguments in to an array
// For example: var args = toArray( arguments );
function toArray ( obj ) {
    return Array.prototype.slice.call( obj );
}
function toPartition ( size ) {
    var partition = [];
    return function ( acc, v ) {
        partition.push( v );
        if ( partition.length === size ) {
            acc.push( partition );
            partition = [];
        }
        return acc;
    };
}
function withoutLast ( arr ) {
    return Array.prototype.slice.call( arr, 0, arr.length-1 );
}

extend( W, {
        bind : bind,
        clone : clone,
        countedCallbackMixin : countedCallbackMixin,
        each : each,
        eventMixin : eventMixin,
        extend : extend,
        List : List,
        loop : loop,
        Middleware : Middleware,
        Sequence : Sequence,
        sequence : sequence,
        TickTimer : TickTimer,
        Timer : Timer,
        Object : Obj,
        isOk : isOk,
        isNotOk : isNotOk,
        Router : Router,
        interpose : interpose,
        partial : partial,
        flip : flip,
        partition : partition,
        flatten : flatten,
        promise : promise,
        last : last,
        first : first,
        rest : rest,
        withoutLast : withoutLast,
        toArray : toArray,
        composeAsync : composeAsync,
        isNotUndefined  : isNotUndefined,
        isUndefined : isUndefined,
        call : call,
        partialRight : partialRight,
        compose : compose,
        toPartition : toPartition,
        range : range
    });
} ( W ) );

(function ( W ) {
    //  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
    // Create the namespace
    var W = W || {};
function add() {
    var result = 0;
    Array.prototype.forEach.call( arguments, function ( n ) { result += n; } );
    return result;
}
function angleBetween (center, point) {
    var angle = Math.atan2(center.x-point.x,center.y-point.y)*(180/Math.PI);
    if(angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }
    return angle;
}

function clamp ( value, min, max, callbackOnClamp ) {
    if ( max < min ) {
        if ( value < max ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp( value, max );
            }
            value = max;
        }
        else if ( value > min ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp( value, min );
            }
            value = min;
        }
    } else {
        if ( value > max ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp( value, max );
            }
            value = max;
        }
        else if ( value < min ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp(value, min);
            }
            value = min;
        }
    }
    return value;
}

function clipNormalized (x, min, max) { // or (value, max), or (value)
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
}
function colorStringToHex (color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2], 10);
    var green = parseInt(digits[3], 10);
    var blue = parseInt(digits[4], 10);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
}

function colorValuesToHex (r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function distance ( x0, y0, x1, y1 ) {
    var x = x1 - x0;
    var y = y1 - y0;
    return Math.sqrt( ( x * x ) + ( y * y ) );
}
// Negative ease produces ease out, positive produces ease in. 
// Range around -1 to 1
function getDynamicallyEasedInterpolation (ease) { 
    return function (p) {
        return dynamicEaseInterpolation(p, ease);
    };
}

function dynamicEaseInterpolation(p, ease) { 
     // invert negative value and positive so they work on the same logarithmic scale.
    if (ease >= 0.0) {
        ease = ease * 2.25 + 1;
        // superelipse
        return  Math.pow( 1 - Math.pow( 1 - p, ease ), 1 / ease );
    } else {
        ease = Math.abs(ease) * 2.25 + 1;
        // superelipse shifted
        return 1 - Math.pow( 1 - Math.pow(p, ease ), 1 / ease );
    }
}
function fitScaleRatio (width, height, boundsWidth, boundsHeight) {
    var widthScale = boundsWidth / width;
    var heightScale = boundsHeight / height;
    return Math.min(widthScale, heightScale);
}

function floatToString ( value, precision ) {
    var power = Math.pow( 10, precision || 0 );
    return String( Math.round( value * power ) / power );
}
function hexStringToColorArray (hex)  {
    // modified from http://stackoverflow.com/a/5624139/179015
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [];
}

function inRange (test, min, max) {
    if (min === max) { return false; }
    if (min > max) {
        return (test < min && test > max);
    } else {
        return (test > min && test < max);
    }
}

function isClose ( input, point, tolerance ) {
    return ( input > point - tolerance && input < point + tolerance );
}

// Used for interpolation between two points
function lerp (start, end, scalar) {
    return start + (end - start) * scalar;
}

// Maps a value from one range to another
function makeIntervalMap () {
    var fromMin = 0;
    var fromMax = 1;
    var toMin = 0;
    var toMax = 1;
    var clamp = false;
    var ease;
    var chain = {
        to: function ( l, h ) { toMin = l; toMax = h; return chain; },
        toMin: function ( v ) { toMin = v; return chain; },
        toMax: function ( v ) { toMax = v; return chain; },
        from: function ( l, h ) { fromMin = l; fromMax = h; return chain; },
        fromMin: function ( v ) { fromMin = v; return chain; },
        fromMax: function ( v ) { fromMax = v; return chain; },
        ease: function ( fn ) { ease = fn; return chain; },
        clamp: function ( v ) { clamp = arguments.length > 0 ? v : true; return chain;  },
        map: function ( v ) { return W.map( v, fromMin, fromMax, toMin, toMax, clamp, ease ); }
    };
    return chain;
}

// # Map (map interval)
// Ease function can be a interpolation function as below
function map ( input, inputMin, inputMax, outputMin, outputMax, clamp, ease ) {
    input = ( input - inputMin ) / ( inputMax - inputMin );
    if ( ease ) {
        input = ease(input);
    } 
    var output = input * ( outputMax - outputMin ) + outputMin;
    if ( !!clamp ) {
        if ( outputMax < outputMin ) {
            if ( output < outputMax ) {
                output = outputMax;
            }
            else if ( output > outputMin ) {
                output = outputMin;
            }
        } else {
            if ( output > outputMax ) {
                output = outputMax;
            }
            else if ( output < outputMin ) {
                output = outputMin;
            }
        }
    }
    return output;
}

// Requires 'gl-matrix' http://glmatrix.net

// # Class
function MatrixStack () {

    // # Gl-Matrix inheritance
    // Create inheritance if not already created.
    // Doing it on first initialisation so that `gl-matrix`
    // is not require just to load W.js on node
    if ( typeof MatrixStack.prototype.glMatrix === 'undefined' ) {
        // Extend gl-matrix as in browser it is global, in node it is a module
        if (typeof module !== 'undefined' && module.exports) {
            // NPM
            W.extend( MatrixStack.prototype, require( 'gl-matrix' ) );
        } else {
            // re-wrap in browser
            W.extend( MatrixStack.prototype, {
                glMatrix : glMatrix,
                mat2 : mat2,
                mat2d : mat2d,
                mat3 : mat3,
                mat4 : mat4,
                quat : quat,
                vec2 : vec2,
                vec3 : vec3,
                vec4 : vec4
            });
        }
    }

    this.stack = [ this.mat4.create() ];
    
}

// # Methods

MatrixStack.prototype.getMat = function () {
    return this.stack[ this.stack.length - 1 ];
};

MatrixStack.prototype.push = function () {
    // clone the last matrix so all transition are applied
    this.stack.push( this.mat4.clone( this.getMat() ) );
    return this;
};

MatrixStack.prototype.pop = function () {
    this.stack.pop();
    return this;
};

MatrixStack.prototype.rotateZ = function ( rad ) {
    this.mat4.rotateZ( this.getMat(), this.getMat(), rad );
    return this;
};

MatrixStack.prototype.translate = function ( x, y, z ) {
    y = y || 0;
    z = z || 0;
    this.mat4.translate( this.getMat(), this.getMat(), [ x, y, z ] );
    return this;
};

MatrixStack.prototype.applyTo = function ( arr ) {
    if ( arr.length === 2 ) {
        this.vec2.transformMat4( arr, arr, this.getMat() );
    }
    return this;
};
function normalize (value, min, max, ease) {
    value = clamp((value-min)/(max-min),0,1);
    return ease ? ease(value) : value;
}
var PI_2 = Math.PI / 2;
var PI = Math.PI;
function randomBetween (from, to) {
    return map(Math.random(), 0, 1, from, to);
}

// Fisher-Yates shuffle.
// *source http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling*
function  shuffleArray (arr, leaveOriginalUntouched) {
    var array = (leaveOriginalUntouched) ? arr.slice(0) : arr;
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

function wrap ( min, max, v ) {
    return ( ( v-min ) % ( max-min+1 ) + ( max-min+1 ) ) % ( max-min+1 ) + min;
} 

(new function ( W ) {
	//  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
	// Create the namespace
	var W = W || {};

	
// Modeled after the piecewise overshooting cubic function:
// y = (1/2)*((2x)^3-(2x)*sin(2*x*pi))           ; [0, 0.5)
// y = (1/2)*(1-((1-x)^3-(1-x)*sin((1-x)*pi))+1) ; [0.5, 1]
function backEaseInOut (p) {
    var f;
    if(p < 0.5) {
        f = 2 * p;
        return 0.5 * (f * f * f - f * Math.sin(f * Math.PI));
    } else {
        f = (1 - (2*p - 1));
        return 0.5 * (1 - (f * f * f - f * Math.sin(f * Math.PI))) + 0.5;
    }
}
// Modeled after the overshooting cubic y = x^3-x*sin(x*pi)
function backEaseIn (p) {
    return p * p * p - p * Math.sin(p * Math.PI);
}
// Modeled after overshooting cubic y = 1-((1-x)^3-(1-x)*sin((1-x)*pi))
function backEaseOut (p) {
    var f = (1 - p);
    return 1 - (f * f * f - f * Math.sin(f * Math.PI));  
}
function bounceEaseInOut (p) {
    if(p < 0.5) {
        return 0.5 * bounceEaseIn(p*2);
    } else {
        return 0.5 * bounceEaseOut(p * 2 - 1) + 0.5;
    }
}
function bounceEaseIn (p) {
    return 1 - bounceEaseOut(1 - p);
}
function bounceEaseOut (p) {
    if(p < 4/11.0) {
        return (121 * p * p)/16.0;
    } else if(p < 8/11.0) {
        return (363/40.0 * p * p) - (99/10.0 * p) + 17/5.0;
    } else if(p < 9/10.0) {
        return (4356/361.0 * p * p) - (35442/1805.0 * p) + 16061/1805.0;
    } else {
        return (54/5.0 * p * p) - (513/25.0 * p) + 268/25.0;
    }
}
// Modeled after the piecewise circular function
// y = (1/2)(1 - sqrt(1 - 4x^2))           ; [0, 0.5)
// y = (1/2)(sqrt(-(2x - 3)*(2x - 1)) + 1) ; [0.5, 1]
function circularEaseInOut (p) {
    if(p < 0.5) {
        return 0.5 * (1 - Math.sqrt(1 - 4 * (p * p)));
    } else {
        return 0.5 * (Math.sqrt(-((2 * p) - 3) * ((2 * p) - 1)) + 1);
    }
}
// Modeled after shifted quadrant IV of unit circle
function circularEaseIn (p) {
    return 1 - Math.sqrt(1 - (p * p));
}
// Modeled after shifted quadrant II of unit circle
function circularEaseOut (p)  {
    return Math.sqrt((2 - p) * p);
}
// Modeled after the piecewise cubic
// y = (1/2)((2x)^3)       ; [0, 0.5)
// y = (1/2)((2x-2)^3 + 2) ; [0.5, 1]
function cubicEaseInOut (p) {
    if(p < 0.5) {
        return 4 * p * p * p;
    } else {
        var f = ((2 * p) - 2);
        return 0.5 * f * f * f + 1;
    }
}
// Modeled after the cubic y = x^3
function cubicEaseIn (p) {
    return p * p * p;
}
// Modeled after the cubic y = (x - 1)^3 + 1
function cubicEaseOut (p) {
    var f = (p - 1);
    return f * f * f + 1;
}
// Modeled after the piecewise exponentially-damped sine wave:
// y = (1/2)*sin(13pi/2*(2*x))*pow(2, 10 * ((2*x) - 1))      ; [0,0.5)
// y = (1/2)*(sin(-13pi/2*((2x-1)+1))*pow(2,-10(2*x-1)) + 2) ; [0.5, 1]
function elasticEaseInOut (p) {
    if( p < 0.5 ) {
        return 0.5 * Math.sin( 13 * ( Math.PI / 2 ) * (2 * p) ) * Math.pow( 2, 10 * ( ( 2 * p ) - 1) );
    } else {
        return 0.5 * ( Math.sin( -13 * ( Math.PI / 2 ) * ( ( 2 * p - 1 ) + 1 ) ) * Math.pow( 2, -10 * ( 2 * p - 1) ) + 2 );
    }
}
// Modeled after the damped sine wave y = sin(13pi/2*x)*pow(2, 10 * (x - 1))
function elasticEaseIn (p) {
    return Math.sin(13 * ( Math.PI / 2 ) * p) * Math.pow(2, 10 * (p - 1));
}
// Modeled after the damped sine wave y = sin(-13pi/2*(x + 1))*pow(2, -10x) + 1
function elasticEaseOut (p) {
    return Math.sin(-13 * ( Math.PI / 2 ) * (p + 1)) * Math.pow(2, -10 * p) + 1;
}
// Modeled after the piecewise exponential
// y = (1/2)2^(10(2x - 1))         ; [0,0.5)
// y = -(1/2)*2^(-10(2x - 1))) + 1 ; [0.5,1]
function exponentialEaseInOut (p) {
    if(p === 0.0 || p === 1.0) return p;
    if(p < 0.5) {
        return 0.5 * Math.pow(2, (20 * p) - 10);
    } else {
        return -0.5 * Math.pow(2, (-20 * p) + 10) + 1;
    }
}
// Modeled after the exponential function y = 2^(10(x - 1))
function exponentialEaseIn (p) {
    return (p === 0.0) ? p : Math.pow(2, 10 * (p - 1));
}
// Modeled after the exponential function y = -2^(-10x) + 1
function exponentialEaseOut (p) {
    return (p === 1.0) ? p : 1 - Math.pow(2, -10 * p);
}
// Modeled after the line y = x
function linearInterpolation (p) { return p; }
// Modeled after the piecewise quadratic
// y = (1/2)((2x)^2)             ; [0, 0.5)
// y = -(1/2)((2x-1)*(2x-3) - 1) ; [0.5, 1]
function quadraticEaseInOut (p) {
    if(p < 0.5) {
        return 2 * p * p;
    } else {
        return (-2 * p * p) + (4 * p) - 1;
    }
}
// Modeled after the parabola y = x^2
function quadraticEaseIn (p) { return p * p; }
// Modeled after the parabola y = -x^2 + 2x
function quadraticEaseOut (p) { 
	return -(p * (p - 2)); 
}
// Modeled after the piecewise quartic
// y = (1/2)((2x)^4)        ; [0, 0.5)
// y = -(1/2)((2x-2)^4 - 2) ; [0.5, 1]
function quarticEaseInOut (p) {
    if(p < 0.5) {
        return 8 * p * p * p * p;
    } else {
        var f = (p - 1);
        return -8 * f * f * f * f + 1;
    }
}
// Modeled after the quartic x^4
function quarticEaseIn (p) { 
	return p * p * p * p; 
}
// Modeled after the quartic y = 1 - (x - 1)^4
function quarticEaseOut( p ) {
    var f = (p - 1);
    return f * f * f * (1 - p) + 1;
}
// Modeled after the piecewise quintic
// y = (1/2)((2x)^5)       ; [0, 0.5)
// y = (1/2)((2x-2)^5 + 2) ; [0.5, 1]
function quinticEaseInOut (p) {
    if(p < 0.5) {
        return 16 * p * p * p * p * p;
    } else {
        var f = ((2 * p) - 2);
        return  0.5 * f * f * f * f * f + 1;
    }
}
// Modeled after the quintic y = x^5
function quinticEaseIn (p) {
    return p * p * p * p * p;
}
// Modeled after the quintic y = (x - 1)^5 + 1
function quinticEaseOut (p) {
    var f = (p - 1);
    return f * f * f * f * f + 1;
}
// Modeled after half sine wave
function sineEaseInOut (p) {
    return 0.5 * ( 1 - Math.cos( p * Math.PI ) );
}
// Modeled after quarter-cycle of sine wave
function sineEaseIn (p) {
    return Math.sin( (p - 1) * ( Math.PI / 2 ) ) + 1;
}
// Modeled after quarter-cycle of sine wave (different phase)
function sineEaseOut (p) {
    return Math.sin( p * ( Math.PI / 2 ) );
}

	W.interpolations = {
		linearInterpolation : linearInterpolation,
		quadraticEaseIn : quadraticEaseIn, 
		quadraticEaseOut : quadraticEaseOut, 
		quadraticEaseInOut : quadraticEaseInOut, 
		cubicEaseIn : cubicEaseIn, 
		cubicEaseOut : cubicEaseOut, 
		cubicEaseInOut : cubicEaseInOut, 
		quarticEaseIn : quarticEaseIn, 
		quarticEaseOut : quarticEaseOut, 
		quarticEaseInOut : quarticEaseInOut, 
		quinticEaseIn : quinticEaseIn, 
		quinticEaseOut : quinticEaseOut, 
		quinticEaseInOut : quinticEaseInOut, 
		sineEaseIn : sineEaseIn, 
		sineEaseOut : sineEaseOut, 
		sineEaseInOut : sineEaseInOut, 
		circularEaseIn : circularEaseIn, 
		circularEaseOut : circularEaseOut, 
		circularEaseInOut : circularEaseInOut, 
		exponentialEaseIn : exponentialEaseIn, 
		exponentialEaseOut : exponentialEaseOut, 
		exponentialEaseInOut : exponentialEaseInOut, 
		elasticEaseIn : elasticEaseIn, 
		elasticEaseOut : elasticEaseOut, 
		elasticEaseInOut : elasticEaseInOut, 
		backEaseIn : backEaseIn, 
		backEaseOut : backEaseOut, 
		backEaseInOut : backEaseInOut, 
		bounceEaseIn : bounceEaseIn, 
		bounceEaseOut : bounceEaseOut, 
		bounceEaseInOut : bounceEaseInOut
	};

} ( W ) );

    W.extend( W, {
        angleBetween : angleBetween,
        clamp : clamp,
        clipNormalized : clipNormalized,
        colorStringToHex : colorStringToHex,
        colorValuesToHex : colorValuesToHex,
        distance : distance,
        getDynamicallyEasedInterpolation : getDynamicallyEasedInterpolation,
        dynamicEaseInterpolation : dynamicEaseInterpolation,
        fitScaleRatio : fitScaleRatio,
        floatToString : floatToString,
        hexStringToColorArray : hexStringToColorArray,
        inRange : inRange,
        isClose : isClose,
        lerp : lerp,
        makeIntervalMap : makeIntervalMap,
        map : map,
        normalize : normalize,
        randomBetween : randomBetween,
        shuffleArray : shuffleArray,
        PI : PI,
        PI_2 : PI_2,
        MatrixStack : MatrixStack,
        add : add,
        wrap: wrap
    });

} ( W ) );

(function ( W ) {
    //  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
    // Create the namespace
    var W = W || {};

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

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v){
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}
function RandomColorSequence ( options ) {
    this.r = Math.random() * 255;
    this.g = Math.random() * 255;
    this.b = Math.random() * 255;
    this.rStep = Math.random() * 10 - 5;
    this.gStep = Math.random() * 10 - 5;
    this.bStep = Math.random() * 10 - 5;
}

RandomColorSequence.prototype.start = function () {
    if (!this.timer) {
        this.timer = new W.Timer({
            updateTime : 10
        });
        this.timer.on("fired", this.update, this);
    }
    this.timer.start();
    return this;
};

RandomColorSequence.prototype.stop = function () {
    this.timer.stop();
    this.timer.off("fired", this.update);
    this.timer = undefined;
    return this;
};

RandomColorSequence.prototype.update = function () {
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
};

RandomColorSequence.prototype.getHex = function () {
    return W.colorValuesToHex(this.r&this.r, this.g&this.g, this.b&this.b);
};
function randomHex() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}
// from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b, ref){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, v];
}

  
    W.extend( W, {
        HSLGradient : HSLGradient,
        RandomColorSequence : RandomColorSequence,
        hslToRgb : hslToRgb,
        hsvToRgb : hsvToRgb,
        rgbToHsl : rgbToHsl,
        rgbToHsv : rgbToHsv,
        randomHex : randomHex
    });

} ( W ) );
(function ( W ) {
    //  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
    // Create the namespace
    var W = W || {};
/** Add Commas to number */
var addCommas = function (number) {
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
var contains = function (str, test) { return (str.indexOf(test) != -1 ); };

// @note webkit only
// 
//     W.cssGradientString().add(0, "#FF0000").add(0, "#00FF00").add(0, "#0000FF").get();
var cssGradientString = function(stops) {
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

/** String string ends with 
http://stackoverflow.com/a/646643/179015 */
var endsWith = function(str, test) { return str.slice(-test.length) == test; };
/** String contains a top level domain */
var hasTld = function(str) { var result = str.match(/[a-z0-9.\-]+[.][a-z]{1,4}[\/:]?([\d]{1,5})?/m); return (!!result); };
function isValidEmailAddress(address) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
}
function join () { return Array.prototype.join.call( arguments, ''  ); }
// `makeRedisKey( 'ross', cairns )` === `'ross:cairns'` 
function makeRedisKey() {
    return W.interpose( Array.prototype.slice.call( arguments, 0 ), ":" ).join( '' );
}
/** String string starts with 
http://stackoverflow.com/a/646643/179015 */
var startsWith = function(str, test) { return str.slice(0, test.length) == test; };
/** String trim leading and ending whitespace */
var trim = function(str) { return (str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };
    W.extend( W, {
        addCommas : addCommas,
        contains : contains,
        cssGradientString : cssGradientString,
        endsWith : endsWith,
        hsTld : hasTld,
        startsWith : startsWith,
        trim : trim,
        join : join,
        isValidEmailAddress : isValidEmailAddress,
        makeRedisKey : makeRedisKey
    });

} ( W ) );
(function ( W ) {
    //  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
    // Create the namespace
    var W = W || {};
function clearContext( ctx, canvasEl ) {
    // Store the current transformation matrix
    ctx.save();
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // Restore the transform
    ctx.restore();
}

////
/// W.DisplayViewMixin
// @author Ross Cairns
// @notes  Not suitable for heavy usage (i.e. particles) as produces 
//         many object with in turn will cause big
//         garbage collections delays 
    
var displayViewMixin = {
    setPosition : function (x, y) { // or setXY(array) or setXY({x:y:})
        if (Object.prototype.toString.call( x ) === '[object Array]') {
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
        } else if (Object.prototype.toString.call( width ) === '[object Array]') {
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

// DOM String Creator
//
// Creates                                                                                                                                                                                                                   
//
// # Examples
//
// _<p>hello</p>_
// 
//    domStr()
//        .push( 'p' ).text( 'hello' ).pop()
//        .render();
//
// _<p class="intro ">hello</p>_
//
//    domStr()
//        .push( 'p' ).class( 'intro' ).text( 'hello' ).pop()
//        .render();
//
// _<div><p>hello</p><p id="yes">world</p></div>_
//
//    domStr()
//        .push( 'div' )
//            .push( 'p' ).text( 'hello' ).pop()
//            .push( 'p' ).id( 'yes' ).text( 'world' ).pop()
//        .pop()
//        .render();
//
//  _<div data-str="worked" /><div data-obj-as-arg="{"name":"fish"}" /><div data-single-arg="fish" /><div attr-name=100 attr-bool=true class="test " />_
//
//    domStr()
//        .push( 'div' ).attr( 'data-str', 'worked' ).pop()
//        .push( 'div' ).attr( 'data-obj-as-arg', { name: 'fish' } ).pop()
//        .push( 'div' ).attr( { 'data-single-arg': 'fish' } ).pop()
//        .push( 'div' ).attr( 'attr-name', 100 ).attr( 'attr-bool', true ).class( 'test' ).pop()
//        .render();

function domStr () {

    var isRoot = true;
    var parent = null;
    var tag = "";
    var children = [];
    var attributes = {};
    var isText = false;
    var text = "";

    var chain = {
        setIsRoot: function ( yN ) {
            isRoot = yN;
        },
        setParent: function ( parentChain ) {
            parent = parentChain;
            return chain;
        },
        tag: function ( tagName ) {
            tag = tagName;
            return chain;
        },
        setIsText: function ( yN ) {
            isText = yN;
            return chain;
        },
        setText: function ( str ) {
            text = str;
            return chain;
        },
        text: function ( str ) {
            var child = domStr();
            child.setIsText( true );
            child.setIsRoot( false );
            children.push( child );
            child.setText( str );
            return chain;
        },
        push: function ( tagName ) {
            var child = domStr();
            child.setParent( chain );
            child.tag( tagName );
            child.setIsRoot( false );
            children.push( child );
            return child;
        },
        pop: function () {
            return parent;
        },
        attr: function ( keyOrValue, value ) {
            if ( typeof keyOrValue === 'object' ) {
                attributes = W.extend( keyOrValue, attributes );
            } else {
                attributes[ keyOrValue ] = value;
            }
            return chain;
        },
        class: function ( name, etc ) {
            attributes.class = ( attributes.class || '' )  + W.toArray( arguments ).join( ' ' ) + ' ';
            return chain;
        },
        id: function ( id ) {
            attributes.id = id;
            return chain;
        },
        render: function () {
            return renderHead() + renderBody() + renderTail();
        }
    };

    function getAttrAsStr () {
        return Object.keys( attributes ).map( function ( key ) {
            var val = attributes[ key ];
            var str = ' ' + key;
            switch ( typeof val ) {
                case 'object': str += val === null ? '' : '="' + JSON.stringify( val ) + '"'; break;
                case 'undefined': break;
                case 'boolean': str += val ? '=true' : '=false'; break; 
                case 'number': str += '=' + val; break; 
                default: str += '="' + val + '"'; break;
            }
            return str;
        }).join( '' );
    }

    function renderHead () {
        if ( isRoot ) { return ''; }
        if ( isText ) { return text; }
        if ( children.length === 0 ) { return "<" + tag + getAttrAsStr() + " />"; }
        return "<" + tag + getAttrAsStr() + ">";
    }

    function renderBody () {
        if ( isText ) { return ''; }
        if ( children.length === 0 ) { return ""; }
        return children.map( function ( child ) { return child.render(); } ).join( '' );
    }

    function renderTail () {
        if ( isRoot ) { return ''; }
        if ( isText ) { return ''; }
        if ( children.length === 0 ) { return ""; }
        return "</" + tag + ">";
    }

    return chain;
}


// A socket connection which will attempt to say open
// Also attempts to parse incoming message
var JSONSocketConnection = W.Object.extend({
    // Options
    //  * socketUrl <String>
    //  * attemptReconnectionAfterMS <Number> - wait until attempting reconnection. Default 1000.
    // Events
    //  * 'open'
    //  * 'closed'
    //  * 'reconnecting'
    //  * 'closed successfully'
    //  * 'json'
    //  * 'nonjson'
    //  * 'message'
    //  * 'error'
    constructor : function (options) {
        W.extend(this, W.eventMixin);
        this.socketUrl = options.socketUrl;
        this._connectionDesired = false;
        this.attemptReconnectionAfterMS = (typeof options.attemptReconnectionAfterMS !== 'undefined') ? options.attemptReconnectionAfterMS : 10000;
    },
    openSocketConnection : function () {
        this._connectionDesired = true;
        var self = this;
        this.socket = new WebSocket(this.socketUrl); 
        this.socket.onopen = function () {
            self.trigger('open');
        };
        this.socket.onerror = function ( error ) {
            self.trigger('error',error);
        };
        this.socket.onclose = function () {
            self.trigger('closed');
            if (self._connectionDesired) {
                setTimeout(W.bind(self.openSocketConnection, self), self.attemptReconnectionAfterMS);
                self.trigger('reconnecting');
            } else {
                self.trigger('closed successfully');
            }
        };
        this.socket.onmessage = function (message) {
            self.trigger('message', message);
            var wasError = false;
            try  {
                message = JSON.parse( message.data );
            }  catch ( e ) {
                self.trigger('nonjson', message.data);
                wasError = true;
                return;
            }
            if ( !wasError ) {
                self.trigger('json', message);
            }
        };
    },
    closeSocketConnection : function () {
        this._connectionDesired = false;
        this.socket.close();
    },
    //
    // @param obj <string/object> - if object it will be strignified
    // @param callback <function> - called with (err)
    send : function ( obj, callback ) {

        // Check it is open
        var state = this.socket.readyState;

        if ( state !== 1 ) {
            var error;
            switch ( state ) {
                case 0: error = new Error( 'WebSocket is CONNECTING' ); break;
                case 2: error = new Error( 'WebSocket is CLOSING' ); break;
                case 3: error = new Error( 'WebSocket is CLOSED' ); break;
                default: error = new Error( 'WebSocket is not in OPEN ready state. State is:'+ state ) ;break;
            }
            self.trigger( 'error', error );
            return callback( error );
        }

        if (typeof obj === 'string') {
            this.socket.send( obj );
            if ( callback ) { 
                return callback(); 
            }
        } else {
            var str;
            try {
                str = JSON.stringify(obj);
            } catch ( e ) {
                self.trigger( 'error', e );
                if ( callback ) { 
                    return callback(e); 
                }
            }
            this.socket.send(str);
            if ( callback ) { 
                return callback(); 
            }
        }
    }
});

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var polyfillRequestAnimationFrame = function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
};

////
/// W.TouchEventViewMixin
// @author Ross Cairns

/**
 * Add touch events to a view.
 *
 * @example
 *          W.extend(this, W.TouchEventViewMixin);
 *          this.enableTouchEvents();
 *          this.bind("touchStart", this.touchStart, this);
 *
 */
var touchEventViewMixin = {
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

function viewportSize () {
	var e = window, 
		a = 'inner';
	if ( !( 'innerWidth' in window ) ){
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {width:e[a+'Width'],height:e[ a+'Height']};
}


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

var wrappedContext = function (context) {
    return new privateNamespace.Context2DWrapper(context);
};

function ZIndexStack (options) {
    if (!options) { options = {}; }
    this.startZIndex = (typeof options.startZIndex === "undefined") ? 100 : options.startZIndex; 
    this.topZIndex = this.startZIndex;
    this.elList = new W.List();
}

ZIndexStack.prototype.addToTop = function (el) {
    $(el).css('z-index', ++this.topZIndex);
    this.elList.append(el);
};

ZIndexStack.prototype.sendToFront = function (el) {
    var zindexNeedle = this.topZIndex;
    this.elList.sendToBack(el);
    this.elList.each(function (el, i) {
        $(el).css('z-index', this.startZIndex + i);
    },this);
};

    W.extend( W, {
        ZIndexStack : ZIndexStack,
        wrappedContext : wrappedContext,
        viewportSize : viewportSize,
        touchEventViewMixin : touchEventViewMixin,
        polyfillRequestAnimationFrame : polyfillRequestAnimationFrame,
        JSONSocketConnection : JSONSocketConnection,
        displayViewMixin : displayViewMixin,
        clearContext : clearContext,
        domStr : domStr
    });

} ( W ) );