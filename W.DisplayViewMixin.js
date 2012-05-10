// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
//         garbage collections delays 
(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }
    
    W.DisplayViewMixin = {
        version : 1,
        setPosition : function (x, y) { // or setXY(array) or setXY({x:y:})
            if (typeof x === "[object Array]") {
                this.x(x[0]);
                this.y(y[1]);
            } else if (typeof x === "number") {
                this.x(x);
                this.y(y);
            } else {
                this.x = x.x;
                this.y = x.y;
            }
        },
        setSize : function (width, height) { // or setSize(Array) or setSize({width:height}) or setSize(DOMElement)
            if (!!width.tagName) {
                this.width($(width).width());
                this.height($(width).height());
            } else if (typeof width === "number") {
                this.width(width);
                this.height(height);
            } else if (typeof width === "height") {
                this.width(width[0]);
                this.height(width[1]);
            } else {
                this.width(_.isFunction(width.width) ? width.width() : width.width);
                this.height(_.isFunction(width.height) ? width.height() : width.height);
            }
            this.trigger("resize", width, height);
        },
        x : function (x) {
            if (arguments.length > 0) { this._x = x; }
            if (typeof this._x === "undefined") { this._x = 0; }
            return this._x;
        },
        y : function (y) {
            if (arguments.length > 0) { this._y = y; }
            if (typeof this._y === "undefined") { this._y = 0; }
            return this._y;
        },
        width : function (width)  {
            if (arguments.length > 0) { this._width = width; }
            if (typeof this._width === "undefined") { this._width = 0; }
            return this._width;
        },
        height : function (height) {
            if (arguments.length > 0) { this._height = height; }
            if (typeof this._height === "undefined") { this._height = 0; }
            return this._height;
        }
    };

}());

