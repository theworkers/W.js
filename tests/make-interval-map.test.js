if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( "makeIntervalMap", function () {

    it( 'should return a object', function () {
       assert.equal( typeof W.makeIntervalMap(), 'object' );
    });

    describe( 'should return the same value when nothing is set', function () {
        assert.equal( W.makeIntervalMap().map( 10 ), 10 );
    });

    describe( 'should clamp', function () {
        assert.equal( W.makeIntervalMap().clamp().map( 10 ), 1 );
    });

    describe( 'map', function () {
        assert.equal( W.makeIntervalMap().from( 0, 2 ).to( 0, 10 ).map( 1 ), 5 );
    });
});