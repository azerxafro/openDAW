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
var _SelectedModifyStrategy_tool, _RegionStartModifier_instances, _RegionStartModifier_project, _RegionStartModifier_element, _RegionStartModifier_snapping, _RegionStartModifier_pointerPulse, _RegionStartModifier_reference, _RegionStartModifier_adapters, _RegionStartModifier_selectedModifyStrategy, _RegionStartModifier_aligned, _RegionStartModifier_deltaStart, _RegionStartModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionStartModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (region) { return region.position + this.computeClampedDelta(region); };
    SelectedModifyStrategy.prototype.readComplete = function (region) { return region.complete; };
    SelectedModifyStrategy.prototype.readLoopOffset = function (region) {
        var newPosition = this.readPosition(region);
        return (0, lib_std_1.mod)(region.loopOffset + this.computeClampedDelta(region), region.resolveLoopDuration(newPosition));
    };
    SelectedModifyStrategy.prototype.readLoopDuration = function (region) { return region.resolveLoopDuration(this.readPosition(region)); };
    SelectedModifyStrategy.prototype.readMirror = function (region) { return region.isMirrowed; };
    SelectedModifyStrategy.prototype.translateTrackIndex = function (value) { return value; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(from, __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").adapters.reduce(function (to, adapter) { return Math.max(to, adapter.complete); }, to));
    };
    SelectedModifyStrategy.prototype.computeClampedDelta = function (region) {
        if (!region.canResize) {
            return 0;
        }
        var position = (__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").aligned ? __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").reference.position : region.position) + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaStart;
        region.trackBoxAdapter.map(function (trackAdapter) { return trackAdapter.regions.collection
            .lowerEqual(region.position - 1, function (region) { return region.isSelected; }); })
            .ifSome(function (region) {
            if (position < region.complete) {
                position = region.complete;
            }
        });
        var min = Math.min(region.duration, __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").snapping.value(region.position));
        return Math.max(region.duration - Math.max(min, region.complete - position), -region.position);
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var RegionStartModifier = /** @class */ (function () {
    function RegionStartModifier(_a, adapter) {
        var project = _a.project, element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, reference = _a.reference;
        _RegionStartModifier_instances.add(this);
        _RegionStartModifier_project.set(this, void 0);
        _RegionStartModifier_element.set(this, void 0);
        _RegionStartModifier_snapping.set(this, void 0);
        _RegionStartModifier_pointerPulse.set(this, void 0);
        _RegionStartModifier_reference.set(this, void 0);
        _RegionStartModifier_adapters.set(this, void 0);
        _RegionStartModifier_selectedModifyStrategy.set(this, void 0);
        _RegionStartModifier_aligned.set(this, void 0);
        _RegionStartModifier_deltaStart.set(this, void 0);
        __classPrivateFieldSet(this, _RegionStartModifier_project, project, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_element, element, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_adapters, adapter, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _RegionStartModifier_aligned, false, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_deltaStart, 0, "f");
    }
    RegionStartModifier.create = function (selected, construct) {
        var adapters = selected.filter(function (region) { return studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region); });
        return adapters.length === 0 ? lib_std_1.Option.None : lib_std_1.Option.wrap(new RegionStartModifier(construct, adapters));
    };
    Object.defineProperty(RegionStartModifier.prototype, "aligned", {
        get: function () { return __classPrivateFieldGet(this, _RegionStartModifier_aligned, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionStartModifier.prototype, "deltaStart", {
        get: function () { return __classPrivateFieldGet(this, _RegionStartModifier_deltaStart, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionStartModifier.prototype, "snapping", {
        get: function () { return __classPrivateFieldGet(this, _RegionStartModifier_snapping, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionStartModifier.prototype, "adapters", {
        get: function () { return __classPrivateFieldGet(this, _RegionStartModifier_adapters, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionStartModifier.prototype, "reference", {
        get: function () { return __classPrivateFieldGet(this, _RegionStartModifier_reference, "f"); },
        enumerable: false,
        configurable: true
    });
    RegionStartModifier.prototype.showOrigin = function () { return false; };
    RegionStartModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _RegionStartModifier_selectedModifyStrategy, "f"); };
    RegionStartModifier.prototype.unselectedModifyStrategy = function () { return studio_core_1.RegionModifyStrategy.Identity; };
    RegionStartModifier.prototype.update = function (_a) {
        var clientX = _a.clientX, ctrlKey = _a.ctrlKey;
        var aligned = ctrlKey;
        var deltaStart = __classPrivateFieldGet(this, _RegionStartModifier_snapping, "f").computeDelta(__classPrivateFieldGet(this, _RegionStartModifier_pointerPulse, "f"), clientX - __classPrivateFieldGet(this, _RegionStartModifier_element, "f").getBoundingClientRect().left, __classPrivateFieldGet(this, _RegionStartModifier_reference, "f").position);
        var change = false;
        if (__classPrivateFieldGet(this, _RegionStartModifier_aligned, "f") !== aligned) {
            __classPrivateFieldSet(this, _RegionStartModifier_aligned, aligned, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _RegionStartModifier_deltaStart, "f") !== deltaStart) {
            __classPrivateFieldSet(this, _RegionStartModifier_deltaStart, deltaStart, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _RegionStartModifier_instances, "m", _RegionStartModifier_dispatchChange).call(this);
        }
    };
    RegionStartModifier.prototype.approve = function () {
        var _this = this;
        var modifiedTracks = lib_std_1.Arrays.removeDuplicates(__classPrivateFieldGet(this, _RegionStartModifier_adapters, "f")
            .map(function (adapter) { return adapter.trackBoxAdapter.unwrapOrNull(); }).filter(lib_std_1.isNotNull));
        var adapters = __classPrivateFieldGet(this, _RegionStartModifier_adapters, "f").filter(function (_a) {
            var box = _a.box;
            return box.isAttached();
        });
        var result = __classPrivateFieldGet(this, _RegionStartModifier_adapters, "f").map(function (region) {
            return ({ region: region, delta: __classPrivateFieldGet(_this, _RegionStartModifier_selectedModifyStrategy, "f").computeClampedDelta(region) });
        });
        var regionSnapshot = function (region) {
            return ({ p: region.position, d: region.duration, c: region.complete, s: region.isSelected });
        };
        var trackSnapshots = modifiedTracks.map(function (track) { return ({
            trackIndex: track.listIndex,
            before: track.regions.collection.asArray().map(regionSnapshot)
        }); });
        console.debug("[RegionStartModifier.approve]", {
            deltaStart: __classPrivateFieldGet(this, _RegionStartModifier_deltaStart, "f"), aligned: __classPrivateFieldGet(this, _RegionStartModifier_aligned, "f"),
            changes: result.map(function (entry) { return ({ p: entry.region.position, d: entry.region.duration, delta: entry.delta }); }),
            trackSnapshots: trackSnapshots
        });
        __classPrivateFieldGet(this, _RegionStartModifier_project, "f").overlapResolver.apply(modifiedTracks, adapters, this, 0, function (_trackResolver) {
            result.forEach(function (_a) {
                var region = _a.region, delta = _a.delta;
                region.position += delta;
                region.duration -= delta;
                region.loopOffset = (0, lib_std_1.mod)(region.loopOffset + delta, region.loopDuration);
            });
        });
        console.debug("[RegionStartModifier.approve] after", {
            tracks: modifiedTracks.map(function (track) { return ({
                trackIndex: track.listIndex,
                regions: track.regions.collection.asArray().map(regionSnapshot)
            }); })
        });
    };
    RegionStartModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _RegionStartModifier_aligned, false, "f");
        __classPrivateFieldSet(this, _RegionStartModifier_deltaStart, 0, "f");
        __classPrivateFieldGet(this, _RegionStartModifier_instances, "m", _RegionStartModifier_dispatchChange).call(this);
    };
    RegionStartModifier.prototype.toString = function () {
        return "RegionStartModifier{aligned: ".concat(__classPrivateFieldGet(this, _RegionStartModifier_aligned, "f"), ", deltaStart: ").concat(__classPrivateFieldGet(this, _RegionStartModifier_deltaStart, "f"), "}");
    };
    return RegionStartModifier;
}());
exports.RegionStartModifier = RegionStartModifier;
_RegionStartModifier_project = new WeakMap(), _RegionStartModifier_element = new WeakMap(), _RegionStartModifier_snapping = new WeakMap(), _RegionStartModifier_pointerPulse = new WeakMap(), _RegionStartModifier_reference = new WeakMap(), _RegionStartModifier_adapters = new WeakMap(), _RegionStartModifier_selectedModifyStrategy = new WeakMap(), _RegionStartModifier_aligned = new WeakMap(), _RegionStartModifier_deltaStart = new WeakMap(), _RegionStartModifier_instances = new WeakSet(), _RegionStartModifier_dispatchChange = function _RegionStartModifier_dispatchChange() {
    __classPrivateFieldGet(this, _RegionStartModifier_adapters, "f").forEach(function (adapter) { return adapter.trackBoxAdapter
        .ifSome(function (trackAdapter) { return trackAdapter.regions.dispatchChange(); }); });
};
