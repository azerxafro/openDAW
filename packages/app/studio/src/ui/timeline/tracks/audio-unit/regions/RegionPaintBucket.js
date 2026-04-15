"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionPaintBucket = void 0;
var RegionPaintBucket;
(function (RegionPaintBucket) {
    RegionPaintBucket.create = function (_a, selected, forceMute) {
        var hue = _a.hue, mute = _a.mute;
        var saturationFactor = mute || forceMute ? 0.05 : 1.0;
        var fullSat = 100 * saturationFactor;
        var normSat = 60 * saturationFactor;
        var lessSat = 45 * saturationFactor;
        var labelColor = selected ? "hsl(".concat(hue, ", ").concat(normSat, "%, 10%)") : "hsl(".concat(hue, ", ").concat(normSat, "%, 60%)");
        var labelBackground = selected ? "hsla(".concat(hue, ", ").concat(fullSat, "%, 60%, 0.75)") : "hsla(".concat(hue, ", ").concat(lessSat, "%, 60%, 0.15)");
        var contentColor = "hsl(".concat(hue, ", ").concat(normSat, "%, 45%)");
        var contentBackground = selected ? "hsla(".concat(hue, ", ").concat(normSat, "%, 60%, 0.06)") : "hsla(".concat(hue, ", ").concat(normSat, "%, 60%, 0.03)");
        var loopStrokeColor = "hsl(".concat(hue, ", ").concat(normSat, "%, 50%)");
        return { labelColor: labelColor, labelBackground: labelBackground, contentColor: contentColor, contentBackground: contentBackground, loopStrokeColor: loopStrokeColor };
    };
})(RegionPaintBucket || (exports.RegionPaintBucket = RegionPaintBucket = {}));
