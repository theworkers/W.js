if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'call', function () {

    var v = 0;

    function set( newValue, callback ) {
        v = newValue;
        W.call( callback );
    }

    function setTo5() { 
        v = 5; 
    }

    describe( 'when with a valid function', function () {

        describe( 'no extra arguments', function () {

            it( 'should not throw', function () {
                assert.doesNotThrow(function () {
                    W.call( function () {} );
                });
            });

            it( 'should have trigger the passed function', function () {
                W.call( setTo5 );
                assert.equal( v, 5 );
            });

        });

        describe( 'with passed extra arguments', function () {

            it( 'should trigger with arguments and not throw', function ( done ) {
                assert.doesNotThrow( function () {
                    W.call( set, 1, done );
                });
            });

            it( 'should trigger arguments with arguments and have the corrent result', function ( done ) {
                W.call( set, 3, function () {
                    assert.equal( v, 3 );
                    done();
                });
            });

        });
    });

    describe( 'when passed an invalid function', function () {
        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                W.call( undefined );
            });
            assert.doesNotThrow( function () {
                W.call();
            });
        });
    });

    describe( 'when passed an non function', function () {
        it( 'should not throw', function ( done ) {
            assert.doesNotThrow( function () {
                W.call( 2 );
                done();
            });
        });
    });

});