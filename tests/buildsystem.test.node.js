if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
    var utils = require( './js/utils.js' );
}

describe( "Buildsystem for node", function () {

	// # Exists
	// ## Node
	utils.checkExists( 'W.corsMiddleware', typeof W.corsMiddleware );
	utils.checkExists( 'W.WebSocketRepeater', typeof W.WebSocketRepeater );
	utils.checkExists( 'W.liveReload', typeof W.liveReload );
	utils.checkExists( 'W.JSONSocketConnection', typeof W.JSONSocketConnection );
	utils.checkExists( 'W.jadeMiddleware', typeof W.jadeMiddleware );
	utils.checkExists( 'W.Geolocate', typeof W.Geolocate );
	utils.checkExists( 'W.cssPrefixerMiddleware', typeof W.cssPrefixerMiddleware );

	// ## Redis
	utils.checkExists( 'W.redisReferrerStorage', typeof W.redisReferrerStorage );
	utils.checkExists( 'W.redisSetStorage', typeof W.redisSetStorage );
	utils.checkExists( 'W.redisTimeseriesStorage', typeof W.redisTimeseriesStorage );

});