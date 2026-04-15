"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusySlot = void 0;
var BusySlot_sass_inline_1 = require("./BusySlot.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_core_1 = require("@opendaw/studio-core");
var SlotUtils_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotUtils");
var Icon_1 = require("@/ui/components/Icon");
var Checkbox_1 = require("@/ui/components/Checkbox");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var SlotDragAndDrop_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotDragAndDrop");
var NoteLabel_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/NoteLabel");
var debug_1 = require("@/ui/menu/debug");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var className = lib_dom_1.Html.adoptStyleSheet(BusySlot_sass_inline_1.default, "BusySlot");
var BusySlot = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, sampleSelector = _a.sampleSelector, sample = _a.sample, octave = _a.octave, semitone = _a.semitone;
    var _b = service.project, editing = _b.editing, engine = _b.engine, userEditingManager = _b.userEditingManager;
    var labelName = (<div className="label"/>);
    var muteValue = new lib_std_1.DefaultObservableValue(false);
    var soloValue = new lib_std_1.DefaultObservableValue(false);
    var excludeValue = new lib_std_1.DefaultObservableValue(false);
    var waveform = (<canvas />);
    var waveformPainter = lifecycle.own(new studio_core_1.CanvasPainter(waveform, function (painter) { return SlotUtils_1.SlotUtils.waveform(painter, sample, semitone); }));
    var playbackCanvas = (<canvas />);
    var playbackContext = (0, lib_std_1.asDefined)(playbackCanvas.getContext("2d"));
    var header = (<header>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Play} className="icon-play"/>
            {labelName}
        </header>);
    var _c = sample.namedParameter, mute = _c.mute, solo = _c.solo, exclude = _c.exclude;
    var muteWrapper = EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, mute);
    var soloWrapper = EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, solo);
    var excludeWrapper = EditWrapper_ts_1.EditWrapper.forAutomatableParameter(editing, exclude);
    var exclusionGroup = (<div className="checkboxes">
            <Checkbox_1.Checkbox lifecycle={lifecycle} model={muteValue} appearance={{ activeColor: studio_enums_1.Colors.red, framed: true, tooltip: "Mute sample" }}>
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Mute}/>
            </Checkbox_1.Checkbox>
            <Checkbox_1.Checkbox lifecycle={lifecycle} model={soloValue} appearance={{ activeColor: studio_enums_1.Colors.yellow, framed: true, tooltip: "Solo sample" }}>
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Solo}/>
            </Checkbox_1.Checkbox>
            <Checkbox_1.Checkbox lifecycle={lifecycle} model={excludeValue} className="exclude" appearance={{ activeColor: studio_enums_1.Colors.orange, framed: true, tooltip: "Exclude group" }}>
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Exclude}/>
            </Checkbox_1.Checkbox>
        </div>);
    var iconEdit = (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.Focus} className="edit"/>);
    var element = (<div className={className} tabIndex={-1} data-slot-index={octave.getValue() * 12 + semitone}>
            {header}
            <div className="waveform">
                {waveform}
                {playbackCanvas}
            </div>
            <footer>
                {iconEdit}
                <NoteLabel_1.NoteLabel lifecycle={lifecycle} octave={octave} semitone={semitone}/>
                <div style={{ flex: "1" }}/>
                {exclusionGroup}
            </footer>
        </div>);
    var noteLifeTime = lib_std_1.Terminable.Empty;
    var fileHandlerSubscription = lib_std_1.Terminable.Empty;
    var audioEffectsField = sample.audioEffectsField.pointerHub;
    lifecycle.ownAll(connectBoolean(muteValue, muteWrapper), connectBoolean(soloValue, soloWrapper), connectBoolean(excludeValue, excludeWrapper), TextTooltip_1.TextTooltip.default(iconEdit, function () { return "Edit Sample"; }), audioEffectsField.catchupAndSubscribe({
        onAdded: function () { return iconEdit.classList.toggle("has-effects", audioEffectsField.nonEmpty()); },
        onRemoved: function () { return iconEdit.classList.toggle("has-effects", audioEffectsField.nonEmpty()); }
    }), sample.box.file.catchupAndSubscribe(function (pointer) {
        fileHandlerSubscription.terminate();
        if (pointer.isEmpty()) {
            return;
        }
        sample.file().ifSome(function (file) {
            fileHandlerSubscription = lib_std_1.Terminable.many(file.getOrCreateLoader().subscribe(function (state) {
                if (state.type === "loaded") {
                    labelName.textContent = file.box.fileName.getValue();
                    waveformPainter.requestUpdate();
                }
                else if (state.type === "progress") {
                    labelName.textContent = "Loading... (".concat(Math.round(state.progress * 100.0), "%)");
                }
                else if (state.type === "error") {
                    labelName.textContent = state.reason;
                }
            }), file.box.fileName.subscribe(function () { return labelName.textContent = file.box.fileName.getValue(); }));
        });
    }), service.project.liveStreamReceiver.subscribeFloats(sample.address, function (array) { return sample.file().flatMap(function (file) { return file.data; })
        .match({
        none: function () {
            playbackCanvas.width = playbackCanvas.clientWidth;
            playbackCanvas.height = playbackCanvas.clientHeight;
        },
        some: function (data) {
            playbackCanvas.width = playbackCanvas.clientWidth;
            playbackCanvas.height = playbackCanvas.clientHeight;
            playbackContext.fillStyle = "rgba(0, 0, 0, 0.25)";
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var position = array_1[_i];
                if (position === -1) {
                    break;
                }
                var x = position / data.numberOfFrames * playbackCanvas.width;
                playbackContext.fillRect(x - 1, 0, 3, playbackCanvas.height);
            }
            playbackContext.fillStyle = SlotUtils_1.SlotUtils.color(semitone);
            for (var _a = 0, array_2 = array; _a < array_2.length; _a++) {
                var position = array_2[_a];
                if (position === -1) {
                    break;
                }
                var x = position / data.numberOfFrames * playbackCanvas.width;
                playbackContext.fillRect(x, 0, 1, playbackCanvas.height);
            }
        }
    }); }), octave.catchupAndSubscribe(function (owner) {
        var slotIndex = owner.getValue() * 12 + semitone;
        element.setAttribute("data-slot-index", String(slotIndex));
    }), SlotDragAndDrop_1.SlotDragAndDrop.installSource({
        element: element,
        sample: sample,
        getSlotIndex: function () { return octave.getValue() * 12 + semitone; }
    }), SlotDragAndDrop_1.SlotDragAndDrop.installTarget({
        element: element,
        project: service.project,
        getSlotIndex: function () { return octave.getValue() * 12 + semitone; }
    }), lib_dom_1.Events.subscribe(iconEdit, "click", function () { return userEditingManager.audioUnit.edit(sample.box); }), lib_dom_1.Events.subscribe(header, "pointerdown", function (event) {
        if (event.ctrlKey) {
            return;
        }
        noteLifeTime = studio_adapters_1.NoteLifeCycle.start(function (signal) {
            return engine.noteSignal(signal);
        }, adapter.audioUnitBoxAdapter().uuid, sample.indexField.getValue());
    }), lib_dom_1.Events.subscribe(header, "pointerup", function () { return noteLifeTime.terminate(); }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        if (lib_dom_1.Keyboard.isDelete(event)) {
            sampleSelector.replaceSample(lib_std_1.Option.None);
        }
    }), studio_core_1.ContextMenu.subscribe(element, function (collector) {
        collector.addItems(studio_core_1.MenuItem.default({ label: "Browse Sample..." })
            .setTriggerProcedure(function () { return sampleSelector.browse(); }), studio_core_1.MenuItem.default({ label: "Remove Sample" })
            .setTriggerProcedure(function () { return sampleSelector.replaceSample(lib_std_1.Option.None); }), studio_core_1.MenuItem.default({ label: "Reset Parameters" })
            .setTriggerProcedure(function () { return editing.modify(function () { return sample.resetParameters(); }); }), resetBooleanItem(editing, adapter, "mute", "Reset Mute"), resetBooleanItem(editing, adapter, "solo", "Reset Solo"), resetBooleanItem(editing, adapter, "exclude", "Reset Exclude"), debug_1.DebugMenus.debugBox(sample.box));
    }), sampleSelector.configureDrop(element), {
        terminate: function () {
            noteLifeTime.terminate();
            fileHandlerSubscription.terminate();
        }
    });
    return element;
};
exports.BusySlot = BusySlot;
var connectBoolean = function (value, wrapper) {
    value.setValue(wrapper.getValue());
    return lib_std_1.Terminable.many(value.subscribe(function (owner) { return wrapper.setValue(owner.getValue()); }), wrapper.subscribe(function (owner) { return value.setValue(owner.getValue()); }));
};
var resetBooleanItem = function (editing, adapter, key, label) {
    return studio_core_1.MenuItem.default({
        label: label,
        selectable: adapter.samples.adapters().some(function (adapter) { return adapter.namedParameter[key].getValue(); })
    }).setTriggerProcedure(function () { return editing.modify(function () { return adapter.samples.adapters()
        .filter(function (adapter) { return adapter.namedParameter[key].getValue(); })
        .forEach(function (adapter) { return adapter.namedParameter[key].setValue(false); }); }); });
};
