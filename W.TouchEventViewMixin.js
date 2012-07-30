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
    /**
     * Add touch events to a view.
     *
     * @example
     *          W.extend(this, W.TouchEventViewMixin);
     *          this.enableTouchEvents();
     *          this.bind("touchStart", this.touchStart, this);
     *
     */
    W.TouchEventViewMixin = {
        version : 1,
        enableTouchEvents : function () {
            this.el.ontouchstart = _.bind(function (event) {
                this.trigger("touchStart", event);
            }, this);
            this.el.ontouchmove = _.bind(function (event) {
                this.trigger("touchMove", event);
            }, this);
            this.el.ontouchend = _.bind(function (event) {
                this.trigger("touchEnd", event);
            }, this);
            this.el.ontouchcancel = _.bind(function (event) {
                this.trigger("touchCancel", event);
            }, this);
        }
    };
}());

