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
exports.VolumeSlider = exports.MaximizerVolumeMarkers = exports.DefaultVolumeMarkers = void 0;
var VolumeSlider_sass_inline_1 = require("./VolumeSlider.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var dragging_ts_1 = require("@/ui/hooks/dragging.ts");
var ValueTooltip_tsx_1 = require("@/ui/surface/ValueTooltip.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var Surface_1 = require("@/ui/surface/Surface");
var FloatingTextInput_1 = require("@/ui/components/FloatingTextInput");
var studio_core_1 = require("@opendaw/studio-core");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var className = lib_dom_1.Html.adoptStyleSheet(VolumeSlider_sass_inline_1.default, "vertical-slider");
exports.DefaultVolumeMarkers = [
    { length: 1 /* MarkerLength.Long */, decibel: +6.0 },
    { length: 0 /* MarkerLength.Short */, decibel: +5.0 },
    { length: 0 /* MarkerLength.Short */, decibel: +4.0 },
    { length: 1 /* MarkerLength.Long */, decibel: +3.0 },
    { length: 0 /* MarkerLength.Short */, decibel: +2.0 },
    { length: 0 /* MarkerLength.Short */, decibel: +1.0 },
    { length: 1 /* MarkerLength.Long */, decibel: +0.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -1.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -2.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -3.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -4.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -5.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -6.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -7.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -8.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -9.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -10.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -11.25 },
    { length: 0 /* MarkerLength.Short */, decibel: -12.5 },
    { length: 0 /* MarkerLength.Short */, decibel: -13.5 },
    { length: 1 /* MarkerLength.Long */, decibel: -15.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -16.5 },
    { length: 0 /* MarkerLength.Short */, decibel: -17.75 },
    { length: 0 /* MarkerLength.Short */, decibel: -19.5 },
    { length: 1 /* MarkerLength.Long */, decibel: -21.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -23.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -25.5 },
    { length: 0 /* MarkerLength.Short */, decibel: -28.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -30.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -34.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -39.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -44.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -50.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -56.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -63.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -72.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -84.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -96.0 }
];
exports.MaximizerVolumeMarkers = [
    { length: 1 /* MarkerLength.Long */, decibel: +3.0 },
    { length: 0 /* MarkerLength.Short */, decibel: +2.0 },
    { length: 0 /* MarkerLength.Short */, decibel: +1.0 },
    { length: 1 /* MarkerLength.Long */, decibel: +0.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -1.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -2.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -3.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -4.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -5.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -6.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -7.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -8.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -9.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -10.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -11.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -12.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -13.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -14.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -15.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -16.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -17.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -18.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -19.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -20.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -21.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -22.0 },
    { length: 0 /* MarkerLength.Short */, decibel: -23.0 },
    { length: 1 /* MarkerLength.Long */, decibel: -24.0 }
];
var VolumeSlider = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, parameter = _a.parameter, _b = _a.markers, markers = _b === void 0 ? exports.DefaultVolumeMarkers : _b;
    var strokeWidth = 1.0 / devicePixelRatio;
    var guide = (<rect width="0.125em" rx="0.0625em" ry="0.0625em" stroke="none" fill="rgba(0, 0, 0, 0.25)"/>);
    var linesLeft = markers.map(function (_a) {
        var length = _a.length, decibel = _a.decibel;
        var y = "".concat((1.0 - parameter.valueMapping.x(decibel)) * 100.0, "%");
        return <line x1={length === 1 /* MarkerLength.Long */ ? 0 : "25%"} y1={y} y2={y} stroke={decibel === 0 && studio_enums_1.Colors.green}/>;
    });
    var linesRight = markers.map(function (_a) {
        var decibel = _a.decibel;
        var y = "".concat((1.0 - parameter.valueMapping.x(decibel)) * 100.0, "%");
        return <line x1="50%" y1={y} y2={y} stroke={decibel === 0 && studio_enums_1.Colors.green}/>;
    });
    var lineContainer = <svg y="1em" overflow="visible" stroke="rgba(255,255,255,0.16)" shape-rendering="crispEdges">{linesLeft}{linesRight}</svg>;
    var svg = (<svg viewBox="0 0 0 0">{guide}{lineContainer}</svg>);
    var thumb = (<div className="thumb"/>);
    var wrapper = (<div className={className} data-class="vertical-slider">{svg}{thumb}</div>);
    var dragLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.ownAll(lib_dom_1.Html.watchResize(wrapper, function () {
        if (!wrapper.isConnected) {
            return;
        }
        var clientWidth = wrapper.clientWidth, clientHeight = wrapper.clientHeight;
        if (clientWidth === 0 || clientHeight === 0) {
            return;
        }
        lineContainer.setAttribute("stroke-width", String(strokeWidth));
        var rect = svg.viewBox.baseVal;
        rect.width = clientWidth;
        rect.height = clientHeight;
        var em = parseFloat(getComputedStyle(wrapper).fontSize);
        guide.x.baseVal.value = lib_dom_1.CssUtils.calc("50% - 0.0625em", clientWidth, em);
        guide.y.baseVal.value = lib_dom_1.CssUtils.calc("1em - 1px", clientHeight, em);
        guide.height.baseVal.value = lib_dom_1.CssUtils.calc("100% - 2em + 1.5px", clientHeight, em);
        var leftX2 = lib_dom_1.CssUtils.calc("50% - 0.0625em - 1px", clientWidth, em);
        var rightX1 = lib_dom_1.CssUtils.calc("50% + 0.0625em + 1px", clientWidth, em);
        linesLeft.forEach(function (line) { line.x2.baseVal.value = leftX2; });
        linesRight.forEach(function (line, index) {
            line.x1.baseVal.value = rightX1;
            line.x2.baseVal.value = markers[index].length === 1 /* MarkerLength.Long */
                ? clientWidth
                : lib_dom_1.CssUtils.calc("75%", clientWidth, em);
        });
        lineContainer.height.baseVal.value = lib_dom_1.CssUtils.calc("100% - 2em", clientHeight, em);
        // attach a new dragging function with updated options
        //
        var snapLength = 8;
        var guideBounds = guide.getBoundingClientRect();
        var trackLength = guideBounds.height;
        dragLifecycle.terminate();
        dragLifecycle.own(dragging_ts_1.ValueDragging.installUnitValueRelativeDragging(function (event) { return lib_std_1.Option.wrap({
            start: function () {
                if (event.target === thumb) {
                    return parameter.getUnitValue();
                }
                else {
                    var newValue_1 = 1.0 - (event.clientY - guideBounds.top) / guideBounds.height;
                    editing.modify(function () { return parameter.setUnitValue(newValue_1); }, false);
                    return newValue_1;
                }
            },
            modify: function (value) { return editing.modify(function () { return parameter.setUnitValue(value); }, false); },
            cancel: function (prevValue) { return editing.modify(function () { return parameter.setUnitValue(prevValue); }, false); },
            finalise: function (_prevValue, _newValue) { return editing.mark(); },
            finally: function () { }
        }); }, wrapper, {
            trackLength: trackLength - snapLength,
            snap: { snapLength: snapLength, threshold: parameter.valueMapping.x(0.0) },
            ratio: 1.0
        }));
    }));
    var observer = function (parameter) {
        return wrapper.style.setProperty("--value", parameter.getControlledUnitValue().toString());
    };
    lifecycle.ownAll(parameter.subscribe(observer), ValueTooltip_tsx_1.ValueTooltip.default(wrapper, function () {
        var clientRect = thumb.getBoundingClientRect();
        return (__assign({ clientX: clientRect.left + clientRect.width + 8, clientY: clientRect.top + clientRect.height + 8 }, parameter.getPrintValue()));
    }), lib_dom_1.Events.subscribeDblDwn(thumb, function () {
        var rect = thumb.getBoundingClientRect();
        var printValue = parameter.getPrintValue();
        var resolvers = Promise.withResolvers();
        resolvers.promise.then(function (value) {
            var withUnit = lib_std_1.Strings.endsWithDigit(value) ? "".concat(value).concat(printValue.unit) : value;
            editing.modify(function () { return parameter.setPrintValue(withUnit); });
            editing.mark();
        }, lib_std_1.EmptyExec);
        Surface_1.Surface.get(thumb).flyout.appendChild(<FloatingTextInput_1.FloatingTextInput position={{ x: rect.left, y: rect.top + (rect.height >> 1) }} value={printValue.value} unit={printValue.unit} numeric resolvers={resolvers}/>);
    }), studio_core_1.StudioPreferences.catchupAndSubscribe((function () {
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
            terminator.own(lib_dom_1.Events.subscribe(wrapper, "wheel", function (event) {
                var ratio = 0.005;
                value !== null && value !== void 0 ? value : (value = parameter.getUnitValue());
                value = (0, lib_std_1.clampUnit)(value - Math.sign(event.deltaY) * ratio);
                editing.modify(function () { return parameter.setUnitValue(value); }, false);
                debounceApprove();
                event.preventDefault();
                event.stopImmediatePropagation();
            }));
        };
    })(), "pointer", "modifying-controls-wheel"));
    observer(parameter);
    return wrapper;
};
exports.VolumeSlider = VolumeSlider;
