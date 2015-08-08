if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'once', function () {

    var i = 0;
    function inc () { ++i; }

    describe( 'when invloked', function () {
        
        var incOnce = W.once( inc );

        incOnce();
        incOnce();
        incOnce();
        incOnce();
        incOnce();
        
        it( 'should return the correct value', function () {
            assert.equal( i, 1 );
        });
        
    });

});
