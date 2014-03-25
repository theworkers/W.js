function ZIndexStack (options) {
    if (!options) { options = {}; }
    this.startZIndex = (typeof options.startZIndex === "undefined") ? 100 : options.startZIndex; 
    this.topZIndex = this.startZIndex;
    this.elList = new W.List();
}

ZIndexStack.prototype.addToTop = function (el) {
    $(el).css('z-index', ++this.topZIndex);
    this.elList.append(el);
};

ZIndexStack.prototype.sendToFront = function (el) {
    var zindexNeedle = this.topZIndex;
    this.elList.sendToBack(el);
    this.elList.each(function (el, i) {
        $(el).css('z-index', this.startZIndex + i);
    },this);
};
