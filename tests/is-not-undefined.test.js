if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'isNotUndefined', function () {

    test( [undefined], false );
    test( [1,2,3,undefined,3,4,5], true );
    test( [1,undefined,3,5], true );
    test( [1,undefined,5], true );
    test( [undefined,undefined,undefined], false );
    test( [1,2,3,5], true );
    test( [1], true );
    test( ['yo'], true );
    test( [{}], true );
    test( [null], true );
    test( [0], true );
    test( [true], true );
    test( [false], true );

});

function test( args, expected ) {
    describe( 'when passed (' + args.map(function (v) { return typeof v; } ).join( ',' )+')', function () {
        it( 'should return ' + (( expected ) ? 'true' : 'false'), function () {
            assert.equal( W.isNotUndefined.apply( this, args ), expected );
        });
    });
}