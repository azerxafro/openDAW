"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoRollLayout = void 0;
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var PianoRollLayout = function () {
    var _PianoRollLayout_instances, _a, _PianoRollLayout_moveToNextWhiteKey, _PianoRollLayout_min, _PianoRollLayout_max, _PianoRollLayout_sizes, _PianoRollLayout_whiteKeysX, _PianoRollLayout_blackKeysX, _PianoRollLayout_octaveSplits, _PianoRollLayout_centered, _PianoRollLayout_initialize;
    var _staticExtraInitializers = [];
    var _static_Defaults_decorators;
    return _a = /** @class */ (function () {
            function PianoRollLayout(min, max, sizes) {
                if (sizes === void 0) { sizes = _a.DefaultKeySizes; }
                _PianoRollLayout_instances.add(this);
                _PianoRollLayout_min.set(this, void 0);
                _PianoRollLayout_max.set(this, void 0);
                _PianoRollLayout_sizes.set(this, void 0);
                _PianoRollLayout_whiteKeysX.set(this, void 0);
                _PianoRollLayout_blackKeysX.set(this, void 0);
                _PianoRollLayout_octaveSplits.set(this, void 0);
                _PianoRollLayout_centered.set(this, void 0);
                __classPrivateFieldSet(this, _PianoRollLayout_min, __classPrivateFieldGet(_a, _a, "m", _PianoRollLayout_moveToNextWhiteKey).call(_a, min, -1), "f");
                __classPrivateFieldSet(this, _PianoRollLayout_max, __classPrivateFieldGet(_a, _a, "m", _PianoRollLayout_moveToNextWhiteKey).call(_a, max, 1), "f");
                __classPrivateFieldSet(this, _PianoRollLayout_sizes, sizes, "f");
                __classPrivateFieldSet(this, _PianoRollLayout_whiteKeysX, [], "f");
                __classPrivateFieldSet(this, _PianoRollLayout_blackKeysX, [], "f");
                __classPrivateFieldSet(this, _PianoRollLayout_octaveSplits, [], "f");
                __classPrivateFieldSet(this, _PianoRollLayout_centered, lib_std_1.Arrays.create(function () { return 0; }, 128), "f");
                __classPrivateFieldGet(this, _PianoRollLayout_instances, "m", _PianoRollLayout_initialize).call(this);
            }
            PianoRollLayout.Defaults = function () {
                return [
                    new _a(21, 108), // 88
                    new _a(28, 103), // 76
                    new _a(36, 96), // 61
                    new _a(36, 84) // 49
                ];
            };
            PianoRollLayout.getByIndex = function (index) {
                var _b;
                var layouts = this.Defaults();
                return (_b = layouts[index]) !== null && _b !== void 0 ? _b : layouts[0];
            };
            Object.defineProperty(PianoRollLayout.prototype, "min", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_min, "f"); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PianoRollLayout.prototype, "max", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_max, "f"); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PianoRollLayout.prototype, "sizes", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_sizes, "f"); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PianoRollLayout.prototype, "count", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_max, "f") - __classPrivateFieldGet(this, _PianoRollLayout_min, "f") + 1; },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PianoRollLayout.prototype, "whiteKeys", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_whiteKeysX, "f"); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PianoRollLayout.prototype, "blackKeys", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_blackKeysX, "f"); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PianoRollLayout.prototype, "octaveSplits", {
                get: function () { return __classPrivateFieldGet(this, _PianoRollLayout_octaveSplits, "f"); },
                enumerable: false,
                configurable: true
            });
            PianoRollLayout.prototype.getCenteredX = function (index) { return __classPrivateFieldGet(this, _PianoRollLayout_centered, "f")[index]; };
            PianoRollLayout.prototype.getFillStyle = function (hue, isPlaying) {
                var saturation = isPlaying ? 100 : 45;
                var lightness = isPlaying ? 80 : 60;
                return "hsl(".concat(hue, ", ").concat(saturation, "%, ").concat(lightness, "%)");
            };
            return PianoRollLayout;
        }()),
        _PianoRollLayout_min = new WeakMap(),
        _PianoRollLayout_max = new WeakMap(),
        _PianoRollLayout_sizes = new WeakMap(),
        _PianoRollLayout_whiteKeysX = new WeakMap(),
        _PianoRollLayout_blackKeysX = new WeakMap(),
        _PianoRollLayout_octaveSplits = new WeakMap(),
        _PianoRollLayout_centered = new WeakMap(),
        _PianoRollLayout_instances = new WeakSet(),
        _PianoRollLayout_moveToNextWhiteKey = function _PianoRollLayout_moveToNextWhiteKey(key, direction) {
            while (lib_dsp_1.MidiKeys.isBlackKey(key))
                key += direction;
            return key;
        },
        _PianoRollLayout_initialize = function _PianoRollLayout_initialize() {
            var BlackKeyOffsets = _a.BlackKeyOffsets;
            var _b = this.sizes, whiteKeys = _b.whiteKeys, blackKeys = _b.blackKeys;
            var whiteIndex = 0;
            for (var key = __classPrivateFieldGet(this, _PianoRollLayout_min, "f") | 0; key <= __classPrivateFieldGet(this, _PianoRollLayout_max, "f"); key++) {
                var localNote = key % 12;
                if (lib_dsp_1.MidiKeys.isBlackKey(key)) {
                    var offset = (0, lib_std_1.asDefined)(BlackKeyOffsets[localNote], "black index not found");
                    var x = (whiteIndex - offset) * whiteKeys.width + (whiteKeys.width - blackKeys.width) / 2.0;
                    __classPrivateFieldGet(this, _PianoRollLayout_blackKeysX, "f").push({ key: key, x: x });
                    __classPrivateFieldGet(this, _PianoRollLayout_centered, "f")[key] = whiteIndex - offset + 0.5;
                }
                else {
                    var x = whiteIndex * whiteKeys.width;
                    __classPrivateFieldGet(this, _PianoRollLayout_whiteKeysX, "f").push({ key: key, x: x });
                    __classPrivateFieldGet(this, _PianoRollLayout_centered, "f")[key] = whiteIndex + 0.5;
                    if (localNote === 0 || localNote === 5) {
                        __classPrivateFieldGet(this, _PianoRollLayout_octaveSplits, "f").push(whiteIndex);
                    }
                    whiteIndex++;
                }
            }
            __classPrivateFieldGet(this, _PianoRollLayout_octaveSplits, "f").forEach(function (x, index, array) { return array[index] = x / whiteIndex; });
            __classPrivateFieldGet(this, _PianoRollLayout_centered, "f").forEach(function (x, index, array) { return array[index] = x / whiteIndex; });
        },
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_Defaults_decorators = [lib_std_1.Lazy];
            __esDecorate(_a, null, _static_Defaults_decorators, { kind: "method", name: "Defaults", static: true, private: false, access: { has: function (obj) { return "Defaults" in obj; }, get: function (obj) { return obj.Defaults; } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.DefaultKeySizes = (__runInitializers(_a, _staticExtraInitializers), {
            whiteKeys: { width: 20, height: 90 },
            blackKeys: { width: 13, height: 50 }
        }),
        _a.BlackKeyOffsets = { 1: 0.55, 3: 0.45, 6: 0.55, 8: 0.50, 10: 0.45 },
        _a;
}();
exports.PianoRollLayout = PianoRollLayout;
