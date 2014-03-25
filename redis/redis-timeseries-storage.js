// Stores counts of a list of values.
// 
// Keys are stored at the following resolution:
// 
// * minutes for the 120 minutes
// * hours for the 120 hours
// * days for the last 120 days
// * weeks for the last 120 weeks
// 
// The storage is time independant in that key counts are not expressed in "from date" and "to date" but "from time ago" to "time ago". This avoid server and request time differences.
// 
// Next idea.... set up caching, so that once a day has pass, the minutes are stored in a cache of arrays.

// ## Config

var MAX_KEYS = 120;

// ## Time Utilites

// Reference date.
var EPOCH = 1379425660487;

// Seconds.
var SECS_PER_MIN = 60;
var SECS_PER_HOUR = 60 * SECS_PER_MIN;
var SECS_PER_DAY = 24 * SECS_PER_HOUR;
var SECS_PER_WEEK = 7 * SECS_PER_DAY;
// Milliseconds.
var MS_PER_SEC = 1000;
var MS_PER_MIN = SECS_PER_MIN * MS_PER_SEC;
var MS_PER_HOUR = SECS_PER_HOUR * MS_PER_SEC;
var MS_PER_DAY = SECS_PER_DAY * MS_PER_SEC;
var MS_PER_WEEK = SECS_PER_WEEK * MS_PER_SEC;

function getMinutesSinceEpoch () {
    return Math.floor( (Date.now() - EPOCH) / MS_PER_MIN );
}

function getHoursSinceEpoch () {
    return Math.floor( (Date.now() - EPOCH) / MS_PER_HOUR );
}

function getDaysSinceEpoch () {
    return Math.floor( (Date.now() - EPOCH) / MS_PER_DAY );
}

function getWeeksSinceEpoch () {
    return Math.floor( (Date.now() - EPOCH) / MS_PER_WEEK );
}

// ## Redis incrementors

// Main function to increment a key.
function increment(redisClient, amount, keyPrepend, key, callback) {

    if (typeof amount !== 'number') {
        callback("increment amount is not number");
        return;
    }

    var multi = redisClient.multi();

    // Chain each redis command.
    incrementMinute(multi, amount, keyPrepend, key);
    incrementHour(multi, amount, keyPrepend, key);
    incrementDays(multi, amount, keyPrepend, key);
    incrementWeeks(multi, amount, keyPrepend, key);

    // Do it
    multi.exec(callback);

}

function incrementMinute(redisMutli, amount, keyPrepend, key) {
    var fullKey = keyPrepend+"m:"+getMinutesSinceEpoch()+":"+key;
    if (amount === 1) { redisMutli.incr( fullKey ); } 
    else { redisMutli.incrby( fullKey, amount ); }
    redisMutli.expire( fullKey, SECS_PER_MIN * MAX_KEYS );
}

function incrementHour(redisMutli, amount, keyPrepend, key) {
    var fullKey = keyPrepend+"h:"+getHoursSinceEpoch()+":"+key;
    if (amount === 1) { redisMutli.incr( fullKey ); } 
    else { redisMutli.incrby( fullKey, amount ); }
    redisMutli.expire( fullKey, SECS_PER_HOUR * MAX_KEYS );
}

function incrementDays(redisMutli, amount, keyPrepend, key) {
    var fullKey = keyPrepend+"d:"+getDaysSinceEpoch()+":"+key;
    if (amount === 1) { redisMutli.incr( fullKey ); } 
    else { redisMutli.incrby( fullKey, amount ); }
    redisMutli.expire( fullKey, SECS_PER_DAY * MAX_KEYS );
}

function incrementWeeks(redisMutli, amount, keyPrepend, key) {
    var fullKey = keyPrepend+"w:"+getWeeksSinceEpoch()+":"+key;
    if (amount === 1) { redisMutli.incr( fullKey ); } 
    else { redisMutli.incrby( fullKey, amount ); }
    redisMutli.expire( fullKey, SECS_PER_WEEK * MAX_KEYS );
}

// ## Redis getters

function countMinutes(redisClient,  keyPrepend, key, callback) {
    var multi = redisClient.multi();
    var currentTimeKey = getMinutesSinceEpoch();
    for (var i = currentTimeKey; i > currentTimeKey-MAX_KEYS; --i ) {
        multi.get(keyPrepend+"m:"+i+":"+key);
    }
    multi.exec(callback);
}

function countHours(redisClient,  keyPrepend, key, callback) {
    var multi = redisClient.multi();
    var currentTimeKey = getHoursSinceEpoch();
    for (var i = currentTimeKey; i > currentTimeKey-MAX_KEYS; --i ) {
        multi.get(keyPrepend+"h:"+i+":"+key);
    }
    multi.exec(callback);
}

function countDays(redisClient,  keyPrepend, key, callback) {
    var multi = redisClient.multi();
    var currentTimeKey = getDaysSinceEpoch();
    for (var i = currentTimeKey; i > currentTimeKey-MAX_KEYS; --i ) {
        multi.get(keyPrepend+"d:"+i+":"+key);
    }
    multi.exec(callback);
}

function countWeeks(redisClient,  keyPrepend, key, callback) {
    var multi = redisClient.multi();
    var currentTimeKey = getWeeksSinceEpoch();
    for (var i = currentTimeKey; i > currentTimeKey-MAX_KEYS; --i ) {
        multi.get(keyPrepend+"w:"+i+":"+key);
    }
    multi.exec(callback);
}

// ## RedisTimeseriesStorage

// Constructor.

function RedisTimeseriesStorage (options) {
    this.redisClient = options.redisClient;
    this.keyPrepend = "js:tss:";
    if (options.key) {
        this.keyPrepend += options.key+":";
    }
}

// resolutions

RedisTimeseriesStorage.RES_MINUTE   = "minute";
RedisTimeseriesStorage.RES_HOUR     = "hour";
RedisTimeseriesStorage.RES_DAY      = "day";
RedisTimeseriesStorage.RES_WEEK     = "week";

RedisTimeseriesStorage.prototype.increment = function (key, callback) {
    key = key.toLowerCase();
    increment(this.redisClient, 1, this.keyPrepend, key, callback);
};

RedisTimeseriesStorage.prototype.incrementBy = function (key, amount, callback) {
    key = key.toLowerCase();
    increment(this.redisClient, amount, this.keyPrepend, key, callback);
};

RedisTimeseriesStorage.prototype.count = function (key, resolution, callback) {
    key = key.toLowerCase();
    switch (resolution) {
        case RedisTimeseriesStorage.RES_MINUTE:
            countMinutes(this.redisClient, this.keyPrepend, key, callback);
            break;
        case RedisTimeseriesStorage.RES_HOUR:
            countHours(this.redisClient, this.keyPrepend, key, callback);
            break;
        case RedisTimeseriesStorage.RES_DAY:
            countDays(this.redisClient, this.keyPrepend, key, callback);
            break;
        case RedisTimeseriesStorage.RES_WEEK:
            countWeeks(this.redisClient, this.keyPrepend, key, callback);
            break;
        default:
            callback("RedisTimeseriesStorage::count Error: no resolution provided");
            break;
    }
};

// ## Export

module.exports = RedisTimeseriesStorage;

