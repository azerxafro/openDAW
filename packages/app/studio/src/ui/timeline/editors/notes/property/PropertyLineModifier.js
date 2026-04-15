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
var _PropertyLineModifier_instances, _PropertyLineModifier_editing, _PropertyLineModifier_element, _PropertyLineModifier_property, _PropertyLineModifier_selection, _PropertyLineModifier_range, _PropertyLineModifier_valueAxis, _PropertyLineModifier_lineOrigin, _PropertyLineModifier_lineEnd, _PropertyLineModifier_reader, _PropertyLineModifier_notifier, _PropertyLineModifier_modifyProperty, _PropertyLineModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyLineModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var PropertyAccessor_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyAccessor.ts");
var PropertyLineModifier = /** @class */ (function () {
    function PropertyLineModifier(_a) {
        var editing = _a.editing, element = _a.element, property = _a.property, selection = _a.selection, range = _a.range, valueAxis = _a.valueAxis, lineOrigin = _a.lineOrigin, reader = _a.reader;
        _PropertyLineModifier_instances.add(this);
        _PropertyLineModifier_editing.set(this, void 0);
        _PropertyLineModifier_element.set(this, void 0);
        _PropertyLineModifier_property.set(this, void 0);
        _PropertyLineModifier_selection.set(this, void 0);
        _PropertyLineModifier_range.set(this, void 0);
        _PropertyLineModifier_valueAxis.set(this, void 0);
        _PropertyLineModifier_lineOrigin.set(this, void 0);
        _PropertyLineModifier_lineEnd.set(this, void 0);
        _PropertyLineModifier_reader.set(this, void 0);
        _PropertyLineModifier_notifier.set(this, void 0);
        __classPrivateFieldSet(this, _PropertyLineModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_element, element, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_property, property, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_range, range, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_valueAxis, valueAxis, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_lineOrigin, lineOrigin, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_lineEnd, __assign({}, lineOrigin), "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_reader, reader, "f");
        __classPrivateFieldSet(this, _PropertyLineModifier_notifier, new lib_std_1.Notifier(), "f");
    }
    PropertyLineModifier.create = function (construct) {
        return new PropertyLineModifier(construct);
    };
    PropertyLineModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _PropertyLineModifier_notifier, "f").subscribe(observer); };
    Object.defineProperty(PropertyLineModifier.prototype, "property", {
        get: function () { return __classPrivateFieldGet(this, _PropertyLineModifier_property, "f"); },
        enumerable: false,
        configurable: true
    });
    PropertyLineModifier.prototype.showOrigin = function () { return false; };
    PropertyLineModifier.prototype.showCreation = function () { return lib_std_1.Option.None; };
    PropertyLineModifier.prototype.showPropertyLine = function () { return lib_std_1.Option.wrap([__classPrivateFieldGet(this, _PropertyLineModifier_lineOrigin, "f"), __classPrivateFieldGet(this, _PropertyLineModifier_lineEnd, "f")]); };
    PropertyLineModifier.prototype.readContentDuration = function (owner) { return owner.contentDuration; };
    PropertyLineModifier.prototype.selectedModifyStrategy = function () { return this; };
    PropertyLineModifier.prototype.unselectedModifyStrategy = function () { return this; };
    PropertyLineModifier.prototype.readPosition = function (adapter) { return adapter.position; };
    PropertyLineModifier.prototype.readComplete = function (adapter) { return adapter.complete; };
    PropertyLineModifier.prototype.readPitch = function (adapter) { return adapter.pitch; };
    PropertyLineModifier.prototype.readVelocity = function (adapter) { return __classPrivateFieldGet(this, _PropertyLineModifier_instances, "m", _PropertyLineModifier_modifyProperty).call(this, PropertyAccessor_ts_1.NotePropertyVelocity, adapter); };
    PropertyLineModifier.prototype.readCent = function (adapter) { return __classPrivateFieldGet(this, _PropertyLineModifier_instances, "m", _PropertyLineModifier_modifyProperty).call(this, PropertyAccessor_ts_1.NotePropertyCent, adapter); };
    PropertyLineModifier.prototype.readChance = function (adapter) { return __classPrivateFieldGet(this, _PropertyLineModifier_instances, "m", _PropertyLineModifier_modifyProperty).call(this, PropertyAccessor_ts_1.NotePropertyChance, adapter); };
    PropertyLineModifier.prototype.iterateRange = function (owners, from, to) {
        return owners.iterateRange(from, to);
    };
    PropertyLineModifier.prototype.update = function (event) {
        var clientX = event.clientX, clientY = event.clientY;
        var _a = __classPrivateFieldGet(this, _PropertyLineModifier_element, "f").getBoundingClientRect(), left = _a.left, top = _a.top;
        __classPrivateFieldGet(this, _PropertyLineModifier_lineEnd, "f").u = __classPrivateFieldGet(this, _PropertyLineModifier_range, "f").xToUnit(clientX - left);
        __classPrivateFieldGet(this, _PropertyLineModifier_lineEnd, "f").v = (0, lib_std_1.clamp)(__classPrivateFieldGet(this, _PropertyLineModifier_valueAxis, "f").axisToValue(clientY - top), 0.0, 1.0);
        __classPrivateFieldGet(this, _PropertyLineModifier_instances, "m", _PropertyLineModifier_dispatchChange).call(this);
    };
    PropertyLineModifier.prototype.approve = function () {
        var _this = this;
        var result = __classPrivateFieldGet(this, _PropertyLineModifier_reader, "f").content.events.asArray()
            .map(function (adapter) { return ({ adapter: adapter, value: __classPrivateFieldGet(_this, _PropertyLineModifier_instances, "m", _PropertyLineModifier_modifyProperty).call(_this, __classPrivateFieldGet(_this, _PropertyLineModifier_property, "f"), adapter) }); });
        __classPrivateFieldGet(this, _PropertyLineModifier_editing, "f").modify(function () { return result.forEach(function (_a) {
            var box = _a.adapter.box, value = _a.value;
            return __classPrivateFieldGet(_this, _PropertyLineModifier_property, "f").writeValue(box, value);
        }); });
    };
    PropertyLineModifier.prototype.cancel = function () {
        __classPrivateFieldGet(this, _PropertyLineModifier_lineEnd, "f").u = __classPrivateFieldGet(this, _PropertyLineModifier_lineOrigin, "f").u;
        __classPrivateFieldGet(this, _PropertyLineModifier_lineEnd, "f").v = __classPrivateFieldGet(this, _PropertyLineModifier_lineOrigin, "f").v;
        __classPrivateFieldGet(this, _PropertyLineModifier_instances, "m", _PropertyLineModifier_dispatchChange).call(this);
    };
    return PropertyLineModifier;
}());
exports.PropertyLineModifier = PropertyLineModifier;
_PropertyLineModifier_editing = new WeakMap(), _PropertyLineModifier_element = new WeakMap(), _PropertyLineModifier_property = new WeakMap(), _PropertyLineModifier_selection = new WeakMap(), _PropertyLineModifier_range = new WeakMap(), _PropertyLineModifier_valueAxis = new WeakMap(), _PropertyLineModifier_lineOrigin = new WeakMap(), _PropertyLineModifier_lineEnd = new WeakMap(), _PropertyLineModifier_reader = new WeakMap(), _PropertyLineModifier_notifier = new WeakMap(), _PropertyLineModifier_instances = new WeakSet(), _PropertyLineModifier_modifyProperty = function _PropertyLineModifier_modifyProperty(propertyAccessor, event) {
    var fallbackValue = propertyAccessor.readRawValue(event);
    var emptySelection = __classPrivateFieldGet(this, _PropertyLineModifier_selection, "f").isEmpty();
    if (!emptySelection && !event.isSelected) {
        return fallbackValue;
    }
    if (propertyAccessor === __classPrivateFieldGet(this, _PropertyLineModifier_property, "f")) {
        var position = event.position + __classPrivateFieldGet(this, _PropertyLineModifier_reader, "f").position;
        var _a = __classPrivateFieldGet(this, _PropertyLineModifier_lineOrigin, "f"), u0 = _a.u, v0 = _a.v;
        var _b = __classPrivateFieldGet(this, _PropertyLineModifier_lineEnd, "f"), u1 = _b.u, v1 = _b.v;
        if (Math.abs(u1 - u0) < 1e-3) {
            return fallbackValue;
        } // avoid division close to zero
        if (position < Math.min(u0, u1) || position > Math.max(u0, u1)) {
            return fallbackValue;
        } // outside line
        return __classPrivateFieldGet(this, _PropertyLineModifier_property, "f").valueMapping.y(v0 + (position - u0) / (u1 - u0) * (v1 - v0));
    }
    else {
        return fallbackValue; // case other property
    }
}, _PropertyLineModifier_dispatchChange = function _PropertyLineModifier_dispatchChange() { __classPrivateFieldGet(this, _PropertyLineModifier_notifier, "f").notify(); };
