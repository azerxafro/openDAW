"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApparatDeviceEditor = void 0;
var apparat_default_js_raw_1 = require("./apparat-default.js?raw");
var apparat_starter_prompt_txt_raw_1 = require("./apparat-starter-prompt.txt?raw");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var studio_enums_1 = require("@opendaw/studio-enums");
var ScriptDeviceEditor_1 = require("@/ui/devices/ScriptDeviceEditor");
var apparat_examples_1 = require("./apparat-examples");
var config = {
    compiler: { headerTag: "apparat", registryName: "apparatProcessors", functionName: "apparat" },
    defaultCode: apparat_default_js_raw_1.default,
    examples: apparat_examples_1.ApparatExamples,
    starterPrompt: apparat_starter_prompt_txt_raw_1.default,
    icon: studio_enums_1.IconSymbol.Code,
    populateMenu: function (parent, service, deviceHost) {
        return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost);
    },
    populateMeter: function (_a) {
        var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter;
        return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={service.project.liveStreamReceiver} address={adapter.address}/>);
    }
};
var ApparatDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    return (<ScriptDeviceEditor_1.ScriptDeviceEditor lifecycle={lifecycle} service={service} adapter={adapter} deviceHost={deviceHost} config={config}/>);
};
exports.ApparatDeviceEditor = ApparatDeviceEditor;
