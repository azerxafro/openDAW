"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlBuilder = void 0;
var Column_tsx_1 = require("@/ui/devices/Column.tsx");
var constants_ts_1 = require("@/ui/devices/constants.ts");
var ParameterLabelKnob_tsx_1 = require("@/ui/devices/ParameterLabelKnob.tsx");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var studio_enums_1 = require("@opendaw/studio-enums");
var ControlBuilder;
(function (ControlBuilder) {
    ControlBuilder.createKnob = function (_a) {
        var lifecycle = _a.lifecycle, editing = _a.editing, midiLearning = _a.midiLearning, adapter = _a.adapter, parameter = _a.parameter, options = _a.options, anchor = _a.anchor, color = _a.color, style = _a.style, disableAutomation = _a.disableAutomation;
        var tracks = adapter.deviceHost().audioUnitBoxAdapter().tracks;
        return (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={parameter} disableAutomation={disableAutomation}>
                <Column_tsx_1.Column ems={constants_ts_1.LKR} color={color !== null && color !== void 0 ? color : studio_enums_1.Colors.cream} style={style}>
                    <h5>{parameter.name}</h5>
                    <ParameterLabelKnob_tsx_1.ParameterLabelKnob lifecycle={lifecycle} editing={editing} parameter={parameter} options={options} anchor={anchor}/>
                </Column_tsx_1.Column>
            </AutomationControl_1.AutomationControl>);
    };
})(ControlBuilder || (exports.ControlBuilder = ControlBuilder = {}));
