function partial( fn, arg1, arg2, etc ) {
    var rest = Array.prototype.slice.call( arguments, 1 );
    return function () {
        return fn.apply( this, Array.prototype.concat.apply( rest, arguments ) );
    };
}