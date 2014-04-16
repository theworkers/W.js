if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'serve-w-js-min-middleware', function () {

    var middleware;

    describe( 'when required', function () { 
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                middleware = W.serveWJsMinMiddleware();
            });
        });

        it( 'should return a function', function () {
            assert.equal( typeof middleware, 'function' );
        });
    });

    describe( 'when triggered', function () {

        var result;

        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                middleware( null, {
                    send: function ( dataToBeSent ) {
                        result = dataToBeSent;
                    },
                    header: function () {}
                }, null );
            });
        });

        describe( 'should try to send', function () {

            it( 'something ok', function () {
                assert.ok( result );
            });

            it( 'something long', function () {
                assert.ok( result.length > 100 );
            });

        });

    });

});

