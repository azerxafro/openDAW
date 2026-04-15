"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArpeggioDeviceEditor = void 0;
var ArpeggioDeviceEditor_sass_inline_1 = require("./ArpeggioDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DeviceMidiMeter_tsx_1 = require("@/ui/devices/panel/DeviceMidiMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(ArpeggioDeviceEditor_sass_inline_1.default, "ArpeggioDeviceEditor");
var ArpeggioDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var _b = adapter.namedParameter, modeIndex = _b.modeIndex, numOctaves = _b.numOctaves, rate = _b.rate, gate = _b.gate, repeat = _b.repeat, velocity = _b.velocity;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: modeIndex
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: rate
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: numOctaves
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: repeat
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: gate
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: velocity
            })}
                          </div>); }} populateMeter={function () { return (<DeviceMidiMeter_tsx_1.DeviceMidiMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.MidiNamed.Arpeggio.defaultIcon}/>);
};
exports.ArpeggioDeviceEditor = ArpeggioDeviceEditor;
