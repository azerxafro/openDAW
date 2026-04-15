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
var _PitchPositioner_numNotes, _PitchPositioner_terminator, _PitchPositioner_notifier, _PitchPositioner_scrollModel, _PitchPositioner_valueAxis, _PitchPositioner_noteHeight, _PitchPositioner_totalHeight;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitchPositioner = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ScrollModel_ts_1 = require("@/ui/components/ScrollModel.ts");
var PitchPositioner = /** @class */ (function () {
    function PitchPositioner() {
        var _this = this;
        _PitchPositioner_numNotes.set(this, 128);
        _PitchPositioner_terminator.set(this, new lib_std_1.Terminator());
        _PitchPositioner_notifier.set(this, void 0);
        _PitchPositioner_scrollModel.set(this, void 0);
        _PitchPositioner_valueAxis.set(this, void 0);
        _PitchPositioner_noteHeight.set(this, 11);
        _PitchPositioner_totalHeight.set(this, void 0);
        __classPrivateFieldSet(this, _PitchPositioner_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _PitchPositioner_totalHeight, __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f") * __classPrivateFieldGet(this, _PitchPositioner_numNotes, "f"), "f");
        __classPrivateFieldSet(this, _PitchPositioner_scrollModel, __classPrivateFieldGet(this, _PitchPositioner_terminator, "f").own(new ScrollModel_ts_1.ScrollModel()), "f");
        __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").contentSize = this.totalHeight;
        __classPrivateFieldGet(this, _PitchPositioner_terminator, "f").own(__classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").subscribe(function () { return _this.position = __classPrivateFieldGet(_this, _PitchPositioner_scrollModel, "f").position; }));
        __classPrivateFieldSet(this, _PitchPositioner_valueAxis, {
            axisToValue: function (y) { return (0, lib_std_1.clamp)((__classPrivateFieldGet(_this, _PitchPositioner_totalHeight, "f") - y -
                Math.round(__classPrivateFieldGet(_this, _PitchPositioner_scrollModel, "f").position)) / __classPrivateFieldGet(_this, _PitchPositioner_noteHeight, "f"), 0, __classPrivateFieldGet(_this, _PitchPositioner_numNotes, "f")) - 1.0; },
            valueToAxis: function (x) { return _this.pitchToY(x); }
        }, "f");
    }
    PitchPositioner.prototype.moveBy = function (pixels) { this.position = __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position + pixels; };
    Object.defineProperty(PitchPositioner.prototype, "centerNote", {
        get: function () {
            return -Math.round(0.5 + (__classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position + this.height * 0.5 - __classPrivateFieldGet(this, _PitchPositioner_totalHeight, "f")) / __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f"));
        },
        set: function (note) {
            if (this.height === 0) {
                console.warn("Cannot set 'centerNote'. Height is zero.");
                return;
            }
            __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position = (__classPrivateFieldGet(this, _PitchPositioner_totalHeight, "f") - (note + 0.5) * __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f")) - this.height * 0.5;
        },
        enumerable: false,
        configurable: true
    });
    PitchPositioner.prototype.pitchToY = function (note) { return __classPrivateFieldGet(this, _PitchPositioner_totalHeight, "f") - (note + 1) * __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f") - Math.round(__classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position); };
    PitchPositioner.prototype.yToPitch = function (y) { return Math.floor((__classPrivateFieldGet(this, _PitchPositioner_totalHeight, "f") - y - Math.round(__classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position)) / __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f")); };
    PitchPositioner.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _PitchPositioner_notifier, "f").subscribe(observer); };
    PitchPositioner.prototype.terminate = function () { __classPrivateFieldGet(this, _PitchPositioner_terminator, "f").terminate(); };
    Object.defineProperty(PitchPositioner.prototype, "scrollModel", {
        get: function () { return __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PitchPositioner.prototype, "valueAxis", {
        get: function () { return __classPrivateFieldGet(this, _PitchPositioner_valueAxis, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PitchPositioner.prototype, "height", {
        get: function () { return __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").visibleSize; },
        set: function (value) { __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").trackSize = __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").visibleSize = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PitchPositioner.prototype, "position", {
        get: function () { return __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position; },
        set: function (value) {
            __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").position = value;
            __classPrivateFieldGet(this, _PitchPositioner_notifier, "f").notify(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PitchPositioner.prototype, "noteHeight", {
        get: function () { return __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f"); },
        set: function (value) {
            value = Math.floor(value);
            if (__classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f") === value) {
                return;
            }
            var anchor = this.centerNote;
            __classPrivateFieldSet(this, _PitchPositioner_noteHeight, value, "f");
            __classPrivateFieldSet(this, _PitchPositioner_totalHeight, __classPrivateFieldGet(this, _PitchPositioner_noteHeight, "f") * __classPrivateFieldGet(this, _PitchPositioner_numNotes, "f"), "f");
            __classPrivateFieldGet(this, _PitchPositioner_scrollModel, "f").contentSize = __classPrivateFieldGet(this, _PitchPositioner_totalHeight, "f");
            if (this.centerNote === anchor) {
                __classPrivateFieldGet(this, _PitchPositioner_notifier, "f").notify(this);
            }
            else {
                this.centerNote = anchor;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PitchPositioner.prototype, "totalHeight", {
        get: function () { return __classPrivateFieldGet(this, _PitchPositioner_totalHeight, "f"); },
        enumerable: false,
        configurable: true
    });
    return PitchPositioner;
}());
exports.PitchPositioner = PitchPositioner;
_PitchPositioner_numNotes = new WeakMap(), _PitchPositioner_terminator = new WeakMap(), _PitchPositioner_notifier = new WeakMap(), _PitchPositioner_scrollModel = new WeakMap(), _PitchPositioner_valueAxis = new WeakMap(), _PitchPositioner_noteHeight = new WeakMap(), _PitchPositioner_totalHeight = new WeakMap();
