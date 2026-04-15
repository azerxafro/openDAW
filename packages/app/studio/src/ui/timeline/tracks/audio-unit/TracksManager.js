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
var _TracksManager_instances, _TracksManager_service, _TracksManager_scrollContainer, _TracksManager_factory, _TracksManager_terminator, _TracksManager_audioUnits, _TracksManager_tracks, _TracksManager_maxClipsIndex, _TracksManager_currentClipModifier, _TracksManager_currentRegionModifier, _TracksManager_orderedByIndex, _TracksManager_subscribe, _TracksManager_invalidateOrder, _TracksManager_toSortedTrackScopes, _TracksManager_trackGlobalTop;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksManager = void 0;
var TrackContext_ts_1 = require("@/ui/timeline/tracks/audio-unit/TrackContext.ts");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var AudioUnitTracks_tsx_1 = require("@/ui/timeline/tracks/audio-unit/AudioUnitTracks.tsx");
var Constants_1 = require("@/ui/timeline/tracks/audio-unit/Constants");
var TracksManager = /** @class */ (function () {
    function TracksManager(service, scrollContainer, factory) {
        _TracksManager_instances.add(this);
        _TracksManager_service.set(this, void 0);
        _TracksManager_scrollContainer.set(this, void 0);
        _TracksManager_factory.set(this, void 0);
        _TracksManager_terminator.set(this, void 0);
        _TracksManager_audioUnits.set(this, void 0);
        _TracksManager_tracks.set(this, void 0);
        _TracksManager_maxClipsIndex.set(this, void 0);
        _TracksManager_currentClipModifier.set(this, lib_std_1.Option.None);
        _TracksManager_currentRegionModifier.set(this, lib_std_1.Option.None);
        _TracksManager_orderedByIndex.set(this, lib_std_1.Option.None);
        __classPrivateFieldSet(this, _TracksManager_service, service, "f");
        __classPrivateFieldSet(this, _TracksManager_scrollContainer, scrollContainer, "f");
        __classPrivateFieldSet(this, _TracksManager_factory, factory, "f");
        __classPrivateFieldSet(this, _TracksManager_terminator, new lib_std_1.Terminator(), "f");
        __classPrivateFieldSet(this, _TracksManager_audioUnits, lib_std_1.UUID.newSet(function (_a) {
            var uuid = _a.uuid;
            return uuid;
        }), "f");
        __classPrivateFieldSet(this, _TracksManager_tracks, lib_std_1.UUID.newSet(function (_a) {
            var uuid = _a.trackBoxAdapter.uuid;
            return uuid;
        }), "f");
        __classPrivateFieldSet(this, _TracksManager_maxClipsIndex, __classPrivateFieldGet(this, _TracksManager_terminator, "f").own(new lib_std_1.DefaultObservableValue(8)), "f");
        __classPrivateFieldGet(this, _TracksManager_terminator, "f").own(__classPrivateFieldGet(this, _TracksManager_instances, "m", _TracksManager_subscribe).call(this));
    }
    TracksManager.prototype.startClipModifier = function (option) {
        var _this = this;
        return option.map(function (modifier) {
            (0, lib_std_1.assert)(__classPrivateFieldGet(_this, _TracksManager_currentClipModifier, "f").isEmpty(), "ClipModifier already in use.");
            _this.service.regionModifierInProgress = true;
            var lifeTime = __classPrivateFieldGet(_this, _TracksManager_terminator, "f").spawn();
            lifeTime.own({ terminate: function () { return __classPrivateFieldSet(_this, _TracksManager_currentClipModifier, lib_std_1.Option.None, "f"); } });
            __classPrivateFieldSet(_this, _TracksManager_currentClipModifier, option, "f");
            return {
                update: function (event) { return modifier.update(event); },
                approve: function () { return modifier.approve(); },
                cancel: function () { return modifier.cancel(); },
                finally: function () {
                    _this.service.regionModifierInProgress = false;
                    lifeTime.terminate();
                }
            };
        });
    };
    TracksManager.prototype.startRegionModifier = function (option) {
        var _this = this;
        if (__classPrivateFieldGet(this, _TracksManager_currentRegionModifier, "f").nonEmpty()) {
            console.warn("".concat(__classPrivateFieldGet(this, _TracksManager_currentRegionModifier, "f").unwrap().toString(), " is running. Ignore new modifier."));
            return lib_std_1.Option.None;
        }
        var print = function () { var _a, _b; return (_b = (_a = option.unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "unknown"; };
        console.debug("start(".concat(print(), ")"));
        return option.map(function (modifier) {
            _this.service.regionModifierInProgress = true;
            var lifeTime = __classPrivateFieldGet(_this, _TracksManager_terminator, "f").spawn();
            lifeTime.own({ terminate: function () { return __classPrivateFieldSet(_this, _TracksManager_currentRegionModifier, lib_std_1.Option.None, "f"); } });
            __classPrivateFieldSet(_this, _TracksManager_currentRegionModifier, option, "f");
            return {
                update: function (event) { return modifier.update(event); },
                approve: function () {
                    console.debug("approve(".concat(print(), ")"));
                    modifier.approve();
                },
                cancel: function () {
                    console.debug("cancel(".concat(print(), ")"));
                    modifier.cancel();
                },
                finally: function () {
                    console.debug("finally(".concat(print(), ")"));
                    _this.service.regionModifierInProgress = false;
                    lifeTime.terminate();
                }
            };
        });
    };
    Object.defineProperty(TracksManager.prototype, "currentClipModifier", {
        get: function () { return __classPrivateFieldGet(this, _TracksManager_currentClipModifier, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TracksManager.prototype, "currentRegionModifier", {
        get: function () { return __classPrivateFieldGet(this, _TracksManager_currentRegionModifier, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TracksManager.prototype, "maxClipsIndex", {
        get: function () { return __classPrivateFieldGet(this, _TracksManager_maxClipsIndex, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TracksManager.prototype, "service", {
        get: function () { return __classPrivateFieldGet(this, _TracksManager_service, "f"); },
        enumerable: false,
        configurable: true
    });
    TracksManager.prototype.localToIndex = function (position) {
        return position > this.tracksLocalBottom()
            ? this.tracks().length
            : Math.max(0, lib_std_1.BinarySearch
                .rightMostMapped(this.tracks(), position, lib_std_1.NumberComparator, function (track) { return track.position; }));
    };
    TracksManager.prototype.globalToIndex = function (position) {
        return this.localToIndex(position - __classPrivateFieldGet(this, _TracksManager_instances, "m", _TracksManager_trackGlobalTop).call(this));
    };
    TracksManager.prototype.indexToGlobal = function (index) {
        if (index < 0) {
            return 0;
        }
        var tracks = this.tracks();
        var offset = this.tracksLocalBottom();
        return (0, lib_std_1.asDefined)(tracks.at(Math.min(index, tracks.length - 1))).position + offset;
    };
    Object.defineProperty(TracksManager.prototype, "scrollableContainer", {
        get: function () { return __classPrivateFieldGet(this, _TracksManager_scrollContainer, "f"); },
        enumerable: false,
        configurable: true
    });
    TracksManager.prototype.getByIndex = function (index) { return lib_std_1.Option.wrap(this.tracks()[index]); };
    TracksManager.prototype.tracks = function () {
        if (__classPrivateFieldGet(this, _TracksManager_audioUnits, "f").size() === 0) {
            return lib_std_1.Arrays.empty();
        }
        if (__classPrivateFieldGet(this, _TracksManager_orderedByIndex, "f").isEmpty()) {
            __classPrivateFieldSet(this, _TracksManager_orderedByIndex, lib_std_1.Option.wrap(__classPrivateFieldGet(this, _TracksManager_instances, "m", _TracksManager_toSortedTrackScopes).call(this)), "f");
        }
        return __classPrivateFieldGet(this, _TracksManager_orderedByIndex, "f").unwrap();
    };
    TracksManager.prototype.numTracks = function () { return this.tracks().length; };
    TracksManager.prototype.terminate = function () {
        __classPrivateFieldGet(this, _TracksManager_audioUnits, "f").clear();
        __classPrivateFieldSet(this, _TracksManager_orderedByIndex, lib_std_1.Option.None, "f");
        __classPrivateFieldGet(this, _TracksManager_terminator, "f").terminate();
    };
    TracksManager.prototype.tracksLocalBottom = function () { return __classPrivateFieldGet(this, _TracksManager_scrollContainer, "f").scrollHeight - Constants_1.ExtraSpace; };
    return TracksManager;
}());
exports.TracksManager = TracksManager;
_TracksManager_service = new WeakMap(), _TracksManager_scrollContainer = new WeakMap(), _TracksManager_factory = new WeakMap(), _TracksManager_terminator = new WeakMap(), _TracksManager_audioUnits = new WeakMap(), _TracksManager_tracks = new WeakMap(), _TracksManager_maxClipsIndex = new WeakMap(), _TracksManager_currentClipModifier = new WeakMap(), _TracksManager_currentRegionModifier = new WeakMap(), _TracksManager_orderedByIndex = new WeakMap(), _TracksManager_instances = new WeakSet(), _TracksManager_subscribe = function _TracksManager_subscribe() {
    var _this = this;
    var project = __classPrivateFieldGet(this, _TracksManager_service, "f").project;
    var rootBoxAdapter = project.rootBoxAdapter;
    return lib_std_1.Terminable.many(rootBoxAdapter.audioUnits.catchupAndSubscribe({
        onAdd: function (audioUnitBoxAdapter) {
            var audioUnitLifecycle = __classPrivateFieldGet(_this, _TracksManager_terminator, "f").spawn();
            var unitTracks = (0, AudioUnitTracks_tsx_1.AudioUnitTracks)({
                lifecycle: audioUnitLifecycle,
                project: project,
                adapter: audioUnitBoxAdapter
            });
            __classPrivateFieldGet(_this, _TracksManager_scrollContainer, "f").appendChild(unitTracks);
            audioUnitLifecycle.ownAll({
                terminate: function () {
                    __classPrivateFieldGet(_this, _TracksManager_tracks, "f").values()
                        .filter(function (scope) { return scope.audioUnitBoxAdapter === audioUnitBoxAdapter; })
                        .forEach(function (scope) { return __classPrivateFieldGet(_this, _TracksManager_tracks, "f").removeByKey(scope.trackBoxAdapter.uuid).lifecycle.terminate(); });
                    unitTracks.remove();
                    __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this);
                }
            }, audioUnitBoxAdapter.tracks.catchupAndSubscribe({
                onAdd: function (trackBoxAdapter) {
                    var trackLifecycle = audioUnitLifecycle.spawn();
                    var element = __classPrivateFieldGet(_this, _TracksManager_factory, "f").create(_this, trackLifecycle, audioUnitBoxAdapter, trackBoxAdapter);
                    unitTracks.appendChild(element);
                    var track = new TrackContext_ts_1.TrackContext({
                        audioUnitBoxAdapter: audioUnitBoxAdapter,
                        trackBoxAdapter: trackBoxAdapter,
                        element: element,
                        lifecycle: trackLifecycle
                    });
                    __classPrivateFieldGet(_this, _TracksManager_tracks, "f").add(track);
                    trackLifecycle.own({ terminate: function () { return element.remove(); } });
                    __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this);
                },
                onRemove: function (_a) {
                    var uuid = _a.uuid;
                    __classPrivateFieldGet(_this, _TracksManager_tracks, "f").removeByKey(uuid).lifecycle.terminate();
                    __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this);
                },
                onReorder: function () { return __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this); }
            }));
            __classPrivateFieldGet(_this, _TracksManager_audioUnits, "f").add({
                uuid: audioUnitBoxAdapter.uuid,
                unitTracks: unitTracks,
                lifecycle: audioUnitLifecycle
            });
            __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this);
        },
        onRemove: function (audioUnitBoxAdapter) {
            __classPrivateFieldGet(_this, _TracksManager_audioUnits, "f").removeByKey(audioUnitBoxAdapter.uuid).lifecycle.terminate();
            __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this);
        },
        onReorder: function () { return __classPrivateFieldGet(_this, _TracksManager_instances, "m", _TracksManager_invalidateOrder).call(_this); }
    }));
}, _TracksManager_invalidateOrder = function _TracksManager_invalidateOrder() {
    __classPrivateFieldSet(this, _TracksManager_orderedByIndex, lib_std_1.Option.None, "f");
    this.tracks().forEach(function (_a, index) {
        var trackBoxAdapter = _a.trackBoxAdapter;
        return trackBoxAdapter.listIndex = index;
    });
}, _TracksManager_toSortedTrackScopes = function _TracksManager_toSortedTrackScopes() {
    return __classPrivateFieldGet(this, _TracksManager_tracks, "f").values()
        .toSorted(function (a, b) {
        var diff = (0, studio_adapters_1.IndexComparator)(a.audioUnitBoxAdapter.indexField.getValue(), b.audioUnitBoxAdapter.indexField.getValue());
        if (diff !== 0) {
            return diff;
        }
        return (0, studio_adapters_1.IndexComparator)(a.trackBoxAdapter.indexField.getValue(), b.trackBoxAdapter.indexField.getValue());
    });
}, _TracksManager_trackGlobalTop = function _TracksManager_trackGlobalTop() { return __classPrivateFieldGet(this, _TracksManager_scrollContainer, "f").getBoundingClientRect().top - __classPrivateFieldGet(this, _TracksManager_scrollContainer, "f").scrollTop; };
