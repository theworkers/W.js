# W.js Version 4

A snippets repository and welterweight library used by [The Workers](http:://theworkers.net) maintained by [Ross Cairns](http://rosscairns.com/).

[The Workers](http:://theworkers.net) are a creative coding studio in East London. 

Used on projects such as:

* [Where You Are](http://where-you-are.com/)
* [o/o/o/o](http://o-o-o-o.co.uk/)

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
* `*.test.client js` are run client only, provided test is added to test.html
* `*.test.client js` are run node only

## Node and Redis modules

Include with, for example:

    var Geolocate = W.Geolocate();