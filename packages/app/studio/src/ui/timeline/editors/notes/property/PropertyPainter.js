"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertyPainter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Constants_ts_1 = require("@/ui/timeline/editors/notes/Constants.ts");
var TimeGridRenderer_ts_1 = require("@/ui/timeline/editors/TimeGridRenderer.ts");
var NoteModifyStrategies_ts_1 = require("@/ui/timeline/editors/notes/NoteModifyStrategies.ts");
var createPropertyPainter = function (_a) {
    var range = _a.range, valueAxis = _a.valueAxis, propertyOwner = _a.propertyOwner, snapping = _a.snapping, modifyContext = _a.modifyContext, reader = _a.reader;
    return function (painter) {
        var context = painter.context;
        (0, TimeGridRenderer_ts_1.renderTimeGrid)(context, reader.timelineBoxAdapter.signatureTrack, range, snapping, Math.floor(valueAxis.valueToAxis(1.0) * devicePixelRatio), Math.floor(valueAxis.valueToAxis(0.0) * devicePixelRatio));
        var offset = reader.offset, hue = reader.hue, events = reader.content.events;
        var unitMin = range.unitMin - offset - range.unitPadding;
        var unitMax = range.unitMax - offset;
        var propertyAccessor = propertyOwner.getValue();
        var valueMapping = propertyAccessor.valueMapping, anchor = propertyAccessor.anchor;
        var modifier = modifyContext.modifier;
        var strategies = modifier.unwrapOrElse(NoteModifyStrategies_ts_1.NoteModifyStrategies.Identity);
        var anchorY = Math.floor(valueAxis.valueToAxis(anchor) * devicePixelRatio);
        if (anchor !== 0.0) {
            context.beginPath();
            context.setLineDash([4, 2]);
            context.strokeStyle = "hsla(".concat(hue, ", 50%, 50%, 0.25)");
            context.moveTo(0, anchorY);
            context.lineTo(painter.actualWidth, anchorY);
            context.stroke();
            context.setLineDash(lib_std_1.Arrays.empty());
        }
        strategies.showPropertyLine()
            .ifSome(function (_a) {
            var _b = _a[0], u0 = _b.u, v0 = _b.v, _c = _a[1], u1 = _c.u, v1 = _c.v;
            var x0 = range.unitToX(u0) * devicePixelRatio;
            var x1 = range.unitToX(u1) * devicePixelRatio;
            var y0 = valueAxis.valueToAxis(v0) * devicePixelRatio;
            var y1 = valueAxis.valueToAxis(v1) * devicePixelRatio;
            context.beginPath();
            context.strokeStyle = "white";
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.stroke();
        });
        var render = function (strategy, filterSelected) {
            for (var _i = 0, _a = events.iterateRange(unitMin, unitMax); _i < _a.length; _i++) {
                var event_1 = _a[_i];
                if (event_1.isSelected === filterSelected) {
                    continue;
                }
                var position = strategy.readPosition(event_1);
                var value = propertyAccessor.readValue(strategy, event_1);
                var x = Math.floor(range.unitToX(position + offset) * devicePixelRatio);
                var y = Math.floor(valueAxis.valueToAxis(valueMapping.x(value)) * devicePixelRatio);
                context.fillRect(x, y - devicePixelRatio * 2, Constants_ts_1.PropertyNodeSize * devicePixelRatio, Constants_ts_1.PropertyNodeSize * devicePixelRatio);
                context.fillRect(x, Math.min(y, anchorY), devicePixelRatio, Math.abs(y - anchorY));
            }
        };
        context.fillStyle = "hsl(".concat(hue, ", 50%, 50%)");
        render(strategies.unselectedModifyStrategy(), true);
        context.fillStyle = "white";
        render(strategies.selectedModifyStrategy(), false);
    };
};
exports.createPropertyPainter = createPropertyPainter;
