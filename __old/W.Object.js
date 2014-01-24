////
/// W
// @author Ross Cairns
(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    // From Backbone
    // (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    // Backbone may be freely distributed under the MIT license.
    var ctor = function(){};
    var inherits = function(parent, protoProps, staticProps) {
        var child;
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ parent.apply(this, arguments); };
        }
        W.extend(child, parent);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        if (protoProps) W.extend(child.prototype, protoProps);
        if (staticProps) W.extend(child, staticProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };

    // The self-propagating extend function that Backbone classes use.
    var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };

    W.Object = function () {};
    W.Object.extend = extend;
}());
