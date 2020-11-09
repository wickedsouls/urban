"use strict";
exports.__esModule = true;
exports.validateParams = function (keys) { return function (req, res, next) {
    var errors = [];
    keys.forEach(function (key) {
        if (!req.query.hasOwnProperty(key)) {
            errors.push(key);
        }
    });
    if (errors.length > 0)
        return res.status(422).send("Missing values: " + errors.join(','));
    next();
}; };
