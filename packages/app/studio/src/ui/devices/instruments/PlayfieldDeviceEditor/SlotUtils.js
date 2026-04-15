"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotUtils = void 0;
var lib_fusion_1 = require("@opendaw/lib-fusion");
var SlotUtils;
(function (SlotUtils) {
    SlotUtils.color = function (semitone) { return "hsl(".concat(semitone / 13 * 360, ", 100%, 70%)"); };
    SlotUtils.waveform = function (_a, sample, semitone, forceBounds) {
        var context = _a.context, width = _a.width, height = _a.height;
        if (forceBounds === void 0) { forceBounds = false; }
        return sample.file().match({
            none: function () { return context.clearRect(0, 0, width, height); },
            some: function (file) {
                context.clearRect(0, 0, width, height);
                file.getOrCreateLoader().peaks.ifSome(function (peaks) {
                    var numFrames = peaks.numFrames, numChannels = peaks.numChannels;
                    var _a = sample.namedParameter, sampleStart = _a.sampleStart, sampleEnd = _a.sampleEnd;
                    var wd = (width - 1) * devicePixelRatio;
                    var s0 = Math.min(sampleStart.getValue(), sampleEnd.getValue());
                    var s1 = Math.max(sampleStart.getValue(), sampleEnd.getValue());
                    var u0 = s0 * numFrames;
                    var u1 = s1 * numFrames;
                    var x0 = s0 * wd;
                    var x1 = s1 * wd;
                    context.fillStyle = SlotUtils.color(semitone);
                    var rowHeight = height * devicePixelRatio / numChannels;
                    for (var channelIndex = 0; channelIndex < numChannels; channelIndex++) {
                        layout.u0 = u0;
                        layout.u1 = u1;
                        layout.x0 = x0;
                        layout.x1 = x1;
                        layout.y0 = rowHeight * channelIndex;
                        layout.y1 = rowHeight * (channelIndex + 1);
                        lib_fusion_1.PeaksPainter.renderPixelStrips(context, peaks, channelIndex, layout);
                    }
                    if (x0 > 0.0 || forceBounds) {
                        context.fillRect(Math.round(x0), 0, 1, height * devicePixelRatio);
                    }
                    if (x1 < wd || forceBounds) {
                        context.fillRect(Math.round(x1), 0, 1, height * devicePixelRatio);
                    }
                    if (u0 > 0.0) {
                        context.globalAlpha = 0.25;
                        for (var channelIndex = 0; channelIndex < numChannels; channelIndex++) {
                            layout.u0 = 0.0;
                            layout.u1 = u0;
                            layout.x0 = 0.0;
                            layout.x1 = x0;
                            layout.y0 = rowHeight * channelIndex;
                            layout.y1 = rowHeight * (channelIndex + 1);
                            lib_fusion_1.PeaksPainter.renderPixelStrips(context, peaks, channelIndex, layout);
                        }
                    }
                    if (u1 < numFrames) {
                        context.globalAlpha = 0.25;
                        for (var channelIndex = 0; channelIndex < numChannels; channelIndex++) {
                            layout.u0 = u1;
                            layout.u1 = numFrames;
                            layout.x0 = x1;
                            layout.x1 = wd;
                            layout.y0 = rowHeight * channelIndex;
                            layout.y1 = rowHeight * (channelIndex + 1);
                            lib_fusion_1.PeaksPainter.renderPixelStrips(context, peaks, channelIndex, layout);
                        }
                    }
                    context.globalAlpha = 1.0;
                });
            }
        });
    };
    var layout = { u0: 0.0, u1: 0.0, x0: 0.0, x1: 0.0, v0: +1.1, v1: -1.1, y0: 0.0, y1: 0.0 };
})(SlotUtils || (exports.SlotUtils = SlotUtils = {}));
