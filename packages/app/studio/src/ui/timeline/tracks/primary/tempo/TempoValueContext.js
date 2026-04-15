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
var _TempoValueContext_terminator, _TempoValueContext_adapter, _TempoValueContext_min, _TempoValueContext_max;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoValueContext = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var TempoValueContext = /** @class */ (function () {
    function TempoValueContext(adapter, _a) {
        var min = _a[0], max = _a[1];
        var _this = this;
        _TempoValueContext_terminator.set(this, new lib_std_1.Terminator());
        _TempoValueContext_adapter.set(this, void 0);
        this.anchorModel = lib_std_1.ObservableValue.seal(studio_adapters_1.TempoRange.min);
        this.stringMapping = lib_std_1.StringMapping.numeric({ unit: "bpm", fractionDigits: 1 });
        this.floating = true;
        _TempoValueContext_min.set(this, void 0);
        _TempoValueContext_max.set(this, void 0);
        __classPrivateFieldSet(this, _TempoValueContext_adapter, adapter, "f");
        __classPrivateFieldSet(this, _TempoValueContext_min, min, "f");
        __classPrivateFieldSet(this, _TempoValueContext_max, max, "f");
        this.valueMapping = {
            x: function (y) {
                var min = __classPrivateFieldGet(_this, _TempoValueContext_min, "f").getValue();
                var max = __classPrivateFieldGet(_this, _TempoValueContext_max, "f").getValue();
                return Math.log(y / min) / Math.log(max / min);
            },
            y: function (x) {
                var min = __classPrivateFieldGet(_this, _TempoValueContext_min, "f").getValue();
                var max = __classPrivateFieldGet(_this, _TempoValueContext_max, "f").getValue();
                return (0, lib_std_1.clamp)(Math.exp(x * Math.log(max / min)) * min, studio_adapters_1.TempoRange.min, studio_adapters_1.TempoRange.max);
            },
            clamp: function (y) { return (0, lib_std_1.clamp)(y, __classPrivateFieldGet(_this, _TempoValueContext_min, "f").getValue(), __classPrivateFieldGet(_this, _TempoValueContext_max, "f").getValue()); },
            floating: function () { return true; }
        };
    }
    Object.defineProperty(TempoValueContext.prototype, "currentValue", {
        get: function () { return __classPrivateFieldGet(this, _TempoValueContext_adapter, "f").box.bpm.getValue(); },
        enumerable: false,
        configurable: true
    });
    TempoValueContext.prototype.quantize = function (value) { return Math.round(value); };
    TempoValueContext.prototype.terminate = function () { __classPrivateFieldGet(this, _TempoValueContext_terminator, "f").terminate(); };
    return TempoValueContext;
}());
exports.TempoValueContext = TempoValueContext;
_TempoValueContext_terminator = new WeakMap(), _TempoValueContext_adapter = new WeakMap(), _TempoValueContext_min = new WeakMap(), _TempoValueContext_max = new WeakMap();
