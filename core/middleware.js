W.Middleware = function( options ) {
    var middleware = [];

    // Middleware handlers
    this.add = function ( fn ) {
        middleware.push( fn );
    };

    // Trigger to pass data through the middleware. Arguments passed will be sent to each middleware function + a `next` function.
    this.route = function () {
        var args = Array.prototype.slice.call( arguments );
        args.push( next );
        var middlewareCounter = -1;
        next();

        function next () {
            if ( ++middlewareCounter < middleware.length ) {
                middleware[ middlewareCounter ].apply( this, args );
            }
        }
    };
};
    