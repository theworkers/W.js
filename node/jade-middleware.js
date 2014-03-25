var jade = require('jade');
var path = require('path');
var fs = require('fs');

// Debug logger
var useDebugLog = (typeof process.env.DEBUG_JADE_MIDDLEWARE !== "undefined");
var debugLog = function () {
    if (!useDebugLog) { return; }
    console.log.apply(this, Array.prototype.slice.call(arguments, 0));
};

// # Middleware
module.exports = function (options) {
    var pages = {};
    var src = options.src; 
    // used for jade extends
    var jadeOptions = options.jadeOptions;

    return function (req, res, next) {
        hasHTMLExtension(req.url, function (yN, extension) {
            // if not finish
            if (!yN) { 
                next(); 
                return; 
            } 
            hasMatchingJadeFileInPages(src, req.url, pages, jadeOptions, function (yN, page) {
                if (yN) { 
                    page.shouldRenderToFile(function (yN) {
                        if (yN) {
                            page.renderToFile(next);
                        } else {
                            next();
                        }
                    });
                } else {
                    next();
                }
            });
        });
    };
};

// ## Utils

// see if request may be for an HTML file
function hasHTMLExtension(url, callback) {
    var extension = path.extname(url);
    if (extension === "" || extension === ".html" /* || extension === ".htm" */) {
        return callback(true, extension);
    } else {
        return callback(false);
    }
}

// creates a jade page if it doesn't exist in cache
function hasMatchingJadeFileInPages(srcDir, url, pages, jadeOptions, callback) {
    if (typeof pages[url] === 'undefined') {
        // get the possible jade file path
        var extension = path.extname(url);
        var jadeFilePath;
        var htmlFilePath;
        if (extension === ".html" /* || extension === ".htm" */) {
            jadeFilePath = path.join(srcDir, url.substring(0, url.length - extension.length) + ".jade");
            htmlFilePath = path.join(srcDir, url);
        } else {
            jadeFilePath = path.join(srcDir, url + "/index.jade");
            htmlFilePath = path.join(srcDir, url + "/index.html");
        }
        // see if the jadefile exsists
        fs.exists(jadeFilePath, function (exsits) {
            // store the result in a new HTML page
            pages[url] = new HTMLPage({
                matchingJadeFilePath: (exsits)?jadeFilePath:null,
                htmlFilePath: htmlFilePath,
                jadeOptions: jadeOptions
            });
            callback(!!pages[url].matchingJadeFilePath, pages[url]);
        });
    } else {
        callback(!!pages[url].matchingJadeFilePath, pages[url]);
    }
}

// ## HTML Page Object

var HTMLPage = function (options) {
    this.matchingJadeFilePath = options.matchingJadeFilePath;
    this.htmlFilePath = options.htmlFilePath;
    this.lastRenderToFile = undefined;
    this.jadeOptions = (typeof options.jadeOptions === 'undefined') ? { pretty: true } : options.jadeOptions;
};

HTMLPage.prototype.shouldRenderToFile = function (callback) {
    if (!!this.matchingJadeFilePath && !this.lastRenderToFile) {
        callback(true);
    } else if (!!this.matchingJadeFilePath) {
        var self = this;
        fs.stat(this.matchingJadeFilePath, function (err, stats) {
            if (err) {
                console.error("jade-middleware::Could not stat .jade file");
                console.error(err);
                callback(false);
                return;
            } 
            callback(self.lastRenderToFile < stats.mtime);
        });
    } else {
        callback(false);
    }
};

HTMLPage.prototype.renderToFile = function (callback) {
    this.lastRenderToFile = Date.now();
    debugLog("jade-middleware::renderToFile", this.lastRenderToFile ); 
    var self = this;
    fs.readFile(this.matchingJadeFilePath, function (err, data) {
        data = data.toString();
        if (err) {
            console.error("jade-middleware::Could not read .jade file");
            console.error(err);
            callback();
            return;
        }
        var compileError = false;
        var jadeCompiledFn; 
        var jadeString;
        try {
            jadeCompiledFn = jade.compile(data, self.jadeOptions);
        } catch (e) {
            compileError = e.toString();
        }
        jadeString = (compileError) ? compileError :  jadeCompiledFn();
        fs.writeFile(self.htmlFilePath, jadeString, function (err) {
            if (err) {
                console.error("jade-middleware::Could not read .jade file");
                console.error(err);
            }
            callback();
        });
    });
};