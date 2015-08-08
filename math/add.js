function add() {
    return W.toArray( arguments ).reduce( function ( acc, v ) { return acc + v; }, 0 );
}
