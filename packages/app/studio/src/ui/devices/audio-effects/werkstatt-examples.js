"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WerkstattExamples = void 0;
var hard_clipper_js_raw_1 = require("./examples/hard-clipper.js?raw");
var ring_modulator_js_raw_1 = require("./examples/ring-modulator.js?raw");
var simple_delay_js_raw_1 = require("./examples/simple-delay.js?raw");
var biquad_lowpass_js_raw_1 = require("./examples/biquad-lowpass.js?raw");
var alienator_js_raw_1 = require("./examples/alienator.js?raw");
var beautifier_js_raw_1 = require("./examples/beautifier.js?raw");
exports.WerkstattExamples = [
    { name: "Hard Clipper", code: hard_clipper_js_raw_1.default },
    { name: "Ring Modulator", code: ring_modulator_js_raw_1.default },
    { name: "Simple Delay", code: simple_delay_js_raw_1.default },
    { name: "Biquad Lowpass", code: biquad_lowpass_js_raw_1.default },
    { name: "Alienator", code: alienator_js_raw_1.default },
    { name: "Beautifier", code: beautifier_js_raw_1.default }
];
