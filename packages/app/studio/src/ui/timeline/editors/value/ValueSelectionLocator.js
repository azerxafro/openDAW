"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValueSelectionLocator = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var createValueSelectionLocator = function (reader, range, valueAxis, capturing) { return ({
    selectable: function () { return reader.hasContent
        ? reader.content.events.asArray()
        : lib_std_1.Iterables.empty(); },
    selectableAt: function (coordinates) {
        var x = range.unitToX(coordinates.u);
        var y = valueAxis.valueToAxis(coordinates.v);
        var capture = capturing.captureLocalPoint(x, y);
        return capture === null || capture.type === "loop-duration" ? lib_std_1.Iterables.empty() : [capture.event];
    },
    selectablesBetween: function (begin, end) {
        var offset = reader.offset;
        var from = Math.floor(begin.u) - offset;
        var to = Math.floor(end.u) - offset;
        var includesValue = function (_a) {
            var value = _a.value;
            return begin.v <= value && value <= end.v;
        };
        return reader.content.events.iterateRange(from, to, includesValue);
    }
}); };
exports.createValueSelectionLocator = createValueSelectionLocator;
