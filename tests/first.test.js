if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'first', function () {

    describe( 'when passed an array', function () {
        it( 'should return the correct value', function () {
            assert.equal( W.first( [1, 2, 3, 5] ), 1 );
        });
    });

    describe( 'when passed an empty array', function () {
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                W.first( [] );
            });
        });
    });

});