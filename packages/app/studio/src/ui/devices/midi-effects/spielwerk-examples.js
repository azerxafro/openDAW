"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpielwerkExamples = void 0;
var chord_generator_js_raw_1 = require("./examples/chord-generator.js?raw");
var velocity_js_raw_1 = require("./examples/velocity.js?raw");
var pitch_js_raw_1 = require("./examples/pitch.js?raw");
var random_humanizer_js_raw_1 = require("./examples/random-humanizer.js?raw");
var probability_gate_js_raw_1 = require("./examples/probability-gate.js?raw");
var echo_note_delay_js_raw_1 = require("./examples/echo-note-delay.js?raw");
var pitch_range_filter_js_raw_1 = require("./examples/pitch-range-filter.js?raw");
var tb_303_sequencer_js_raw_1 = require("./examples/tb-303-sequencer.js?raw");
exports.SpielwerkExamples = [
    { name: "Chord Generator", code: chord_generator_js_raw_1.default },
    { name: "Velocity", code: velocity_js_raw_1.default },
    { name: "Pitch", code: pitch_js_raw_1.default },
    { name: "Random Humanizer", code: random_humanizer_js_raw_1.default },
    { name: "Probability Gate", code: probability_gate_js_raw_1.default },
    { name: "Echo / Note Delay", code: echo_note_delay_js_raw_1.default },
    { name: "Pitch Range Filter", code: pitch_range_filter_js_raw_1.default },
    { name: "303 Sequencer", code: tb_303_sequencer_js_raw_1.default }
];
