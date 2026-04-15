"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValueGuide = exports.decibelValueGuide = exports.horizontalUnits = exports.verticalUnits = exports.biquad = exports.ColorSets = exports.curveSampleRate = exports.symbols = exports.yAxis = exports.xAxis = exports.ems = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
exports.ems = [7 / 6, 7 / 6, 7 / 6];
exports.xAxis = new studio_core_1.LogScale(20.0, 20000);
exports.yAxis = new studio_core_1.LinearScale(-27, +27);
exports.symbols = [
    studio_enums_1.IconSymbol.HighPass, studio_enums_1.IconSymbol.LowShelf,
    studio_enums_1.IconSymbol.Peak, studio_enums_1.IconSymbol.Peak, studio_enums_1.IconSymbol.Peak,
    studio_enums_1.IconSymbol.HighShelf, studio_enums_1.IconSymbol.LowPass
];
// Must be at least twice the highest frequency (nyquist), but the higher, the smoother the response.
// Although at some point, we might run into float precision issues.
exports.curveSampleRate = 96000;
var hue = lib_std_1.ValueMapping.linear(10.0, 330.0);
exports.ColorSets = lib_std_1.Arrays.create(function (index) {
    var color = new lib_std_1.Color(hue.y(index / 7), 90, 66);
    return {
        full: color,
        line: color.opacity(0.08),
        min: color.opacity(0.01),
        max: color.opacity(0.30)
    };
}, 7);
exports.biquad = new lib_dsp_1.BiquadCoeff();
exports.verticalUnits = [
    20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000
];
exports.horizontalUnits = [-24, -18, -12, -6, 0, 6, 12, 18, 24];
exports.decibelValueGuide = {
    snap: {
        snapLength: 8,
        threshold: 0.5
    }
};
exports.orderValueGuide = {
    trackLength: 32
};
