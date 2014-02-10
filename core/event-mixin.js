W.EventMixin = {
    on : function ( event,  callback ) {
        if ( typeof callback !== 'function' ) {
            throw "callback not function";
        }
        this.events()[ event ] = this.events()[ event ] || [];
        if ( this.events()[ event ] ) {
            this.events()[ event ].push( callback );
        }
        return this;
    },
    off : function ( event, callback) {
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
    // Call the event with name, calling handlers with all other arguments
    trigger : function ( name, data ) {
        var args = Array.prototype.slice.call( arguments, 1 );
        if ( this.events()[ name ] ) {
            var listeners = this.events()[ name ], 
                len = listeners.length;
            if ( len <= 0 ) { return false; }
            while ( len-- ) {
                if ( typeof listeners[ len ] === 'function' ) {
                    listeners[ len ].apply( this, args );
                }
            }
            return true;
        } else {
            return false;
        }
    },
    events : function () {
        this.eventsArray = this.eventsArray || [];
        return this.eventsArray;
    }
};
