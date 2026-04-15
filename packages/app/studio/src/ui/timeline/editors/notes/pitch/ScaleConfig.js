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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleConfig = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ScaleConfig = /** @class */ (function () {
    function ScaleConfig() {
        _ScaleConfig_notifier.set(this, void 0);
        _ScaleConfig_bits.set(this, _a.EMPTY);
        _ScaleConfig_key.set(this, 0);
        __classPrivateFieldSet(this, _ScaleConfig_notifier, new lib_std_1.Notifier(), "f");
    }
    Object.defineProperty(ScaleConfig.prototype, "key", {
        get: function () { return __classPrivateFieldGet(this, _ScaleConfig_key, "f"); },
        set: function (value) {
            if (__classPrivateFieldGet(this, _ScaleConfig_key, "f") === value) {
                return;
            }
            __classPrivateFieldSet(this, _ScaleConfig_key, value, "f");
            __classPrivateFieldGet(this, _ScaleConfig_notifier, "f").notify(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleConfig.prototype, "bits", {
        get: function () { return __classPrivateFieldGet(this, _ScaleConfig_bits, "f"); },
        enumerable: false,
        configurable: true
    });
    ScaleConfig.prototype.toJSON = function () {
        return { key: __classPrivateFieldGet(this, _ScaleConfig_key, "f"), bits: __classPrivateFieldGet(this, _ScaleConfig_bits, "f") };
    };
    ScaleConfig.prototype.fromJSON = function (json) {
        if (json !== null && typeof json === "object" && "key" in json && "bits" in json) {
            __classPrivateFieldSet(this, _ScaleConfig_key, json.key, "f");
            __classPrivateFieldSet(this, _ScaleConfig_bits, json.bits, "f");
        }
    };
    ScaleConfig.prototype.reset = function () { this.setBits(_a.EMPTY); };
    ScaleConfig.prototype.isEmpty = function () { return __classPrivateFieldGet(this, _ScaleConfig_bits, "f") === _a.EMPTY; };
    ScaleConfig.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _ScaleConfig_notifier, "f").subscribe(observer); };
    ScaleConfig.prototype.toggle = function (index) { this.setBit(index, !this.getBit(index)); };
    ScaleConfig.prototype.setScale = function (template) {
        if (template.equals(this)) {
            return;
        }
        __classPrivateFieldSet(this, _ScaleConfig_bits, template.bits, "f");
        __classPrivateFieldGet(this, _ScaleConfig_notifier, "f").notify(this);
    };
    ScaleConfig.prototype.setBits = function (value) {
        if (__classPrivateFieldGet(this, _ScaleConfig_bits, "f") === value) {
            return;
        }
        __classPrivateFieldSet(this, _ScaleConfig_bits, value, "f");
        __classPrivateFieldGet(this, _ScaleConfig_notifier, "f").notify(this);
    };
    ScaleConfig.prototype.setBit = function (index, value) {
        var byte = 1 << index;
        this.setBits(value ? __classPrivateFieldGet(this, _ScaleConfig_bits, "f") | byte : __classPrivateFieldGet(this, _ScaleConfig_bits, "f") & ~byte);
    };
    ScaleConfig.prototype.getBit = function (index) { return (__classPrivateFieldGet(this, _ScaleConfig_bits, "f") & (1 << index)) !== 0; };
    ScaleConfig.prototype.has = function (note) { return this.getBit((note - __classPrivateFieldGet(this, _ScaleConfig_key, "f") + 12) % 12); };
    ScaleConfig.prototype.equals = function (other) { return __classPrivateFieldGet(this, _ScaleConfig_bits, "f") === other.bits; };
    ScaleConfig.prototype.terminate = function () { __classPrivateFieldGet(this, _ScaleConfig_notifier, "f").terminate(); };
    var _a, _ScaleConfig_notifier, _ScaleConfig_bits, _ScaleConfig_key;
    _a = ScaleConfig, _ScaleConfig_notifier = new WeakMap(), _ScaleConfig_bits = new WeakMap(), _ScaleConfig_key = new WeakMap();
    ScaleConfig.EMPTY = 4095;
    return ScaleConfig;
}());
exports.ScaleConfig = ScaleConfig;
