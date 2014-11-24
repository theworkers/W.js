if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'wrap', function () {

    describe( '', function () {
        it( 'should return the correct values', function () {
            assert.deepEqual( W.range( -10, 10 ).map( W.partial( W.wrap, -10, -1 ) ),
                              [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1,
                                -10, -9, -8, -7, -6, -5, -4, -3, -2, -1 ] );
        });
    });

});
