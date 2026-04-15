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
var _SelectedModifyStrategy_tool, _NoteMoveModifier_instances, _NoteMoveModifier_editing, _NoteMoveModifier_element, _NoteMoveModifier_selection, _NoteMoveModifier_positioner, _NoteMoveModifier_snapping, _NoteMoveModifier_pointerPulse, _NoteMoveModifier_pointerPitch, _NoteMoveModifier_reference, _NoteMoveModifier_notifier, _NoteMoveModifier_pitchChanged, _NoteMoveModifier_selectedModifyStrategy, _NoteMoveModifier_copy, _NoteMoveModifier_repeat, _NoteMoveModifier_deltaPitch, _NoteMoveModifier_deltaPosition, _NoteMoveModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteMoveModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies_1 = require("./NoteModifyStrategies");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (adapter) { return adapter.position + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition; };
    SelectedModifyStrategy.prototype.readComplete = function (adapter) { return adapter.complete + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition; };
    SelectedModifyStrategy.prototype.readPitch = function (adapter) { return (0, lib_std_1.clamp)(adapter.pitch + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPitch, 0, 127); };
    SelectedModifyStrategy.prototype.readVelocity = function (adapter) { return adapter.velocity; };
    SelectedModifyStrategy.prototype.readCent = function (adapter) { return adapter.cent; };
    SelectedModifyStrategy.prototype.readChance = function (adapter) { return adapter.chance; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(from - __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition, to - __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition);
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var NoteMoveModifier = /** @class */ (function () {
    function NoteMoveModifier(_a) {
        var editing = _a.editing, element = _a.element, selection = _a.selection, positioner = _a.positioner, snapping = _a.snapping, pointerPulse = _a.pointerPulse, pointerPitch = _a.pointerPitch, reference = _a.reference;
        _NoteMoveModifier_instances.add(this);
        _NoteMoveModifier_editing.set(this, void 0);
        _NoteMoveModifier_element.set(this, void 0);
        _NoteMoveModifier_selection.set(this, void 0);
        _NoteMoveModifier_positioner.set(this, void 0);
        _NoteMoveModifier_snapping.set(this, void 0);
        _NoteMoveModifier_pointerPulse.set(this, void 0);
        _NoteMoveModifier_pointerPitch.set(this, void 0);
        _NoteMoveModifier_reference.set(this, void 0);
        _NoteMoveModifier_notifier.set(this, void 0);
        _NoteMoveModifier_pitchChanged.set(this, void 0);
        _NoteMoveModifier_selectedModifyStrategy.set(this, void 0);
        _NoteMoveModifier_copy.set(this, void 0);
        _NoteMoveModifier_repeat.set(this, void 0);
        _NoteMoveModifier_deltaPitch.set(this, void 0);
        _NoteMoveModifier_deltaPosition.set(this, void 0);
        __classPrivateFieldSet(this, _NoteMoveModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_element, element, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_positioner, positioner, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_pointerPitch, pointerPitch, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_pitchChanged, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_copy, false, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_repeat, false, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_deltaPitch, 0, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_deltaPosition, 0, "f");
    }
    NoteMoveModifier.create = function (construct) { return new NoteMoveModifier(construct); };
    NoteMoveModifier.prototype.subscribePitchChanged = function (observer) { return __classPrivateFieldGet(this, _NoteMoveModifier_pitchChanged, "f").subscribe(observer); };
    NoteMoveModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _NoteMoveModifier_notifier, "f").subscribe(observer); };
    Object.defineProperty(NoteMoveModifier.prototype, "copy", {
        get: function () { return __classPrivateFieldGet(this, _NoteMoveModifier_copy, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteMoveModifier.prototype, "deltaPitch", {
        get: function () { return __classPrivateFieldGet(this, _NoteMoveModifier_deltaPitch, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteMoveModifier.prototype, "deltaPosition", {
        get: function () { return __classPrivateFieldGet(this, _NoteMoveModifier_deltaPosition, "f"); },
        enumerable: false,
        configurable: true
    });
    NoteMoveModifier.prototype.showOrigin = function () { return __classPrivateFieldGet(this, _NoteMoveModifier_copy, "f"); };
    NoteMoveModifier.prototype.showCreation = function () { return lib_std_1.Option.None; };
    NoteMoveModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.None; };
    NoteMoveModifier.prototype.readContentDuration = function (region) { return region.contentDuration; };
    NoteMoveModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _NoteMoveModifier_selectedModifyStrategy, "f"); };
    NoteMoveModifier.prototype.unselectedModifyStrategy = function () { return NoteModifyStrategies_1.NoteModifyStrategy.Identity; };
    NoteMoveModifier.prototype.update = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY, ctrlKey = _a.ctrlKey, shiftKey = _a.shiftKey;
        var clientRect = __classPrivateFieldGet(this, _NoteMoveModifier_element, "f").getBoundingClientRect();
        var deltaPitch = __classPrivateFieldGet(this, _NoteMoveModifier_positioner, "f")
            .yToPitch(clientY - clientRect.top) - __classPrivateFieldGet(this, _NoteMoveModifier_pointerPitch, "f");
        var deltaPosition = __classPrivateFieldGet(this, _NoteMoveModifier_snapping, "f")
            .computeDelta(__classPrivateFieldGet(this, _NoteMoveModifier_pointerPulse, "f"), clientX - clientRect.left, __classPrivateFieldGet(this, _NoteMoveModifier_reference, "f").position);
        var change = false;
        if (__classPrivateFieldGet(this, _NoteMoveModifier_deltaPosition, "f") !== deltaPosition) {
            __classPrivateFieldSet(this, _NoteMoveModifier_deltaPosition, deltaPosition, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _NoteMoveModifier_deltaPitch, "f") !== deltaPitch) {
            __classPrivateFieldSet(this, _NoteMoveModifier_deltaPitch, deltaPitch, "f");
            __classPrivateFieldGet(this, _NoteMoveModifier_pitchChanged, "f").notify(__classPrivateFieldGet(this, _NoteMoveModifier_reference, "f").pitch + deltaPitch);
            change = true;
        }
        if (__classPrivateFieldGet(this, _NoteMoveModifier_copy, "f") !== ctrlKey) {
            __classPrivateFieldSet(this, _NoteMoveModifier_copy, ctrlKey, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _NoteMoveModifier_instances, "m", _NoteMoveModifier_dispatchChange).call(this);
        }
        __classPrivateFieldSet(this, _NoteMoveModifier_repeat, shiftKey, "f");
    };
    NoteMoveModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _NoteMoveModifier_deltaPitch, "f") === 0 && __classPrivateFieldGet(this, _NoteMoveModifier_deltaPosition, "f") === 0) {
            if (__classPrivateFieldGet(this, _NoteMoveModifier_copy, "f")) {
                __classPrivateFieldGet(this, _NoteMoveModifier_instances, "m", _NoteMoveModifier_dispatchChange).call(this);
            } // reset visuals
            return;
        }
        var result = __classPrivateFieldGet(this, _NoteMoveModifier_selection, "f").selected()
            .map(function (adapter) { return ({
            adapter: adapter,
            pitch: __classPrivateFieldGet(_this, _NoteMoveModifier_selectedModifyStrategy, "f").readPitch(adapter),
            position: __classPrivateFieldGet(_this, _NoteMoveModifier_selectedModifyStrategy, "f").readPosition(adapter)
        }); });
        __classPrivateFieldGet(this, _NoteMoveModifier_editing, "f").modify(function () {
            var _a;
            if (__classPrivateFieldGet(_this, _NoteMoveModifier_copy, "f")) {
                __classPrivateFieldGet(_this, _NoteMoveModifier_selection, "f").deselectAll();
                var events_1 = __classPrivateFieldGet(_this, _NoteMoveModifier_reference, "f").collection.unwrap().box.events;
                if (__classPrivateFieldGet(_this, _NoteMoveModifier_repeat, "f") && __classPrivateFieldGet(_this, _NoteMoveModifier_deltaPosition, "f") !== 0) {
                    var numberOfCopies = 1; // TODO Open a dialog and ask for number of copies
                    var _loop_1 = function (i) {
                        result.map(function (_a) {
                            var adapter = _a.adapter, position = _a.position;
                            return adapter.copyTo({
                                position: position + __classPrivateFieldGet(_this, _NoteMoveModifier_deltaPosition, "f") * i,
                                pitch: __classPrivateFieldGet(_this, _NoteMoveModifier_selectedModifyStrategy, "f").readPitch(adapter),
                                events: events_1
                            });
                        });
                    };
                    for (var i = 0; i < numberOfCopies; i++) {
                        _loop_1(i);
                    }
                }
                else {
                    (_a = __classPrivateFieldGet(_this, _NoteMoveModifier_selection, "f")).select.apply(_a, (result
                        .map(function (_a) {
                        var adapter = _a.adapter, position = _a.position, pitch = _a.pitch;
                        return adapter.copyTo({ position: position, pitch: pitch, events: events_1 });
                    })));
                }
            }
            else {
                result.forEach(function (_a) {
                    var box = _a.adapter.box, position = _a.position, pitch = _a.pitch;
                    box.pitch.setValue(pitch);
                    box.position.setValue(position);
                });
            }
        });
        __classPrivateFieldGet(this, _NoteMoveModifier_pitchChanged, "f").terminate();
    };
    NoteMoveModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _NoteMoveModifier_deltaPitch, 0, "f");
        __classPrivateFieldSet(this, _NoteMoveModifier_deltaPosition, 0, "f");
        __classPrivateFieldGet(this, _NoteMoveModifier_instances, "m", _NoteMoveModifier_dispatchChange).call(this);
        __classPrivateFieldGet(this, _NoteMoveModifier_pitchChanged, "f").terminate();
    };
    return NoteMoveModifier;
}());
exports.NoteMoveModifier = NoteMoveModifier;
_NoteMoveModifier_editing = new WeakMap(), _NoteMoveModifier_element = new WeakMap(), _NoteMoveModifier_selection = new WeakMap(), _NoteMoveModifier_positioner = new WeakMap(), _NoteMoveModifier_snapping = new WeakMap(), _NoteMoveModifier_pointerPulse = new WeakMap(), _NoteMoveModifier_pointerPitch = new WeakMap(), _NoteMoveModifier_reference = new WeakMap(), _NoteMoveModifier_notifier = new WeakMap(), _NoteMoveModifier_pitchChanged = new WeakMap(), _NoteMoveModifier_selectedModifyStrategy = new WeakMap(), _NoteMoveModifier_copy = new WeakMap(), _NoteMoveModifier_repeat = new WeakMap(), _NoteMoveModifier_deltaPitch = new WeakMap(), _NoteMoveModifier_deltaPosition = new WeakMap(), _NoteMoveModifier_instances = new WeakSet(), _NoteMoveModifier_dispatchChange = function _NoteMoveModifier_dispatchChange() { __classPrivateFieldGet(this, _NoteMoveModifier_notifier, "f").notify(); };
