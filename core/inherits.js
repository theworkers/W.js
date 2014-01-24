// From Backbone
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
W.inherits = function( parent, protoProps, staticProps ) {
    var ctor = function(){};
    var child;
    if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
        child = protoProps.constructor;
    } else {
        child = function(){ parent.apply( this, arguments ); };
    }
    W.extend( child, parent );
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    if ( protoProps ) W.extend( child.prototype, protoProps );
    if ( staticProps ) W.extend( child, staticProps );
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
};
