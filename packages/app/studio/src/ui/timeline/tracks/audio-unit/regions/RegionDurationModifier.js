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
var _SelectedModifyStrategy_tool, _RegionDurationModifier_instances, _RegionDurationModifier_project, _RegionDurationModifier_element, _RegionDurationModifier_snapping, _RegionDurationModifier_pointerPulse, _RegionDurationModifier_bounds, _RegionDurationModifier_adapters, _RegionDurationModifier_selectedModifyStrategy, _RegionDurationModifier_aligned, _RegionDurationModifier_deltaDuration, _RegionDurationModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionDurationModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (region) { return region.position; };
    SelectedModifyStrategy.prototype.readDuration = function (region) { return this.readComplete(region) - this.readPosition(region); };
    SelectedModifyStrategy.prototype.readComplete = function (region) {
        if (!region.canResize) {
            return region.complete;
        }
        var duration = __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").aligned
            ? (__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").bounds[1] + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaDuration) - region.position
            : region.duration + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaDuration;
        var complete = region.position + Math.max(Math.min(__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").snapping.value(region.position), region.duration), duration);
        return region.trackBoxAdapter.map(function (trackAdapter) { return trackAdapter.regions.collection
            .greaterEqual(region.complete, function (region) { return region.isSelected; }); }).match({
            none: function () { return complete; },
            some: function (region) { return complete > region.position ? region.position : complete; }
        });
    };
    SelectedModifyStrategy.prototype.readLoopOffset = function (region) { return region.loopOffset; };
    SelectedModifyStrategy.prototype.readLoopDuration = function (region) { return region.resolveLoopDuration(this.readPosition(region)); };
    SelectedModifyStrategy.prototype.readMirror = function (region) { return region.isMirrowed; };
    SelectedModifyStrategy.prototype.translateTrackIndex = function (value) { return value; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").adapters.reduce(function (from, adapter) { return Math.min(from, adapter.position); }, from), to);
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var RegionDurationModifier = /** @class */ (function () {
    function RegionDurationModifier(_a, adapter) {
        var project = _a.project, element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, bounds = _a.bounds;
        _RegionDurationModifier_instances.add(this);
        _RegionDurationModifier_project.set(this, void 0);
        _RegionDurationModifier_element.set(this, void 0);
        _RegionDurationModifier_snapping.set(this, void 0);
        _RegionDurationModifier_pointerPulse.set(this, void 0);
        _RegionDurationModifier_bounds.set(this, void 0);
        _RegionDurationModifier_adapters.set(this, void 0);
        _RegionDurationModifier_selectedModifyStrategy.set(this, void 0);
        _RegionDurationModifier_aligned.set(this, void 0);
        _RegionDurationModifier_deltaDuration.set(this, void 0);
        __classPrivateFieldSet(this, _RegionDurationModifier_project, project, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_element, element, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_bounds, bounds, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_adapters, adapter, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_aligned, false, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_deltaDuration, 0, "f");
    }
    RegionDurationModifier.create = function (selected, construct) {
        var adapters = selected.filter(function (region) { return studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region); });
        return adapters.length === 0 ? lib_std_1.Option.None : lib_std_1.Option.wrap(new RegionDurationModifier(construct, adapters));
    };
    Object.defineProperty(RegionDurationModifier.prototype, "snapping", {
        get: function () { return __classPrivateFieldGet(this, _RegionDurationModifier_snapping, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionDurationModifier.prototype, "adapters", {
        get: function () { return __classPrivateFieldGet(this, _RegionDurationModifier_adapters, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionDurationModifier.prototype, "aligned", {
        get: function () { return __classPrivateFieldGet(this, _RegionDurationModifier_aligned, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionDurationModifier.prototype, "deltaDuration", {
        get: function () { return __classPrivateFieldGet(this, _RegionDurationModifier_deltaDuration, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionDurationModifier.prototype, "bounds", {
        get: function () { return __classPrivateFieldGet(this, _RegionDurationModifier_bounds, "f"); },
        enumerable: false,
        configurable: true
    });
    RegionDurationModifier.prototype.showOrigin = function () { return false; };
    RegionDurationModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _RegionDurationModifier_selectedModifyStrategy, "f"); };
    RegionDurationModifier.prototype.unselectedModifyStrategy = function () { return studio_core_1.RegionModifyStrategy.Identity; };
    RegionDurationModifier.prototype.update = function (_a) {
        var clientX = _a.clientX, aligned = _a.ctrlKey;
        var originalDuration = __classPrivateFieldGet(this, _RegionDurationModifier_bounds, "f")[1] - __classPrivateFieldGet(this, _RegionDurationModifier_bounds, "f")[0];
        var deltaDuration = __classPrivateFieldGet(this, _RegionDurationModifier_snapping, "f").computeDelta(__classPrivateFieldGet(this, _RegionDurationModifier_pointerPulse, "f"), clientX - __classPrivateFieldGet(this, _RegionDurationModifier_element, "f").getBoundingClientRect().left, originalDuration);
        var change = false;
        if (__classPrivateFieldGet(this, _RegionDurationModifier_aligned, "f") !== aligned) {
            __classPrivateFieldSet(this, _RegionDurationModifier_aligned, aligned, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _RegionDurationModifier_deltaDuration, "f") !== deltaDuration) {
            __classPrivateFieldSet(this, _RegionDurationModifier_deltaDuration, deltaDuration, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _RegionDurationModifier_instances, "m", _RegionDurationModifier_dispatchChange).call(this);
        }
    };
    RegionDurationModifier.prototype.approve = function () {
        var _this = this;
        var modifiedTracks = lib_std_1.Arrays.removeDuplicates(__classPrivateFieldGet(this, _RegionDurationModifier_adapters, "f")
            .map(function (adapter) { return adapter.trackBoxAdapter.unwrapOrNull(); })
            .filter(lib_std_1.isNotNull));
        var adapters = __classPrivateFieldGet(this, _RegionDurationModifier_adapters, "f").filter(function (_a) {
            var box = _a.box;
            return box.isAttached();
        });
        var result = __classPrivateFieldGet(this, _RegionDurationModifier_adapters, "f").map(function (region) {
            return ({ region: region, duration: __classPrivateFieldGet(_this, _RegionDurationModifier_selectedModifyStrategy, "f").readDuration(region) });
        });
        var regionSnapshot = function (region) {
            return ({ p: region.position, d: region.duration, c: region.complete, s: region.isSelected });
        };
        var trackSnapshots = modifiedTracks.map(function (track) { return ({
            trackIndex: track.listIndex,
            before: track.regions.collection.asArray().map(regionSnapshot)
        }); });
        console.debug("[RegionDurationModifier.approve]", {
            deltaDuration: __classPrivateFieldGet(this, _RegionDurationModifier_deltaDuration, "f"), aligned: __classPrivateFieldGet(this, _RegionDurationModifier_aligned, "f"),
            changes: result.map(function (entry) { return ({
                p: entry.region.position,
                oldD: entry.region.duration,
                newD: entry.duration
            }); }),
            trackSnapshots: trackSnapshots
        });
        __classPrivateFieldGet(this, _RegionDurationModifier_project, "f").overlapResolver.apply(modifiedTracks, adapters, this, 0, function (_trackResolver) {
            result.forEach(function (_a) {
                var region = _a.region, duration = _a.duration;
                return region.duration = duration;
            });
        });
        console.debug("[RegionDurationModifier.approve] after", {
            tracks: modifiedTracks.map(function (track) { return ({
                trackIndex: track.listIndex,
                regions: track.regions.collection.asArray().map(regionSnapshot)
            }); })
        });
    };
    RegionDurationModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _RegionDurationModifier_aligned, false, "f");
        __classPrivateFieldSet(this, _RegionDurationModifier_deltaDuration, 0, "f");
        __classPrivateFieldGet(this, _RegionDurationModifier_instances, "m", _RegionDurationModifier_dispatchChange).call(this);
    };
    RegionDurationModifier.prototype.toString = function () {
        return "RegionDurationModifier{aligned: ".concat(__classPrivateFieldGet(this, _RegionDurationModifier_aligned, "f"), ", deltaDuration: ").concat(__classPrivateFieldGet(this, _RegionDurationModifier_deltaDuration, "f"), "}");
    };
    return RegionDurationModifier;
}());
exports.RegionDurationModifier = RegionDurationModifier;
_RegionDurationModifier_project = new WeakMap(), _RegionDurationModifier_element = new WeakMap(), _RegionDurationModifier_snapping = new WeakMap(), _RegionDurationModifier_pointerPulse = new WeakMap(), _RegionDurationModifier_bounds = new WeakMap(), _RegionDurationModifier_adapters = new WeakMap(), _RegionDurationModifier_selectedModifyStrategy = new WeakMap(), _RegionDurationModifier_aligned = new WeakMap(), _RegionDurationModifier_deltaDuration = new WeakMap(), _RegionDurationModifier_instances = new WeakSet(), _RegionDurationModifier_dispatchChange = function _RegionDurationModifier_dispatchChange() {
    __classPrivateFieldGet(this, _RegionDurationModifier_adapters, "f").forEach(function (adapter) { return adapter.trackBoxAdapter
        .ifSome(function (trackAdapter) { return trackAdapter.regions.dispatchChange(); }); });
};
