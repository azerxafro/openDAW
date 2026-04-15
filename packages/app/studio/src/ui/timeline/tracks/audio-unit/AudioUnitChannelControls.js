"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioUnitChannelControls = void 0;
var AudioUnitChannelControls_sass_inline_1 = require("./AudioUnitChannelControls.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var RelativeUnitValueDragging_tsx_1 = require("@/ui/wrapper/RelativeUnitValueDragging.tsx");
var configs_ts_1 = require("@/ui/configs.ts");
var Knob_tsx_1 = require("@/ui/components/Knob.tsx");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var studio_enums_1 = require("@opendaw/studio-enums");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var HorizontalPeakMeter_1 = require("@/ui/components/HorizontalPeakMeter");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var Button_1 = require("@/ui/components/Button");
var className = lib_dom_1.Html.adoptStyleSheet(AudioUnitChannelControls_sass_inline_1.default, "AudioUnitChannelControls");
var AudioUnitChannelControls = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter;
    var project = service.project;
    var captureDevices = project.captureDevices, editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, volume = _b.volume, panning = _b.panning, mute = _b.mute, solo = _b.solo;
    var tracks = adapter.tracks;
    var volumeControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={volume} offset={2}>
            <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={project.editing} parameter={volume} options={configs_ts_1.SnapCommonDecibel}>
                <Knob_tsx_1.Knob lifecycle={lifecycle} value={volume} anchor={0.0} color={studio_enums_1.Colors.yellow}/>
            </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
        </AutomationControl_1.AutomationControl>);
    var panningControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={panning} offset={2}>
            <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={panning} options={configs_ts_1.SnapCenter}>
                <Knob_tsx_1.Knob lifecycle={lifecycle} value={panning} anchor={0.5} color={studio_enums_1.Colors.green}/>
            </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
        </AutomationControl_1.AutomationControl>);
    var muteControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={mute}>
            <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, mute)} appearance={{ activeColor: studio_enums_1.Colors.orange, framed: true }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Mute}/>
            </Checkbox_tsx_1.Checkbox>
        </AutomationControl_1.AutomationControl>);
    var soloControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={solo}>
            <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, solo)} appearance={{ activeColor: studio_enums_1.Colors.yellow, framed: true }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Solo}/>
            </Checkbox_tsx_1.Checkbox>
        </AutomationControl_1.AutomationControl>);
    var peaksInDb = new Float32Array(lib_std_1.Arrays.create(function () { return Number.NEGATIVE_INFINITY; }, 2));
    var streamRunning = false;
    var captureOption = captureDevices.get(adapter.uuid);
    lifecycle.ownAll(captureOption.match({
        none: function () { return lib_std_1.Terminable.Empty; },
        some: function (capture) {
            if (!(0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio)) {
                return lib_std_1.Terminable.Empty;
            }
            var meterLifeCycle = lifecycle.own(new lib_std_1.Terminator());
            var connectMeter = function () {
                streamRunning = false;
                meterLifeCycle.terminate();
                capture.outputNode.ifSome(function (outputNode) {
                    var numberOfChannels = capture.effectiveChannelCount;
                    var meterWorklet = service.audioWorklets.createMeter(numberOfChannels);
                    outputNode.connect(meterWorklet);
                    streamRunning = true;
                    meterLifeCycle.ownAll(meterWorklet.subscribe(function (_a) {
                        var _b;
                        var peak = _a.peak;
                        peaksInDb[0] = (0, lib_dsp_1.gainToDb)(peak[0]);
                        peaksInDb[1] = (0, lib_dsp_1.gainToDb)((_b = peak[1]) !== null && _b !== void 0 ? _b : peak[0]);
                    }), meterWorklet);
                });
            };
            return lib_std_1.Terminable.many(capture.stream.catchupAndSubscribe(function () { return connectMeter(); }), capture.captureBox.requestChannels.subscribe(function () { return connectMeter(); }));
        }
    }), project.liveStreamReceiver.subscribeFloats(adapter.address, function (values) {
        var _a;
        if (streamRunning) {
            return;
        }
        peaksInDb[0] = (0, lib_dsp_1.gainToDb)(values[0]);
        peaksInDb[1] = (0, lib_dsp_1.gainToDb)((_a = values[1]) !== null && _a !== void 0 ? _a : values[0]);
    }));
    return (<div className={className}>
            <header>
                <div className="channel-mix">
                    {volumeControl}
                    {panningControl}
                </div>
                <div className="channel-isolation">
                    {muteControl}
                    {soloControl}
                </div>
                <div className="channel-capture">
                    {captureOption.ifSome(function (capture) {
            var button = (<Button_1.Button lifecycle={lifecycle} onClick={function (_a) {
                var shiftKey = _a.shiftKey;
                return captureDevices.setArm(capture, !shiftKey);
            }} appearance={{ activeColor: studio_enums_1.Colors.red, framed: true }}>
                                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Record}/>
                            </Button_1.Button>);
            lifecycle.ownAll(TextTooltip_1.TextTooltip.default(button, function () { return capture.label; }), capture.armed.catchupAndSubscribe(function (owner) {
                return button.classList.toggle("active", owner.getValue());
            }));
            return button;
        })}
                </div>
            </header>
            <HorizontalPeakMeter_1.HorizontalPeakMeter lifecycle={lifecycle} peaksInDb={peaksInDb}/>
        </div>);
};
exports.AudioUnitChannelControls = AudioUnitChannelControls;
