"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotEditor = void 0;
var SlotEditor_sass_inline_1 = require("./SlotEditor.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_1 = require("@/ui/components/Icon");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var Checkbox_1 = require("@/ui/components/Checkbox");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var SlotUtils_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotUtils");
var SampleSelector_1 = require("@/ui/devices/SampleSelector");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var ValueMoveModifier_1 = require("@/ui/timeline/editors/value/ValueMoveModifier");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(SlotEditor_sass_inline_1.default, "SlotEditor");
var SlotEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning, userEditingManager = project.userEditingManager;
    var deviceAdapter = adapter.device();
    var _b = adapter.namedParameter, sampleStart = _b.sampleStart, sampleEnd = _b.sampleEnd, attack = _b.attack, release = _b.release, pitch = _b.pitch, mute = _b.mute, solo = _b.solo, gate = _b.gate, polyphone = _b.polyphone, exclude = _b.exclude;
    var labelNote = (<div className="note-label"/>);
    var waveformCanvas = (<canvas />);
    var playbackCanvas = (<canvas style={{ pointerEvents: "none" }}/>);
    var playbackContext = (0, lib_std_1.asDefined)(playbackCanvas.getContext("2d"));
    var waveformPainter = new studio_core_1.CanvasPainter(waveformCanvas, function (painter) {
        return SlotUtils_1.SlotUtils.waveform(painter, adapter, adapter.indexField.getValue() % 12, true);
    });
    var sampleSelector = new SampleSelector_1.SampleSelector(service, SampleSelector_1.SampleSelectStrategy.forPointerField(adapter.box.file));
    var createParameterLabel = function (parameter) { return (<div className="parameter-label">
            <div className="label">{parameter.name}</div>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceAdapter.deviceHost().audioUnitBoxAdapter().tracks} parameter={parameter}>
                <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter}>
                    <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} framed/>
                </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            </AutomationControl_1.AutomationControl>
        </div>); };
    lifecycle.ownAll(waveformPainter, sampleSelector.configureDrop(waveformCanvas), adapter.indexField.catchupAndSubscribe(function (owner) { return labelNote.textContent = lib_dsp_1.MidiKeys.toFullString(owner.getValue()); }), lib_dom_1.Dragging.attach(waveformCanvas, function (_a) {
        var clientX = _a.clientX;
        var _b = waveformCanvas.getBoundingClientRect(), left = _b.left, width = _b.width;
        var dl = clientX - (left + sampleStart.getValue() * width);
        var dr = clientX - (left + sampleEnd.getValue() * width);
        var min = ValueMoveModifier_1.SnapValueThresholdInPixels;
        var dir = 0;
        if (min > Math.abs(dl)) {
            min = dl;
            dir = -1;
        }
        if (Math.abs(min) > Math.abs(dr)) {
            min = Math.abs(dr);
            dir = 1;
        }
        if (dir === 0) {
            return lib_std_1.Option.None;
        }
        return lib_std_1.Option.wrap({
            update: function (_a) {
                var clientX = _a.clientX;
                var _b = waveformCanvas.getBoundingClientRect(), left = _b.left, width = _b.width;
                var ratio = (0, lib_std_1.clamp)((clientX - min - left) / width, 0.0, 1.0);
                editing.modify(function () {
                    if (dir === -1) {
                        sampleStart.setValue(ratio);
                    }
                    else {
                        sampleEnd.setValue(ratio);
                    }
                }, false);
            },
            cancel: function () { return editing.revertPending(); },
            approve: function () { return editing.mark(); }
        });
    }), adapter.box.device.subscribe(function (pointer) {
        if (!pointer.isAttached()) {
            return;
        }
        userEditingManager.audioUnit.edit(deviceAdapter.audioUnitBoxAdapter().box.editing);
    }), adapter.box.file.subscribe(waveformPainter.requestUpdate), sampleStart.subscribe(waveformPainter.requestUpdate), sampleEnd.subscribe(waveformPainter.requestUpdate), service.project.liveStreamReceiver.subscribeFloats(adapter.address, function (array) {
        var canvas = playbackContext.canvas;
        adapter.file().flatMap(function (file) { return file.data; }).match({
            none: function () {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
            },
            some: function (data) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                playbackContext.fillStyle = SlotUtils_1.SlotUtils.color(adapter.indexField.getValue() % 12);
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var position = array_1[_i];
                    if (position === -1) {
                        break;
                    }
                    var x = position / data.numberOfFrames * canvas.width;
                    playbackContext.fillRect(x, 0, 1, canvas.height);
                }
            }
        });
    }));
    return (<div className={className}>
            <div className="display">
                <div className="waveform">
                    {waveformCanvas}
                    {playbackCanvas}
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    {labelNote}
                    <div className="checkboxes">
                        <div>
                            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceAdapter.deviceHost().audioUnitBoxAdapter().tracks} parameter={mute}>
                                <Checkbox_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, mute)} appearance={{ activeColor: studio_enums_1.Colors.red, framed: true }}>
                                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Mute}/>
                                </Checkbox_1.Checkbox>
                            </AutomationControl_1.AutomationControl>
                            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceAdapter.deviceHost().audioUnitBoxAdapter().tracks} parameter={solo}>
                                <Checkbox_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, solo)} appearance={{ activeColor: studio_enums_1.Colors.yellow, framed: true }}>
                                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Solo}/>
                                </Checkbox_1.Checkbox>
                            </AutomationControl_1.AutomationControl>
                        </div>
                        <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={deviceAdapter.deviceHost().audioUnitBoxAdapter().tracks} parameter={exclude}>
                            <Checkbox_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, exclude)} className="exclude" appearance={{ activeColor: studio_enums_1.Colors.orange, framed: true }}>
                                <span style={{ fontSize: "0.5em" }}>Excl.</span>
                            </Checkbox_1.Checkbox>
                        </AutomationControl_1.AutomationControl>
                    </div>
                </div>
                <div className="column">
                    <div className="label">Gate</div>
                    <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, gate)} className="radio-group" elements={[
            { value: studio_adapters_1.Gate.Off, element: (<span>Off</span>) },
            { value: studio_adapters_1.Gate.On, element: (<span>On</span>) },
            { value: studio_adapters_1.Gate.Loop, element: (<span>Loop</span>) }
        ]}/>
                </div>
                <div className="column">
                    <div className="label">Voice</div>
                    <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, polyphone)} className="radio-group" elements={[
            { value: false, element: (<span>Mono</span>) },
            { value: true, element: (<span>Poly</span>) }
        ]}/>
                </div>
                {createParameterLabel(sampleStart)}
                {createParameterLabel(sampleEnd)}
                {createParameterLabel(attack)}
                {createParameterLabel(release)}
                {createParameterLabel(pitch)}
            </div>
        </div>);
};
exports.SlotEditor = SlotEditor;
