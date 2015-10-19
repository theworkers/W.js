if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'promise', function () {

    it( 'should be a function', function () {
        assert.equal( typeof W.promise, 'function' );
    });

    it( 'should not throw', function () {
        assert.doesNotThrow( function () {
            var promise = W.promise( function () {}  );
        });
    });

    describe( 'success', function () {
        it( 'should get called', function ( done )  {
            var p = W.promise( function ( resolve, reject ) {
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
            var p = W.promise( function ( resolve, reject ) {
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
                var p = W.promise( function ( resolve, reject ) {
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
                var p = W.promise( function ( resolve, reject ) {
                    reject();
                });
                p.done( function ( err ) {
                    assert( err instanceof Error );
                    done();
                });
            });
        });
    });

    it( 'should once fire either resolve or reject once', function ( done ) {
        var count = 0;

        var p = W.promise( function ( resolve, reject ) {
            resolve();
            reject();
            reject();
            resolve();
        }).success( function  ( v ) {
            ++count;
        })
        .error( function ( v ) {
            ++count;
        });

        setTimeout( function () {
            assert.equal( count, 1 );
            done();
        }, 100 );

    });

    describe( 'timeoutAfter', function () {
        it ( 'should fire with a function ', function ( done ) {
            var t = 0;
            var timeoutId;
            var p = W.promise( function ( resolve, reject ) {
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

    describe( 'when two are triggered they', function () {

        var a = 0;
        var b = 0;


        W.promise( function ( resolve, reject ) {
            setTimeout( resolve, 5 );
        }).success( function () {
            a = 'a';
        });

        W.promise( function ( resolve, reject ) {
            setTimeout( resolve, 0 );
        }).success( function () {
            b = 'b';
        });

        it ( 'should both haved fired', function ( done ) {

            setTimeout( function () {

                assert.equal( a, 'a' );
                assert.equal( b, 'b' );

                done();

            }, 20 );

        });

    });

});
