"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueTooltip = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Surface_1 = require("@/ui/surface/Surface");
var ValueModifyStrategies_1 = require("@/ui/timeline/editors/value/ValueModifyStrategies");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ValueTooltip;
(function (ValueTooltip) {
    var stringMapping = lib_std_1.StringMapping.percent({ unit: "bend", bipolar: true, fractionDigits: 1 });
    ValueTooltip.install = function (_a) {
        var element = _a.element, capturing = _a.capturing, range = _a.range, valueAxis = _a.valueAxis, reader = _a.reader, context = _a.context, eventMapping = _a.eventMapping, modifyContext = _a.modifyContext;
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(element, "pointermove", function (_a) {
            var _b;
            var clientX = _a.clientX, clientY = _a.clientY, buttons = _a.buttons;
            if (buttons > 0) {
                return;
            }
            var target = capturing.capturePoint(clientX, clientY);
            if ((target === null || target === void 0 ? void 0 : target.type) === "event") {
                var event_1 = target.event;
                Surface_1.Surface.get(element).valueTooltip.show(function () {
                    var strategy = modifyContext.modifier;
                    var modifier = strategy.unwrapOrElse(ValueModifyStrategies_1.ValueModifyStrategy.Identity);
                    var clientRect = element.getBoundingClientRect();
                    var clientX = range.unitToX(modifier.readPosition(event_1) + reader.offset) + clientRect.left + 8;
                    var value = modifier.readValue(event_1);
                    var clientY = valueAxis.valueToAxis(value) + clientRect.top + 8;
                    return (__assign(__assign({}, context.stringMapping.x(context.valueMapping.y(eventMapping.x(value)))), { clientX: clientX, clientY: clientY }));
                });
            }
            else if ((target === null || target === void 0 ? void 0 : target.type) === "midpoint") {
                var event_2 = target.event;
                var nextEvent_1 = (_b = lib_dsp_1.ValueEvent.nextEvent(reader.content.events, event_2)) !== null && _b !== void 0 ? _b : event_2;
                Surface_1.Surface.get(element).valueTooltip.show(function () {
                    var strategy = modifyContext.modifier;
                    var modifier = strategy.unwrapOrElse(ValueModifyStrategies_1.ValueModifyStrategy.Identity);
                    var interpolation = modifier.readInterpolation(event_2);
                    var slope = interpolation.type !== "curve" ? 0.5 : interpolation.slope;
                    var midPosition = (modifier.readPosition(event_2) + modifier.readPosition(nextEvent_1)) * 0.5;
                    var y0 = valueAxis.valueToAxis(modifier.readValue(event_2));
                    var y1 = valueAxis.valueToAxis(modifier.readValue(nextEvent_1));
                    var midY = lib_std_1.Curve.normalizedAt(0.5, slope) * (y1 - y0) + y0;
                    var clientRect = element.getBoundingClientRect();
                    var clientX = range.unitToX(midPosition + reader.offset) + clientRect.left + 8;
                    var clientY = midY + clientRect.top + 8;
                    return (__assign(__assign({}, stringMapping.x(slope)), { clientX: clientX, clientY: clientY }));
                });
            }
            else {
                Surface_1.Surface.get(element).valueTooltip.hide();
            }
        }), lib_dom_1.Events.subscribe(element, "pointerleave", function () { return Surface_1.Surface.get(element).valueTooltip.hide(); }));
    };
})(ValueTooltip || (exports.ValueTooltip = ValueTooltip = {}));
