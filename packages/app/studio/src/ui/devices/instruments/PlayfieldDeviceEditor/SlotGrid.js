"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotGrid = void 0;
var SlotGrid_sass_inline_1 = require("./SlotGrid.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var SlotState_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotState");
var Slot_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/Slot");
var OctaveSelector_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/OctaveSelector");
var className = lib_dom_1.Html.adoptStyleSheet(SlotGrid_sass_inline_1.default, "SlotGrid");
var SlotGrid = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, octave = _a.octave;
    var project = service.project;
    var noteReceiver = lifecycle.own(new studio_adapters_1.NoteStreamReceiver(project.liveStreamReceiver, adapter.audioUnitBoxAdapter().address));
    var slotStates = lib_std_1.Arrays.create(function () { return new lib_std_1.DefaultObservableValue(SlotState_1.SlotState.Idle); }, 128);
    var slotValues = lib_std_1.Arrays.create(function () { return new lib_std_1.DefaultObservableValue(lib_std_1.Option.None); }, 12);
    var slotViews = slotValues.map(function (sample, semitone) { return (<Slot_1.Slot lifecycle={lifecycle} service={service} noteReceiver={noteReceiver} adapter={adapter} sample={sample} octave={octave} semitone={semitone}/>); });
    var slotUpdater = function () {
        var _a, _b;
        var offset = octave.getValue() * 12;
        for (var semitone = 0; semitone < 12; semitone++) {
            var note = offset + semitone;
            if (note < 128) {
                var sample = adapter.samples.getAdapterByIndex(note);
                var slotValue = slotValues[semitone];
                if (((_a = slotValue.getValue().unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.address.toString()) !== ((_b = sample.unwrapOrNull()) === null || _b === void 0 ? void 0 : _b.address.toString())) {
                    slotValue.setValue(sample);
                }
                slotViews[semitone].classList.remove("hidden");
            }
            else {
                slotViews[semitone].classList.add("hidden");
            }
        }
    };
    var updateSlotState = function () {
        var index = 0 | 0;
        adapter.samples.adapters().forEach(function (_a) {
            var indexField = _a.indexField;
            var toIndex = indexField.getValue();
            while (index < toIndex && index < 128) {
                slotStates[index].setValue(noteReceiver.isNoteOn(index) ? SlotState_1.SlotState.Playing : SlotState_1.SlotState.Idle);
                index++;
            }
            if (index === toIndex && index < 128) {
                slotStates[index].setValue(noteReceiver.isNoteOn(index) ? SlotState_1.SlotState.Playing : SlotState_1.SlotState.Busy);
                index++;
            }
        });
        while (index < 128) {
            slotStates[index].setValue(noteReceiver.isNoteOn(index) ? SlotState_1.SlotState.Playing : SlotState_1.SlotState.Idle);
            index++;
        }
    };
    var updateSlots = function () {
        updateSlotState();
        slotUpdater();
    };
    lifecycle.ownAll(octave.subscribe(slotUpdater), adapter.samples.catchupAndSubscribe({
        onAdd: updateSlots,
        onRemove: updateSlots,
        onReorder: updateSlots
    }), noteReceiver.subscribe(updateSlotState));
    var octaveSelectors = lib_std_1.Arrays.create(function (index) { return (<OctaveSelector_1.OctaveSelector lifecycle={lifecycle} states={slotStates.slice(index * 12, (index + 1) * 12)} octave={octave} octaveIndex={index}/>); }, 11).reverse();
    return (<div className={className}>
            <div className="octave-selectors">
                {octaveSelectors}
            </div>
            <div className="slots">
                {slotViews}
            </div>
        </div>);
};
exports.SlotGrid = SlotGrid;
