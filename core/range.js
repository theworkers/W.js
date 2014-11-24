function range ( start, length ) {
    if ( typeof length === 'undefined' ) { length = start; start = 0;  }
    return Array.apply( null, Array( length ) ).map( function ( _, i ) { return start + i; } );
}
