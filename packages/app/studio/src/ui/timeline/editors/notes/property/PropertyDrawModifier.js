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
var _PropertyDrawModifier_instances, _PropertyDrawModifier_editing, _PropertyDrawModifier_element, _PropertyDrawModifier_property, _PropertyDrawModifier_selection, _PropertyDrawModifier_snapping, _PropertyDrawModifier_valueAxis, _PropertyDrawModifier_reader, _PropertyDrawModifier_notifier, _PropertyDrawModifier_values, _PropertyDrawModifier_lastUnit, _PropertyDrawModifier_modifyProperty, _PropertyDrawModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDrawModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var PropertyAccessor_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyAccessor.ts");
var PropertyDrawModifier = /** @class */ (function () {
    function PropertyDrawModifier(_a) {
        var editing = _a.editing, element = _a.element, property = _a.property, selection = _a.selection, snapping = _a.snapping, valueAxis = _a.valueAxis, reader = _a.reader;
        _PropertyDrawModifier_instances.add(this);
        _PropertyDrawModifier_editing.set(this, void 0);
        _PropertyDrawModifier_element.set(this, void 0);
        _PropertyDrawModifier_property.set(this, void 0);
        _PropertyDrawModifier_selection.set(this, void 0);
        _PropertyDrawModifier_snapping.set(this, void 0);
        _PropertyDrawModifier_valueAxis.set(this, void 0);
        _PropertyDrawModifier_reader.set(this, void 0);
        _PropertyDrawModifier_notifier.set(this, void 0);
        _PropertyDrawModifier_values.set(this, void 0);
        _PropertyDrawModifier_lastUnit.set(this, NaN);
        __classPrivateFieldSet(this, _PropertyDrawModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_element, element, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_property, property, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_valueAxis, valueAxis, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_reader, reader, "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _PropertyDrawModifier_values, new Map(), "f");
    }
    PropertyDrawModifier.create = function (construct) {
        return new PropertyDrawModifier(construct);
    };
    PropertyDrawModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _PropertyDrawModifier_notifier, "f").subscribe(observer); };
    Object.defineProperty(PropertyDrawModifier.prototype, "property", {
        get: function () { return __classPrivateFieldGet(this, _PropertyDrawModifier_property, "f"); },
        enumerable: false,
        configurable: true
    });
    PropertyDrawModifier.prototype.showOrigin = function () { return false; };
    PropertyDrawModifier.prototype.showCreation = function () { return lib_std_1.Option.None; };
    PropertyDrawModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.None; };
    PropertyDrawModifier.prototype.readContentDuration = function (owner) { return owner.contentDuration; };
    PropertyDrawModifier.prototype.selectedModifyStrategy = function () { return this; };
    PropertyDrawModifier.prototype.unselectedModifyStrategy = function () { return this; };
    PropertyDrawModifier.prototype.readPosition = function (adapter) { return adapter.position; };
    PropertyDrawModifier.prototype.readComplete = function (adapter) { return adapter.complete; };
    PropertyDrawModifier.prototype.readPitch = function (adapter) { return adapter.pitch; };
    PropertyDrawModifier.prototype.readVelocity = function (adapter) { return __classPrivateFieldGet(this, _PropertyDrawModifier_instances, "m", _PropertyDrawModifier_modifyProperty).call(this, PropertyAccessor_ts_1.NotePropertyVelocity, adapter); };
    PropertyDrawModifier.prototype.readCent = function (adapter) { return __classPrivateFieldGet(this, _PropertyDrawModifier_instances, "m", _PropertyDrawModifier_modifyProperty).call(this, PropertyAccessor_ts_1.NotePropertyCent, adapter); };
    PropertyDrawModifier.prototype.readChance = function (adapter) { return __classPrivateFieldGet(this, _PropertyDrawModifier_instances, "m", _PropertyDrawModifier_modifyProperty).call(this, PropertyAccessor_ts_1.NotePropertyChance, adapter); };
    PropertyDrawModifier.prototype.iterateRange = function (owners, from, to) {
        return owners.iterateRange(from, to);
    };
    PropertyDrawModifier.prototype.update = function (event) {
        var clientX = event.clientX, clientY = event.clientY;
        var _a = __classPrivateFieldGet(this, _PropertyDrawModifier_element, "f").getBoundingClientRect(), left = _a.left, top = _a.top;
        var u = __classPrivateFieldGet(this, _PropertyDrawModifier_snapping, "f").xToUnitRound(clientX - left) - __classPrivateFieldGet(this, _PropertyDrawModifier_reader, "f").offset;
        if (__classPrivateFieldGet(this, _PropertyDrawModifier_lastUnit, "f") !== u) {
            __classPrivateFieldSet(this, _PropertyDrawModifier_lastUnit, u, "f");
            __classPrivateFieldGet(this, _PropertyDrawModifier_values, "f").set(u, (0, lib_std_1.clamp)(__classPrivateFieldGet(this, _PropertyDrawModifier_valueAxis, "f").axisToValue(clientY - top), 0.0, 1.0));
            __classPrivateFieldGet(this, _PropertyDrawModifier_instances, "m", _PropertyDrawModifier_dispatchChange).call(this);
        }
    };
    PropertyDrawModifier.prototype.approve = function () {
        var _this = this;
        var result = __classPrivateFieldGet(this, _PropertyDrawModifier_reader, "f").content.events.asArray()
            .map(function (adapter) { return ({ adapter: adapter, value: __classPrivateFieldGet(_this, _PropertyDrawModifier_instances, "m", _PropertyDrawModifier_modifyProperty).call(_this, __classPrivateFieldGet(_this, _PropertyDrawModifier_property, "f"), adapter) }); });
        __classPrivateFieldGet(this, _PropertyDrawModifier_editing, "f").modify(function () { return result.forEach(function (_a) {
            var box = _a.adapter.box, value = _a.value;
            return __classPrivateFieldGet(_this, _PropertyDrawModifier_property, "f").writeValue(box, value);
        }); });
    };
    PropertyDrawModifier.prototype.cancel = function () {
        __classPrivateFieldGet(this, _PropertyDrawModifier_values, "f").clear();
        __classPrivateFieldGet(this, _PropertyDrawModifier_instances, "m", _PropertyDrawModifier_dispatchChange).call(this);
    };
    return PropertyDrawModifier;
}());
exports.PropertyDrawModifier = PropertyDrawModifier;
_PropertyDrawModifier_editing = new WeakMap(), _PropertyDrawModifier_element = new WeakMap(), _PropertyDrawModifier_property = new WeakMap(), _PropertyDrawModifier_selection = new WeakMap(), _PropertyDrawModifier_snapping = new WeakMap(), _PropertyDrawModifier_valueAxis = new WeakMap(), _PropertyDrawModifier_reader = new WeakMap(), _PropertyDrawModifier_notifier = new WeakMap(), _PropertyDrawModifier_values = new WeakMap(), _PropertyDrawModifier_lastUnit = new WeakMap(), _PropertyDrawModifier_instances = new WeakSet(), _PropertyDrawModifier_modifyProperty = function _PropertyDrawModifier_modifyProperty(propertyAccessor, event) {
    var _a;
    var fallbackValue = propertyAccessor.readRawValue(event);
    var emptySelection = __classPrivateFieldGet(this, _PropertyDrawModifier_selection, "f").isEmpty();
    if (!emptySelection && !event.isSelected) {
        return fallbackValue;
    }
    if (propertyAccessor === __classPrivateFieldGet(this, _PropertyDrawModifier_property, "f")) {
        return (_a = __classPrivateFieldGet(this, _PropertyDrawModifier_values, "f").get(event.position)) !== null && _a !== void 0 ? _a : fallbackValue;
    }
    else {
        return fallbackValue; // case other property
    }
}, _PropertyDrawModifier_dispatchChange = function _PropertyDrawModifier_dispatchChange() { __classPrivateFieldGet(this, _PropertyDrawModifier_notifier, "f").notify(); };
