"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapeDeviceEditor = void 0;
var TapeDeviceEditor_sass_inline_1 = require("./TapeDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var Tape_tsx_1 = require("@/ui/devices/instruments/TapeDeviceEditor/Tape.tsx");
var Timeline_tsx_1 = require("@/ui/devices/instruments/TapeDeviceEditor/Timeline.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TapeDeviceEditor_sass_inline_1.default, "TapeDeviceEditor");
var TapeDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var position = project.engine.position, durationInPulses = project.timelineBox.durationInPulses;
    var tracks = deviceHost.audioUnitBoxAdapter().tracks;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost); }} populateControls={function () { return (<div className={className}>
                              <div className="controls"/>
                              <div className="content">
                                  <Tape_tsx_1.Tape lifecycle={lifecycle} position={position} durationInPulses={durationInPulses} tracks={tracks}/>
                                  <Timeline_tsx_1.Timeline lifecycle={lifecycle} position={position} tracks={tracks}/>
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_adapters_1.InstrumentFactories.Tape.defaultIcon}/>);
};
exports.TapeDeviceEditor = TapeDeviceEditor;
