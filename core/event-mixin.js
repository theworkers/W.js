W.EventMixin = {
    /** Add event listener. Callback will recieve (context, details) arguments */
    on : function (/** String */ event, /** Function */ callback, /** Object */ scope) {
        if ( typeof callback !== 'function' ) {
            throw "callback not function";
        }
        this.events()[ event ] = this.events()[ event ] || [];
        if ( this.events()[ event ] ) {
            if ( scope ) {
                this.events()[ event ].push( W.bind( callback, scope ) );
            } else {
                this.events()[ event ].push( callback );
            }
        }
        return this;
    },
    /** Remove event listener */
    off : function (/** String */ event, /** Function */ callback) {
        if ( !callback ) {
            delete this.events()[ event ];
        } else {
            if ( this.events()[ event ] ) {
                var listeners = this.events()[ event ];
                for ( var i = listeners.length-1; i>=0; --i ){
                    if ( listeners[ i ] === callback ) {
                        listeners.splice( i, 1 );
                    }
                }
            }
        }
        return this;
    },
    /** Fire the event  */
    trigger : function ( event, eventData ) {
        var data = ( typeof eventData === 'undefined' || eventData === null ) ?  {} : eventData;
        if ( this.events()[ event ] ) {
            var listeners = this.events()[ event ], 
                len = listeners.length;
            if ( len <= 0 ) { return false; }
            while ( len-- ) {
                if ( typeof listeners[ len ] === 'function' ) {
                    listeners[ len ]( data );  //callback with self
                }
            }
            return true;
        } else {
            return false;
        }
    },
    /** get all the events  */
    events : function () {
        this.eventsArray = this.eventsArray || [];
        return this.eventsArray;
    }
};
