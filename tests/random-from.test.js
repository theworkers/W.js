if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'takeRandom', function () {

    describe( 'when invloked', function () {
        it( 'should return the correct value', function () {
            var v = W.randomFrom( [1, 2, 3, 4] );
            
            assert.equal( ( v === 1 ||
                            v === 2 ||
                            v === 3 ||
                            v === 4 ), true );
        });
    });

    describe( 'when passed an empty array', function () {
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                W.randomFrom( [], 2 );
            });
        });
    });

});
