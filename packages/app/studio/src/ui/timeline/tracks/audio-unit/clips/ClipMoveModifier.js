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
var _UnselectedModifyStrategy_tool, _SelectedModifyStrategy_tool, _ClipMoveModifier_instances, _ClipMoveModifier_project, _ClipMoveModifier_manager, _ClipMoveModifier_selection, _ClipMoveModifier_xAxis, _ClipMoveModifier_yAxis, _ClipMoveModifier_pointerClipIndex, _ClipMoveModifier_pointerTrackIndex, _ClipMoveModifier_selectedModifyStrategy, _ClipMoveModifier_unselectedModifyStrategy, _ClipMoveModifier_clipDelta, _ClipMoveModifier_trackDelta, _ClipMoveModifier_copy, _ClipMoveModifier_mirroredCopy, _ClipMoveModifier_dispatchChange, _ClipMoveModifier_dispatchSameTrackChange, _ClipMoveModifier_dispatchShiftedTrackChange;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipMoveModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var dialogs_1 = require("@/ui/components/dialogs");
var UnselectedModifyStrategy = /** @class */ (function () {
    function UnselectedModifyStrategy(tool) {
        _UnselectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _UnselectedModifyStrategy_tool, tool, "f");
    }
    UnselectedModifyStrategy.prototype.readClipIndex = function (clip) { return clip.indexField.getValue(); };
    UnselectedModifyStrategy.prototype.readMirror = function (clip) {
        return clip.canMirror && (clip.isMirrowed || (clip.isSelected && __classPrivateFieldGet(this, _UnselectedModifyStrategy_tool, "f").mirroredCopy));
    };
    UnselectedModifyStrategy.prototype.translateTrackIndex = function (index) { return index; };
    return UnselectedModifyStrategy;
}());
_UnselectedModifyStrategy_tool = new WeakMap();
var SelectedModifyStrategy = /** @class */ (function () {
    function SelectedModifyStrategy(tool) {
        _SelectedModifyStrategy_tool.set(this, void 0);
        __classPrivateFieldSet(this, _SelectedModifyStrategy_tool, tool, "f");
    }
    SelectedModifyStrategy.prototype.readClipIndex = function (clip) { return clip.indexField.getValue() + __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").clipDelta; };
    SelectedModifyStrategy.prototype.readMirror = function (clip) { return clip.canMirror && clip.isMirrowed !== __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").mirroredCopy; };
    SelectedModifyStrategy.prototype.translateTrackIndex = function (index) { return index - __classPrivateFieldGet(this, _SelectedModifyStrategy_tool, "f").trackDelta; };
    return SelectedModifyStrategy;
}());
_SelectedModifyStrategy_tool = new WeakMap();
var ClipMoveModifier = /** @class */ (function () {
    function ClipMoveModifier(_a) {
        var project = _a.project, manager = _a.manager, selection = _a.selection, xAxis = _a.xAxis, yAxis = _a.yAxis, pointerClipIndex = _a.pointerClipIndex, pointerTrackIndex = _a.pointerTrackIndex;
        _ClipMoveModifier_instances.add(this);
        _ClipMoveModifier_project.set(this, void 0);
        _ClipMoveModifier_manager.set(this, void 0);
        _ClipMoveModifier_selection.set(this, void 0);
        _ClipMoveModifier_xAxis.set(this, void 0);
        _ClipMoveModifier_yAxis.set(this, void 0);
        _ClipMoveModifier_pointerClipIndex.set(this, void 0);
        _ClipMoveModifier_pointerTrackIndex.set(this, void 0);
        _ClipMoveModifier_selectedModifyStrategy.set(this, void 0);
        _ClipMoveModifier_unselectedModifyStrategy.set(this, void 0);
        _ClipMoveModifier_clipDelta.set(this, 0);
        _ClipMoveModifier_trackDelta.set(this, 0);
        _ClipMoveModifier_copy.set(this, false);
        _ClipMoveModifier_mirroredCopy.set(this, false);
        __classPrivateFieldSet(this, _ClipMoveModifier_project, project, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_manager, manager, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_selection, selection, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_xAxis, xAxis, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_yAxis, yAxis, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_pointerClipIndex, pointerClipIndex, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_pointerTrackIndex, pointerTrackIndex, "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_selectedModifyStrategy, new SelectedModifyStrategy(this), "f");
        __classPrivateFieldSet(this, _ClipMoveModifier_unselectedModifyStrategy, new UnselectedModifyStrategy(this), "f");
    }
    ClipMoveModifier.start = function (creation) {
        return lib_std_1.Option.wrap(new ClipMoveModifier(creation));
    };
    Object.defineProperty(ClipMoveModifier.prototype, "clipDelta", {
        get: function () { return __classPrivateFieldGet(this, _ClipMoveModifier_clipDelta, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipMoveModifier.prototype, "trackDelta", {
        get: function () { return __classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipMoveModifier.prototype, "copy", {
        get: function () { return __classPrivateFieldGet(this, _ClipMoveModifier_copy, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipMoveModifier.prototype, "mirroredCopy", {
        get: function () { return __classPrivateFieldGet(this, _ClipMoveModifier_mirroredCopy, "f") && __classPrivateFieldGet(this, _ClipMoveModifier_copy, "f"); },
        enumerable: false,
        configurable: true
    });
    ClipMoveModifier.prototype.showOrigin = function () { return __classPrivateFieldGet(this, _ClipMoveModifier_copy, "f"); };
    ClipMoveModifier.prototype.selectedModifyStrategy = function () { return __classPrivateFieldGet(this, _ClipMoveModifier_selectedModifyStrategy, "f"); };
    ClipMoveModifier.prototype.unselectedModifyStrategy = function () { return __classPrivateFieldGet(this, _ClipMoveModifier_unselectedModifyStrategy, "f"); };
    ClipMoveModifier.prototype.update = function (_a) {
        var _this = this;
        var clientX = _a.clientX, clientY = _a.clientY, ctrlKey = _a.ctrlKey, shiftKey = _a.shiftKey;
        var clipIndex = __classPrivateFieldGet(this, _ClipMoveModifier_xAxis, "f").axisToValue(clientX);
        var trackIndex = __classPrivateFieldGet(this, _ClipMoveModifier_yAxis, "f").axisToValue(clientY);
        var maxTrackIndex = __classPrivateFieldGet(this, _ClipMoveModifier_manager, "f").numTracks() - 1;
        var adapters = __classPrivateFieldGet(this, _ClipMoveModifier_selection, "f").selected();
        var clipDelta = adapters.reduce(function (delta, adapter) {
            var listIndex = adapter.indexField.getValue();
            return (0, lib_std_1.clamp)(delta, -listIndex, __classPrivateFieldGet(_this, _ClipMoveModifier_manager, "f").maxClipsIndex.getValue() + 1);
        }, clipIndex - __classPrivateFieldGet(this, _ClipMoveModifier_pointerClipIndex, "f"));
        var trackDelta = adapters.reduce(function (delta, adapter) {
            var listIndex = adapter.trackBoxAdapter.unwrap().listIndex;
            return (0, lib_std_1.clamp)(delta, -listIndex, maxTrackIndex - listIndex);
        }, trackIndex - __classPrivateFieldGet(this, _ClipMoveModifier_pointerTrackIndex, "f"));
        var change = false;
        if (clipDelta !== __classPrivateFieldGet(this, _ClipMoveModifier_clipDelta, "f")) {
            __classPrivateFieldSet(this, _ClipMoveModifier_clipDelta, clipDelta, "f");
            change = true;
        }
        if (trackDelta !== __classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f")) {
            __classPrivateFieldGet(this, _ClipMoveModifier_instances, "m", _ClipMoveModifier_dispatchShiftedTrackChange).call(this, __classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f")); // removes old preview
            __classPrivateFieldSet(this, _ClipMoveModifier_trackDelta, trackDelta, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _ClipMoveModifier_copy, "f") !== ctrlKey) {
            __classPrivateFieldSet(this, _ClipMoveModifier_copy, ctrlKey, "f");
            change = true;
        }
        if (__classPrivateFieldGet(this, _ClipMoveModifier_mirroredCopy, "f") !== shiftKey) {
            __classPrivateFieldSet(this, _ClipMoveModifier_mirroredCopy, shiftKey, "f");
            change = true;
        }
        if (change) {
            __classPrivateFieldGet(this, _ClipMoveModifier_instances, "m", _ClipMoveModifier_dispatchChange).call(this);
        }
    };
    ClipMoveModifier.prototype.approve = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f") === 0 && __classPrivateFieldGet(this, _ClipMoveModifier_clipDelta, "f") === 0) {
            return;
        }
        var tracks = __classPrivateFieldGet(this, _ClipMoveModifier_manager, "f").tracks();
        var maxTrackIndex = tracks.length - 1;
        var adapters = __classPrivateFieldGet(this, _ClipMoveModifier_selection, "f").selected();
        var trackDelta = adapters.reduce(function (delta, adapter) {
            var listIndex = adapter.trackBoxAdapter.unwrap().listIndex;
            return (0, lib_std_1.clamp)(delta, -listIndex, maxTrackIndex - listIndex);
        }, __classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f"));
        if (!adapters.every(function (adapter) {
            var trackIndex = adapter.trackBoxAdapter.unwrap().listIndex + trackDelta;
            var trackAdapter = __classPrivateFieldGet(_this, _ClipMoveModifier_manager, "f").getByIndex(trackIndex).unwrap().trackBoxAdapter;
            return trackAdapter.accepts(adapter);
        })) {
            this.cancel();
            dialogs_1.Dialogs.info({ message: "Cannot move clip to different track type." }).then();
            return;
        }
        var occupied = lib_std_1.Arrays.create(function () { return []; }, tracks.length);
        var moveTasks = adapters
            .map(function (adapter) {
            var indexField = adapter.indexField, optTrackBoxAdapter = adapter.trackBoxAdapter;
            var trackBoxAdapter = optTrackBoxAdapter.unwrap();
            var trackIndex = tracks.findIndex(function (_a) {
                var adapter = _a.trackBoxAdapter;
                return adapter === trackBoxAdapter;
            });
            var newClipIndex = Math.max(0, indexField.getValue() + __classPrivateFieldGet(_this, _ClipMoveModifier_clipDelta, "f"));
            var newTrackIndex = trackIndex + trackDelta;
            var newTrack = (0, lib_std_1.asDefined)(tracks[newTrackIndex], "moved outside valid area");
            occupied[newTrackIndex][newClipIndex] = true;
            return { adapter: adapter, newClipIndex: newClipIndex, newTrack: newTrack, isMirrowed: adapter.isMirrowed };
        });
        var toDelete = [];
        moveTasks.forEach(function (_a) {
            var box = _a.adapter.box, newClipIndex = _a.newClipIndex, newTrack = _a.newTrack;
            var option = newTrack.trackBoxAdapter.clips.collection.getAdapterByIndex(newClipIndex);
            if (option.nonEmpty()) {
                var adapter = option.unwrap();
                if (!adapter.isSelected && adapter.box !== box) {
                    toDelete.push(adapter.box);
                }
            }
        });
        console.debug("#copy", __classPrivateFieldGet(this, _ClipMoveModifier_copy, "f"), "#mirroredCopy", __classPrivateFieldGet(this, _ClipMoveModifier_mirroredCopy, "f"));
        var userEditingManager = __classPrivateFieldGet(this, _ClipMoveModifier_project, "f").userEditingManager;
        var editedAdapter = adapters.find(function (adapter) { return userEditingManager.timeline.isEditing(adapter.box); });
        __classPrivateFieldGet(this, _ClipMoveModifier_project, "f").editing.modify(function () {
            if (__classPrivateFieldGet(_this, _ClipMoveModifier_copy, "f")) {
                adapters.forEach(function (adapter) {
                    var track = adapter.trackBoxAdapter.unwrap();
                    var clipIndex = adapter.indexField.getValue();
                    var trackIndex = __classPrivateFieldGet(_this, _ClipMoveModifier_manager, "f").tracks().findIndex(function (_a) {
                        var trackBoxAdapter = _a.trackBoxAdapter;
                        return trackBoxAdapter === track;
                    });
                    if (trackIndex === -1) {
                        return (0, lib_std_1.panic)("Could not find track for ".concat(adapter));
                    }
                    if (!occupied[trackIndex][clipIndex]) {
                        adapter.clone(false);
                    }
                });
            }
            toDelete.forEach(function (box) { return box.delete(); });
            moveTasks.forEach(function (_a) {
                var adapter = _a.adapter, newClipIndex = _a.newClipIndex, newTrack = _a.newTrack, isMirrowed = _a.isMirrowed;
                adapter.box.index.setValue(newClipIndex);
                adapter.box.clips.refer(newTrack.trackBoxAdapter.box.clips);
                if (__classPrivateFieldGet(_this, _ClipMoveModifier_copy, "f") && (isMirrowed === __classPrivateFieldGet(_this, _ClipMoveModifier_mirroredCopy, "f"))) {
                    adapter.consolidate();
                }
            });
            // After copy, force refresh of editing context to update the selection filter
            // TODO this is actually a hack. We can do better, but it's not clear how to do it.'
            if (__classPrivateFieldGet(_this, _ClipMoveModifier_copy, "f") && (0, lib_std_1.isDefined)(editedAdapter)) {
                userEditingManager.timeline.clear();
                userEditingManager.timeline.edit(editedAdapter.box);
            }
        });
    };
    ClipMoveModifier.prototype.cancel = function () { __classPrivateFieldGet(this, _ClipMoveModifier_instances, "m", _ClipMoveModifier_dispatchChange).call(this); };
    return ClipMoveModifier;
}());
exports.ClipMoveModifier = ClipMoveModifier;
_ClipMoveModifier_project = new WeakMap(), _ClipMoveModifier_manager = new WeakMap(), _ClipMoveModifier_selection = new WeakMap(), _ClipMoveModifier_xAxis = new WeakMap(), _ClipMoveModifier_yAxis = new WeakMap(), _ClipMoveModifier_pointerClipIndex = new WeakMap(), _ClipMoveModifier_pointerTrackIndex = new WeakMap(), _ClipMoveModifier_selectedModifyStrategy = new WeakMap(), _ClipMoveModifier_unselectedModifyStrategy = new WeakMap(), _ClipMoveModifier_clipDelta = new WeakMap(), _ClipMoveModifier_trackDelta = new WeakMap(), _ClipMoveModifier_copy = new WeakMap(), _ClipMoveModifier_mirroredCopy = new WeakMap(), _ClipMoveModifier_instances = new WeakSet(), _ClipMoveModifier_dispatchChange = function _ClipMoveModifier_dispatchChange() {
    __classPrivateFieldGet(this, _ClipMoveModifier_instances, "m", _ClipMoveModifier_dispatchSameTrackChange).call(this);
    if (__classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f") !== 0) {
        __classPrivateFieldGet(this, _ClipMoveModifier_instances, "m", _ClipMoveModifier_dispatchShiftedTrackChange).call(this, __classPrivateFieldGet(this, _ClipMoveModifier_trackDelta, "f"));
    }
}, _ClipMoveModifier_dispatchSameTrackChange = function _ClipMoveModifier_dispatchSameTrackChange() {
    __classPrivateFieldGet(this, _ClipMoveModifier_selection, "f").selected().forEach(function (_a) {
        var trackBoxAdapter = _a.trackBoxAdapter;
        return trackBoxAdapter.unwrap().clips.dispatchChange();
    });
}, _ClipMoveModifier_dispatchShiftedTrackChange = function _ClipMoveModifier_dispatchShiftedTrackChange(deltaIndex) {
    var _this = this;
    __classPrivateFieldGet(this, _ClipMoveModifier_selection, "f").selected().forEach(function (_a) {
        var _b, _c, _d;
        var trackBoxAdapter = _a.trackBoxAdapter;
        return (_d = (_c = (_b = __classPrivateFieldGet(_this, _ClipMoveModifier_manager, "f")
            .getByIndex(trackBoxAdapter.unwrap().listIndex + deltaIndex)
            .unwrapOrNull()) === null || _b === void 0 ? void 0 : _b.trackBoxAdapter) === null || _c === void 0 ? void 0 : _c.clips) === null || _d === void 0 ? void 0 : _d.dispatchChange();
    });
};
