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
//        .timeoutAfter( 2000 );
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
    var state = promise.PENDING;
    var timeoutId;
    var resolve = function () {
        if ( state !== 0 ) { return; }
        state = promise.FULFILLED;
        clearTimeout( timeoutId );
        success.apply( this, arguments );
        Array.prototype.unshift.call( arguments, null );
        done.apply( this, arguments );
        if ( debug ) {
           console.log( 'Promise resolved with', arguments );
        }
    };
    var reject = function () {
        if ( state !== 0 ) { return; }
        state = promise.REJECTED;
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
    // Fire function
    if ( typeof setImmediate === 'function' ) {
        setImmediate( partial( fn, resolve, reject ) );
    } 
    else if ( typeof process === 'object' && typeof process.nextTick === 'function' ) {
        process.nextTick( partial( fn, resolve, reject ) );
    }
    else {
        setTimeout( partial( fn, resolve, reject ), 0 );
    }
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
        },
        getState : function () {
            return state;
        } 
    };
    return chain;
}

promise.FULFILLED = 1;
promise.PENDING = 0;
promise.REJECTED = -1;