function limit ( fn, maxArguments ) {
    return function () {
        return fn.apply( this, W.take( W.toArray( arguments ), maxArguments ) );
    };
}
