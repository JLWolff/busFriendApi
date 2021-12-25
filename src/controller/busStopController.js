"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var cheerio = require("cheerio");
var BusPointController = /** @class */ (function () {
    function BusPointController() {
    }
    BusPointController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var stop, url, data, $, element, arrParams, hashCode, linha, url2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stop = req.query.stop;
                        url = "https://www.stcp.pt/pt/viajar/horarios/?paragem=" + stop + "&t=smsbus";
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        data = (_a.sent()).data;
                        $ = cheerio.load(data);
                        element = new String($("body > div.divGeralContent > div.divContentCenter > div.divContentBorder > div.divmiddleContent > div.content-padding > table > tbody > tr > td > script"));
                        arrParams = element.slice(element.indexOf("(") + 1, element.indexOf(")")).split(",");
                        hashCode = arrParams[arrParams.length - 1].slice(1, arrParams[arrParams.length - 1].length - 1);
                        linha = arrParams[0].slice(1, arrParams[0].length - 1);
                        url2 = "https://www.stcp.pt/pt/itinerarium/soapclient.php?codigo=" + linha + "&linha=0&hash123=" + hashCode;
                        axios.get(url2).then(function (resp) {
                            var pageCode = cheerio.load(resp.data);
                            var obj = [];
                            var times = pageCode("#smsBusResults .even");
                            for (var i = 0; i < times.length; i++) {
                                var name_1 = pageCode(pageCode(times[i]).find('td')[0]).text();
                                var filtered = name_1.replace(/(\r\n|\n|\r|\t)/gm, "");
                                var indexForSplit = filtered.indexOf(" ");
                                var line = filtered.slice(0, indexForSplit).trim();
                                var dir = filtered.slice(indexForSplit).trim();
                                var estHour = pageCode(pageCode(times[i]).find('td')[1]).text();
                                var timeUntil = pageCode(pageCode(times[i]).find('td')[2]).text();
                                var data_1 = {
                                    line: line,
                                    dir: dir,
                                    estHour: estHour,
                                    timeUntil: timeUntil
                                };
                                obj.push(data_1);
                            }
                            res.json(obj);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BusPointController.prototype.stopLists = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var line, dir, url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        line = req.query.line;
                        dir = req.query.dir;
                        url = "https://www.stcp.pt/pt/itinerarium/callservice.php?action=linestops&lcode=" + line + "&ldir=" + dir;
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        data = (_a.sent()).data;
                        res.json(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    BusPointController.prototype.getLinhas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://www.stcp.pt/pt/itinerarium/callservice.php?action=lineslist&service=1&madrugada=0";
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        data = (_a.sent()).data;
                        res.json(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    BusPointController.prototype.getLinhasDir = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var line, url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        line = req.query.line;
                        url = "https://www.stcp.pt/pt/itinerarium/callservice.php?action=linedirslist&lcode=" + line;
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        data = (_a.sent()).data;
                        res.json(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    return BusPointController;
}());
exports.default = BusPointController;
