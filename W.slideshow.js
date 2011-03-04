////////////////////////////    W.slideShow
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

(function (W) {

        /** @namespace W.slideshow */
  	W.slideShow = {};
        
        /* Adding .method() to JavaScript to Allow
         * Add a method to the Function object that can be used to declare methods. */
        Function.prototype.method = function(name, fn) {
            this.prototype[name] = fn;
            return this;
        };

       /**
         *  Creates a new  W.slideShow.Controller Shows {@link WAlbum}.
         *  @class
         */
        W.slideShow.Controller = function($view) {
            /** @private  */

            /** @memberOf W.slideShow.Controller */
            var Controller = this;

            /** The Dom Object used as the Slideshow container  */
            var _$view = $view;

            /** Version.
             *  @memberOf W.slideShow.Controller
             **/
            this.VERSION = "0.0.1";
        };

         W.slideShow.Controller
            .method("get$View",
                /**
                 * @name get$View
                 * @methodOf W.slideShow.Controller
                 * @return {jQuery} the main view for the Slideshow
                 */
                function () {
                 return Controller._$view
                }
            );

        /**#@+
         *  Play control
         *  @returns {W.slideShow.Controller} Controller to allow for chaining
         *  @type Controller
         **/
        W.slideShow.Controller
            .method( "play",
                /**
                 * @name play
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("play");

                    return this;
                }
            )
            .method( "stop",
                /**
                 * @name stop
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("stop");

                    return this;
                }
            )
            .method( "restart",
                /**
                 * @name restart
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("restart");

                    return this;
                }
            )
            .method( "next",
                /**
                 * @name next
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("next");

                    return this;
                }
            )
            .method( "previous",
                /**
                 * @name previous
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("previous");

                    return this;
                }
            )
            .method( "last",
                /**
                 * @name last
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("last");

                    return this;
                }
            )
            .method( "first",
                /**
                 * @name first
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("first");

                    return this;
                }
            );
        /**#@-*/

        /**#@+
         *  Content control
         *  @returns {W.slideShow.Controller} Controller to allow for chaining
         *  @type Controller
         **/
         W.slideShow.Controller
            .method( "addAlbum",
                /**
                 * @name addAlbum
                 * @methodOf W.slideShow.Controller
                 */
                function () {
                    W.stub("addAlbum");

                    return this;
                }
            );
         /**#@-*/

        /**
            Creates a new  W.slideShow.Album Contains {@link W.slideShow.Slide}
            @class
         */
        W.slideShow.SlideAlbum = function() {
             /**
             *  @private
             *  @memberOf W.slideShow.SlideAlbum
            */
            var Album = this;

            /** @private */

            /**
             * Internal Array of {@link W.slideShow.Slide}
             * @type Array
            */
            this.slides = array();

        };


        /**
            Creates a new  W.slideShow.Slide.
            @class
         */
        W.slideShow.Slide = function() {
            /**
             *  @private
             *  @memberOf W.slideShow.Slide
            */
            var Slide = this;
        };



})(W);
