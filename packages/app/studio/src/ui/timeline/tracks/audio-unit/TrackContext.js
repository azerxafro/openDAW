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
var _TrackContext_audioUnitBoxAdapter, _TrackContext_trackBoxAdapter, _TrackContext_element, _TrackContext_lifecycle;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackContext = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var TrackContext = /** @class */ (function () {
    function TrackContext(_a) {
        var audioUnitBoxAdapter = _a.audioUnitBoxAdapter, trackBoxAdapter = _a.trackBoxAdapter, element = _a.element, lifecycle = _a.lifecycle;
        _TrackContext_audioUnitBoxAdapter.set(this, void 0);
        _TrackContext_trackBoxAdapter.set(this, void 0);
        _TrackContext_element.set(this, void 0);
        _TrackContext_lifecycle.set(this, void 0);
        __classPrivateFieldSet(this, _TrackContext_audioUnitBoxAdapter, audioUnitBoxAdapter, "f");
        __classPrivateFieldSet(this, _TrackContext_trackBoxAdapter, trackBoxAdapter, "f");
        __classPrivateFieldSet(this, _TrackContext_element, element, "f");
        __classPrivateFieldSet(this, _TrackContext_lifecycle, lifecycle, "f");
    }
    Object.defineProperty(TrackContext.prototype, "audioUnitBoxAdapter", {
        get: function () { return __classPrivateFieldGet(this, _TrackContext_audioUnitBoxAdapter, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrackContext.prototype, "trackBoxAdapter", {
        get: function () { return __classPrivateFieldGet(this, _TrackContext_trackBoxAdapter, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrackContext.prototype, "element", {
        get: function () { return __classPrivateFieldGet(this, _TrackContext_element, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrackContext.prototype, "lifecycle", {
        get: function () { return __classPrivateFieldGet(this, _TrackContext_lifecycle, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrackContext.prototype, "size", {
        get: function () { return __classPrivateFieldGet(this, _TrackContext_element, "f").clientHeight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrackContext.prototype, "position", {
        get: function () {
            return (0, lib_std_1.asDefined)(__classPrivateFieldGet(this, _TrackContext_element, "f").parentElement, "Track has no parent.").offsetTop + __classPrivateFieldGet(this, _TrackContext_element, "f").offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    return TrackContext;
}());
exports.TrackContext = TrackContext;
_TrackContext_audioUnitBoxAdapter = new WeakMap(), _TrackContext_trackBoxAdapter = new WeakMap(), _TrackContext_element = new WeakMap(), _TrackContext_lifecycle = new WeakMap();
