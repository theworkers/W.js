function Router() {
    this.routes = {
        fallback : null
    };
}

Router.prototype.map = function (path) {
    if (this.routes.hasOwnProperty(path)) {
        return  this.routes[path];
    } else {
        var route = new Route({path:path, router:this});
        this.routes[path] = route;
        return route;
    }
};

Router.prototype.fallback = function (fn) {
    return this.routes.fallback = fn;
};

Router.prototype.match = function (path) {
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
};

Router.prototype.trigger = function (path) {
    var match =  this.match(path);
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    if (match) {
        match.run.apply(match, args);
    } else {
        if (this.routes.fallback !== null) {
            this.routes.fallback.apply(this, args);
        }
    }
    return this;
};

function Route (options) {
    this.path = options.path;
    this.router = options.router;
    this.action = null;
    this.params = {};
}

Route.prototype.to = function (fn, context) {
    if (context) {
        fn = W.bind(fn, context);
    }
    this.action = fn;
    return this.router;
};

Route.prototype.run = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.router.routes[this.path].params);
    this.router.routes[this.path].action.apply(this, args);
};

module.exports = Router;