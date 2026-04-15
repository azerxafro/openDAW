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
var _SelectedModifyStrategy_instances, _SelectedModifyStrategy_tool, _SelectedModifyStrategy_computeDelta, _RegionContentStartModifier_instances, _RegionContentStartModifier_project, _RegionContentStartModifier_element, _RegionContentStartModifier_snapping, _RegionContentStartModifier_pointerPulse, _RegionContentStartModifier_reference, _RegionContentStartModifier_adapters, _RegionContentStartModifier_selectedModifyStrategy, _RegionContentStartModifier_delta, _RegionContentStartModifier_computeMaxDelta, _RegionContentStartModifier_computeMinDelta, _RegionContentStartModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionContentStartModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_instances.add(this);
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (region) {
        var position = region.position + __classPrivateFieldGet(this, _SelectedModifyStrategy_instances, "m", _SelectedModifyStrategy_computeDelta).call(this, region);
        return region.trackBoxAdapter.map(function (trackAdapter) { return trackAdapter.regions.collection
            .lowerEqual(region.position, function (prev) { return prev !== region && prev.isSelected; }); })
            .match({
            none: function () { return position; },
            some: function (prev) { return position < prev.complete && prev.complete <= region.complete - lib_dsp_1.PPQN.SemiQuaver
                ? prev.complete
                : position; }
        });
    };
    SelectedModifyStrategy.prototype.readComplete = function (region) { return region.complete; };
    SelectedModifyStrategy.prototype.readLoopOffset = function (region) {
        // just for the preview. it behaves like having an effect-offset
        return region.loopOffset + __classPrivateFieldGet(this, _SelectedModifyStrategy_instances, "m", _SelectedModifyStrategy_computeDelta).call(this, region);
    };
    SelectedModifyStrategy.prototype.readLoopDuration = function (region) {
        return region.loopDuration - __classPrivateFieldGet(this, _SelectedModifyStrategy_instances, "m", _SelectedModifyStrategy_computeDelta).call(this, region);
    };
    SelectedModifyStrategy.prototype.readMirror = function (region) { return region.isMirrowed; };
    SelectedModifyStrategy.prototype.translateTrackIndex = function (value) { return value; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(from, __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").adapters.reduce(function (to, adapter) { return Math.max(to, adapter.complete); }, to));
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap(), _SelectedModifyStrategy_instances = new WeakSet(), _SelectedModifyStrategy_computeDelta = function _SelectedModifyStrategy_computeDelta(region) {
    if (!studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region) || !region.canResize) {
        return 0;
    }
    return __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").delta;
};
var RegionContentStartModifier = /** @class */ (function () {
    function RegionContentStartModifier(_a, adapters) {
        var project = _a.project, element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, reference = _a.reference;
        _RegionContentStartModifier_instances.add(this);
        _RegionContentStartModifier_project.set(this, void 0);
        _RegionContentStartModifier_element.set(this, void 0);
        _RegionContentStartModifier_snapping.set(this, void 0);
        _RegionContentStartModifier_pointerPulse.set(this, void 0);
        _RegionContentStartModifier_reference.set(this, void 0);
        _RegionContentStartModifier_adapters.set(this, void 0);
        _RegionContentStartModifier_selectedModifyStrategy.set(this, void 0);
        _RegionContentStartModifier_delta.set(this, void 0);
        __classPrivateFieldSet(this, _RegionContentStartModifier_project, project, "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_element, element, "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_adapters, adapters, "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _RegionContentStartModifier_delta, 0, "f");
    }
    RegionContentStartModifier.create = function (selected, construct) {
        var adapters = selected.filter(function (region) { return studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region) && region.canResize; });
        return adapters.length === 0 ? lib_std_1.Option.None : lib_std_1.Option.wrap(new RegionContentStartModifier(construct, adapters));
    };
    Object.defineProperty(RegionContentStartModifier.prototype, "delta", {
        get: function () { return __classPrivateFieldGet(this, _RegionContentStartModifier_delta, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionContentStartModifier.prototype, "snapping", {
        get: function () { return __classPrivateFieldGet(this, _RegionContentStartModifier_snapping, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionContentStartModifier.prototype, "adapters", {
        get: function () { return __classPrivateFieldGet(this, _RegionContentStartModifier_adapters, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionContentStartModifier.prototype, "reference", {
        get: function () { return __classPrivateFieldGet(this, _RegionContentStartModifier_reference, "f"); },
        enumerable: false,
        configurable: true
    });
    RegionContentStartModifier.prototype.showOrigin = function () { return false; };
    RegionContentStartModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _RegionContentStartModifier_selectedModifyStrategy, "f"); };
    RegionContentStartModifier.prototype.unselectedModifyStrategy = function () { return studio_core_1.RegionModifyStrategy.Identity; };
    RegionContentStartModifier.prototype.update = function (_a) {
        var clientX = _a.clientX;
        var clientRect = __classPrivateFieldGet(this, _RegionContentStartModifier_element, "f").getBoundingClientRect();
        var newDelta = __classPrivateFieldGet(this, _RegionContentStartModifier_snapping, "f").computeDelta(__classPrivateFieldGet(this, _RegionContentStartModifier_pointerPulse, "f"), clientX - clientRect.left, __classPrivateFieldGet(this, _RegionContentStartModifier_reference, "f").position);
        var clampedDelta = Math.max(__classPrivateFieldGet(this, _RegionContentStartModifier_instances, "m", _RegionContentStartModifier_computeMinDelta).call(this), Math.min(newDelta, __classPrivateFieldGet(this, _RegionContentStartModifier_instances, "m", _RegionContentStartModifier_computeMaxDelta).call(this)));
        if (__classPrivateFieldGet(this, _RegionContentStartModifier_delta, "f") !== clampedDelta) {
            __classPrivateFieldSet(this, _RegionContentStartModifier_delta, clampedDelta, "f");
            __classPrivateFieldGet(this, _RegionContentStartModifier_instances, "m", _RegionContentStartModifier_dispatchChange).call(this);
        }
    };
    RegionContentStartModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _RegionContentStartModifier_delta, "f") === 0) {
            return;
        }
        var adapters = __classPrivateFieldGet(this, _RegionContentStartModifier_adapters, "f").filter(function (_a) {
            var box = _a.box;
            return box.isAttached();
        });
        if (adapters.length === 0) {
            return;
        }
        var modifiedTracks = lib_std_1.Arrays.removeDuplicates(adapters
            .map(function (adapter) { return adapter.trackBoxAdapter.unwrapOrNull(); }).filter(lib_std_1.isNotNull));
        var regionSnapshot = function (region) {
            return ({ p: region.position, d: region.duration, s: region.isSelected });
        };
        var trackSnapshots = modifiedTracks.map(function (track) { return ({
            trackIndex: track.listIndex,
            before: track.regions.collection.asArray().map(regionSnapshot)
        }); });
        var result = adapters.map(function (region) {
            var readPos = __classPrivateFieldGet(_this, _RegionContentStartModifier_selectedModifyStrategy, "f").readPosition(region);
            return { region: region, delta: readPos - region.position, readPos: readPos, readComplete: region.complete };
        });
        console.debug("[ContentStartModifier.approve]", {
            toolDelta: __classPrivateFieldGet(this, _RegionContentStartModifier_delta, "f"),
            masks: result.map(function (entry) { return ({
                readPos: entry.readPos,
                readComplete: entry.readComplete,
                delta: entry.delta
            }); }),
            trackSnapshots: trackSnapshots
        });
        __classPrivateFieldGet(this, _RegionContentStartModifier_project, "f").overlapResolver.apply(modifiedTracks, adapters, this, 0, function () {
            result.forEach(function (_a) {
                var region = _a.region, delta = _a.delta;
                return region.moveContentStart(delta);
            });
        });
        console.debug("[ContentStartModifier.approve] after", {
            tracks: modifiedTracks.map(function (track) { return ({
                trackIndex: track.listIndex,
                regions: track.regions.collection.asArray().map(regionSnapshot)
            }); })
        });
    };
    RegionContentStartModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _RegionContentStartModifier_delta, 0, "f");
        __classPrivateFieldGet(this, _RegionContentStartModifier_instances, "m", _RegionContentStartModifier_dispatchChange).call(this);
    };
    RegionContentStartModifier.prototype.toString = function () { return "RegionContentStartModifier{delta: ".concat(__classPrivateFieldGet(this, _RegionContentStartModifier_delta, "f"), "}"); };
    return RegionContentStartModifier;
}());
exports.RegionContentStartModifier = RegionContentStartModifier;
_RegionContentStartModifier_project = new WeakMap(), _RegionContentStartModifier_element = new WeakMap(), _RegionContentStartModifier_snapping = new WeakMap(), _RegionContentStartModifier_pointerPulse = new WeakMap(), _RegionContentStartModifier_reference = new WeakMap(), _RegionContentStartModifier_adapters = new WeakMap(), _RegionContentStartModifier_selectedModifyStrategy = new WeakMap(), _RegionContentStartModifier_delta = new WeakMap(), _RegionContentStartModifier_instances = new WeakSet(), _RegionContentStartModifier_computeMaxDelta = function _RegionContentStartModifier_computeMaxDelta() {
    return __classPrivateFieldGet(this, _RegionContentStartModifier_adapters, "f").reduce(function (maxDelta, adapter) {
        var maxByDuration = adapter.duration - lib_dsp_1.PPQN.SemiQuaver;
        var maxByLoopDuration = adapter.loopDuration - lib_dsp_1.PPQN.SemiQuaver;
        return Math.min(maxDelta, maxByDuration, maxByLoopDuration);
    }, Infinity);
}, _RegionContentStartModifier_computeMinDelta = function _RegionContentStartModifier_computeMinDelta() {
    return __classPrivateFieldGet(this, _RegionContentStartModifier_adapters, "f").reduce(function (minDelta, adapter) { return Math.max(minDelta, -adapter.position); }, -Infinity);
}, _RegionContentStartModifier_dispatchChange = function _RegionContentStartModifier_dispatchChange() {
    __classPrivateFieldGet(this, _RegionContentStartModifier_adapters, "f").forEach(function (adapter) { return adapter.trackBoxAdapter
        .ifSome(function (trackAdapter) { return trackAdapter.regions.dispatchChange(); }); });
};
