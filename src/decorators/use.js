"use strict";
exports.__esModule = true;
require("reflect-metadata");
var utils_1 = require("../utils");
exports.Use = function (middleware) {
    return function (target, key) {
        Reflect.defineMetadata(utils_1.Metadata.use, middleware, target, key);
    };
};
