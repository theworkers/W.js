if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'cycle', function () {
    
    describe( 'when provided an array of three items', function () {

        var fn = cycle( [ 1, 2, 3 ] );

        it( 'it should cycle', function () {
            assert.deepEqual( [ fn(), fn(), fn(), fn() ], [ 1, 2, 3, 4 ] );
        });
        
    }); 

});