if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "interpolations", function () {

	Object.keys( W.interpolations ).forEach( function ( key ) {

		describe( key, function () {

			it( 'should not throw', function () {

				assert.doesNotThrow( function () {
					W.interpolations[ key ]( 0.5  );
				} );

			});

		});

	});

});

