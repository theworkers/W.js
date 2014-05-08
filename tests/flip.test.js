if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'flip', function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.flip, 'function' );
    });

    it( 'should return a function', function () {
       assert.equal( typeof W.flip( W.add, 0 ), 'function' );
    });

    function divide( a, b, c ) {
        return a / b / c;
    }

    it( 'should reverse the arguments', function () {
        // 1000 / 50 / 2 = 10
        // 2 / 50 / 1000 = 0.00004
        assert.equal( typeof divide, 'function' );
        assert.equal( W.flip( divide )( 1000, 50, 2 ), 0.00004 );

    });

});