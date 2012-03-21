(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    W.EventMixin = {
        version : 2,
        /** Add event listener. Callback will recieve (context, details) arguments */
        on : function (/** String */ event, /** Function */ callback, /** Object */ scope) {
            this.events()[event] = this.events()[event] || [];
            if (this.events()[event]) {
                if (scope) {
                    this.events()[event].push(W.bind(callback,scope));
                } else {
                    this.events()[event].push(callback);
                }
            }
        },
        /** Remove event listener */
        off : function (/** String */ event, /** Function */ callback) {
            if (!callback) {
                throw "No callback function given for 2nd argument of `removeEventlistener` so can not remove event listener. Be sure to store the event callback as a varible if you wish to remove it";
            }
            if (this.events()[event]) {
                var listeners = this.events()[event];
                for (var i = listeners.length-1; i>=0;--i){
                    if (listeners[i] === callback) {
                        listeners.splice(i,1);
                        return true;
                    }
                }
            }
            return false;
        },
        /** Fire the event  */
        trigger : function (event, eventData) {
            var data = eventData || {};
            if (this.events()[event]) {
                var listeners = this.events()[event], 
                    len = listeners.length;
                while (len--) {
                    listeners[len](data);  //callback with self
                }
            }
        },
        /** get all the events  */
        events : function () {
            this.eventsArray = this.eventsArray || [];
            return this.eventsArray;
        }
    };

    W.EventMixin.version = 2;

}());