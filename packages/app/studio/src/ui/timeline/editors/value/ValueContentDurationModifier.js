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
var _ValueContentDurationModifier_instances, _ValueContentDurationModifier_editing, _ValueContentDurationModifier_element, _ValueContentDurationModifier_snapping, _ValueContentDurationModifier_pointerPulse, _ValueContentDurationModifier_reference, _ValueContentDurationModifier_notifier, _ValueContentDurationModifier_deltaLoopDuration, _ValueContentDurationModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueContentDurationModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ValueContentDurationModifier = /** @class */ (function () {
    function ValueContentDurationModifier(_a) {
        var editing = _a.editing, element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, reference = _a.reference;
        _ValueContentDurationModifier_instances.add(this);
        _ValueContentDurationModifier_editing.set(this, void 0);
        _ValueContentDurationModifier_element.set(this, void 0);
        _ValueContentDurationModifier_snapping.set(this, void 0);
        _ValueContentDurationModifier_pointerPulse.set(this, void 0);
        _ValueContentDurationModifier_reference.set(this, void 0);
        _ValueContentDurationModifier_notifier.set(this, void 0);
        _ValueContentDurationModifier_deltaLoopDuration.set(this, void 0);
        __classPrivateFieldSet(this, _ValueContentDurationModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _ValueContentDurationModifier_element, element, "f");
        __classPrivateFieldSet(this, _ValueContentDurationModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _ValueContentDurationModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _ValueContentDurationModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _ValueContentDurationModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _ValueContentDurationModifier_deltaLoopDuration, 0, "f");
    }
    ValueContentDurationModifier.create = function (construct) {
        return new ValueContentDurationModifier(construct);
    };
    ValueContentDurationModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _ValueContentDurationModifier_notifier, "f").subscribe(observer); };
    ValueContentDurationModifier.prototype.showOrigin = function () { return false; };
    ValueContentDurationModifier.prototype.snapValue = function () { return lib_std_1.Option.None; };
    ValueContentDurationModifier.prototype.readPosition = function (event) { return event.position; };
    ValueContentDurationModifier.prototype.readValue = function (event) { return event.value; };
    ValueContentDurationModifier.prototype.readInterpolation = function (event) { return event.interpolation; };
    ValueContentDurationModifier.prototype.translateSearch = function (value) { return value; };
    ValueContentDurationModifier.prototype.isVisible = function (_event) { return true; };
    ValueContentDurationModifier.prototype.iterator = function (searchMin, searchMax) {
        return lib_dsp_1.ValueEvent.iterateWindow(__classPrivateFieldGet(this, _ValueContentDurationModifier_reference, "f").content.events, searchMin, searchMax);
    };
    ValueContentDurationModifier.prototype.readContentDuration = function (region) {
        return Math.max(region.loopDuration + __classPrivateFieldGet(this, _ValueContentDurationModifier_deltaLoopDuration, "f"), Math.min(region.loopDuration, lib_dsp_1.PPQN.SemiQuaver));
    };
    ValueContentDurationModifier.prototype.update = function (_a) {
        var clientX = _a.clientX;
        var clientRect = __classPrivateFieldGet(this, _ValueContentDurationModifier_element, "f").getBoundingClientRect();
        var deltaLoopDuration = __classPrivateFieldGet(this, _ValueContentDurationModifier_snapping, "f")
            .computeDelta(__classPrivateFieldGet(this, _ValueContentDurationModifier_pointerPulse, "f"), clientX - clientRect.left, __classPrivateFieldGet(this, _ValueContentDurationModifier_reference, "f").loopDuration);
        if (__classPrivateFieldGet(this, _ValueContentDurationModifier_deltaLoopDuration, "f") !== deltaLoopDuration) {
            __classPrivateFieldSet(this, _ValueContentDurationModifier_deltaLoopDuration, deltaLoopDuration, "f");
            __classPrivateFieldGet(this, _ValueContentDurationModifier_instances, "m", _ValueContentDurationModifier_dispatchChange).call(this);
        }
    };
    ValueContentDurationModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _ValueContentDurationModifier_deltaLoopDuration, "f") === 0) {
            return;
        }
        __classPrivateFieldGet(this, _ValueContentDurationModifier_editing, "f").modify(function () { return __classPrivateFieldGet(_this, _ValueContentDurationModifier_reference, "f").contentDuration = _this.readContentDuration(__classPrivateFieldGet(_this, _ValueContentDurationModifier_reference, "f")); });
    };
    ValueContentDurationModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _ValueContentDurationModifier_deltaLoopDuration, 0, "f");
        __classPrivateFieldGet(this, _ValueContentDurationModifier_instances, "m", _ValueContentDurationModifier_dispatchChange).call(this);
    };
    return ValueContentDurationModifier;
}());
exports.ValueContentDurationModifier = ValueContentDurationModifier;
_ValueContentDurationModifier_editing = new WeakMap(), _ValueContentDurationModifier_element = new WeakMap(), _ValueContentDurationModifier_snapping = new WeakMap(), _ValueContentDurationModifier_pointerPulse = new WeakMap(), _ValueContentDurationModifier_reference = new WeakMap(), _ValueContentDurationModifier_notifier = new WeakMap(), _ValueContentDurationModifier_deltaLoopDuration = new WeakMap(), _ValueContentDurationModifier_instances = new WeakSet(), _ValueContentDurationModifier_dispatchChange = function _ValueContentDurationModifier_dispatchChange() { __classPrivateFieldGet(this, _ValueContentDurationModifier_notifier, "f").notify(); };
