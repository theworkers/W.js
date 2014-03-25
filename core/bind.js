var nativeBind = Function.prototype.bind;
/**
 * Bind function to scope. Useful for events.
 * @param   {Function}   fn     function
 * @param   {Object}     scope    Scope of the function to be executed in
 * @example $("div").fadeIn(100, W.bind(this, this.transitionDidFinish));
*/
function bind( fn, scope ) {
    var bound, args;
    if ( fn.bind === nativeBind && nativeBind ) return nativeBind.apply( fn, slice.call( arguments, 1 ) );
    args = slice.call( arguments, 2 );
    // @todo: don't link this
    bound = function() {
        if ( !(this instanceof bound) ) return fn.apply( scope, args.concat( slice.call( arguments ) ) );
        W.ctor.prototype = fn.prototype;
        var self = new ctor();
        var result = fn.apply( self, args.concat( slice.call( arguments ) ) );
        if ( Object( result ) === result ) return result;
        return self;
    };
    return bound;
}