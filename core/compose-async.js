// __Description:__ Composes an array of functions into a single function which, when 
// called, will execute each of the functions sequentially and asynchronously, 
// passing on any returned arguments on to the next and finally the callback of the 
// return signature. When each of the functions in the array is called, the final
// argument will be the caller of the next.  
// __Arguments:__ `fns<Functions>...`
// __Returns:__ a function with the signture (args...<any>, callback<function>).
function composeAsync ( fns ) {
    var fns = toArray( arguments );
    return function () {
        var args = toArray( arguments );
        var finishedCallback = W.last( args );
        var initialArgs = W.withoutLast( args );
        var idx = -1;
        function next () {
            var args = toArray( arguments );
            if ( ++idx === fns.length-1 ) {
                args.push( finishedCallback );
            } else {
                args.push( next );
            }
            fns[ idx ].apply( this, args );
        }
        next.apply( this, initialArgs );
    };
}