
////
/// W.TouchEventViewMixin
// @author Ross Cairns

/**
 * Add touch events to a view.
 *
 * @example
 *          W.extend(this, W.TouchEventViewMixin);
 *          this.enableTouchEvents();
 *          this.bind("touchStart", this.touchStart, this);
 *
 */
var TouchEventViewMixin = {
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
