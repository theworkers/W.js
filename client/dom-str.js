// DOM String Creator
//
// Creates                                                                                                                                                                                                                   
//
// # Examples
//
// _<p>hello</p>_
// 
//    domStr()
//        .push( 'p' ).text( 'hello' ).pop()
//        .render();
//
// _<p class="intro ">hello</p>_
//
//    domStr()
//        .push( 'p' ).class( 'intro' ).text( 'hello' ).pop()
//        .render();
//
// _<div><p>hello</p><p id="yes">world</p></div>_
//
//    domStr()
//        .push( 'div' )
//            .push( 'p' ).text( 'hello' ).pop()
//            .push( 'p' ).id( 'yes' ).text( 'world' ).pop()
//        .pop()
//        .render();
//
//  _<div data-str="worked" /><div data-obj-as-arg="{"name":"fish"}" /><div data-single-arg="fish" /><div attr-name=100 attr-bool=true class="test " />_
//
//    domStr()
//        .push( 'div' ).attr( 'data-str', 'worked' ).pop()
//        .push( 'div' ).attr( 'data-obj-as-arg', { name: 'fish' } ).pop()
//        .push( 'div' ).attr( { 'data-single-arg': 'fish' } ).pop()
//        .push( 'div' ).attr( 'attr-name', 100 ).attr( 'attr-bool', true ).class( 'test' ).pop()
//        .render();

function domStr () {

    var isRoot = true;
    var parent = null;
    var tag = "";
    var children = [];
    var attributes = {};
    var isText = false;
    var text = "";

    var chain = {
        setIsRoot: function ( yN ) {
            isRoot = yN;
        },
        setParent: function ( parentChain ) {
            parent = parentChain;
            return chain;
        },
        tag: function ( tagName ) {
            tag = tagName;
            return chain;
        },
        setIsText: function ( yN ) {
            isText = yN;
            return chain;
        },
        setText: function ( str ) {
            text = str;
            return chain;
        },
        text: function ( str ) {
            var child = domStr();
            child.setIsText( true );
            child.setIsRoot( false );
            children.push( child );
            child.setText( str );
            return chain;
        },
        push: function ( tagName ) {
            var child = domStr();
            child.setParent( chain );
            child.tag( tagName );
            child.setIsRoot( false );
            children.push( child );
            return child;
        },
        pop: function () {
            return parent;
        },
        attr: function ( keyOrValue, value ) {
            if ( typeof keyOrValue === 'object' ) {
                attributes = W.extend( keyOrValue, attributes );
            } else {
                attributes[ keyOrValue ] = value;
            }
            return chain;
        },
        class: function ( name, etc ) {
            attributes.class = ( attributes.class || '' )  + W.toArray( arguments ).join( ' ' ) + ' ';
            return chain;
        },
        id: function ( id ) {
            attributes.id = id;
            return chain;
        },
        render: function () {
            return renderHead() + renderBody() + renderTail();
        }
    };

    function getAttrAsStr () {
        return Object.keys( attributes ).map( function ( key ) {
            var val = attributes[ key ];
            var str = ' ' + key;
            switch ( typeof val ) {
                case 'object': str += val === null ? '' : '="' + JSON.stringify( val ) + '"'; break;
                case 'undefined': break;
                case 'boolean': str += val ? '=true' : '=false'; break; 
                case 'number': str += '=' + val; break; 
                default: str += '="' + val + '"'; break;
            }
            return str;
        }).join( '' );
    }

    function renderHead () {
        if ( isRoot ) { return ''; }
        if ( isText ) { return text; }
        if ( children.length === 0 ) { return "<" + tag + getAttrAsStr() + " />"; }
        return "<" + tag + getAttrAsStr() + ">";
    }

    function renderBody () {
        if ( isText ) { return ''; }
        if ( children.length === 0 ) { return ""; }
        return children.map( function ( child ) { return child.render(); } ).join( '' );
    }

    function renderTail () {
        if ( isRoot ) { return ''; }
        if ( isText ) { return ''; }
        if ( children.length === 0 ) { return ""; }
        return "</" + tag + ">";
    }

    return chain;
}