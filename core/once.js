function once ( fn ) {
    var hasTriggered = false;
    return function () {
        if ( !hasTriggered ) {
            hasTriggered = true;
            fn.apply( this, arguments );
        }
    };
}
