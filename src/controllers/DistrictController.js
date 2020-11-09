"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var decorators_1 = require("../decorators");
var __1 = require("..");
var RedisServer_1 = require("../services/RedisServer");
exports.redisServer = new RedisServer_1.RedisServer('redis://127.0.0.1:6379');
var DistrictController = /** @class */ (function () {
    function DistrictController() {
    }
    DistrictController.prototype.getDistrict = function (req, res) {
        var address = req.query.address;
        __1.geoLocation.findLocation(address).then(function (location) {
            var lat = location.lat, lng = location.lng;
            var foundDistrict = __1.geoLocation.findDistrict([lat, lng]);
            if (foundDistrict) {
                var response = {
                    status: "OK",
                    search: address,
                    location: location
                };
                exports.redisServer.saveToCache(address, response);
                return res.json(response);
            }
            else {
                var response = {
                    status: "NOT_FOUND",
                    search: "Non-existing address"
                };
                exports.redisServer.saveToCache(address, response);
                return res.json();
            }
        })["catch"](function () {
            return res.status(400).send('Unable to get coordinates');
        });
    };
    __decorate([
        decorators_1.Get('/district'),
        decorators_1.Use(exports.redisServer.serveFromCache),
        decorators_1.ValidateParams('address')
    ], DistrictController.prototype, "getDistrict");
    DistrictController = __decorate([
        decorators_1.Controller('/api')
    ], DistrictController);
    return DistrictController;
}());
