if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "interpose", function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.interpose, 'function' );
    });

    describe( 'when passed a one item array with a seperator', function () {

        var collection = [ 'fish' ];
        var seperator = "n";
        var expected = [ 'fish' ];

        it( 'should match expectations', function () {
            assert.deepEqual( W.interpose( collection, seperator ), expected );
        });

    });

    describe( 'when passed a two items array with a seperator', function () {

        var collection = [ 'fish', 'chips' ];
        var seperator = "n";
        var expected = [ 'fish', 'n', 'chips' ];

        it( 'should match expectations', function () {
            assert.deepEqual( W.interpose( collection, seperator ), expected );
        });
    });

    describe( 'when passed a three items array with a seperator', function () {

        var collection = [ 'fish', 'chips', 'mushy peas' ];
        var seperator = "n";
        var expected = [ 'fish', 'n', 'chips', 'n', 'mushy peas' ];

        it( 'should match expectations', function () {
            assert.deepEqual( W.interpose( collection, seperator ), expected );
        });

    });
    
});