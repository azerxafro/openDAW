"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoDeviceEditor = void 0;
var NanoDeviceEditor_sass_inline_1 = require("./NanoDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var Icon_1 = require("@/ui/components/Icon");
var SampleSelector_1 = require("@/ui/devices/SampleSelector");
var className = lib_dom_1.Html.adoptStyleSheet(NanoDeviceEditor_sass_inline_1.default, "NanoDeviceEditor");
var NanoDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var _b = adapter.namedParameter, volume = _b.volume, release = _b.release;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var sampleDropZone = (<div className="sample-drop">
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Waveform}/>
        </div>);
    var sampleSelector = new SampleSelector_1.SampleSelector(service, SampleSelector_1.SampleSelectStrategy.forPointerField(adapter.box.file));
    lifecycle.ownAll(adapter.box.file.catchupAndSubscribe(function (pointer) { return pointer.targetVertex.match({
        none: function () { return sampleDropZone.removeAttribute("sample"); },
        some: function (_a) {
            var box = _a.box;
            return sampleDropZone.setAttribute("sample", (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.AudioFileBox).fileName.getValue());
        }
    }); }), sampleSelector.configureBrowseClick(sampleDropZone), sampleSelector.configureContextMenu(sampleDropZone), sampleSelector.configureDrop(sampleDropZone));
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost); }} populateControls={function () { return (<div className={className}>
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: volume
            })}
                              {ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: release
            })}
                              {sampleDropZone}
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_adapters_1.InstrumentFactories.Nano.defaultIcon}/>);
};
exports.NanoDeviceEditor = NanoDeviceEditor;
