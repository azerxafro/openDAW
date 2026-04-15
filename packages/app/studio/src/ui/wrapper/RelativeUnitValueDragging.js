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
exports.RelativeUnitValueDragging = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var dragging_1 = require("@/ui/hooks/dragging");
var FloatingTextInput_tsx_1 = require("@/ui/components/FloatingTextInput.tsx");
var ValueTooltip_tsx_1 = require("@/ui/surface/ValueTooltip.tsx");
var Surface_1 = require("../surface/Surface");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_core_1 = require("@opendaw/studio-core");
var lookForSolidElement = function (element) {
    var elem = element;
    while (getComputedStyle(elem).display === "contents") {
        elem = elem.firstElementChild;
        if (elem === null) {
            return (0, lib_std_1.panic)("Illegal State. No solid element found.");
        }
    }
    return elem;
};
var RelativeUnitValueDragging = function (_a, children) {
    var lifecycle = _a.lifecycle, editing = _a.editing, parameter = _a.parameter, supressValueFlyout = _a.supressValueFlyout, options = _a.options;
    var element = (<lib_jsx_1.Group>{children}</lib_jsx_1.Group>);
    lifecycle.ownAll(lib_dom_1.Events.subscribeDblDwn(element, function () {
        var solid = lookForSolidElement(element);
        var rect = solid.getBoundingClientRect();
        var printValue = parameter.getPrintValue();
        var resolvers = Promise.withResolvers();
        resolvers.promise.then(function (value) {
            var withUnit = lib_std_1.Strings.endsWithDigit(value) ? "".concat(value).concat(printValue.unit) : value;
            editing.modify(function () { return parameter.setPrintValue(withUnit); });
            editing.mark();
        }, lib_std_1.EmptyExec);
        Surface_1.Surface.get(element).flyout.appendChild(<FloatingTextInput_tsx_1.FloatingTextInput position={{ x: rect.left, y: rect.top + (rect.height >> 1) }} value={printValue.value} unit={printValue.unit} numeric resolvers={resolvers}/>);
    }), supressValueFlyout === true ? lib_std_1.Terminable.Empty : ValueTooltip_tsx_1.ValueTooltip.default(element, function () {
        var clientRect = lookForSolidElement(element).getBoundingClientRect();
        return (__assign({ clientX: clientRect.left + 8, clientY: clientRect.top + clientRect.height + 8 }, parameter.getPrintValue()));
    }), dragging_1.ValueDragging.installUnitValueRelativeDragging(function (_event) { return lib_std_1.Option.wrap({
        start: function () {
            element.classList.add("modifying");
            return parameter.getUnitValue();
        },
        modify: function (value) { return editing.modify(function () { return parameter.setUnitValue(value); }, false); },
        cancel: function (prevValue) { return editing.modify(function () { return parameter.setUnitValue(prevValue); }, false); },
        finalise: function (_prevValue, _newValue) { return editing.mark(); },
        finally: function () { return element.classList.remove("modifying"); }
    }); }, element, options), studio_core_1.StudioPreferences.catchupAndSubscribe((function () {
        var terminator = lifecycle.own(new lib_std_1.Terminator());
        return function (enabled) {
            terminator.terminate();
            if (!enabled) {
                return;
            }
            var value = null;
            var debounceApprove = lib_runtime_1.Runtime.debounce(function () {
                value = null;
                editing.mark();
            });
            terminator.own(lib_dom_1.Events.subscribe(element, "wheel", function (event) {
                value !== null && value !== void 0 ? value : (value = parameter.getUnitValue());
                var ratio = parameter.valueMapping.floating() ? 0.008 : 0.01;
                value = (0, lib_std_1.clampUnit)(value - Math.sign(event.deltaY) * ratio);
                editing.modify(function () { return parameter.setUnitValue(value); }, false);
                debounceApprove();
                event.preventDefault();
                event.stopImmediatePropagation();
            }));
        };
    })(), "pointer", "modifying-controls-wheel"));
    return element;
};
exports.RelativeUnitValueDragging = RelativeUnitValueDragging;
