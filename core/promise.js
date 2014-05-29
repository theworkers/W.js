function Promise ( fn ) {
    if ( typeof fn !== 'function' ) {
        throw new Error( 'Promise constructor needs to be passed a function' );
    }
    var success = noop;
    var error = noop;
    var done = noop;
    var resolve = function () {
        success.apply( this, arguments );
        Array.prototype.unshift.call( arguments, null );
        done.apply( this, arguments );
    };
    var reject = function () {
        if ( arguments.length === 0 ) {
            Array.prototype.unshift.call( arguments, new Error( 'Promise rejected' ) );
        }
        error.apply( this, arguments );
        done.apply( this, arguments );
    };
    setTimeout( function () {
        fn ( resolve, reject );
    }, 0 );
    var chain = {
        success : function ( fn ) { success = fn; return chain; },
        error : function ( fn ) { error = fn; return chain; },
        done : function ( fn ) { done = fn; return chain; }
    };
    return chain;
}
