
////
/// W.Router
// @author Ross Cairns
// Based on [pathjs](https://github.com/mtrpcic/pathjs) by Mike Trpcic. Stripped to not use the location hash matching

var Router = W.Object.extend({
    constructor : function () {
        this.routes = {
            fallback : null
        };
    },
    map : function (path) {
        if (this.routes.hasOwnProperty(path)) {
            return  this.routes[path];
        } else {
            var route = new W.Route({path:path, router:this});
            this.routes[path] = route;
            return route;
        }
    },
    fallback : function (fn) {
         return this.routes.fallback = fn;
    },
    match : function (path) {
        var params = {};
        var route = null;
        var i = null;
        for (route in this.routes) {
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
                    this.routes[route].params = params;
                    return  this.routes[route];
                }
            }
        }
        return false;
    },
    trigger : function (path) {
        var match =  this.match(path);
        if (match) {
            match.run();
        } else {
            if (this.routes.fallback !== null) {
                this.routes.fallback();
            }
        }
        return this;
    }
});

var Route = W.Object.extend({
    constructor : function (options) {
        this.path = options.path;
        this.router = options.router;

        this.action = null;
        this.params = {};
    },
    to : function (fn, context) {
        if (context) {
            fn = W.bind(fn, context);
        }
        this.action = fn;
        return this.router;
    },
    run : function () {
        this.router.routes[this.path].action(this.router.routes[this.path].params);
    }
});
