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
exports.Snapping = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var SMART_MIN_PIXEL = 16;
var Snapping = /** @class */ (function () {
    function Snapping(range) {
        _Snapping_instances.add(this);
        _Snapping_range.set(this, void 0);
        _Snapping_units.set(this, void 0);
        _Snapping_notifier.set(this, void 0);
        _Snapping_optSignatureTrack.set(this, lib_std_1.Option.None);
        _Snapping_enabled.set(this, true);
        _Snapping_index.set(this, 0 | 0);
        __classPrivateFieldSet(this, _Snapping_range, range, "f");
        __classPrivateFieldSet(this, _Snapping_units, __classPrivateFieldGet(this, _Snapping_instances, "m", _Snapping_initUnits).call(this), "f");
        __classPrivateFieldSet(this, _Snapping_notifier, new lib_std_1.Notifier(), "f");
    }
    Object.defineProperty(Snapping.prototype, "unit", {
        get: function () { return __classPrivateFieldGet(this, _Snapping_units, "f")[__classPrivateFieldGet(this, _Snapping_index, "f")]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snapping.prototype, "enabled", {
        get: function () { return __classPrivateFieldGet(this, _Snapping_enabled, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snapping.prototype, "index", {
        get: function () { return __classPrivateFieldGet(this, _Snapping_index, "f"); },
        set: function (value) {
            if (__classPrivateFieldGet(this, _Snapping_index, "f") === value) {
                return;
            }
            __classPrivateFieldSet(this, _Snapping_index, value, "f");
            __classPrivateFieldGet(this, _Snapping_notifier, "f").notify(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snapping.prototype, "units", {
        get: function () { return __classPrivateFieldGet(this, _Snapping_units, "f"); },
        enumerable: false,
        configurable: true
    });
    Snapping.prototype.value = function (position) { return __classPrivateFieldGet(this, _Snapping_enabled, "f") ? __classPrivateFieldGet(this, _Snapping_units, "f")[__classPrivateFieldGet(this, _Snapping_index, "f")].ppqn(position) : 1; };
    Snapping.prototype.registerSignatureTrackAdapter = function (adapter) {
        var _this = this;
        __classPrivateFieldSet(this, _Snapping_optSignatureTrack, lib_std_1.Option.wrap(adapter), "f");
        return lib_std_1.Terminable.create(function () { return __classPrivateFieldSet(_this, _Snapping_optSignatureTrack, lib_std_1.Option.None, "f"); });
    };
    Snapping.prototype.xToUnitFloor = function (x) { return this.floor(__classPrivateFieldGet(this, _Snapping_range, "f").xToUnit(x)); };
    Snapping.prototype.xToUnitCeil = function (x) { return this.ceil(__classPrivateFieldGet(this, _Snapping_range, "f").xToUnit(x)); };
    Snapping.prototype.xToUnitRound = function (x) { return this.round(__classPrivateFieldGet(this, _Snapping_range, "f").xToUnit(x)); };
    Snapping.prototype.xToBarInterval = function (x) {
        var pulse = __classPrivateFieldGet(this, _Snapping_range, "f").xToUnit(x);
        if (__classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").nonEmpty()) {
            return __classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").unwrap().getBarInterval(pulse);
        }
        var position = this.floor(pulse);
        return { position: position, complete: position + this.value(position) };
    };
    Snapping.prototype.floor = function (position) {
        if (__classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").nonEmpty()) {
            var adapter = __classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").unwrap();
            if (this.value(position) === adapter.barLengthAt(position)) {
                return adapter.floorToBar(position);
            }
        }
        return (0, lib_std_1.quantizeFloor)(position, this.value(position));
    };
    Snapping.prototype.round = function (position) {
        if (__classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").nonEmpty()) {
            var adapter = __classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").unwrap();
            if (this.value(position) === adapter.barLengthAt(position)) {
                return adapter.roundToBar(position);
            }
        }
        return (0, lib_std_1.quantizeRound)(position, this.value(position));
    };
    Snapping.prototype.ceil = function (position) {
        if (__classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").nonEmpty()) {
            var adapter = __classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").unwrap();
            if (this.value(position) === adapter.barLengthAt(position)) {
                return adapter.ceilToBar(position);
            }
        }
        return (0, lib_std_1.quantizeCeil)(position, this.value(position));
    };
    Snapping.prototype.computeDelta = function (beingPointerPulse, newPointerX, beginValuePulse) {
        var pointerTicks = __classPrivateFieldGet(this, _Snapping_range, "f").xToUnit(newPointerX) - (beingPointerPulse - beginValuePulse);
        var localDelta = this.round(pointerTicks - beginValuePulse);
        var globalDelta = this.round(pointerTicks) - beginValuePulse;
        var localDistance = Math.abs((beginValuePulse + localDelta) - pointerTicks);
        var globalDistance = Math.abs((beginValuePulse + globalDelta) - pointerTicks);
        return localDistance < globalDistance ? localDelta : globalDelta;
    };
    Snapping.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _Snapping_notifier, "f").subscribe(observer); };
    Snapping.prototype.catchupAndSubscribe = function (observer) {
        observer(this);
        return __classPrivateFieldGet(this, _Snapping_notifier, "f").subscribe(observer);
    };
    Snapping.prototype.terminate = function () { __classPrivateFieldGet(this, _Snapping_notifier, "f").terminate(); };
    var _Snapping_instances, _Snapping_range, _Snapping_units, _Snapping_notifier, _Snapping_optSignatureTrack, _Snapping_enabled, _Snapping_index, _Snapping_initUnits, _Snapping_signatureAt;
    _Snapping_range = new WeakMap(), _Snapping_units = new WeakMap(), _Snapping_notifier = new WeakMap(), _Snapping_optSignatureTrack = new WeakMap(), _Snapping_enabled = new WeakMap(), _Snapping_index = new WeakMap(), _Snapping_instances = new WeakSet(), _Snapping_initUnits = function _Snapping_initUnits() {
        var range = __classPrivateFieldGet(this, _Snapping_range, "f");
        var scope = this;
        return [
            {
                name: "Smart",
                ppqn: function (position) {
                    var _a = __classPrivateFieldGet(scope, _Snapping_instances, "m", _Snapping_signatureAt).call(scope, position), nominator = _a[0], denominator = _a[1];
                    var barPulses = lib_dsp_1.PPQN.fromSignature(nominator, denominator);
                    var beatPulses = lib_dsp_1.PPQN.fromSignature(1, denominator);
                    var minUnits = SMART_MIN_PIXEL * range.unitsPerPixel;
                    // Start from the finest resolution
                    var interval = lib_dsp_1.PPQN.fromSignature(1, 128);
                    // Scale up using the same logic as TimeGrid
                    while (interval < minUnits) {
                        if (interval < beatPulses) {
                            // Below beat level: multiply by 2
                            var nextInterval = interval * 2;
                            if (nextInterval > beatPulses) {
                                interval = beatPulses;
                            }
                            else {
                                interval = nextInterval;
                            }
                        }
                        else if (interval < barPulses) {
                            // Between beat and bar level: multiply by nominator
                            var nextInterval = interval * nominator;
                            if (nextInterval > barPulses) {
                                interval = barPulses;
                            }
                            else {
                                interval = nextInterval;
                            }
                        }
                        else {
                            // At or above bar level: don't go beyond a single bar for snapping
                            break;
                        }
                    }
                    var clampSmartSnapping = true;
                    var min = clampSmartSnapping
                        ? lib_dsp_1.PPQN.fromSignature(1, 16)
                        : lib_dsp_1.PPQN.fromSignature(1, 128);
                    // Clamp between min and bar level
                    return (0, lib_std_1.clamp)(Math.floor(interval), min, barPulses);
                }
            },
            {
                name: "Bar",
                ppqn: function (position) {
                    var _a = __classPrivateFieldGet(scope, _Snapping_instances, "m", _Snapping_signatureAt).call(scope, position), nominator = _a[0], denominator = _a[1];
                    return lib_dsp_1.PPQN.fromSignature(nominator, denominator);
                }
            },
            { name: "1/2", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 2); } },
            { name: "1/4", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 4); } },
            { name: "1/8", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 8); } },
            { name: "1/8T", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 4) / 3; } },
            { name: "1/16", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 16); } },
            { name: "1/16T", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 8) / 3; } },
            { name: "1/32", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 32); } },
            { name: "1/32T", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 16) / 3; } },
            { name: "1/64", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 64); } },
            { name: "1/128", ppqn: function (_position) { return lib_dsp_1.PPQN.fromSignature(1, 128); } },
            { name: "Off", ppqn: function (_position) { return 1; } }
        ];
    }, _Snapping_signatureAt = function _Snapping_signatureAt(position) {
        return __classPrivateFieldGet(this, _Snapping_optSignatureTrack, "f").mapOr(function (adapter) { return adapter.signatureAt(position); }, [4, 4]);
    };
    Snapping.createMenuRoot = function (snapping) { return studio_core_1.MenuItem.root()
        .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, snapping.units
        .map(function (unit, index) { return studio_core_1.MenuItem.default({ label: unit.name, checked: unit === snapping.unit })
        .setTriggerProcedure(function () { return snapping.index = index; }); })); }); };
    return Snapping;
}());
exports.Snapping = Snapping;
