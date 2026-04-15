"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderCapturing = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var Constants_1 = require("@/ui/timeline/tracks/audio-unit/Constants");
var HeaderCapturing;
(function (HeaderCapturing) {
    HeaderCapturing.install = function (element, manager) {
        return new studio_core_1.ElementCapturing(element, {
            capture: function (_x, y) {
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
                return { type: "track", adapter: tracks[trackIndex].trackBoxAdapter };
            }
        });
    };
})(HeaderCapturing || (exports.HeaderCapturing = HeaderCapturing = {}));
