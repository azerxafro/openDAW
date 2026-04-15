"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPitchEventCapturing = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var constants_ts_1 = require("@/ui/timeline/constants.ts");
var studio_core_1 = require("@opendaw/studio-core");
var createPitchEventCapturing = function (element, positioner, range, reader) {
    return new studio_core_1.ElementCapturing(element, {
        capture: function (x, y) {
            var offset = reader.offset;
            var pitch = positioner.yToPitch(y);
            var localPosition = Math.floor(range.xToUnit(x)) - offset;
            var event = reader.content.events.lowerEqual(localPosition, function (event) { return event.pitch === pitch; });
            if ((0, lib_std_1.isDefined)(event)) {
                if (Math.abs(range.unitToX(event.complete + offset) - x) < constants_ts_1.PointerRadiusDistance) {
                    return { event: event, type: "note-end" };
                }
                if (localPosition < event.complete) {
                    return { event: event, type: "note-position" };
                }
            }
            return Math.abs(range.unitToX(reader.loopDuration + offset) - x) < constants_ts_1.PointerRadiusDistance
                ? { reader: reader, type: "loop-duration" }
                : null;
        }
    });
};
exports.createPitchEventCapturing = createPitchEventCapturing;
