"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitchDeviceEditor = void 0;
var PitchDeviceEditor_sass_inline_1 = require("./PitchDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DeviceMidiMeter_tsx_1 = require("@/ui/devices/panel/DeviceMidiMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(PitchDeviceEditor_sass_inline_1.default, "PitchDeviceEditor");
var PitchDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var _b = adapter.namedParameter, octaves = _b.octaves, semiTones = _b.semiTones, cent = _b.cent;
    var project = service.project;
    var editing = project.editing, liveStreamReceiver = project.liveStreamReceiver, midiLearning = project.midiLearning;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: octaves
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: semiTones
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: cent
            })}
                          </div>); }} populateMeter={function () { return (<DeviceMidiMeter_tsx_1.DeviceMidiMeter lifecycle={lifecycle} receiver={liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.MidiNamed.Pitch.defaultIcon}/>);
};
exports.PitchDeviceEditor = PitchDeviceEditor;
