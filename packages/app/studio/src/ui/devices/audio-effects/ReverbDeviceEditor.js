"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverbDeviceEditor = void 0;
var ReverbDeviceEditor_sass_inline_1 = require("./ReverbDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var configs_ts_1 = require("@/ui/configs.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(ReverbDeviceEditor_sass_inline_1.default, "ReverbDeviceEditor");
var ReverbDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, liveStreamReceiver = project.liveStreamReceiver, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, decay = _b.decay, preDelay = _b.preDelay, damp = _b.damp, dry = _b.dry, wet = _b.wet;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: decay
            })}
                              <div />
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: preDelay
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: damp
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: dry,
                options: configs_ts_1.SnapCommonDecibel
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: wet,
                options: configs_ts_1.SnapCommonDecibel
            })}
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Reverb.defaultIcon}/>);
};
exports.ReverbDeviceEditor = ReverbDeviceEditor;
