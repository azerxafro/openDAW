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
var _SelectedModifyStrategy_tool, _RegionLoopDurationModifier_instances, _RegionLoopDurationModifier_project, _RegionLoopDurationModifier_element, _RegionLoopDurationModifier_snapping, _RegionLoopDurationModifier_pointerPulse, _RegionLoopDurationModifier_reference, _RegionLoopDurationModifier_resize, _RegionLoopDurationModifier_adapters, _RegionLoopDurationModifier_selectedModifyStrategy, _RegionLoopDurationModifier_deltaLoopDuration, _RegionLoopDurationModifier_dispatchChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionLoopDurationModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readPosition = function (region) { return region.position; };
    SelectedModifyStrategy.prototype.readDuration = function (region) {
        return this.readComplete(region) - this.readPosition(region);
    };
    SelectedModifyStrategy.prototype.readComplete = function (region) {
        var newLoopDuration = this.readLoopDuration(region);
        var duration = newLoopDuration <= region.loopDuration
            ? region.duration
            : Math.max(region.duration, newLoopDuration - region.loopOffset);
        var complete = region.position + duration;
        return region.trackBoxAdapter.map(function (trackAdapter) { return trackAdapter.regions.collection
            .greaterEqual(region.complete, function (region) { return region.isSelected; }); }).match({
            none: function () { return complete; },
            some: function (region) { return complete > region.position ? region.position : complete; }
        });
    };
    SelectedModifyStrategy.prototype.readLoopOffset = function (region) { return region.loopOffset; };
    SelectedModifyStrategy.prototype.readLoopDuration = function (region) {
        if (!region.canResize) {
            return region.loopDuration;
        }
        return Math.max(Math.min(lib_dsp_1.PPQN.SemiQuaver, region.loopDuration), region.loopDuration + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaLoopDuration);
    };
    SelectedModifyStrategy.prototype.readMirror = function (region) { return region.isMirrowed; };
    SelectedModifyStrategy.prototype.translateTrackIndex = function (value) { return value; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(__classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").adapters.reduce(function (from, adapter) { return Math.min(from, adapter.position); }, from), to);
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var RegionLoopDurationModifier = /** @class */ (function () {
    function RegionLoopDurationModifier(_a, adapter) {
        var project = _a.project, element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, reference = _a.reference, resize = _a.resize;
        _RegionLoopDurationModifier_instances.add(this);
        _RegionLoopDurationModifier_project.set(this, void 0);
        _RegionLoopDurationModifier_element.set(this, void 0);
        _RegionLoopDurationModifier_snapping.set(this, void 0);
        _RegionLoopDurationModifier_pointerPulse.set(this, void 0);
        _RegionLoopDurationModifier_reference.set(this, void 0);
        _RegionLoopDurationModifier_resize.set(this, void 0);
        _RegionLoopDurationModifier_adapters.set(this, void 0);
        _RegionLoopDurationModifier_selectedModifyStrategy.set(this, void 0);
        _RegionLoopDurationModifier_deltaLoopDuration.set(this, void 0);
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_project, project, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_element, element, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_resize, resize, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_adapters, adapter, "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_deltaLoopDuration, 0, "f");
    }
    RegionLoopDurationModifier.create = function (selected, construct) {
        var adapters = selected.filter(function (region) { return studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region); });
        return adapters.length === 0 ? lib_std_1.Option.None : lib_std_1.Option.wrap(new RegionLoopDurationModifier(construct, adapters));
    };
    Object.defineProperty(RegionLoopDurationModifier.prototype, "snapping", {
        get: function () { return __classPrivateFieldGet(this, _RegionLoopDurationModifier_snapping, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionLoopDurationModifier.prototype, "deltaLoopDuration", {
        get: function () { return __classPrivateFieldGet(this, _RegionLoopDurationModifier_deltaLoopDuration, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionLoopDurationModifier.prototype, "reference", {
        get: function () { return __classPrivateFieldGet(this, _RegionLoopDurationModifier_reference, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionLoopDurationModifier.prototype, "adapters", {
        get: function () { return __classPrivateFieldGet(this, _RegionLoopDurationModifier_adapters, "f"); },
        enumerable: false,
        configurable: true
    });
    RegionLoopDurationModifier.prototype.showOrigin = function () { return false; };
    RegionLoopDurationModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _RegionLoopDurationModifier_selectedModifyStrategy, "f"); };
    RegionLoopDurationModifier.prototype.unselectedModifyStrategy = function () { return studio_core_1.RegionModifyStrategy.Identity; };
    RegionLoopDurationModifier.prototype.update = function (_a) {
        var clientX = _a.clientX;
        var _b = __classPrivateFieldGet(this, _RegionLoopDurationModifier_reference, "f"), position = _b.position, complete = _b.complete, loopOffset = _b.loopOffset, loopDuration = _b.loopDuration;
        var delta = __classPrivateFieldGet(this, _RegionLoopDurationModifier_resize, "f") ? complete - (position + loopDuration - loopOffset) : 0;
        var clientRect = __classPrivateFieldGet(this, _RegionLoopDurationModifier_element, "f").getBoundingClientRect();
        var deltaDuration = __classPrivateFieldGet(this, _RegionLoopDurationModifier_snapping, "f").computeDelta(__classPrivateFieldGet(this, _RegionLoopDurationModifier_pointerPulse, "f") - delta, clientX - clientRect.left, loopDuration);
        var change = false;
        if (__classPrivateFieldGet(this, _RegionLoopDurationModifier_deltaLoopDuration, "f") !== deltaDuration) {
            __classPrivateFieldSet(this, _RegionLoopDurationModifier_deltaLoopDuration, deltaDuration, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _RegionLoopDurationModifier_instances, "m", _RegionLoopDurationModifier_dispatchChange).call(this);
        }
    };
    RegionLoopDurationModifier.prototype.approve = function () {
        var _this = this;
        var modifiedTracks = lib_std_1.Arrays.removeDuplicates(__classPrivateFieldGet(this, _RegionLoopDurationModifier_adapters, "f")
            .map(function (adapter) { return adapter.trackBoxAdapter.unwrapOrNull(); })
            .filter(lib_std_1.isNotNull));
        var adapters = __classPrivateFieldGet(this, _RegionLoopDurationModifier_adapters, "f").filter(function (_a) {
            var box = _a.box;
            return box.isAttached();
        });
        var result = adapters.map(function (region) {
            return ({
                region: region,
                duration: __classPrivateFieldGet(_this, _RegionLoopDurationModifier_selectedModifyStrategy, "f").readDuration(region),
                loopDuration: __classPrivateFieldGet(_this, _RegionLoopDurationModifier_selectedModifyStrategy, "f").readLoopDuration(region)
            });
        });
        var regionSnapshot = function (region) {
            return ({ p: region.position, d: region.duration, c: region.complete, s: region.isSelected });
        };
        var trackSnapshots = modifiedTracks.map(function (track) { return ({
            trackIndex: track.listIndex,
            before: track.regions.collection.asArray().map(regionSnapshot)
        }); });
        console.debug("[RegionLoopDurationModifier.approve]", {
            deltaLoopDuration: __classPrivateFieldGet(this, _RegionLoopDurationModifier_deltaLoopDuration, "f"),
            changes: result.map(function (entry) { return ({
                p: entry.region.position, oldD: entry.region.duration, newD: entry.duration,
                oldLD: entry.region.loopDuration, newLD: entry.loopDuration
            }); }),
            trackSnapshots: trackSnapshots
        });
        __classPrivateFieldGet(this, _RegionLoopDurationModifier_project, "f").overlapResolver.apply(modifiedTracks, adapters, this, 0, function (_trackResolver) {
            result.forEach(function (_a) {
                var region = _a.region, duration = _a.duration, loopDuration = _a.loopDuration;
                region.duration = duration;
                region.loopDuration = loopDuration;
            });
        });
        console.debug("[RegionLoopDurationModifier.approve] after", {
            tracks: modifiedTracks.map(function (track) { return ({
                trackIndex: track.listIndex,
                regions: track.regions.collection.asArray().map(regionSnapshot)
            }); })
        });
    };
    RegionLoopDurationModifier.prototype.cancel = function () {
        __classPrivateFieldSet(this, _RegionLoopDurationModifier_deltaLoopDuration, 0, "f");
        __classPrivateFieldGet(this, _RegionLoopDurationModifier_instances, "m", _RegionLoopDurationModifier_dispatchChange).call(this);
    };
    RegionLoopDurationModifier.prototype.toString = function () {
        return "RegionLoopDurationModifier{deltaLoopDuration: ".concat(__classPrivateFieldGet(this, _RegionLoopDurationModifier_deltaLoopDuration, "f"), "}");
    };
    return RegionLoopDurationModifier;
}());
exports.RegionLoopDurationModifier = RegionLoopDurationModifier;
_RegionLoopDurationModifier_project = new WeakMap(), _RegionLoopDurationModifier_element = new WeakMap(), _RegionLoopDurationModifier_snapping = new WeakMap(), _RegionLoopDurationModifier_pointerPulse = new WeakMap(), _RegionLoopDurationModifier_reference = new WeakMap(), _RegionLoopDurationModifier_resize = new WeakMap(), _RegionLoopDurationModifier_adapters = new WeakMap(), _RegionLoopDurationModifier_selectedModifyStrategy = new WeakMap(), _RegionLoopDurationModifier_deltaLoopDuration = new WeakMap(), _RegionLoopDurationModifier_instances = new WeakSet(), _RegionLoopDurationModifier_dispatchChange = function _RegionLoopDurationModifier_dispatchChange() {
    __classPrivateFieldGet(this, _RegionLoopDurationModifier_adapters, "f").forEach(function (adapter) { return adapter.trackBoxAdapter
        .ifSome(function (track) { return track.regions.dispatchChange(); }); });
};
