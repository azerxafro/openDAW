"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var openDAW = (0, lib_std_1.InaccessibleProperty)("Not to be executed.");
// openDAW script editor (very early preview - under heavy construction)
// openDAW Beginner Example - Retro Game Music!
// A catchy 4-bar melody with chords and panning
// Composed by Claude.ai
// Create a new project
var project = openDAW.newProject("Retro Game");
project.bpm = 140.0;
project.output.volume = -6.0;
// ========== DELAY EFFECT ==========
var delay = project.addAuxUnit({ label: "Delay" });
delay.addAudioEffect("delay", {
    delay: 6, // 1/8 note
    feedback: 0.5,
    wet: 0.7
});
// ========== GAME SYNTH ==========
var synth = project.addInstrumentUnit("Vaporisateur");
synth.volume = -9.0;
synth.panning = 0.0;
synth.addSend(delay, { amount: -12.0 });
// ========== MELODY + CHORDS ==========
{
    var track = synth.addNoteTrack({ enabled: true });
    var region = track.addRegion({
        position: 0,
        duration: lib_dsp_1.PPQN.Bar * 4,
        label: "Melody & Chords"
    });
    var sixteenth = lib_dsp_1.PPQN.SemiQuaver;
    var eighth = lib_dsp_1.PPQN.Bar / 8;
    // Chord progression (sustained)
    var chords = [
        // Bar 1: C major
        { position: 0, pitch: 48, duration: lib_dsp_1.PPQN.Bar, velocity: 0.6 },
        { position: 0, pitch: 52, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        { position: 0, pitch: 55, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        // Bar 2: A minor
        { position: lib_dsp_1.PPQN.Bar, pitch: 45, duration: lib_dsp_1.PPQN.Bar, velocity: 0.6 },
        { position: lib_dsp_1.PPQN.Bar, pitch: 48, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        { position: lib_dsp_1.PPQN.Bar, pitch: 52, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        // Bar 3: F major
        { position: lib_dsp_1.PPQN.Bar * 2, pitch: 41, duration: lib_dsp_1.PPQN.Bar, velocity: 0.6 },
        { position: lib_dsp_1.PPQN.Bar * 2, pitch: 45, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        { position: lib_dsp_1.PPQN.Bar * 2, pitch: 48, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        // Bar 4: G major
        { position: lib_dsp_1.PPQN.Bar * 3, pitch: 43, duration: lib_dsp_1.PPQN.Bar, velocity: 0.6 },
        { position: lib_dsp_1.PPQN.Bar * 3, pitch: 47, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 },
        { position: lib_dsp_1.PPQN.Bar * 3, pitch: 50, duration: lib_dsp_1.PPQN.Bar, velocity: 0.55 }
    ];
    // Melody (bouncy and retro)
    var melody = [
        // Bar 1
        { position: 0, pitch: 72, duration: eighth, velocity: 0.85 },
        { position: eighth, pitch: 74, duration: sixteenth, velocity: 0.75 },
        { position: eighth + sixteenth, pitch: 72, duration: sixteenth, velocity: 0.75 },
        { position: eighth * 2, pitch: 67, duration: eighth, velocity: 0.8 },
        { position: eighth * 3, pitch: 69, duration: sixteenth, velocity: 0.75 },
        { position: eighth * 3 + sixteenth, pitch: 67, duration: sixteenth, velocity: 0.75 },
        { position: eighth * 4, pitch: 64, duration: eighth * 2, velocity: 0.85 },
        { position: eighth * 6, pitch: 67, duration: eighth, velocity: 0.8 },
        { position: eighth * 7, pitch: 69, duration: eighth, velocity: 0.8 },
        // Bar 2
        { position: lib_dsp_1.PPQN.Bar, pitch: 72, duration: eighth * 3, velocity: 0.9 },
        { position: lib_dsp_1.PPQN.Bar + eighth * 4, pitch: 69, duration: eighth, velocity: 0.75 },
        { position: lib_dsp_1.PPQN.Bar + eighth * 5, pitch: 67, duration: eighth, velocity: 0.75 },
        { position: lib_dsp_1.PPQN.Bar + eighth * 6, pitch: 65, duration: eighth * 2, velocity: 0.8 },
        // Bar 3
        { position: lib_dsp_1.PPQN.Bar * 2, pitch: 69, duration: sixteenth, velocity: 0.85 },
        { position: lib_dsp_1.PPQN.Bar * 2 + sixteenth, pitch: 72, duration: sixteenth, velocity: 0.8 },
        { position: lib_dsp_1.PPQN.Bar * 2 + sixteenth * 2, pitch: 74, duration: sixteenth, velocity: 0.8 },
        { position: lib_dsp_1.PPQN.Bar * 2 + sixteenth * 3, pitch: 76, duration: sixteenth, velocity: 0.85 },
        { position: lib_dsp_1.PPQN.Bar * 2 + eighth * 2, pitch: 77, duration: eighth * 2, velocity: 0.9 },
        { position: lib_dsp_1.PPQN.Bar * 2 + eighth * 4, pitch: 76, duration: eighth, velocity: 0.8 },
        { position: lib_dsp_1.PPQN.Bar * 2 + eighth * 5, pitch: 74, duration: eighth, velocity: 0.75 },
        { position: lib_dsp_1.PPQN.Bar * 2 + eighth * 6, pitch: 72, duration: eighth * 2, velocity: 0.8 },
        // Bar 4: Big finish
        { position: lib_dsp_1.PPQN.Bar * 3, pitch: 79, duration: sixteenth, velocity: 0.9 },
        { position: lib_dsp_1.PPQN.Bar * 3 + sixteenth, pitch: 77, duration: sixteenth, velocity: 0.85 },
        { position: lib_dsp_1.PPQN.Bar * 3 + sixteenth * 2, pitch: 76, duration: sixteenth, velocity: 0.8 },
        { position: lib_dsp_1.PPQN.Bar * 3 + sixteenth * 3, pitch: 74, duration: sixteenth, velocity: 0.8 },
        { position: lib_dsp_1.PPQN.Bar * 3 + eighth * 2, pitch: 72, duration: eighth * 6, velocity: 0.95 }
    ];
    region.addEvents(__spreadArray(__spreadArray([], chords, true), melody, true));
}
// ========== PANNING AUTOMATION ==========
{
    var track = synth.addValueTrack(synth, "panning");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 4
    });
    region.addEvents([
        { position: 0, value: 0.5, interpolation: lib_dsp_1.Interpolation.Linear },
        { position: lib_dsp_1.PPQN.Bar, value: 0.8, interpolation: lib_dsp_1.Interpolation.Linear },
        { position: lib_dsp_1.PPQN.Bar * 2, value: 0.2, interpolation: lib_dsp_1.Interpolation.Linear },
        { position: lib_dsp_1.PPQN.Bar * 3, value: 0.5 }
    ]);
}
project.openInStudio();
