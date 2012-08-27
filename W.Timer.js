////
/// W.Timer
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

    W.Timer = W.Object.extend({
        constructor : function (options) {
            W.extend(this, W.EventMixin);
            this.options = W.extend({
                updateTime : 1000,
                loops : true,
                eventName : "fired",
                stoppedEventName : "stop",
                restartEventName : "restart"
            }, options);
            this.setIntervalID = undefined;
            this._count = 0; 
        },
        restart : function () {
            clearInterval(this._intervalId);
            this.trigger("restarting", this);
            this.start();
            return this;
        },
        start : function () {
            if (this._intervalId) { return false; }
            this.lastUpdate  = new Date().getTime();
            this._intervalId = setInterval(W.bind(this.update, this), 10 );
            return true;
        },
        // Blackberry uses stop
        stopTimer : function  () {
            if (this._intervalId) {
                clearInterval(this._intervalId);
                this._intervalId = undefined;
                this.trigger(this.options.stoppedEventName, this);
                return true;
            }
            return false;
        },
        update : function () {
            var currentTime = new Date().getTime();
            if (this.options.updateTime + this.lastUpdate < currentTime) {
                this._count++;
                this.trigger(this.options.eventName, this);
                if (this.options.loops) {
                    this.lastUpdate = currentTime;
                } else {
                    this.stopTimer();
                }
            }
            return this;
        },
        count : function () {
            return this._count;
        },
        resetCounter : function  () {
            this._count = 0;
        }
    });

}());