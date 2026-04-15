"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelKnob = void 0;
var Knob_tsx_1 = require("@/ui/components/Knob.tsx");
var ParameterLabel_tsx_1 = require("@/ui/components/ParameterLabel.tsx");
var LabelKnob = function (_a) {
    var lifecycle = _a.lifecycle, parameter = _a.parameter, anchor = _a.anchor;
    return (<div style={{ display: "contents" }}>
            <Knob_tsx_1.Knob lifecycle={lifecycle} value={parameter} anchor={anchor}/>
            <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={parameter}/>
        </div>);
};
exports.LabelKnob = LabelKnob;
