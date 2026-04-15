"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalPeakMeter = void 0;
var HorizontalMeter_sass_inline_1 = require("./HorizontalMeter.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(HorizontalMeter_sass_inline_1.default, "PeakVolumeSlider");
var HorizontalPeakMeter = function (_a) {
    var lifecycle = _a.lifecycle, peaksInDb = _a.peaksInDb, width = _a.width;
    var canvas = <canvas />;
    var mapping = lib_std_1.ValueMapping.linear(-48, 9);
    var s0 = mapping.x(-12);
    var s1 = mapping.x(0);
    var maxPeaks = lib_std_1.Arrays.create(function () { return ({
        time: 0,
        value: Number.NEGATIVE_INFINITY
    }); }, peaksInDb.length);
    var peakPainter = new studio_core_1.CanvasPainter(canvas, function (painter) {
        var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight;
        var now = Date.now();
        context.clearRect(0, 0, actualWidth, actualHeight);
        var gradient = context.createLinearGradient(0, 0, actualWidth, 0);
        gradient.addColorStop(s0, studio_enums_1.Colors.green.toString());
        gradient.addColorStop(s0, studio_enums_1.Colors.yellow.toString());
        gradient.addColorStop(s1, studio_enums_1.Colors.yellow.toString());
        gradient.addColorStop(s1, studio_enums_1.Colors.red.toString());
        context.fillStyle = gradient;
        context.globalAlpha = 0.08;
        peaksInDb.forEach(function (_peak, index) {
            var h = Math.floor(actualHeight / peaksInDb.length);
            context.fillRect(0, index * (h + 1), actualWidth, h - 1);
        });
        context.globalAlpha = 1.0;
        peaksInDb.forEach(function (peak, index) {
            var h = Math.floor(actualHeight / peaksInDb.length);
            context.fillRect(0, index * (h + 1), actualWidth * mapping.x(peak), h - 1);
            var peakHold = maxPeaks[index];
            if (peakHold.value <= peak) {
                peakHold.value = peak;
                peakHold.time = now;
            }
            else if (now - peakHold.time >= 2000) {
                peakHold.value -= 0.75;
            }
            var x = Math.ceil(actualWidth * mapping.x(peakHold.value));
            if (x > 0) {
                context.fillRect(x, index * (h + 1), 1, h - 1);
            }
        });
    });
    lifecycle.ownAll(peakPainter, lib_dom_1.AnimationFrame.add(peakPainter.requestUpdate));
    return (<div className={className} style={{ width: width }}>{canvas}</div>);
};
exports.HorizontalPeakMeter = HorizontalPeakMeter;
