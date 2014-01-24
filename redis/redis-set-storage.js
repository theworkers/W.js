function RedisSetStorage(options) {
    this.redisClient = options.redisClient;
    this.key = options.key;
    this.keyPrepend = "js:ls:";

    var self = this;

    // Middleware for connect.js/express.js
    this.middleware = {
        // Returns a JSON list of all the items
        get : function (req, res) {
            self.getItems(function (err, result) {
                if (!err) {
                    res.json( result );
                } else {
                    res.json(500, { error: err });
                }
            });
        },
        // Expects an JSON object in the request with an array of items called `items`.
        delete : function (req, res) {
            // Add items
            if (req.body.items instanceof Array) {
                self.removeItems(req.body.items, function (err, result) {
                    if (!err) {
                        res.json( result );
                    } else {
                        res.json(500, { error: err });
                    }
                });
            } else {
                res.json(500, { error: "No `items` array in request body" });
            }
        },
        // Expects an JSON object in the request with  an array of items called `items`.
        add : function (req, res) {
            // Add items
            if (req.body.items instanceof Array) {
                self.addItems(req.body.items, function (err, result) {
                    if (!err) {
                        res.json( result );
                    } else {
                        res.json(500, { error: err });
                    }
                });
            } else {
                res.json(500, { error: "No `items` array in request body" });
            }
        }
    };

}

RedisSetStorage.prototype.addItems = function (arr, callback) {
    this.redisClient.sadd(this.keyPrepend+this.key, arr, callback);
};

RedisSetStorage.prototype.removeItems = function (arr, callback) {
    this.redisClient.srem(this.keyPrepend+this.key, arr, callback);
};

RedisSetStorage.prototype.getItems = function (callback) {
    this.redisClient.smembers(this.keyPrepend+this.key, callback);
};

RedisSetStorage.prototype.hasItem = function (item, callback) {
    this.redisClient.sismember(this.keyPrepend+this.key, item, callback);
};

module.exports = RedisSetStorage;