if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'report', function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.report, 'function' );
    });

    describe( 'should not throw', function () {
    	assert.doesNotThrow( function () {
    		W.report( 'ok', 'reporter' );
    	});
    });

});