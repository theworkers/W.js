if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'composeAsync', function () {

    describe( 'called and conposed of single argument functions', function () {
        var callcount = 0;

        var composed = W.composeAsync([
            function ( acc, next ) { ++callcount; ++acc.inc; next( acc ); },
            function ( acc, next ) { ++callcount; ++acc.inc; next( acc ); },
            function ( acc, next ) { ++callcount; ++acc.inc; next( acc ); }
        ]);

        it( 'should return have return a function ', function (  ) {
            assert.equal(typeof composed, 'function' );
        });
        it( 'should should call its callback with the correct call count', function ( done ) {
            composed({inc:0}, function (acc) {
                assert.equal( callcount, 3 );
                assert.equal( acc.inc, 3 );
                done();
            });
        });
        it( 'and be executable again with the correct call amount', function ( done ) {
            composed({inc:0}, function (acc) {
                assert.equal( callcount, 6 );
                assert.equal( acc.inc, 3 );
                done();
            });
        });
    });

    describe( 'called and conposed of zero argument functions', function () {
        var callcount = 0;

        var composed = W.composeAsync([
            function ( next ) { ++callcount; next(); },
            function ( next ) { ++callcount; next(); },
            function ( next ) { ++callcount; next(); }
        ]);

        it( 'should return have return a function ', function (  ) {
            assert.equal( typeof composed, 'function' );
        });
        it( 'should should call its callback with the correct call count', function ( done ) {
            composed(function () {
                assert.equal( callcount, 3 );
                done();
            });
        });
        it( 'and be executable again with the correct call amount', function ( done ) {
            composed(function () {
                assert.equal( callcount, 6 );
                done();
            });
        });
    });

});