"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClipSelectableLocator = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var constants_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/constants.ts");
var createClipSelectableLocator = function (capturing, manager) { return ({
    selectableAt: function (coordinates) {
        var target = capturing.captureLocalPoint(coordinates.u, coordinates.v - manager.scrollableContainer.scrollTop);
        return target === null || target.type === "track" ? lib_std_1.Iterables.empty() : lib_std_1.Iterables.one(target.clip);
    },
    selectablesBetween: function (_a, _b) {
        var u0 = _a.u, v0 = _a.v;
        var u1 = _b.u, v1 = _b.v;
        var tracks = manager.tracks();
        var startIndex = manager.localToIndex(v0);
        if (startIndex < 0 || startIndex >= tracks.length) {
            return lib_std_1.Iterables.empty();
        }
        var clips = [];
        var _loop_1 = function (trackIndex) {
            var track = tracks[trackIndex];
            if (track.position >= v1) {
                return "break";
            }
            var clipIndex0 = Math.floor(u0 / constants_ts_1.ClipWidth);
            var clipIndex1 = Math.floor(u1 / constants_ts_1.ClipWidth);
            track.trackBoxAdapter.clips.collection.adapters()
                .forEach(function (adapter) {
                var clipIndex = adapter.indexField.getValue();
                if (clipIndex0 <= clipIndex && clipIndex <= clipIndex1) {
                    clips.push(adapter);
                }
            });
        };
        for (var trackIndex = startIndex; trackIndex < tracks.length; trackIndex++) {
            var state_1 = _loop_1(trackIndex);
            if (state_1 === "break")
                break;
        }
        return clips;
    },
    selectable: function () { return manager.tracks().flatMap(function (track) { return track.trackBoxAdapter.clips.collection.adapters(); }); }
}); };
exports.createClipSelectableLocator = createClipSelectableLocator;
