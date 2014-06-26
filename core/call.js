// Calls `fn` with any other passed arguments when `fn` is a function (i.e. not defined).
// For example:
// function ( callback ) {
//     var err = null;
//     var result = 1;
//     W.call( callback, err, result );
// }
//   
function call ( fn ) {
    if ( typeof fn === 'function' ) {
        fn.apply( this, rest( toArray( arguments ) ) );
    }
}