"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertySelectionLocator = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies_ts_1 = require("@/ui/timeline/editors/notes/NoteModifyStrategies.ts");
var createPropertySelectionLocator = function (owner, range, valueAxis, propertyOwner, capturing) { return ({
    selectable: function () {
        return owner.hasContent ? owner.content.events.asArray() : lib_std_1.Iterables.empty();
    },
    selectableAt: function (_a) {
        var u = _a.u, v = _a.v;
        var capture = capturing.captureLocalPoint(range.unitToX(u), valueAxis.valueToAxis(v));
        return capture === null ? lib_std_1.Iterables.empty() : lib_std_1.Iterables.one(capture);
    },
    selectablesBetween: function (begin, end) {
        if (!owner.hasContent) {
            return lib_std_1.Iterables.empty();
        }
        var offset = owner.offset;
        var v0 = begin.v;
        var v1 = end.v;
        var u0 = begin.u - offset;
        var u1 = end.u - offset;
        var result = [];
        var propertyAccessor = propertyOwner.getValue();
        for (var _i = 0, _a = owner.content.events.iterateRange(u0, u1); _i < _a.length; _i++) {
            var event_1 = _a[_i];
            var value = propertyAccessor.valueMapping.x(propertyAccessor.readValue(NoteModifyStrategies_ts_1.NoteModifyStrategy.Identity, event_1));
            if (lib_std_1.Intervals.intersect1D(event_1.position, event_1.position, u0, u1)
                && lib_std_1.Intervals.intersect1D(value, value, v0, v1)) {
                result.push(event_1);
            }
        }
        return result;
    }
}); };
exports.createPropertySelectionLocator = createPropertySelectionLocator;
