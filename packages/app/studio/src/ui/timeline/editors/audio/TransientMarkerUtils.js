"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransientMarkerUtils = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var TransientMarkerUtils;
(function (TransientMarkerUtils) {
    var MARKER_RADIUS = 4;
    TransientMarkerUtils.secondsToUnits = function (seconds, warpMarkers) {
        var markers = warpMarkers.asArray();
        if (markers.length < 2) {
            return 0.0;
        }
        var first = markers[0];
        var second = markers[1];
        var secondLast = markers[markers.length - 2];
        var last = markers[markers.length - 1];
        var firstRate = (second.position - first.position) / (second.seconds - first.seconds);
        var lastRate = (last.position - secondLast.position) / (last.seconds - secondLast.seconds);
        if (seconds < first.seconds) {
            return first.position + (seconds - first.seconds) * firstRate;
        }
        if (seconds >= last.seconds) {
            return last.position + (seconds - last.seconds) * lastRate;
        }
        var index = Math.min(markers.length - 2, lib_std_1.BinarySearch
            .rightMostMapped(markers, seconds, lib_std_1.NumberComparator, function (_a) {
            var seconds = _a.seconds;
            return seconds;
        }));
        var left = markers[index];
        var right = markers[index + 1];
        var t = (seconds - left.seconds) / (right.seconds - left.seconds);
        return left.position + t * (right.position - left.position);
    };
    TransientMarkerUtils.createCapturing = function (element, range, reader, warpMarkers, transientMarkers) {
        return new studio_core_1.ElementCapturing(element, {
            capture: function (x, _y) {
                var audioContent = reader.audioContent;
                var waveformOffset = audioContent.waveformOffset.getValue();
                var markers = warpMarkers.asArray();
                if (markers.length < 2) {
                    return null;
                }
                var first = markers[0];
                var second = markers[1];
                var secondLast = markers[markers.length - 2];
                var last = markers[markers.length - 1];
                var firstRate = (second.position - first.position) / (second.seconds - first.seconds);
                var lastRate = (last.position - secondLast.position) / (last.seconds - secondLast.seconds);
                var localUnitToSeconds = function (localUnit) {
                    if (localUnit < first.position) {
                        return first.seconds + (localUnit - first.position) / firstRate;
                    }
                    if (localUnit >= last.position) {
                        return last.seconds + (localUnit - last.position) / lastRate;
                    }
                    var index = Math.min(markers.length - 2, Math.max(0, warpMarkers.floorLastIndex(localUnit)));
                    var left = markers[index];
                    var right = markers[index + 1];
                    var t = (localUnit - left.position) / (right.position - left.position);
                    return left.seconds + t * (right.seconds - left.seconds);
                };
                // Convert x position to seconds for searching
                var unit = range.xToUnit(x);
                var localUnit = unit - reader.offset;
                var targetSeconds = localUnitToSeconds(localUnit) + waveformOffset;
                // Search nearby transients using binary search
                var transients = transientMarkers.asArray();
                var centerIndex = Math.max(0, transientMarkers.floorLastIndex(targetSeconds));
                var closest = null;
                // Check transients around the target position
                for (var i = Math.max(0, centerIndex - 1); i < transients.length; i++) {
                    var transient = transients[i];
                    var adjustedSeconds = transient.position - waveformOffset;
                    var transientLocalUnit = TransientMarkerUtils.secondsToUnits(adjustedSeconds, warpMarkers);
                    var transientUnit = reader.offset + transientLocalUnit;
                    var transientX = range.unitToX(transientUnit);
                    var distance = Math.abs(transientX - x);
                    if (distance <= MARKER_RADIUS) {
                        if (closest === null || distance < closest.distance) {
                            closest = { transient: transient, distance: distance };
                        }
                    }
                    else if (transientX > x + MARKER_RADIUS) {
                        break; // Past the capture zone, stop searching
                    }
                }
                return (0, lib_std_1.isNotNull)(closest) ? closest.transient : null;
            }
        });
    };
})(TransientMarkerUtils || (exports.TransientMarkerUtils = TransientMarkerUtils = {}));
