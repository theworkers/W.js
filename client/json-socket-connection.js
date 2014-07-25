

// A socket connection which will attempt to say open
// Also attempts to parse incoming message
var JSONSocketConnection = W.Object.extend({
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
    //  * 'error'
    constructor : function (options) {
        W.extend(this, W.eventMixin);
        this.socketUrl = options.socketUrl;
        this._connectionDesired = false;
        this.attemptReconnectionAfterMS = (typeof options.attemptReconnectionAfterMS !== 'undefined') ? options.attemptReconnectionAfterMS : 10000;
    },
    openSocketConnection : function () {
        this._connectionDesired = true;
        var self = this;
        this.socket = new WebSocket(this.socketUrl); 
        this.socket.onopen = function () {
            self.trigger('open');
        };
        this.socket.onerror = function () {
            self.trigger('error');
        };
        this.socket.onclose = function () {
            self.trigger('closed');
            if (self._connectionDesired) {
                setTimeout(W.bind(self.openSocketConnection, self), self.attemptReconnectionAfterMS);
                self.trigger('reconnecting');
            } else {
                self.trigger('closed successfully');
            }
        };
        this.socket.onmessage = function (message) {
            self.trigger('message', message);
            var wasError = false;
            try  {
                message = JSON.parse( message.data );
            }  catch ( e ) {
                self.trigger('nonjson', message.data);
                wasError = true;
                return;
            }
            if ( !wasError ) {
                self.trigger('json', message);
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
    send : function ( obj, callback ) {

        // Check it is open
        var state = this.socket.readyState;

        if ( state !== 1 ) {
            var error;
            switch ( state ) {
                case 0: error = new Error( 'WebSocket is CONNECTING' ); break;
                case 2: error = new Error( 'WebSocket is CLOSING' ); break;
                case 3: error = new Error( 'WebSocket is CLOSED' ); break;
                default: error = new Error( 'WebSocket is not in OPEN ready state. State is:'+ state ) ;break;
            }
            self.trigger( 'error', error );
            return callback( error );
        }

        if (typeof obj === 'string') {
            this.socket.send( obj );
            if ( callback ) { 
                return callback(); 
            }
        } else {
            var str;
            try {
                str = JSON.stringify(obj);
            } catch ( e ) {
                self.trigger( 'error', e );
                if ( callback ) { 
                    return callback(e); 
                }
            }
            this.socket.send(str);
            if ( callback ) { 
                return callback(); 
            }
        }
    }
});