"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("reflect-metadata");
var utils_1 = require("../utils/");
exports.Controller = function (prefix) {
    var router = utils_1.Router.getInstance();
    var middlewares = [];
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata(utils_1.Metadata.path, target.prototype, key);
            var method = Reflect.getMetadata(utils_1.Metadata.method, target.prototype, key);
            var params = Reflect.getMetadata(utils_1.Metadata.validator, target.prototype, key);
            if (params)
                middlewares.push(utils_1.validateParams(params));
            var middleware = Reflect.getMetadata(utils_1.Metadata.use, target.prototype, key);
            if (middleware)
                middlewares.push(middleware);
            if (path) {
                router[method].apply(router, __spreadArrays([prefix + path], middlewares, [target.prototype[key]]));
            }
        }
    };
};
