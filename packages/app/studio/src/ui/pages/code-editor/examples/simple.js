"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var openDAW = (0, lib_std_1.InaccessibleProperty)("Not to be executed.");
// openDAW script editor (very early preview - under heavy construction)
var project = openDAW.newProject("Retro Game");
project.bpm = 125.0;
project.output.volume = -6.0;
var notes = [];
for (var i = 0; i < 16; i++) {
    notes.push({ position: i * lib_dsp_1.PPQN.SemiQuaver, pitch: 60 + lib_dsp_1.Chord.Major[i % lib_dsp_1.Chord.Major.length] });
}
project
    .addInstrumentUnit("Vaporisateur")
    .addNoteTrack()
    .addRegion({ duration: lib_dsp_1.PPQN.Bar * 4, loopDuration: lib_dsp_1.PPQN.Bar })
    .addEvents(notes);
project.openInStudio();
