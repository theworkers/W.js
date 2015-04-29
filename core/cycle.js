function cycle ( arr ) {
    var idx = -1;
    return function () {
        if ( ++idx >= arr.length ) { idx = 0; }
        return arr[ idx ]; 
    };
}