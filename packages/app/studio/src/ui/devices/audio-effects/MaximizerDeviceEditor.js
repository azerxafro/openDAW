"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximizerDeviceEditor = void 0;
var MaximizerDeviceEditor_sass_inline_1 = require("./MaximizerDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var VolumeSlider_1 = require("@/ui/components/VolumeSlider");
var Meters_1 = require("@/ui/devices/audio-effects/Maximizer/Meters");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var className = lib_dom_1.Html.adoptStyleSheet(MaximizerDeviceEditor_sass_inline_1.default, "MaximizerDeviceEditor");
var MaximizerDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var threshold = adapter.namedParameter.threshold;
    // PeakBroadcaster values: [peakL, peakR, rmsL, rmsR]
    var inputPeaks = new Float32Array(4);
    var outputPeaks = new Float32Array(4);
    var reduction = new Float32Array(1);
    lifecycle.ownAll(project.liveStreamReceiver.subscribeFloats(adapter.address.append(1), function (v) { return inputPeaks.set(v); }), project.liveStreamReceiver.subscribeFloats(adapter.address, function (v) { return outputPeaks.set(v); }), project.liveStreamReceiver.subscribeFloats(adapter.address.append(0), function (v) { return reduction.set(v); }));
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <Meters_1.Meters lifecycle={lifecycle} inputPeaks={inputPeaks} outputPeaks={outputPeaks} reduction={reduction}/>
                              <div className="lookahead" onInit={function (element) {
                lifecycle.ownAll(adapter.box.lookahead.catchupAndSubscribe(function (field) {
                    return element.classList.toggle("active", field.getValue());
                }), lib_dom_1.Events.subscribe(element, "click", function () {
                    return editing.modify(function () { return adapter.box.lookahead.setValue(!adapter.box.lookahead.getValue()); });
                }));
            }}>Lookahead
                              </div>
                              <div className="slider-section">
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={threshold}>
                                      <VolumeSlider_1.VolumeSlider lifecycle={lifecycle} editing={editing} parameter={threshold} markers={VolumeSlider_1.MaximizerVolumeMarkers}/>
                                  </AutomationControl_1.AutomationControl>
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Maximizer.defaultIcon}/>);
};
exports.MaximizerDeviceEditor = MaximizerDeviceEditor;
