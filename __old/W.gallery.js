////
/// W.gallery
// @author Ross Cairns
(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    W.gallery = W.gallery || {};
    W.gallery.version = 2;

    // Event Constants
    W.gallery = {
        events : {
            EXHIBIT_DID_CHANGE : "exhibit changed",
            EXHIBIT_WILL_CHANGE : "exhibit will change",
            EXHIBIT_WILL_APPEAR : "exhibit will appear",
            EXHIBIT_DID_APPEAR : "exhibit did appear",
            TRANSITION_FINISHED : "transition finished",
            STATE_DID_CHANGE : "state did change",
            EXHIBITION_ADDED_TO_GALLERY : "exhibition added to gallery",
            EXHIBIT_ADDED_TO_EXHIBITION : "exhibition added to exhibition",
            GALLERY_FINISH : "gallery finished",
            GALLERY_STARTING : "gallery starting"
        },

        Exhibit : W.Object.extend({
            constructor : function (options) {
                // create a new element if one not provided
                this.el = (options && options.el) ? options.el : document.createElement('div');
                if (options && (this.options.applyDefaultCSS === true || this.options.applyDefaultCSS === undefined)) {
                    this.applyDefaultCSS();
                }
                W.extend(this, W.EventMixin);
            },
            applyDefaultCSS : function () {
                this.el.style.position = "absolute";
                this.el.style.top = 0;
                this.el.style.left = 0;
            }
        }),

        Exhibition : W.Object.extend({
            constructor : function (options) {
                this._exhibits = [];
                this.currentExhibitIndex = -1;
                this.length = 0;
                W.extend(this, W.EventMixin);
            },
            addExhibit : function (exhibit) { 
                this._exhibits.push(exhibit);
                this.length = this._exhibits.length;
                if (this.currentExhibitIndex === -1) { this.currentExhibitIndex = 0; }
                exhibit.trigger(W.gallery.events.EXHIBIT_ADDED_TO_EXHIBITION, { exhibit : exhibit, exhibition: this });
                return this; 
            },
            at : function (index) {
                return this._exhibits[index];
            },
            current : function () {
                return this.at(this.currentExhibitIndex);
            },
            useNext : function () {  
                if ( this.currentExhibitIndex + 1 >= this._exhibits.length )  return false;
                this.currentExhibitIndex++;
                return this._exhibits[ this.currentExhibitIndex ];
            },
            usePrevious : function () { 
                if ( this.currentExhibitIndex <= 0 ) return false;
                this.currentExhibitIndex--;
                return this._exhibits[ this.currentExhibitIndex ]; 
            },
            useLast : function () { 
                if ( this.currentExhibitIndex === this._exhibits.length - 1) return false;
                this.currentExhibitIndex = this._exhibits.length - 1;
                return this._exhibits[ this.currentExhibitIndex ];
            },
            useFirst : function () { 
                if ( this.currentExhibitIndex === 0) return false;
                this.currentExhibitIndex = 0;
                return this._exhibits[ this.currentExhibitIndex ];
            },
            useAt : function (index) { 
                if ( this.length === 0 || this.currentExhibitIndex === index) { return false; }
                this.currentExhibitIndex = index;
                return this._exhibits[ this.currentExhibitIndex ];
            }
        }),

        Controller : W.Object.extend({
            constructor : function (options) {
                this.gallery = (options && options.gallery) ? options.gallery : new W.gallery.gallery();
                this._queue = [];
                this._ready = true;
            },
            play : function () { 
                if (!this.gallery.isPlaying) { this.gallery._start(); }
                return this; 
            },
            goto : function (index) { 
                if(true){ 
                    throw "not yet implemented";
                }
                if ( !this.gallery.exhibition ) return;
                // not implemented here, needs to pass index into queueing system
                if ( !this._readyOrQueue(this.useAt, index)) return this;
                this.gallery._stop();
                var currentExhibit = this.gallery.exhibition.current();
                var nextExhibit = this.gallery.exhibition.use(index);
                if ( nextExhibit ) {
                    this.gallery.transition(nextExhibit, currentExhibit);
                    this.gallery.on(W.gallery.events.TRANSITION_FINISHED, this._actionCompleted, this);
                } else {
                    this._actionCompleted();
                }
                return this; 
            },
            first : function () { 
                if ( !this.gallery.exhibition ) return;
                if ( !this._readyOrQueue(this.first)) return this;
                this.gallery._stop();
                var currentExhibit = this.gallery.exhibition.current();
                var nextExhibit = this.gallery.exhibition.useFirst();
                if (nextExhibit) {
                    this.gallery.transition(nextExhibit, currentExhibit);
                    this.gallery.on(W.gallery.events.TRANSITION_FINISHED, this._actionCompleted, this);
                } else {
                    this._actionCompleted();
                }
                return this; 
            },
            last : function () { 
                if ( !this.gallery.exhibition ) return;
                if ( !this._readyOrQueue( this.last ))  return this;
                this.gallery._stop();
                var currentExhibit = this.gallery.exhibition.current();
                var nextExhibit = this.gallery.exhibition.useLast();
                if (nextExhibit) {
                    this.gallery.transition(nextExhibit, currentExhibit);
                    this.gallery.on(W.gallery.events.TRANSITION_FINISHED, this._actionCompleted, this);
                } else {
                    this._actionCompleted();
                }            
                return this; 
            },
            next : function () { 
                if ( !this.gallery.exhibition ) return this;
                if ( !this._readyOrQueue( this.next )) return this;
                this.gallery._stop();
                var currentExhibit = this.gallery.exhibition.current();
                var nextExhibit = this.gallery.exhibition.useNext();
                if (!nextExhibit && this.gallery.options.loops && this.gallery.exhibition.length > 1) {
                    nextExhibit = this.gallery.exhibition.first();
                }
                if (nextExhibit) {
                    this.gallery.transition(nextExhibit, currentExhibit);
                    this.gallery.on(W.gallery.events.TRANSITION_FINISHED, this._actionCompleted, this);
                } else {
                    this._actionCompleted();
                }
                return this;
            },
            previous : function () { 
                if ( !this.gallery.exhibition ) return;
                if ( !this._readyOrQueue( this.previous )) return this;
                this.gallery._stop();
                var currentExhibit = this.gallery.exhibition.current();
                var nextExhibit = this.gallery.exhibition.usePrevious();
                if (!nextExhibit && this.gallery.options.loops && this.gallery.exhibition.length > 1) {
                    nextExhibit = this.gallery.exhibition.last();  
                }
                if (nextExhibit) {
                    this.gallery.transition(nextExhibit, currentExhibit); // class back
                    this.gallery.on(W.gallery.events.TRANSITION_FINISHED, this._actionCompleted, this );
                } else {
                    this._actionCompleted();   
                }
                return this; 
            },
            stop : function () { 
                if (!this.gallery.isPlaying) { this.gallery._stop(); }
                return this; 
            },
            clearQueue : function () {
                this._queue = [];
            },
            _actionCompleted : function () {
                this.gallery.off(W.gallery.events.TRANSITION_FINISHED, this._actionCompleted);
                if (this._queue.length === 0 ) {
                    this._ready = true;
                } else {
                    var nextFn = this._queue.shift();
                    nextFn();
                }
            },
            _readyOrQueue : function ( action ) {
                if ( !!this._ready ) {
                    return true;
                } else {
                    this._queue = action;
                    return false;
                }
            }
        }),

        Gallery : W.Object.extend({
            constructor : function (options) {
                // create a new element if one not provided
                this.el = (options && options.el) ? options.el : document.createElement('div');
                this.options = W.extend({
                    displayTime : 2000,
                    loops : true,
                    startsPlaying : true
                }, options);
                W.extend(this, W.EventMixin);
                this.controller = new W.gallery.Controller({gallery:this});
                this._transitions = {};
                this._currentTransitionType = "";
                this.addTransition('default_transition', this.basicTransition, true);
                this._isPlaying = false;
                this.exhibition = undefined;
                this.timer = new W.Timer({
                    loops : false
                });
                this.timer.on("fired", this.controller.next, this);
            },
            addExhibition : function (exhibition) {
                if ( this.exhibition === exhibition ) { return; }
                this.exhibition = exhibition;
                this.controller.clearQueue();
                if (this.options.startsPlaying) {
                    this._start();
                } else {
                    this._stop();
                }
                this.trigger(W.gallery.events.EXHIBITION_ADDED_TO_GALLERY, {gallery:this, exhibition:exhibition});
                exhibition.trigger(W.gallery.events.EXHIBITION_ADDED_TO_GALLERY, {gallery:this, exhibition:exhibition});
                return this;
            },
            status : function () {
                return {
                    gallery             : this,
                    exhibition          : this.exhibition,
                    totalExhibits       : (this.exhibition) ? this.exhibition.length : -1,
                    currentExhibitIndex : (this.exhibition) ? this.exhibition.currentExhibitIndex : -1,
                    isPlaying           : this._isPlaying,
                    loops               : this.options.loops
                };
            },
            addTransition : function (type, fn, useNow) {
                this._transitions[type] = fn;
                if (useNow) { this.setTransitionType(type); }
                return this;
            },
            getTransition : function (type) {
                return this._transitions[type] || this._transitions[this._currentTransitionType];
            },
            setTransitionType : function (type) {
                if (!(type in this._transitions)) { return false; }
                this._currentTransitionType = type;
                return this._currentTransitionType;
            },
            basicTransition : function (completed, nextExhibit, previousExhibit) { 
                nextExhibit.el.style.display = "none"; // ie, can't so visibilty
                previousExhibit.el.style.display = "block";
                completed();
            },
            _start : function () { 
                this._isPlaying = true;
                this.timer.options.updateTime = this.options.displayTime;
                this.timer.start();
                var status = this.status();
                this.trigger(W.gallery.events.STATE_DID_CHANGE, status);
                this.trigger(W.gallery.events.GALLERY_STARTING, status);
                return this; 
            },
            _stop : function () { 
                this._isPlaying = false;
                this.timer.stopTimer();
                var status = this.status();
                this.trigger(W.gallery.events.STATE_DID_CHANGE, status);
                this.trigger(W.gallery.events.GALLERY_STOPPING, status);
                return this; 
            },
            transition : function (toExhibit, fromExhibit) { 
                var transitionFn = this.getTransition();
                transitionFn(W.bind(this.transitionFinished, this), toExhibit, fromExhibit);
                return this;
            },
            transitionFinished : function () {
                if (this.isPlaying) {
                    this._start();
                }
                this.trigger(W.gallery.events.TRANSITION_FINISHED);
            }
        })
    };

}());