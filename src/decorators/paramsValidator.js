"use strict";
exports.__esModule = true;
require("reflect-metadata");
var utils_1 = require("../utils");
exports.ValidateParams = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key) {
        Reflect.defineMetadata(utils_1.Metadata.validator, keys, target, key);
    };
};
