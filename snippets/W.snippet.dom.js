(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }
    W.snippet = W.snippet || {};

    W.snippet.dom = W.dom || {};
    W.snippet.dom.version = "2.0.0";

    W.snippet.dom.viewportSize = function () {
		var e = window, 
			a = 'inner';
		if ( !( 'innerWidth' in window ) ){
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {width:e[a+'Width'],height:e[ a+'Height']};
	};


}());