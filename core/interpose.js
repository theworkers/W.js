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