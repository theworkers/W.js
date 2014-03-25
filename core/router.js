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
//             .to( function ( route ) {
//     
//             })
//         .map( 'extra args' )
//             .to( function ( route, x, y, z ) {
//     
//             })
//         .noRoute( function ( route, extra ) {
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
    this.noMatch = null;
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
                W.loop(matchingRoute.callbacks.length, function (i, next, end) {
                    var callback = matchingRoute.callbacks[i];
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
                    args.push(next);
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
    if (toString.call(path) == '[object RegExp]') return path;
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