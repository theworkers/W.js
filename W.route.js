/*
Copyright (C) <year> by <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

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

        /**
         * @namespace W.route
         **/
  	W.route = {};

         /**
         *  Establishes a W.route.Router. Maps functions and, optionally, parameters to route strings<br />
         *  <br />
         *  Based on <a href="https://github.com/mtrpcic/pathjs">pathjs</a> by Mike Trpcic. Stripped down to not use the location.hash matching<br />
         *  <br />
         *  todo:   create a regex version more like backbone<br />
         *  todo:   allow for non URL strings<br />
         *  <br />
         *  <b>Route strings must be in the format /something/somthing/</b>
         *
         *  @example
         *
         *      W.route.Router.map("/test/route/:whatever/").to(function(){
         *            alert("test/route + " + this.params['whatever']);
         *      });
         *
         *      W.route.Router.dispatch("/test/route/helloworld");
         *
         *  @class
         */
        W.route.Router = {
            /**
             *  Create a route with path string.
             *  @param   {String}   path    Path string. For parameters use :Parameter e.g. /hello/:ross/
             *  @methodOf W.route.Router
             *  @name map
             *  @returns {W.route.Router.core.route} Route object
             **/
            'map': function (path) {
                if ( W.route.Router.routes.hasOwnProperty(path)) {
                    return  W.route.Router.routes[path];
                } else {
                    return new  W.route.Router.core.route(path);
                }
            },
            'root': function (path) {
                 W.route.Router.routes.root = path;
            },
            'rescue': function (fn) {
                 W.route.Router.routes.rescue = fn;
            },
            'match': function (path) {
                var params = {};
                var route = null;
                var i = null;
                
                for (route in  W.route.Router.routes) {
                
                    if (route !== null && route !== undefined) {
                        var compare = path;
                        if (route.indexOf(":") > -1) {
                            for (i = 0; i < route.split("/").length; i++) {
                                if ((i < compare.split("/").length) && (route.split("/")[i].charAt(0) === ":")) {
                                    params[route.split('/')[i].replace(":", '')] = compare.split("/")[i];
                                    compare = compare.replace(compare.split("/")[i], route.split("/")[i]);
                                }
                            }
                        }
                        
                        

                        if (route === compare) {
                            W.route.Router.routes[route].params = params;
                            return  W.route.Router.routes[route];
                        }
                    }
                }

                return null;
            },
            /**
             *  Broadcast a Path string to the Route which will call any mapped functions to the provided route.
             *  @param   {String}   path    Path string. For parameters use :ParameterName
             *  @methodOf W.route.Router
             *  @name dispatch
             *  @returns {W.route.Router.core.route} Route object
             **/
            'dispatch': function (path) {
                    var match =  W.route.Router.match(path);
                    if (match !== null) {
                        match.run();
                    } else {
                        if ( W.route.Router.routes.rescue !== null) {
                            if ( W.route.Router.routes[ W.route.Router.routes.previous].do_exit !== null) {
                                 W.route.Router.routes[ W.route.Router.routes.previous].do_exit();
                            }

                             W.route.Router.routes.rescue();
                        }
                    }
                //}
            },
            'core': {
                'route': function (path) {
                    this.path = path;
                    this.action = null;
                    this.do_enter = null;
                    this.do_exit = null;
                    this.params = {};
                     W.route.Router.routes[path] = this;
                }
            },
            'routes': {
                'current': null,
                'root': null,
                'rescue': null,
                'previous': null
            }
        };

        /**
         *  @name W.route.Router.core.route
         *  @class
         *  */
         W.route.Router.core.route.prototype = {
             /**
             *  Bind a function to a route object
             *  @param   {Function} fn  Function to be binded. The context containts a params collection of parameters found from map
             *  @methodOf  W.route.Router.core.route
             *  @name to
             **/
            'to': function (fn) {
                this.action = fn;
                return this;
            },
            'enter': function (fn) {
                this.do_enter = fn;
                return this;
            },
            'exit': function (fn) {
                this.do_exit = fn;
                return this;
            },
            'run': function () {
                if ( W.route.Router.routes.hasOwnProperty( W.route.Router.routes.previous)) {
                    if ( W.route.Router.routes[ W.route.Router.routes.previous].do_exit !== null) {
                         W.route.Router.routes[ W.route.Router.routes.previous].do_exit();
                    }
                }

                if ( W.route.Router.routes[this.path].hasOwnProperty("do_enter")) {
                    if ( W.route.Router.routes[this.path].do_enter !== null) {
                         W.route.Router.routes[this.path].do_enter();
                    }
                }

                 W.route.Router.routes[this.path].action();
            }
        }



})(W);

