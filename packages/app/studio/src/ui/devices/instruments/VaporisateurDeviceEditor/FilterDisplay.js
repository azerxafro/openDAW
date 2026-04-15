"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterDisplay = void 0;
var Display_sass_inline_1 = require("./Display.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var className = lib_dom_1.Html.adoptStyleSheet(Display_sass_inline_1.default, "Display");
var FilterDisplay = function (_a) {
    var lifecycle = _a.lifecycle, cutoff = _a.cutoff, resonance = _a.resonance, order = _a.order;
    var coeff = new lib_dsp_1.BiquadCoeff();
    var frequency = new Float32Array(0);
    var magResponse = new Float32Array(0);
    var phaseResponse = new Float32Array(0);
    return (<canvas className={className} onInit={function (canvas) {
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                var oversampling = 4;
                var invOversampling = 1.0 / oversampling;
                var oversampledWidth = actualWidth * oversampling;
                var padding = devicePixelRatio * 2;
                var top = padding;
                var bottom = actualHeight - padding;
                var minDb = -24.0;
                var maxDb = +24.0;
                var o = order.getControlledValue();
                var gainToY = function (value) { return bottom + (top - bottom) * ((0, lib_dsp_1.gainToDb)(value) * o - minDb) / (maxDb - minDb); };
                var sf = 48000;
                coeff.setLowpassParams(cutoff.getControlledValue() / sf, resonance.getControlledValue() / (Math.pow(o, 1.25)));
                if (frequency.length !== oversampledWidth) {
                    frequency = new Float32Array(oversampledWidth);
                    magResponse = new Float32Array(oversampledWidth);
                    phaseResponse = new Float32Array(oversampledWidth);
                }
                for (var x = 0; x < oversampledWidth; x++) {
                    var freq = studio_adapters_1.VaporisateurSettings.CUTOFF_VALUE_MAPPING.y(x / oversampledWidth);
                    frequency[x] = freq / sf;
                }
                coeff.getFrequencyResponse(frequency, magResponse, phaseResponse);
                context.lineWidth = devicePixelRatio;
                var path = new Path2D();
                path.moveTo(0, gainToY(magResponse[0]));
                for (var x = 1; x < oversampledWidth; x++) {
                    var y = gainToY(magResponse[x]);
                    if (y >= bottom) {
                        break;
                    }
                    path.lineTo(x * invOversampling, y);
                }
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.75);
                context.stroke(path);
                path.lineTo(actualWidth, bottom);
                path.lineTo(0, bottom);
                var gradient = context.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0.5, DisplayPaint_1.DisplayPaint.strokeStyle(0.2));
                gradient.addColorStop(1.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.0));
                context.fillStyle = gradient;
                context.fill(path);
                context.beginPath();
                context.setLineDash([2, 2]);
                var zeroDbY = gainToY(1.0);
                context.moveTo(0, zeroDbY);
                context.lineTo(actualWidth, zeroDbY);
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.25);
                context.stroke();
            }));
            lifecycle.ownAll(cutoff.catchupAndSubscribe(painter.requestUpdate), resonance.catchupAndSubscribe(painter.requestUpdate), order.catchupAndSubscribe(painter.requestUpdate));
        }}/>);
};
exports.FilterDisplay = FilterDisplay;
