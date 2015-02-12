// `makeRedisKey( 'ross', cairns )` === `'ross:cairns'` 
function makeRedisKey() {
    return W.interpose( Array.prototype.slice.call( arguments, 0 ), ":" ).join( '' );
}