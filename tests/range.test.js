if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'range', function () {

    describe( 'W.range( 5 )', function () {
        it( 'should return the correct value', function () {
            assert.deepEqual( W.range( 5 ), [ 0, 1, 2, 3, 4 ] );
        });
    });

    describe( 'W.range( 4, 5 )', function () {
        it( 'should return the correct value', function () {
            assert.deepEqual( W.range( 4, 5 ), [ 4 ] );
        });
    });

    describe( 'W.range( -2, 2 )', function () {
        it( 'should return the correct value', function () {
            assert.deepEqual( W.range( -2, 2 ), [ -2, -1, 0, 1 ] );
        });
    });

});
