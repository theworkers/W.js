if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'once', function () {

    var i = 0;
    function inc ( num ) {i += num; }

    describe( 'when invloked', function () {
        
        var incOnce = W.once( inc );

        incOnce(1);
        incOnce(2);
        incOnce(1);
        incOnce(1);
        incOnce(1);
        
        it( 'should return the correct value', function () {
            assert.equal( i, 1 );
        });
        
    });

});
