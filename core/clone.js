function clone ( obj ) {
    var target = {};
    for ( var i in obj ) {
        if ( obj.hasOwnProperty( i ) ) {
            target[ i ] = obj[ i ];
        }
    }
    return target;
}
