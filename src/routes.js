"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var busStopController_1 = __importDefault(require("./controller/busStopController"));
//index, show, create, update, delete
var routes = express_1.default.Router();
var busStopController = new busStopController_1.default();
routes.get('/', function (req, res) {
    res.send("<h1> yellouwwwwwww </h1>");
});
routes.get("/stoptimes", function (req, res) {
    if (!req.query.stop) {
        req.query.stop = "ARRB3";
    }
    busStopController.show(req, res);
});
routes.get("/lines", function (req, res) {
    busStopController.getLinhas(req, res);
});
routes.get("/lines/dir", function (req, res) {
    busStopController.getLinhasDir(req, res);
});
routes.get("/stops", function (req, res) {
    busStopController.stopLists(req, res);
});
exports.default = routes;
