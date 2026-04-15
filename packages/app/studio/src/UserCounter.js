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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UserCounter_instances, _UserCounter_sessionId, _UserCounter_apiUrl, _UserCounter_notifier, _UserCounter_sendHeartbeat;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCounter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var UserCounter = /** @class */ (function () {
    function UserCounter(apiUrl) {
        _UserCounter_instances.add(this);
        _UserCounter_sessionId.set(this, void 0);
        _UserCounter_apiUrl.set(this, void 0);
        _UserCounter_notifier.set(this, new lib_std_1.Notifier());
        __classPrivateFieldSet(this, _UserCounter_sessionId, lib_dom_1.Browser.id(), "f");
        __classPrivateFieldSet(this, _UserCounter_apiUrl, apiUrl, "f");
        __classPrivateFieldGet(this, _UserCounter_instances, "m", _UserCounter_sendHeartbeat).call(this).finally();
    }
    UserCounter.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _UserCounter_notifier, "f").subscribe(observer); };
    return UserCounter;
}());
exports.UserCounter = UserCounter;
_UserCounter_sessionId = new WeakMap(), _UserCounter_apiUrl = new WeakMap(), _UserCounter_notifier = new WeakMap(), _UserCounter_instances = new WeakSet(), _UserCounter_sendHeartbeat = function _UserCounter_sendHeartbeat() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, fetch(__classPrivateFieldGet(this, _UserCounter_apiUrl, "f"), {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ sessionId: __classPrivateFieldGet(this, _UserCounter_sessionId, "f") })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    __classPrivateFieldGet(this, _UserCounter_notifier, "f").notify(data.count);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.warn("Failed to send heartbeat:", error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setTimeout(function () { return __classPrivateFieldGet(_this, _UserCounter_instances, "m", _UserCounter_sendHeartbeat).call(_this); }, 60000);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
};
