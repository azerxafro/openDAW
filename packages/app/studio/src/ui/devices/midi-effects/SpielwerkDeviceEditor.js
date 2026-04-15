"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpielwerkDeviceEditor = void 0;
var spielwerk_default_js_raw_1 = require("./spielwerk-default.js?raw");
var spielwerk_starter_prompt_txt_raw_1 = require("./spielwerk-starter-prompt.txt?raw");
var studio_enums_1 = require("@opendaw/studio-enums");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var spielwerk_examples_1 = require("./spielwerk-examples");
var ScriptDeviceEditor_1 = require("@/ui/devices/ScriptDeviceEditor");
var config = {
    compiler: { headerTag: "spielwerk", registryName: "spielwerkProcessors", functionName: "spielwerk" },
    defaultCode: spielwerk_default_js_raw_1.default,
    examples: spielwerk_examples_1.SpielwerkExamples,
    starterPrompt: spielwerk_starter_prompt_txt_raw_1.default,
    icon: studio_enums_1.IconSymbol.Code,
    populateMenu: function (parent, service, deviceHost, adapter) {
        return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter);
    },
    populateMeter: function () { return null; }
};
var SpielwerkDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    return (<ScriptDeviceEditor_1.ScriptDeviceEditor lifecycle={lifecycle} service={service} adapter={adapter} deviceHost={deviceHost} config={config}/>);
};
exports.SpielwerkDeviceEditor = SpielwerkDeviceEditor;
