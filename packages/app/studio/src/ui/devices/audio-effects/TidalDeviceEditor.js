"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TidalDeviceEditor = void 0;
var TidalDeviceEditor_sass_inline_1 = require("./TidalDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var Display_1 = require("@/ui/devices/audio-effects/Tidal/Display");
var className = lib_dom_1.Html.adoptStyleSheet(TidalDeviceEditor_sass_inline_1.default, "TidalDeviceEditor");
var TidalDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, liveStreamReceiver = project.liveStreamReceiver, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, rate = _b.rate, depth = _b.depth, slope = _b.slope, symmetry = _b.symmetry, offset = _b.offset, channelOffset = _b.channelOffset;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <Display_1.Display lifecycle={lifecycle} adapter={adapter} liveStreamReceiver={liveStreamReceiver}/>
                              {[rate, depth, slope, symmetry, offset, channelOffset]
                .map(function (parameter) { return ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: parameter,
                anchor: parameter.anchor,
                options: parameter === depth || parameter === slope ? {} : { snap: { threshold: 0.5 } }
            }); })}
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Tidal.defaultIcon}/>);
};
exports.TidalDeviceEditor = TidalDeviceEditor;
