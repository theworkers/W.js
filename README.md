# W.js Version 4

A welterweight library and snippets repository used by [The Workers](http:://theworkers.net) a creative coding studio in East London. Maintained by [Ross Cairns](http://rosscairns.com/)

Used on projects such as:

* [Where You Are](http://where-you-are.com/)
* [o/o/o/o](http://o-o-o-o.co.uk/)

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