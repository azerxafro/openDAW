"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _NoteCreateModifier_editing, _NoteCreateModifier_element, _NoteCreateModifier_snapping, _NoteCreateModifier_selection, _NoteCreateModifier_pointerPulse, _NoteCreateModifier_reference, _NoteCreateModifier_notifier, _NoteCreateModifier_creation, _NoteCreateModifier_deltaLoopDuration;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteCreateModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies_1 = require("./NoteModifyStrategies");
var NoteCreateModifier = /** @class */ (function () {
    function NoteCreateModifier(_a) {
        var editing = _a.editing, element = _a.element, snapping = _a.snapping, selection = _a.selection, pointerPulse = _a.pointerPulse, pointerPitch = _a.pointerPitch, reference = _a.reference;
        _NoteCreateModifier_editing.set(this, void 0);
        _NoteCreateModifier_element.set(this, void 0);
        _NoteCreateModifier_snapping.set(this, void 0);
        _NoteCreateModifier_selection.set(this, void 0);
        _NoteCreateModifier_pointerPulse.set(this, void 0);
        _NoteCreateModifier_reference.set(this, void 0);
        _NoteCreateModifier_notifier.set(this, void 0);
        _NoteCreateModifier_creation.set(this, void 0);
        _NoteCreateModifier_deltaLoopDuration.set(this, 0.0);
        __classPrivateFieldSet(this, _NoteCreateModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _NoteCreateModifier_element, element, "f");
        __classPrivateFieldSet(this, _NoteCreateModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _NoteCreateModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _NoteCreateModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _NoteCreateModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _NoteCreateModifier_notifier, new lib_std_1.Notifier(), "f");
        var position = __classPrivateFieldGet(this, _NoteCreateModifier_snapping, "f").floor(pointerPulse);
        var snapValue = snapping.value(position);
        __classPrivateFieldSet(this, _NoteCreateModifier_creation, {
            type: "note-event",
            position: position,
            pitch: pointerPitch,
            duration: snapValue,
            complete: position + snapValue,
            cent: 0.0,
            chance: 100,
            playCount: 1,
            playCurve: 0.0,
            velocity: 1.0,
            isSelected: true
        }, "f");
    }
    NoteCreateModifier.create = function (construct) {
        return new NoteCreateModifier(construct);
    };
    NoteCreateModifier.prototype.subscribeUpdate = function (observer) {
        observer();
        return __classPrivateFieldGet(this, _NoteCreateModifier_notifier, "f").subscribe(observer);
    };
    NoteCreateModifier.prototype.showOrigin = function () { return false; };
    NoteCreateModifier.prototype.showCreation = function () { return lib_std_1.Option.wrap(__classPrivateFieldGet(this, _NoteCreateModifier_creation, "f")); };
    NoteCreateModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.None; };
    NoteCreateModifier.prototype.readContentDuration = function (region) { return region.contentDuration; };
    NoteCreateModifier.prototype.selectedModifyStrategy = function () {
        var _this = this;
        return __assign(__assign({}, NoteModifyStrategies_1.NoteModifyStrategy.Identity), { iterateRange: function (events, from, to) {
                return lib_std_1.IterableIterators.flatten(events.iterateRange(from, to), [__classPrivateFieldGet(_this, _NoteCreateModifier_creation, "f")]);
            } });
    };
    NoteCreateModifier.prototype.unselectedModifyStrategy = function () { return NoteModifyStrategies_1.NoteModifyStrategy.Identity; };
    NoteCreateModifier.prototype.update = function (_a) {
        var clientX = _a.clientX;
        var clientRect = __classPrivateFieldGet(this, _NoteCreateModifier_element, "f").getBoundingClientRect();
        var minDuration = __classPrivateFieldGet(this, _NoteCreateModifier_snapping, "f").value(__classPrivateFieldGet(this, _NoteCreateModifier_creation, "f").position);
        var deltaLoopDuration = __classPrivateFieldGet(this, _NoteCreateModifier_snapping, "f")
            .computeDelta(__classPrivateFieldGet(this, _NoteCreateModifier_pointerPulse, "f"), clientX - clientRect.left, minDuration);
        if (__classPrivateFieldGet(this, _NoteCreateModifier_deltaLoopDuration, "f") !== deltaLoopDuration) {
            __classPrivateFieldSet(this, _NoteCreateModifier_deltaLoopDuration, deltaLoopDuration, "f");
            __classPrivateFieldGet(this, _NoteCreateModifier_creation, "f").duration = Math.max(minDuration + __classPrivateFieldGet(this, _NoteCreateModifier_deltaLoopDuration, "f") - __classPrivateFieldGet(this, _NoteCreateModifier_reference, "f").offset, minDuration);
            __classPrivateFieldGet(this, _NoteCreateModifier_notifier, "f").notify();
        }
    };
    NoteCreateModifier.prototype.approve = function () {
        var _this = this;
        __classPrivateFieldGet(this, _NoteCreateModifier_editing, "f").modify(function () {
            __classPrivateFieldGet(_this, _NoteCreateModifier_selection, "f").deselectAll();
            __classPrivateFieldGet(_this, _NoteCreateModifier_selection, "f").select(__classPrivateFieldGet(_this, _NoteCreateModifier_reference, "f").content.createEvent(__classPrivateFieldGet(_this, _NoteCreateModifier_creation, "f")));
        });
    };
    NoteCreateModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _NoteCreateModifier_deltaLoopDuration, 0, "f");
        __classPrivateFieldGet(this, _NoteCreateModifier_notifier, "f").notify();
    };
    return NoteCreateModifier;
}());
exports.NoteCreateModifier = NoteCreateModifier;
_NoteCreateModifier_editing = new WeakMap(), _NoteCreateModifier_element = new WeakMap(), _NoteCreateModifier_snapping = new WeakMap(), _NoteCreateModifier_selection = new WeakMap(), _NoteCreateModifier_pointerPulse = new WeakMap(), _NoteCreateModifier_reference = new WeakMap(), _NoteCreateModifier_notifier = new WeakMap(), _NoteCreateModifier_creation = new WeakMap(), _NoteCreateModifier_deltaLoopDuration = new WeakMap();
