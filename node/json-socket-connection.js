// A client websocket connect which attempts to reconnect after disconnection and parse JSON message

// #Modules
var EventEmitter = require( 'events' ).EventEmitter;
var util = require( 'util' );

// #NPM
var WS = require( 'ws' );

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
    this.attemptReconnectionAfterMS = (typeof options.attemptReconnectionAfterMS !== 'undefined') ? options.attemptReconnectionAfterMS : 10000;
}

// Add event emitter
util.inherits(JSONSocketConnection, EventEmitter);

JSONSocketConnection.prototype.openSocketConnection = function () {
    this._connectionDesired = true;
    var self = this;

    try {
        self.socket = new WS( self.socketUrl );
    } catch (err) {
        console.log( 'Failed to create WS' );
        return self.emit( 'error', err );
    }
    self.socket.on( 'open', function () {
        console.log( 'opened SocketConnection' );
        self.emit( 'open' );
    });

    self.socket.on( 'close', function () {
        shouldReconnect();
        if ( !self._connectionDesired ) {
            self.emit( 'closed successfully' );
        }
    });

    self.socket.on( 'error', function ( err ) {
        if ( err.code && err.code === 'ECONNREFUSED' ) {
            console.log( 'JSONSocketConnnection connection refused', 'will close' );
            shouldReconnect();
        } else {
            console.log( 'ws error', err );
        }
    });

    self.socket.on( 'message', function ( message ) {
        self.emit( 'message', message);
        var wasError = false;
        try  {
            message = JSON.parse( message );
        }  catch (e) {
            self.emit('nonjson', message );
            wasError = true;
            return;
        }
        if ( !wasError ) {
            self.emit('json', message);
        }
    });

    function shouldReconnect () {
        if ( self._connectionDesired ) {
            self.socket.close();
            // clean up
            self.socket.onclose = undefined;
            self.socket.onmessage = undefined;
            self.socket.onerror = undefined;
            delete self.socket;
            // start again
            setTimeout(function () {
                console.log( 'Reconnecting' );
                self.openSocketConnection();
            }, self.attemptReconnectionAfterMS );
            self.emit( 'reconnecting' );
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
    if ( !this.socket ) { return; }
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

// # Utils

function getStrForReadyState ( readyState ) {
    var state = "";
    switch ( readyState ) {
        case WS.CONNECTING: state = "Connecting"; break;
        case WS.OPEN: state = "Open"; break;
        case WS.CLOSING: state = "Closing"; break;
        case WS.CLOSED: state = "Closed"; break;
    }
    return state;
}