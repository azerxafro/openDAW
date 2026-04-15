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
var _SelectedModifyStrategy_tool, _NoteDurationModifier_instances, _NoteDurationModifier_editing, _NoteDurationModifier_element, _NoteDurationModifier_selection, _NoteDurationModifier_snapping, _NoteDurationModifier_pointerPulse, _NoteDurationModifier_reference, _NoteDurationModifier_notifier, _NoteDurationModifier_selectedModifyStrategy, _NoteDurationModifier_aligned, _NoteDurationModifier_deltaDuration, _NoteDurationModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteDurationModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies_1 = require("./NoteModifyStrategies");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (adapter) { return adapter.position; };
    SelectedModifyStrategy.prototype.readComplete = function (adapter) {
        var duration = __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").aligned
            ? (__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").reference.position + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").reference.duration + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaDuration) - adapter.position
            : adapter.duration + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaDuration;
        return adapter.position + Math.max(Math.min(__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").snapping.value(adapter.position), adapter.duration), duration);
    };
    SelectedModifyStrategy.prototype.readPitch = function (adapter) { return adapter.pitch; };
    SelectedModifyStrategy.prototype.readVelocity = function (adapter) { return adapter.velocity; };
    SelectedModifyStrategy.prototype.readCent = function (adapter) { return adapter.cent; };
    SelectedModifyStrategy.prototype.readChance = function (adapter) { return adapter.chance; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").selection.selected().reduce(function (from, adapter) { return Math.min(from, adapter.position); }, from), to);
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var NoteDurationModifier = /** @class */ (function () {
    function NoteDurationModifier(_a) {
        var editing = _a.editing, element = _a.element, selection = _a.selection, snapping = _a.snapping, pointerPulse = _a.pointerPulse, reference = _a.reference;
        _NoteDurationModifier_instances.add(this);
        _NoteDurationModifier_editing.set(this, void 0);
        _NoteDurationModifier_element.set(this, void 0);
        _NoteDurationModifier_selection.set(this, void 0);
        _NoteDurationModifier_snapping.set(this, void 0);
        _NoteDurationModifier_pointerPulse.set(this, void 0);
        _NoteDurationModifier_reference.set(this, void 0);
        _NoteDurationModifier_notifier.set(this, void 0);
        _NoteDurationModifier_selectedModifyStrategy.set(this, void 0);
        _NoteDurationModifier_aligned.set(this, void 0);
        _NoteDurationModifier_deltaDuration.set(this, void 0);
        __classPrivateFieldSet(this, _NoteDurationModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_element, element, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_aligned, false, "f");
        __classPrivateFieldSet(this, _NoteDurationModifier_deltaDuration, 0, "f");
    }
    NoteDurationModifier.create = function (construct) {
        return new NoteDurationModifier(construct);
    };
    NoteDurationModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _NoteDurationModifier_notifier, "f").subscribe(observer); };
    Object.defineProperty(NoteDurationModifier.prototype, "aligned", {
        get: function () { return __classPrivateFieldGet(this, _NoteDurationModifier_aligned, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteDurationModifier.prototype, "reference", {
        get: function () { return __classPrivateFieldGet(this, _NoteDurationModifier_reference, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteDurationModifier.prototype, "snapping", {
        get: function () { return __classPrivateFieldGet(this, _NoteDurationModifier_snapping, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteDurationModifier.prototype, "deltaDuration", {
        get: function () { return __classPrivateFieldGet(this, _NoteDurationModifier_deltaDuration, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteDurationModifier.prototype, "selection", {
        get: function () { return __classPrivateFieldGet(this, _NoteDurationModifier_selection, "f"); },
        enumerable: false,
        configurable: true
    });
    NoteDurationModifier.prototype.showOrigin = function () { return false; };
    NoteDurationModifier.prototype.showCreation = function () { return lib_std_1.Option.None; };
    NoteDurationModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.None; };
    NoteDurationModifier.prototype.readContentDuration = function (region) { return region.contentDuration; };
    NoteDurationModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _NoteDurationModifier_selectedModifyStrategy, "f"); };
    NoteDurationModifier.prototype.unselectedModifyStrategy = function () { return NoteModifyStrategies_1.NoteModifyStrategy.Identity; };
    NoteDurationModifier.prototype.update = function (_a) {
        var clientX = _a.clientX, aligned = _a.ctrlKey;
        var clientRect = __classPrivateFieldGet(this, _NoteDurationModifier_element, "f").getBoundingClientRect();
        var deltaDuration = __classPrivateFieldGet(this, _NoteDurationModifier_snapping, "f")
            .computeDelta(__classPrivateFieldGet(this, _NoteDurationModifier_pointerPulse, "f"), clientX - clientRect.left, __classPrivateFieldGet(this, _NoteDurationModifier_reference, "f").duration);
        var change = false;
        if (__classPrivateFieldGet(this, _NoteDurationModifier_aligned, "f") !== aligned) {
            __classPrivateFieldSet(this, _NoteDurationModifier_aligned, aligned, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _NoteDurationModifier_deltaDuration, "f") !== deltaDuration) {
            __classPrivateFieldSet(this, _NoteDurationModifier_deltaDuration, deltaDuration, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _NoteDurationModifier_instances, "m", _NoteDurationModifier_dispatchChange).call(this);
        }
    };
    NoteDurationModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _NoteDurationModifier_deltaDuration, "f") === 0) {
            return;
        }
        var result = __classPrivateFieldGet(this, _NoteDurationModifier_selection, "f").selected()
            .map(function (adapter) { return ({
            adapter: adapter,
            duration: __classPrivateFieldGet(_this, _NoteDurationModifier_selectedModifyStrategy, "f").readComplete(adapter)
                - __classPrivateFieldGet(_this, _NoteDurationModifier_selectedModifyStrategy, "f").readPosition(adapter)
        }); });
        __classPrivateFieldGet(this, _NoteDurationModifier_editing, "f").modify(function () { return result
            .forEach(function (_a) {
            var box = _a.adapter.box, duration = _a.duration;
            return box.duration.setValue(duration);
        }); });
    };
    NoteDurationModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _NoteDurationModifier_deltaDuration, 0, "f");
        __classPrivateFieldGet(this, _NoteDurationModifier_instances, "m", _NoteDurationModifier_dispatchChange).call(this);
    };
    return NoteDurationModifier;
}());
exports.NoteDurationModifier = NoteDurationModifier;
_NoteDurationModifier_editing = new WeakMap(), _NoteDurationModifier_element = new WeakMap(), _NoteDurationModifier_selection = new WeakMap(), _NoteDurationModifier_snapping = new WeakMap(), _NoteDurationModifier_pointerPulse = new WeakMap(), _NoteDurationModifier_reference = new WeakMap(), _NoteDurationModifier_notifier = new WeakMap(), _NoteDurationModifier_selectedModifyStrategy = new WeakMap(), _NoteDurationModifier_aligned = new WeakMap(), _NoteDurationModifier_deltaDuration = new WeakMap(), _NoteDurationModifier_instances = new WeakSet(), _NoteDurationModifier_dispatchChange = function _NoteDurationModifier_dispatchChange() { __classPrivateFieldGet(this, _NoteDurationModifier_notifier, "f").notify(); };
