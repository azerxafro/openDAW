"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GateDeviceEditor = void 0;
var GateDeviceEditor_sass_inline_1 = require("./GateDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var GateDisplay_1 = require("@/ui/devices/audio-effects/Gate/GateDisplay");
var SidechainButton_1 = require("@/ui/devices/SidechainButton");
var ParameterToggleButton_1 = require("@/ui/devices/ParameterToggleButton");
var className = lib_dom_1.Html.adoptStyleSheet(GateDeviceEditor_sass_inline_1.default, "GateDeviceEditor");
// TODO
//  Use thresholdDb from adapter.
//  Draw threshold lines.
//  Show db labels.
var GateDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, inverse = _b.inverse, threshold = _b.threshold, returnParam = _b.return, attack = _b.attack, hold = _b.hold, release = _b.release, floor = _b.floor;
    // [0] inputPeakDb, [1] outputPeakDb, [2] gateEnvelope, [3] thresholdDb
    var values = new Float32Array([Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]);
    lifecycle.own(project.liveStreamReceiver.subscribeFloats(adapter.address.append(0), function (processorValues) { return values.set(processorValues); }));
    var createLabelControlFrag = function (parameter) { return (<div className="control">
            <h3>{parameter.name}</h3>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={parameter}>
                <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} supressValueFlyout={true}>
                    <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} framed/>
                </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            </AutomationControl_1.AutomationControl>
        </div>); };
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <section className="envelope" style={{ gridArea: "1 / 1 / 2 / 4" }}/>
                              <section className="bounds" style={{ gridArea: "2 / 1 / 2 / 4" }}/>
                              {[attack, hold, release].map(function (parameter) { return createLabelControlFrag(parameter); })}
                              <div className="sidechain">
                                  <SidechainButton_1.SidechainButton sideChain={adapter.sideChain} rootBoxAdapter={project.rootBoxAdapter} editing={editing}/>
                              </div>
                              {[threshold, returnParam, floor].map(function (parameter) { return createLabelControlFrag(parameter); })}
                              <div className="inverse">
                                  <ParameterToggleButton_1.ParameterToggleButton lifecycle={lifecycle} editing={editing} parameter={inverse}/>
                              </div>
                              <GateDisplay_1.GateDisplay lifecycle={lifecycle} adapter={adapter} values={values}/>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Gate.defaultIcon}/>);
};
exports.GateDeviceEditor = GateDeviceEditor;
