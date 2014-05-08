if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "partial", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.partial, 'function' );
    });

    it( 'should return a function', function () {
       assert.equal( typeof W.partial( W.add, 0 ), 'function' );
    });

    describe( 'should return the correct result with 1 argument', function () {
        assert.equal( W.partial( W.add, 2 )( 2 ), 4 );
    });

    describe( 'should return the correct result with 4 argument', function () {
        assert.equal( W.partial (W.add, 2, 10, 1, 1 )( 2, 1000 ), 1016 );
    });

});