if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
}

// # Utils

function checkExists( name, typeString ) {
    describe( name, function () {
        it( 'does not exist', function () {
            assert.notEqual( typeString, 'undefined' );
        });
    });
}

function spit () {
    console.log( '\n', Array.prototype.join.call( arguments, ' ' ), '\n' );
}

// # Export

var utils = {
	checkExists : checkExists,
	spit : spit
};

if (typeof module !== 'undefined' && module.exports) {
   module.exports = utils;
}