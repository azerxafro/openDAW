"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_std_1 = require("@opendaw/lib-std");
var studio_scripting_1 = require("@opendaw/studio-scripting");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var openDAW = (0, lib_std_1.InaccessibleProperty)("Not to be executed.");
var numberOfFrames = sampleRate * 3; // three seconds of audio
var f0 = 200.0;
var f1 = 4000.0;
var gain = (0, lib_dsp_1.dbToGain)(-6.0);
var audioData = lib_dsp_1.AudioData.create(sampleRate, numberOfFrames, 1);
var frames = audioData.frames[0];
for (var i = 0, phase = 0.0; i < numberOfFrames; i++) {
    frames[i] = Math.sin(phase * Math.PI * 2.0) * gain;
    var t = i / numberOfFrames;
    var freq = f0 * Math.pow(f1 / f0, 1.0 - Math.abs(2.0 * t - 1.0)); // up and down chirp
    phase += freq / sampleRate;
}
var sample = await openDAW.addSample(audioData, "Chirp 200-4000Hz");
var project = openDAW.newProject("Test Audio");
var tapeUnit = project.addInstrumentUnit("Tape");
var audioTrack = tapeUnit.addAudioTrack();
audioTrack.addRegion(sample, { playback: studio_scripting_1.AudioPlayback.NoWarp, duration: numberOfFrames / sampleRate });
project.openInStudio();
