"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownEffectDeviceEditor = void 0;
var UnknownEffectDeviceEditor_sass_inline_1 = require("./UnknownEffectDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DeviceMidiMeter_tsx_1 = require("@/ui/devices/panel/DeviceMidiMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(UnknownEffectDeviceEditor_sass_inline_1.default, "UnknownAudioEffectDeviceEditor");
var UnknownEffectDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>{adapter.commentField.getValue()}</div>); }} populateMeter={function () { return (<DeviceMidiMeter_tsx_1.DeviceMidiMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_enums_1.IconSymbol.Effects}/>);
};
exports.UnknownEffectDeviceEditor = UnknownEffectDeviceEditor;
