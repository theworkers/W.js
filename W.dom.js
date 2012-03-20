// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
(function () {
	// module setup inspired by underscore.js

	// Baseline setup
 	// --------------

  	// Establish the root object, `window` in the browser, or `global` on the server.
  	var root = this; 

  	var W = this.W || {};
  	
  	W.dom = {
  		version : 1,
  		defaultInputs : function (className) {
			$('input.' + className).live('focus', function () {
				$this = $(this);
				if($this.val() == this.defaultValue) {
					$this.val(''); 
				}
			});
			$('input.' + className).live('blur', function () {
				$this = $(this);
				if($this.val().length == 0) {
					$this.val(this.defaultValue);
				}
			});
  		}
  	};

	
})();