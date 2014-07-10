if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'compose', function () {

	function addOne ( v ) { return v + 1; }
	function doubl ( v ) { return v * 2; }
	function half ( v ) { return v / 2; }
    
    describe( 'when provided multiple functions', function () {

    	var composed;

    	it( 'should not throw when composing', function () {
    		assert.doesNotThrow( function () {
    			composed = W.compose( addOne, addOne, doubl, half, addOne );
    		});
    	});

    	it( 'should return a function', function () {
    		assert.equal( typeof composed, 'function' );
    	});

    	it( 'should return the correct result', function () {
    		assert.equal( composed( 8 ), 11 );
		});
        
    });

});