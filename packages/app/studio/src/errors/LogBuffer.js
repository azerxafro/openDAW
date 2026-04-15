"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogBuffer = void 0;
var LogBuffer;
(function (LogBuffer) {
    var logBuffer = [];
    if (import.meta.env.PROD) {
        var estimatedSize_1 = 0;
        var MAX_ARGS_SIZE_1 = 100000;
        var pushLog_1 = function (level, args) {
            var entry = { time: Date.now(), level: level, args: args.map(String) };
            var argLength = entry.args.length;
            logBuffer.push(entry);
            estimatedSize_1 += argLength;
            while (estimatedSize_1 > MAX_ARGS_SIZE_1 && logBuffer.length > 1) {
                var removed = logBuffer.shift();
                estimatedSize_1 -= removed.args.length;
            }
        };
        var stringifyArg_1 = function (value) {
            try {
                // If it's already a primitive
                if (value === null ||
                    typeof value === "string" ||
                    typeof value === "number" ||
                    typeof value === "boolean" ||
                    typeof value === "bigint" ||
                    typeof value === "symbol" ||
                    typeof value === "undefined") {
                    return String(value);
                }
                // If it has a custom toString implementation
                var protoToString = Object.prototype.toString;
                if (typeof value === "object" &&
                    value &&
                    typeof value.toString === "function" &&
                    value.toString !== protoToString) {
                    var result = value.toString();
                    if (typeof result === "string")
                        return result;
                }
                if (typeof value === "object") {
                    var maxLength = 4000;
                    var json = JSON.stringify(value);
                    return json.length > maxLength ? json.slice(0, maxLength) + "…" : json;
                }
                // Last resort fallback
                return Object.prototype.toString.call(value);
            }
            catch (_a) {
                return "[unserializable]";
            }
        };
        var original_1 = { debug: console.debug, info: console.info, warn: console.warn };
        console.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            pushLog_1("debug", args.map(stringifyArg_1));
            original_1.debug.apply(console, args);
        };
        console.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            pushLog_1("info", args.map(stringifyArg_1));
            original_1.info.apply(console, args);
        };
        console.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            pushLog_1("warn", args.map(stringifyArg_1));
            original_1.warn.apply(console, args);
        };
    }
    LogBuffer.get = function () { return logBuffer; };
})(LogBuffer || (exports.LogBuffer = LogBuffer = {}));
