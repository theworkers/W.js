if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'toArray', function () {

    describe( 'when passed an arguments', function () {
        it( 'should return an array', function ( done ) {
            (function () {
                assert( W.toArray( arguments ) instanceof Array );
                done();
            }());
        });
        it( 'should have the correct values', function ( done ) {
            (function () {
                var args = W.toArray( arguments );
                assert.equal( args[0], 1 );
                assert.equal( args[1], 2 );
                assert.equal( args[2], 3 );
                done();
            }(1, 2, 3));
        });
    });

});