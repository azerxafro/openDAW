"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionCurve = void 0;
var CompressionCurve_sass_inline_1 = require("./CompressionCurve.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var Vertical_1 = require("@/ui/devices/audio-effects/Compressor/Vertical");
var ctagdrc_1 = require("@opendaw/lib-dsp/ctagdrc");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var className = lib_dom_1.Html.adoptStyleSheet(CompressionCurve_sass_inline_1.default, "CompressionCurve");
var CompressionCurve = function (_a) {
    var lifecycle = _a.lifecycle, adapter = _a.adapter, values = _a.values;
    var padding = Vertical_1.Vertical.padding, size = Vertical_1.Vertical.innerHeight, scale = Vertical_1.Vertical.scale;
    var _b = adapter.namedParameter, threshold = _b.threshold, ratio = _b.ratio, knee = _b.knee;
    var numSegments = 7;
    var segmentSize = size / numSegments;
    var gridColor = "hsla(200, 40%, 70%, 0.12)";
    var computer = new ctagdrc_1.GainComputer();
    return (<div className={className}>
            <canvas style={{
            top: "".concat(padding, "px"),
            left: "".concat(padding, "px"),
            width: "calc(100% - ".concat(padding * 2, "px)"),
            height: "calc(100% - ".concat(padding * 2, "px)"),
            borderRadius: "".concat(segmentSize / 2, "px ").concat(segmentSize / 2, "px 0 ").concat(segmentSize / 2, "px"),
            outline: "1px solid ".concat(gridColor)
        }} onInit={function (canvas) {
            var canvasPainter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, devicePixelRatio = painter.devicePixelRatio;
                context.scale(devicePixelRatio, devicePixelRatio);
                context.save();
                context.lineWidth = 1.0 / devicePixelRatio;
                context.beginPath();
                for (var i = 1; i < numSegments; i++) {
                    var pos = Math.round(i * segmentSize);
                    context.moveTo(pos, 0);
                    context.lineTo(pos, size);
                    context.moveTo(0, pos);
                    context.lineTo(size, pos);
                }
                context.strokeStyle = gridColor;
                context.stroke();
                var drawPath = function (x0, x1, stroke) {
                    var path2D = new Path2D();
                    for (var x_1 = x0; x_1 <= x1; x_1++) {
                        var db = scale.normToUnit(1.0 - x_1 / size);
                        var cp_1 = computer.applyCompression(-db) - db;
                        var y_1 = Math.min(scale.unitToNorm(-cp_1) * size, size);
                        if (x_1 === 0) {
                            path2D.moveTo(x_1, y_1);
                        }
                        else {
                            path2D.lineTo(x_1, y_1);
                        }
                    }
                    if (stroke) {
                        context.lineWidth = 1.5;
                        context.fillStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.08);
                        context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.80);
                        context.stroke(path2D);
                    }
                    path2D.lineTo(x1, size);
                    path2D.lineTo(x0, size);
                    path2D.closePath();
                    context.fill(path2D);
                };
                drawPath(0, size, true);
                var kneeValue = knee.getValue();
                if (kneeValue > 0.0) {
                    var thresholdValue = threshold.getValue();
                    var x0 = (1.0 - scale.unitToNorm(-thresholdValue + kneeValue * 0.5)) * size;
                    var x1 = (1.0 - scale.unitToNorm(-thresholdValue - kneeValue * 0.5)) * size;
                    drawPath(Math.max(x0, 0), Math.min(x1, size), false);
                }
                var input = values[0];
                var x = (1.0 - scale.unitToNorm(-input)) * size;
                var cp = computer.applyCompression(input) + input;
                var y = Math.min(scale.unitToNorm(-cp) * size, size);
                context.beginPath();
                context.arc(x, y, 3, 0.0, lib_std_1.TAU);
                context.fillStyle = "hsla(200, 83%, 60%, 0.80)";
                context.fill();
                context.restore();
            }));
            lifecycle.ownAll(lib_dom_1.AnimationFrame.add(function () { return canvasPainter.requestUpdate(); }), threshold.catchupAndSubscribe(function (owner) {
                computer.setThreshold(owner.getValue());
                canvasPainter.requestUpdate();
            }), ratio.catchupAndSubscribe(function (owner) {
                computer.setRatio(owner.getValue());
                canvasPainter.requestUpdate();
            }), knee.catchupAndSubscribe(function (owner) {
                computer.setKnee(owner.getValue());
                canvasPainter.requestUpdate();
            }));
            return canvasPainter;
        }}/>
        </div>);
};
exports.CompressionCurve = CompressionCurve;
