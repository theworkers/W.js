// For options and giggles:
// https://github.com/ai/autoprefixer

var autoprefixer = require('autoprefixer');
var fs = require('fs');
var url = require('url');
var path = require('path');
var filesMap = {};


module.exports = function ( options ) {
	options = options || {};

	if (!options.src) { throw new Error('autoprefixer-mw requires "src" directory'); }


	return function ( req, res, next ) {

		var pathname = url.parse(req.url).pathname;
		var filename = path.resolve( options.src + pathname );

		// Skip if request is not GET or HEAD
		if ('GET' !== req.method.toUpperCase() && 'HEAD' !== req.method.toUpperCase()) {
			return next();
		}

		// Skip if request is not for a CSS file
		if ( path.extname(pathname) !== '.css' ) {
			return next();
		}

		filesMap[filename] = filesMap[filename] || {};
		filesMap[filename].stats = filesMap[filename].stats || {};

		fs.stat(filename, function ( err, stats ) {

			if (err || !stats.isFile() || filesMap[filename].stats.mtime && stats.mtime.getTime() === filesMap[filename].stats.mtime.getTime() ) {
				return next(err);
			}

			fs.readFile( filename, {encoding:'utf8'}, function ( err, css ) {
				var prefixed;
				try {
					prefixed = autoprefixer( options.args ).process(css, options.options).css;
				} catch ( error ) {
					return next(err);
				}

				fs.writeFile( filename, prefixed, {encoding:'utf8'}, function ( err ) {
					if (err) {
						return next(err);
					}
				
					next();

					fs.stat( filename, function ( err, stats ) {
						if (err) {
							return next(err);
						}

						filesMap[filename].stats = stats;
					});
				});
			});
		});
	};
};