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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialogs = void 0;
var Dialog_tsx_1 = require("@/ui/components/Dialog.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var BoxDebugView_1 = require("./BoxDebugView");
var BoxesDebugView_tsx_1 = require("@/ui/components/BoxesDebugView.tsx");
var ProgressBar_tsx_1 = require("@/ui/components/ProgressBar.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var Dialogs;
(function (Dialogs) {
    var _this = this;
    Dialogs.show = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
        var actualButtons, resolved, _c, resolve, reject, promise, dialog;
        var headline = _b.headline, content = _b.content, okText = _b.okText, buttons = _b.buttons, origin = _b.origin, abortSignal = _b.abortSignal, excludeOk = _b.excludeOk, cancelable = _b.cancelable, growWidth = _b.growWidth;
        return __generator(this, function (_d) {
            actualButtons = (0, lib_std_1.isDefined)(buttons) ? __spreadArray([], buttons, true) : [];
            if (excludeOk !== true) {
                actualButtons.push({
                    text: okText !== null && okText !== void 0 ? okText : "Ok",
                    primary: true,
                    onClick: function (handler) {
                        resolved = true;
                        handler.close();
                        resolve();
                    }
                });
            }
            resolved = false;
            _c = Promise.withResolvers(), resolve = _c.resolve, reject = _c.reject, promise = _c.promise;
            dialog = (<Dialog_tsx_1.Dialog headline={headline !== null && headline !== void 0 ? headline : "Dialog"} icon={studio_enums_1.IconSymbol.System} cancelable={cancelable !== false} buttons={actualButtons} growWidth={growWidth}>
                <div style={{ padding: "1em 0", color: studio_enums_1.Colors.dark.toString() }}>{content}</div>
            </Dialog_tsx_1.Dialog>);
            Surface_tsx_1.Surface.get(origin).body.appendChild(dialog);
            dialog.showModal();
            dialog.addEventListener("close", function () { if (!resolved) {
                reject(lib_std_1.Errors.AbortError);
            } }, { once: true });
            abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener("abort", function () {
                var _a;
                if (!resolved) {
                    resolved = true;
                    dialog.close();
                    reject((_a = abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.reason) !== null && _a !== void 0 ? _a : lib_std_1.Errors.AbortError);
                }
            }, { once: true });
            return [2 /*return*/, promise];
        });
    }); };
    // Never rejects
    Dialogs.info = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
        var headline = _b.headline, message = _b.message, okText = _b.okText, buttons = _b.buttons, origin = _b.origin, abortSignal = _b.abortSignal, cancelable = _b.cancelable;
        return __generator(this, function (_c) {
            return [2 /*return*/, Dialogs.show({
                    headline: headline,
                    content: (<p style={{ whiteSpace: "pre-line" }}>{message}</p>),
                    okText: okText,
                    buttons: buttons,
                    origin: origin,
                    abortSignal: abortSignal,
                    cancelable: cancelable
                }).catch(lib_std_1.EmptyExec)];
        });
    }); };
    // Never rejects
    Dialogs.approve = function (_a) {
        var headline = _a.headline, message = _a.message, approveText = _a.approveText, cancelText = _a.cancelText, reverse = _a.reverse, origin = _a.origin, maxWidth = _a.maxWidth;
        reverse !== null && reverse !== void 0 ? reverse : (reverse = false);
        var _b = Promise.withResolvers(), resolve = _b.resolve, promise = _b.promise;
        var buttons = [{
                text: approveText !== null && approveText !== void 0 ? approveText : "Yes",
                primary: reverse,
                onClick: function (handler) {
                    handler.close();
                    resolve(true);
                }
            }, {
                text: cancelText !== null && cancelText !== void 0 ? cancelText : "Cancel",
                primary: !reverse,
                onClick: function (handler) {
                    handler.close();
                    resolve(false);
                }
            }];
        if (reverse) {
            buttons.reverse();
        }
        var dialog = (<Dialog_tsx_1.Dialog headline={headline !== null && headline !== void 0 ? headline : "Approve"} icon={studio_enums_1.IconSymbol.System} cancelable={true} buttons={buttons}>
                    <div style={{ padding: "1em 0", position: "relative", maxWidth: maxWidth }}>
                        <p style={{
                whiteSpace: "pre-line",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>{message}</p>
                    </div>
                </Dialog_tsx_1.Dialog>);
        Surface_tsx_1.Surface.get(origin).body.appendChild(dialog);
        dialog.showModal();
        return promise;
    };
    Dialogs.progress = function (_a) {
        var headline = _a.headline, message = _a.message, progress = _a.progress, cancel = _a.cancel, origin = _a.origin;
        var lifecycle = new lib_std_1.Terminator();
        var buttons = (0, lib_std_1.isDefined)(cancel)
            ? [{ text: "Cancel", primary: true, onClick: function (handler) { return handler.close(); } }]
            : lib_std_1.Arrays.empty();
        var messageElement = (<p style={{
                margin: "1em 0 0.5em 0",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}>{message}</p>);
        var dialog = (<Dialog_tsx_1.Dialog headline={headline} icon={studio_enums_1.IconSymbol.System} cancelable={(0, lib_std_1.isDefined)(cancel)} onCancel={cancel} buttons={buttons}>
                {messageElement}
                {progress && (<ProgressBar_tsx_1.ProgressBar lifecycle={lifecycle} progress={progress}/>)}
            </Dialog_tsx_1.Dialog>);
        Surface_tsx_1.Surface.get(origin).flyout.appendChild(dialog);
        dialog.addEventListener("close", function () { return lifecycle.terminate(); }, { once: true });
        dialog.showModal();
        lifecycle.own(lib_std_1.Terminable.create(function () { return dialog.close("done"); }));
        return new /** @class */ (function () {
            function class_1() {
            }
            Object.defineProperty(class_1.prototype, "message", {
                set: function (value) { messageElement.textContent = value; },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.terminate = function () { lifecycle.terminate(); };
            return class_1;
        }());
    };
    Dialogs.processMonolog = function (headline, content, cancel, origin) {
        var lifecycle = new lib_std_1.Terminator();
        var buttons = (0, lib_std_1.isDefined)(cancel)
            ? [{
                    text: "Cancel",
                    primary: true,
                    onClick: function (handler) {
                        cancel();
                        handler.close();
                    }
                }] : lib_std_1.Arrays.empty();
        var dialog = (<Dialog_tsx_1.Dialog headline={headline} icon={studio_enums_1.IconSymbol.System} cancelable={true} buttons={buttons}>
                {content}
            </Dialog_tsx_1.Dialog>);
        Surface_tsx_1.Surface.get(origin).flyout.appendChild(dialog);
        dialog.addEventListener("close", function () { return lifecycle.terminate(); }, { once: true });
        dialog.showModal();
        return { close: function () { dialog.close(); } };
    };
    Dialogs.debugBoxes = function (boxGraph, origin) {
        var dialog = (<Dialog_tsx_1.Dialog headline="Debug Box" icon={studio_enums_1.IconSymbol.System} cancelable={true} style={{ minWidth: "24rem", minHeight: "24rem" }} buttons={[{
                    text: "Ok",
                    primary: true,
                    onClick: function (handler) { return handler.close(); }
                }]}>
                <div style={{ padding: "1em 0" }}>
                    <BoxesDebugView_tsx_1.BoxesDebugView boxGraph={boxGraph}/>
                </div>
            </Dialog_tsx_1.Dialog>);
        Surface_tsx_1.Surface.get(origin).body.appendChild(dialog);
        dialog.showModal();
    };
    Dialogs.debugBox = function (box, origin) {
        var dialog = (<Dialog_tsx_1.Dialog headline="Debug Box" icon={studio_enums_1.IconSymbol.System} cancelable={true} style={{ minWidth: "32rem", minHeight: "32rem" }} buttons={[{
                    text: "Copy JSON",
                    primary: false,
                    onClick: function (handler) {
                        var _a = (0, lib_std_1.tryCatch)(function () {
                            return JSON.stringify(box.toJSON(), null, 2);
                        }), status = _a.status, value = _a.value, error = _a.error;
                        if (status === "success") {
                            lib_dom_1.Clipboard.writeText(value)
                                .then(lib_std_1.EmptyExec, lib_std_1.EmptyExec)
                                .finally(function () { return handler.close(); });
                        }
                        else {
                            console.warn(error);
                        }
                    }
                },
                {
                    text: "Ok",
                    primary: true,
                    onClick: function (handler) { return handler.close(); }
                }]}>
                <div style={{ padding: "1em 0" }}>
                    <BoxDebugView_1.BoxDebugView box={box}/>
                </div>
            </Dialog_tsx_1.Dialog>);
        Surface_tsx_1.Surface.get(origin).body.appendChild(dialog);
        dialog.showModal();
    };
    Dialogs.error = function (_a) {
        var name = _a.name, message = _a.message, probablyHasExtension = _a.probablyHasExtension, foreignOrigin = _a.foreignOrigin, _b = _a.backupCommand, backupCommand = _b === void 0 ? lib_std_1.Option.None : _b;
        console.debug("Recovery enabled: ".concat(backupCommand));
        var foreignHostname = foreignOrigin !== null ? new URL(foreignOrigin).hostname : null;
        var dialog = (<Dialog_tsx_1.Dialog headline="You Found A Bug ❤️" icon={studio_enums_1.IconSymbol.Bug} buttons={backupCommand.nonEmpty() ? [{
                    text: "Recover",
                    onClick: function () {
                        var command = backupCommand.unwrap();
                        command().then(function () { return location.reload(); });
                    }
                }, {
                    text: "Dismiss",
                    onClick: function () {
                        if (lib_dom_1.Browser.isLocalHost()) {
                            dialog.close();
                        }
                        else {
                            location.reload();
                        }
                    }
                }, {
                    text: "Report",
                    primary: true,
                    onClick: function () { return window.open("https://github.com/andremichelle/openDAW/issues/new", "github"); }
                }] : lib_std_1.Arrays.empty()} cancelable={false} error>
                <div style={{ padding: "1em 0", maxWidth: "50vw" }}>
                    <h3>{name}</h3>
                    <p>{message}</p>
                    {foreignHostname !== null ? (<p style={{ color: studio_enums_1.Colors.red.toString() }}>
                            This error originated from external code ({foreignHostname}), not openDAW.
                            If you are using a proxy or have browser extensions installed, please disable them.
                        </p>) : probablyHasExtension && (<p style={{ color: studio_enums_1.Colors.red.toString() }}>
                            Something extra is running! A browser extension might be causing issues. Disable
                            extensions for this site.
                        </p>)}
                    <p style={{
                color: studio_enums_1.Colors.shadow.toString(),
                fontWeight: "bolder"
            }}>Please report (opens in new tab) and then recover. Thanks!</p>
                </div>
            </Dialog_tsx_1.Dialog>);
        document.body.appendChild(dialog);
        dialog.showModal();
    };
    Dialogs.cache = function () {
        var dialog = (<Dialog_tsx_1.Dialog headline="Psst, There Is A New Version" icon={studio_enums_1.IconSymbol.Robot} buttons={[{
                    text: "Reload",
                    onClick: function () { return location.reload(); }
                }]} cancelable={false} error>
                <div style={{ padding: "1em 0", maxWidth: "50vw" }}>
                    <p>Please reload. If this message reappears clear your browsers cache.</p>
                    {document.scripts.length > 1 &&
                <p style={{ color: studio_enums_1.Colors.red.toString(), fontWeight: "bolder" }}>Browser extensions detected!
                            Please disable
                            before reload!</p>}
                </div>
            </Dialog_tsx_1.Dialog>);
        document.body.appendChild(dialog);
        dialog.showModal();
    };
})(Dialogs || (exports.Dialogs = Dialogs = {}));
