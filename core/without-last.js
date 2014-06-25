function withoutLast ( arr ) {
    return Array.prototype.slice.call( arr, 0, arr.length-1 );
}