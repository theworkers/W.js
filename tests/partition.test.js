if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "partition", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.partition, 'function' );
    });

    it( 'should return an array when passed an empty array', function () {
       assert.deepEqual( W.partition( [], 0 ), [] );
    });

    it( 'should return an array when passed an empty array', function () {
       assert.deepEqual(  W.partition( [1,2,3,4,5,6,7], 3 ), [[1,2,3],[4,5,6],[7]] );
    });

});