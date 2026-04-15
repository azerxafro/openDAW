"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInfo = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ErrorInfo;
(function (ErrorInfo) {
    var fromError = function (error, fallbackName) {
        if (fallbackName === void 0) { fallbackName = "Error"; }
        return ({
            name: error.name || fallbackName,
            message: error.message,
            stack: error.stack
        });
    };
    var fromUnknown = function (value, name) {
        var _a, _b;
        if (value instanceof Error) {
            var error = fromError(value, name);
            // Add constructor name if it's a custom error class
            var ctorName = (_a = value.constructor) === null || _a === void 0 ? void 0 : _a.name;
            if (ctorName && ctorName !== "Error" && ctorName !== value.name) {
                error.message = "[".concat(ctorName, "] ").concat(error.message);
            }
            return error;
        }
        // Capture synthetic stack for non-Error rejections to help locate the source
        var syntheticStack = (_b = new Error().stack) === null || _b === void 0 ? void 0 : _b.split("\n").slice(3).join("\n");
        var internalType = Object.prototype.toString.call(value);
        var message;
        if (value === undefined) {
            message = "(rejected with undefined)";
        }
        else if (value === null) {
            message = "(rejected with null)";
        }
        else if (typeof value === "string") {
            message = value;
        }
        else if (typeof value === "object") {
            // Try to extract useful info from error-like objects
            var obj = value;
            var keys = Object.keys(obj).slice(0, 10);
            var parts = ["".concat(internalType)];
            if ("message" in obj) {
                parts.push("message: ".concat(obj.message));
            }
            if ("code" in obj) {
                parts.push("code: ".concat(obj.code));
            }
            if ("name" in obj) {
                parts.push("name: ".concat(obj.name));
            }
            if ("reason" in obj) {
                parts.push("reason: ".concat(obj.reason));
            }
            if (keys.length > 0) {
                parts.push("keys: [".concat(keys.join(", "), "]"));
            }
            try {
                var json = JSON.stringify(value);
                if (json.length < 200) {
                    parts.push(json);
                }
            }
            catch ( /* unserializable */_c) { /* unserializable */ }
            message = parts.join(" | ");
        }
        else {
            message = "(".concat(typeof value, ") ").concat(String(value));
        }
        return { name: name, message: message, stack: syntheticStack };
    };
    ErrorInfo.extract = function (event) {
        if (event instanceof ErrorEvent) {
            if (event.error instanceof Error) {
                return fromError(event.error);
            }
            return {
                name: "Error",
                message: event.message || undefined,
                stack: (0, lib_std_1.isDefined)(event.filename) ? "at ".concat(event.filename, ":").concat(event.lineno, ":").concat(event.colno) : undefined
            };
        }
        if (event instanceof PromiseRejectionEvent) {
            return fromUnknown(event.reason, "UnhandledRejection");
        }
        // Fallback for cross-realm PromiseRejectionEvent (e.g., from extensions)
        if (event.type === "unhandledrejection" && "reason" in event) {
            return fromUnknown(event.reason, "UnhandledRejection");
        }
        if (event instanceof MessageEvent) {
            return fromUnknown(event.data, "MessageError");
        }
        if (event instanceof SecurityPolicyViolationEvent) {
            return { name: "SecurityPolicyViolation", message: "".concat(event.violatedDirective, " blocked ").concat(event.blockedURI) };
        }
        // Media element errors (audio/video)
        var target = event.target;
        if (target instanceof HTMLMediaElement && (0, lib_std_1.isDefined)(target.error)) {
            return { name: "MediaError", message: target.error.message || "code ".concat(target.error.code) };
        }
        // AudioWorklet processorerror - no error details exposed by spec
        if (event.type === "processorerror") {
            return { name: "ProcessorError", message: "AudioWorklet threw an exception (check console)" };
        }
        // Fallback: capture event type and target
        var tagName = target instanceof Element ? target.tagName.toLowerCase() : null;
        return {
            name: "UnknownError",
            message: tagName !== null ? "".concat(event.type, " on <").concat(tagName, ">") : event.type
        };
    };
})(ErrorInfo || (exports.ErrorInfo = ErrorInfo = {}));
