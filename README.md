# W.js Version 4

A snippets repository and welterweight library used by [The Workers](http://theworkers.net) maintained by [Ross Cairns](http://rosscairns.com/).

[The Workers](http://theworkers.net) are a creative coding studio in East London. 

Used on projects such as:

* [Where You Are](http://where-you-are.com/)
* [o/o/o/o](http://o-o-o-o.co.uk/)
* [Music To Move To](http://musictomoveto.co.uk/)
* [Reset](http://www.bibliothequedesign.com/projects/branding/reset/)

## Features

#### Core

[bind](blob/master/core/bind.js),
[call](blob/master/core/call.js),
[clone](blob/master/core/clone.js),
[compose](blob/master/core/compose.js),
[composeAsync](blob/master/core/compose-async.js),
[countedCallbackMixin](blob/master/core/counted-callback-mixin.js),
[each](blob/master/core/each.js),
[eventMixin](blob/master/core/event-mixin.js),
[extend](blob/master/core/extend.js),
[first](blob/master/core/first.js),
[flatten](blob/master/core/flatten.js),
[flip](blob/master/core/flip.js),
[interpose](blob/master/core/interpose.js),
[isNotOk](blob/master/core/is-not-ok.js),
[isOk](blob/master/core/is-ok.js),
[isUndefined](blob/master/core/is-undefined.js),
[last](blob/master/core/last.js),
[List](blob/master/core/list.js),
[loop](blob/master/core/loop.js),
[Middleware](blob/master/core/middleware.js),
[Obj](blob/master/core/object.js),
[partial](blob/master/core/partial.js),
[partialRight](blob/master/core/partial-right.js),
[partition](blob/master/core/partition.js),
[promise](blob/master/core/promise.js),
[range](blob/master/core/range.js),
[rest](blob/master/core/rest.js),
[Router](blob/master/core/router.js),
[Sequence](blob/master/core/sequence.js),
[sequence](blob/master/core/sequence.js),
[TickTimer](blob/master/core/tick-timer.js),
[Timer](blob/master/core/timer.js),
[toArray](blob/master/core/to-array.js),
[toPartition](blob/master/core/to-partition.js),
[withoutLast](blob/master/core/without-last.js)

#### Client

[clearContext](blob/master/client/clear-context.js),
[displayViewMixin](blob/master/client/display-view-mixin.js),
[domStr](blob/master/client/dom-str.js),
[JSONSocketConnection](blob/master/client/json-socket-connection.js),
[polyfillRequestAnimationFrame](blob/master/client/polyfill-request-animation-frame.js),
[touchEventViewMixin](blob/master/client/touch-event-view-mixin.js),
[viewportSize](blob/master/client/viewport-size.js),
[wrappedContext](blob/master/client/wrapped-context.js),
[ZIndexStack](blob/master/client/z-index-stack.js),

#### Color

[HSLGradient](blob/master/color/hsl-gradient.js),
[hslToRgb](blob/master/color/hsl-to-rgb.js),
[hsvToRgb](blob/master/color/hsv-to-rgb.js),
[RandomColorSequence](blob/master/color/random-color-sequence.js),
[randomHex](blob/master/color/random-hex.js),
[rgbToHsl](blob/master/color/rgb-to-hsl.js),
[rgbToHsv](blob/master/color/rgb-to-hsv.js)

#### Math

[add](blob/master/math/add.JS),
[angleBetween](blob/master/math/angle-between.JS),
[clamp](blob/master/math/clamp.JS),
[clipNormalized](blob/master/math/clip-normalized.JS),
[colorStringToHex](blob/master/math/color-string-to-hex.JS),
[colorValuesToHex](blob/master/math/color-values-to-hex.JS),
[distance](blob/master/math/distance.JS),
[dynamicEaseInterpolation](blob/master/math/dynamic-ease-interpolation.JS),
[fitScaleRatio](blob/master/math/fit-scale-ratio.JS),
[floatToString](blob/master/math/float-to-string.JS),
[getDynamicallyEasedInterpolation](blob/master/math/get-dynamically-eased-interpolation.JS),
[hexStringToColorArray](blob/master/math/hex-string-to-color-array.JS),
[inRange](blob/master/math/in-range.JS),
[isClose](blob/master/math/is-close.JS),
[lerp](blob/master/math/lerp.JS),
[map](blob/master/math/map.JS),
[MatrixStack](blob/master/math/matrix-stack.JS),
[normalize](blob/master/math/normalize.JS),
[PI](blob/master/math/p-i.JS),
[PI_2](blob/master/math/pi-2.JS),
[randomBetween](blob/master/math/random-between.JS),
[shuffleArray](blob/master/math/shuffle-array.JS),
[wrap](blob/master/math/wrap.JS)

##### Interpolations

[backEaseIn](blob/master/math/interpolations/back-ease-in.js),
[backEaseInOut](blob/master/math/interpolations/back-ease-in-out.js),
[backEaseOut](blob/master/math/interpolations/back-ease-out.js),
[bounceEaseIn](blob/master/math/interpolations/bounce-ease-in.js),
[bounceEaseInOut](blob/master/math/interpolations/bounce-ease-in-out.js),
[bounceEaseOut](blob/master/math/interpolations/bounce-ease-out.js),
[circularEaseIn](blob/master/math/interpolations/circular-ease-in.js),
[circularEaseInOut](blob/master/math/interpolations/circular-ease-in-out.js),
[circularEaseOut](blob/master/math/interpolations/circular-ease-out.js),
[cubicEaseIn](blob/master/math/interpolations/cubic-ease-in.js),
[cubicEaseInOut](blob/master/math/interpolations/cubic-ease-in-out.js),
[cubicEaseOut](blob/master/math/interpolations/cubic-ease-out.js),
[elasticEaseIn](blob/master/math/interpolations/elastic-ease-in.js),
[elasticEaseInOut](blob/master/math/interpolations/elastic-ease-in-out.js),
[elasticEaseOut](blob/master/math/interpolations/elastic-ease-out.js),
[exponentialEaseIn](blob/master/math/interpolations/exponential-ease-in.js),
[exponentialEaseInOut](blob/master/math/interpolations/exponential-ease-in-out.js),
[exponentialEaseOut](blob/master/math/interpolations/exponential-ease-out.js),
[linearInterpolatio](blob/master/math/interpolations/linear-interpolatio.js),
[quadraticEaseIn](blob/master/math/interpolations/quadratic-ease-in.js),
[quadraticEaseInOut](blob/master/math/interpolations/quadratic-ease-in-out.js),
[quadraticEaseOut](blob/master/math/interpolations/quadratic-ease-out.js),
[quarticEaseIn](blob/master/math/interpolations/quartic-ease-in.js),
[quarticEaseInOut](blob/master/math/interpolations/quartic-ease-in-out.js),
[quarticEaseOut](blob/master/math/interpolations/quartic-ease-out.js),
[quinticEaseIn](blob/master/math/interpolations/quintic-ease-in.js),
[quinticEaseInOut](blob/master/math/interpolations/quintic-ease-in-out.js),
[quinticEaseOut](blob/master/math/interpolations/quintic-ease-out.js),
[sineEaseIn](blob/master/math/interpolations/sine-ease-in.js),
[sineEaseInOut](blob/master/math/interpolations/sine-ease-in-out.js),
[sineEaseOut](blob/master/math/interpolations/sine-ease-out.js)

#### Node

[corsMiddleware](blob/master/node/cors-middleware.js),
[cssPrefixerMiddleware](blob/master/node/css-prefixer-middleware.js),
[Geolocate](blob/master/node/geolocate.js),
[jadeMiddleware](blob/master/node/jade-middleware.js),
[jsMiddleware](blob/master/node/js-middleware.js),
[jsMinMiddleware](blob/master/node/js-min-middleware.js),
[JSONSocketConnection](blob/master/node/json-socket-connection.js),
[liveReload](blob/master/node/live-reload.js),
[WebSocketRepeater](blob/master/node/web-socket-repeater.js)

#### Redis

[redisReferrerStorage](blob/master/redis/redis-referrer-storage.js),
[redisSetStorage](blob/master/redis/redis-set-storage.js),
[redisTimeseriesStorage](blob/master/redis/redis-timeseries-storage.js)

#### String

[addCommas](blob/master/string/add-commas.js),
[contains](blob/master/string/contains.js),
[cssGradientString](blob/master/string/css-gradient-string.js),
[endsWith](blob/master/string/ends-with.js),
[hsTld](blob/master/string/hs-tld.js),
[isValidEmailAddress](blob/master/string/is-valid-email-address.js),
[makeRedisKey](blob/master/string/make-redis-key.js),
[startsWith](blob/master/string/starts-with.js),
[trim](blob/master/string/trim.js)

#### Util

[FileListBuilder](blob/master/util/file-list-builder.js)

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
