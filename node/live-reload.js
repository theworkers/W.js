var WebSocketServer = require('ws').Server;
var Gaze = require('gaze');
var path = require('path');
var _ = require('underscore');

module.exports.watch = function (options) {
    var server = options.server;
    var app = options.app;
    var pathPatterns = options.pathPatterns;

    var wss = new WebSocketServer({server: server});
    var wsIdCounter = 0;
    var socketConnections = Object.create(null);
    wss.on('connection', function(ws) {
        var cid = "ws"+(++wsIdCounter);
        socketConnections[cid]=ws;
        ws.onclose = function () {
            delete socketConnections[cid];
        };
    });
    var broadcast = _.throttle(function (message) {
        console.log("Broadcasting");
        for (var ws in socketConnections) {
            socketConnections[ws].send(message);
        }
    }, 300);

    var isBroadcastingChange = false;
    app.get("/watch.js", function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end("var socket = new WebSocket('ws://'+window.location.host+'/'); \n\
            socket.onmessage = function (message) { \n\
                if (message.data === '.css' || message.data == '.less') { \n\
                    console.log('Reloading css'); \n\
                    var queryString = '?reload=' + new Date().getTime(); \n\
                    $('link[rel=\"stylesheet\"]').each(function () { \n\
                        if (this.href.indexOf(\"typekit\") === -1) { \n\
                            this.href = this.href.replace(/\\?.*|$/, queryString); \n\
                        } \n\
                    }); \n\
                } else { \n\
                    window.location.reload(); \n\
                } \n\
            };");
    });

    // Create a watch for each folder
    var gaze = new Gaze(pathPatterns);
    gaze.on('all', function(event, filepath) {
        console.log("File changed:", path.extname(filepath)); 
        broadcast(path.extname(filepath));
    });
};

