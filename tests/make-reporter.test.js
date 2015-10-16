if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'report', function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.makeReporter, 'function' );
    });

    describe( 'should not throw', function () {

        var result = null;

        it( 'when ran', function () {
            assert.doesNotThrow( function () {
                result = W.makeReporter( 'ok', 'makeReporter' );
                result = result();
            });
        });

        it( 'should returns a promise', function () {
            assert.equal( typeof result.success, 'function' );
            assert.equal( typeof result.error, 'function' );
        });

    });

});