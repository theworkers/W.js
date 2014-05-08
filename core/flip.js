function flip( fn ) {
    return function () { 
        return fn.apply( fn, Array.prototype.slice.call( arguments ).reverse() ); 
    };
}