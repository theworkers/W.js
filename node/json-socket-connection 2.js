// A client websocket connect which attempts to reconnect after disconnection and parse JSON message

// #Modules
var EventEmitter = require( "events" ).EventEmitter;
var util = require( "util" );

// #NPM 
var WebSocket = require( "ws" );

// #JSONSocketConnection
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
function JSONSocketConnection ( options ) {
    this.socketUrl = options.socketUrl;
    this._connectionDesired = false;
    this.attemptReconnectionAfterMS = (typeof attemptReconnectionAfterMS !== 'undefined') ? options.attemptReconnectionAfterMS : 1000;
}

// Add event emitter
util.inherits(JSONSocketConnection, EventEmitter);

JSONSocketConnection.prototype.openSocketConnection = function () {
    this._connectionDesired = true;
    var self = this;
    this.socket = new WebSocket(this.socketUrl); 
    this.socket.onopen = function () {
        self.emit("open");
    };
    this.socket.onclose = function () {
        self.emit("closed");
        if (self._connectionDesired) {
            setTimeout(W.bind(self.openSocketConnection, self), self.attemptReconnectionAfter);
            self.emit("reconnecting");
        } else {
            self.emit("closed successfully");
        }
    };
    this.socket.onmessage = function (message) {
        self.emit("message", message);
        var wasError = false;
        try  {
            message = JSON.parse( message.data );
        }  catch (e) {
            self.emit("nonjson", message.data);
            wasError = true;
            return;
        }
        if (!wasError) {
            self.emit("json", message);
        }
    };
};

JSONSocketConnection.prototype.closeSocketConnection = function () {
    this._connectionDesired = false;
    this.socket.close();
};
        
// @param obj <string/object> - if object it will be strignified
// @param callback <function> - called with (err)
JSONSocketConnection.prototype.send = function (obj, callback) {
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
};

module.exports = JSONSocketConnection;

