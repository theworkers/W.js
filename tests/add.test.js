if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "add", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.add, 'function' );
    });

    describe( 'should return 0 when passed no arguments', function () {
    	assert.equal( W.add( ), 0 );
    });

    describe( 'should return the correct result with 1 argument', function () {
    	assert.equal( W.add( 2 ), 2 );
    });

    describe( 'should return the correct result with 4 argument', function () {
    	assert.equal( W.add( 10, 20, 30, 40 ), 100 );
    });

});