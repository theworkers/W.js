if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'event-mixin', function () {

    describe( 'extending obj', function () {

        var obj = Object.create({});
        W.extend( obj, W.eventMixin );

        describe( 'should give obj', function () {
            it( 'a trigger method', function () {
                assert.equal( typeof obj.trigger, 'function' );
            });
            it( 'an on method', function () {
                assert.equal( typeof obj.on, 'function' );
            });
            it( 'an off method', function () {
                assert.equal( typeof obj.off, 'function' );
            });
            it( 'an events method', function () {
                assert.equal( typeof obj.events, 'function' );
            });
        });

        var EVENT_NAME = 'fake event';

        // Test agaisnt data
        var a = false;
        var b = false;
        var wildcard = false;
        var d1 = -1;
        var d2 = -1;
        var d3 = -1;
        var name = "";

        it( 'should allow adding events without throwing', function () {

            assert.doesNotThrow( function () {
                // Add events
                obj.on( EVENT_NAME, function ( data1, data2, data3 ) {
                    a = true;
                    d1 = data1;
                });
                obj.on( EVENT_NAME, function ( data1, data2, data3 ) {
                    b = true;
                    d2 = data2;
                });
                obj.on( '*', function ( eventname, data1, data2, data3 ) {
                    wildcard = true;
                    d3 = data3;
                    name = eventname;
                });
            });

        });

        describe( 'then triggering', function () {

            it( 'should return itself', function () {
                assert.equal( obj.trigger( EVENT_NAME, 1, 2, 3 ), obj );
            });

            it( 'and have invoked \'a\' listener', function () {
                assert.ok( a );
            });

            it( 'and have invoked \'b\' listener', function () {
                assert.ok( b );
            });

            it( 'and have invoked wildcard listener', function () {
                assert.ok( wildcard );
            });

            it( 'should have passed the correct trigger arguments', function () {
                assert.equal( a, true );
                assert.equal( b, true );
            });

            it( 'should have passed the event name to the wildcard listener', function () {
                assert.equal( name, EVENT_NAME );
            });

            it( 'as well as the trigger arguments', function () {
                assert.equal( d3, 3 );
            });

        });

    });

});