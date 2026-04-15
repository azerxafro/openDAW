"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayDeviceEditor = void 0;
var DelayDeviceEditor_sass_inline_1 = require("./DelayDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(DelayDeviceEditor_sass_inline_1.default, "DelayDeviceEditor");
var DelayDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, preSyncTimeLeft = _b.preSyncTimeLeft, preMillisTimeLeft = _b.preMillisTimeLeft, preSyncTimeRight = _b.preSyncTimeRight, preMillisTimeRight = _b.preMillisTimeRight, delay = _b.delay, millisTime = _b.millisTime, cross = _b.cross, filter = _b.filter, feedback = _b.feedback, lfoSpeed = _b.lfoSpeed, lfoDepth = _b.lfoDepth, dry = _b.dry, wet = _b.wet;
    var createLabelControlFrag = function (_a) {
        var lifecycle = _a.lifecycle, parameter = _a.parameter, name = _a.name, _b = _a.grid, u = _b.u, v = _b.v, threshold = _a.threshold;
        return (<div className="control" style={{ gridArea: "".concat(v + 1, " / ").concat(u + 1, " / ").concat(v + 3, " / ").concat(u + 2) }}>
            <h3>{name !== null && name !== void 0 ? name : parameter.name}</h3>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceHost.audioUnitBoxAdapter().tracks} parameter={parameter}>
                <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} options={(0, lib_std_1.isDefined)(threshold) ? { snap: { threshold: threshold } } : undefined} supressValueFlyout={true}>
                    <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} classList={["center"]} framed={true}/>
                </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            </AutomationControl_1.AutomationControl>
        </div>);
    };
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <div className="outline"/>
                              <h3 className="head" style={{
                gridArea: "1 / 1 / 2 / 2",
                "--color": "rgba(255, 255, 255, 0.6)"
            }}>DELAY L</h3>
                              <h3 className="head" style={{
                gridArea: "6 / 1 / 7 / 2",
                "--color": "rgba(255, 255, 255, 0.6)"
            }}>DELAY R</h3>
                              <section className="lfo"/>
                              <section className="delay"/>
                              <section className="mix"/>
                              {[
                // PRE DELAY
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: preSyncTimeLeft,
                    name: "sync",
                    grid: { u: 0, v: 1 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: preMillisTimeLeft,
                    name: "millis",
                    grid: { u: 0, v: 3 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: preSyncTimeRight,
                    name: "sync",
                    grid: { u: 0, v: 6 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: preMillisTimeRight,
                    name: "millis",
                    grid: { u: 0, v: 8 }
                }),
                // MAIN DELAY
                <h3 className="rotated delay" style={{
                        gridArea: "3 / -1 / 9 / -1",
                        "--color": studio_enums_1.Colors.blue.toString()
                    }}>DELAY</h3>,
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: delay,
                    name: "sync",
                    grid: { u: 1, v: 3 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: millisTime,
                    name: "millis",
                    grid: { u: 1, v: 5 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: cross,
                    grid: { u: 2, v: 2 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: filter,
                    grid: { u: 2, v: 4 },
                    threshold: 0.5
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: feedback,
                    grid: { u: 2, v: 6 }
                }),
                // LFO
                <h3 className="rotated lfo" style={{
                        gridArea: "1 / -1 / 3 / -1",
                        justifySelf: "end",
                        "--color": studio_enums_1.Colors.purple.toString()
                    }}>LFO</h3>,
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: lfoSpeed,
                    name: "Speed",
                    grid: { u: 1, v: 0 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: lfoDepth,
                    name: "Depth",
                    grid: { u: 2, v: 0 }
                }),
                // MIX
                <h3 className="rotated mix" style={{
                        gridArea: "9 / -1 / -1 / -1",
                        justifySelf: "end",
                        "--color": studio_enums_1.Colors.green.toString()
                    }}>MIX</h3>,
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: dry,
                    grid: { u: 1, v: 8 }
                }),
                createLabelControlFrag({
                    lifecycle: lifecycle,
                    parameter: wet,
                    grid: { u: 2, v: 8 }
                })
            ]}
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Delay.defaultIcon}/>);
};
exports.DelayDeviceEditor = DelayDeviceEditor;
