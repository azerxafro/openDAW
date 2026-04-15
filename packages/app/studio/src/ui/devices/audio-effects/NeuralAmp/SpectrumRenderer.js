"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpectrumRenderer = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var createSpectrumRenderer = function (canvas, adapter, receiver, sampleRate) {
    var terminator = new lib_std_1.Terminator();
    var spectrum = null;
    var gridColor = "hsla(200, 40%, 70%, 0.2)";
    var gridFreqs = lib_std_1.Arrays.create(function (index) { return 20 * Math.pow(2, (index + 1)); }, 9);
    var gridDbs = [-50, -40, -30, -20, -10];
    var painter = terminator.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
        if (spectrum === null) {
            return;
        }
        var context = painter.context;
        var width = painter.actualWidth;
        var height = painter.actualHeight;
        context.clearRect(0, 0, width, height);
        var numBins = spectrum.length;
        var freqStep = sampleRate / (numBins << 1);
        var minFreq = 20;
        var maxFreq = 20000;
        var minDb = -60;
        var maxDb = -3;
        var freqToX = function (freq) {
            var norm = Math.log(freq / minFreq) / Math.log(maxFreq / minFreq);
            return norm * width;
        };
        var dbToY = function (db) {
            var norm = (db - minDb) / (maxDb - minDb);
            return (1.0 - norm) * height;
        };
        context.lineWidth = 1.0 / painter.devicePixelRatio;
        context.strokeStyle = gridColor;
        context.beginPath();
        for (var _i = 0, gridFreqs_1 = gridFreqs; _i < gridFreqs_1.length; _i++) {
            var freq = gridFreqs_1[_i];
            var x = Math.round(freqToX(freq));
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }
        for (var _a = 0, gridDbs_1 = gridDbs; _a < gridDbs_1.length; _a++) {
            var db = gridDbs_1[_a];
            var y = Math.round(dbToY(db));
            context.moveTo(0, y);
            context.lineTo(width, y);
        }
        context.stroke();
        var x0 = 0 | 0;
        var lastEnergy = spectrum[0];
        var currentEnergy = lastEnergy;
        var minY = height;
        var path2D = new Path2D();
        var startY = dbToY((0, lib_dsp_1.gainToDb)(lastEnergy));
        minY = Math.min(minY, startY);
        path2D.moveTo(0, startY);
        for (var i = 1; i < numBins; ++i) {
            var energy = spectrum[i];
            if (currentEnergy < energy) {
                currentEnergy = energy;
            }
            var x1 = freqToX(i * freqStep) | 0;
            if (x1 > width) {
                i = numBins;
                x1 = width;
            }
            if (x0 < x1) {
                var xn = x1 - x0;
                var scale = 1.0 / xn;
                var y1 = dbToY((0, lib_dsp_1.gainToDb)(lastEnergy));
                var y2 = dbToY((0, lib_dsp_1.gainToDb)(currentEnergy));
                minY = Math.min(minY, y2);
                for (var x = 1; x <= xn; ++x) {
                    path2D.lineTo(x0 + x, (0, lib_std_1.linear)(y1, y2, x * scale));
                }
                lastEnergy = currentEnergy;
                currentEnergy = 0.0;
            }
            x0 = x1;
        }
        context.lineWidth = 1;
        context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.80);
        context.stroke(path2D);
        path2D.lineTo(width, height);
        path2D.lineTo(0, height);
        path2D.closePath();
        var gradient = context.createLinearGradient(0, minY, 0, height);
        gradient.addColorStop(0, DisplayPaint_1.DisplayPaint.strokeStyle(0.25));
        gradient.addColorStop(1, "transparent");
        context.fillStyle = gradient;
        context.fill(path2D);
    }));
    terminator.own(receiver.subscribeFloats(adapter.spectrum, function (values) {
        spectrum = values;
        painter.requestUpdate();
    }));
    return terminator;
};
exports.createSpectrumRenderer = createSpectrumRenderer;
