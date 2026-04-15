"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayfieldSampleEditor = void 0;
var PlayfieldSampleEditor_sass_inline_1 = require("./PlayfieldSampleEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var SlotEditor_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotEditor");
var Icon_1 = require("@/ui/components/Icon");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(PlayfieldSampleEditor_sass_inline_1.default, "PlayfieldSampleEditor");
var PlayfieldSampleEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var engine = project.engine, liveStreamReceiver = project.liveStreamReceiver, userEditingManager = project.userEditingManager;
    var audioUnitBoxAdapter = deviceHost.audioUnitBoxAdapter();
    var deviceName = adapter.device().labelField.getValue();
    var goDevice = function () { return userEditingManager.audioUnit.edit(deviceHost.audioUnitBoxAdapter().box.editing); };
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost); }} populateControls={function () { return (<SlotEditor_1.SlotEditor lifecycle={lifecycle} service={service} adapter={adapter}/>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={liveStreamReceiver} address={adapter.peakAddress}/>); }} createLabel={function () {
            var deviceLabel = (<span className="device-name" onclick={goDevice} style={{ backgroundColor: studio_enums_1.Colors.green.toString() }}>
                                  {deviceName}
                              </span>);
            var fileNameLabel = (<span />);
            var playLabel = (<span className="play-label">
                                  <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Play}/> {fileNameLabel}
                              </span>);
            var noteLifeTime = lib_std_1.Terminable.Empty;
            lifecycle.ownAll(lib_std_1.Terminable.create(function () { return noteLifeTime.terminate(); }), adapter.labelField.catchupAndSubscribe(function (owner) { return fileNameLabel.textContent = owner.getValue(); }), TextTooltip_1.TextTooltip.default(deviceLabel, function () { return "Go back to device"; }), lib_dom_1.Events.subscribe(playLabel, "dblclick", function (event) { return event.stopPropagation(); }), lib_dom_1.Events.subscribe(playLabel, "pointerdown", function (event) {
                event.stopPropagation();
                playLabel.setPointerCapture(event.pointerId);
                noteLifeTime = studio_adapters_1.NoteLifeCycle.start(function (signal) { return engine.noteSignal(signal); }, audioUnitBoxAdapter.uuid, adapter.indexField.getValue());
            }), lib_dom_1.Events.subscribe(playLabel, "pointerup", function () { return noteLifeTime.terminate(); }));
            return (<h1 className="playfield-sample-label">
                                  {deviceLabel} {playLabel}
                              </h1>);
        }} icon={studio_adapters_1.InstrumentFactories.Playfield.defaultIcon} className={className}/>);
};
exports.PlayfieldSampleEditor = PlayfieldSampleEditor;
