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
var _ValueMoveModifier_instances, _ValueMoveModifier_editing, _ValueMoveModifier_element, _ValueMoveModifier_context, _ValueMoveModifier_selection, _ValueMoveModifier_valueAxis, _ValueMoveModifier_eventMapping, _ValueMoveModifier_snapping, _ValueMoveModifier_pointerPulse, _ValueMoveModifier_pointerValue, _ValueMoveModifier_reference, _ValueMoveModifier_collection, _ValueMoveModifier_notifier, _ValueMoveModifier_masks, _ValueMoveModifier_snapValues, _ValueMoveModifier_copy, _ValueMoveModifier_freezeMode, _ValueMoveModifier_deltaValue, _ValueMoveModifier_deltaPosition, _ValueMoveModifier_snapValue, _ValueMoveModifier_dispatchChange, _ValueMoveModifier_buildMasks, _ValueMoveModifier_buildSnapValues, _ValueMoveModifier_eventCollection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueMoveModifier = exports.SnapValueThresholdInPixels = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ValueEventDraft_ts_1 = require("./ValueEventDraft.ts");
exports.SnapValueThresholdInPixels = 8;
var ValueMoveModifier = /** @class */ (function () {
    function ValueMoveModifier(_a) {
        var editing = _a.editing, element = _a.element, context = _a.context, selection = _a.selection, valueAxis = _a.valueAxis, eventMapping = _a.eventMapping, snapping = _a.snapping, pointerPulse = _a.pointerPulse, pointerValue = _a.pointerValue, reference = _a.reference, collection = _a.collection;
        _ValueMoveModifier_instances.add(this);
        _ValueMoveModifier_editing.set(this, void 0);
        _ValueMoveModifier_element.set(this, void 0);
        _ValueMoveModifier_context.set(this, void 0);
        _ValueMoveModifier_selection.set(this, void 0);
        _ValueMoveModifier_valueAxis.set(this, void 0);
        _ValueMoveModifier_eventMapping.set(this, void 0);
        _ValueMoveModifier_snapping.set(this, void 0);
        _ValueMoveModifier_pointerPulse.set(this, void 0);
        _ValueMoveModifier_pointerValue.set(this, void 0);
        _ValueMoveModifier_reference.set(this, void 0);
        _ValueMoveModifier_collection.set(this, void 0);
        _ValueMoveModifier_notifier.set(this, void 0);
        _ValueMoveModifier_masks.set(this, void 0);
        _ValueMoveModifier_snapValues.set(this, void 0);
        _ValueMoveModifier_copy.set(this, void 0);
        _ValueMoveModifier_freezeMode.set(this, void 0);
        _ValueMoveModifier_deltaValue.set(this, void 0);
        _ValueMoveModifier_deltaPosition.set(this, void 0);
        _ValueMoveModifier_snapValue.set(this, void 0);
        __classPrivateFieldSet(this, _ValueMoveModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_element, element, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_context, context, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_valueAxis, valueAxis, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_eventMapping, eventMapping, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_pointerValue, pointerValue, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_collection, collection, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_masks, __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_buildMasks).call(this), "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_snapValues, __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_buildSnapValues).call(this), "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_copy, false, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_freezeMode, false, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_deltaValue, 0.0, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_deltaPosition, 0, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_snapValue, lib_std_1.Option.None, "f");
    }
    ValueMoveModifier.create = function (construct) { return new ValueMoveModifier(construct); };
    ValueMoveModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _ValueMoveModifier_notifier, "f").subscribe(observer); };
    ValueMoveModifier.prototype.showOrigin = function () { return __classPrivateFieldGet(this, _ValueMoveModifier_copy, "f"); };
    ValueMoveModifier.prototype.snapValue = function () { return __classPrivateFieldGet(this, _ValueMoveModifier_snapValue, "f"); };
    ValueMoveModifier.prototype.translateSearch = function (value) { return value - __classPrivateFieldGet(this, _ValueMoveModifier_deltaPosition, "f"); };
    ValueMoveModifier.prototype.isVisible = function (event) {
        var deltaPosition = __classPrivateFieldGet(this, _ValueMoveModifier_deltaPosition, "f");
        var position = event.position - deltaPosition;
        for (var _i = 0, _a = __classPrivateFieldGet(this, _ValueMoveModifier_masks, "f"); _i < _a.length; _i++) {
            var _b = _a[_i], min = _b[0], max = _b[1];
            if ((min < position || (deltaPosition > 0 && min === position))
                && (position < max || (deltaPosition < 0 && max === position))) {
                return false;
            }
        }
        return true;
    };
    ValueMoveModifier.prototype.readPosition = function (adapter) { return adapter.position + __classPrivateFieldGet(this, _ValueMoveModifier_deltaPosition, "f"); };
    ValueMoveModifier.prototype.readValue = function (event) {
        return __classPrivateFieldGet(this, _ValueMoveModifier_context, "f").quantize(__classPrivateFieldGet(this, _ValueMoveModifier_eventMapping, "f").y((0, lib_std_1.clampUnit)(__classPrivateFieldGet(this, _ValueMoveModifier_eventMapping, "f").x(event.value) + __classPrivateFieldGet(this, _ValueMoveModifier_deltaValue, "f"))));
    };
    ValueMoveModifier.prototype.readInterpolation = function (event) { return event.interpolation; };
    ValueMoveModifier.prototype.iterator = function (searchMin, searchMax) {
        return new ValueEventDraft_ts_1.ValueEventDraft.Solver(__classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_eventCollection).call(this), this, searchMin - Math.max(0, __classPrivateFieldGet(this, _ValueMoveModifier_deltaPosition, "f")), searchMax).iterate();
    };
    ValueMoveModifier.prototype.readContentDuration = function (owner) { return owner.contentDuration; };
    ValueMoveModifier.prototype.update = function (event) {
        var _this = this;
        var clientX = event.clientX, clientY = event.clientY, freezeMode = event.altKey, ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        var clientRect = __classPrivateFieldGet(this, _ValueMoveModifier_element, "f").getBoundingClientRect();
        var localX = clientX - clientRect.left;
        var localY = clientY - clientRect.top;
        var pointerValue = __classPrivateFieldGet(this, _ValueMoveModifier_context, "f").quantize(__classPrivateFieldGet(this, _ValueMoveModifier_valueAxis, "f").axisToValue(localY));
        var closest = shiftKey ? null : __classPrivateFieldGet(this, _ValueMoveModifier_snapValues, "f")
            .map(function (value, index) {
            return ({ value: value, index: index, position: __classPrivateFieldGet(_this, _ValueMoveModifier_valueAxis, "f").valueToAxis(value) });
        })
            .reduce(function (closest, guide) {
            return Math.abs(guide.position - localY) <= (closest === null
                ? exports.SnapValueThresholdInPixels
                : Math.abs(closest.position - localY))
                ? guide : closest;
        }, null);
        var snapValue = closest === null ? lib_std_1.Option.None : lib_std_1.Option.wrap(closest.value);
        var deltaValue = !freezeMode ? snapValue.match({
            none: function () {
                var unitValue = __classPrivateFieldGet(_this, _ValueMoveModifier_eventMapping, "f").x(pointerValue);
                return unitValue <= 0.0 || unitValue >= 1.0
                    ? unitValue - __classPrivateFieldGet(_this, _ValueMoveModifier_eventMapping, "f").x(__classPrivateFieldGet(_this, _ValueMoveModifier_reference, "f").value)
                    : unitValue - __classPrivateFieldGet(_this, _ValueMoveModifier_eventMapping, "f").x(__classPrivateFieldGet(_this, _ValueMoveModifier_pointerValue, "f"));
            },
            some: function (value) { return __classPrivateFieldGet(_this, _ValueMoveModifier_eventMapping, "f").x(value) - __classPrivateFieldGet(_this, _ValueMoveModifier_eventMapping, "f").x(__classPrivateFieldGet(_this, _ValueMoveModifier_reference, "f").value); }
        }) : 0.0;
        var deltaPosition = __classPrivateFieldGet(this, _ValueMoveModifier_snapping, "f").computeDelta(__classPrivateFieldGet(this, _ValueMoveModifier_pointerPulse, "f"), localX, __classPrivateFieldGet(this, _ValueMoveModifier_reference, "f").position);
        var change = false;
        if (__classPrivateFieldGet(this, _ValueMoveModifier_deltaPosition, "f") !== deltaPosition) {
            __classPrivateFieldSet(this, _ValueMoveModifier_deltaPosition, deltaPosition, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _ValueMoveModifier_deltaValue, "f") !== deltaValue) {
            __classPrivateFieldSet(this, _ValueMoveModifier_deltaValue, deltaValue, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _ValueMoveModifier_copy, "f") !== ctrlKey) {
            __classPrivateFieldSet(this, _ValueMoveModifier_copy, ctrlKey, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _ValueMoveModifier_snapValue, "f") !== snapValue) {
            __classPrivateFieldSet(this, _ValueMoveModifier_snapValue, snapValue, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _ValueMoveModifier_freezeMode, "f") !== freezeMode) {
            __classPrivateFieldSet(this, _ValueMoveModifier_freezeMode, freezeMode, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_dispatchChange).call(this);
        }
    };
    ValueMoveModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _ValueMoveModifier_deltaValue, "f") === 0 && __classPrivateFieldGet(this, _ValueMoveModifier_deltaPosition, "f") === 0) {
            if (__classPrivateFieldGet(this, _ValueMoveModifier_copy, "f")) {
                __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_dispatchChange).call(this);
            } // reset visuals
            return;
        }
        // take 'em all
        var collection = __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_eventCollection).call(this);
        var solver = new ValueEventDraft_ts_1.ValueEventDraft.Solver(collection, this, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        var stream = [];
        for (var _i = 0, _a = solver.iterate(); _i < _a.length; _i++) {
            var event_1 = _a[_i];
            stream.push(event_1);
        }
        // iterator
        var pull = (function () {
            var iterator = collection.asArray().slice().values();
            return function () {
                var _a = iterator.next(), done = _a.done, value = _a.value;
                return done ? null : value;
            };
        })();
        // update events
        var iterable = stream.values();
        var _b = iterable.next(), done = _b.done, value = _b.value;
        (0, lib_std_1.assert)(!done, "Internal Error");
        var obsolete = [];
        var index = 0;
        var prev = (0, lib_std_1.asDefined)(value);
        prev.index = 0;
        for (var _c = 0, iterable_1 = iterable; _c < iterable_1.length; _c++) {
            var next = iterable_1[_c];
            if (prev.position === next.position) {
                if (index === 0) {
                    prev.index = 0;
                }
                if (++index > 1) {
                    obsolete.push(prev);
                }
                next.index = 1;
            }
            else {
                index = 0;
                next.index = 0;
            }
            prev = next;
        }
        obsolete.forEach(function (event) { return lib_std_1.Arrays.remove(stream, event); });
        __classPrivateFieldGet(this, _ValueMoveModifier_editing, "f").modify(function () {
            // Collect all (stock, target) pairs
            var pairs = [];
            stream.forEach(function (target) { return pairs.push({ stock: pull(), target: target }); });
            // Collect obsolete events (those not paired with any target)
            // These must be deleted FIRST to avoid collisions with events being moved
            var obsoleteEvents = [];
            while (true) {
                var event_2 = pull();
                if (event_2 === null) {
                    break;
                }
                obsoleteEvents.push(event_2);
            }
            // Remove ALL events from the collection first to prevent duplicates during sorts
            obsoleteEvents.forEach(function (event) { return collection.remove(event); });
            pairs.forEach(function (_a) {
                var stock = _a.stock;
                if (stock !== null)
                    collection.remove(stock);
            });
            var reusedAdapters = [];
            for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                var _a = pairs_1[_i], stock = _a.stock, target = _a.target;
                var adapter = (0, lib_std_1.isNull)(stock)
                    ? __classPrivateFieldGet(_this, _ValueMoveModifier_collection, "f").createEvent(target)
                    : stock.copyFrom(target);
                if (!(0, lib_std_1.isNull)(stock)) {
                    reusedAdapters.push(adapter);
                }
                if (target.isSelected && !adapter.isSelected) {
                    __classPrivateFieldGet(_this, _ValueMoveModifier_selection, "f").select(adapter);
                }
                else if (!target.isSelected && adapter.isSelected) {
                    __classPrivateFieldGet(_this, _ValueMoveModifier_selection, "f").deselect(adapter);
                }
            }
            // Add back only the reused adapters (new ones are already added via onAdded)
            reusedAdapters.forEach(function (adapter) { return collection.add(adapter); });
            obsoleteEvents.forEach(function (event) { return event.box.delete(); });
        });
        __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_dispatchChange).call(this);
    };
    ValueMoveModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _ValueMoveModifier_copy, false, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_snapValue, lib_std_1.Option.None, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_freezeMode, false, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_deltaValue, 0, "f");
        __classPrivateFieldSet(this, _ValueMoveModifier_deltaPosition, 0, "f");
        __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_dispatchChange).call(this);
    };
    return ValueMoveModifier;
}());
exports.ValueMoveModifier = ValueMoveModifier;
_ValueMoveModifier_editing = new WeakMap(), _ValueMoveModifier_element = new WeakMap(), _ValueMoveModifier_context = new WeakMap(), _ValueMoveModifier_selection = new WeakMap(), _ValueMoveModifier_valueAxis = new WeakMap(), _ValueMoveModifier_eventMapping = new WeakMap(), _ValueMoveModifier_snapping = new WeakMap(), _ValueMoveModifier_pointerPulse = new WeakMap(), _ValueMoveModifier_pointerValue = new WeakMap(), _ValueMoveModifier_reference = new WeakMap(), _ValueMoveModifier_collection = new WeakMap(), _ValueMoveModifier_notifier = new WeakMap(), _ValueMoveModifier_masks = new WeakMap(), _ValueMoveModifier_snapValues = new WeakMap(), _ValueMoveModifier_copy = new WeakMap(), _ValueMoveModifier_freezeMode = new WeakMap(), _ValueMoveModifier_deltaValue = new WeakMap(), _ValueMoveModifier_deltaPosition = new WeakMap(), _ValueMoveModifier_snapValue = new WeakMap(), _ValueMoveModifier_instances = new WeakSet(), _ValueMoveModifier_dispatchChange = function _ValueMoveModifier_dispatchChange() { __classPrivateFieldGet(this, _ValueMoveModifier_notifier, "f").notify(); }, _ValueMoveModifier_buildMasks = function _ValueMoveModifier_buildMasks() {
    var masks = [];
    var min = Number.MIN_SAFE_INTEGER;
    var max = Number.MAX_SAFE_INTEGER;
    var started = false;
    var ended = false;
    for (var _i = 0, _a = __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_eventCollection).call(this).asArray(); _i < _a.length; _i++) {
        var adapter = _a[_i];
        if (adapter.isSelected) {
            if (started) {
                max = adapter.position;
                ended = max > min;
            }
            else {
                min = adapter.position;
                started = true;
            }
        }
        else if (ended) {
            masks.push([min, max]);
            min = Number.MIN_SAFE_INTEGER;
            max = Number.MAX_SAFE_INTEGER;
            started = false;
            ended = false;
        }
        else {
            started = false;
            ended = false;
        }
    }
    if (ended) {
        masks.push([min, max]);
    }
    return masks;
}, _ValueMoveModifier_buildSnapValues = function _ValueMoveModifier_buildSnapValues() {
    var result = new Set([__classPrivateFieldGet(this, _ValueMoveModifier_context, "f").currentValue]);
    __classPrivateFieldGet(this, _ValueMoveModifier_instances, "m", _ValueMoveModifier_eventCollection).call(this).asArray().forEach(function (event) { return result.add(event.value); });
    return Array.from(result).sort(lib_std_1.NumberComparator);
}, _ValueMoveModifier_eventCollection = function _ValueMoveModifier_eventCollection() { return __classPrivateFieldGet(this, _ValueMoveModifier_collection, "f").events; };
