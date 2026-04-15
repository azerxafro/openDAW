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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterValueEditing = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ParameterValueEditing = /** @class */ (function () {
    function ParameterValueEditing(project, collection) {
        var _this = this;
        _ParameterValueEditing_terminator.set(this, new lib_std_1.Terminator());
        _ParameterValueEditing_anchorValue.set(this, void 0);
        _ParameterValueEditing_assignmentLifecycle.set(this, new lib_std_1.Terminator());
        _ParameterValueEditing_assignment.set(this, void 0);
        __classPrivateFieldSet(this, _ParameterValueEditing_anchorValue, new lib_std_1.DefaultObservableValue(0.0), "f");
        __classPrivateFieldSet(this, _ParameterValueEditing_assignmentLifecycle, __classPrivateFieldGet(this, _ParameterValueEditing_terminator, "f").own(new lib_std_1.Terminator()), "f");
        __classPrivateFieldSet(this, _ParameterValueEditing_assignment, __classPrivateFieldGet(this, _ParameterValueEditing_terminator, "f").own(new lib_std_1.MutableObservableOption()), "f");
        __classPrivateFieldGet(this, _ParameterValueEditing_terminator, "f").own(collection.catchupAndSubscribe(function (_a) {
            var targetVertex = _a.targetVertex;
            __classPrivateFieldGet(_this, _ParameterValueEditing_assignmentLifecycle, "f").terminate();
            if (targetVertex.isEmpty()) {
                __classPrivateFieldGet(_this, _ParameterValueEditing_assignment, "f").clear();
                return; // No track assigned
            }
            var boxAdapters = project.boxAdapters;
            var trackBoxAdapter = boxAdapters.adapterFor(targetVertex.unwrap().box, studio_adapters_1.TrackBoxAdapter);
            (0, lib_std_1.assert)(trackBoxAdapter.type === studio_adapters_1.TrackType.Value, "ValueEditorHeader only accepts value tracks");
            __classPrivateFieldGet(_this, _ParameterValueEditing_assignmentLifecycle, "f").own(trackBoxAdapter.target.catchupAndSubscribe(function (pointer) {
                return __classPrivateFieldGet(_this, _ParameterValueEditing_assignment, "f").wrapOption(pointer.targetVertex.map(function (target) {
                    var address = target.address;
                    var adapter = project.parameterFieldAdapters.get(address);
                    __classPrivateFieldGet(_this, _ParameterValueEditing_anchorValue, "f").setValue(adapter.anchor);
                    return { device: undefined, adapter: adapter }; // TODO Find, observe name
                }));
            }));
        }));
    }
    ParameterValueEditing.prototype.catchupAndSubscribeValueAssignment = function (observer) {
        return __classPrivateFieldGet(this, _ParameterValueEditing_assignment, "f").catchupAndSubscribe(observer);
    };
    Object.defineProperty(ParameterValueEditing.prototype, "anchorModel", {
        get: function () {
            var scope = this;
            return new /** @class */ (function () {
                function class_1() {
                }
                class_1.prototype.getValue = function () { return __classPrivateFieldGet(scope, _ParameterValueEditing_assignment, "f").mapOr(function (assignment) { return assignment.adapter.anchor; }, 0.0); };
                class_1.prototype.subscribe = function (observer) { return __classPrivateFieldGet(scope, _ParameterValueEditing_anchorValue, "f").subscribe(observer); };
                class_1.prototype.catchupAndSubscribe = function (observer) {
                    observer(this);
                    return this.subscribe(observer);
                };
                return class_1;
            }());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParameterValueEditing.prototype, "valueMapping", {
        get: function () {
            return __classPrivateFieldGet(this, _ParameterValueEditing_assignment, "f").match({
                none: function () { return lib_std_1.ValueMapping.unipolar(); },
                some: function (assignment) { return assignment.adapter.valueMapping; }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParameterValueEditing.prototype, "stringMapping", {
        get: function () {
            return __classPrivateFieldGet(this, _ParameterValueEditing_assignment, "f").match({
                none: function () { return ParameterValueEditing.FallbackStringMapping; },
                some: function (assignment) { return assignment.adapter.stringMapping; }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParameterValueEditing.prototype, "currentValue", {
        get: function () {
            return __classPrivateFieldGet(this, _ParameterValueEditing_assignment, "f").mapOr(function (assignment) { return assignment.adapter.getUnitValue(); }, 0.0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParameterValueEditing.prototype, "floating", {
        get: function () {
            return __classPrivateFieldGet(this, _ParameterValueEditing_assignment, "f").mapOr(function (assignment) { return assignment.adapter.valueMapping.floating(); }, false);
        },
        enumerable: false,
        configurable: true
    });
    ParameterValueEditing.prototype.quantize = function (value) {
        return __classPrivateFieldGet(this, _ParameterValueEditing_assignment, "f").match({
            none: function () { return value; },
            some: function (assignment) {
                var mapping = assignment.adapter.valueMapping;
                return mapping.x(mapping.y(value));
            }
        });
    };
    ParameterValueEditing.prototype.terminate = function () { __classPrivateFieldGet(this, _ParameterValueEditing_terminator, "f").terminate(); };
    var _ParameterValueEditing_terminator, _ParameterValueEditing_anchorValue, _ParameterValueEditing_assignmentLifecycle, _ParameterValueEditing_assignment;
    _ParameterValueEditing_terminator = new WeakMap(), _ParameterValueEditing_anchorValue = new WeakMap(), _ParameterValueEditing_assignmentLifecycle = new WeakMap(), _ParameterValueEditing_assignment = new WeakMap();
    ParameterValueEditing.FallbackStringMapping = lib_std_1.StringMapping.percent();
    return ParameterValueEditing;
}());
exports.ParameterValueEditing = ParameterValueEditing;
