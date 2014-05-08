function add() {
    var result = 0;
    Array.prototype.forEach.call( arguments, function ( n ) { result += n; } );
    return result;
}