"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
var Display_sass_inline_1 = require("./Display.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var className = lib_dom_1.Html.adoptStyleSheet(Display_sass_inline_1.default, "Display");
var Display = function (_a) {
    var lifecycle = _a.lifecycle, adapter = _a.adapter, liveStreamReceiver = _a.liveStreamReceiver;
    var computer = new lib_dsp_1.TidalComputer();
    return (<div className={className}>
            <canvas onInit={function (canvas) {
            var processorPhase = 0.0;
            var _a = adapter.namedParameter, depth = _a.depth, slope = _a.slope, symmetry = _a.symmetry, offset = _a.offset, channelOffset = _a.channelOffset;
            var uMin = -0.5;
            var uMax = 1.5;
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                var fullOffset = offset.getControlledValue() / 360.0;
                var channelPhase = channelOffset.getControlledValue() / 360.0;
                var padding = devicePixelRatio * 2;
                var top = padding;
                var bottom = actualHeight - padding;
                var xToValue = function (x) { return uMin + (x / actualWidth - uMin) * (uMax - uMin); };
                var valueToX = function (value) { return (value - uMin) / (uMax - uMin) * actualWidth; };
                var valueToY = function (value) { return bottom + (top - bottom) * value; };
                computer.set(depth.getControlledValue(), slope.getControlledValue(), symmetry.getControlledValue());
                // edges
                var x0 = valueToX(0.0);
                var x1 = valueToX(1.0);
                var y0 = valueToY(0.0);
                var y1 = valueToY(1.0);
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x0, y1);
                context.moveTo(x1, y0);
                context.lineTo(x1, y1);
                context.setLineDash([3, 3]);
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.75);
                context.stroke();
                var curve = function (u0, u1, opacity, phaseOffset) {
                    var ud = fullOffset + phaseOffset;
                    var x0 = valueToX(u0);
                    var x1 = valueToX(u1);
                    var path = new Path2D();
                    path.moveTo(x0, valueToY(computer.compute(u0 + ud)));
                    for (var x = x0; x <= x1; x++) {
                        path.lineTo(x, valueToY(computer.compute(xToValue(x) + ud)));
                    }
                    context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(opacity * 0.75);
                    context.stroke(path);
                    path.lineTo(x1, actualHeight);
                    path.lineTo(x0, actualHeight);
                    var gradient = context.createLinearGradient(0, top, 0, bottom);
                    gradient.addColorStop(0.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.08));
                    gradient.addColorStop(1.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.02));
                    context.fillStyle = gradient;
                    context.fill(path);
                };
                context.lineWidth = 2.0;
                context.setLineDash(lib_std_1.Arrays.empty());
                // Channel 0
                curve(uMin, 0.0, 0.30, 0.0);
                curve(0.0, 1.0, 0.90, 0.0);
                curve(1.0, uMax, 0.30, 0.0);
                // Channel 1
                curve(uMin, 0.0, 0.10, channelPhase);
                curve(0.0, 1.0, 0.20, channelPhase);
                curve(1.0, uMax, 0.10, channelPhase);
                var dot = function (phase, offset, opacity) {
                    var u = phase - Math.floor(phase);
                    var x = valueToX(u);
                    var y = valueToY(computer.compute(u + offset));
                    context.beginPath();
                    context.arc(x, y, 4.0, 0.0, lib_std_1.TAU);
                    context.fillStyle = DisplayPaint_1.DisplayPaint.strokeStyle(opacity);
                    context.fill();
                };
                context.strokeStyle = "none";
                dot(processorPhase, fullOffset, 1.0);
                dot(processorPhase, fullOffset + channelPhase, 0.2);
            }));
            lifecycle.ownAll(depth.subscribe(painter.requestUpdate), slope.subscribe(painter.requestUpdate), symmetry.subscribe(painter.requestUpdate), offset.subscribe(painter.requestUpdate), channelOffset.subscribe(painter.requestUpdate), liveStreamReceiver.subscribeFloat(adapter.address.append(0), function (value) {
                if (processorPhase !== value) {
                    processorPhase = value;
                    painter.requestUpdate();
                }
            }));
        }}/>
        </div>);
};
exports.Display = Display;
