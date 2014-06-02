if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'last', function () {

    describe( 'when passed an array', function () {
        it( 'should return the correct value', function () {
            assert.equal( W.last( [1, 2, 3, 5] ), 5 );
        });
    });

    describe( 'when passed an empty array', function () {
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                W.last( [] );
            });
        });
    });

});