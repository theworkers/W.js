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



/* Adding .method() to JavaScript to Allow
 * Add a method to the Function object that can be used to declare methods. */
Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};

(function (W) {

        /** @namespace W.slideshow
         **/
  	W.slideshow = {};

        // check for required
        if(W.animation == undefined) {
            W.w("W.animation not included. W.slideshow will fail");
        }

       /**
         *  Creates a new  W.slideshow.Controller shows {@link W.slideshow.SlideAlbum}s.
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
            this._items = [];
            this._hasItems = false;
            this._settings = ($settings == undefined) ? $settings = new W.slideshow.Settings() : $settings;

            /**#@+
             *  @memberOf W.slideshow.Controller
             **/

            /** Event */
            this.IMAGE_CHANGED = "image changed";
            /** Event */
            this.PLAY_STATE_CHANGED = "image changed";
            
            /**#@-*/

            /** Version.
             *  @memberOf W.slideshow.Controller
             **/
            this.VERSION = "0.0.1";
        };

        // extend dispatcher
        W.slideshow.Controller.prototype = new W.event.Dispatcher();



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
                function (/** W.slideshow.SlideAlbum */ album) {
                    this._items.push(album);
                    if(!this._hasItems) {
                        this.createImage(album.slides[0]);
                    }
                    return this;
                }
            )
            .method( "createImage",
                /**
                 * @name createImage
                 * @methodOf W.slideshow.Controller
                 */
                function (item) {
                    var $item = $("<img src='" + item.src + "'/>");
                    this._$view.append($item);
                    $item.fadeOut(0).fadeIn(this._settings.transitionTime);
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
                 */
                function () {
                    W.stub("play");

                    return this;
                }
            )
            .method( "stop",
                /**
                 * @name stop
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    W.stub("stop");

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
            .method( "next",
                /**
                 * @name next
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    W.stub("next");
                    W.l(this);
                    this.dispatch(this.IMAGE_CHANGED);

                    return this;
                }
            )
            .method( "previous",
                /**
                 * @name previous
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    W.stub("previous");

                    return this;
                }
            )
            .method( "last",
                /**
                 * @name last
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    W.stub("last");

                    return this;
                }
            )
            .method( "first",
                /**
                 * @name first
                 * @methodOf W.slideshow.Controller
                 */
                function () {
                    W.stub("first");

                    return this;
                }
            );
        /**#@-*/

        /**
            Creates a new  W.slideshow.Album Contains {@link W.slideshow.Slide}
            @class
         */
        W.slideshow.SlideAlbum = function() {
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
         */
        W.slideshow.Slide = function(params) {
            if (params == undefined)  params = {};
            this.src =                params['src'] || "";
            this.description =        params['description'] || "";
            this.title  =             params['title'] || "";
        };


         /**
            Creates a new  W.slideshow.Settings
            @class
         */
        W.slideshow.Settings = function(params) {
            if (params == undefined)     params = {};

            /**
             * CSS for container
             * @type    String
             * @default hidden
            */
            this.overflow =              params['overflow'] || "hidden";
            /**
             * Milliseconds
             * @type    Number
             * @default 100
            */
            this.transitionTime =        params['transitionTime'] || 100;
            /**
             * Slide Container Element
             * @type    String / DOM_Element
             * @default <div class=".w-slideshow-slide-container"></div>
            */
            this.slideContainer =        params['slideContainer'] || '<div class=".w-slideshow-slide-container"></div>';
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
