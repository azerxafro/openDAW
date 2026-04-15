"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var openDAW = (0, lib_std_1.InaccessibleProperty)("Not to be executed.");
// openDAW script editor (very early preview - under heavy construction)
// Stress Test - Complex Multi-Track Production
var project = openDAW.newProject("Ultimate Complexity Test");
project.bpm = 140.0;
project.timeSignature = { numerator: 7, denominator: 8 }; // Odd time signature
project.output.volume = -3.0;
// ========== ROUTING SETUP ==========
// Master group for all instruments
var masterGroup = project.addGroupUnit({ label: "Master Bus" });
masterGroup.volume = -2.0;
masterGroup.panning = 0.0;
// Sub-groups
var synthGroup = project.addGroupUnit({ label: "Synths" });
synthGroup.output = masterGroup;
synthGroup.volume = -1.0;
var rhythmGroup = project.addGroupUnit({ label: "Rhythm" });
rhythmGroup.output = masterGroup;
rhythmGroup.volume = 0.0;
// Auxiliary effects
var delayFx = project.addAuxUnit({ label: "Delay" });
delayFx.addAudioEffect("delay", {
    delay: 6, // 1/8 note
    feedback: 0.6,
    cross: 0.3,
    wet: 0.8,
    dry: 0.0
});
delayFx.output = masterGroup;
var slapbackDelay = project.addAuxUnit({ label: "Slapback" });
slapbackDelay.addAudioEffect("delay", {
    delay: 10, // 1/16 note
    feedback: 0.2,
    wet: 1.0,
    dry: 0.0
});
slapbackDelay.output = masterGroup;
// ========== BASS SYNTH ==========
var bass = project.addInstrumentUnit("Vaporisateur");
bass.output = rhythmGroup;
bass.volume = -6.0;
bass.panning = 0.0;
// Bass MIDI effects chain
var bassOctaveDown = bass.addMIDIEffect("pitch", { octaves: -2, label: "Sub Bass" });
bass.addMIDIEffect("pitch", { cents: -5, label: "Detune" });
// Bass send to slapback
bass.addSend(slapbackDelay, { amount: -12.0, pan: 0.0, mode: "post" });
// Bass note pattern (complex rhythm in 7/8)
{
    var track = bass.addNoteTrack({ enabled: true });
    var region_1 = track.addRegion({
        position: 0,
        duration: lib_dsp_1.PPQN.Bar * 8,
        loopDuration: lib_dsp_1.PPQN.Bar * 2,
        label: "Bass Pattern"
    });
    var eighth = lib_dsp_1.PPQN.Bar / 8;
    var sixteenth = lib_dsp_1.PPQN.SemiQuaver;
    // 7/8 bass pattern
    var bassPattern = [
        { t: 0, p: 36, d: eighth * 2, v: 0.9 },
        { t: eighth * 2, p: 36, d: eighth, v: 0.7 },
        { t: eighth * 3, p: 38, d: sixteenth, v: 0.6 },
        { t: eighth * 3 + sixteenth, p: 36, d: sixteenth, v: 0.7 },
        { t: eighth * 4, p: 41, d: eighth, v: 0.8 },
        { t: eighth * 5, p: 36, d: eighth, v: 0.85 },
        { t: eighth * 6, p: 38, d: eighth, v: 0.75 }
    ];
    bassPattern.forEach(function (note) {
        region_1.addEvent({
            position: note.t,
            pitch: note.p,
            duration: note.d,
            velocity: note.v
        });
    });
}
// Bass octave automation
{
    var track = bass.addValueTrack(bassOctaveDown, "octaves");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 8,
        loopDuration: lib_dsp_1.PPQN.Bar * 4
    });
    region.addEvent({ position: 0, value: 0.0, interpolation: lib_dsp_1.Interpolation.None }); // -2 octaves
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 2, value: 0.5, interpolation: lib_dsp_1.Interpolation.Linear }); // -1 octave
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 4, value: 0.0 }); // back to -2
}
// ========== LEAD SYNTH ==========
var lead = project.addInstrumentUnit("Nano");
lead.output = synthGroup;
lead.volume = -9.0;
lead.panning = 0.2;
lead.addMIDIEffect("pitch", { octaves: 1, cents: 7, label: "Octave Up Detune" });
lead.addSend(delayFx, { amount: -9.0, pan: -0.5, mode: "post" });
// Lead melody with multiple regions
{
    var track = lead.addNoteTrack({ enabled: true });
    // First phrase
    var region1_1 = track.addRegion({
        position: lib_dsp_1.PPQN.Bar * 2,
        duration: lib_dsp_1.PPQN.Bar * 4,
        label: "Lead Phrase A"
    });
    var quarter = lib_dsp_1.PPQN.Bar / 4;
    var melody1 = [
        { t: 0, p: 72, d: quarter * 3, v: 0.8 },
        { t: quarter * 3, p: 74, d: quarter, v: 0.75 },
        { t: lib_dsp_1.PPQN.Bar, p: 76, d: quarter * 2, v: 0.85 },
        { t: lib_dsp_1.PPQN.Bar + quarter * 2, p: 74, d: quarter, v: 0.7 },
        { t: lib_dsp_1.PPQN.Bar + quarter * 3, p: 72, d: quarter, v: 0.75 },
        { t: lib_dsp_1.PPQN.Bar * 2, p: 69, d: lib_dsp_1.PPQN.Bar * 2, v: 0.9 }
    ];
    melody1.forEach(function (note) {
        region1_1.addEvent({
            position: note.t,
            pitch: note.p,
            duration: note.d,
            velocity: note.v,
            cents: Math.random() * 10 - 5 // Slight random detune
        });
    });
    // Second phrase (mirror of first)
    track.addRegion({
        position: lib_dsp_1.PPQN.Bar * 6,
        duration: lib_dsp_1.PPQN.Bar * 4,
        label: "Lead Phrase B",
        mirror: region1_1
    });
}
// Lead panning automation (complex curve)
{
    var track = lead.addValueTrack(lead, "panning");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 16,
        loopDuration: lib_dsp_1.PPQN.Bar * 4
    });
    region.addEvent({ position: 0, value: 0.7, interpolation: lib_dsp_1.Interpolation.Curve(0.8) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar, value: 0.3, interpolation: lib_dsp_1.Interpolation.Curve(0.2) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 2, value: 0.6, interpolation: lib_dsp_1.Interpolation.Curve(0.5) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 3, value: 0.4, interpolation: lib_dsp_1.Interpolation.Curve(0.7) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 4, value: 0.7 });
}
// ========== PAD SYNTH ==========
var pad = project.addInstrumentUnit("Vaporisateur");
pad.output = synthGroup;
pad.volume = -12.0;
pad.panning = -0.1;
pad.addSend(delayFx, { amount: -15.0, pan: 0.8, mode: "post" });
// Pad chords (long sustained)
{
    var track = pad.addNoteTrack({ enabled: true });
    var region_2 = track.addRegion({
        position: 0,
        duration: lib_dsp_1.PPQN.Bar * 16,
        label: "Pad Chords"
    });
    // Complex chord progression
    var chords = [
        { pos: 0, notes: [48, 52, 55, 60, 64], dur: lib_dsp_1.PPQN.Bar * 4 },
        { pos: lib_dsp_1.PPQN.Bar * 4, notes: [45, 48, 52, 57, 60], dur: lib_dsp_1.PPQN.Bar * 4 },
        { pos: lib_dsp_1.PPQN.Bar * 8, notes: [43, 47, 50, 55, 59], dur: lib_dsp_1.PPQN.Bar * 4 },
        { pos: lib_dsp_1.PPQN.Bar * 12, notes: [50, 53, 57, 62, 65], dur: lib_dsp_1.PPQN.Bar * 4 }
    ];
    chords.forEach(function (chord) {
        chord.notes.forEach(function (pitch, idx) {
            region_2.addEvent({
                position: chord.pos,
                pitch: pitch,
                duration: chord.dur - 100,
                velocity: 0.5 + (idx * 0.05)
            });
        });
    });
}
// Pad volume swells
{
    var track = pad.addValueTrack(pad, "volume");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 16,
        loopDuration: lib_dsp_1.PPQN.Bar * 4
    });
    region.addEvent({ position: 0, value: 0.1, interpolation: lib_dsp_1.Interpolation.Curve(0.3) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 2, value: 0.6, interpolation: lib_dsp_1.Interpolation.Curve(0.7) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 4, value: 0.1 });
}
// ========== ARPEGGIO SYNTH ==========
var arp = project.addInstrumentUnit("Playfield");
arp.output = synthGroup;
arp.volume = -10.0;
arp.panning = -0.3;
var arpPitch = arp.addMIDIEffect("pitch", { octaves: 2, label: "High Octave" });
arp.addSend(delayFx, { amount: -6.0, pan: -0.8, mode: "post" });
// Fast arpeggios
{
    var track = arp.addNoteTrack({ enabled: true });
    var region = track.addRegion({
        position: lib_dsp_1.PPQN.Bar * 4,
        duration: lib_dsp_1.PPQN.Bar * 8,
        loopDuration: lib_dsp_1.PPQN.Bar * 2,
        label: "Arp Pattern"
    });
    var sixteenth = lib_dsp_1.PPQN.SemiQuaver;
    var arpNotes = [60, 64, 67, 72, 67, 64];
    for (var bar = 0; bar < 2; bar++) {
        for (var i = 0; i < 16; i++) {
            var noteIndex = i % arpNotes.length;
            region.addEvent({
                position: bar * lib_dsp_1.PPQN.Bar + i * sixteenth,
                pitch: arpNotes[noteIndex],
                duration: sixteenth * 0.7,
                velocity: i % 4 === 0 ? 0.8 : 0.6
            });
        }
    }
}
// Arp octave modulation
{
    var track = arp.addValueTrack(arpPitch, "octaves");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 8,
        loopDuration: lib_dsp_1.PPQN.Bar * 2
    });
    region.addEvent({ position: 0, value: 1.0, interpolation: lib_dsp_1.Interpolation.None }); // 2 octaves
    region.addEvent({ position: lib_dsp_1.PPQN.Bar, value: 0.5, interpolation: lib_dsp_1.Interpolation.None }); // 1 octave
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 2, value: 1.0 });
}
// ========== PERCUSSION SYNTH ==========
var drums = project.addInstrumentUnit("Nano");
drums.output = rhythmGroup;
drums.volume = -4.0;
drums.panning = 0.0;
drums.addSend(slapbackDelay, { amount: -18.0, pan: 0.3, mode: "post" });
// Drum pattern
{
    var track = drums.addNoteTrack({ enabled: true });
    var region_3 = track.addRegion({
        position: 0,
        duration: lib_dsp_1.PPQN.Bar * 16,
        loopDuration: lib_dsp_1.PPQN.Bar,
        label: "Drum Loop"
    });
    var sixteenth_1 = lib_dsp_1.PPQN.SemiQuaver;
    var eighth = lib_dsp_1.PPQN.Bar / 8;
    // Kick pattern (7/8 time)
    var kickPositions = [0, eighth * 2, eighth * 4, eighth * 6];
    kickPositions.forEach(function (pos) {
        region_3.addEvent({ position: pos, pitch: 36, duration: sixteenth_1, velocity: 0.95 });
    });
    // Snare pattern
    var snarePositions = [eighth * 2, eighth * 5];
    snarePositions.forEach(function (pos) {
        region_3.addEvent({ position: pos, pitch: 38, duration: sixteenth_1, velocity: 0.9 });
    });
    // Hi-hats (every 16th)
    for (var i = 0; i < 14; i++) {
        region_3.addEvent({
            position: i * sixteenth_1,
            pitch: 42,
            duration: sixteenth_1 * 0.5,
            velocity: i % 4 === 0 ? 0.8 : 0.5
        });
    }
}
// ========== MASTER GROUP AUTOMATION ==========
{
    var track = masterGroup.addValueTrack(masterGroup, "volume");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 16
    });
    // Build-up and breakdown
    region.addEvent({ position: 0, value: 0.3, interpolation: lib_dsp_1.Interpolation.Curve(0.2) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 4, value: 0.7, interpolation: lib_dsp_1.Interpolation.Linear });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 8, value: 0.9, interpolation: lib_dsp_1.Interpolation.Curve(0.8) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 12, value: 0.4, interpolation: lib_dsp_1.Interpolation.Curve(0.3) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 15, value: 0.1 });
}
// ========== DELAY FEEDBACK AUTOMATION ==========
{
    var delayEffect = delayFx.addAudioEffect("delay");
    var track = delayFx.addValueTrack(delayEffect, "feedback");
    var region = track.addRegion({
        duration: lib_dsp_1.PPQN.Bar * 16,
        loopDuration: lib_dsp_1.PPQN.Bar * 8
    });
    region.addEvent({ position: 0, value: 0.4, interpolation: lib_dsp_1.Interpolation.Linear });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 4, value: 0.8, interpolation: lib_dsp_1.Interpolation.Curve(0.6) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 6, value: 0.95, interpolation: lib_dsp_1.Interpolation.Curve(0.9) });
    region.addEvent({ position: lib_dsp_1.PPQN.Bar * 7, value: 0.3 });
}
// ========== MUTE/SOLO PATTERNS ==========
// Mute bass for breakdown
bass.mute = false;
lead.solo = false;
project.openInStudio();
