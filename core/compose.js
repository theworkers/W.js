function compose( fns ) {
    var args = arguments;
    return function () {
       return W.toArray( args ).reduce( function ( acc, fn, idx ) {
            return ( idx === 0 ) ? fn.apply( this, acc ) : fn( acc );
        }, arguments ); 
    };
}