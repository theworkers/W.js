(function (W) {

        /**
         *  Utilities
         *  @namespace W.utility
         **/
  	W.utility = {};

        /**
         * Return the Path (Url stripped of protocol and get vars)
         **/
        W.utility.pathFromURL = function (url) {
            // Supports all protocols (file, ftp, http, https, whatever)
            return ( /^[a-z]+:\/\/\/?[^\/]+(\/[^?]*)/i.exec(url))[1];
        };

        /**
         * Tests if a string
         **/
        W.utility.stringStartsWith = function (str, test) {
            return str.substr(0, test.length) === test;
        }

		/**
         * Get URL Parameter
         * 
         * <br/><strong>Incomplete</strong>
         *
         * @param {string} name
         *	Parameter name to look for
         * @returns {Object} Result object with name and value of found parameter. 
         **/
        W.utility.getURLParameter = function (name) {
        	var resultObject = {name: "", value: ""}
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regexS = "[\\?&]"+name+"=([^&#]*)";
			var regex = new RegExp( regexS );
			var results = regex.exec( window.location.href );
			if( results == null )
				return resultObject;
			else {
				resultObject.name = results[0];
				if(results.length > 1) resultObject.value = results[1];
				return resultObject;
			}
        }



})(W);
