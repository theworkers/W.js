function range ( start, stop ) {
    if ( typeof stop === 'undefined' ) { stop = start; start = 0;  }
    return Array.apply( null, Array( stop - start ) ).map( function ( _, i ) { return start + i; } );
}
