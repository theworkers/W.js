(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    W.Timer = W.Object.extend({
        constructor : function (options) {
            W.extend(this, W.EventMixin);
            this.options = W.extend({
                updateTime : 1000,
                loops : true,
                eventName : "fired"
            }, options);
            this.setIntervalID = undefined;
        },
        restart : function () {
            this.stopTimer();
            this.start();
        },
        start : function () {
            this.lastUpdate  = new Date().getTime();
            this.setTimeoutID = setInterval(W.bind(this.update, this), 10 );
        },
        stopTimer : function  () {
            clearInterval(this.setTimeoutID);
        },
        update : function () {
            var currentTime = new Date().getTime();
            if (this.options.updateTime + this.lastUpdate < currentTime) {
                this.stopTimer();
                this.trigger(this.options.eventName);
                if (this.options.loops) {
                    this.start();
                }
            }
        }
    });

}());