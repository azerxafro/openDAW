"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDIOutputDeviceEditor = void 0;
var MIDIOutputDeviceEditor_sass_inline_1 = require("./MIDIOutputDeviceEditor.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DeviceSelector_1 = require("@/ui/devices/instruments/MIDIOutputEditor/DeviceSelector");
var ControlValues_1 = require("@/ui/devices/instruments/MIDIOutputEditor/ControlValues");
var DeviceParameters_1 = require("@/ui/devices/instruments/MIDIOutputEditor/DeviceParameters");
var AddParameterButton_1 = require("@/ui/devices/instruments/MIDIOutputEditor/AddParameterButton");
var className = lib_dom_1.Html.adoptStyleSheet(MIDIOutputDeviceEditor_sass_inline_1.default, "editor");
var MIDIOutputDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost); }} populateControls={function () { return (<div className={className}>
                              <DeviceSelector_1.DeviceSelector lifecycle={lifecycle} project={project} adapter={adapter}/>
                              <hr />
                              <DeviceParameters_1.DeviceParameters lifecycle={lifecycle} editing={editing} box={adapter.box}/>
                              <ControlValues_1.ControlValues lifecycle={lifecycle} project={project} adapter={adapter}/>
                              <AddParameterButton_1.AddParameterButton project={project} adapter={adapter}/>
                          </div>); }} populateMeter={function () { return false; }} icon={studio_adapters_1.InstrumentFactories.MIDIOutput.defaultIcon}/>);
};
exports.MIDIOutputDeviceEditor = MIDIOutputDeviceEditor;
