(function (W) {

        /** @namespace W.event
         **/
  	W.event = {};

         /**
         *  Create new W.event.Dispatcher
         *  
         *  Based on <a href="http://www.nonobtrusive.com/2009/07/24/custom-events-in-javascript-by-making-your-own-dispatcher-class/">Custom Event Dispatcher</a> by Erik Karlsson. Extended to pass a details custom object
         *
         *  @todo   bind events by default
         *  @todo   check for non-blocking implemetation
         *  @todo   implement bubbling
         *
         *  @example
         *
         *  function SomeClass(){
         *      Dispatcher.call(this);
         *  }
         *  SomeClass.prototype = new Dispatcher();
         *
         *  SomeClass.prototype.sendSomeEvent=function(){
         *      this.dispatch("test");
         *  }
         *
         *  var foo = new SomeClass();
         *  foo.addEventlistener( "test", function(context, data){ alert("bah"); } )
         *  foo.sendSomeEvent();
         *
         *
         *  @class
         */
        W.event.Dispatcher = function () {
            this.events=[];
        }

        /** Add event listener. Callback will recieve (context, details) arguments */
        W.event.Dispatcher.prototype.addEventlistener=function(/** String */ event, /** Function */ callback){
            this.events[event] = this.events[event] || [];
            if ( this.events[event] ) {
		this.events[event].push(callback);
            }
        }

        /** Remove event listener
         *
         **/
        W.event.Dispatcher.prototype.removeEventlistener=function(/** String */ event, /** Function */ callback) {
            if ( this.events[event] ) {
				var listeners = this.events[event];
				for ( var i = listeners.length-1; i>=0; --i ){
                    if ( listeners[i] === callback ) {
						listeners.splice( i, 1 );
						return true;
                    }
				}
            }
            return false;
        }

        /** Dispatch event. Delegates will be passes the dispatcher context and a details
         *
         * @param {String} event        Name of the Event to be dispatched
         * @param {Object} details      Custom object passed to event handlers
         *
         * @example
         * 
         *      obj.addEventListener("event", function(context, data) {} );
         * 
         **/
        W.event.Dispatcher.prototype.dispatch=function(event, details){
            if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
                    listeners[len](this, details);	//callback with self
		}
            }
        }

})(W);

