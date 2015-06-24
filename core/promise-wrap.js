function promiseWrap( fn ) {
    return function () {
        return W.promise( function ( resolve, reject ) {
            var result;
            try {
                result = fn();
            } catch ( err )  {
                return reject( err );
            }
            resolve.call( this, result );
        });
    };
}
