"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPitchSelectionLocator = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var createPitchSelectionLocator = function (owner, range, valueAxis, capturing) { return ({
    selectable: function () {
        return owner.hasContent ? owner.content.events.asArray() : lib_std_1.Iterables.empty();
    },
    selectableAt: function (_a) {
        var u = _a.u, v = _a.v;
        var capture = capturing.captureLocalPoint(range.unitToX(u), valueAxis.valueToAxis(v));
        return capture === null || capture.type === "loop-duration" ? lib_std_1.Iterables.empty() : [capture.event];
    },
    selectablesBetween: function (begin, end) {
        if (!owner.hasContent) {
            return lib_std_1.Iterables.empty();
        }
        var offset = owner.offset;
        var v0 = Math.ceil(begin.v);
        var v1 = Math.ceil(end.v);
        var u0 = begin.u - offset;
        var u1 = end.u - offset;
        var result = [];
        var events = owner.content.events;
        var array = events.asArray();
        var endIndex = events.ceilFirstIndex(u1);
        for (var i = 0; i < endIndex; i++) {
            var element = array[i];
            if (element.complete > u0 && element.pitch >= v0 && element.pitch <= v1) {
                result.push(element);
            }
        }
        return result;
    }
}); };
exports.createPitchSelectionLocator = createPitchSelectionLocator;
