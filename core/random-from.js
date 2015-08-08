function randomFrom ( arr ) {
    if ( arr.length < 1 ) { return; }
    return arr[ Math.floor( Math.random() * arr.length ) ];
}
