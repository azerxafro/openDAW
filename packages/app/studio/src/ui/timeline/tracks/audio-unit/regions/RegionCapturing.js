"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionCapturing = void 0;
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_std_1 = require("@opendaw/lib-std");
var constants_ts_1 = require("@/ui/timeline/constants.ts");
var Constants_1 = require("@/ui/timeline/tracks/audio-unit/Constants");
var studio_core_1 = require("@opendaw/studio-core");
var RegionLabel_1 = require("@/ui/timeline/RegionLabel");
var RegionCapturing;
(function (RegionCapturing) {
    RegionCapturing.create = function (element, manager, range, audioUnitFreeze) {
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
                if (audioUnitFreeze.isFrozen(track.audioUnitBoxAdapter)) {
                    return { type: "track", track: track };
                }
                var position = Math.floor(range.xToUnit(x));
                var threshold = range.unitsPerPixel * constants_ts_1.PointerRadiusDistance;
                var collection = track.trackBoxAdapter.regions.collection;
                var edgeCapture = null;
                var edgeDistance = Infinity;
                var edgeIsInside = false;
                var bodyRegion = null;
                var _loop_1 = function (region) {
                    if (region.position > position + threshold) {
                        return "break";
                    }
                    if (position >= region.complete + threshold) {
                        return "continue";
                    }
                    var x0 = range.unitToX(region.position);
                    var x1 = range.unitToX(region.complete);
                    if ((0, lib_std_1.isInstanceOf)(region, studio_adapters_1.AudioRegionBoxAdapter)) {
                        var fading = region.fading;
                        var handleRadius = 3;
                        var handleY = track.position + RegionLabel_1.RegionLabel.labelHeight();
                        var fadeInX = range.unitToX(region.position + fading.in);
                        var fadeOutX = range.unitToX(region.position + region.duration - fading.out);
                        if (lib_std_1.Geom.isInsideCircle(x, y, fadeInX, handleY, handleRadius)) {
                            return { value: { type: "region", part: "fading-in", region: region } };
                        }
                        if (lib_std_1.Geom.isInsideCircle(x, y, fadeOutX, handleY, handleRadius)) {
                            return { value: { type: "region", part: "fading-out", region: region } };
                        }
                    }
                    if (studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region)) {
                        var bottomEdge = y > track.position + RegionLabel_1.RegionLabel.labelHeight();
                        var cursorInside_1 = position >= region.position && position < region.complete;
                        var isBetter = function (distance) {
                            return distance < constants_ts_1.PointerRadiusDistance
                                && (cursorInside_1 && !edgeIsInside
                                    || cursorInside_1 === edgeIsInside && distance < edgeDistance);
                        };
                        var completeDistance = Math.abs(x - x1);
                        if (isBetter(completeDistance)) {
                            edgeDistance = completeDistance;
                            edgeIsInside = cursorInside_1;
                            edgeCapture = bottomEdge
                                ? { type: "region", part: "content-complete", region: region }
                                : { type: "region", part: "complete", region: region };
                        }
                        var startDistance = Math.abs(x - x0);
                        if (isBetter(startDistance)) {
                            edgeDistance = startDistance;
                            edgeIsInside = cursorInside_1;
                            edgeCapture = bottomEdge
                                ? { type: "region", part: "content-start", region: region }
                                : { type: "region", part: "start", region: region };
                        }
                        if (bottomEdge) {
                            var loopDistance = Math.abs(x - range.unitToX(region.offset + region.loopDuration));
                            if (isBetter(loopDistance)) {
                                edgeDistance = loopDistance;
                                edgeIsInside = cursorInside_1;
                                edgeCapture = { type: "region", part: "loop-duration", region: region };
                            }
                        }
                    }
                    bodyRegion = region;
                };
                for (var _i = 0, _a = collection.iterateFrom(position - threshold); _i < _a.length; _i++) {
                    var region = _a[_i];
                    var state_1 = _loop_1(region);
                    if (typeof state_1 === "object")
                        return state_1.value;
                    if (state_1 === "break")
                        break;
                }
                if ((0, lib_std_1.isDefined)(edgeCapture)) {
                    return edgeCapture;
                }
                if ((0, lib_std_1.isDefined)(bodyRegion)) {
                    return { type: "region", part: "position", region: bodyRegion };
                }
                return { type: "track", track: track };
            }
        });
    };
})(RegionCapturing || (exports.RegionCapturing = RegionCapturing = {}));
