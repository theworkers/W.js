function composePromisers( fns ) {
    fns = toArray( arguments );
    return function () {
        var args = toArray( arguments );
        return promise( function ( resolve, reject ) {
            var idx = -1;
            (function recur () {
                if ( ++idx >= fns.length ) {
                    resolve.apply( this, args );
                } else {
                    fns[ idx ].apply( this, args )
                        .success( function () {
                            args = toArray( arguments );
                            recur();
                        })
                        .error( reject );
                }
            }());
        });
    };
}