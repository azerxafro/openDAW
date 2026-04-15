"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioDevices = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var dialogs_1 = require("@/ui/components/dialogs");
var AudioDevices = /** @class */ (function () {
    function AudioDevices() {
    }
    AudioDevices.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                if (__classPrivateFieldGet(this, _a, "f", _AudioDevices_granted).isEmpty()) {
                    __classPrivateFieldSet(this, _a, lib_std_1.Option.wrap(__classPrivateFieldGet(this, _a, "m", _AudioDevices_request).call(this).catch(function (reason) {
                        console.warn("Could not get permission to use microphone / audio devices.");
                        __classPrivateFieldSet(_this, _a, lib_std_1.Option.None, "f", _AudioDevices_granted);
                        throw reason;
                    })), "f", _AudioDevices_granted);
                }
                return [2 /*return*/, __classPrivateFieldGet(this, _a, "f", _AudioDevices_granted).unwrap().then(function () { return query(navigator.mediaDevices); })];
            });
        });
    };
    AudioDevices.queryListInputDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.query(__classPrivateFieldGet(this, _a, "f", _AudioDevices_queryEnumerateDevices).call(this, "audioinput"))];
            });
        });
    };
    AudioDevices.queryListOutputDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.query(__classPrivateFieldGet(this, _a, "f", _AudioDevices_queryEnumerateDevices).call(this, "audiooutput"))];
            });
        });
    };
    AudioDevices.queryAudioInputDeviceStream = function (sampleRate_1, deviceId_1) {
        return __awaiter(this, arguments, void 0, function (sampleRate, deviceId, channelCount) {
            if (channelCount === void 0) { channelCount = 2; }
            return __generator(this, function (_b) {
                console.debug("requestAudioInputDevice deviceId: ".concat(deviceId !== null && deviceId !== void 0 ? deviceId : "default", ", channelCount: ").concat(channelCount));
                return [2 /*return*/, this.query(function (mediaDevices) { return mediaDevices.getUserMedia({
                        audio: __assign(__assign({}, __classPrivateFieldGet(_a, _a, "m", _AudioDevices_DefaultMediaTrackConstraints).call(_a, sampleRate)), { channelCount: channelCount, deviceId: deviceId })
                    }); })];
            });
        });
    };
    var _a, _AudioDevices_granted, _AudioDevices_request, _AudioDevices_DefaultMediaTrackConstraints, _AudioDevices_queryPermissions, _AudioDevices_getUserMedia, _AudioDevices_queryEnumerateDevices;
    _a = AudioDevices, _AudioDevices_request = function _AudioDevices_request() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.debug("Requesting permission to use microphone / audio devices...");
                        return [4 /*yield*/, __classPrivateFieldGet(this, _a, "m", _AudioDevices_queryPermissions).call(this)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, Promise.reject("Permission denied")];
                        }
                        return [4 /*yield*/, __classPrivateFieldGet(this, _a, "m", _AudioDevices_getUserMedia).call(this)];
                    case 2:
                        if (!(_b.sent())) {
                            return [2 /*return*/, Promise.reject("Permission to getUserMedia denied")];
                        }
                        console.debug("Granted permission to use microphone / audio devices.");
                        return [2 /*return*/];
                }
            });
        });
    }, _AudioDevices_DefaultMediaTrackConstraints = function _AudioDevices_DefaultMediaTrackConstraints(sampleRate) {
        if (sampleRate === void 0) { sampleRate = 48000; }
        return Object.freeze({
            sampleRate: sampleRate,
            sampleSize: 32,
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
        });
    }, _AudioDevices_queryPermissions = function _AudioDevices_queryPermissions() {
        return __awaiter(this, void 0, void 0, function () {
            var headline, _b, status, permissionState, error, buttons;
            var _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        headline = "Permission Api";
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(navigator.permissions.query({ name: "microphone" }))];
                    case 1:
                        _b = _f.sent(), status = _b.status, permissionState = _b.value, error = _b.error;
                        if (!(status === "rejected")) return [3 /*break*/, 3];
                        return [4 /*yield*/, dialogs_1.Dialogs.info({ headline: headline, message: String(error) })];
                    case 2: return [2 /*return*/, (_c = _f.sent()) !== null && _c !== void 0 ? _c : false];
                    case 3:
                        console.debug("Permission state(".concat(permissionState.name, "): ").concat(permissionState.state));
                        if (permissionState.state === "granted") {
                            return [2 /*return*/, true];
                        }
                        buttons = [{
                                text: "Help",
                                primary: false,
                                onClick: function () { return window.open("/manuals/permissions", "_blank"); }
                            }, {
                                text: "Cancel",
                                primary: false,
                                onClick: function (handler) { return handler.close(); }
                            }];
                        if (!(permissionState.state === "denied")) return [3 /*break*/, 5];
                        return [4 /*yield*/, dialogs_1.Dialogs.info({
                                headline: headline,
                                message: "Permissions to accept 'microphone / audio devices' has been denied.",
                                buttons: buttons
                            })];
                    case 4: return [2 /*return*/, (_d = _f.sent()) !== null && _d !== void 0 ? _d : false];
                    case 5:
                        if (!(permissionState.state === "prompt")) return [3 /*break*/, 7];
                        return [4 /*yield*/, dialogs_1.Dialogs.info({
                                headline: headline,
                                message: "Your browser will now ask to request access to use your 'microphone / audio devices'.",
                                buttons: buttons,
                                okText: "Request"
                            })];
                    case 6: return [2 /*return*/, (_e = _f.sent()) !== null && _e !== void 0 ? _e : true];
                    case 7: return [2 /*return*/, true];
                }
            });
        });
    }, _AudioDevices_getUserMedia = function _AudioDevices_getUserMedia() {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(navigator.mediaDevices
                            .getUserMedia({ audio: __classPrivateFieldGet(this, _a, "m", _AudioDevices_DefaultMediaTrackConstraints).call(this) })
                            .then(function (stream) { return stream.getTracks().forEach(function (track) { return track.stop(); }); }))];
                    case 1:
                        status = (_b.sent()).status;
                        return [2 /*return*/, status === "resolved"];
                }
            });
        });
    };
    _AudioDevices_granted = { value: lib_std_1.Option.None };
    _AudioDevices_queryEnumerateDevices = { value: function (kind) {
            return function (mediaDevices) { return mediaDevices.enumerateDevices()
                .then(function (devices) { return devices.filter(function (device) { return device.kind === kind && device.deviceId !== ""; }); })
                .then(function (devices) { return devices.length > 0 ? devices : (0, lib_std_1.panic)("Could not list devices"); }); };
        } };
    return AudioDevices;
}());
exports.AudioDevices = AudioDevices;
