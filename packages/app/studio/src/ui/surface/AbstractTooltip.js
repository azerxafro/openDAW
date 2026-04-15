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
var _AbstractTooltip_instances, _AbstractTooltip_surface, _AbstractTooltip_element, _AbstractTooltip_current, _AbstractTooltip_stopDelay, _AbstractTooltip_start, _AbstractTooltip_startDeplayed, _AbstractTooltip_update, _AbstractTooltip_stop, _AbstractTooltip_attach, _AbstractTooltip_detach;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTooltip = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var AbstractTooltip = /** @class */ (function () {
    function AbstractTooltip(surface) {
        _AbstractTooltip_instances.add(this);
        _AbstractTooltip_surface.set(this, void 0);
        _AbstractTooltip_element.set(this, void 0);
        _AbstractTooltip_current.set(this, lib_std_1.Option.None);
        _AbstractTooltip_stopDelay.set(this, lib_std_1.Option.None);
        __classPrivateFieldSet(this, _AbstractTooltip_surface, surface, "f");
        __classPrivateFieldSet(this, _AbstractTooltip_element, this.createElement(), "f");
    }
    AbstractTooltip.prototype.show = function (provider) {
        __classPrivateFieldGet(this, _AbstractTooltip_stopDelay, "f").ifSome(function (delay) { return delay.terminate(); });
        __classPrivateFieldSet(this, _AbstractTooltip_stopDelay, lib_std_1.Option.None, "f");
        if (__classPrivateFieldGet(this, _AbstractTooltip_current, "f").isEmpty()) {
            __classPrivateFieldSet(this, _AbstractTooltip_current, lib_std_1.Option.wrap({ updater: __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_startDeplayed).call(this, provider), provider: provider }), "f");
        }
        else if (__classPrivateFieldGet(this, _AbstractTooltip_current, "f").unwrap().provider === provider) {
            if (__classPrivateFieldGet(this, _AbstractTooltip_element, "f").isConnected) {
                return;
            }
            else if (!__classPrivateFieldGet(this, _AbstractTooltip_surface, "f").hasFlyout) {
                __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_attach).call(this);
                __classPrivateFieldGet(this, _AbstractTooltip_current, "f").ifSome(function (_a) {
                    var updater = _a.updater;
                    return updater.terminate();
                });
                __classPrivateFieldSet(this, _AbstractTooltip_current, lib_std_1.Option.wrap({ updater: __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_start).call(this, provider), provider: provider }), "f");
            }
        }
        else {
            __classPrivateFieldGet(this, _AbstractTooltip_current, "f").ifSome(function (_a) {
                var updater = _a.updater;
                return updater.terminate();
            });
            if (__classPrivateFieldGet(this, _AbstractTooltip_element, "f").isConnected) {
                __classPrivateFieldSet(this, _AbstractTooltip_current, lib_std_1.Option.wrap({ updater: __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_start).call(this, provider), provider: provider }), "f");
            }
            else {
                __classPrivateFieldSet(this, _AbstractTooltip_current, lib_std_1.Option.wrap({ updater: __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_startDeplayed).call(this, provider), provider: provider }), "f");
            }
        }
    };
    AbstractTooltip.prototype.hide = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _AbstractTooltip_stopDelay, "f").isEmpty()) {
            __classPrivateFieldSet(this, _AbstractTooltip_stopDelay, lib_std_1.Option.wrap(lib_dom_1.AnimationFrame.add((function () {
                var frame = 0;
                return function () {
                    if (++frame === _this.hideDelayInFrames()) {
                        __classPrivateFieldGet(_this, _AbstractTooltip_stopDelay, "f").ifSome(function (delay) { return delay.terminate(); });
                        __classPrivateFieldSet(_this, _AbstractTooltip_stopDelay, lib_std_1.Option.None, "f");
                        __classPrivateFieldGet(_this, _AbstractTooltip_instances, "m", _AbstractTooltip_stop).call(_this);
                    }
                };
            })())), "f");
        }
    };
    AbstractTooltip.prototype.forceHide = function () { __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_stop).call(this); };
    Object.defineProperty(AbstractTooltip.prototype, "element", {
        get: function () { return __classPrivateFieldGet(this, _AbstractTooltip_element, "f"); },
        enumerable: false,
        configurable: true
    });
    return AbstractTooltip;
}());
exports.AbstractTooltip = AbstractTooltip;
_AbstractTooltip_surface = new WeakMap(), _AbstractTooltip_element = new WeakMap(), _AbstractTooltip_current = new WeakMap(), _AbstractTooltip_stopDelay = new WeakMap(), _AbstractTooltip_instances = new WeakSet(), _AbstractTooltip_start = function _AbstractTooltip_start(provider) {
    var _this = this;
    return lib_dom_1.AnimationFrame.add(function () { return __classPrivateFieldGet(_this, _AbstractTooltip_instances, "m", _AbstractTooltip_update).call(_this, provider()); });
}, _AbstractTooltip_startDeplayed = function _AbstractTooltip_startDeplayed(provider) {
    var _this = this;
    return lib_dom_1.AnimationFrame.add((function () {
        var frame = 0;
        return function () {
            if (++frame === _this.showDelayInFrames()) {
                if (__classPrivateFieldGet(_this, _AbstractTooltip_surface, "f").hasFlyout) {
                    __classPrivateFieldGet(_this, _AbstractTooltip_instances, "m", _AbstractTooltip_stop).call(_this);
                }
                else {
                    __classPrivateFieldGet(_this, _AbstractTooltip_instances, "m", _AbstractTooltip_attach).call(_this);
                }
            }
            if (frame >= _this.showDelayInFrames()) {
                __classPrivateFieldGet(_this, _AbstractTooltip_instances, "m", _AbstractTooltip_update).call(_this, provider());
            }
        };
    })());
}, _AbstractTooltip_update = function _AbstractTooltip_update(data) {
    this.update(data);
    var clientX = data.clientX;
    var clientY = data.clientY;
    if (clientX + __classPrivateFieldGet(this, _AbstractTooltip_element, "f").clientWidth > __classPrivateFieldGet(this, _AbstractTooltip_surface, "f").width) {
        clientX = __classPrivateFieldGet(this, _AbstractTooltip_surface, "f").width - __classPrivateFieldGet(this, _AbstractTooltip_element, "f").clientWidth;
    }
    if (clientY + __classPrivateFieldGet(this, _AbstractTooltip_element, "f").clientHeight > __classPrivateFieldGet(this, _AbstractTooltip_surface, "f").height) {
        clientY = __classPrivateFieldGet(this, _AbstractTooltip_surface, "f").height - __classPrivateFieldGet(this, _AbstractTooltip_element, "f").clientHeight;
    }
    __classPrivateFieldGet(this, _AbstractTooltip_element, "f").style.transform = "translate(".concat(clientX, "px, ").concat(clientY, "px)");
}, _AbstractTooltip_stop = function _AbstractTooltip_stop() {
    __classPrivateFieldGet(this, _AbstractTooltip_instances, "m", _AbstractTooltip_detach).call(this);
    __classPrivateFieldGet(this, _AbstractTooltip_current, "f").ifSome(function (_a) {
        var updater = _a.updater;
        return updater.terminate();
    });
    __classPrivateFieldSet(this, _AbstractTooltip_current, lib_std_1.Option.None, "f");
    __classPrivateFieldGet(this, _AbstractTooltip_stopDelay, "f").ifSome(function (delay) { return delay.terminate(); });
    __classPrivateFieldSet(this, _AbstractTooltip_stopDelay, lib_std_1.Option.None, "f");
}, _AbstractTooltip_attach = function _AbstractTooltip_attach() {
    __classPrivateFieldGet(this, _AbstractTooltip_surface, "f").flyout.appendChild(__classPrivateFieldGet(this, _AbstractTooltip_element, "f"));
    __classPrivateFieldGet(this, _AbstractTooltip_element, "f").focus();
}, _AbstractTooltip_detach = function _AbstractTooltip_detach() {
    if (__classPrivateFieldGet(this, _AbstractTooltip_element, "f").isConnected) {
        __classPrivateFieldGet(this, _AbstractTooltip_element, "f").remove();
    }
};
