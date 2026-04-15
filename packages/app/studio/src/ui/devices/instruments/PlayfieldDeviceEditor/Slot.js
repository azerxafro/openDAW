"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var SampleSelector_1 = require("@/ui/devices/SampleSelector");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var EmptySlot_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/EmptySlot");
var BusySlot_1 = require("./BusySlot");
var Slot = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, noteReceiver = _a.noteReceiver, adapter = _a.adapter, sample = _a.sample, octave = _a.octave, semitone = _a.semitone;
    var sampleSelector = new SampleSelector_1.SampleSelector(service, {
        hasSample: function () { return sample.getValue().mapOr(function (sample) { return sample.box.file.nonEmpty(); }, false); },
        replace: function (replacement) {
            sample.getValue().match({
                none: function () { return replacement
                    .ifSome(function (file) { return studio_boxes_1.PlayfieldSampleBox.create(service.project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.file.refer(file);
                    box.device.refer(adapter.box.samples);
                    box.index.setValue(octave.getValue() * 12 + semitone);
                }); }); },
                some: function (_a) {
                    var box = _a.box;
                    return SampleSelector_1.SampleSelectStrategy.changePointer(box.file, replacement);
                }
            });
        }
    });
    var sampleLifecycle = lifecycle.own(new lib_std_1.Terminator());
    var group = <div style={{
            display: "content",
            gridRow: String(3 - Math.floor(semitone / 4)),
            gridColumn: String(semitone % 4 + 1)
        }}/>;
    lifecycle.ownAll(sample.catchupAndSubscribe(function (owner) {
        sampleLifecycle.terminate();
        (0, lib_jsx_1.replaceChildren)(group, owner.getValue().match({
            none: function () { return (<EmptySlot_1.EmptySlot lifecycle={sampleLifecycle} service={service} noteReceiver={noteReceiver} sampleSelector={sampleSelector} octave={octave} semitone={semitone}/>); },
            some: function (sample) { return (<BusySlot_1.BusySlot lifecycle={sampleLifecycle} service={service} adapter={adapter} sampleSelector={sampleSelector} sample={sample} octave={octave} semitone={semitone}/>); }
        }));
    }));
    return group;
};
exports.Slot = Slot;
