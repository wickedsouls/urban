"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.getInstance = function () {
        if (!Router.instance) {
            Router.instance = express_1["default"].Router();
        }
        return this.instance;
    };
    return Router;
}());
exports.Router = Router;
