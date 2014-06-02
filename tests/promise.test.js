if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'Promise', function () {

    it( 'should be a function', function () {
        assert.equal( typeof W.Promise, 'function' );
    });

    it( 'should not throw', function () {
        assert.doesNotThrow( function () {
            var promise = W.Promise( function () {}  );
        });
    });

    describe( 'success', function () {
        it( 'should get called', function ( done )  {
            var p = W.Promise( function ( resolve, reject ) {
                resolve();
            });
            p.success( function () {
                assert( true );
                done();
            });
        });
    });

    describe( 'error', function () {
        var error = new Error( 'test failed' );
        var returnedError;

        it( 'should get called', function ( done )  {
            var p = W.Promise( function ( resolve, reject ) {
                reject( error );
            });
            p.error( function ( err ) {
                returnedError = err;
                done();
            });
        });

        it( 'should have passed the error', function ( done ) {
            assert.equal( error, returnedError );
            done();
        });

    });

    describe( 'done', function () {
        describe( 'with resolve', function () {
            it( 'should fire with correct args', function ( done ) {
                var p = W.Promise( function ( resolve, reject ) {
                    resolve( 1, 2 );
                });
                p.done( function ( err, v1, v2 ) {
                    assert.equal( v1, 1 );
                    assert.equal( v2, 2 );
                    assert.equal( err, null );
                    done();
                });
            });
        }); 
        describe( 'with reject', function ( done ) {
            it ( 'should be fired with an error', function ( done ) {
                var p = W.Promise( function ( resolve, reject ) {
                    reject();
                });
                p.done( function ( err ) {
                    assert( err instanceof Error );
                    done();
                });
            });
        });
    });

    describe( 'timeoutAfter', function () {
        it ( 'should fire with a function ', function ( done ) {
            var t = 0;
            var timeoutId;
            var p = W.Promise( function ( resolve, reject ) {
                timeoutId = setTimeout( function () {
                    t = 2;
                }, 100 );
            });
            p.timeoutAfter( 50, function () {
                t = 1;
                clearTimeout( timeoutId );
            });
            setTimeout( function () {
                assert.equal( t, 1 );
                done();
            }, 300 );
        });
    });

});