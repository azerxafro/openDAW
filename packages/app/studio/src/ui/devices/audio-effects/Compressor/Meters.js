"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meters = void 0;
var Meters_sass_inline_1 = require("./Meters.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var Vertical_1 = require("@/ui/devices/audio-effects/Compressor/Vertical");
var className = lib_dom_1.Html.adoptStyleSheet(Meters_sass_inline_1.default, "Meters");
var Meters = function (_a) {
    var lifecycle = _a.lifecycle, values = _a.values;
    var width = 36;
    var scale = Vertical_1.Vertical.scale, height = Vertical_1.Vertical.height, padding = Vertical_1.Vertical.padding, innerHeight = Vertical_1.Vertical.innerHeight;
    var meters = [
        <rect x="16" y="0" width="4" height={innerHeight * 2} fill="rgba(255, 255, 255, 0.2)" rx="1" ry="1"/>,
        <rect x="23" y="0" width="4" height={innerHeight} fill={studio_enums_1.Colors.orange} rx="1" ry="1"/>,
        <rect x="30" y="0" width="4" height={innerHeight * 2 / 3} fill="rgba(255, 255, 255, 0.2)" rx="1" ry="1"/>
    ];
    var setMeter = function (meter, top, bottom) {
        var min = Math.min(top, bottom);
        var max = Math.max(top, bottom);
        meter.y.baseVal.value = min;
        meter.height.baseVal.value = max - min;
    };
    lifecycle.own(lib_dom_1.AnimationFrame.add(function () {
        var inputDb = values[0], reductionDb = values[1], outputDb = values[2];
        setMeter(meters[0], innerHeight, (0, lib_std_1.clampUnit)(scale.unitToNorm(-inputDb)) * innerHeight);
        setMeter(meters[1], 0.0, (0, lib_std_1.clampUnit)(scale.unitToNorm(-reductionDb)) * innerHeight);
        setMeter(meters[2], innerHeight, (0, lib_std_1.clampUnit)(scale.unitToNorm(-outputDb)) * innerHeight);
    }));
    return (<svg classList={className} viewBox={"0 0 ".concat(width, " ").concat(height)} width={36} height={height}>
            <g transform={"translate(0, ".concat(padding, ")")}>
                {[0, 3, 6, 9, 12, 15, 18, 21, 24, 27].map(function (db) { return (<text x="0" y={(scale.unitToNorm(db) * innerHeight).toString()} font-size="8px" fill="rgba(255, 255, 255, 0.25)" alignment-baseline="middle">{db}</text>); })}
                <rect x="16" y="0" width="4" height={innerHeight} fill="rgba(0, 0, 0, 0.2)" rx="1" ry="1"/>
                <rect x="23" y="0" width="4" height={innerHeight} fill="rgba(0, 0, 0, 0.2)" rx="1" ry="1"/>
                <rect x="30" y="0" width="4" height={innerHeight} fill="rgba(0, 0, 0, 0.2)" rx="1" ry="1"/>
                {meters}
            </g>
        </svg>);
};
exports.Meters = Meters;
