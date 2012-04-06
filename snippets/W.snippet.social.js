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

    W.snippet.social = W.social || {};
    W.snippet.social.version = "2.0.0";

    ///
    // Twitter
    W.snippet.social.twitter = W.snippet.social.tiwtter || {};
    /** tweet link and/or message */
    W.snippet.social.twitter.tweet = function (options) {
        var string = W.use("string");
        if (!string.hasTld(window.location.href) && console) {
            console.warn("window.location.href does not have a top level domain, will not tweet");
            return;
        }
        var twitterurl = "https://twitter.com/share?";
        if (options && options.message) { twitterurl += "&text=" + encodeURIComponent(string.trim(options.message)); } else { throw "no message to send to twitter"; }
        if (options && options.link) { twitterurl += "&url="+options.link; }
        window.open(twitterurl, 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, menubar=0, directories=0, scrollbars=0'); //location=0, 
    };

    ///
    // Facebook
    W.snippet.social.facebook = W.snippet.social.facebook || {};
    /** tweet link and/or message */
    W.snippet.social.facebook.post  = function (options) {
        var string = W.use("string");
        if (!string.hasTld(window.location.href) && console) {
            console.warn("window.location.href does not have a top level domain, will not post on facebook");
            return;
        }
        var facebookurl = "http://www.facebook.com/sharer.php?";
        if (options && options.link) { facebookurl += "&u="+ encodeURIComponent(string.trim(options.link)); }
        if (options && options.message) { facebookurl += "&t="+ encodeURIComponent(string.trim(options.message)); }
        console.log(facebookurl);
        window.open(facebookurl, 'facebookwindow', 'height=300, width=645, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, menubar=0, directories=0, scrollbars=0'); //location=0, 
    };

}());