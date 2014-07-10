function partialRight ( fn ) {
    var args = W.rest( W.toArray( arguments ) );
    return function () {
        return fn.apply( this, W.toArray( arguments ).concat( args ) );
    };
} 