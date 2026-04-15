"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioBusEditor = void 0;
var AudioBusEditor_sass_inline_1 = require("./AudioBusEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(AudioBusEditor_sass_inline_1.default, "Editor");
var AudioBusEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter;
    var project = service.project;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, adapter.deviceHost()); }} populateControls={function () { return false; }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_enums_1.IconSymbol.Merge}>
            <div className={className}>
                <span>audio-bus</span>
            </div>
        </DeviceEditor_tsx_1.DeviceEditor>);
};
exports.AudioBusEditor = AudioBusEditor;
