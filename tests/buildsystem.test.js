if (typeof module !== 'undefined' && module.exports) {
    var assert = require( 'assert' );
    var W = require( '../build/W.node.js' );
    var utils = require( './js/utils.js' );
}

describe( "Buildsystem for both client and node", function () {

    // # Exists
    // ## W
    utils.checkExists( 'W', typeof W );

    // ## Core
    utils.checkExists( 'W.Object', typeof W.Object );
    utils.checkExists( 'W.bind', typeof W.bind );
    utils.checkExists( 'W.clone', typeof W.clone );
    utils.checkExists( 'W.countedCallbackMixin', typeof W.countedCallbackMixin );
    utils.checkExists( 'W.each', typeof W.each );
    utils.checkExists( 'W.eventMixin', typeof W.eventMixin );
    utils.checkExists( 'W.extend', typeof W.extend );
    utils.checkExists( 'W.isNotOk', typeof W.isNotOk );
    utils.checkExists( 'W.isOk', typeof W.isOk );
    utils.checkExists( 'W.List', typeof W.List );
    utils.checkExists( 'W.loop', typeof W.loop );
    utils.checkExists( 'W.Middleware', typeof W.Middleware );
    utils.checkExists( 'W.Router', typeof W.Router );
    utils.checkExists( 'W.Sequence', typeof W.Sequence );
    utils.checkExists( 'W.sequence', typeof W.sequence );
    utils.checkExists( 'W.TickTimer', typeof W.TickTimer );
    utils.checkExists( 'W.Timer', typeof W.Timer );
    utils.checkExists( 'W.interpose', typeof W.interpose );
    utils.checkExists( 'W.partial', typeof W.partial );
    utils.checkExists( 'W.flip', typeof W.partial );
    utils.checkExists( 'W.partition', typeof W.partition );
    utils.checkExists( 'W.flatten', typeof W.flatten );
    utils.checkExists( 'W.promise', typeof W.promise );
    utils.checkExists( 'W.last', typeof W.last );
    utils.checkExists( 'W.withoutLast', typeof W.withoutLast );
    utils.checkExists( 'W.toArray', typeof W.toArray );
    utils.checkExists( 'W.composeAsync', typeof W.composeAsync );
    utils.checkExists( 'W.isUndefined', typeof W.isUndefined );
    utils.checkExists( 'W.call', typeof W.call );
    utils.checkExists( 'W.partialRight', typeof W.partialRight );
    utils.checkExists( 'W.compose', typeof W.compose );
    utils.checkExists( 'W.range', typeof W.range );
    
    // ## Color
    utils.checkExists( 'W.HSLGradient', typeof W.HSLGradient );
    utils.checkExists( 'W.RandomColorSequence', typeof W.RandomColorSequence );
    utils.checkExists( 'W.hslToRgb', typeof W.hslToRgb );
    utils.checkExists( 'W.hsvToRgb', typeof W.hsvToRgb );
    utils.checkExists( 'W.rgbToHsl', typeof W.rgbToHsl );
    utils.checkExists( 'W.rgbToHsv', typeof W.rgbToHsv );
    utils.checkExists( 'W.randomHex', typeof W.randomHex );

    // ## Math
    utils.checkExists( 'W.shuffleArray', typeof W.shuffleArray );
    utils.checkExists( 'W.randomBetween', typeof W.randomBetween );
    utils.checkExists( 'W.normalize', typeof W.normalize );
    utils.checkExists( 'W.map', typeof W.map );
    utils.checkExists( 'W.lerp', typeof W.lerp );
    utils.checkExists( 'W.isClose', typeof W.isClose );
    utils.checkExists( 'W.interpolations', typeof W.interpolations );
    utils.checkExists( 'W.inRange', typeof W.inRange );
    utils.checkExists( 'W.hexStringToColorArray', typeof W.hexStringToColorArray );
    utils.checkExists( 'W.floatToString', typeof W.floatToString );
    utils.checkExists( 'W.fitScaleRatio', typeof W.fitScaleRatio );
    utils.checkExists( 'W.dynamicEaseInterpolation', typeof W.dynamicEaseInterpolation );
    utils.checkExists( 'W.distance', typeof W.distance );
    utils.checkExists( 'W.PI', typeof W.PI );
    utils.checkExists( 'W.PI_2', typeof W.PI_2 );
    utils.checkExists( 'W.colorValuesToHex', typeof W.colorValuesToHex );
    utils.checkExists( 'W.colorStringToHex', typeof W.colorStringToHex );
    utils.checkExists( 'W.clipNormalized', typeof W.clipNormalized );
    utils.checkExists( 'W.clamp', typeof W.clamp );
    utils.checkExists( 'W.angleBetween', typeof W.angleBetween );
    utils.checkExists( 'W.interpolations', typeof W.interpolations );
    utils.checkExists( 'W.MatrixStack', typeof W.MatrixStack );
    utils.checkExists( 'W.add', typeof W.add );
    utils.checkExists( 'W.wrap', typeof W.wrap );

    // ### Interpolations
    utils.checkExists( 'W.interpolations.linearInterpolation', typeof W.interpolations.linearInterpolation );
    utils.checkExists( 'W.interpolations.quadraticEaseIn', typeof W.interpolations.quadraticEaseIn );
    utils.checkExists( 'W.interpolations.quadraticEaseOut', typeof W.interpolations.quadraticEaseOut );
    utils.checkExists( 'W.interpolations.quadraticEaseInOut', typeof W.interpolations.quadraticEaseInOut );
    utils.checkExists( 'W.interpolations.cubicEaseIn', typeof W.interpolations.cubicEaseIn );
    utils.checkExists( 'W.interpolations.cubicEaseOut', typeof W.interpolations.cubicEaseOut );
    utils.checkExists( 'W.interpolations.cubicEaseInOut', typeof W.interpolations.cubicEaseInOut );
    utils.checkExists( 'W.interpolations.quarticEaseIn', typeof W.interpolations.quarticEaseIn );
    utils.checkExists( 'W.interpolations.quarticEaseOut', typeof W.interpolations.quarticEaseOut );
    utils.checkExists( 'W.interpolations.quarticEaseInOut', typeof W.interpolations.quarticEaseInOut );
    utils.checkExists( 'W.interpolations.quinticEaseIn', typeof W.interpolations.quinticEaseIn );
    utils.checkExists( 'W.interpolations.quinticEaseOut', typeof W.interpolations.quinticEaseOut );
    utils.checkExists( 'W.interpolations.quinticEaseInOut', typeof W.interpolations.quinticEaseInOut );
    utils.checkExists( 'W.interpolations.sineEaseIn', typeof W.interpolations.sineEaseIn );
    utils.checkExists( 'W.interpolations.sineEaseOut', typeof W.interpolations.sineEaseOut );
    utils.checkExists( 'W.interpolations.sineEaseInOut', typeof W.interpolations.sineEaseInOut );
    utils.checkExists( 'W.interpolations.circularEaseIn', typeof W.interpolations.circularEaseIn );
    utils.checkExists( 'W.interpolations.circularEaseOut', typeof W.interpolations.circularEaseOut );
    utils.checkExists( 'W.interpolations.circularEaseInOut', typeof W.interpolations.circularEaseInOut );
    utils.checkExists( 'W.interpolations.exponentialEaseIn', typeof W.interpolations.exponentialEaseIn );
    utils.checkExists( 'W.interpolations.exponentialEaseOut', typeof W.interpolations.exponentialEaseOut );
    utils.checkExists( 'W.interpolations.exponentialEaseInOut', typeof W.interpolations.exponentialEaseInOut );
    utils.checkExists( 'W.interpolations.elasticEaseIn', typeof W.interpolations.elasticEaseIn );
    utils.checkExists( 'W.interpolations.elasticEaseOut', typeof W.interpolations.elasticEaseOut );
    utils.checkExists( 'W.interpolations.elasticEaseInOut', typeof W.interpolations.elasticEaseInOut );
    utils.checkExists( 'W.interpolations.backEaseIn', typeof W.interpolations.backEaseIn );
    utils.checkExists( 'W.interpolations.backEaseOut', typeof W.interpolations.backEaseOut );
    utils.checkExists( 'W.interpolations.backEaseInOut', typeof W.interpolations.backEaseInOut );
    utils.checkExists( 'W.interpolations.bounceEaseIn', typeof W.interpolations.bounceEaseIn );
    utils.checkExists( 'W.interpolations.bounceEaseOut', typeof W.interpolations.bounceEaseOut );
    utils.checkExists( 'W.interpolations.bounceEaseInOut', typeof W.interpolations.bounceEaseInOut );

    // ## String
    utils.checkExists( 'W.addCommas', typeof W.addCommas );
    utils.checkExists( 'W.contains', typeof W.contains );
    utils.checkExists( 'W.cssGradientString', typeof W.cssGradientString );
    utils.checkExists( 'W.endsWith', typeof W.endsWith );
    utils.checkExists( 'W.hsTld', typeof W.hsTld );
    utils.checkExists( 'W.startsWith', typeof W.startsWith );
    utils.checkExists( 'W.trim', typeof W.trim );
    utils.checkExists( 'W.isValidEmailAddress', typeof W.isValidEmailAddress );
    utils.checkExists( 'W.makeRedisKey', typeof W.makeRedisKey );

});
