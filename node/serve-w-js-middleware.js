// Serves the client side W.js
// Avoid having to include W.js in a public folder as well as a node module
var fs = require( 'fs' );
var path = require( 'path' );
var file = fs.readFileSync( path.join( __dirname, '../build/W.js') ).toString('utf8');

module.exports = function ( req, res, next )  {
	res.header( 'Content-type', 'text/javascript; charset=UTF-8' );
	res.send( file ); 
};