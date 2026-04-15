"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyParameters = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
exports.PropertyParameters = {
    position: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linearInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER), lib_std_1.StringMapping.numeric(), "Position", 0),
        fieldName: "position"
    },
    duration: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linearInteger(1, Number.MAX_SAFE_INTEGER), lib_std_1.StringMapping.numeric(), "Duration", lib_dsp_1.PPQN.SemiQuaver),
        fieldName: "duration"
    },
    pitch: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linearInteger(0, 127), lib_std_1.StringMapping.numeric(), "Pitch", 60),
        fieldName: "pitch"
    },
    velocity: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.unipolar(), lib_std_1.StringMapping.percent(), "Velocity", 0.8),
        fieldName: "velocity"
    },
    // TODO FineTune should increase or decrease pitch when overflowing (100cents)
    cent: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linear(-50.0, 50.0), lib_std_1.StringMapping.numeric({
            unit: "cents",
            bipolar: true,
            fractionDigits: 0
        }), "Fine Tune", 0.0),
        fieldName: "cent"
    },
    chance: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linearInteger(1, 100), lib_std_1.StringMapping.numeric({
            fractionDigits: 0
        }), "Chance", 100),
        fieldName: "chance"
    },
    playCount: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linearInteger(1, 128), lib_std_1.StringMapping.numeric({ fractionDigits: 0 }), "Play Count", 1),
        fieldName: "playCount"
    }, playCurve: {
        parameter: new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.bipolar(), lib_std_1.StringMapping.percent({ fractionDigits: 0, bipolar: false }), "Play Curve", 0.0),
        fieldName: "playCurve"
    }
};
