if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'rest', function () {

    describe( 'when passed an array', function () {
        it( 'should return the correct value', function () {
            assert.deepEqual( W.rest( [1, 2, 3, 5] ), [2, 3, 5] );
        });
    });

    describe( 'when passed an empty array', function () {
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                W.rest( [] );
            });
        });
    });

});