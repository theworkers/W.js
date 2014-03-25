if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
}


// # Utils

function checkExists( name, typeString ) {
    describe( name, function () {
        it( 'should exist', function () {
            assert.notEqual( name, 'undefined' );
        });
    });
}

// # Export

var utils = {
	checkExists : checkExists
};

if (typeof module !== 'undefined' && module.exports) {
   module.exports = utils;
}