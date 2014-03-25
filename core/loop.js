/**
* Asynchronous Loop
*
* @param   {Number}    iterations      Number of times to run
* @param   {Function}  fn            Function to execute in  iteration.
*                                      Must call loop.next() when finished.
* @param   {Function}  callback        On loop finshed call back
*
* @example
*      W.aloop(10,
*           function (index, next, end) {
*               log(index);
*               next();
*           },
*           function () {
*               log('finished');
*           }
*       );
*/
function loop ( iterations, fn, callback ) {
    var index = 0;
    var done = false;
    var end =  function() {
        done = true;
        callback();
    };
    var next = function() {
        if ( done ) { return; }
        if ( index < iterations ) {
            index++;
            fn( index-1, next, end );
        } else {
            done = true;
            if ( callback ) { callback(); }
        }
    };
    next();
    return next;
}
