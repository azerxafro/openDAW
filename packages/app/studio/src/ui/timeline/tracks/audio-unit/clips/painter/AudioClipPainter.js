"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioClipPainter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_fusion_1 = require("@opendaw/lib-fusion");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var createAudioClipPainter = function (adapter) { return function (painter) {
    var context = painter.context, size = painter.actualHeight;
    var radius = size >> 1;
    var file = adapter.file, gain = adapter.gain, duration = adapter.duration, optWarpMarkers = adapter.optWarpMarkers, isPlayModeNoStretch = adapter.isPlayModeNoStretch, waveformOffset = adapter.waveformOffset;
    if (file.peaks.isEmpty()) {
        return;
    }
    var numRays = 256;
    var peaks = file.peaks.unwrap();
    var numFrames = peaks.numFrames;
    var durationInSeconds = file.endInSeconds - file.startInSeconds;
    var scale = (0, lib_dsp_1.dbToGain)(gain.getValue());
    var minRadius = 4 * devicePixelRatio;
    var maxRadius = radius - 4 * devicePixelRatio;
    var centerRadius = (minRadius + maxRadius) * 0.5;
    context.save();
    context.translate(radius, radius);
    context.strokeStyle = "hsl(".concat(adapter.hue, ", 50%, 80%)");
    context.beginPath();
    var drawRay = function (rayIndex, min, max) {
        var angle = rayIndex / numRays * lib_std_1.TAU;
        var sin = Math.sin(angle);
        var cos = -Math.cos(angle);
        var minR = centerRadius - min * (minRadius - centerRadius) * scale;
        var maxR = centerRadius + max * (maxRadius - centerRadius) * scale;
        context.moveTo(sin * minR, cos * minR);
        context.lineTo(sin * maxR, cos * maxR);
    };
    if (optWarpMarkers.nonEmpty() && !isPlayModeNoStretch) {
        var warpMarkers = optWarpMarkers.unwrap();
        var data = peaks.data[0];
        for (var _i = 0, _a = lib_std_1.Iterables.pairWise(warpMarkers.iterateFrom(0)); _i < _a.length; _i++) {
            var _b = _a[_i], w0 = _b[0], w1 = _b[1];
            if (w1 === null) {
                break;
            }
            var segmentStartPosition = Math.max(0, w0.position);
            var segmentEndPosition = Math.min(duration, w1.position);
            if (segmentStartPosition >= segmentEndPosition) {
                continue;
            }
            var rayStart = Math.floor((segmentStartPosition / duration) * numRays);
            var rayEnd = Math.ceil((segmentEndPosition / duration) * numRays);
            var numSegmentRays = rayEnd - rayStart;
            if (numSegmentRays <= 0) {
                continue;
            }
            var segmentPositionRange = w1.position - w0.position;
            var segmentSecondsRange = w1.seconds - w0.seconds;
            var segmentFrames = Math.abs(segmentSecondsRange / durationInSeconds * numFrames);
            var framesPerRay = segmentFrames / numSegmentRays;
            var stage = peaks.nearest(framesPerRay);
            if (stage === null) {
                continue;
            }
            var unitsEachPeak = stage.unitsEachPeak();
            var maxIndex = data.length - 1 - stage.dataOffset;
            for (var ray = rayStart; ray < rayEnd; ray++) {
                var clipPosition = (ray / numRays) * duration;
                var t = (clipPosition - w0.position) / segmentPositionRange;
                var seconds = w0.seconds + t * segmentSecondsRange + waveformOffset.getValue();
                var frameIndex = (seconds / durationInSeconds) * numFrames;
                var index = Math.min(Math.floor(frameIndex / unitsEachPeak), maxIndex);
                if (index < 0) {
                    continue;
                }
                var bits = data[stage.dataOffset + index];
                drawRay(ray, lib_fusion_1.Peaks.unpack(bits, 0), lib_fusion_1.Peaks.unpack(bits, 1));
            }
        }
    }
    else {
        var unitsEachPixel = numFrames / numRays;
        var stage = peaks.nearest(unitsEachPixel);
        if (stage === null) {
            context.restore();
            return;
        }
        var unitsEachPeak = stage.unitsEachPeak();
        var peaksEachRay = unitsEachPixel / unitsEachPeak;
        var data = peaks.data[0];
        var sampleRate = numFrames / durationInSeconds;
        var offsetFrames = waveformOffset.getValue() * sampleRate;
        var from = offsetFrames / unitsEachPeak;
        var indexFrom = Math.floor(from);
        var min = 0.0;
        var max = 0.0;
        for (var i = 0; i < numRays; i++) {
            var to = from + peaksEachRay;
            var indexTo = Math.floor(to);
            var swap = false;
            while (indexFrom < indexTo) {
                if (indexFrom >= 0) {
                    var bits = data[stage.dataOffset + indexFrom];
                    min = Math.min(lib_fusion_1.Peaks.unpack(bits, 0), min);
                    max = Math.max(lib_fusion_1.Peaks.unpack(bits, 1), max);
                }
                indexFrom++;
                swap = true;
            }
            drawRay(i, min, max);
            if (swap) {
                var tmp = max;
                max = min;
                min = tmp;
            }
            from = to;
            indexFrom = indexTo;
        }
    }
    context.stroke();
    context.restore();
}; };
exports.createAudioClipPainter = createAudioClipPainter;
