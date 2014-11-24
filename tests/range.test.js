if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'range', function () {

    describe( 'with only a length', function () {
        it( 'should return the correct value', function () {
            assert.equal( W.range( 5 )[ 4 ], 4 );
        });
    });

    describe( 'with length and start index', function () {
        it( 'should return the correct value', function () {
            assert.equal( W.range( 4, 5 )[ 4 ], 8 );
        });
    });

});
