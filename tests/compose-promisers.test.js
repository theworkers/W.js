if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'composeAsync', function () {

    describe( 'when called with no promisers', function () {

        it( 'should have returned a promise', function () {
            var composed = W.composePromisers();
            var p = composed();
            assert.equal( typeof p.success, 'function' );
            assert.equal( typeof p.error, 'function' );
        });

        it( 'should resolve when called', function ( done ) {
            var composed = W.composePromisers();
            var p = composed();
            p.success( function () {
                assert.ok( true );
                done();
            });
        });

    });

    function makeResolver () {
        return W.promise( function ( resolve, _ ) {
            setTimeout( function () {
                resolve();
            }, 0 );
        });
    }  

    function makeRejecter () {
        return W.promise( function ( _, reject ) {
            setTimeout( function () {
                reject( new Error( 'failed' ) );
            }, 0);
        });
    }  

    describe( 'when called with multiple promisers', function () {

        it( 'should have returned a promise', function () {
            var composed = W.composePromisers( makeResolver, makeResolver, makeResolver );
            var p = composed();
            assert.equal( typeof p.success, 'function' );
            assert.equal( typeof p.error, 'function' );
        });

        it( 'should resolve when all resolve', function ( done ) {
            var composed = W.composePromisers( makeResolver, makeResolver, makeResolver );
            var p = composed();
            p.success( function () {
                assert.ok( true );
                done();
            });
            p.error( function () {
                assert.ok( false );
                done();
            });
        });

        it( 'should reject when one rejects', function ( done ) {
            var composed = W.composePromisers( makeResolver, makeRejecter, makeResolver );
            var p = composed();
            p.success( function () {
                assert.ok( false );
                done();
            });
            p.error( function () {
                assert.ok( true );
                done();
            });
        });

    });

    function makeResolverWithArgs () {
        var args = arguments;
        return W.promise( function ( resolve, _ ) {
            setTimeout( function () {
                resolve.apply( this, args );
            }, 0 );
        });
    }  

    describe( 'when called with multiple promisers which carry arguments', function () {

        it( 'should resolve when all resolve', function ( done ) {
            var composed = W.composePromisers( makeResolverWithArgs, makeResolverWithArgs, makeResolverWithArgs );
            var p = composed( 1, 2, 3, 4 );
            p.success( function ( a, b, c, d ) {
                assert.deepEqual( [ a, b, c, d ], [ 1, 2, 3, 4 ] );
                done();
            });
            p.error( function () {
                assert.ok( false );
                done();
            });
        });

        it( 'should reject when one rejects', function ( done ) {
            var composed = W.composePromisers( makeResolverWithArgs, makeRejecter, makeResolverWithArgs );
            var p = composed();
            p.success( function ( a, b, c, d ) {
                assert.deepEqual( [ a, b, c, d ], [ 1, 2, 3, 4 ] );
                done();
            });
            p.error( function () {
                assert.ok( true );
                done();
            });
        });

    });

});