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
var _ValueSlopeModifier_instances, _ValueSlopeModifier_editing, _ValueSlopeModifier_element, _ValueSlopeModifier_reference, _ValueSlopeModifier_successor, _ValueSlopeModifier_collection, _ValueSlopeModifier_notifier, _ValueSlopeModifier_y0, _ValueSlopeModifier_y1, _ValueSlopeModifier_initialMidY, _ValueSlopeModifier_slope, _ValueSlopeModifier_lastLocalY, _ValueSlopeModifier_accumulatedDeltaY, _ValueSlopeModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueSlopeModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ValueSlopeModifier = /** @class */ (function () {
    function ValueSlopeModifier(_a) {
        var editing = _a.editing, element = _a.element, valueAxis = _a.valueAxis, reference = _a.reference, collection = _a.collection;
        var _b;
        _ValueSlopeModifier_instances.add(this);
        _ValueSlopeModifier_editing.set(this, void 0);
        _ValueSlopeModifier_element.set(this, void 0);
        _ValueSlopeModifier_reference.set(this, void 0);
        _ValueSlopeModifier_successor.set(this, void 0);
        _ValueSlopeModifier_collection.set(this, void 0);
        _ValueSlopeModifier_notifier.set(this, void 0);
        _ValueSlopeModifier_y0.set(this, void 0);
        _ValueSlopeModifier_y1.set(this, void 0);
        _ValueSlopeModifier_initialMidY.set(this, void 0);
        _ValueSlopeModifier_slope.set(this, void 0);
        _ValueSlopeModifier_lastLocalY.set(this, NaN);
        _ValueSlopeModifier_accumulatedDeltaY.set(this, 0);
        __classPrivateFieldSet(this, _ValueSlopeModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_element, element, "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_successor, (_b = lib_dsp_1.ValueEvent.nextEvent(collection.events, reference)) !== null && _b !== void 0 ? _b : (0, lib_std_1.panic)("No successor event"), "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_collection, collection, "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_notifier, new lib_std_1.Notifier(), "f");
        var interpolation = reference.interpolation;
        __classPrivateFieldSet(this, _ValueSlopeModifier_slope, interpolation.type === "curve" ? interpolation.slope : 0.5, "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_y0, valueAxis.valueToAxis(reference.value), "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_y1, valueAxis.valueToAxis(__classPrivateFieldGet(this, _ValueSlopeModifier_successor, "f").value), "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_initialMidY, lib_std_1.Curve.normalizedAt(0.5, __classPrivateFieldGet(this, _ValueSlopeModifier_slope, "f")) * (__classPrivateFieldGet(this, _ValueSlopeModifier_y1, "f") - __classPrivateFieldGet(this, _ValueSlopeModifier_y0, "f")) + __classPrivateFieldGet(this, _ValueSlopeModifier_y0, "f"), "f");
    }
    ValueSlopeModifier.create = function (construct) { return new ValueSlopeModifier(construct); };
    ValueSlopeModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _ValueSlopeModifier_notifier, "f").subscribe(observer); };
    ValueSlopeModifier.prototype.showOrigin = function () { return false; };
    ValueSlopeModifier.prototype.snapValue = function () { return lib_std_1.Option.None; };
    ValueSlopeModifier.prototype.translateSearch = function (value) { return value; };
    ValueSlopeModifier.prototype.isVisible = function (_event) { return true; };
    ValueSlopeModifier.prototype.readPosition = function (event) { return event.position; };
    ValueSlopeModifier.prototype.readValue = function (event) { return event.value; };
    ValueSlopeModifier.prototype.readInterpolation = function (event) {
        if (event !== __classPrivateFieldGet(this, _ValueSlopeModifier_reference, "f")) {
            return event.interpolation;
        }
        return __classPrivateFieldGet(this, _ValueSlopeModifier_slope, "f") === 0.5 ? lib_dsp_1.Interpolation.Linear : lib_dsp_1.Interpolation.Curve(__classPrivateFieldGet(this, _ValueSlopeModifier_slope, "f"));
    };
    ValueSlopeModifier.prototype.readContentDuration = function (owner) { return owner.contentDuration; };
    ValueSlopeModifier.prototype.iterator = function (searchMin, searchMax) {
        var _this = this;
        return lib_std_1.Iterables.map(lib_dsp_1.ValueEvent.iterateWindow(__classPrivateFieldGet(this, _ValueSlopeModifier_collection, "f").events, searchMin, searchMax), function (event) { return ({
            type: "value-event",
            position: event.position,
            value: event.value,
            interpolation: _this.readInterpolation(event),
            index: event.index,
            isSelected: event.isSelected,
            direction: 0
        }); });
    };
    ValueSlopeModifier.prototype.update = function (_a) {
        var clientY = _a.clientY, altKey = _a.altKey;
        var clientRect = __classPrivateFieldGet(this, _ValueSlopeModifier_element, "f").getBoundingClientRect();
        var localY = clientY - clientRect.top;
        if (Number.isNaN(__classPrivateFieldGet(this, _ValueSlopeModifier_lastLocalY, "f"))) {
            __classPrivateFieldSet(this, _ValueSlopeModifier_lastLocalY, localY, "f");
        }
        else {
            var incrementalDelta = localY - __classPrivateFieldGet(this, _ValueSlopeModifier_lastLocalY, "f");
            __classPrivateFieldSet(this, _ValueSlopeModifier_accumulatedDeltaY, __classPrivateFieldGet(this, _ValueSlopeModifier_accumulatedDeltaY, "f") + incrementalDelta * (altKey ? 0.1 : 1.0), "f");
            __classPrivateFieldSet(this, _ValueSlopeModifier_lastLocalY, localY, "f");
        }
        var targetY = __classPrivateFieldGet(this, _ValueSlopeModifier_initialMidY, "f") + __classPrivateFieldGet(this, _ValueSlopeModifier_accumulatedDeltaY, "f");
        var slope = (0, lib_std_1.clampUnit)(lib_std_1.Curve.slopeByHalf(__classPrivateFieldGet(this, _ValueSlopeModifier_y0, "f"), targetY, __classPrivateFieldGet(this, _ValueSlopeModifier_y1, "f")));
        if (!altKey && Math.abs(slope - 0.5) < 0.02) {
            slope = 0.5;
        }
        if (__classPrivateFieldGet(this, _ValueSlopeModifier_slope, "f") !== slope) {
            __classPrivateFieldSet(this, _ValueSlopeModifier_slope, slope, "f");
            __classPrivateFieldGet(this, _ValueSlopeModifier_instances, "m", _ValueSlopeModifier_dispatchChange).call(this);
        }
    };
    ValueSlopeModifier.prototype.approve = function () {
        var _this = this;
        var interpolation = __classPrivateFieldGet(this, _ValueSlopeModifier_slope, "f") === 0.5 ? lib_dsp_1.Interpolation.Linear : lib_dsp_1.Interpolation.Curve(__classPrivateFieldGet(this, _ValueSlopeModifier_slope, "f"));
        __classPrivateFieldGet(this, _ValueSlopeModifier_editing, "f").modify(function () { return __classPrivateFieldGet(_this, _ValueSlopeModifier_reference, "f").interpolation = interpolation; });
    };
    ValueSlopeModifier.prototype.cancel = function () {
        var interpolation = __classPrivateFieldGet(this, _ValueSlopeModifier_reference, "f").interpolation;
        __classPrivateFieldSet(this, _ValueSlopeModifier_slope, interpolation.type === "curve" ? interpolation.slope : 0.5, "f");
        __classPrivateFieldSet(this, _ValueSlopeModifier_accumulatedDeltaY, 0, "f");
        __classPrivateFieldGet(this, _ValueSlopeModifier_instances, "m", _ValueSlopeModifier_dispatchChange).call(this);
    };
    return ValueSlopeModifier;
}());
exports.ValueSlopeModifier = ValueSlopeModifier;
_ValueSlopeModifier_editing = new WeakMap(), _ValueSlopeModifier_element = new WeakMap(), _ValueSlopeModifier_reference = new WeakMap(), _ValueSlopeModifier_successor = new WeakMap(), _ValueSlopeModifier_collection = new WeakMap(), _ValueSlopeModifier_notifier = new WeakMap(), _ValueSlopeModifier_y0 = new WeakMap(), _ValueSlopeModifier_y1 = new WeakMap(), _ValueSlopeModifier_initialMidY = new WeakMap(), _ValueSlopeModifier_slope = new WeakMap(), _ValueSlopeModifier_lastLocalY = new WeakMap(), _ValueSlopeModifier_accumulatedDeltaY = new WeakMap(), _ValueSlopeModifier_instances = new WeakSet(), _ValueSlopeModifier_dispatchChange = function _ValueSlopeModifier_dispatchChange() { __classPrivateFieldGet(this, _ValueSlopeModifier_notifier, "f").notify(); };
