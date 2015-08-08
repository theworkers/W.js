if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'negate', function () {

    describe( 'when invloked', function () {
        it( 'should return the correct value', function () {
            assert.equal( W.negate( false ), true );
            assert.equal( W.negate( true ), false );
        });
    });

});
