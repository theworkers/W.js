// Returns the elasped time since last
// tick. Also overriding so the time
// can be maually set so as not a
// realtime timer
function TickTimer (options) {
    extend(this, EventMixin);
    this.lastTickTime = Date.now();
}

TickTimer.prototype = {
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
};