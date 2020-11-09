"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var point_in_polygon_1 = require("point-in-polygon");
var GeoLocation = /** @class */ (function () {
    function GeoLocation(fileName, provider) {
        var _this = this;
        this.fileName = fileName;
        this.provider = provider;
        this.findLocation = function (address) { return _this.provider.findLocation(address); };
    }
    GeoLocation.prototype.loadData = function () {
        var data = fs_1["default"].readFileSync(path_1["default"].resolve(__dirname + '/../../' + this.fileName), 'utf-8');
        this.data = JSON.parse(data);
    };
    GeoLocation.prototype.findDistrict = function (coordinate) {
        var _a;
        // Look for polygon
        var match = false;
        (_a = this.data) === null || _a === void 0 ? void 0 : _a.features.forEach(function (feature) {
            if (point_in_polygon_1["default"]([coordinate[1], coordinate[0]], feature.geometry.coordinates[0])) {
                match = true;
            }
        });
        return match;
    };
    return GeoLocation;
}());
exports.GeoLocation = GeoLocation;
