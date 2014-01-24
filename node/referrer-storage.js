// Parses referrers and stored a cout in redis

var url = require('url');

function ReferrerStorage ( options ) {
    this.redisClient = options.redisClient;
    this.excludeArray = options.excludeArray;
    this.redisKey = options.redisKey || "veref";
}

ReferrerStorage.prototype.processRequest = function ( req, key ) {
    var referrer = req.headers['referer'] || req.headers['referrer'];

    if ( typeof referrer !== 'undefined' && referrer.length !== 0 ) {

        // get the host
        var parsedUrl = url.parse( referrer );

        var hostname = parsedUrl.hostname;

        // Remove www.
        if ( hostname.indexOf( "www." ) === 0 ) {
            hostname = hostname.substring(4);
        }

        // See if it is in the exclude list
        if ( this.excludeArray.indexOf( hostname ) > -1 ) {
            return;
        }

        // See if this is an IP address only
        if ( hostname.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/m) ) {
            return;
        }

        // create the keys
        var redisKey = this.redisKey;
        if ( typeof key !== "undefined" ) {
            redisKey += ":" + key;
        }
        
        // Store it in redis
        this.redisClient.zincrby( redisKey, 1, hostname, function ( err, result ) {
            if ( err ) {
                console.error( "ReferrerStorage::processRequest Failed save referrer", err );
                return;
            }
        });
        
    } 
};

ReferrerStorage.prototype.getMultiple = function ( keys, callback ) {

    var multi = this.redisClient.multi();

    for ( var i=0; i<keys.length; ++i) {
        multi.zrevrange( this.redisKey + ":" + keys[i], 0, 50, "WITHSCORES" );
    }

    multi.exec( function( err, results ) {
        if ( err ) { callback( err ); return; }
        var data = {};
        for ( var i=0; i<keys.length; ++i) {
            var items = {};
            try {
                var commandResult = results[i];
                for ( var it = 0; it < commandResult.length; it+=2 ) {
                    items[ commandResult[it] ] = commandResult[it+1];
                }
            } catch ( err ) {
                console.error( "ReferrerStorage::getMultiple Error matching results to keys", err ) ;
                continue;
            }
            data[ keys[i] ] = items;
        }
        callback( null, data );
    });

};

module.exports = ReferrerStorage; 
