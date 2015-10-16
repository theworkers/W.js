if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'capitalizeFirstLetter', function () {

    it( 'should do it', function () {
       assert.equal( W.capitalizeFirstLetter( 'ross Cairns' ), 'Ross Cairns' );
    });

});