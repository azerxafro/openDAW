"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachParameterContextMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var attachParameterContextMenu = function (editing, midiDevices, tracks, parameter, element, disableAutomation) {
    return studio_core_1.ContextMenu.subscribe(element, function (collector) {
        var field = parameter.field;
        var automation = tracks.controls(field);
        collector.addItems(automation.isEmpty()
            ? studio_core_1.MenuItem.default({ label: "Create Automation", hidden: disableAutomation })
                .setTriggerProcedure(function () { return editing.modify(function () {
                return tracks.create(studio_adapters_1.TrackType.Value, field);
            }); })
            : studio_core_1.MenuItem.default({ label: "Remove Automation", hidden: disableAutomation })
                .setTriggerProcedure(function () { return editing.modify(function () {
                return tracks.delete(automation.unwrap());
            }); }), studio_core_1.MenuItem.default({
            label: midiDevices.hasMidiConnection(field.address)
                ? "Forget Midi"
                : "Learn Midi Control..."
        }).setTriggerProcedure(function () {
            if (midiDevices.hasMidiConnection(field.address)) {
                midiDevices.forgetMidiConnection(field.address);
            }
            else {
                midiDevices.learnMIDIControls(field).then();
            }
        }), studio_core_1.MenuItem.default({ label: "Reset Value", checked: field.getValue() === field.initValue })
            .setTriggerProcedure(function () { return editing.modify(function () { return parameter.reset(); }); }));
    });
};
exports.attachParameterContextMenu = attachParameterContextMenu;
