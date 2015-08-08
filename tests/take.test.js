if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'take', function () {

    describe( 'when invloked', function () {
        it( 'should return the correct value', function () {
            assert.equal( W.take( [1, 2, 3, 4], 3 ).join( '' ), '123' );
        });
    });

    describe( 'when passed an empty array', function () {
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                W.take( [], 2 );
            });
        });
    });

});
