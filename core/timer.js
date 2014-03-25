// IE fix
Date.now = Date.now || function() { return +new Date(); }; 

function Timer (options) {
    extend(this, EventMixin);
    this.options = extend({
        updateTime : 1000,
        loops : true,
        eventName : "fired",
        stoppedEventName : "stop",
        restartEventName : "restart"
    }, options);
    this.setIntervalID = undefined;
    this._count = 0; 
}

Timer.prototype = {
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
};
