"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DattorroReverbDeviceEditor = void 0;
var DattorroReverbDeviceEditor_sass_inline_1 = require("./DattorroReverbDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var ControlGroup_1 = require("@/ui/devices/ControlGroup");
var Display_1 = require("@/ui/devices/audio-effects/DattorroReverb/Display");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(DattorroReverbDeviceEditor_sass_inline_1.default, "DattorroReverbDeviceEditor");
var DattorroReverbDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning, liveStreamReceiver = project.liveStreamReceiver;
    var createKnob = function (parameter, u, v, color) {
        return ControlBuilder_tsx_1.ControlBuilder.createKnob({
            lifecycle: lifecycle,
            editing: editing,
            midiLearning: midiLearning,
            adapter: adapter,
            parameter: parameter,
            style: { gridArea: "".concat(v + 1, "/").concat(u + 1) },
            color: color
        });
    };
    var _b = adapter.namedParameter, decay = _b.decay, preDelay = _b.preDelay, bandwidth = _b.bandwidth, damping = _b.damping, inputDiffusion1 = _b.inputDiffusion1, inputDiffusion2 = _b.inputDiffusion2, decayDiffusion1 = _b.decayDiffusion1, decayDiffusion2 = _b.decayDiffusion2, excursionRate = _b.excursionRate, excursionDepth = _b.excursionDepth, dry = _b.dry, wet = _b.wet;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              {createKnob(preDelay, 0, 1)}
                              {createKnob(decay, 1, 1)}
                              {createKnob(damping, 2, 1)}
                              {createKnob(bandwidth, 0, 2)}
                              {createKnob(dry, 1, 2)}
                              {createKnob(wet, 2, 2)}
                              <Display_1.Display lifecycle={lifecycle} liveStreamReceiver={liveStreamReceiver} adapter={adapter} gridUV={{ u: 0, v: 0 }}/>
                              <ControlGroup_1.ControlGroup lifecycle={lifecycle} gridUV={{ u: 3, v: 0 }} color={studio_enums_1.Colors.blue} name="Input Diffusion" editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameters={[inputDiffusion1, inputDiffusion2]}/>
                              <ControlGroup_1.ControlGroup lifecycle={lifecycle} gridUV={{ u: 3, v: 1 }} color={studio_enums_1.Colors.green} name="Decay Diffusion" editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameters={[decayDiffusion1, decayDiffusion2]}/>
                              <ControlGroup_1.ControlGroup lifecycle={lifecycle} gridUV={{ u: 3, v: 2 }} color={studio_enums_1.Colors.purple} name="Excursion" editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameters={[excursionRate, excursionDepth]}/>

                              {{ /*Object.values(adapter.namedParameter).map(parameter => ControlBuilder.createKnob({
                lifecycle,
                editing,
                midiLearning,
                adapter,
                parameter
            }))*/}}
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.DattorroReverb.defaultIcon}/>);
};
exports.DattorroReverbDeviceEditor = DattorroReverbDeviceEditor;
