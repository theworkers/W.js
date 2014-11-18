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