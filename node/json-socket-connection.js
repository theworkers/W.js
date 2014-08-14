// A client websocket connect which attempts to reconnect after disconnection and parse JSON message

// #Modules
var EventEmitter = require( 'events' ).EventEmitter;
var util = require( 'util' );

// #NPM 
var WebSocket = require( 'ws' );

// #JSONSocketConnection
// Options
//  * socketUrl <String>
//  * attemptReconnectionAfterMS <Number> - wait until attempting reconnection. Default 1000.
// Events
//  * 'open'
//  * 'closed'
//  * 'reconnecting'
//  * 'closed successfully'
//  * 'json'
//  * 'nonjson'
//  * 'message'
function JSONSocketConnection ( options ) {
    this.socketUrl = options.socketUrl;
    this._connectionDesired = false;
    this.attemptReconnectionAfterMS = (typeof options.attemptReconnectionAfterMS !== 'undefined') ? options.attemptReconnectionAfterMS : 1000;
}

// Add event emitter
util.inherits(JSONSocketConnection, EventEmitter);

JSONSocketConnection.prototype.openSocketConnection = function () {
    this._connectionDesired = true;
    var self = this;
    this.socket = null;
    try {
        this.socket = new WebSocket(this.socketUrl); 
    } catch (err) {
        self.emit('error', err);
    }
    this.socket.onopen = function () {
        self.emit('open');
    };
    this.socket.onclose = errorHandler;
    this.socket.onerror = errorHandler;
    // WS Method
    this.socket.on( 'error', errorHandler );
    this.socket.on( 'close', errorHandler );
    this.socket.onmessage = function (message) {
        self.emit('message', message);
        var wasError = false;
        try  {
            message = JSON.parse( message.data );
        }  catch (e) {
            self.emit('nonjson', message.data);
            wasError = true;
            return;
        }
        if (!wasError) {
            self.emit('json', message);
        }
    };

    function errorHandler() {
        self.emit('closed');
        if (self._connectionDesired) {
            setTimeout(function () {
                self.openSocketConnection();
            }, self.attemptReconnectionAfterMS);
            self.emit('reconnecting');
        } else {
            self.emit('closed successfully');
        }
    }
};

JSONSocketConnection.prototype.closeSocketConnection = function () {
    this._connectionDesired = false;
    this.socket.close();
};
        
// @param obj <string/object> - if object it will be strignified
// @param callback <function> - called with (err)
JSONSocketConnection.prototype.send = function (obj, callback) {
    if (typeof obj === 'string') {
        this.socket.send(obj, callback);
    } else {
        var str;
        try {
            str = JSON.stringify(obj);
        } catch (e) {
            if (callback) { callback(e); }
            return;
        }
        this.socket.send(str, callback);
    }
};

// ## Browser Style Event Shims

JSONSocketConnection.prototype.off = function () {
    if ( arguments.length === 0 ) {
        this.removeAllListeners();
    } else if ( arguments.length === 1 ) {
        this.removeAllListeners( arguments[1] );
    } else {
        this.removeListener.apply( this, arguments );
    }   
};

module.exports = JSONSocketConnection;

