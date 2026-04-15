"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpMarkerUtils = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var WarpMarkerUtils;
(function (WarpMarkerUtils) {
    WarpMarkerUtils.findAdjacent = function (position, warpMarkers, includePosition) {
        var left = warpMarkers.lowerEqual(includePosition ? position : position - 1);
        var right = warpMarkers.greaterEqual(position + 1);
        return [left, right];
    };
    WarpMarkerUtils.createCapturing = function (element, range, reader, markerRadius) { return new studio_core_1.ElementCapturing(element, {
        capture: function (x, _y) {
            var optWarpMarkers = reader.audioContent.optWarpMarkers;
            if (optWarpMarkers.isEmpty()) {
                return null;
            }
            var u0 = range.xToUnit(x - markerRadius) - reader.offset;
            var u1 = range.xToUnit(x + markerRadius) - reader.offset;
            var closest = null;
            for (var _i = 0, _a = optWarpMarkers.unwrap().iterateRange(u0, u1); _i < _a.length; _i++) {
                var marker = _a[_i];
                var dx = x - range.unitToX(marker.position + reader.offset);
                var distance = Math.abs(dx);
                if (distance <= markerRadius) {
                    if (closest === null) {
                        closest = { marker: marker, distance: distance };
                    }
                    else if (closest.distance < distance) {
                        closest.marker = marker;
                        closest.distance = distance;
                    }
                }
            }
            if (closest === null) {
                return null;
            }
            return closest.marker;
        }
    }); };
})(WarpMarkerUtils || (exports.WarpMarkerUtils = WarpMarkerUtils = {}));
