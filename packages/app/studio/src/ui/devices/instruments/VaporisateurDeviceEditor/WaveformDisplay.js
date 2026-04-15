"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveformDisplay = void 0;
var Display_sass_inline_1 = require("./Display.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var className = lib_dom_1.Html.adoptStyleSheet(Display_sass_inline_1.default, "Display");
var WaveformDisplay = function (_a) {
    var lifecycle = _a.lifecycle, adapter = _a.adapter;
    return (<canvas className={className} onInit={function (canvas) {
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                var padding = devicePixelRatio * 2;
                var top = padding;
                var bottom = actualHeight - padding;
                var valueToY = function (value) { return bottom + (top - bottom) * (0.5 * (value + 1.0)); };
                var centerY = valueToY(0.0);
                var fx = adapter.getValue();
                context.lineWidth = devicePixelRatio;
                var path = new Path2D();
                path.moveTo(0, valueToY(fx(0)));
                for (var x = 1; x <= actualWidth; x++) {
                    path.lineTo(x, valueToY(fx(x / actualWidth)));
                }
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.75);
                context.stroke(path);
                path.lineTo(actualWidth, centerY);
                path.lineTo(0, centerY);
                var gradient = context.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.2));
                gradient.addColorStop(0.5, DisplayPaint_1.DisplayPaint.strokeStyle(0.0));
                gradient.addColorStop(1.0, DisplayPaint_1.DisplayPaint.strokeStyle(0.2));
                context.fillStyle = gradient;
                context.fill(path);
                context.beginPath();
                context.moveTo(0, centerY);
                context.lineTo(actualWidth, centerY);
                context.strokeStyle = "hsla(200, 83%, 60%, 0.25)";
                context.stroke();
            }));
            lifecycle.own(adapter.catchupAndSubscribe(painter.requestUpdate));
        }}/>);
};
exports.WaveformDisplay = WaveformDisplay;
