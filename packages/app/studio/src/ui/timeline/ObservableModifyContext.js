"use strict";
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
var _ObservableModifyContext_notifier, _ObservableModifyContext_modifier;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableModifyContext = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ObservableModifyContext = /** @class */ (function () {
    function ObservableModifyContext() {
        _ObservableModifyContext_notifier.set(this, void 0);
        _ObservableModifyContext_modifier.set(this, lib_std_1.Option.None);
        __classPrivateFieldSet(this, _ObservableModifyContext_notifier, new lib_std_1.Notifier(), "f");
    }
    Object.defineProperty(ObservableModifyContext.prototype, "modifier", {
        get: function () { return __classPrivateFieldGet(this, _ObservableModifyContext_modifier, "f"); },
        enumerable: false,
        configurable: true
    });
    ObservableModifyContext.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _ObservableModifyContext_notifier, "f").subscribe(observer); };
    ObservableModifyContext.prototype.startModifier = function (modifier) {
        var _this = this;
        var lifeTime = new lib_std_1.Terminator();
        lifeTime.own(modifier.subscribeUpdate(function () { return __classPrivateFieldGet(_this, _ObservableModifyContext_notifier, "f").notify(); }));
        lifeTime.own({
            terminate: function () {
                __classPrivateFieldSet(_this, _ObservableModifyContext_modifier, lib_std_1.Option.None, "f");
                __classPrivateFieldGet(_this, _ObservableModifyContext_notifier, "f").notify();
            }
        });
        __classPrivateFieldSet(this, _ObservableModifyContext_modifier, lib_std_1.Option.wrap(modifier), "f");
        return lib_std_1.Option.wrap({
            update: function (event) { return modifier.update(event); },
            approve: function () { return modifier.approve(); },
            cancel: function () { return modifier.cancel(); },
            finally: function () { return lifeTime.terminate(); }
        });
    };
    return ObservableModifyContext;
}());
exports.ObservableModifyContext = ObservableModifyContext;
_ObservableModifyContext_notifier = new WeakMap(), _ObservableModifyContext_modifier = new WeakMap();
