"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressorDeviceEditor = void 0;
var CompressorDeviceEditor_sass_inline_1 = require("./CompressorDeviceEditor.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var ParameterToggleButton_1 = require("@/ui/devices/ParameterToggleButton");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var Meters_1 = require("@/ui/devices/audio-effects/Compressor/Meters");
var CompressionCurve_1 = require("@/ui/devices/audio-effects/Compressor/CompressionCurve");
var SidechainButton_1 = require("@/ui/devices/SidechainButton");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var className = lib_dom_1.Html.adoptStyleSheet(CompressorDeviceEditor_sass_inline_1.default, "CompressorDeviceEditor");
var CompressorDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, lookahead = _b.lookahead, automakeup = _b.automakeup, autoattack = _b.autoattack, autorelease = _b.autorelease, threshold = _b.threshold, ratio = _b.ratio, knee = _b.knee, makeup = _b.makeup, attack = _b.attack, release = _b.release, inputgain = _b.inputgain, mix = _b.mix;
    var values = new Float32Array([Number.NEGATIVE_INFINITY, 0.0, Number.NEGATIVE_INFINITY]);
    lifecycle.own(project.liveStreamReceiver.subscribeFloats(adapter.address.append(0), function (processorValues) { return values.set(processorValues); }));
    var createLabelControlFrag = function (parameter) { return (<lib_jsx_1.Frag>
            <span>{parameter.name}</span>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={parameter}>
                <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} supressValueFlyout={true}>
                    <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} framed/>
                </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            </AutomationControl_1.AutomationControl>
        </lib_jsx_1.Frag>); };
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <div className="toggle-buttons">
                                  {[automakeup, autoattack, autorelease, lookahead]
                .map(function (parameter) { return (<ParameterToggleButton_1.ParameterToggleButton lifecycle={lifecycle} editing={editing} parameter={parameter}/>); })}
                                  <SidechainButton_1.SidechainButton sideChain={adapter.sideChain} rootBoxAdapter={project.rootBoxAdapter} editing={editing}/>
                              </div>
                              <div className="control-section">
                                  <div className="controls">
                                      {[threshold, ratio, knee, makeup]
                .map(function (parameter) { return createLabelControlFrag(parameter); })}
                                  </div>
                                  <div className="controls">
                                      {[attack, release, inputgain, mix]
                .map(function (parameter) { return createLabelControlFrag(parameter); })}
                                  </div>
                              </div>
                              <CompressionCurve_1.CompressionCurve lifecycle={lifecycle} adapter={adapter} values={values}/>
                              <Meters_1.Meters lifecycle={lifecycle} values={values}/>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Compressor.defaultIcon}/>);
};
exports.CompressorDeviceEditor = CompressorDeviceEditor;
