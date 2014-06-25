if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
}

describe( 'withoutLast', function () {

    describe( 'when passed an array', function () {

        it( 'should return the array without the last element', function () {
            assert.deepEqual( W.withoutLast( [1, 2, 3, 5] ), [1, 2, 3] );
        });
        
    });

});