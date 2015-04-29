(function ( W ) {
    // Create the namespace
    var W = W || {};

    // Allow selective requiring of node modules eg:
    // `var CorsMiddleware = require( 'W' ).CorsMiddleware();
    W.extend( W, {
        redisReferrerStorage: function () { return  require( '../node/redis-timeseries-storage' ); },
        redisSetStorage: function () { return  require( '../node/redis-set-storage' ); },
        redisTimeseriesStorage: function () { return  require( '../node/redis-referrer-storage' ); }
    });

}( W ));