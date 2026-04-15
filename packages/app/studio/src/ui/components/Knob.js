"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knob = exports.TinyDesign = exports.DefaultDesign = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Knob_sass_inline_1 = require("./Knob.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Knob_sass_inline_1.default, "knob");
exports.DefaultDesign = Object.freeze({
    radius: 20,
    trackWidth: 1.5,
    angleOffset: Math.PI / 5.0,
    indicator: [0.3, 0.6],
    indicatorWidth: 2.5
});
exports.TinyDesign = Object.freeze({
    radius: 20,
    trackWidth: 1.5,
    angleOffset: Math.PI / 5.0,
    indicator: [0.2, 0.66],
    indicatorWidth: 2.5
});
var Knob = function (_a) {
    var lifecycle = _a.lifecycle, value = _a.value, anchor = _a.anchor, color = _a.color, design = _a.design;
    var _b = design !== null && design !== void 0 ? design : exports.DefaultDesign, radius = _b.radius, trackWidth = _b.trackWidth, angleOffset = _b.angleOffset, _c = _b.indicator, min = _c[0], max = _c[1], indicatorWidth = _b.indicatorWidth;
    var trackRadius = Math.floor(radius - trackWidth * 0.5);
    var angleMin = lib_std_1.PI_HALF + angleOffset;
    var angleMax = lib_std_1.PI_HALF - angleOffset;
    var angleRange = (lib_std_1.TAU - angleOffset * 2.0);
    var angleAnc = angleMin + anchor * angleRange;
    var width = radius * 2.0;
    var height = radius + Math.ceil(Math.cos(angleOffset) * radius);
    var paths = [
        <path d=""/>,
        <path d="" stroke-linecap="round" stroke-width={indicatorWidth} stroke="rgba(0,0,0,0.5)"/>
    ];
    var update = function (unitValue) {
        var angleVal = angleMin + unitValue * angleRange;
        var aMinValAnc = Math.min(angleVal, angleAnc);
        var aMaxValAnc = Math.max(angleVal, angleAnc);
        var value = paths[0], line = paths[1];
        value.setAttribute("d", lib_dom_1.Svg.pathBuilder()
            .circleSegment(0, 0, trackRadius, aMinValAnc - 1.0 / trackRadius, aMaxValAnc + 1.0 / trackRadius)
            .get());
        var cos = Math.cos(angleVal) * trackRadius;
        var sin = Math.sin(angleVal) * trackRadius;
        line.setAttribute("d", lib_dom_1.Svg.pathBuilder()
            .moveTo(cos * min, sin * min)
            .lineTo(cos * max, sin * max)
            .get());
    };
    var svg = (<svg viewBox={"0 0 ".concat(width, " ").concat(height)} classList={className}>
            <defs>
                <linearGradient id="knob-rim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="white"/>
                    <stop offset="100%" stop-color="black"/>
                </linearGradient>
            </defs>
            <g fill="none" stroke="currentColor" stroke-linecap="butt" stroke-width={trackWidth} transform={"translate(".concat(radius, ", ").concat(radius, ")")}>
                <circle r={radius * max * 1.1} stroke="none" fill="black" classList="shadow" cy={radius * 0.1}/>
                <circle r={radius * max} stroke="none" fill="currentColor"/>
                <circle r={radius * max} stroke="url(#knob-rim)" stroke-opacity="0.5" fill="none"/>
                <path stroke="currentColor" stroke-opacity={1 / 3} d={lib_dom_1.Svg.pathBuilder()
            .circleSegment(0, 0, trackRadius, angleMin, angleMax)
            .get()}/>
                {paths}
            </g>
        </svg>);
    if ((0, lib_std_1.isDefined)(color)) {
        svg.style.color = color.toString();
    }
    lifecycle.own(value.subscribe(function (model) { return update(model.getControlledUnitValue()); }));
    update(value.getControlledUnitValue());
    return svg;
};
exports.Knob = Knob;
