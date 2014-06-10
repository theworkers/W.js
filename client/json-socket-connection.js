

// A socket connection which will attempt to say open
// Also attempts to parse incoming message
var JSONSocketConnection = W.Object.extend({
    // Options
    //  * socketUrl <String>
    //  * attemptReconnectionAfterMS <Number> - wait until attempting reconnection. Default 1000.
    // Events
    //  * "open"
    //  * "closed"
    //  * "reconnecting"
    //  * "closed successfully"
    //  * "json"
    //  * "nonjson"
    //  * "message"
    constructor : function (options) {
        W.extend(this, W.eventMixin);
        this.socketUrl = options.socketUrl;
        this._connectionDesired = false;
        this.attemptReconnectionAfterMS = (typeof options.attemptReconnectionAfterMS !== 'undefined') ? options.attemptReconnectionAfterMS : 1000;
    },
    openSocketConnection : function () {
        this._connectionDesired = true;
        var self = this;
        this.socket = new WebSocket(this.socketUrl); 
        this.socket.onopen = function () {
            self.trigger("open");
        };
        this.socket.onclose = function () {
            self.trigger("closed");
            if (self._connectionDesired) {
                setTimeout(W.bind(self.openSocketConnection, self), self.attemptReconnectionAfter);
                self.trigger("reconnecting");
            } else {
                self.trigger("closed successfully");
            }
        };
        this.socket.onmessage = function (message) {
            self.trigger("message", message);
            var wasError = false;
            try  {
                message = JSON.parse( message.data );
            }  catch (e) {
                self.trigger("nonjson", message.data);
                wasError = true;
                return;
            }
            if (!wasError) {
                self.trigger("json", message);
            }
        };
    },
    closeSocketConnection : function () {
        this._connectionDesired = false;
        this.socket.close();
    },
    //
    // @param obj <string/object> - if object it will be strignified
    // @param callback <function> - called with (err)
    send : function (obj, callback) {
        if (typeof obj === "string") {
            this.socket.send(obj);
            if (callback) { callback(); }
        } else {
            var str, wasError = false;
            try {
                str = JSON.stringify(obj);
            } catch (e) {
                wasError = true;
                if (callback) { callback(e); }
            }
            if (!wasError) {
                this.socket.send(str);
                if (callback) { callback(); }
            }
        }
    }
});