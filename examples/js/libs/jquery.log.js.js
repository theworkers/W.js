/**
 * Copyright (C) 2009 Jonathan Azoff <jon@azoffdesign.com>
 *
 * This script is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 *
 * jQuery.log v1.0.0 - A jQuery plugin that unifies native console logging across browsers
 *
 * @usage		call jQuery.log([args...]) to write to attempt to write to the console of any browser.
 *				**See http: *azoffdesign.com/plugins/js/log for an example.
 * @param 		args...	one or more javascript objects to be written to the console
 * @returns 	true if a console was detected and successfully used, false if the plug-in had to resort to alert boxes
 * @note 		if a plug-in cannot be located then an alert is called with the arguments you wish to log. Multiple
 *              arguments are separated with a space.
 * @depends 	just make sure you have jQuery and some code you want to debug.
 */
(function($){
	$.extend({"log":function(){
		if(arguments.length > 0) {

			// join for graceful degregation
			var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];

			// this is the standard; firebug and newer webkit browsers support this
			try {
				console.log(args);
				return true;
			} catch(e) {
				// newer opera browsers support posting erros to their consoles
				try {
					opera.postError(args);
					return true;
				} catch(e) { }
			}

			// catch all; a good old alert box
			alert(args);
			return false;
		}
	}});
})(jQuery);