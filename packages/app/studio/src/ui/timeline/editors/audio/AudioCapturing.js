"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioCapturing = void 0;
var constants_ts_1 = require("@/ui/timeline/constants.ts");
var studio_core_1 = require("@opendaw/studio-core");
var createAudioCapturing = function (element, range, reader) {
    return new studio_core_1.ElementCapturing(element, {
        capture: function (x, _y) {
            return Math.abs(range.unitToX(reader.loopDuration + reader.offset) - x) < constants_ts_1.PointerRadiusDistance
                ? { reader: reader, type: "loop-duration" }
                : null;
        }
    });
};
exports.createAudioCapturing = createAudioCapturing;
