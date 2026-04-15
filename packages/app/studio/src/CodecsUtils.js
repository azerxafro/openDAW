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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.CodecsUtils = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var CodecsUtils;
(function (CodecsUtils) {
    var _this = this;
    CodecsUtils.listSupportedCodecs = function () { return __awaiter(_this, void 0, void 0, function () {
        var dialog, _a, status, mediabunny, error, getEncodableAudioCodecs, getEncodableVideoCodecs, _b, audioCodecs, videoCodecs, audioList, videoList;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Loading mediabunny..." });
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(Promise.resolve().then(function () { return require("mediabunny"); }))];
                case 1:
                    _a = _c.sent(), status = _a.status, mediabunny = _a.value, error = _a.error;
                    dialog.terminate();
                    if (!(status === "rejected")) return [3 /*break*/, 3];
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                            headline: "Error",
                            message: "Could not load mediabunny: ".concat(String(error))
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
                case 3:
                    getEncodableAudioCodecs = mediabunny.getEncodableAudioCodecs, getEncodableVideoCodecs = mediabunny.getEncodableVideoCodecs;
                    return [4 /*yield*/, Promise.all([
                            getEncodableAudioCodecs(),
                            getEncodableVideoCodecs()
                        ])];
                case 4:
                    _b = _c.sent(), audioCodecs = _b[0], videoCodecs = _b[1];
                    audioList = audioCodecs.length > 0
                        ? audioCodecs.join(", ")
                        : "(none)";
                    videoList = videoCodecs.length > 0
                        ? videoCodecs.join(", ")
                        : "(none)";
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                            headline: "Supported Codecs (Encoding)",
                            message: "Audio:\n".concat(audioList, "\n\nVideo:\n").concat(videoList)
                        })];
                case 5:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); };
})(CodecsUtils || (exports.CodecsUtils = CodecsUtils = {}));
