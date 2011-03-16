////////////////////////////    W.slideshow
//    ///////////////    ///    Copyright (c) 2011 The Workers
///    /////////////    ////    Authors: Ross Cairns
////    ///// /////    /////
/////    ///   ///    //////
//////    /     /    ///////                                        
///////             ////////
////////    //     /////////
/////////  ////   //////////
////////////////////////////


/* This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * http://creativecommons.org/licenses/LGPL/2.1/
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
*/

if(Function.prototype.method == undefined) {
    /* Adding .method() to JavaScript to Allow
     * Add a method to the Function object that can be used to declare methods. */
    Function.prototype.method = function(name, fn) {
        this.prototype[name] = fn;
        return this;
    };
}

(function (W) {

        /** @namespace W.slideshow
         **/
  	W.slideshow = {};

        // check for required
        if(W.animation == undefined) {
            W.w("W.animation not included. W.slideshow will fail");
        }

       /**
         *  Creates a new  W.slideshow.Controller shows {@link W.slideshow.SlideAlbum}s. <br />
         *  <br />
         *  W.slideshow.Controller is a slideshow controller that provides its functionality though delegation to provide a slideshow without locked-in functionality
         *
         *
         *  @augments W.event.Dispatcher
         *
         *  @class
         */
        W.slideshow.Controller = function(/** jQuery */ $view, /** W.slideshow.Settings */ $settings) {
            
            /** @private  */

            /** @memberOf W.slideshow.Controller */
            var Controller = this;

            /** The Dom Object used as the Slideshow container  */
            this._$view = $view;
            this._frontSlide;
            this._nextSlide;

            // State
            this._isPlaying = false;
            this._isChangingSlide = false;
            this._intervalID = undefined;

            this._currentImageIndex = 0;
            this._albums = [];
            this._activeAlbum;
            this._hasItems = false;
            this._settings = ($settings == undefined) ? $settings = new W.slideshow.Settings() : $settings;

            /**#@+
             *  @memberOf W.slideshow.Controller
             **/

            /** Version.
             *  @memberOf W.slideshow.Controller
             **/
            this.VERSION = "0.1.0";

           
            /** Event. Useful for locking the interaction of control. e.g. addClass(".inactive") until SLIDE_DID_CHANGE is called */
            this.SLIDE_WILL_CHANGE = "slidewillchange";
            /** Event */
            this.SLIDE_DID_CHANGE = "slidedidchange";
            /** Event. Called on play(), stop() etc. */
            this.PLAY_STATE_CHANGE = "playstatechange";
        };
        
        // extend with dispatcher
        W.slideshow.Controller.prototype = new W.event.Dispatcher();

        W.slideshow.Controller.prototype._slideWillChange = function () {
            this._isChangingSlide = true;
            this.dispatch(this.SLIDE_WILL_CHANGE, this.getStats());
        }

        W.slideshow.Controller.prototype._slideDidChange = function () {
            this._isChangingSlide = false;
            this.dispatch(this.SLIDE_DID_CHANGE, this.getStats());
        }

        W.slideshow.Controller.prototype._playStateChanged = function () {
            this.dispatch(this.PLAY_STATE_CHANGE, this.getStats());
        }

        /**
         *  Settings
         **/
         W.slideshow.Controller
            .method( "getSettings",
                /**
                 * @name getSettings
                 * @methodOf W.slideshow.Controller
                 * @return W.slideshow.Settings
                 */
                 function () {
                    return this._settings;
                 }
            )
            .method( "setSettings",
                /**
                 * @name setSettings
                 * @methodOf W.slideshow.Controller
                 * @return W.slideshow.Controller
                 */
                function (settings) {
                    this._settings = this._settings.mergeSettings(settings, this._settings);
                    return this;
                }
            );

        /**#@+
         *  Content control
         *  @returns {W.slideshow.Controller} Controller to allow for chaining
         *  @type Controller
         **/
         W.slideshow.Controller
            .method( "addAlbum",
                /**
                 * @name addAlbum
                 * @methodOf W.slideshow.Controller
                 */
                function (/** W.slideshow.SlideAlbum */ album, /** Boolean */ makeActiveAlbum ) {
                    this._albums.push(album);

                    if (makeActiveAlbum == undefined || album != this._activeAlbum || makeActiveAlbum == true) {
                       this._activeAlbum = album;
                       this._currentImageIndex = -1;
                       if (this._settings.autoPlay) {
                            this.play(true);
                       } else {
                            this.next();
                       }
                    }

                    return this;
                }
            );
         /**#@-*/

         W.slideshow.Controller
            .method( "get$View",
                /**
                 * @name get$View
                 * @methodOf W.slideshow.Controller
                 * @return {jQuery} the main view for the Slideshow
                 */
                function () {
                    return this._$view;
                }
            )
            .method("getStats",
                /**
                 * @name getStats
                 *
                 * @methodOf W.slideshow.Controller
                 * @return {Object} returns state information about the gallery controller
                 */
                function () {
                    return {
                        totalImages : this._activeAlbum.slides.length,
                        hasNext : (this.currentImageIndex == this.totalImages - 1),
                        hasPrevious : (this._activeAlbum.slides.count > 0) ,
                        currentImageIndex : this._currentImageIndex,
                        currentImageTitle : "The image",
                        currentImageDecription : "The images description",
                        currentImageDetails : this._activeAlbum.slides[this._currentImageIndex],
                        settings : this.settings
                    };
                }
            );

        /**#@+
         *  Play control
         *  @returns {W.slideshow.Controller} Controller to allow for chaining
         *  @type Controller
         **/
        W.slideshow.Controller
            .method( "play",
                /**
                 * @name play
                 * @methodOf W.slideshow.Controller
                 * @param   {Boolean} nextSlideOnPlay      Default true. Transition to next image on execution
                 */
                function (nextSlideOnPlay) {
                    if (this._isPlaying) {
                         W.w(".play() fail: already playing");
                        return this;
                    }

                    if (nextSlideOnPlay == undefined)  this.nextSlideOnPlay = true;

                    this._intervalID = setInterval(W.bind(this, function () {
                       this._next();
                    }), this._settings.slideDuration + this._settings.transitionInTime + this._settings.transitionOutTime);

                    if (this.nextSlideOnPlay) {
                         W.l("will do next slide now");
                         this._next();
                    }

                    this._isPlaying = true;
                    this._playStateChanged();

                    return this;
                }
            )
            .method( "stop",
                /**
                 * @name stop
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                   if (!this._isPlaying) {
                         W.w(".stop() fail: already stopped");

                        return this;
                    }

                    clearInterval(this._intervalID);

                    this._isPlaying = false;
                    this._playStateChanged();

                    return this;
                }
            )
            .method( "restart",
                /**
                 * @name restart
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    W.stub("restart");

                    return this;
                }
            )
            .method( "_next",
                /**
                 * @name next
                 * @methodOf W.slideshow.Controller
                 * @private
                 */
                function () {
                    if (this._isChangingSlide) {
                        W.w(".next() fail: slide is in the process of changing");
                        return this;
                    }

                    if (this._currentImageIndex + 1 === this._activeAlbum.slides.length) {
                        if (this._settings.loops === true)
                             this._currentImageIndex = -1;
                        else
                            return this; // Break
                    }

                    this._currentImageIndex++;
                    this._slideWillChange();

                    this.transitionSlide(this._activeAlbum.slides[this._currentImageIndex]);

                    return this;
                }
            )
            .method( "next",
                /**
                 * Next slide. Intended to be called by user interaction. _next(); handles automated next slide requests.
                 * @name next
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    if(this._settings.stopOnNextOrPrevious) this.stop();
                    this._next();
                }
            )
            .method( "_previous",
                /**
                 * @name previous
                 * @methodOf W.slideshow.Controller
                 * @private
                 */
                function () {
                    if (this._isChangingSlide) {
                        W.w(".previous() fail: slide is in the process of changing");
                        return this;
                    }

                    if (this._currentImageIndex -1 < 0) {
                        if (this._settings.loops === true)
                             this._currentImageIndex = this._activeAlbum.slides.length;
                        else
                            return this; // Break
                    }

                    this._currentImageIndex--;
                    this._slideWillChange();

                    this.transitionSlide(this._activeAlbum.slides[this._currentImageIndex]);

                    return this;
                }
            )
            .method( "previous",
                /**
                 * Previous slide. Intended to be called by user interaction. _previous(); handles automated previous slide requests.
                 * @name previous
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    if(this._settings.stopOnNextOrPrevious) this.stop();
                    this._previous();
                }
            )
            .method( "last",
                /**
                 * @name last
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    if (this._isChangingSlide) {
                        W.w(".last() fail: slide is in the process of changing");
                        return this;
                    }

                    if (this._currentImageIndex == this._activeAlbum.slides.length - 1) {
                        W.w(".last() fail: current slide is last");
                        return this;
                    }

                    this._currentImageIndex = this._activeAlbum.slides.length - 1;
                    this._slideWillChange();

                    this.transitionSlide(this._activeAlbum.slides[this._currentImageIndex]);

                    return this;
                }
            )
            .method( "first",
                /**
                 * @name first
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    if (this._isChangingSlide) {
                        W.w(".first() fail: slide is in the process of changing");
                        return this;
                    }

                    if (this._currentImageIndex == 0) {
                        W.w(".first() fail: current slide is first");
                        return this;
                    }

                    this._currentImageIndex = 0;
                    this._slideWillChange();

                    this.transitionSlide(this._activeAlbum.slides[this._currentImageIndex]);

                    return this;
                }
            );
        /**#@-*/

        /**#@+
         *  Transitions
         *  @private
         **/
        W.slideshow.Controller
                .method( "transitionSlide",
                /**
                 * @name transitionSlide
                 * @private
                 * @params nextSlide
                 * @methodOf W.slideshow.Controller
                 */
                function(/** W.slideshow.Slide */ nextSlide) {
                    this._nextSlide = nextSlide;
                    this._$view.append(this._nextSlide.$view);
                    W.l(this._nextSlide.$view);
                    this._nextSlide.$view.fadeOut(0);
                    this._nextSlide.$view.fadeIn(this._settings.transitionInTime, W.bind(this, this.transitionDidFinish));
                })
                .method('transitionDidFinish',
                /**
                 * Called when transitions have finished
                 * @name transitionDidFinish
                 * @private
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    if(this._frontSlide == undefined) {
                        this._frontSlide = this._nextSlide;
                        this._slideDidChange();
                    } else {
                        this._frontSlide.$view.fadeOut(this._settings.transitionOutTime, W.bind(this, function () {
                                this._frontSlide = this._nextSlide;
                                this._slideDidChange();
                            })
                        );
                    }
                });

        /**#@-*/

        /**
            Creates a new  W.slideshow.Album Contains {@link W.slideshow.Slide}
            @class
         */
        W.slideshow.SlideAlbum = function () {
             /**
             *  @private
             *  @memberOf W.slideshow.SlideAlbum
            */
            var Album = this;

            /** @private */

            /**
             * Internal Array of {@link W.slideshow.Slide}
             * @type Array
            */
            this.slides = [];

        };

        W.slideshow.SlideAlbum
            .method( "addSlide",
                /**
                 * @name addSlide
                 * @methodOf W.slideshow.SlideAlbum
                 */
                function (/** W.slideshow.Slide */ slide) {
                    this.slides.push(slide);

                    return this;
                }
            );


        /**
            Creates a new  W.slideshow.Slide.
            @class

                @param (obj)  params    override/pass default information
         */
        W.slideshow.Slide = function(params) {
            if (params == undefined)  params = {};

            /** url of image */
            this.src =                params['src'] || "";
            /** url of description */
            this.description =        params['description'] || "";
            /** url of title of image */
            this.title  =             params['title'] || "";
            /** a custom object */
            this.details  =             params['details'] || {};
            /** the DOM element. if not provided an div.img element will be created using `src` & `title`  */
            this.$view =              params['$view'] || undefined;
            /** should apply styles to view */
            this.useStyles =                params['useStyles'] || true;
            /** style object for slide. default is 'position' : 'absolute',
                                                                'top' : 0,
                                                                'left' : 0  */
            this.style =              params['style'] || {
                                                                'position' : 'absolute',
                                                                'top' : 0,
                                                                'left' : 0
                                                           };
			
			// check view is a jquery object
			if (this.$view instanceof jQuery && this.$view != undefined) {
				//W.l('is jQuery');
			} else {
				this.$view = jQuery(this.$view);
			}
			
			if (this.useStyles) this.$view.css(this.style); 
			
            // must be last
            if (this.$view ==  undefined) this.renderView();

            return this;
        };

        W.slideshow.Slide
            .method("renderView",
                /**
                 * Creates the view element of the slide. Ideally this will not be called when a `$view` is provied at slide creation.
                 * Will try to create an img tag using the `src` and title. Needs to be wrapped in a div
                 * @name renderView
                 * @returns W.slideshow.Slide
                 * @methodOf W.slideshow.Slide
                 */
                 function () {
                     this.$view = $('<div><img src="' + this.src + '" title="' + this.title + '" /></div>');
                     if (this.useStyles) this.$view.css(this.style);
                     return this;
                 }
            );


         /**
            Creates a new  W.slideshow.Settings
            @class
         */
        W.slideshow.Settings = function(params) {
            if (params == undefined)     params = {};

            /**
             * Overflow CSS for container
             * @type    String
             * @default overflow: hidden
            */
            this.overflow =                params['overflow'] || "hidden";
            /**
             * Milliseconds
             * @type    Number
             * @default 100
            */
            this.transitionInTime =       params['transitionInTime'] || 1000;
            /**
             * Milliseconds. Only visible if transitioning out slide is visible (i.e. overlapping).
             * @type    Number
             * @default 100
            */
            this.transitionOutTime =      params['transitionOutTime'] || 200;
            /**
             * Where the gallery controller cycles through images
             * @type    Boolean
             * @default true
            */
            this.loops =                  params['loops'] || true;
            /**
             * Duration of Slide. Excludes transtition in and out time ( transtition in and out time are added to  play() intervals )
             * @type    Number
             * @default 3000
            */
            this.slideDuration =          params['slideDuration'] || 3000;
            /**
             * Stop slideshow when next or previous is called.
             * @type    Boolean
             * @default true
            */
            this.stopOnNextOrPrevious =   params['stopOnNextOrPrevious'] || true;
            /**
             * Stop slideshow when a specific slide is requested
             * @type    Boolean
             * @default true
            */
            this.stopOnGoToSlide =        params['stopOnGoToSlide'] || true;
            /**
             * Play when adding Album
             * @type    Boolean
             * @default true
            */
            this.autoPlay =        params['autoPlay'] || true;
        }
        W.slideshow.Settings
            .method("mergeSettings",
                /**
                 * Safely merge settings
                 * @private
                 * @name mergeSettings
                 * @methodOf W.slideshow.Controller
                 */
                function (/** W.slideshow.Settings */ newSettings, /** W.slideshow.Settings */ oldSettings) {

                    // break if no arguments
                    if (newSettings == undefined) return;
                    // if no oldSettings create a setting object with defaults to merge with
                    if (oldSettings == undefined) {
                        oldSettings = new W.slideshow.Settings();
                    };

                    // merge
                    for (var i in newSettings) {
                        oldSettings[i] = newSettings[i];
                    };

                    return oldSettings;
                }
        );

})(W);
