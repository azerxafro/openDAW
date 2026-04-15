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
var _SelectedModifyStrategy_tool, _UnselectedStrategy_tool, _RegionMoveModifier_instances, _RegionMoveModifier_manager, _RegionMoveModifier_project, _RegionMoveModifier_selection, _RegionMoveModifier_element, _RegionMoveModifier_snapping, _RegionMoveModifier_pointerPulse, _RegionMoveModifier_pointerIndex, _RegionMoveModifier_reference, _RegionMoveModifier_selectedModifyStrategy, _RegionMoveModifier_unselectedModifyStrategy, _RegionMoveModifier_copy, _RegionMoveModifier_mirroredCopy, _RegionMoveModifier_deltaIndex, _RegionMoveModifier_deltaPosition, _RegionMoveModifier_dispatchChange, _RegionMoveModifier_dispatchSameTrackChange, _RegionMoveModifier_dispatchShiftedTrackChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionMoveModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.translateTrackIndex = function (index) { return index - __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaIndex; };
    SelectedModifyStrategy.prototype.readPosition = function (region) { return region.position + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition; };
    SelectedModifyStrategy.prototype.readComplete = function (region) { return region.resolveComplete(this.readPosition(region)); };
    SelectedModifyStrategy.prototype.readLoopDuration = function (region) { return region.resolveLoopDuration(this.readPosition(region)); };
    SelectedModifyStrategy.prototype.readMirror = function (region) { return region.canMirror && region.isMirrowed !== __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").mirroredCopy; };
    SelectedModifyStrategy.prototype.readLoopOffset = function (region) { return region.loopOffset; };
    SelectedModifyStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(from - __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition, to - __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").deltaPosition);
    };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var UnselectedStrategy = /** @class */ (function () {
    function UnselectedStrategy(tool) {
        _UnselectedStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _UnselectedStrategy_tool, tool, "f");
    }
    UnselectedStrategy.prototype.translateTrackIndex = function (index) { return index; };
    UnselectedStrategy.prototype.readPosition = function (region) { return region.position; };
    UnselectedStrategy.prototype.readComplete = function (region) { return region.resolveComplete(this.readPosition(region)); };
    UnselectedStrategy.prototype.readLoopDuration = function (region) {
        return region.resolveLoopDuration(this.readPosition(region));
    };
    UnselectedStrategy.prototype.readMirror = function (region) {
        return region.canMirror && (region.isMirrowed || (region.isSelected && __classPrivateFieldGet(this, _UnselectedStrategy_tool, "f").mirroredCopy));
    };
    UnselectedStrategy.prototype.readLoopOffset = function (region) {
        return region.loopOffset;
    };
    UnselectedStrategy.prototype.iterateRange = function (regions, from, to) {
        return regions.iterateRange(from, to);
    };
    return UnselectedStrategy;
}());
_UnselectedStrategy_tool = new WeakMap();
var RegionMoveModifier = /** @class */ (function () {
    function RegionMoveModifier(trackManager, selection, _a) {
        var element = _a.element, snapping = _a.snapping, pointerPulse = _a.pointerPulse, pointerIndex = _a.pointerIndex, reference = _a.reference;
        _RegionMoveModifier_instances.add(this);
        _RegionMoveModifier_manager.set(this, void 0);
        _RegionMoveModifier_project.set(this, void 0);
        _RegionMoveModifier_selection.set(this, void 0);
        _RegionMoveModifier_element.set(this, void 0);
        _RegionMoveModifier_snapping.set(this, void 0);
        _RegionMoveModifier_pointerPulse.set(this, void 0);
        _RegionMoveModifier_pointerIndex.set(this, void 0);
        _RegionMoveModifier_reference.set(this, void 0);
        _RegionMoveModifier_selectedModifyStrategy.set(this, void 0);
        _RegionMoveModifier_unselectedModifyStrategy.set(this, void 0);
        _RegionMoveModifier_copy.set(this, void 0);
        _RegionMoveModifier_mirroredCopy.set(this, void 0);
        _RegionMoveModifier_deltaIndex.set(this, void 0);
        _RegionMoveModifier_deltaPosition.set(this, void 0);
        __classPrivateFieldSet(this, _RegionMoveModifier_manager, trackManager, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_project, trackManager.service.project, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_element, element, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_pointerPulse, pointerPulse, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_pointerIndex, pointerIndex, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_reference, reference, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_unselectedModifyStrategy, new UnselectedStrategy(this), "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_copy, false, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_mirroredCopy, false, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_deltaIndex, 0, "f");
        __classPrivateFieldSet(this, _RegionMoveModifier_deltaPosition, 0, "f");
    }
    RegionMoveModifier.create = function (trackManager, selection, construct) {
        return selection.isEmpty()
            ? lib_std_1.Option.None
            : lib_std_1.Option.wrap(new RegionMoveModifier(trackManager, selection, construct));
    };
    Object.defineProperty(RegionMoveModifier.prototype, "copy", {
        get: function () { return __classPrivateFieldGet(this, _RegionMoveModifier_copy, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionMoveModifier.prototype, "mirroredCopy", {
        get: function () { return __classPrivateFieldGet(this, _RegionMoveModifier_mirroredCopy, "f") && __classPrivateFieldGet(this, _RegionMoveModifier_copy, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionMoveModifier.prototype, "deltaIndex", {
        get: function () { return __classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionMoveModifier.prototype, "deltaPosition", {
        get: function () { return __classPrivateFieldGet(this, _RegionMoveModifier_deltaPosition, "f"); },
        enumerable: false,
        configurable: true
    });
    RegionMoveModifier.prototype.showOrigin = function () { return __classPrivateFieldGet(this, _RegionMoveModifier_copy, "f"); };
    RegionMoveModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _RegionMoveModifier_selectedModifyStrategy, "f"); };
    RegionMoveModifier.prototype.unselectedModifyStrategy = function () { return __classPrivateFieldGet(this, _RegionMoveModifier_unselectedModifyStrategy, "f"); };
    RegionMoveModifier.prototype.update = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY, ctrlKey = _a.ctrlKey, shiftKey = _a.shiftKey;
        var adapters = __classPrivateFieldGet(this, _RegionMoveModifier_selection, "f").selected().filter(function (adapter) { return adapter.trackBoxAdapter.nonEmpty(); });
        if (adapters.length === 0) {
            return;
        }
        var maxIndex = __classPrivateFieldGet(this, _RegionMoveModifier_manager, "f").numTracks() - 1;
        var clientRect = __classPrivateFieldGet(this, _RegionMoveModifier_element, "f").getBoundingClientRect();
        var deltaIndex = adapters.reduce(function (delta, adapter) {
            var listIndex = adapter.trackBoxAdapter.unwrap().listIndex;
            return (0, lib_std_1.clamp)(delta, -listIndex, maxIndex - listIndex);
        }, __classPrivateFieldGet(this, _RegionMoveModifier_manager, "f").globalToIndex(clientY) - __classPrivateFieldGet(this, _RegionMoveModifier_pointerIndex, "f"));
        var deltaPosition = adapters.reduce(function (delta, adapter) {
            return Math.max(delta, -adapter.position);
        }, __classPrivateFieldGet(this, _RegionMoveModifier_snapping, "f")
            .computeDelta(__classPrivateFieldGet(this, _RegionMoveModifier_pointerPulse, "f"), clientX - clientRect.left, __classPrivateFieldGet(this, _RegionMoveModifier_reference, "f").position));
        var change = false;
        if (__classPrivateFieldGet(this, _RegionMoveModifier_deltaPosition, "f") !== deltaPosition) {
            __classPrivateFieldSet(this, _RegionMoveModifier_deltaPosition, deltaPosition, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f") !== deltaIndex) {
            __classPrivateFieldGet(this, _RegionMoveModifier_instances, "m", _RegionMoveModifier_dispatchShiftedTrackChange).call(this, __classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f")); // removes old preview
            __classPrivateFieldSet(this, _RegionMoveModifier_deltaIndex, deltaIndex, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _RegionMoveModifier_copy, "f") !== ctrlKey) {
            __classPrivateFieldSet(this, _RegionMoveModifier_copy, ctrlKey, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _RegionMoveModifier_mirroredCopy, "f") !== shiftKey) {
            __classPrivateFieldSet(this, _RegionMoveModifier_mirroredCopy, shiftKey, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _RegionMoveModifier_instances, "m", _RegionMoveModifier_dispatchChange).call(this);
        }
    };
    RegionMoveModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f") === 0 && __classPrivateFieldGet(this, _RegionMoveModifier_deltaPosition, "f") === 0) {
            if (__classPrivateFieldGet(this, _RegionMoveModifier_copy, "f")) {
                __classPrivateFieldGet(this, _RegionMoveModifier_instances, "m", _RegionMoveModifier_dispatchChange).call(this);
            } // reset visuals
            return;
        }
        var adapters = __classPrivateFieldGet(this, _RegionMoveModifier_selection, "f").selected().filter(function (adapter) { return adapter.trackBoxAdapter.nonEmpty(); });
        if (adapters.length === 0) {
            return;
        }
        if (!adapters.every(function (adapter) {
            var trackIndex = adapter.trackBoxAdapter.unwrap().listIndex + __classPrivateFieldGet(_this, _RegionMoveModifier_deltaIndex, "f");
            var trackAdapter = __classPrivateFieldGet(_this, _RegionMoveModifier_manager, "f").getByIndex(trackIndex).unwrap().trackBoxAdapter;
            return trackAdapter.accepts(adapter);
        })) {
            this.cancel();
            dialogs_tsx_1.Dialogs.info({ message: "Cannot move region to different track type." }).finally();
            return;
        }
        var modifiedTracks = lib_std_1.Arrays.removeDuplicates(adapters
            .map(function (adapter) { return adapter.trackBoxAdapter.unwrap().listIndex + __classPrivateFieldGet(_this, _RegionMoveModifier_deltaIndex, "f"); }))
            .map(function (index) { return __classPrivateFieldGet(_this, _RegionMoveModifier_manager, "f").getByIndex(index).unwrap().trackBoxAdapter; });
        var regionSnapshot = function (region) {
            return ({ p: region.position, d: region.duration, c: region.complete, s: region.isSelected });
        };
        var trackSnapshots = modifiedTracks.map(function (track) { return ({
            trackIndex: track.listIndex,
            before: track.regions.collection.asArray().map(regionSnapshot)
        }); });
        console.debug("[RegionMoveModifier.approve]", {
            deltaIndex: __classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f"), deltaPosition: __classPrivateFieldGet(this, _RegionMoveModifier_deltaPosition, "f"), copy: __classPrivateFieldGet(this, _RegionMoveModifier_copy, "f"),
            adapters: adapters.map(regionSnapshot),
            trackSnapshots: trackSnapshots
        });
        __classPrivateFieldGet(this, _RegionMoveModifier_project, "f").overlapResolver.apply(modifiedTracks, adapters, this, __classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f"), function (trackResolver) {
            var _a;
            if (__classPrivateFieldGet(_this, _RegionMoveModifier_copy, "f")) {
                var copies = adapters.map(function (original) {
                    var defaultTrack = __classPrivateFieldGet(_this, _RegionMoveModifier_manager, "f")
                        .getByIndex(original.trackBoxAdapter.unwrap().listIndex + __classPrivateFieldGet(_this, _RegionMoveModifier_deltaIndex, "f"))
                        .unwrap().trackBoxAdapter;
                    var targetTrack = trackResolver(original, defaultTrack);
                    return original.copyTo({
                        position: original.position + __classPrivateFieldGet(_this, _RegionMoveModifier_deltaPosition, "f"),
                        target: targetTrack.box.regions,
                        consolidate: original.isMirrowed === __classPrivateFieldGet(_this, _RegionMoveModifier_mirroredCopy, "f")
                    });
                });
                __classPrivateFieldGet(_this, _RegionMoveModifier_selection, "f").deselectAll();
                (_a = __classPrivateFieldGet(_this, _RegionMoveModifier_selection, "f")).select.apply(_a, copies);
            }
            else {
                if (__classPrivateFieldGet(_this, _RegionMoveModifier_deltaIndex, "f") !== 0) {
                    adapters.forEach(function (adapter) {
                        var defaultTrack = __classPrivateFieldGet(_this, _RegionMoveModifier_manager, "f")
                            .getByIndex(adapter.trackBoxAdapter.unwrap().listIndex + __classPrivateFieldGet(_this, _RegionMoveModifier_deltaIndex, "f"))
                            .unwrap().trackBoxAdapter;
                        var targetTrack = trackResolver(adapter, defaultTrack);
                        adapter.box.regions.refer(targetTrack.box.regions);
                    });
                }
                adapters.forEach(function (adapter) { return adapter.position += __classPrivateFieldGet(_this, _RegionMoveModifier_deltaPosition, "f"); });
            }
        });
        console.debug("[RegionMoveModifier.approve] after", {
            tracks: modifiedTracks.map(function (track) { return ({
                trackIndex: track.listIndex,
                regions: track.regions.collection.asArray().map(regionSnapshot)
            }); })
        });
    };
    RegionMoveModifier.prototype.cancel = function () { __classPrivateFieldGet(this, _RegionMoveModifier_instances, "m", _RegionMoveModifier_dispatchChange).call(this); };
    RegionMoveModifier.prototype.toString = function () {
        return "RegionMoveModifier{deltaIndex: ".concat(__classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f"), ", deltaPosition: ").concat(__classPrivateFieldGet(this, _RegionMoveModifier_deltaPosition, "f"), ", copy: ").concat(__classPrivateFieldGet(this, _RegionMoveModifier_copy, "f"), ", mirroredCopy: ").concat(__classPrivateFieldGet(this, _RegionMoveModifier_mirroredCopy, "f"), "}");
    };
    return RegionMoveModifier;
}());
exports.RegionMoveModifier = RegionMoveModifier;
_RegionMoveModifier_manager = new WeakMap(), _RegionMoveModifier_project = new WeakMap(), _RegionMoveModifier_selection = new WeakMap(), _RegionMoveModifier_element = new WeakMap(), _RegionMoveModifier_snapping = new WeakMap(), _RegionMoveModifier_pointerPulse = new WeakMap(), _RegionMoveModifier_pointerIndex = new WeakMap(), _RegionMoveModifier_reference = new WeakMap(), _RegionMoveModifier_selectedModifyStrategy = new WeakMap(), _RegionMoveModifier_unselectedModifyStrategy = new WeakMap(), _RegionMoveModifier_copy = new WeakMap(), _RegionMoveModifier_mirroredCopy = new WeakMap(), _RegionMoveModifier_deltaIndex = new WeakMap(), _RegionMoveModifier_deltaPosition = new WeakMap(), _RegionMoveModifier_instances = new WeakSet(), _RegionMoveModifier_dispatchChange = function _RegionMoveModifier_dispatchChange() {
    __classPrivateFieldGet(this, _RegionMoveModifier_instances, "m", _RegionMoveModifier_dispatchSameTrackChange).call(this);
    if (__classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f") !== 0) {
        __classPrivateFieldGet(this, _RegionMoveModifier_instances, "m", _RegionMoveModifier_dispatchShiftedTrackChange).call(this, __classPrivateFieldGet(this, _RegionMoveModifier_deltaIndex, "f"));
    }
}, _RegionMoveModifier_dispatchSameTrackChange = function _RegionMoveModifier_dispatchSameTrackChange() {
    __classPrivateFieldGet(this, _RegionMoveModifier_selection, "f").selected().forEach(function (_a) {
        var trackBoxAdapter = _a.trackBoxAdapter;
        return trackBoxAdapter.ifSome(function (adapter) { return adapter.regions.dispatchChange(); });
    });
}, _RegionMoveModifier_dispatchShiftedTrackChange = function _RegionMoveModifier_dispatchShiftedTrackChange(deltaIndex) {
    var _this = this;
    __classPrivateFieldGet(this, _RegionMoveModifier_selection, "f").selected().forEach(function (_a) {
        var trackBoxAdapter = _a.trackBoxAdapter;
        return trackBoxAdapter.ifSome(function (adapter) {
            var _a, _b, _c;
            return (_c = (_b = (_a = __classPrivateFieldGet(_this, _RegionMoveModifier_manager, "f")
                .getByIndex(adapter.listIndex + deltaIndex).unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.trackBoxAdapter) === null || _b === void 0 ? void 0 : _b.regions) === null || _c === void 0 ? void 0 : _c.dispatchChange();
        });
    });
};
