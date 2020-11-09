"use strict";
exports.__esModule = true;
require("reflect-metadata");
var utils_1 = require("../utils");
exports.routeBinder = function (method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata(utils_1.Metadata.path, path, target, key);
            Reflect.defineMetadata(utils_1.Metadata.method, method, target, key);
        };
    };
};
exports.Get = exports.routeBinder(utils_1.Methods.get);
exports.Post = exports.routeBinder(utils_1.Methods.post);
exports.Del = exports.routeBinder(utils_1.Methods["delete"]);
exports.Put = exports.routeBinder(utils_1.Methods.put);
