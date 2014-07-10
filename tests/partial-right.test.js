if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "partialRight", function () {

    function divide () {
        return W.toArray(  arguments ).reduce( function ( acc, v ) {
            return acc / v;
        });
    }

    it( 'should be a function', function () {
       assert.equal( typeof W.partialRight, 'function' );
    });

    it( 'should return a function', function () {
       assert.equal( typeof W.partialRight( divide, 0 ), 'function' );
    });

    describe( 'should return the correct result with 1 argument', function () {
        assert.equal( W.partialRight( divide, 2 )( 4 ), 2 );
    });

    describe( 'should return the correct result with 4 argument', function () {
        assert.equal( W.partialRight( divide, 100, 50 )( 2, 1 ), 0.0004 );
    });

});