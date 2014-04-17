// From Backbone
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
var ctor = function(){};
function objInherits (parent, protoProps, staticProps) {
    var child;
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ parent.apply(this, arguments); };
    }
    extend(child, parent);
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    if (protoProps) extend(child.prototype, protoProps);
    if (staticProps) extend(child, staticProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
}

// The self-propagating extend function that Backbone classes use.
function objExtend (protoProps, classProps) {
    var child = objInherits(this, protoProps, classProps);
    child.extend = objExtend;
    return child;
}

function Obj () {}
Obj.extend = objExtend;