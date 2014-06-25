// Checks that all passed arguments are not undefined
function isUndefined () {
	return Array.prototype.every.call( arguments, function (v) { return typeof v === 'undefined'; } );
}