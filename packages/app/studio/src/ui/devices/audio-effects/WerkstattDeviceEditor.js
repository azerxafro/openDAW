"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WerkstattDeviceEditor = void 0;
var werkstatt_default_js_raw_1 = require("./werkstatt-default.js?raw");
var werkstatt_starter_prompt_txt_raw_1 = require("./werkstatt-starter-prompt.txt?raw");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var studio_core_1 = require("@opendaw/studio-core");
var werkstatt_examples_1 = require("./werkstatt-examples");
var ScriptDeviceEditor_1 = require("@/ui/devices/ScriptDeviceEditor");
var config = {
    compiler: { headerTag: "werkstatt", registryName: "werkstattProcessors", functionName: "werkstatt" },
    defaultCode: werkstatt_default_js_raw_1.default,
    examples: werkstatt_examples_1.WerkstattExamples,
    starterPrompt: werkstatt_starter_prompt_txt_raw_1.default,
    icon: studio_core_1.EffectFactories.AudioNamed.Werkstatt.defaultIcon,
    populateMenu: function (parent, service, deviceHost, adapter) {
        return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter);
    },
    populateMeter: function (_a) {
        var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter;
        return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={service.project.liveStreamReceiver} address={adapter.address}/>);
    }
};
var WerkstattDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    return (<ScriptDeviceEditor_1.ScriptDeviceEditor lifecycle={lifecycle} service={service} adapter={adapter} deviceHost={deviceHost} config={config}/>);
};
exports.WerkstattDeviceEditor = WerkstattDeviceEditor;
