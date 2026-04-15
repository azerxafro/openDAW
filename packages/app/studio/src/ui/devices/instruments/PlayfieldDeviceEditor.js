"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayfieldDeviceEditor = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var SlotGrid_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotGrid");
var octave = new lib_std_1.DefaultObservableValue(5); // TODO Make that bound to its PlayfieldDeviceBoxAdapter
var PlayfieldDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) {
            parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Reset All" })
                .setTriggerProcedure(function () { return project.editing.modify(function () { return adapter.reset(); }); }));
            menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost);
        }} populateControls={function () { return (<SlotGrid_1.SlotGrid lifecycle={lifecycle} service={service} adapter={adapter} octave={octave}/>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_adapters_1.InstrumentFactories.Playfield.defaultIcon}/>);
};
exports.PlayfieldDeviceEditor = PlayfieldDeviceEditor;
