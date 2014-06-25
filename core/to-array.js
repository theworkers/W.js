// Can be used to turn arguments in to an array
// For example: var args = toArray( arguments );
function toArray ( obj ) {
    return Array.prototype.slice.call( obj );
}