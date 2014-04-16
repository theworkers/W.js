var eventMixin = {
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
    // e.g. trigger( name, ... )
    trigger : function ( name, data ) {
        var args = Array.prototype.slice.call( arguments, 1 );
        var listeners;
        var length;
        // Find match listeners
        if ( name !== "*" && this.events()[ name ] ) {
            listeners = this.events()[ name ];
            length = listeners.length;
            while ( length-- ) {
                if ( typeof listeners[ length ] === 'function' ) {
                    listeners[ length ].apply( this, args );
                }
            }
        }
        // Send to any listeners bound to '*'
        if ( this.events()[ "*" ] ) {
            listeners = this.events()[ "*" ];
            length = listeners.length;
            // Add the event name to the first callback arg
            args.unshift( name );
            while ( length-- ) {
                if ( typeof listeners[ length ] === 'function' ) {
                    listeners[ length ].apply( this, args );
                }
            }
        }

        return this;
    },
    // Added function to avoid the use of a constuctor
    events : function () {
        this.eventsArray = this.eventsArray || [];
        return this.eventsArray;
    }
};
