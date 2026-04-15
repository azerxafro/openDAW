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
var _NoteContentDurationModifier_instances, _NoteContentDurationModifier_editing, _NoteContentDurationModifier_element, _NoteContentDurationModifier_snapping, _NoteContentDurationModifier_pointerPulse, _NoteContentDurationModifier_reference, _NoteContentDurationModifier_notifier, _NoteContentDurationModifier_deltaLoopDuration, _NoteContentDurationModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteContentDurationModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies_1 = require("./NoteModifyStrategies");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var NoteContentDurationModifier = /** @class */ (function () {
    function NoteContentDurationModifier(_a) {
        var editing = _a.editing, element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, reference = _a.reference;
        _NoteContentDurationModifier_instances.add(this);
        _NoteContentDurationModifier_editing.set(this, void 0);
        _NoteContentDurationModifier_element.set(this, void 0);
        _NoteContentDurationModifier_snapping.set(this, void 0);
        _NoteContentDurationModifier_pointerPulse.set(this, void 0);
        _NoteContentDurationModifier_reference.set(this, void 0);
        _NoteContentDurationModifier_notifier.set(this, void 0);
        _NoteContentDurationModifier_deltaLoopDuration.set(this, void 0);
        __classPrivateFieldSet(this, _NoteContentDurationModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _NoteContentDurationModifier_element, element, "f");
        __classPrivateFieldSet(this, _NoteContentDurationModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _NoteContentDurationModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _NoteContentDurationModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _NoteContentDurationModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _NoteContentDurationModifier_deltaLoopDuration, 0, "f");
    }
    NoteContentDurationModifier.create = function (construct) {
        return new NoteContentDurationModifier(construct);
    };
    NoteContentDurationModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _NoteContentDurationModifier_notifier, "f").subscribe(observer); };
    NoteContentDurationModifier.prototype.showOrigin = function () { return false; };
    NoteContentDurationModifier.prototype.showCreation = function () { return lib_std_1.Option.None; };
    NoteContentDurationModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.None; };
    NoteContentDurationModifier.prototype.readContentDuration = function (region) {
        return Math.max(region.loopDuration + __classPrivateFieldGet(this, _NoteContentDurationModifier_deltaLoopDuration, "f"), Math.min(region.loopDuration, lib_dsp_1.PPQN.SemiQuaver));
    };
    NoteContentDurationModifier.prototype.selectedModifyStrategy = function () { return NoteModifyStrategies_1.NoteModifyStrategy.Identity; };
    NoteContentDurationModifier.prototype.unselectedModifyStrategy = function () { return NoteModifyStrategies_1.NoteModifyStrategy.Identity; };
    NoteContentDurationModifier.prototype.update = function (_a) {
        var clientX = _a.clientX;
        var clientRect = __classPrivateFieldGet(this, _NoteContentDurationModifier_element, "f").getBoundingClientRect();
        var deltaLoopDuration = __classPrivateFieldGet(this, _NoteContentDurationModifier_snapping, "f")
            .computeDelta(__classPrivateFieldGet(this, _NoteContentDurationModifier_pointerPulse, "f"), clientX - clientRect.left, __classPrivateFieldGet(this, _NoteContentDurationModifier_reference, "f").loopDuration);
        if (__classPrivateFieldGet(this, _NoteContentDurationModifier_deltaLoopDuration, "f") !== deltaLoopDuration) {
            __classPrivateFieldSet(this, _NoteContentDurationModifier_deltaLoopDuration, deltaLoopDuration, "f");
            __classPrivateFieldGet(this, _NoteContentDurationModifier_instances, "m", _NoteContentDurationModifier_dispatchChange).call(this);
        }
    };
    NoteContentDurationModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _NoteContentDurationModifier_deltaLoopDuration, "f") === 0) {
            return;
        }
        __classPrivateFieldGet(this, _NoteContentDurationModifier_editing, "f").modify(function () {
            return __classPrivateFieldGet(_this, _NoteContentDurationModifier_reference, "f").contentDuration = _this.readContentDuration(__classPrivateFieldGet(_this, _NoteContentDurationModifier_reference, "f"));
        });
    };
    NoteContentDurationModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _NoteContentDurationModifier_deltaLoopDuration, 0, "f");
        __classPrivateFieldGet(this, _NoteContentDurationModifier_instances, "m", _NoteContentDurationModifier_dispatchChange).call(this);
    };
    return NoteContentDurationModifier;
}());
exports.NoteContentDurationModifier = NoteContentDurationModifier;
_NoteContentDurationModifier_editing = new WeakMap(), _NoteContentDurationModifier_element = new WeakMap(), _NoteContentDurationModifier_snapping = new WeakMap(), _NoteContentDurationModifier_pointerPulse = new WeakMap(), _NoteContentDurationModifier_reference = new WeakMap(), _NoteContentDurationModifier_notifier = new WeakMap(), _NoteContentDurationModifier_deltaLoopDuration = new WeakMap(), _NoteContentDurationModifier_instances = new WeakSet(), _NoteContentDurationModifier_dispatchChange = function _NoteContentDurationModifier_dispatchChange() { __classPrivateFieldGet(this, _NoteContentDurationModifier_notifier, "f").notify(); };
