( function (W) {

	W.gallery = {};

	W.gallery.Gallery = function ($view, settings) { 
		var self = this;
		
		this.settings = settings || new W.gallery.Settings();
		this.$view = $view || null;
		
		this.juggler = new W.gallery.Juggler(this, this.settings.startsPlaying);
		this.controller = new W.gallery.Controller(this);
		
		this.exhibition = null;
		
		this.EXHIBIT_DID_CHANGE = "exhibit changed";
		this.EXHIBIT_WILL_CHANGE = "exhibit will change";
		this.STATE_DID_CHANGE = "state did change";
		
		this.events = new W.event.Dispatcher();
		
		
		// to do
		// setView();
		// getView();
		// getSettings();
		
		this.addExhibition = function ( exhibition ) {
		
			if ( self.exhibition === exhibition ) return;
		
			self.exhibition = exhibition;
			
			self.controller.clearQueue();
			
			self.controller.next();
			
			if ( self.settings.startsPlaying) {
			
				self.juggler.start();
				
			}
			
			exhibition.events.dispatch(exhibition.EXHIBITION_ADDED_TO_GALLERY);
		
		};
		
		this.getStatus = function () {
			
			var status = {
				
				totalExhibits 		: self.exhibition.length,
				currentExhibitIndex : self.exhibition.currentExhibit,
				isPlaying			: self.juggler.isPlaying,
				loops				: self.settings.loops
			
			}
			
			return status;
		};
		
		this.setSettings = function ( newSettings ) {
            
            W.l(self.settings);
		
			 if (newSettings == undefined) return;
			 
			 for (var i in newSettings) {
            	if(newSettings[i] != undefined && isNaN(newSettings[i]) == false) { // error check
                	self.settings[i] = newSettings[i];
                } else {
                	W.w("slideshow", "invalid setting for:", i);
                }
            };
            
            W.l(self.settings);
		};
		
	};
	
	W.gallery.Juggler = function ( gallery, startsPlaying ) {
		var self = this;
		
		this.intervalID = undefined;
		this.gallery = gallery;
		
		this.isPlaying = false;
		
		this.currentExhibit = null;
		this._nextExhibit = null;
	
		this.events = new W.event.Dispatcher();
		
		this.JUGGLER_DID_FINISH = 'juggler did finish';
		
		this.transitionTo = function (toExhibit) {
		
			self.gallery.events.dispatch(self.gallery.EXHIBIT_WILL_CHANGE);
			toExhibit.events.dispatch( toExhibit.EXHIBIT_WILL_APPEAR );
		
            this._nextExhibit = toExhibit;
            this.gallery.$view.append(this._nextExhibit.view);
            
            this._nextExhibit.view.fadeOut(0);
            this._nextExhibit.view.fadeIn(this.gallery.settings.transition_time, W.bind(this, this._transitionDidFinish));
            
		};
		
		this._transitionDidFinish = function () {
		
			if (!!self.currentExhibit) {
				
				self.currentExhibit = self._nextExhibit;
				
				self.currentExhibit.events.dispatch(self.currentExhibit.EXHIBIT_DID_APPEAR);
				
				self._nextExhibit = undefined;
				
			}
		
			self.events.dispatch(self.JUGGLER_DID_FINISH);
			
			self.gallery.events.dispatch(self.gallery.EXHIBIT_DID_CHANGE);
			
		};
		
		this.start = function () {
		
			self.isPlaying = true;
		
			self.intervalID = setInterval( self.next, self.gallery.settings.display_time + self.gallery.settings.transition_time );
			
			self.gallery.events.dispatch(self.gallery.STATE_DID_CHANGE);
			
		};
		
		this.next = function () {
			
			var nextExhibit = self.gallery.exhibition.getNextExhibit();
			
			if ( !nextExhibit && self.gallery.settings.loops && self.gallery.exhibition.length > 1 ) {
			
				nextExhibit = self.gallery.exhibition.getFirstExhibit();
				
			}
		
			if ( nextExhibit ) {
				
				self.gallery.juggler.transitionTo( nextExhibit ); // class back
				
			}  else {
			
				self.stop();
				
			}
		}
		
		this.stop = function () {
		
			self.isPlaying = false;
		
			clearInterval( self.intervalID );
			
			self.gallery.events.dispatch(self.gallery.STATE_DID_CHANGE);
			
		};
		
	};
	
	W.gallery.Controller = function (gallery) {
		var self = this;
		
		this._queue = [];
		this._ready = true;
		this.gallery = gallery;
		
		this.play = function () {
		
			if (!!self.gallery.juggler.isPlaying) return;
			
			self.gallery.juggler.start();
			
			return this;
			
		};
		
		this.goto = function ( index ) {
		
			if ( !self._readyOrQueue( self.goto ) ) return this;
			
			var nextExhibit = self.gallery.exhibition.getExhibit( index );
			
			if ( nextExhibit ) {
				
				self.gallery.juggler.transitionTo( nextExhibit ); // class back
				
				self.gallery.juggler.events.addEventlistener( self.gallery.juggler.JUGGLER_DID_FINISH, self._actionCompleted  );
				
			} else {
				
				this._actionCompleted();
				
			}
			
			return this;
		
		};
		
		this.last = function () {
		
			if ( !self._readyOrQueue( self.last ))  return this;
			
			self.gallery.juggler.stop();
			
			var nextExhibit = self.gallery.exhibition.getLastExhibit();
			
			if ( nextExhibit ) {
				
				self.gallery.juggler.transitionTo( nextExhibit ); // class back
				
				self.gallery.juggler.events.addEventlistener( self.gallery.juggler.JUGGLER_DID_FINISH, self._actionCompleted  );
				
			} else {
				
				this._actionCompleted();
				
			}
			
			return this;
		
		};
		
		this.first = function () {
		
			if ( !self._readyOrQueue( self.first )) return this;
			
			self.gallery.juggler.stop();
			
			var nextExhibit = self.gallery.exhibition.getFirstExhibit();
			
			if ( nextExhibit ) {
				
				self.gallery.juggler.transitionTo( nextExhibit ); // class back
				
				self.gallery.juggler.events.addEventlistener( self.gallery.juggler.JUGGLER_DID_FINISH, self._actionCompleted  );
				
			} else {
				
				this._actionCompleted();
				
			}
			
			return this;
		
		};
		
		this.next = function () {
		
			if ( !self._readyOrQueue( self.next )) return this;
			
			self.gallery.juggler.stop();
			
			var nextExhibit = self.gallery.exhibition.getNextExhibit();
			
			if ( !nextExhibit && self.gallery.settings.loops && self.gallery.exhibition.length > 1 ) {
			
				nextExhibit = self.gallery.exhibition.getFirstExhibit();
				
			}
			
			if ( nextExhibit ) {
				
				self.gallery.juggler.transitionTo( nextExhibit ); // class back
				
				self.gallery.juggler.events.addEventlistener( self.gallery.juggler.JUGGLER_DID_FINISH, self._actionCompleted  );
				
			} else {
				
				this._actionCompleted();
				
			}
			
			return this;
		
		};
		
		this.previous = function () {
		
			if ( !self._readyOrQueue( self.previous )) return this;
			
			self.gallery.juggler.stop();
			
			var nextExhibit = self.gallery.exhibition.getPreviousExhibit();
			
			if ( !nextExhibit && gallery.settings.loops && self.gallery.exhibition.length > 1 ) {
			
				nextExhibit = self.gallery.exhibition.getLastExhibit();
				
			}
			
			if ( nextExhibit ) {
				
				self.gallery.juggler.transitionTo( nextExhibit ); // class back
				
				self.gallery.juggler.events.addEventlistener( self.gallery.juggler.JUGGLER_DID_FINISH, self._actionCompleted  );
				
			} else {
				
				this._actionCompleted();
				
			}
			
			return this;
		
		};
		
		this.stop = function () {
		
			if (!self.gallery.juggler.isPlaying) return this;
			
			self.gallery.juggler.stop();
			
			return this;
		
		};
		
		this.clearQueue = function () {
		
			self._queue = [];
			
		};
		
		this._actionCompleted = function () {
		
			self.gallery.juggler.events.removeEventlistener( self.gallery.juggler.JUGGLER_DID_FINISH, self._actionCompleted )
		
			if ( self._queue.length === 0 ) {
				self._ready = true;
			} else {
				var nextFn = this._queue.shift();
				nextFn();
			}
		};
		
		this._readyOrQueue = function ( action ) {
			if ( !!this._ready ) {
			
				return true;
				
			} else {
				
				self._queue = action;
				
				return false;
			}
		};
	};
	
	W.gallery.Settings = function (args) {
		var self = this,
			args = args || {};
		
		this.display_time = args["display_time"] || 2000;
		this.loops = args['loops'] || true;
		this.transition_time = args['transition_time_in'] || 1000;
		this.startsPlaying = args['startsPlaying'] || true;
		
	};
	
	W.gallery.Exhibition = function () {
		var self = this;
		
		this._exhibits = [];
		this.currentExhibit = -1;
		this.length = 0;
		
		this.events = new W.event.Dispatcher();
		
		this.EXHIBITION_ADDED_TO_GALLERY = "exhibition added to gallery";
		
		this.addExhibit = function ( exhibit ) {
		
			self._exhibits.push(exhibit);
			self.length = self._exhibits.length;
		};
		
		this.getNextExhibit = function () {
		
			if ( self.currentExhibit + 1 >= self._exhibits.length )  return false;
				
			self.currentExhibit++;
			
			return self._exhibits[ self.currentExhibit ];
			
		};
		
		this.getPreviousExhibit = function () {
			
			if ( self.currentExhibit === 0 ) return false;
			
			self.currentExhibit--;
			
			return self._exhibits[ self.currentExhibit ]; 
			
		};
		
		this.getLastExhibit = function () {
			
			if ( self.currentExhibit === self._exhibits.length - 1) return false;
			
			self.currentExhibit = self._exhibits.length - 1;
			
			return self._exhibits[ self.currentExhibit ];
			
		};
		
		this.getFirstExhibit = function () {
		
			if ( self.currentExhibit === 0) return false;
			
			self.currentExhibit = 0;
			
			return self._exhibits[ self.currentExhibit ];
		
		};
		
		this.getExhibit = function ( index ) {
		
			if ( self.length == 0 || self.currentExhibit == index) return false;
			
			self.currentExhibit = index;
			
			return self._exhibits[ self.currentExhibit ];

		
		};
	};
	
	W.gallery.Exhibit = function ( view, shouldApplyDefaultCSS ) {
	
		var self = this;
		
		this.view = view || null;
		
		if ( !(view instanceof jQuery && this.view != null) ) {
			this.view = $(this.view);
		}
		
		this.events = new W.event.Dispatcher();
		
		this.EXHIBIT_WILL_APPEAR = "exhibit will appear";
		this.EXHIBIT_DID_APPEAR = "exhibit did appear";
		
		this.shouldApplyDefaultCSS = shouldApplyDefaultCSS || false;
		
		this.applyDefaultCSS = function () {
		
			self.view.css({
                'position' : 'absolute',
                'top' : 0,
                'left' : 0
            });
            
		};
		
		if (shouldApplyDefaultCSS) {
			W.l("will apply defaults");
			this.applyDefaultCSS();
		}
		
	};
	
	W.gallery.Status = function (args) {
	
		var self = this;
		
	};

})(W);