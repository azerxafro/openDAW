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
var _SelectedModifyStrategy_tool, _PropertyNodeModifier_instances, _PropertyNodeModifier_editing, _PropertyNodeModifier_element, _PropertyNodeModifier_selection, _PropertyNodeModifier_property, _PropertyNodeModifier_valueAxis, _PropertyNodeModifier_pointerValue, _PropertyNodeModifier_notifier, _PropertyNodeModifier_selectedModifyStrategy, _PropertyNodeModifier_deltaProperty, _PropertyNodeModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyNodeModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies_ts_1 = require("../NoteModifyStrategies.ts");
var PropertyAccessor_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyAccessor.ts");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (adapter) { return adapter.position; };
    SelectedModifyStrategy.prototype.readComplete = function (adapter) { return adapter.complete; };
    SelectedModifyStrategy.prototype.readPitch = function (adapter) { return adapter.pitch; };
    SelectedModifyStrategy.prototype.readVelocity = function (adapter) { return this.modifyProperty(PropertyAccessor_ts_1.NotePropertyVelocity, adapter); };
    SelectedModifyStrategy.prototype.readCent = function (adapter) { return this.modifyProperty(PropertyAccessor_ts_1.NotePropertyCent, adapter); };
    SelectedModifyStrategy.prototype.readChance = function (adapter) { return this.modifyProperty(PropertyAccessor_ts_1.NotePropertyChance, adapter); };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(from, to);
    };
    SelectedModifyStrategy.prototype.modifyProperty = function (propertyAccessor, event) {
        var toolProperty = __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").property;
        var rawValue = propertyAccessor.readRawValue(event);
        if (propertyAccessor === toolProperty) {
            var valueMapping = toolProperty.valueMapping;
            return valueMapping.y((0, lib_std_1.clamp)(valueMapping.x(rawValue) + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaProperty, 0.0, 1.0));
        }
        else {
            return rawValue;
        }
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var PropertyNodeModifier = /** @class */ (function () {
    function PropertyNodeModifier(_a) {
        var editing = _a.editing, element = _a.element, selection = _a.selection, property = _a.property, valueAxis = _a.valueAxis, pointerValue = _a.pointerValue;
        _PropertyNodeModifier_instances.add(this);
        _PropertyNodeModifier_editing.set(this, void 0);
        _PropertyNodeModifier_element.set(this, void 0);
        _PropertyNodeModifier_selection.set(this, void 0);
        _PropertyNodeModifier_property.set(this, void 0);
        _PropertyNodeModifier_valueAxis.set(this, void 0);
        _PropertyNodeModifier_pointerValue.set(this, void 0);
        _PropertyNodeModifier_notifier.set(this, void 0);
        _PropertyNodeModifier_selectedModifyStrategy.set(this, void 0);
        _PropertyNodeModifier_deltaProperty.set(this, void 0);
        __classPrivateFieldSet(this, _PropertyNodeModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_element, element, "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_property, property, "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_valueAxis, valueAxis, "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_pointerValue, pointerValue, "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _PropertyNodeModifier_deltaProperty, 0.0, "f");
    }
    PropertyNodeModifier.create = function (construct) {
        return new PropertyNodeModifier(construct);
    };
    PropertyNodeModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _PropertyNodeModifier_notifier, "f").subscribe(observer); };
    Object.defineProperty(PropertyNodeModifier.prototype, "property", {
        get: function () { return __classPrivateFieldGet(this, _PropertyNodeModifier_property, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropertyNodeModifier.prototype, "deltaProperty", {
        get: function () { return __classPrivateFieldGet(this, _PropertyNodeModifier_deltaProperty, "f"); },
        enumerable: false,
        configurable: true
    });
    PropertyNodeModifier.prototype.showOrigin = function () { return false; };
    PropertyNodeModifier.prototype.showCreation = function () { return lib_std_1.Option.None; };
    PropertyNodeModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.None; };
    PropertyNodeModifier.prototype.readContentDuration = function (region) { return region.contentDuration; };
    PropertyNodeModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _PropertyNodeModifier_selectedModifyStrategy, "f"); };
    PropertyNodeModifier.prototype.unselectedModifyStrategy = function () { return NoteModifyStrategies_ts_1.NoteModifyStrategy.Identity; };
    PropertyNodeModifier.prototype.update = function (_a) {
        var clientY = _a.clientY;
        var clientRect = __classPrivateFieldGet(this, _PropertyNodeModifier_element, "f").getBoundingClientRect();
        var deltaProperty = __classPrivateFieldGet(this, _PropertyNodeModifier_valueAxis, "f").axisToValue(clientY - clientRect.top) - __classPrivateFieldGet(this, _PropertyNodeModifier_pointerValue, "f");
        if (__classPrivateFieldGet(this, _PropertyNodeModifier_deltaProperty, "f") !== deltaProperty) {
            __classPrivateFieldSet(this, _PropertyNodeModifier_deltaProperty, deltaProperty, "f");
            __classPrivateFieldGet(this, _PropertyNodeModifier_instances, "m", _PropertyNodeModifier_dispatchChange).call(this);
        }
    };
    PropertyNodeModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _PropertyNodeModifier_deltaProperty, "f") === 0.0 || __classPrivateFieldGet(this, _PropertyNodeModifier_selection, "f").isEmpty()) {
            return;
        }
        var result = __classPrivateFieldGet(this, _PropertyNodeModifier_selection, "f").selected()
            .map(function (adapter) { return ({ adapter: adapter, value: __classPrivateFieldGet(_this, _PropertyNodeModifier_selectedModifyStrategy, "f").modifyProperty(__classPrivateFieldGet(_this, _PropertyNodeModifier_property, "f"), adapter) }); });
        __classPrivateFieldGet(this, _PropertyNodeModifier_editing, "f").modify(function () { return result.forEach(function (_a) {
            var box = _a.adapter.box, value = _a.value;
            return __classPrivateFieldGet(_this, _PropertyNodeModifier_property, "f").writeValue(box, value);
        }); });
    };
    PropertyNodeModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _PropertyNodeModifier_deltaProperty, 0.0, "f");
        __classPrivateFieldGet(this, _PropertyNodeModifier_instances, "m", _PropertyNodeModifier_dispatchChange).call(this);
    };
    return PropertyNodeModifier;
}());
exports.PropertyNodeModifier = PropertyNodeModifier;
_PropertyNodeModifier_editing = new WeakMap(), _PropertyNodeModifier_element = new WeakMap(), _PropertyNodeModifier_selection = new WeakMap(), _PropertyNodeModifier_property = new WeakMap(), _PropertyNodeModifier_valueAxis = new WeakMap(), _PropertyNodeModifier_pointerValue = new WeakMap(), _PropertyNodeModifier_notifier = new WeakMap(), _PropertyNodeModifier_selectedModifyStrategy = new WeakMap(), _PropertyNodeModifier_deltaProperty = new WeakMap(), _PropertyNodeModifier_instances = new WeakSet(), _PropertyNodeModifier_dispatchChange = function _PropertyNodeModifier_dispatchChange() { __classPrivateFieldGet(this, _PropertyNodeModifier_notifier, "f").notify(); };
