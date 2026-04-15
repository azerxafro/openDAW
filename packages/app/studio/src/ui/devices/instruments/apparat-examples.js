"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApparatExamples = void 0;
var simple_sine_js_raw_1 = require("./examples/simple-sine.js?raw");
var grain_synth_js_raw_1 = require("./examples/grain-synth.js?raw");
var tb_303_js_raw_1 = require("./examples/tb-303.js?raw");
var deminix_js_raw_1 = require("./examples/deminix.js?raw");
exports.ApparatExamples = [
    { name: "Simple Sine Synth", code: simple_sine_js_raw_1.default },
    { name: "Grain Synthesizer", code: grain_synth_js_raw_1.default },
    { name: "TB-303 Bass Line", code: tb_303_js_raw_1.default },
    { name: "Deminix Random Synth", code: deminix_js_raw_1.default }
];
