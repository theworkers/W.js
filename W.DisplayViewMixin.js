// Copyright The Workers Ltd. 2012 (theworkers.net)
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
    
    W.DisplayViewMixin = {
        version : 1,
        setPosition : function (x, y) { // or setXY(array) or setXY({x:y:})
            if (_.isArray(x)) {
                this.x(x[0]);
                this.y(y[1]);
            } else if (_.isNumber(x)) {
                this.x(x);
                this.y(y);
            } else {
                this.x = x.x;
                this.y = x.y;
            }
        },
        setSize : function (width, height) { // or setSize(Array) or setSize({width:height}) or setSize(DOMElement)
            if (_.isElement(width)) {
                this.width($(width).width());
                this.height($(width).height());
            } else if (_.isNumber(width)) {
                this.width(width);
                this.height(height);
            } else if (_.isArray(width)) {
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
             if (_.isUndefined(this._x)) { this._x = 0; }
             return this._x;
         },
         y : function (y) {
             if (arguments.length > 0) { this._y = y; }
             if (_.isUndefined(this._y)) { this._y = 0; }
             return this._y;
         },
         width : function (width)  {
             if (arguments.length > 0) { this._width = width; }
             if (_.isUndefined(this._width)) { this._width = 0; }
             return this._width;
         },
         height : function (height) {
             if (arguments.length > 0) { this._height = height; }
             if (_.isUndefined(this._height)) { this._height = 0; }
             return this._height;
         }
     };

}());

