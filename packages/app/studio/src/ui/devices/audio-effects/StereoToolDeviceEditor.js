"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StereoToolDeviceEditor = void 0;
var StereoToolDeviceEditor_sass_inline_1 = require("./StereoToolDeviceEditor.sass?inline");
var studio_enums_1 = require("@opendaw/studio-enums");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var configs_1 = require("@/ui/configs");
var constants_1 = require("@/ui/devices/constants");
var Column_1 = require("@/ui/devices/Column");
var Checkbox_1 = require("@/ui/components/Checkbox");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var Icon_1 = require("@/ui/components/Icon");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var AutoGainButton_1 = require("@/ui/devices/audio-effects/StereoTool/AutoGainButton");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var menu_items_1 = require("../menu-items");
var className = lib_dom_1.Html.adoptStyleSheet(StereoToolDeviceEditor_sass_inline_1.default, "StereoToolDeviceEditor");
var StereoToolDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var _b = adapter.namedParameter, volume = _b.volume, panning = _b.panning, stereo = _b.stereo, invertL = _b.invertL, invertR = _b.invertR, swap = _b.swap;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var panningMixing = adapter.box.panningMixing;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) {
            parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Panning" })
                .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(menu_items_1.MenuItems.createForValue(editing, "Linear", panningMixing, lib_dsp_1.Mixing.Linear), menu_items_1.MenuItems.createForValue(editing, "Equal Power", panningMixing, lib_dsp_1.Mixing.EqualPower)); }));
            menu_items_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter);
        }} populateControls={function () { return (<div className={className}>
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: volume,
                options: configs_1.SnapCommonDecibel
            })}
                              <AutoGainButton_1.AutoGainButton lifecycle={lifecycle} project={project} adapter={adapter}/>
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: panning,
                options: configs_1.SnapCenter,
                anchor: 0.5
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: stereo,
                options: configs_1.SnapCenter,
                anchor: 0.5
            })}
                              <div className="checkboxes">
                                  {[
                { label: "L-", parameter: invertL, color: studio_enums_1.Colors.red, icon: studio_enums_1.IconSymbol.Invert },
                { label: "R-", parameter: invertR, color: studio_enums_1.Colors.red, icon: studio_enums_1.IconSymbol.Invert },
                { label: "LR", parameter: swap, color: studio_enums_1.Colors.blue, icon: studio_enums_1.IconSymbol.Swap }
            ].map(function (_a) {
                var label = _a.label, parameter = _a.parameter, color = _a.color, icon = _a.icon;
                return (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={parameter}>
                                          <Column_1.Column ems={constants_1.LKR.slice(2)} color={studio_enums_1.Colors.cream}>
                                              <h5>{label}</h5>
                                              <Checkbox_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, parameter)} appearance={{
                        color: studio_enums_1.Colors.cream,
                        activeColor: color,
                        framed: false,
                        cursor: "pointer"
                    }}>
                                                  <Icon_1.Icon symbol={icon}/>
                                              </Checkbox_1.Checkbox>
                                          </Column_1.Column>
                                      </AutomationControl_1.AutomationControl>);
            })}
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.StereoTool.defaultIcon}/>);
};
exports.StereoToolDeviceEditor = StereoToolDeviceEditor;
