if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'promiseWrap', function () {

    it( 'should be a function', function () {
        assert.equal( typeof W.promiseWrap, 'function' );
    });

    it( 'should not throw', function () {
        assert.doesNotThrow( function () {
            var promise = W.promiseWrap( function () {}  )();
        });
    });

    describe( 'success', function () {
        it( 'should get called', function ( done )  {
            var p = W.promiseWrap( function () {} )();
            p.success( function () {
                assert( true );
                done();
            });
        });

        it( 'should send returned values as success arguments', function ( done ) {
            var p = W.promiseWrap( function () { return 10; } )(); 
            p.success( function ( v ) {
                assert.equal( v, 10 );
                done();
            });
        });
    });

    describe( 'error', function () {
        var error = new Error( 'Deliberate error' );

        it( 'should get called', function ( done )  {
            var p = W.promiseWrap( function () {
                throw error;
            })();
            p.error( function ( err ) {
                assert.equal( err, error );
                done();
            });
        });

    });

});
