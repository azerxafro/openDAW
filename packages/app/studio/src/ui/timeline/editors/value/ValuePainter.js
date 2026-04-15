"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValuePainter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var TimeGridRenderer_ts_1 = require("@/ui/timeline/editors/TimeGridRenderer.ts");
var Constants_ts_1 = require("@/ui/timeline/editors/value/Constants.ts");
var studio_core_1 = require("@opendaw/studio-core");
var createValuePainter = function (_a) {
    var range = _a.range, valueToPixel = _a.valueToPixel, eventMapping = _a.eventMapping, modifyContext = _a.modifyContext, snapping = _a.snapping, valueEditing = _a.valueEditing, reader = _a.reader;
    return function (painter) {
        var modifier = modifyContext.modifier;
        var context = painter.context;
        var _a = context.canvas, width = _a.width, height = _a.height;
        var _b = getComputedStyle(context.canvas), fontFamily = _b.fontFamily, fontSize = _b.fontSize;
        var em = Math.ceil(parseFloat(fontSize) * devicePixelRatio);
        context.save();
        context.textBaseline = "hanging";
        context.font = "".concat(em, "px ").concat(fontFamily);
        var y0 = Math.floor(valueToPixel(eventMapping.y(1.0)));
        var y1 = Math.floor(valueToPixel(eventMapping.y(0.0)));
        (0, TimeGridRenderer_ts_1.renderTimeGrid)(context, reader.timelineBoxAdapter.signatureTrack, range, snapping, y0, y1);
        var offset = reader.offset;
        // LOOP DURATION
        if (reader.canLoop) {
            var x0 = Math.floor(range.unitToX(offset) * devicePixelRatio);
            var x1 = Math.floor(range.unitToX(offset + modifier.match({
                none: function () { return reader.contentDuration; },
                some: function (strategy) { return strategy.readContentDuration(reader); }
            })) * devicePixelRatio);
            if (x0 > 0) {
                context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.30)");
                context.fillRect(x0, 0, devicePixelRatio, height);
            }
            if (x1 > 0) {
                context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.03)");
                context.fillRect(x0, 0, x1 - x0, height);
                context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.30)");
                context.fillRect(x1, 0, devicePixelRatio, height);
            }
        }
        // min/max dashed lines
        context.strokeStyle = "rgba(255, 255, 255, 0.25)";
        context.setLineDash([devicePixelRatio, devicePixelRatio * 2]);
        context.beginPath();
        context.moveTo(0, y0);
        context.lineTo(width, y0);
        var currentY = valueToPixel(valueEditing.currentValue);
        context.moveTo(0, currentY);
        context.lineTo(width, currentY);
        context.moveTo(0, y1);
        context.lineTo(width, y1);
        context.stroke();
        context.setLineDash(lib_std_1.Arrays.empty());
        context.lineWidth = devicePixelRatio;
        var contentColor = "hsl(".concat(reader.hue, ", ").concat(reader.mute ? 0 : 60, "%, 45%)");
        if (!reader.hasContent) {
            return;
        }
        var start = range.unitMin - range.unitPadding;
        var end = range.unitMax;
        var events = reader.content.events;
        var createIterator = modifier.match({
            none: function () { return function () { return lib_dsp_1.ValueEvent.iterateWindow(events, start - offset, end - offset); }; },
            some: function (strategy) {
                var snapValue = strategy.snapValue();
                if (snapValue.nonEmpty()) {
                    var y = valueToPixel(snapValue.unwrap());
                    context.strokeStyle = "rgba(255, 255, 255, 0.25)";
                    context.setLineDash([devicePixelRatio, devicePixelRatio * 4]);
                    context.beginPath();
                    context.moveTo(0, y);
                    context.lineTo(width, y);
                    context.stroke();
                    context.setLineDash(lib_std_1.Arrays.empty());
                }
                return function () { return strategy.iterator(start - offset, end - offset); };
            }
        });
        studio_core_1.ValueStreamRenderer.render(context, range, createIterator(), valueToPixel, contentColor, 0.04, valueEditing.anchorModel.getValue(), {
            index: 0,
            rawStart: offset,
            rawEnd: offset + reader.loopDuration,
            regionStart: Math.max(offset, reader.position),
            regionEnd: Math.min(offset + reader.loopDuration, reader.complete),
            resultStart: start,
            resultEnd: end,
            resultStartValue: 0.0,
            resultEndValue: 1.0
        });
        var prevEvent = null;
        for (var _i = 0, _c = createIterator(); _i < _c.length; _i++) {
            var event_1 = _c[_i];
            if ((0, lib_std_1.isNotNull)(prevEvent) && prevEvent.interpolation.type !== "none") {
                var slope = prevEvent.interpolation.type === "curve" ? prevEvent.interpolation.slope : 0.5;
                var midX = range.unitToX(offset + (prevEvent.position + event_1.position) * 0.5) * devicePixelRatio;
                var y0_1 = valueToPixel(prevEvent.value);
                var y1_1 = valueToPixel(event_1.value);
                var midY = lib_std_1.Curve.normalizedAt(0.5, slope) * (y1_1 - y0_1) + y0_1;
                context.fillStyle = contentColor;
                context.beginPath();
                context.arc(midX, midY, Constants_ts_1.MidPointRadius * devicePixelRatio, 0.0, lib_std_1.TAU);
                context.fill();
            }
            // Draw event circle
            context.fillStyle = event_1.isSelected ? "white" : contentColor;
            var x = range.unitToX(offset + event_1.position) * devicePixelRatio;
            var y = valueToPixel(event_1.value);
            context.beginPath();
            context.arc(x, y, Constants_ts_1.EventRadius * devicePixelRatio, 0.0, lib_std_1.TAU);
            context.fill();
            prevEvent = event_1;
        }
    };
};
exports.createValuePainter = createValuePainter;
