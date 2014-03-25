# W.js Version 4

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