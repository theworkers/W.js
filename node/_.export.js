(function ( W ) {
    // Create the namespace
    var W = W || {};

    // Allow selective requiring of node modules eg:
    // `var CorsMiddleware = require( 'W' ).CorsMiddleware();
    W.extend( W, {
        corsMiddleware : function () { return  require( '../node/cors-middleware' ); },
        WebSocketRepeater : function () { return  require( '../node/web-socket-repeater' ); },
        liveReload : function () { return  require( '../node/live-reload' ); },
        JSONSocketConnection : function () { return  require( '../node/json-socket-connection' ); },
        jadeMiddleware : function () { return  require( '../node/jade-middleware' ); },
        Geolocate : function () { return  require( '../node/geo-locate' ); },
        cssPrefixerMiddleware : function () { return  require( '../node/css-prefixer-middleware' ); }
    });

}( W ));