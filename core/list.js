function list () {
    return new List();
}

function List ( options ) {
    this.length = 0;
    this._first = null;
    this._last = null;
}

List.prototype = {
    append: function( obj ) {
        var list = this;
        Array.prototype.forEach.call( arguments, function ( obj ) {
            if ( list._first === null ) {
                obj._previous = obj;
                obj._next = obj;
                list._first = obj;
                list._last = obj;
            } else {
                obj._previous = list._last;
                obj._next = list._first;
                list._first._previous = obj;
                list._last._next = obj;
                list._last = obj;
            }
            ++list.length;
        });
        return this;
    },
    prepend: function ( obj ) {
        var list = this;
        var objectsToAdd = toArray( arguments );
        objectsToAdd.reverse().forEach( function ( obj ) {
            if ( list._first === null ) {
                obj._previous = obj;
                obj._next = obj;
                list._first = obj;
                list._last = obj;
            } else {
                obj._previous = list._last;
                obj._next = list._first;
                list._first._previous = obj;
                list._last._next = obj;
                list._first = obj;
            }
            ++list.length;
        });
        return this;
    },
    insertAfter: function( after, obj ) {
        obj._previous = after;
        obj._next = after._next;
        after._next._previous = obj;
        after._next = obj;
        if ( obj._previous == this._last ) { 
            this._last = obj; 
        }
        ++this.length;
        return this;
    },
    remove: function ( obj ) {
        if ( this.length > 1 ) {
            obj._previous._next = obj._next;
            obj._next._previous = obj._previous;
            if ( obj == this._first ) { this._first = obj._next; }
            if ( obj == this._last ) { this._last = obj._previous; }
        } else {
            this._first = null;
            this._last = null;
        }
        obj._previous = null;
        obj._next = null;
        --this.length;
        return this;
    },
    at: function ( index ) {
        if ( index >= this.length ) {
            return false;
        }
        var obj = this._first;
        if ( index===0 ) {
            return obj;
        }  
        for ( var i=0; i<index; ++i ) {
            obj = obj._next;
        }
        return obj;
    },
    first: function () {
        return this._first;
    },
    last: function () {
        return this._last;
    },
    forEach: function ( fn, context ) {
        var bound = ( context ) ? W.bind( fn, context ) : fn;
        var next = this._first;
        for ( var i=0; i<this.length; ++i ) {
            bound( next, i );
            next = next._next;
        }
        return this;
    },
    sendToBack: function ( obj ) {
        this.remove( obj );
        this.append( obj );
    },
    sendToFront: function ( obj ) {
        this.remove( obj );
        this.prepend( obj );
    }
};
