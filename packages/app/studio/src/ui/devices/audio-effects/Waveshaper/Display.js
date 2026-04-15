"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
var Display_sass_inline_1 = require("./Display.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_enums_1 = require("@opendaw/studio-enums");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var studio_core_1 = require("@opendaw/studio-core");
var DropDown_tsx_1 = require("@/ui/composite/DropDown.tsx");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var className = lib_dom_1.Html.adoptStyleSheet(Display_sass_inline_1.default, "Display");
var Display = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, adapter = _a.adapter;
    var inputGain = adapter.namedParameter.inputGain;
    var equation = adapter.box.equation;
    return (<div className={className}>
            <div className="equation-select">
                <DropDown_tsx_1.DropDown lifecycle={lifecycle} owner={EditWrapper_1.EditWrapper.forValue(editing, equation)} provider={function () { return lib_dsp_1.Waveshaper.Equations; }} appearance={{
            framed: true, landscape: true,
            color: studio_enums_1.Colors.dark,
            activeColor: studio_enums_1.Colors.white
        }} mapping={function (value) { return value.toUpperCase(); }} width="72px"/>
            </div>
            <canvas onInit={function (canvas) {
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var devicePixelRatio = painter.devicePixelRatio, context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight;
                var range = 1.5;
                var inputGainValue = (0, lib_dsp_1.dbToGain)(inputGain.getControlledValue());
                var equation = (adapter.box.equation.getValue());
                var toX = function (value) { return ((value + range) / (2.0 * range)) * actualWidth; };
                var toY = function (value) { return ((range - value) / (2.0 * range)) * actualHeight; };
                context.save();
                var dash = 2 * devicePixelRatio;
                context.setLineDash([dash, dash]);
                context.lineWidth = devicePixelRatio;
                context.beginPath();
                context.moveTo(toX(0), 0);
                context.lineTo(toX(0), actualHeight);
                context.moveTo(0, toY(0));
                context.lineTo(actualWidth, toY(0));
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.25);
                context.stroke();
                context.beginPath();
                context.moveTo(toX(-range), toY(-range));
                context.lineTo(toX(range), toY(range));
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.25);
                context.stroke();
                var steps = actualWidth;
                var zeroY = toY(0);
                var path = new Path2D();
                context.setLineDash(lib_std_1.Arrays.empty());
                context.lineWidth = devicePixelRatio;
                path.moveTo(toX(-range), toY(lib_dsp_1.Waveshaper.apply(-range * inputGainValue, equation)));
                for (var px = 1; px <= steps; px++) {
                    var x = -range + (px / steps) * 2.0 * range;
                    path.lineTo(toX(x), toY(lib_dsp_1.Waveshaper.apply(x * inputGainValue, equation)));
                }
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.75);
                context.stroke(path);
                path.lineTo(toX(range), zeroY);
                path.lineTo(toX(-range), zeroY);
                var gradient = context.createLinearGradient(0, toY(1), 0, toY(-1));
                gradient.addColorStop(0, DisplayPaint_1.DisplayPaint.strokeStyle(0.0));
                gradient.addColorStop(0.5, DisplayPaint_1.DisplayPaint.strokeStyle(0.12));
                gradient.addColorStop(1, DisplayPaint_1.DisplayPaint.strokeStyle(0.0));
                context.fillStyle = gradient;
                context.fill(path);
                context.restore();
            }));
            lifecycle.ownAll(inputGain.catchupAndSubscribe(function () { return painter.requestUpdate(); }), adapter.box.equation.catchupAndSubscribe(function () { return painter.requestUpdate(); }));
        }}/>
        </div>);
};
exports.Display = Display;
