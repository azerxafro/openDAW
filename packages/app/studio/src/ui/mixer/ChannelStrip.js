"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelStrip = void 0;
var ChannelStrip_sass_inline_1 = require("./ChannelStrip.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var VolumeSlider_tsx_1 = require("@/ui/components/VolumeSlider.tsx");
var PeakMeter_tsx_1 = require("@/ui/components/PeakMeter.tsx");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var Knob_tsx_1 = require("@/ui/components/Knob.tsx");
var RelativeUnitValueDragging_tsx_1 = require("@/ui/wrapper/RelativeUnitValueDragging.tsx");
var configs_1 = require("@/ui/configs");
var studio_core_1 = require("@opendaw/studio-core");
var AuxSendGroup_tsx_1 = require("@/ui/mixer/AuxSendGroup.tsx");
var DblClckTextInput_tsx_1 = require("@/ui/wrapper/DblClckTextInput.tsx");
var ChannelOutputSelector_tsx_1 = require("@/ui/mixer/ChannelOutputSelector.tsx");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var debug_ts_1 = require("@/ui/menu/debug.ts");
var AutomationControl_1 = require("../components/AutomationControl");
var DragAndDrop_1 = require("../DragAndDrop");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var AudioOutputSelector_1 = require("./AudioOutputSelector");
var className = lib_dom_1.Html.adoptStyleSheet(ChannelStrip_sass_inline_1.default, "ChannelStrip");
var ChannelStrip = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, compact = _a.compact;
    var _b = adapter.namedParameter, mute = _b.mute, panning = _b.panning, solo = _b.solo, volume = _b.volume;
    var project = service.project;
    var editing = project.editing, mixer = project.mixer, rootBoxAdapter = project.rootBoxAdapter, liveStreamReceiver = project.liveStreamReceiver, midiLearning = project.midiLearning;
    var isBus = adapter.type === studio_enums_1.AudioUnitType.Bus;
    var isAux = adapter.type === studio_enums_1.AudioUnitType.Aux;
    var isOutput = adapter.type === studio_enums_1.AudioUnitType.Output;
    var inputLabel = lifecycle.own(lib_jsx_1.Inject.value("No Input"));
    var peaks = new Float32Array(2);
    var volumeLabel = <div className="value-display"/>;
    var maxPeakLabel = <div className="value-display peak valid">-∞</div>;
    var updateVolumeLabel = function () { return volumeLabel.textContent = volume.stringMapping.x(volume.getControlledValue()).value; };
    updateVolumeLabel();
    var permanentPeak = Number.NEGATIVE_INFINITY;
    lifecycle.own(liveStreamReceiver.subscribeFloats(adapter.address, function (array) {
        peaks[0] = (0, lib_dsp_1.gainToDb)(array[0]);
        peaks[1] = (0, lib_dsp_1.gainToDb)(array[1]);
        var maxPeak = Math.max.apply(Math, peaks);
        if (permanentPeak <= maxPeak) {
            permanentPeak = maxPeak;
            maxPeakLabel.textContent = Number.isFinite(permanentPeak) && permanentPeak > -96 ? permanentPeak.toFixed(1) : "-∞";
            maxPeakLabel.classList.toggle("valid", maxPeak <= 0.0);
            maxPeakLabel.classList.toggle("clipping", maxPeak > 0.0);
        }
    }));
    var tracks = adapter.tracks;
    var volumeControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={volume}>
            <VolumeSlider_tsx_1.VolumeSlider lifecycle={lifecycle} editing={editing} parameter={volume}/>
        </AutomationControl_1.AutomationControl>);
    var panningControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={panning}>
            <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={panning} options={configs_1.SnapCenter}>
                <Knob_tsx_1.Knob lifecycle={lifecycle} value={panning} anchor={0.5}/>
            </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
        </AutomationControl_1.AutomationControl>);
    var muteModel = EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, mute);
    var soloModel = EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, solo);
    var muteControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={mute}>
            <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={muteModel} className="mute" appearance={{ color: studio_enums_1.Colors.shadow, activeColor: studio_enums_1.Colors.orange, framed: true }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Mute}/>
            </Checkbox_tsx_1.Checkbox>
        </AutomationControl_1.AutomationControl>);
    var soloControl = (<AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={solo}>
            <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={soloModel} className="solo" appearance={{ color: studio_enums_1.Colors.shadow, activeColor: studio_enums_1.Colors.yellow, framed: true }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Solo}/>
            </Checkbox_tsx_1.Checkbox>
        </AutomationControl_1.AutomationControl>);
    var lockIcon = <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Lock} className="lock-icon"/>;
    lockIcon.style.display = adapter.isInstrument && project.audioUnitFreeze.isFrozen(adapter) ? "" : "none";
    var iconElement = <div className="icon-container" style={{ cursor: adapter.isOutput ? "auto" : "grab" }}>
        <Icon_tsx_1.IconCartridge lifecycle={lifecycle} symbol={adapter.input.iconValue} style={{
            fontSize: "2em",
            alignSelf: "center",
            justifySelf: "center",
            marginTop: "0.5em",
            marginBottom: "0.5em",
            color: studio_adapters_1.ColorCodes.forAudioType(adapter.type).toString()
        }}/>
        {adapter.isInstrument && lockIcon}
    </div>;
    var classList = lib_dom_1.Html.buildClassList(className, isAux && "aux", isBus && "bus", isOutput && "output", compact && "compact");
    var peakMeter = (<PeakMeter_tsx_1.PeakMeter lifecycle={lifecycle} peaks={peaks}/>);
    var element = (<div className={classList} data-drag>
            {!compact && (<lib_jsx_1.Frag>
                    {iconElement}
                    <DblClckTextInput_tsx_1.DblClckTextInput resolversFactory={function () {
                var resolvers = Promise.withResolvers();
                resolvers.promise.then(function (value) { return editing.modify(function () { return adapter.input.label = value; }); }, lib_std_1.EmptyExec);
                return resolvers;
            }} provider={function () { return ({ value: adapter.input.label.unwrap(), unit: "" }); }}>
                        <h5 className="input">{inputLabel}</h5>
                    </DblClckTextInput_tsx_1.DblClckTextInput>
                    <AuxSendGroup_tsx_1.AuxSendGroup lifecycle={lifecycle} project={project} audioUnitAdapter={adapter}/>
                    {isOutput
                ? <AudioOutputSelector_1.AudioOutputSelector lifecycle={lifecycle} output={service.audioDevices}/>
                : <ChannelOutputSelector_tsx_1.ChannelOutputSelector lifecycle={lifecycle} project={project} adapter={adapter}/>}
                    {panningControl}
                </lib_jsx_1.Frag>)}
            <div className="twin-layout volume">
                {volumeLabel}
                {maxPeakLabel}
                {volumeControl}
                {peakMeter}
            </div>
            <div className="twin-layout mute-solo">
                {muteControl}
                {!isOutput && soloControl}
            </div>
        </div>);
    lifecycle.ownAll(mixer.registerChannelStrip(adapter, {
        silent: function (value) { return peakMeter.classList.toggle("silent", value); }
    }), studio_core_1.ContextMenu.subscribe(element, function (collector) {
        if (adapter.isInstrument) {
            var isFrozen = project.audioUnitFreeze.isFrozen(adapter);
            collector.addItems(studio_core_1.MenuItem.default({
                label: "Freeze AudioUnit",
                hidden: isFrozen
            }).setTriggerProcedure(function () { return project.audioUnitFreeze.freeze(adapter); }), studio_core_1.MenuItem.default({
                label: "Unfreeze AudioUnit",
                hidden: !isFrozen
            }).setTriggerProcedure(function () { return project.audioUnitFreeze.unfreeze(adapter); }));
        }
        if (!isOutput) {
            collector.addItems(studio_core_1.MenuItem.default({ label: "Delete '".concat(adapter.input.label.unwrapOrElse("Untitled"), "'") })
                .setTriggerProcedure(function () { return editing.modify(function () { return project.api.deleteAudioUnit(adapter.box); }); }));
        }
        collector.addItems(studio_core_1.MenuItem.default({
            label: "Reset Mute",
            selectable: rootBoxAdapter.audioUnits.adapters().some(function (adapter) { return adapter.box.mute.getValue(); })
        }).setTriggerProcedure(function () { return editing.modify(function () { return rootBoxAdapter.audioUnits.adapters()
            .forEach(function (adapter) { return adapter.box.mute.setValue(false); }); }); }), studio_core_1.MenuItem.default({
            label: "Reset Solo",
            selectable: rootBoxAdapter.audioUnits.adapters().some(function (adapter) { return adapter.box.solo.getValue(); })
        }).setTriggerProcedure(function () { return editing.modify(function () { return rootBoxAdapter.audioUnits.adapters()
            .forEach(function (adapter) { return adapter.box.solo.setValue(false); }); }); }), debug_ts_1.DebugMenus.debugBox(adapter.box, false));
    }), adapter.input.catchupAndSubscribeLabelChange(function (option) { return inputLabel.value = option.unwrapOrElse("No Input"); }), service.subscribeSignal(function () { return permanentPeak = Number.NEGATIVE_INFINITY; }, "reset-peaks"), lib_dom_1.Events.subscribe(maxPeakLabel, "pointerdown", function (event) {
        service.resetPeaks();
        event.stopPropagation();
        event.preventDefault();
    }), TextTooltip_1.TextTooltip.default(maxPeakLabel, function () { return "Click to reset"; }), adapter.isOutput
        ? lib_std_1.Terminable.Empty
        : DragAndDrop_1.DragAndDrop.installSource(iconElement, function () { return ({
            uuid: lib_std_1.UUID.toString(adapter.uuid),
            type: "channelstrip",
            start_index: adapter.indexField.getValue()
        }); }, element), volume.subscribe(updateVolumeLabel), adapter.isInstrument
        ? project.audioUnitFreeze.subscribe(function (uuid) {
            if (lib_std_1.UUID.equals(uuid, adapter.uuid)) {
                lockIcon.style.display = project.audioUnitFreeze.isFrozen(adapter) ? "" : "none";
            }
        })
        : lib_std_1.Terminable.Empty);
    return element;
};
exports.ChannelStrip = ChannelStrip;
