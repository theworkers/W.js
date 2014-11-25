if (typeof module !== 'undefined' && module.exports) {
    var assert = require( "assert" );
    var W = require( "../build/W.node.js" );
}

describe( 'domStr', function () {

	function addOne ( v ) { return v + 1; }
	function doubl ( v ) { return v * 2; }
	function half ( v ) { return v / 2; }
    
    describe( 'rendering', function () {
        var str;

        str = W.domStr()
           .push( 'p' ).text( 'hello' ).pop()
           .render();

    	compareStr( str, '<p>hello</p>' );
        
        str = W.domStr()
           .push( 'p' ).class( 'intro' ).text( 'hello' ).pop()
           .render();

        compareStr( str, '<p class="intro ">hello</p>' );

        str = W.domStr()
           .push( 'div' )
               .push( 'p' ).text( 'hello' ).pop()
               .push( 'p' ).id( 'yes' ).text( 'world' ).pop()
           .pop()
       .render();

        compareStr( str, '<div><p>hello</p><p id="yes">world</p></div>' );

        str = W.domStr()
           .push( 'div' ).attr( 'data-str', 'worked' ).pop()
           .push( 'div' ).attr( 'data-obj-as-arg', { name: 'fish' } ).pop()
           .push( 'div' ).attr( { 'data-single-arg': 'fish' } ).pop()
           .push( 'div' ).attr( 'attr-name', 100 ).attr( 'attr-bool', true ).class( 'test' ).pop()
           .render();

        compareStr( str, '<div data-str="worked" /><div data-obj-as-arg="{"name":"fish"}" /><div data-single-arg="fish" /><div attr-name=100 attr-bool=true class="test " />' );

    });

    function compareStr( str, expected ) {
        it( 'should match ' + expected, function () {
            assert.equal( str, expected );
        });
    }

});