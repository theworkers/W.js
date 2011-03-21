////////////////////////////    W Utils for node.
//    ///////////////    ///    Copyright (c) 2011 The Workers, RossCairns.com
///    /////////////    ////    Authors: Ross Cairns
////    ///// /////    /////
/////    ///   ///    //////
//////    /     /    ///////
///////             ////////
////////    //     /////////
/////////  ////   //////////
////////////////////////////


/* This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * http://creativecommons.org/licenses/LGPL/2.1/
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
*/

(function () {
	// module setup inspired by underscore.js

	// Baseline setup
 	// --------------

  	// Establish the root object, `window` in the browser, or `global` on the server.
  	var root = this; 

        /**
         * Global refernce to this
         * @name W
         * @class
        */
  	var W = new Object();

  	// Establish the object that gets returned to break out of a loop iteration.
  	var breaker = {};

	// Export the Underscore object for **CommonJS**, with backwards-compatibility
	// for the old `require()` API. If we're not in CommonJS, add `_` to the
	// global object.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = W;
		root.W = W;
	} else {
		root.W = W;
	}

	/** Current version. */
	W.VERSION = '0.0.1';
        
	/**
         * Asynchronous Loop
         *
         * @param   {Number}    iterations      Number of times to run
         * @param   {Function}  func            Function to execute in  iteration.
         *                                      Must call loop.next() when finished.
         * @param   {Function}  callback        On loop finshed call back
         *
   	 * @example
   	 * 		W.aloop(10, 
         *                      function (index, loop) {
         *                          log(index);
         *                          loop.next();
         *                      },
         *                      function () {
         *                          log('finished');
         *                      }
        *               );
   	*/
	W.aloop = function (iterations, func, callback) {
	    var index = 0;
	    var done = false;
	    var loop = {
	        next: function() {
	            if (done) {
	                return;
	            }

	            if (index < iterations) {
	                index++;
	                func(index-1, loop);

	            } else {
	                done = true;
	                callback();
	            }
	        },
	        'break': function() {
	            done = true;
	            callback();
	        }
	    };
	    loop.next();
	    return loop;
	};

	
	    
	/**
	 * Bind function to scope. Useful for events
	 * @param   {Object}     scope    Scope of the function to be executed in
	 * @param   {Function}   fn     function
	 *
	 * @example $("div").fadeIn(100, W.bind(this, this.transitionDidFinish));
	 */
	W.bind = function bind(scope, fn) {
	        return function () {
	        fn.apply(scope, arguments);
	    };
	}

   	/** @namespace W.text */
	W.text = {};

	/**
    * Add Commas
	*/
	W.text.addCommas = function (number) {

		number = '' + number;
		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0,mod)) : '');
			for (i=0 ; i < Math.floor(number.length / 3); i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
				else
					output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}
			return (output);
		}
		else return number;

	};
	
	/** Trim leading and ending whitespace */
	W.text.contains = function (str, test) { return (str.indexOf(test) != -1 ) }
	
	/** Trim leading and ending whitespace */
	W.text.trim = function(str) { return (str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")) }
	
	/** Test string starts with */
	W.text.startsWith = function(str, test) { return (test.match("^"+test)==test) }
	
	/** Test string ends with */
	W.text.endsWith = function(str, test) { return (str.match(test+"$")==test) }
	
	/** add W.text functionality to string Prototype 
	* <strong>incomplete / todo</strong>
	*/
	W.text.enableStringPrototype = function () {
		
	}
	
	
    /** @namespace W.console */
    W.console = {};

    /**
     *  Safe console. Aliased using W.l(); or W.log();
     *  @param      {Object ...}    obj     Objects to log to console
     **/
    W.console.log = function () {
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
            //alert(args);
            return false;
        }
    };

    /**#@+
     *  Alias of {@link W.console.log}()
     *  @methodOf   W
     *  @param      {Object ...}    obj     Objects to log to console
     **/
    /** */  W.log = W.console.log;
    /** */  W.l = W.log;
    /**#@-*/

 
    /**
     *  Safe console warning. Aliased using W.w(); or W.warn();
     *  @param      {Object ...}    obj     Objects sent to console as warning
     **/
    W.console.warn = function () {
        if(arguments.length > 0) {

            // join for graceful degregation
            var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];

            // this is the standard; firebug and newer webkit browsers support this
            try {
                    console.warn(args);
                    return true;
            } catch(e) {
                   
            }
            return false;
        }
    };

     /**#@+
     *  Alias of {@link W.console.warn}(obj)
     *  @methodOf   W
     *  @param      {Object ...}    obj     Objects sent to console as warning
     **/
    /** */  W.warn = W.console.warn;
    /** */  W.w = W.warn;
    /**#@-*/

    /**
     * Use to mark a function as a place holder during development
     * @param   {String ...}     name    Name of the stub method / function plus any additional details
     *
     */
    W.stub = function () {
        if(arguments.length > 0) {

            // join for graceful degregation
            var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];

            // this is the standard; firebug and newer webkit browsers support this
            try {
                    W.warn("@stub: "+ args);
                    return true;
            } catch(e) {

            }
            return false;
        }
    }



})();
