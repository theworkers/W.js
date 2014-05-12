if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "Router", function () {

    describe( "Plain routes", function () {
        var result = 0;
        var router = new W.Router();

        router
            .map( 'fish' )
                .to( function ( route, next ) {
                    next();
                })
                .to( function () {
                    result = 1;
                })
            .map( 'chips' ).to( function ( ) {
                result = 2;
            })
            .map( 'peas' ).to( function () {
                result = 3;
            })
            .noMatch( function () {
                result = -1;
            });

        testTrigger( 'fish', 1 );
        testTrigger( 'chips', 2 );
        testTrigger( 'peas', 3 );
        testTrigger( 'boom', -1 );

        function testTrigger( route, expResult ) {
            describe( 'trigger: ' +route , function () {
                it( 'should have triggered', function ( done ) {
                    router.trigger( route ).onDone( function () {
                        assert.equal( expResult, result );
                        done();
                    });
                });
            });
        }

    });

    describe( "Routes with params", function () {
        var result = 0;
        var type = "";
        var router = new W.Router();

        router
            .map( 'fish/:type/' ).to( function ( route ) {
                result = 1;
                type = route.params.type;
            })
            .map( 'chips/:type/' ).to( function ( route ) {
                result = 2;
                type = route.params.type;
            })
            .map( 'peas/:type/' ).to( function ( route ) {
                result = 3;
                type = route.params.type;
            })
            .noMatch( function () {
                result = -1;
                type = null;
            });

        testTrigger( 'fish/haddock/', 'haddock', 1 );
        testTrigger( 'chips/potatoe/', 'potatoe', 2 );
        testTrigger( 'chips/fried/', 'fried', 2 );
        testTrigger( 'peas/green/', 'green', 3 );
        testTrigger( 'boom/broken/', null, -1 );

        function testTrigger( route, expType, expResult ) {
            describe( 'trigger: ' +route , function () {
                it( 'should have triggered', function ( done ) {
                    router.trigger( route ).onDone( function ( ) {
                        assert.equal( expResult, result );
                        assert.equal( expType, type );
                        done();
                    });
                });
            });
        }

    });

    describe( "Routes with method", function () {
        var result = 0;
        var router = new W.Router();

        router
            .map( 'fish', 'GET' ).to( function () {
                result = 1;
            })
            .map( 'fish', 'POST' ).to( function () {
                result = 2;
            })
            .map( 'chips', [ 'GET', 'PUT' ] ).to( function () {
                result = 3;
            }) 
            .map( 'peas' ).to( function () {
                result = 4;
            })
            .noMatch( function () {
                result = -1;
            });

        testTrigger( 'fish', 'GET', 1 );
        testTrigger( 'fish', 'POST', 2 );
        testTrigger( 'chips', 'PUT', 3 );
        testTrigger( 'chips', 'GET', 3 );
        testTrigger( 'chips', 'PUT', 3 );
        testTrigger( 'peas', null, 4 );
        testTrigger( 'spaceships', null, -1 );

        function testTrigger( route, method, expResult ) {
            describe( 'trigger: ' +route +' with method: ' +method, function () {
                it( 'should have triggered', function ( done ) {
                    if ( method ) {
                        router.trigger( route ).withMethod( method ).onDone( function () {
                            assert.equal( expResult, result );
                            done();
                        });
                    } else {
                        router.trigger( route ).onDone( function () {
                            assert.equal( expResult, result );
                            done();
                        });
                    }
                });
            });
        }
    });

    describe( "Routes with method and toWhenMethod filter", function () {
        var a = -1;
        var b = -1;
        var router = new W.Router();

        router
            .map( 'fish', [ 'GET', 'POST', 'SHIP' ] )
                .to( function ( route, next ) {
                    next();
                })
                .toWhenMethod( 'GET', function ( route, next ) {
                    a = 1;
                    next();
                })
                .toWhenMethod( [ 'POST', 'SPACESTATION' ], function ( route, next ) {
                    a = 2;
                    next();
                })
                .to( function ( route, next ) {
                    b = 1;
                })
            .noMatch( function () {
                a = -2;
            });

        describe( 'trigger with no method', function () {
            it( 'should have triggered', function ( done ) {
                router.trigger( 'fish' ).onDone( function () {
                    assert.equal( a, -2 );
                    assert.equal( b, -1 );
                    done();
                });
            });
        });

        describe( 'trigger with GET method', function () {
            it( 'should have triggered', function ( done ) {
                router.trigger( 'fish' ).withMethod( 'GET' ).onDone( function () {
                    assert.equal( a, 1 );
                    assert.equal( b, 1 );
                    done();
                });
            });
        });

        describe( 'trigger with POST method', function () {
            it( 'should have triggered', function ( done ) {
                router.trigger( 'fish' ).withMethod( 'POST' ).onDone( function () {
                    assert.equal( a, 2 );
                    assert.equal( b, 1 );
                    done();
                });
            });
        });

        describe( 'trigger with no method and no match', function () {
           it( 'should have triggered', function ( done ) {
                router.trigger( 'chips' ).withMethod( 'WARSHIP' ).onDone( function () {
                    assert.equal( a, -2 );
                    done();
                });
            });
        });

    });

    describe( "Routes with additional arguments", function () {
        var result = 0;
        var router = new W.Router();
        var actualA = 0;
        var actualB = 0;
        var actualC = 0;

        router
            .map( 'fish', 'GET' ).to( function ( route, a, b, c ) {
                result = 1;
                actualA = a;
                actualB = b;
                actualC = c;
            })
            .map( 'fish', 'POST' ).to( function ( route, a, b, c ) {
                result = 2;
                actualA = a;
                actualB = b;
                actualC = c;
            })
            .map( 'chips', [ 'GET', 'PUT' ] ).to( function ( route, a, b, c ) {
                result = 3;
                actualA = a;
                actualB = b;
                actualC = c;
            })
            .map( 'peas' ).to( function ( route, a, b, c ) {
                result = 4;
                actualA = a;
                actualB = b;
                actualC = c;
            })
            .noMatch( function ( route ) {
                result = -1;
                actualA = -2;
                actualB = -3;
                actualC = -4;
            });

        testTrigger( 'fish', 'GET',  1, 2, 4, 1002  );
        testTrigger( 'fish', 'POST', 2, 7, 9, 1002 );
        testTrigger( 'chips', 'PUT', 3, 34, "bbbb", 1002  );
        testTrigger( 'chips', 'GET', 3, [], 123, 1002  );
        testTrigger( 'chips', 'PUT', 3, 123, 1002  );
        testTrigger( 'peas', null, 4, 123, 345, 1002 );
        testTrigger( 'spaceships', null, -1, -2, -3, -4 );

        function testTrigger( route, method, expResult, expectedA, expectedB, expectedC ) {
            describe( 'trigger: ' +route +' with method: ' +method, function () {
                it( 'should have triggered', function ( done ) {
                    if ( method ) {
                        router.trigger( route, expectedA, expectedB, expectedC ).withMethod( method ).onDone( function () {
                            assert.equal( expResult, result );
                            assert.equal( expectedA, actualA );
                            assert.equal( expectedB, actualB );
                            assert.equal( expectedC, actualC );
                            done();
                        });
                    } else {
                        router.trigger( route, expectedA, expectedB, expectedC ).onDone( function () {
                            assert.equal( expResult, result );
                            assert.equal( expectedA, actualA );
                            assert.equal( expectedB, actualB );
                            assert.equal( expectedC, actualC );
                            done();
                        });
                    }
                });
            });
        }
    });

});