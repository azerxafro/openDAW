"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveshaperDeviceEditor = void 0;
var WaveshaperDeviceEditor_sass_inline_1 = require("./WaveshaperDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var ControlBuilder_1 = require("@/ui/devices/ControlBuilder");
var Display_1 = require("@/ui/devices/audio-effects/Waveshaper/Display");
var className = lib_dom_1.Html.adoptStyleSheet(WaveshaperDeviceEditor_sass_inline_1.default, "WaveshaperDeviceEditor");
var WaveshaperDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, inputGain = _b.inputGain, outputGain = _b.outputGain, mix = _b.mix;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <Display_1.Display lifecycle={lifecycle} editing={editing} adapter={adapter}/>
                              {[
                ControlBuilder_1.ControlBuilder.createKnob({
                    lifecycle: lifecycle,
                    editing: editing,
                    midiLearning: midiLearning,
                    adapter: adapter,
                    parameter: inputGain, anchor: 0.0,
                    style: { gridColumn: "1" }
                }),
                ControlBuilder_1.ControlBuilder.createKnob({
                    lifecycle: lifecycle,
                    editing: editing,
                    midiLearning: midiLearning,
                    adapter: adapter,
                    parameter: mix, anchor: 1.0,
                    style: { gridColumn: "2" }
                }),
                ControlBuilder_1.ControlBuilder.createKnob({
                    lifecycle: lifecycle,
                    editing: editing,
                    midiLearning: midiLearning,
                    adapter: adapter,
                    parameter: outputGain, anchor: 0.5,
                    style: { gridColumn: "3" }
                })
            ]}
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Waveshaper.defaultIcon}/>);
};
exports.WaveshaperDeviceEditor = WaveshaperDeviceEditor;
