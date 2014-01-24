////
/// W.Timer
// @author Ross Cairns


var Timer = W.Object.extend({
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

// IE fix
Date.now = Date.now || function() { return +new Date; }; 

// Returns the elasped time since last
// tick. Also overriding so the time
// can be maually set so as not a
// realtime timer
W.TickTimer = W.Object.extend({
    constructor: function (options) {
        W.extend(this, W.EventMixin);
        this.lastTickTime = Date.now();
    },
    start: function () {
        if (this.isStarted===true) {
            return;
        }
        this.lastTickTime = Date.now();
        this.isStarted = true;
        this.trigger("started", this);
    },
    stopTicker: function () { 
        if (!this.isStarted) {
            return;
        }
        this.isStarted = false;
        this.trigger("stopped", this);

    },
    reset: function () {
        this.trigger("reset", this);
        this.lastTickTime = Date.now();
    },
    tick: function () {
        if (this.usesEvents) {
            this.trigger("tick", this);
        }
        this.lastTickTime = Date.now();
    },
    getTimeSinceLastTickMS: function () {
        return (this.isStarted) ? Date.now() - this.lastTickTime : 0;
    },
    getTimeSinceLastTickSec: function () {
        return (this.isStarted) ? (Date.now() - this.lastTickTime) / 1000 : 0;
    }
});
