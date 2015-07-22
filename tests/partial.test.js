if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "partial", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.partial, 'function' );
    });

    it( 'should return a function', function () {
       assert.equal( typeof W.partial( W.add, 0 ), 'function' );
    });

    it( 'should return the correct result with 1 argument', function () {
        assert.equal( W.partial( W.add, 2 )( 2 ), 4 );
    });

    it( 'should return the correct result with 4 argument', function () {
        assert.equal( W.partial ( W.add, 2, 10, 1, 1 )( 2, 1000 ), 1016 );
    });

    it( 'should maintain array when array passed as argument', function () {

        function returnArgs () { return W.toArray( arguments ); }
        var args = W.partial( returnArgs, 1, 2 )( 3, [ 4, 5 ] );
        assert.equal( typeof args[ 3 ], 'object' );
    });

});