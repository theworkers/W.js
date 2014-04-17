if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "object", function () {

    var Class;
    
    describe( "extend", function () {

        it( 'should be a function', function () {
            assert.equal( typeof W.Object.extend, 'function' );
        });

        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
                Class = W.Object.extend({
                    test : function () {
                        return true;
                    }
                });
            });
        })

        it( 'returning a function', function () {
            assert.equal( typeof Class, 'function' );
        });

        describe( 'then create new', function () {

            var instance;

            it( 'should not throw', function () {
                assert.doesNotThrow( function () {
                    instance = new Class();
                });
            });

            it( 'should have a test method', function () {
                assert.equal( typeof instance.test, 'function')
            });

            it( 'should have a test method which return true', function () {
                assert.equal( instance.test(), true );
            });

        });

    });

});