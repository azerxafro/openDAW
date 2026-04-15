"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertyCapturing = void 0;
var Constants_ts_1 = require("@/ui/timeline/editors/notes/Constants.ts");
var NoteModifyStrategies_ts_1 = require("@/ui/timeline/editors/notes/NoteModifyStrategies.ts");
var createPropertyCapturing = function (valueAxis, range, propertyOwner, owner) { return ({
    capture: function (x, y) {
        var _a;
        var offset = owner.offset;
        var local = Math.floor(range.xToUnit(x)) - offset;
        var propertyAccessor = propertyOwner.getValue();
        var iterator = owner.content.events
            .iterateRange(local - range.unitsPerPixel * Constants_ts_1.EventRadius, local + range.unitsPerPixel * Constants_ts_1.EventRadius);
        var closest = null;
        for (var _i = 0, iterator_1 = iterator; _i < iterator_1.length; _i++) {
            var event_1 = iterator_1[_i];
            var value = propertyAccessor.valueMapping.x(propertyAccessor.readValue(NoteModifyStrategies_ts_1.NoteModifyStrategy.Identity, event_1));
            var dx = x - range.unitToX(event_1.position + offset) - 1; // value node is rendered one pixel off
            var dy = y - valueAxis.valueToAxis(value);
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= Constants_ts_1.EventRadius) {
                if (event_1.isSelected) {
                    return event_1;
                }
                if (closest === null) {
                    closest = { event: event_1, distance: distance };
                }
                else if (closest.distance < distance) {
                    closest.event = event_1;
                    closest.distance = distance;
                }
            }
        }
        return (_a = closest === null || closest === void 0 ? void 0 : closest.event) !== null && _a !== void 0 ? _a : null;
    }
}); };
exports.createPropertyCapturing = createPropertyCapturing;
