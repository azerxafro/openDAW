"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvelopeDisplay = void 0;
var Display_sass_inline_1 = require("./Display.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var className = lib_dom_1.Html.adoptStyleSheet(Display_sass_inline_1.default, "Display");
var EnvelopeDisplay = function (_a) {
    var lifecycle = _a.lifecycle, sustain = _a.sustain, receiver = _a.receiver, address = _a.address;
    var envValues = new Float32Array(32).fill(-1);
    return (<canvas className={className} onInit={function (canvas) {
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                var padding = devicePixelRatio * 2;
                var top = padding;
                var bottom = actualHeight - padding;
                var valueToY = function (value) { return bottom + (top - bottom) * value; };
                var adsr = function (x, s) {
                    if (x < 0.25) {
                        return x * 4.0;
                    }
                    if (x < 0.5) {
                        return 1.0 - (x - 0.25) * 4.0 * (1.0 - s);
                    }
                    if (x < 0.75) {
                        return s;
                    }
                    return s * (1.0 - (x - 0.75) * 4.0);
                };
                var s = sustain.getControlledValue();
                context.lineWidth = devicePixelRatio;
                var path = new Path2D();
                path.moveTo(0, valueToY(adsr(0, s)));
                for (var x = 1; x <= actualWidth; x++) {
                    path.lineTo(x, valueToY(adsr(x / actualWidth, s)));
                }
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.75);
                context.stroke(path);
                path.lineTo(actualWidth, valueToY(0.0));
                path.lineTo(0, valueToY(0.0));
                var gradient = context.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.2));
                gradient.addColorStop(1.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.0));
                context.fillStyle = gradient;
                context.fill(path);
                context.beginPath();
                context.moveTo(actualWidth / 4, top);
                context.lineTo(actualWidth / 4, bottom);
                context.moveTo(actualWidth / 2, top);
                context.lineTo(actualWidth / 2, bottom);
                context.moveTo(actualWidth / 4 * 3, top);
                context.lineTo(actualWidth / 4 * 3, bottom);
                context.setLineDash([2, 2]);
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.2);
                context.stroke();
                for (var i = 0; i < envValues.length; i++) {
                    var envValue = envValues[i];
                    if (envValue === -1) {
                        break;
                    }
                    context.beginPath();
                    context.arc(envValue * actualWidth, valueToY(adsr(envValue, s)), devicePixelRatio, 0.0, lib_std_1.TAU);
                    context.fillStyle = "hsl(200, 83%, 75%)";
                    context.fill();
                }
            }));
            lifecycle.ownAll(receiver.subscribeFloats(address, function (phases) {
                for (var i = 0; i < phases.length; i++) {
                    var phase = phases[i];
                    if (phase === -1) {
                        envValues[i] = -1;
                        break;
                    }
                    envValues[i] = phase * 0.25;
                }
                painter.requestUpdate();
            }), sustain.catchupAndSubscribe(painter.requestUpdate));
        }}/>);
};
exports.EnvelopeDisplay = EnvelopeDisplay;
