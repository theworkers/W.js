if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'isUndefined', function () {

    test( [undefined], true );
    test( [1,2,3,undefined,3,4,5], false );
    test( [1,undefined,3,5], false );
    test( [1,undefined,5], false );
    test( [undefined,undefined,undefined], true );
    test( [1,2,3,5], false );
    test( [1], false );
    test( ['yo'], false );
    test( [{}], false );
    test( [null], false );
    test( [0], false );
    test( [true], false );
    test( [false], false );

});

function test( args, expected ) {
    describe( 'when passed (' + args.map(function (v) { return typeof v; } ).join( ',' )+')', function () {
        it( 'should return ' + (( expected ) ? 'true' : 'false'), function () {
            assert.equal( W.isUndefined.apply( this, args ), expected );
        });
    });
}