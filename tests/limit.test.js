if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'limit', function () {

    describe( 'when invloked', function () {

        function add () {
            return W.toArray( arguments ).reduce( function ( acc, v ) { return acc + v; }, 0  ) ;
        }
        
        it( 'should return the correct value', function () {
            assert.equal( W.limit( add, 3 )( 1,1,1,1,1,1,1,1 ), 3 );
        });
    });

});
