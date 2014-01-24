// The self-propagating extend function that Backbone classes use.
W.extend = function ( protoProps, classProps ) {
    var child = inherits( this, protoProps, classProps );
    child.extend = this.extend;
    return child;
};