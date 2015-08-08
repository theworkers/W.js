if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'list', function () {

    describe( 'type', function () {
        it( 'is a  function', function () {
            assert.equal( typeof W.list, 'function' );
        });
        it( 'is a object when created', function () {
            assert.equal( typeof W.list(), 'object' );
        });
        it ( 'is a linked list', function () {
            assert.equal( W.list().first(), null );
            assert.equal( W.list().last(), null );
        });
    });

    describe( 'mutation', function () {

        var list = W.list();
        
        it( 'does not throw on append', function () {
            assert.doesNotThrow( function () {
                list.append( item( 'a' ), item( 'b' ), item( 'c' ), item( 'd' ) );
            });
        });

        it( 'append give the correct length', function () {
            assert.equal( list.length, 4 );
        });

        it( 'append has the correct value (using forEach)', function () {
            assert.equal( listAdd( list ), 'abcd' );
        });

        it( 'does not throw on prepend', function () {
            assert.doesNotThrow( function () {
                list.prepend( item( 'x' ), item( 'y' ), item( 'z' ) );
            });
        });

        it( 'append give the correct length', function () {
            assert.equal( list.length, 7 );
        });

        it( 'prepend has the correct value (using forEach)', function () {
            assert.equal( listAdd( list ), 'xyzabcd' );
        });

        it( 'remove give correct value (using at & ForEach)', function () {
            var obj;
            assert.doesNotThrow( function () {
                obj = list.at( 3 );
                list.remove( obj );
            });
            assert.equal( list.length, 6 );
            assert.equal( listAdd( list ), 'xyzbcd' );
        });

        var first;
        var last;

        it( 'returns first', function () {
            assert.doesNotThrow( function () {
                first = list.first();
            });
            assert.equal( first.v, 'x' );
            
        });

        it( 'returns last', function () {
            assert.doesNotThrow( function () {
                last = list.last();
            });
            assert.equal( last.v, 'd' );
        });

        it( 'send to front', function () {
            assert.doesNotThrow( function () {
                list.sendToFront( last );
            });
            assert.equal( list.first().v, 'd' );
        });

        it( 'send to back', function () {
            assert.doesNotThrow( function () {
                list.sendToBack( first );
            });
            assert.equal( list.last().v, 'x' );
        });
        
    });

    // Utils
    function item ( v ) {
        v = W.isUndefined( v ) ? null : v;
        return { v: v };
    }

    function listAdd ( list ) {
        var str = '';
        list.forEach( function ( obj ) { str += obj.v; } );
        return str;
    }

});
