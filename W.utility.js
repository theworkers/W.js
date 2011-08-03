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
        };
        
        /**
         * Shorten a string
         * @param {String} str  String to be shortened
         * @param {Boolean} useWordBoundary retain last wholeword
         **/
         W.utility.truncateString = function (str, length, useWordBoundary) {
            var  toLong = str.length>length,
                s_ = toLong ? str.substr(0,length-1) : str;
            s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
            return  toLong ? s_ +'...' : s_;
         };

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
			if( results === null )
				return resultObject;
			else {
				resultObject.name = results[0];
				if(results.length > 1) resultObject.value = results[1];
				return resultObject;
			}
        };
        
        /**
         * Create Authorisation Request for Basic HTTP Authetication 
         *
         **/
         W.utility.makeBaseAuth = function (user, password) {
             var tok = user + ':' + password;
             var hash = Base64.encode(tok);
             return "Basic " + hash;
         }

        /**
        *
        *  Base64 encode / decode
        *  http://www.webtoolkit.info/
        *
        **/
         
        var Base64 = {
         
            // private property
        	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
         
        	// public method for encoding
        	encode : function (input) {
        		var output = "";
        		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        		var i = 0;
         
        		input = Base64._utf8_encode(input);
         
        		while (i < input.length) {
         
        			chr1 = input.charCodeAt(i++);
        			chr2 = input.charCodeAt(i++);
        			chr3 = input.charCodeAt(i++);
         
        			enc1 = chr1 >> 2;
        			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        			enc4 = chr3 & 63;
         
        			if (isNaN(chr2)) {
        				enc3 = enc4 = 64;
        			} else if (isNaN(chr3)) {
        				enc4 = 64;
        			}
         
        			output = output +
        			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
         
        		}
         
        		return output;
        	},
         
        	// public method for decoding
        	decode : function (input) {
        		var output = "";
        		var chr1, chr2, chr3;
        		var enc1, enc2, enc3, enc4;
        		var i = 0;
         
        		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
         
        		while (i < input.length) {
         
        			enc1 = this._keyStr.indexOf(input.charAt(i++));
        			enc2 = this._keyStr.indexOf(input.charAt(i++));
        			enc3 = this._keyStr.indexOf(input.charAt(i++));
        			enc4 = this._keyStr.indexOf(input.charAt(i++));
         
        			chr1 = (enc1 << 2) | (enc2 >> 4);
        			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        			chr3 = ((enc3 & 3) << 6) | enc4;
         
        			output = output + String.fromCharCode(chr1);
         
        			if (enc3 != 64) {
        				output = output + String.fromCharCode(chr2);
        			}
        			if (enc4 != 64) {
        				output = output + String.fromCharCode(chr3);
        			}
         
        		}
         
        		output = Base64._utf8_decode(output);
         
        		return output;
         
        	},
         
        	// private method for UTF-8 encoding
        	_utf8_encode : function (string) {
        		string = string.replace(/\r\n/g,"\n");
        		var utftext = "";
         
        		for (var n = 0; n < string.length; n++) {
         
        			var c = string.charCodeAt(n);
         
        			if (c < 128) {
        				utftext += String.fromCharCode(c);
        			}
        			else if((c > 127) && (c < 2048)) {
        				utftext += String.fromCharCode((c >> 6) | 192);
        				utftext += String.fromCharCode((c & 63) | 128);
        			}
        			else {
        				utftext += String.fromCharCode((c >> 12) | 224);
        				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        				utftext += String.fromCharCode((c & 63) | 128);
        			}
         
        		}
         
        		return utftext;
        	},
         
        	// private method for UTF-8 decoding
        	_utf8_decode : function (utftext) {
        		var string = "";
        		var i = 0;
        		var c = c1 = c2 = 0;
         
        		while ( i < utftext.length ) {
         
        			c = utftext.charCodeAt(i);
         
        			if (c < 128) {
        				string += String.fromCharCode(c);
        				i++;
        			}
        			else if((c > 191) && (c < 224)) {
        				c2 = utftext.charCodeAt(i+1);
        				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        				i += 2;
        			}
        			else {
        				c2 = utftext.charCodeAt(i+1);
        				c3 = utftext.charCodeAt(i+2);
        				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        				i += 3;
        			}
         
        		}
         
        		return string;
        	}
         
        }

})(W);
