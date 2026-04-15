"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipCapturing = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var constants_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/constants.ts");
var Constants_1 = require("@/ui/timeline/tracks/audio-unit/Constants");
var studio_core_1 = require("@opendaw/studio-core");
var ClipCapturing;
(function (ClipCapturing) {
    ClipCapturing.create = function (element, manager) {
        return new studio_core_1.ElementCapturing(element, {
            capture: function (x, y) {
                y += manager.scrollableContainer.scrollTop;
                if (y > manager.scrollableContainer.scrollHeight - Constants_1.ExtraSpace) {
                    return null;
                }
                var tracks = manager.tracks();
                var trackIndex = lib_std_1.BinarySearch
                    .rightMostMapped(tracks, y, lib_std_1.NumberComparator, function (component) { return component.position; });
                if (trackIndex < 0 || trackIndex >= tracks.length) {
                    return null;
                }
                var track = tracks[trackIndex];
                var clipIndex = Math.floor(x / constants_ts_1.ClipWidth);
                return track.trackBoxAdapter.clips.collection.getAdapterByIndex(clipIndex)
                    .match({
                    none: function () { return ({ type: "track", track: track, clipIndex: clipIndex }); },
                    some: function (clip) { return ({ type: "clip", track: track, clip: clip }); }
                });
            }
        });
    };
})(ClipCapturing || (exports.ClipCapturing = ClipCapturing = {}));
