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
var _ErrorHandler_instances, _ErrorHandler_terminator, _ErrorHandler_buildInfo, _ErrorHandler_recover, _ErrorHandler_errorThrown, _ErrorHandler_looksLikeExtension, _ErrorHandler_extractForeignOrigin, _ErrorHandler_looksLikeMonacoError, _ErrorHandler_tryIgnore, _ErrorHandler_report, _ErrorHandler_showDialog;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var LogBuffer_ts_1 = require("@/errors/LogBuffer.ts");
var ErrorInfo_ts_1 = require("@/errors/ErrorInfo.ts");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var ExtensionPatterns = ["script-src blocked eval", "extension", "chrome-extension://", "blocked by CSP", "Zotero Connector"];
var IgnoredErrors = [
    "ResizeObserver loop completed with undelivered notifications.",
    "Request timeout appSettingsDistributor.getValue",
    "Script error."
];
var BrowserInternalPatterns = ["feature named", "window.__firefox__"];
var MonacoPatterns = ["monaco-editor", "vs/base/common/errors"];
var ThirdPartyAppPatterns = ["_callback_receiveMIDIMessage", "_callback_addSource"];
var UrlPattern = /https?:\/\/[^\s)]+/g;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler(buildInfo, recover) {
        _ErrorHandler_instances.add(this);
        _ErrorHandler_terminator.set(this, new lib_std_1.Terminator());
        _ErrorHandler_buildInfo.set(this, void 0);
        _ErrorHandler_recover.set(this, void 0);
        _ErrorHandler_errorThrown.set(this, false);
        __classPrivateFieldSet(this, _ErrorHandler_buildInfo, buildInfo, "f");
        __classPrivateFieldSet(this, _ErrorHandler_recover, recover, "f");
    }
    ErrorHandler.prototype.processError = function (scope, event) {
        if (__classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_tryIgnore).call(this, event)) {
            return false;
        }
        var error = ErrorInfo_ts_1.ErrorInfo.extract(event);
        var foreignOrigin = __classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_extractForeignOrigin).call(this, error);
        var looksLikeExtension = __classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_looksLikeExtension).call(this, error) || foreignOrigin !== null;
        console.warn("[ErrorHandler]", {
            scope: scope,
            error: error,
            foreignOrigin: foreignOrigin,
            looksLikeExtension: looksLikeExtension,
            scriptsCount: document.scripts.length,
            locationOrigin: window.location.origin
        });
        // Warn about extension errors but don't crash
        if (looksLikeExtension && !__classPrivateFieldGet(this, _ErrorHandler_errorThrown, "f")) {
            event.preventDefault();
            var originInfo = foreignOrigin !== null
                ? "This error originated from external code (".concat(new URL(foreignOrigin).hostname, ").")
                : "A browser extension may have caused an error.";
            dialogs_tsx_1.Dialogs.info({
                headline: "Warning",
                message: "".concat(originInfo, " Consider disabling extensions for a more stable experience.")
            }).then(lib_std_1.EmptyExec);
            return false;
        }
        console.debug("processError", scope, event);
        if (__classPrivateFieldGet(this, _ErrorHandler_errorThrown, "f")) {
            return false;
        }
        __classPrivateFieldSet(this, _ErrorHandler_errorThrown, true, "f");
        lib_dom_1.AnimationFrame.terminate();
        __classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_report).call(this, scope, error);
        __classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_showDialog).call(this, scope, error, looksLikeExtension, foreignOrigin);
        return true;
    };
    ErrorHandler.prototype.install = function (owner, scope) {
        var _this = this;
        if (__classPrivateFieldGet(this, _ErrorHandler_errorThrown, "f")) {
            return lib_std_1.Terminable.Empty;
        }
        var lifetime = __classPrivateFieldGet(this, _ErrorHandler_terminator, "f").own(new lib_std_1.Terminator());
        var handler = function (event) {
            if (_this.processError(scope, event)) {
                lifetime.terminate();
            }
        };
        lifetime.ownAll(lib_dom_1.Events.subscribe(owner, "error", handler), lib_dom_1.Events.subscribe(owner, "unhandledrejection", handler), lib_dom_1.Events.subscribe(owner, "messageerror", handler), lib_dom_1.Events.subscribe(owner, "processorerror", handler), lib_dom_1.Events.subscribe(owner, "securitypolicyviolation", handler));
        return lifetime;
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
_ErrorHandler_terminator = new WeakMap(), _ErrorHandler_buildInfo = new WeakMap(), _ErrorHandler_recover = new WeakMap(), _ErrorHandler_errorThrown = new WeakMap(), _ErrorHandler_instances = new WeakSet(), _ErrorHandler_looksLikeExtension = function _ErrorHandler_looksLikeExtension(error) {
    return document.scripts.length > 1
        || ExtensionPatterns.some(function (pattern) { var _a, _b; return ((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes(pattern)) || ((_b = error.stack) === null || _b === void 0 ? void 0 : _b.includes(pattern)); });
}, _ErrorHandler_extractForeignOrigin = function _ErrorHandler_extractForeignOrigin(error) {
    var _a;
    var stack = error.stack;
    if (stack === undefined) {
        return null;
    }
    var urls = (_a = stack.match(UrlPattern)) !== null && _a !== void 0 ? _a : [];
    var expectedOrigin = window.location.origin;
    for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
        var url = urls_1[_i];
        try {
            var origin_1 = new URL(url).origin;
            if (origin_1 !== expectedOrigin) {
                return origin_1;
            }
        }
        catch ( /* invalid URL */_b) { /* invalid URL */ }
    }
    return null;
}, _ErrorHandler_looksLikeMonacoError = function _ErrorHandler_looksLikeMonacoError(message, stack, filename) {
    var sources = [message, stack, filename].filter(Boolean).join(" ");
    return MonacoPatterns.some(function (pattern) { return sources.includes(pattern); });
}, _ErrorHandler_tryIgnore = function _ErrorHandler_tryIgnore(event) {
    var _a;
    if (event instanceof ErrorEvent && IgnoredErrors.includes(event.message)) {
        console.warn(event.message);
        event.preventDefault();
        return true;
    }
    if (event instanceof ErrorEvent
        && ThirdPartyAppPatterns.some(function (pattern) { return event.message.includes(pattern); })) {
        console.warn("Third-party app error ignored: ".concat(event.message));
        event.preventDefault();
        return true;
    }
    // Handle Monaco editor errors from error events
    // Monaco rethrows worker error Event objects through its error pipeline,
    // arriving as ErrorEvent where event.error is a raw Event (not an Error).
    if (event instanceof ErrorEvent
        && (__classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_looksLikeMonacoError).call(this, event.message, (_a = event.error) === null || _a === void 0 ? void 0 : _a.stack, event.filename)
            || event.error instanceof Event)) {
        console.warn("Monaco editor error:", event.message, event.filename);
        event.preventDefault();
        return true;
    }
    if (event instanceof SecurityPolicyViolationEvent) {
        // Log CSP violations but don't crash - often caused by browser extensions or specific browser configs
        console.warn("CSP violation: ".concat(event.violatedDirective, " blocked ").concat(event.blockedURI));
        event.preventDefault();
        return true;
    }
    if (!(event instanceof PromiseRejectionEvent)) {
        return false;
    }
    var reason = event.reason;
    if (reason instanceof Error && IgnoredErrors.some(function (ignored) { return reason.message.includes(ignored); })) {
        console.warn(reason.message);
        event.preventDefault();
        return true;
    }
    if (lib_std_1.Errors.isAbort(reason)) {
        console.debug("Abort '".concat(reason.message, "'"));
        event.preventDefault();
        return true;
    }
    if (reason instanceof lib_std_1.Errors.Warning) {
        console.debug("Warning '".concat(reason.message, "'"));
        event.preventDefault();
        dialogs_tsx_1.Dialogs.info({ headline: "Warning", message: reason.message }).then(lib_std_1.EmptyExec);
        return true;
    }
    // Handle SecurityError from File System Access API (e.g., showDirectoryPicker denied)
    if (reason instanceof DOMException && reason.name === "SecurityError") {
        console.warn("SecurityError: ".concat(reason.message));
        event.preventDefault();
        dialogs_tsx_1.Dialogs.info({
            headline: "Access Denied",
            message: "The browser blocked access to the file system."
        }).then(lib_std_1.EmptyExec);
        return true;
    }
    // Handle Monaco editor worker errors (throws Event objects when workers fail to load)
    if (reason instanceof Event || (reason instanceof Error && __classPrivateFieldGet(this, _ErrorHandler_instances, "m", _ErrorHandler_looksLikeMonacoError).call(this, reason.message, reason.stack))) {
        console.warn("Monaco editor error (web workers may be unavailable):", reason);
        event.preventDefault();
        return true;
    }
    // Handle Monaco CancellationError (name "Canceled" survives minification unlike stack traces)
    if (reason instanceof Error && reason.name === "Canceled") {
        console.debug("Monaco CancellationError: ".concat(reason.message));
        event.preventDefault();
        return true;
    }
    // Handle browser-internal errors (e.g., DuckDuckGo feature detection)
    if (reason instanceof Error
        && BrowserInternalPatterns.some(function (pattern) { return reason.message.includes(pattern); })) {
        console.debug("Browser internal error: ".concat(reason.message));
        event.preventDefault();
        return true;
    }
    return false;
}, _ErrorHandler_report = function _ErrorHandler_report(scope, error) {
    var _a;
    console.error(scope, error.name, error.message, error.stack);
    if (!import.meta.env.PROD) {
        return;
    }
    var maxStackSize = 2000;
    var body = JSON.stringify({
        date: new Date().toISOString(),
        agent: lib_dom_1.Browser.userAgent,
        build: __classPrivateFieldGet(this, _ErrorHandler_buildInfo, "f"),
        scripts: document.scripts.length,
        error: __assign(__assign({}, error), { stack: (_a = error.stack) === null || _a === void 0 ? void 0 : _a.slice(0, maxStackSize) }),
        logs: LogBuffer_ts_1.LogBuffer.get()
    });
    fetch("https://logs.opendaw.studio/log.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    }).then(console.info, console.warn);
}, _ErrorHandler_showDialog = function _ErrorHandler_showDialog(scope, error, probablyHasExtension, foreignOrigin) {
    var _a;
    if (Surface_tsx_1.Surface.isAvailable()) {
        dialogs_tsx_1.Dialogs.error({
            scope: scope,
            name: error.name,
            message: (_a = error.message) !== null && _a !== void 0 ? _a : "no message",
            probablyHasExtension: probablyHasExtension,
            foreignOrigin: foreignOrigin,
            backupCommand: __classPrivateFieldGet(this, _ErrorHandler_recover, "f").call(this)
        });
    }
    else {
        alert("Boot Error in '".concat(scope, "': ").concat(error.name));
    }
};
