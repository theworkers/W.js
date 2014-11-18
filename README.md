# W.js Version 4

A snippets repository and welterweight library used by [The Workers](http://theworkers.net) maintained by [Ross Cairns](http://rosscairns.com/).

[The Workers](http://theworkers.net) are a creative coding studio in East London. 

Used on projects such as:

* [Where You Are](http://where-you-are.com/)
* [o/o/o/o](http://o-o-o-o.co.uk/)

## Features

#### Core

* W.bind
* W.clone
* W.countedCallbackMixin
* W.each
* W.eventMixin
* W.extend
* W.List
* W.loop
* W.Middleware
* W.Sequence
* W.sequence
* W.TickTimer
* W.Timer
* W.Obj
* W.isOk
* W.isNotOk
* W.Router
* W.interpose
* W.partial
* W.flip
* W.partition
* W.toPartition
* W.flatten
* W.promise
* W.rest
* W.first
* W.last
* W.withoutLast
* W.toArray
* W.composeAsync
* W.isUndefined
* W.call
* W.partialRight
* W.compose

#### Client

* W.ZIndexStack
* W.wrappedContext
* W.viewportSize
* W.touchEventViewMixin
* W.polyfillRequestAnimationFrame
* W.JSONSocketConnection
* W.displayViewMixin
* W.clearContext

#### Color


* W.HSLGradient
* W.RandomColorSequence
* W.hslToRgb
* W.hsvToRgb
* W.rgbToHsl
* W.rgbToHsv
* W.randomHex

#### Math

* W.angleBetween
* W.clamp
* W.clipNormalized
* W.colorStringToHex
* W.colorValuesToHex
* W.distance
* W.getDynamicallyEasedInterpolation
* W.dynamicEaseInterpolation
* W.fitScaleRatio
* W.floatToString
* W.hexStringToColorArray
* W.inRange
* W.isClose
* W.lerp
* W.map
* W.normalize
* W.randomBetween
* W.shuffleArray
* W.PI
* W.PI_2
* W.MatrixStack
* W.add
* W.interpolations.linearInterpolatio
* W.interpolations.quadraticEaseIn
* W.interpolations.quadraticEaseOut
* W.interpolations.quadraticEaseInOut
* W.interpolations.cubicEaseIn
* W.interpolations.cubicEaseOut
* W.interpolations.cubicEaseInOut
* W.interpolations.quarticEaseIn
* W.interpolations.quarticEaseOut
* W.interpolations.quarticEaseInOut
* W.interpolations.quinticEaseIn
* W.interpolations.quinticEaseOut
* W.interpolations.quinticEaseInOut
* W.interpolations.sineEaseIn
* W.interpolations.sineEaseOut
* W.interpolations.sineEaseInOut
* W.interpolations.circularEaseIn
* W.interpolations.circularEaseOut
* W.interpolations.circularEaseInOut
* W.interpolations.exponentialEaseIn
* W.interpolations.exponentialEaseOut
* W.interpolations.exponentialEaseInOut
* W.interpolations.elasticEaseIn
* W.interpolations.elasticEaseOut
* W.interpolations.elasticEaseInOut
* W.interpolations.backEaseIn
* W.interpolations.backEaseOut
* W.interpolations.backEaseInOut
* W.interpolations.bounceEaseIn
* W.interpolations.bounceEaseOut
* W.interpolations.bounceEaseInOut

#### Node

* W.corsMiddleware
* W.WebSocketRepeater
* W.liveReload
* W.JSONSocketConnection
* W.jadeMiddleware
* W.Geolocate
* W.cssPrefixerMiddleware
* W.jsMiddleware
* W.jsMinMiddleware

#### Redis

* W.redisReferrerStorage
* W.redisSetStorage
* W.redisTimeseriesStorage

#### String

* W.addCommas
* W.contains
* W.cssGradientString
* W.endsWith
* W.hsTld
* W.startsWith
* W.trim
* W.isValidEmailAddress
* W.makeRedisKey

#### Util

* FileListBuilder

## Node usage

    npm install w-js --save

### With express

If W.js is included via NPM it can also be served to the client using the provided middleware:

	app.get('/js/W.js', W.jsMiddleware() );
	app.get('/js/W.min.js', W.jsMinMiddleware() );

## Building

    $ grunt build

## Documentation 

    $ grunt docs

## Testing

### Running Tests

Client-side tests with phantom.js

    $ grunt build test-client

Node tests:

    $ grunt build test-node

### Test setup

* `*.test.js` are run on both node and client (provided test is added to test.html)
* `*.test.client.js` are run client only, provided test is added to test.html
* `*.test.node.js` are run node only

## Node and Redis modules

Include with, for example:

    var Geolocate = W.Geolocate();
