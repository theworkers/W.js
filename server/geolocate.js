// # Geolocate
// Geolocates incoming requests and emits them as an event
// 
// Geolocation is provided by http://freegeoip.net which 
// is a free sevice rate limited to 10,000 queries per hour 
// or 166 per minute or 2.7 per second

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var superagent = require('superagent');

/**
{
    "areacode": "",
    "city": "London",
    "country_code": "GB",
    "country_name": "United Kingdom",
    "ip": "5.65.148.167",
    "latitude": 51.5142,
    "longitude": -0.0931,
    "metro_code": "",
    "region_code": "H9",
    "region_name": "London, City of",
    "zipcode": ""
}
*/

function Geolocate () {
    this.api = "http://freegeoip.net/json/";
    this.lastRequest = 0;
    this.rateLimit = 0.5;
}

Geolocate.prototype.getUrl = function ( ipaddress ) {
    return this.api + ipaddress;
};

// Get the the location from an ip address
Geolocate.prototype.locationFromIpAddress = function  ( ipAddress, callback ) {
    var self = this;

    var now = Date.now();

    // Rate limit
    if ( now - this.lastRequest > this.rateLimit ) {
        this.lastRequest = now;
        
        superagent.get( this.getUrl(ipAddress), function (err, res) {
            if (err) {
                callback( err );
                return;
            } 
            if (typeof res.body === 'undefined') {
                callback( "Geolocate error: no body in responce from " + self.api );
                return;
            }
            callback( err, res.body );
        });

    } else {
        callback( Geolocate.ERROR_RATE_LIMITED );
    }

};

// Gets the ipaddress from a request. Is rate limited.
Geolocate.prototype.locationFromReq = function ( req, callback ) {
    this.locationFromIpAddress( this.ipaddressFromRequest(req), callback );   
};

// #Static

Geolocate.ERROR_RATE_LIMITED = "Geolocate error: rate limited";

// Gets the ip address out of a node request
Geolocate.ipaddressFromRequest = function ( req ) {

    if (req.headers['X-Forwarded-For']) return req.headers['X-Forwarded-For'];
    if (req.connection.remoteAddress) return req.connection.remoteAddress;
    if (req.ip) return req.ip;
    if (req._remoteAddress) return req._remoteAddress;
    var sock = req.socket;
    if (sock.socket) return sock.socket.remoteAddress;
    return sock.remoteAddress;
};

module.exports = Geolocate;