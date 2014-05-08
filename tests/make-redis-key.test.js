if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "makeRedisKey", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.makeRedisKey, 'function' );
    });

    describe( 'should return the same as passed when passed one argument', function () {
    	assert.equal( W.makeRedisKey( 'ross' ), 'ross' );
    });

    describe( 'should return the correct result with 1 argument', function () {
    	assert.equal( W.makeRedisKey( 'ross', 'cairns' ), 'ross:cairns' );
    });

    describe( 'should return the correct result with 4 argument', function () {
    	assert.equal( W.makeRedisKey( 'fish', 'n', 'chips', 'ftw' ), 'fish:n:chips:ftw' );
    });

});