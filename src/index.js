"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
require("./controllers/DistrictController");
var utils_1 = require("./utils");
var GeoLocation_1 = require("./services/GeoLocation");
var GoogleProvider_1 = require("./services/GoogleProvider");
dotenv_1["default"].config({ path: path_1["default"].resolve(__dirname + '/../.env') });
var PORT = process.env.PORT || 3000;
var API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.log('Missing API_KEY');
    process.exit();
}
var app = express_1["default"]();
// Load data from file and assign GeoLocation Provider
exports.geoLocation = new GeoLocation_1.GeoLocation('formatted-districts.json', new GoogleProvider_1.GoogleProvider(API_KEY));
exports.geoLocation.loadData();
// Setup express
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(utils_1.Router.getInstance());
console.log('envs', API_KEY, PORT);
// Start app
app.listen(PORT, function () {
    console.log("App is running on port " + PORT);
});
