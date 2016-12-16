# W.js

A snippets repository and welterweight library used by [The Workers](http://theworkers.net) maintained by [Ross Cairns](http://rosscairns.com/). [The Workers](http://theworkers.net) are a creative coding studio in East London.

![](https://img.shields.io/npm/v/w-js.svg?style=flat)
![](https://img.shields.io/npm/dm/w-js.svg)
[![Build Status](https://travis-ci.org/theworkers/W.js.svg?branch=master)](https://travis-ci.org/theworkers/W.js)

_Node Usage_  
`npm install w-js`  
*Browser Usage*  
`wget https://raw.githubusercontent.com/theworkers/W.js/master/build/W.min.js`

Used in:  
[After Dark](http://afterdark.io/),
[Where You Are](http://where-you-are.com/),
[Reset](http://www.bibliothequedesign.com/projects/branding/reset/),
[Bloomberg Connects](http://www.tate.org.uk/visit/tate-modern/things-to-do/bloomberg-connects-interactive-activities),
[o/o/o/o](http://o-o-o-o.co.uk/),
[Music To Move To](http://musictomoveto.co.uk/),
[Wylde Archive](http://archive.wyldemag.co.uk/),
[Wyldemag](http://archive.wyldemag.co.uk/),
[51 Jay St](http://51jayst.com/),
[David Newton](http://dnewton.com/)

## Features

### Core

[bind](core/bind.js),
[call](core/call.js),
[clone](core/clone.js),
[compose](core/compose.js),
[composeAsync](core/compose-async.js),
[composePromisers](core/compose-promisers.js),
[countedCallbackMixin](core/counted-callback-mixin.js),
[cycle](core/cycle.js),
[each](core/each.js),
[eventMixin](core/event-mixin.js),
[extend](core/extend.js),
[first](core/first.js),
[flatten](core/flatten.js),
[flip](core/flip.js),
[interpose](core/interpose.js),
[isDefined](core/is-defined.js),
[isNotOk](core/is-not-ok.js),
[isOk](core/is-ok.js),
[isUndefined](core/is-undefined.js),
[isNotUndefined](core/is-not-undefined.js),
[last](core/last.js),
[list](core/list.js),
[limit](core/limit.js),
[loop](core/loop.js),
[makeReporter](core/make-reporter.js),
[Middleware](core/middleware.js),
[negate](core/negate.js),
[Obj](core/object.js),
[once](core/once.js),
[partial](core/partial.js),
[partialRight](core/partial-right.js),
[partition](core/partition.js),
[promise](core/promise.js),
[promiseWrap](core/promiseWrap.js),
[range](core/range.js),
[randomFrom](core/random-from.js),
[report](core/report.js),
[rest](core/rest.js),
[Router](core/router.js),
[Sequence](core/sequence.js),
[sequence](core/sequence.js),
[take](core/take.js),
[TickTimer](core/tick-timer.js),
[Timer](core/timer.js),
[toArray](core/to-array.js),
[toPartition](core/to-partition.js),
[withoutLast](core/without-last.js)

### Client

[clearContext](client/clear-context.js),
[displayViewMixin](client/display-view-mixin.js),
[JSONSocketConnection](client/json-socket-connection.js),
[polyfillRequestAnimationFrame](client/polyfill-request-animation-frame.js),
[touchEventViewMixin](client/touch-event-view-mixin.js),
[viewportSize](client/viewport-size.js),
[wrappedContext](client/wrapped-context.js),
[ZIndexStack](client/z-index-stack.js),

### Color

[HSLGradient](color/hsl-gradient.js),
[hslToRgb](color/hsl-to-rgb.js),
[hsvToRgb](color/hsv-to-rgb.js),
[RandomColorSequence](color/random-color-sequence.js),
[randomHex](color/random-hex.js),
[rgbToHsl](color/rgb-to-hsl.js),
[rgbToHsv](color/rgb-to-hsv.js)

### Math

[add](math/add.js),
[angleBetween](math/angle-between.js),
[clamp](math/clamp.js),
[clipNormalized](math/clip-normalized.js),
[colorStringToHex](math/color-string-to-hex.js),
[colorValuesToHex](math/color-values-to-hex.js),
[distance](math/distance.js),
[dynamicEaseInterpolation](math/dynamic-ease-interpolation.js),
[fitScaleRatio](math/fit-scale-ratio.js),
[floatToString](math/float-to-string.js),
[getDynamicallyEasedInterpolation](math/get-dynamically-eased-interpolation.js),
[hexStringToColorArray](math/hex-string-to-color-array.js),
[inRange](math/in-range.js),
[isClose](math/is-close.js),
[lerp](math/lerp.js),
[makeMapInterval](math/make-map-interval.js),
[map](math/map.js),
[MatrixStack](math/matrix-stack.js),
[normalize](math/normalize.js),
[PI](math/p-i.js),
[PI_2](math/pi-2.js),
[randomBetween](math/random-between.js),
[shuffleArray](math/shuffle-array.js),
[wrap](math/wrap.js)

#### Interpolations

[backEaseIn](math/interpolations/back-ease-in.js),
[backEaseInOut](math/interpolations/back-ease-in-out.js),
[backEaseOut](math/interpolations/back-ease-out.js),
[bounceEaseIn](math/interpolations/bounce-ease-in.js),
[bounceEaseInOut](math/interpolations/bounce-ease-in-out.js),
[bounceEaseOut](math/interpolations/bounce-ease-out.js),
[circularEaseIn](math/interpolations/circular-ease-in.js),
[circularEaseInOut](math/interpolations/circular-ease-in-out.js),
[circularEaseOut](math/interpolations/circular-ease-out.js),
[cubicEaseIn](math/interpolations/cubic-ease-in.js),
[cubicEaseInOut](math/interpolations/cubic-ease-in-out.js),
[cubicEaseOut](math/interpolations/cubic-ease-out.js),
[elasticEaseIn](math/interpolations/elastic-ease-in.js),
[elasticEaseInOut](math/interpolations/elastic-ease-in-out.js),
[elasticEaseOut](math/interpolations/elastic-ease-out.js),
[exponentialEaseIn](math/interpolations/exponential-ease-in.js),
[exponentialEaseInOut](math/interpolations/exponential-ease-in-out.js),
[exponentialEaseOut](math/interpolations/exponential-ease-out.js),
[linearInterpolatio](math/interpolations/linear-interpolatio.js),
[quadraticEaseIn](math/interpolations/quadratic-ease-in.js),
[quadraticEaseInOut](math/interpolations/quadratic-ease-in-out.js),
[quadraticEaseOut](math/interpolations/quadratic-ease-out.js),
[quarticEaseIn](math/interpolations/quartic-ease-in.js),
[quarticEaseInOut](math/interpolations/quartic-ease-in-out.js),
[quarticEaseOut](math/interpolations/quartic-ease-out.js),
[quinticEaseIn](math/interpolations/quintic-ease-in.js),
[quinticEaseInOut](math/interpolations/quintic-ease-in-out.js),
[quinticEaseOut](math/interpolations/quintic-ease-out.js),
[sineEaseIn](math/interpolations/sine-ease-in.js),
[sineEaseInOut](math/interpolations/sine-ease-in-out.js),
[sineEaseOut](math/interpolations/sine-ease-out.js)

### Node

[corsMiddleware](node/cors-middleware.js),
[cssPrefixerMiddleware](node/css-prefixer-middleware.js),
[Geolocate](node/geolocate.js),
[jadeMiddleware](node/jade-middleware.js),
[jsMiddleware](node/js-middleware.js),
[jsMinMiddleware](node/js-min-middleware.js),
[JSONSocketConnection](node/json-socket-connection.js),
[liveReload](node/live-reload.js),
[WebSocketRepeater](node/web-socket-repeater.js)

### Redis

[redisReferrerStorage](redis/redis-referrer-storage.js),
[redisSetStorage](redis/redis-set-storage.js),
[redisTimeseriesStorage](redis/redis-timeseries-storage.js)

### String

[addCommas](string/add-commas.js),
[capitalizeFirstLetter](string/capitalize-first-letter.js),
[contains](string/contains.js),
[cssGradientString](string/css-gradient-string.js),
[domStr](client/dom-str.js),
[endsWith](string/ends-with.js),
[hasTld](string/has-tld.js),
[isValidEmailAddress](string/is-valid-email-address.js),
[join](string/join.js),
[makeRedisKey](string/make-redis-key.js),
[startsWith](string/starts-with.js),
[trim](string/trim.js)

### Util

[FileListBuilder](util/file-list-builder.js)

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
