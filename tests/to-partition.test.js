if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "to-partition", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.toPartition, 'function' );
    });

    it( 'should return an array when passed an empty array', function () {
       assert.deepEqual(  [1,2,3,4,5,6,7].reduce(  W.toPartition( 3 ), [] ), [[1,2,3],[4,5,6]] );
    });

});