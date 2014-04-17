if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'bind', function () {

    it( 'should be a function', function () {
       assert.equal( typeof W.bind, 'function' );
    });

    describe( 'binding', function () {
        
        function ClassA() { this.name = 'a'; }
        ClassA.prototype.getName = function() { return this.name; };
        function ClassB() { this.name = 'b'; }
        ClassB.prototype.getName = function() { return this.name; };

        var a = new ClassA();
        var b = new ClassB();
 		var bound;

        it( 'should not throw', function () {
            assert.doesNotThrow( function () {
            	bound = W.bind( a.getName, a );
            });
        });

        it( 'should return a function', function () {
            assert.equal( typeof bound, 'function' );
        });
       
        it( 'test hypothesis is correct', function () {
        	assert.equal( a.getName.apply( b ), 'b' );
        });

        it( 'should have protected bound from being in the context of b', function () {
            assert.notEqual( bound.apply( b ), 'b' );
        });

    });

});