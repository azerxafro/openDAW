"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValueEventCapturing = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var Constants_1 = require("./Constants");
var constants_ts_1 = require("@/ui/timeline/constants.ts");
var studio_core_1 = require("@opendaw/studio-core");
var createValueEventCapturing = function (element, range, valueToY, reader) {
    var captureEvent = function (x, y) {
        var events = reader.content.events;
        if (events.length() === 0) {
            return null;
        }
        var offset = reader.offset;
        var p = Math.floor(range.xToUnit(x)) - offset;
        var radiusInUnits = range.unitsPerPixel * Constants_1.EventRadius;
        var withinRadius = lib_dsp_1.ValueEvent
            .iterateWindow(events, p - radiusInUnits, p + radiusInUnits);
        var closest = null;
        for (var _i = 0, withinRadius_1 = withinRadius; _i < withinRadius_1.length; _i++) {
            var event_1 = withinRadius_1[_i];
            var dx = x - range.unitToX(offset + event_1.position);
            var dy = y - valueToY(event_1.value);
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= Constants_1.EventRadius * Constants_1.EventRatio) {
                if (closest === null) {
                    closest = { event: event_1, distance: distance };
                }
                else if (closest.distance < distance) {
                    closest.event = event_1;
                    closest.distance = distance;
                }
            }
        }
        if (closest !== null) {
            return { type: "event", event: closest.event };
        }
        var index = events.floorLastIndex(p);
        var array = events.asArray();
        if (index === -1) {
            var first = lib_std_1.Arrays.getFirst(array, "Internal Error");
            if (Math.abs(valueToY(first.value) - y) < constants_ts_1.PointerRadiusDistance) {
                return { type: "event", event: first };
            }
        }
        else if (index === events.length() - 1) {
            return null;
        }
        else {
            var n0 = array[index];
            var interpolation = n0.interpolation;
            if (interpolation.type === "none") {
                return null;
            }
            var n1 = array[index + 1];
            var slope = interpolation.type === "curve" ? interpolation.slope : 0.5;
            var x0 = range.unitToX(n0.position + offset);
            var x1 = range.unitToX(n1.position + offset);
            var y0 = valueToY(n0.value);
            var y1 = valueToY(n1.value);
            // Check midpoint first
            var midX = (x0 + x1) * 0.5;
            var midY = lib_std_1.Curve.normalizedAt(0.5, slope) * (y1 - y0) + y0;
            var dx = x - midX;
            var dy = y - midY;
            if (Math.sqrt(dx * dx + dy * dy) <= Constants_1.MidPointRadius * Constants_1.EventRatio) {
                return { type: "midpoint", event: n0 };
            }
            // Check curve line
            var curveY = lib_std_1.Curve.valueAt({ slope: slope, steps: x1 - x0, y0: y0, y1: y1 }, x - x0);
            if (Math.abs(curveY - y) < constants_ts_1.PointerRadiusDistance) {
                return { type: "curve", event: n0 };
            }
        }
        return null;
    };
    return new studio_core_1.ElementCapturing(element, {
        capture: function (x, y) {
            var event = captureEvent(x, y);
            return (0, lib_std_1.isDefined)(event)
                ? event
                : Math.abs(range.unitToX(reader.loopDuration + reader.offset) - x) < constants_ts_1.PointerRadiusDistance
                    ? { type: "loop-duration", reader: reader }
                    : null;
        }
    });
};
exports.createValueEventCapturing = createValueEventCapturing;
