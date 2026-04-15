"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GateDisplay = void 0;
var GateDisplay_sass_inline_1 = require("./GateDisplay.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(GateDisplay_sass_inline_1.default, "GateDisplay");
var DB_MIN = -66.0;
var DB_MAX = 6.0;
var HISTORY_SIZE = 128 + 1;
var GateDisplay = function (_a) {
    var lifecycle = _a.lifecycle, adapter = _a.adapter, values = _a.values;
    var inputHistory = new Float32Array(HISTORY_SIZE).fill(Number.MAX_VALUE);
    var outputHistory = new Float32Array(HISTORY_SIZE).fill(Number.MAX_VALUE);
    var envelopeHistory = new Float32Array(HISTORY_SIZE).fill(Number.MAX_VALUE);
    var writeIndex = 0;
    return (<div classList={className}>
            <canvas onInit={function (canvas) {
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                context.clearRect(0, 0, actualWidth, actualHeight);
                var lineWidth = 2.0 / devicePixelRatio;
                var normToY = function (normalized) {
                    return normalized === Number.NEGATIVE_INFINITY
                        ? actualHeight + devicePixelRatio
                        : actualHeight - actualHeight * normalized;
                };
                var dbToY = function (db) { return normToY(((db - DB_MIN) / (DB_MAX - DB_MIN))); };
                inputHistory[writeIndex] = dbToY(values[0]);
                outputHistory[writeIndex] = dbToY(values[1]);
                envelopeHistory[writeIndex] = dbToY(values[2]);
                writeIndex = (writeIndex + 1) % HISTORY_SIZE;
                var inputPath = new Path2D();
                var outputPath = new Path2D();
                var envelopePath = new Path2D();
                for (var i = 0; i < HISTORY_SIZE; i++) {
                    var bufferIndex = (writeIndex + i) % HISTORY_SIZE;
                    var x = (i / (HISTORY_SIZE - 1) * actualWidth);
                    var inputY = inputHistory[bufferIndex];
                    var outputY = outputHistory[bufferIndex];
                    var envelopeY = envelopeHistory[bufferIndex];
                    if (i === 0) {
                        inputPath.moveTo(x, inputY);
                        outputPath.moveTo(x, outputY);
                        envelopePath.moveTo(x, envelopeY);
                    }
                    else {
                        inputPath.lineTo(x, inputY);
                        outputPath.lineTo(x, outputY);
                        envelopePath.lineTo(x, envelopeY);
                    }
                }
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.4);
                context.lineWidth = lineWidth;
                context.stroke(inputPath);
                inputPath.lineTo(actualWidth, actualHeight);
                inputPath.lineTo(0, actualHeight);
                var gradient = context.createLinearGradient(0, 0, 0, actualHeight);
                gradient.addColorStop(0, DisplayPaint_1.DisplayPaint.strokeStyle(0.3));
                gradient.addColorStop(1, "transparent");
                context.fillStyle = gradient;
                context.fill(inputPath);
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(1.0);
                context.lineWidth = lineWidth;
                context.stroke(outputPath);
                outputPath.lineTo(actualWidth, actualHeight);
                outputPath.lineTo(0, actualHeight);
                context.fillStyle = gradient;
                context.fill(outputPath);
                var envelopeGradient = context.createLinearGradient(0, 0, 0, actualHeight * 2);
                envelopeGradient.addColorStop(0, "white");
                envelopeGradient.addColorStop(1, "transparent");
                context.strokeStyle = envelopeGradient;
                context.lineWidth = lineWidth;
                context.stroke(envelopePath);
                var threshold = adapter.namedParameter.threshold.getControlledValue();
                var returnValue = adapter.namedParameter.return.getControlledValue();
                var thresholdY = dbToY(threshold);
                var returnY = dbToY(threshold - returnValue);
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.5);
                context.lineWidth = lineWidth;
                context.beginPath();
                context.moveTo(0, thresholdY);
                context.lineTo(actualWidth, thresholdY);
                context.moveTo(0, returnY);
                context.lineTo(actualWidth, returnY);
                context.stroke();
                context.fillStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.03);
                context.fillRect(0, thresholdY, actualWidth, returnY - thresholdY);
            }));
            painter.requestUpdate();
            lifecycle.own(lib_dom_1.AnimationFrame.add(painter.requestUpdate));
        }}/>
            <svg>
                {[0, 12, 24, 36, 48, 60].map(function (db) {
            var normalized = (-db - DB_MIN) / (DB_MAX - DB_MIN);
            return <text x="2" y={"".concat(((1.0 - normalized) * 100), "%")} font-size="8" fill="rgba(255, 255, 255, 0.2)" dominant-baseline="middle">{db}</text>;
        })}
            </svg>
        </div>);
};
exports.GateDisplay = GateDisplay;
