if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'inverse lerp', function () {

    describe( 'when 15, is between 10 and 20', function () {
        it( 'it return 0.5', function () {
            assert.equal( W.inverseLerp( 10, 20, 15 ), 0.5 );
        });
    });

    describe( 'when 0, is between -10 and 10', function () {
        it( 'it return 0.5', function () {
            assert.equal( W.inverseLerp( -10, 10, 0 ), 0.5 );
        });
    });

});