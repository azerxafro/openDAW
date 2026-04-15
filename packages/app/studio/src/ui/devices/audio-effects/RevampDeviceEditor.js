"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevampDeviceEditor = void 0;
var RevampDeviceEditor_sass_inline_1 = require("./RevampDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var Column_tsx_1 = require("@/ui/devices/Column.tsx");
var ParameterLabel_tsx_1 = require("@/ui/components/ParameterLabel.tsx");
var Renderer_ts_1 = require("@/ui/devices/audio-effects/Revamp/Renderer.ts");
var Display_tsx_1 = require("@/ui/devices/audio-effects/Revamp/Display.tsx");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var constants_ts_1 = require("@/ui/devices/audio-effects/Revamp/constants.ts");
var RelativeUnitValueDragging_tsx_1 = require("@/ui/wrapper/RelativeUnitValueDragging.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var studio_core_1 = require("@opendaw/studio-core");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(RevampDeviceEditor_sass_inline_1.default, "RevampDeviceEditor");
var RevampDeviceEditor = function (_a) {
    var adapter = _a.adapter, service = _a.service, lifecycle = _a.lifecycle, deviceHost = _a.deviceHost;
    var project = service.project;
    var curves = <canvas />;
    var spectrum = <canvas />;
    var spectrumContext = (0, lib_std_1.asDefined)(spectrum.getContext("2d"));
    var spectrumScale = new studio_core_1.LinearScale(-60.0, -3.0);
    lifecycle.ownAll((0, Renderer_ts_1.createCurveRenderer)(curves, constants_ts_1.xAxis, constants_ts_1.yAxis, adapter), project.liveStreamReceiver.subscribeFloats(adapter.spectrum, function (values) { return (0, Renderer_ts_1.plotSpectrum)(spectrumContext, constants_ts_1.xAxis, spectrumScale, values, project.engine.sampleRate); }));
    var grid = <svg />;
    lifecycle.own((0, Display_tsx_1.createDisplay)(constants_ts_1.xAxis, constants_ts_1.yAxis, grid));
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, highPass = _b.highPass, lowShelf = _b.lowShelf, lowBell = _b.lowBell, midBell = _b.midBell, highBell = _b.highBell, highShelf = _b.highShelf, lowPass = _b.lowPass;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <div className="default-screen" style={{ gridArea: [1, 1, 3, -1].join("/") }}>
                                  {grid}
                                  {spectrum}
                                  {curves}
                                  <div className="switches">
                                      {[highPass, lowShelf, lowBell, midBell, highBell, highShelf, lowPass]
                .map(function (parameter, index) { return (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={parameter.enabled}>
                                                  <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, parameter.enabled)} appearance={{ activeColor: constants_ts_1.ColorSets[index].full }}>
                                                      <Icon_tsx_1.Icon symbol={constants_ts_1.symbols[index]}/>
                                                  </Checkbox_tsx_1.Checkbox>
                                              </AutomationControl_1.AutomationControl>); })}
                                  </div>
                              </div>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highPass.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highPass.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highPass.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highPass.order}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highPass.order} options={constants_ts_1.orderValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highPass.order} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highPass.q}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highPass.q}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highPass.q} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowShelf.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowShelf.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowShelf.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowShelf.gain}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowShelf.gain} options={constants_ts_1.decibelValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowShelf.gain} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowBell.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowBell.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowBell.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowBell.gain}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowBell.gain} options={constants_ts_1.decibelValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowBell.gain} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowBell.q}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowBell.q}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowBell.q} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={midBell.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={midBell.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={midBell.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={midBell.gain}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={midBell.gain} options={constants_ts_1.decibelValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={midBell.gain} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={midBell.q}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={midBell.q}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={midBell.q} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highBell.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highBell.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highBell.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highBell.gain}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highBell.gain} options={constants_ts_1.decibelValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highBell.gain} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highBell.q}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highBell.q}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highBell.q} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highShelf.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highShelf.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highShelf.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={highShelf.gain}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={highShelf.gain} options={constants_ts_1.decibelValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={highShelf.gain} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                              <Column_tsx_1.Column ems={constants_ts_1.ems} space={0} color={studio_enums_1.Colors.cream}>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowPass.frequency}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowPass.frequency}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowPass.frequency} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowPass.order}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowPass.order} options={constants_ts_1.orderValueGuide}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowPass.order} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                                  <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={lowPass.q}>
                                      <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={lowPass.q}>
                                          <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={lowPass.q} framed/>
                                      </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                  </AutomationControl_1.AutomationControl>
                              </Column_tsx_1.Column>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Revamp.defaultIcon}/>);
};
exports.RevampDeviceEditor = RevampDeviceEditor;
