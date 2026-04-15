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
exports.ScrollModel = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ScrollModel = /** @class */ (function () {
    function ScrollModel() {
        _ScrollModel_instances.add(this);
        _ScrollModel_notifier.set(this, void 0);
        _ScrollModel_trackSize.set(this, 0.0);
        _ScrollModel_visibleSize.set(this, 0.0);
        _ScrollModel_contentSize.set(this, 0.0);
        _ScrollModel_normalized.set(this, 0.0);
        __classPrivateFieldSet(this, _ScrollModel_notifier, new lib_std_1.Notifier(), "f");
    }
    ScrollModel.prototype.moveTo = function (value) {
        if (!this.scrollable()) {
            return;
        }
        this.normalized = value / (__classPrivateFieldGet(this, _ScrollModel_trackSize, "f") - this.thumbSize);
    };
    ScrollModel.prototype.moveBy = function (delta) {
        if (0.0 === delta || !this.scrollable()) {
            return;
        }
        this.normalized = (__classPrivateFieldGet(this, _ScrollModel_normalized, "f") + delta / (this.overflow));
    };
    ScrollModel.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _ScrollModel_notifier, "f").subscribe(observer); };
    ScrollModel.prototype.terminate = function () { __classPrivateFieldGet(this, _ScrollModel_notifier, "f").terminate(); };
    Object.defineProperty(ScrollModel.prototype, "visibleSize", {
        get: function () { return __classPrivateFieldGet(this, _ScrollModel_visibleSize, "f"); },
        // The size if the visible area of the underlying content
        set: function (value) {
            if (__classPrivateFieldGet(this, _ScrollModel_visibleSize, "f") === value) {
                return;
            }
            __classPrivateFieldSet(this, _ScrollModel_visibleSize, value, "f");
            if (!this.scrollable()) {
                __classPrivateFieldSet(this, _ScrollModel_normalized, 0, "f");
            }
            __classPrivateFieldGet(this, _ScrollModel_instances, "m", _ScrollModel_onChanged).call(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "trackSize", {
        get: function () { return __classPrivateFieldGet(this, _ScrollModel_trackSize, "f"); },
        // The size of the scroller's track
        set: function (value) {
            if (__classPrivateFieldGet(this, _ScrollModel_trackSize, "f") === value) {
                return;
            }
            __classPrivateFieldSet(this, _ScrollModel_trackSize, value, "f");
            __classPrivateFieldGet(this, _ScrollModel_instances, "m", _ScrollModel_onChanged).call(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "contentSize", {
        get: function () { return __classPrivateFieldGet(this, _ScrollModel_contentSize, "f"); },
        // The size of the underlying content
        set: function (value) {
            if (__classPrivateFieldGet(this, _ScrollModel_contentSize, "f") === value) {
                return;
            }
            __classPrivateFieldSet(this, _ScrollModel_contentSize, value, "f");
            __classPrivateFieldSet(this, _ScrollModel_normalized, !this.scrollable()
                ? 0.0
                : Math.max(0.0, Math.min(1.0, __classPrivateFieldGet(this, _ScrollModel_normalized, "f") * this.overflow / (__classPrivateFieldGet(this, _ScrollModel_contentSize, "f") - __classPrivateFieldGet(this, _ScrollModel_visibleSize, "f")))), "f");
            __classPrivateFieldGet(this, _ScrollModel_instances, "m", _ScrollModel_onChanged).call(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "normalized", {
        get: function () { return __classPrivateFieldGet(this, _ScrollModel_normalized, "f"); },
        // the normalized thumb position
        set: function (value) {
            var clamped = !this.scrollable() ? 0.0 : (0, lib_std_1.clamp)(value, 0.0, 1.0);
            if (__classPrivateFieldGet(this, _ScrollModel_normalized, "f") === clamped) {
                return;
            }
            __classPrivateFieldSet(this, _ScrollModel_normalized, clamped, "f");
            __classPrivateFieldGet(this, _ScrollModel_instances, "m", _ScrollModel_onChanged).call(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "position", {
        get: function () { return !this.scrollable() ? 0.0 : Math.floor(__classPrivateFieldGet(this, _ScrollModel_normalized, "f") * this.overflow); },
        set: function (value) {
            if (!this.scrollable()) {
                return;
            }
            this.normalized = value / (this.overflow);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "overflow", {
        get: function () { return __classPrivateFieldGet(this, _ScrollModel_contentSize, "f") - __classPrivateFieldGet(this, _ScrollModel_visibleSize, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "thumbPosition", {
        get: function () { return __classPrivateFieldGet(this, _ScrollModel_normalized, "f") * (__classPrivateFieldGet(this, _ScrollModel_trackSize, "f") - __classPrivateFieldGet(this, _ScrollModel_instances, "m", _ScrollModel_minThumbSize).call(this)); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollModel.prototype, "thumbSize", {
        get: function () { return !this.scrollable() ? __classPrivateFieldGet(this, _ScrollModel_trackSize, "f") : __classPrivateFieldGet(this, _ScrollModel_instances, "m", _ScrollModel_minThumbSize).call(this); },
        enumerable: false,
        configurable: true
    });
    ScrollModel.prototype.ensureVisibility = function (top, bottom) {
        if (!this.scrollable()) {
            return;
        }
        var min = this.position;
        var max = this.visibleSize + min;
        if (bottom > max) {
            this.moveBy(bottom - max);
            min = this.position;
        }
        if (top < min) {
            this.moveBy(top - min);
        }
    };
    ScrollModel.prototype.scrollable = function () { return __classPrivateFieldGet(this, _ScrollModel_contentSize, "f") > __classPrivateFieldGet(this, _ScrollModel_visibleSize, "f"); };
    var _ScrollModel_instances, _a, _ScrollModel_MinThumbSize, _ScrollModel_notifier, _ScrollModel_trackSize, _ScrollModel_visibleSize, _ScrollModel_contentSize, _ScrollModel_normalized, _ScrollModel_minThumbSize, _ScrollModel_onChanged;
    _a = ScrollModel, _ScrollModel_notifier = new WeakMap(), _ScrollModel_trackSize = new WeakMap(), _ScrollModel_visibleSize = new WeakMap(), _ScrollModel_contentSize = new WeakMap(), _ScrollModel_normalized = new WeakMap(), _ScrollModel_instances = new WeakSet(), _ScrollModel_minThumbSize = function _ScrollModel_minThumbSize() {
        return Math.max(__classPrivateFieldGet(_a, _a, "f", _ScrollModel_MinThumbSize), __classPrivateFieldGet(this, _ScrollModel_visibleSize, "f") / __classPrivateFieldGet(this, _ScrollModel_contentSize, "f") * __classPrivateFieldGet(this, _ScrollModel_trackSize, "f"));
    }, _ScrollModel_onChanged = function _ScrollModel_onChanged() { __classPrivateFieldGet(this, _ScrollModel_notifier, "f").notify(this); };
    _ScrollModel_MinThumbSize = { value: 16.0 };
    return ScrollModel;
}());
exports.ScrollModel = ScrollModel;
