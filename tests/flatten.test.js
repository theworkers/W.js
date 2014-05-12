if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "flatten", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.flatten, 'function' );
    });

    it( 'should return an array when passed an empty array', function () {
       assert.deepEqual( W.flatten( [] ), [] );
    });

    it( 'should return an array when passed an empty array', function () {
       assert.deepEqual(  W.flatten( [[1,2,3],[4,5,6],[7]] ), [1,2,3,4,5,6,7] );
    });

});