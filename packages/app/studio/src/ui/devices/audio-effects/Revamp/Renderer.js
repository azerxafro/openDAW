"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCurveRenderer = exports.plotSpectrum = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var Curves_ts_1 = require("@/ui/devices/audio-effects/Revamp/Curves.ts");
var constants_ts_1 = require("./constants.ts");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var plotSpectrum = function (context, xAxis, yAxis, spectrum, sampleRate) {
    var canvas = context.canvas;
    var numBins = spectrum.length;
    var freqStep = sampleRate / (numBins << 1);
    var width = canvas.width = canvas.clientWidth * devicePixelRatio;
    var height = canvas.height = canvas.clientHeight * devicePixelRatio;
    var x0 = 0 | 0;
    var lastEnergy = spectrum[0];
    var currentEnergy = lastEnergy;
    var path2D = new Path2D();
    path2D.moveTo(0, (1.0 - yAxis.unitToNorm((0, lib_dsp_1.gainToDb)(lastEnergy))) * height);
    for (var i = 1; i < numBins; ++i) {
        var energy = spectrum[i];
        if (currentEnergy < energy) {
            currentEnergy = energy;
        }
        var x1 = (xAxis.unitToNorm(i * freqStep) * width) | 0;
        if (x1 > width) {
            i = numBins;
            x1 = width;
        }
        if (x0 < x1) {
            var xn = x1 - x0;
            var scale = 1.0 / xn;
            var y1 = yAxis.unitToNorm((0, lib_dsp_1.gainToDb)(lastEnergy));
            var y2 = yAxis.unitToNorm((0, lib_dsp_1.gainToDb)(currentEnergy));
            for (var x = 1; x <= xn; ++x) {
                path2D.lineTo(x0 + x, (1.0 - (0, lib_std_1.linear)(y1, y2, x * scale)) * height);
            }
            lastEnergy = currentEnergy;
            currentEnergy = 0.0;
        }
        x0 = x1;
    }
    context.lineWidth = 0.0;
    context.fillStyle = "hsla(200, 83%, 60%, 0.04)";
    context.strokeStyle = "hsla(200, 83%, 60%, 0.80)";
    context.stroke(path2D);
    path2D.lineTo(width, height);
    path2D.lineTo(0, height);
    path2D.closePath();
    context.fill(path2D);
};
exports.plotSpectrum = plotSpectrum;
var createCurveRenderer = function (canvas, xAxis, yAxis, adapter) {
    var _a = adapter.namedParameter, highPass = _a.highPass, lowShelf = _a.lowShelf, lowBell = _a.lowBell, midBell = _a.midBell, highBell = _a.highBell, highShelf = _a.highShelf, lowPass = _a.lowPass;
    var renderers = [
        new Curves_ts_1.HighPass(highPass, constants_ts_1.ColorSets[0], constants_ts_1.curveSampleRate),
        new Curves_ts_1.LowShelf(lowShelf, constants_ts_1.ColorSets[1], constants_ts_1.curveSampleRate),
        new Curves_ts_1.Bell(lowBell, constants_ts_1.ColorSets[2], constants_ts_1.curveSampleRate),
        new Curves_ts_1.Bell(midBell, constants_ts_1.ColorSets[3], constants_ts_1.curveSampleRate),
        new Curves_ts_1.Bell(highBell, constants_ts_1.ColorSets[4], constants_ts_1.curveSampleRate),
        new Curves_ts_1.HighShelf(highShelf, constants_ts_1.ColorSets[5], constants_ts_1.curveSampleRate),
        new Curves_ts_1.LowPass(lowPass, constants_ts_1.ColorSets[6], constants_ts_1.curveSampleRate)
    ];
    var responseArrays = null;
    var canvasPainter = new studio_core_1.CanvasUnitPainter(canvas, xAxis, yAxis, function (painter) {
        if (responseArrays === null || responseArrays[0].length !== painter.actualWidth) {
            var n = Math.ceil(painter.actualWidth);
            responseArrays = [new Float32Array(n), new Float32Array(n), new Float32Array(n)];
            var frequencies_1 = responseArrays[0];
            for (var i = 0; i < n; i++) {
                frequencies_1[i] = xAxis.normToUnit(i / (n - 1)) / constants_ts_1.curveSampleRate;
            }
        }
        var context = painter.context;
        context.lineWidth = 1;
        context.globalCompositeOperation = "lighten";
        var frequencies = responseArrays[0], phaseResponse = responseArrays[1], totalResponse = responseArrays[2];
        totalResponse.fill(0.0);
        if (painter.isResized) {
            renderers.forEach(function (renderer) { return renderer.onResize(); });
        }
        renderers.forEach(function (renderer) { return renderer.update(painter, frequencies, phaseResponse, totalResponse); });
        context.strokeStyle = "rgba(255, 255, 255, 0.5)";
        var curve = new Path2D();
        for (var x = 0; x < totalResponse.length; x++) {
            var y = Math.round(painter.unitToY(totalResponse[x])) - 0.5;
            if (x === 0) {
                curve.moveTo(x, y);
            }
            else {
                curve.lineTo(x, y);
            }
        }
        context.stroke(curve);
    });
    return lib_std_1.Terminable.many.apply(lib_std_1.Terminable, __spreadArray(__spreadArray([canvasPainter], renderers, false), renderers.map(function (renderer) { return renderer.subscribe(function () { return canvasPainter.requestUpdate(); }); }), false));
};
exports.createCurveRenderer = createCurveRenderer;
