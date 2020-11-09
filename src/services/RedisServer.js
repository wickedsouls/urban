"use strict";
exports.__esModule = true;
var redis_1 = require("redis");
var RedisServer = /** @class */ (function () {
    function RedisServer(url) {
        var _this = this;
        this.url = url;
        this.serveFromCache = function (req, res, next) {
            var address = req.query.address;
            _this.client.get(address, function (err, location) {
                if (location) {
                    console.log('Serving from cache');
                    return res.json(JSON.parse(location));
                }
                next();
            });
        };
        this.client = redis_1["default"].createClient(url);
    }
    RedisServer.prototype.saveToCache = function (search, location) {
        this.client.set(search, JSON.stringify(location), function () {
            console.log('Saved to cache');
        });
    };
    return RedisServer;
}());
exports.RedisServer = RedisServer;
