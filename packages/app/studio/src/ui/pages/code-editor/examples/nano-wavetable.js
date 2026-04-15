"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SeededRandom_seed;
Object.defineProperty(exports, "__esModule", { value: true });
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var openDAW = (0, lib_std_1.InaccessibleProperty)("Not to be executed.");
var SeededRandom = /** @class */ (function () {
    function SeededRandom(seed) {
        _SeededRandom_seed.set(this, void 0);
        __classPrivateFieldSet(this, _SeededRandom_seed, seed, "f");
    }
    SeededRandom.prototype.next = function () {
        __classPrivateFieldSet(this, _SeededRandom_seed, (__classPrivateFieldGet(this, _SeededRandom_seed, "f") * 1664525 + 1013904223) | 0, "f");
        return ((__classPrivateFieldGet(this, _SeededRandom_seed, "f") >>> 0) / 4294967296);
    };
    return SeededRandom;
}());
_SeededRandom_seed = new WeakMap();
var WAVETABLE_SIZE = 1 << 18;
var BASE_FREQ = (0, lib_dsp_1.midiToHz)(60, 440.0);
var NUM_HARMONICS = 128;
var BANDWIDTH = 80.0;
var BW_SCALE = 1.6;
var fft = new lib_dsp_1.FFT(WAVETABLE_SIZE);
var real = new Float32Array(WAVETABLE_SIZE);
var imag = new Float32Array(WAVETABLE_SIZE);
var random = new SeededRandom(42);
function profile(fi, bwi) {
    var x = fi / bwi;
    return Math.exp(-x * x) / bwi;
}
for (var nh = 1; nh <= NUM_HARMONICS; nh++) {
    var amp = 1.0 / Math.pow(nh, 0.7);
    amp *= 1.0 + 1.5 * Math.exp(-Math.pow((nh - 6) / 4, 2));
    amp *= 1.0 + 0.8 * Math.exp(-Math.pow((nh - 15) / 6, 2));
    var bw_Hz = (Math.pow(2.0, BANDWIDTH / 1200.0) - 1.0) * BASE_FREQ * Math.pow(nh, BW_SCALE);
    var bwi = bw_Hz / (2.0 * sampleRate);
    var harmonic_freq = BASE_FREQ * nh;
    var center_bin = harmonic_freq / sampleRate * WAVETABLE_SIZE;
    var bin_range = Math.ceil(bwi * WAVETABLE_SIZE * 5.0);
    for (var i = -bin_range; i <= bin_range; i++) {
        var bin = Math.round(center_bin) + i;
        if (bin < 1 || bin >= WAVETABLE_SIZE / 2)
            continue;
        var freq_bin = bin / WAVETABLE_SIZE;
        var profile_val = profile(freq_bin - harmonic_freq / sampleRate, bwi);
        var phase = random.next() * 2.0 * Math.PI;
        var contribution = amp * profile_val;
        real[bin] += contribution * Math.cos(phase);
        imag[bin] += contribution * Math.sin(phase);
        real[WAVETABLE_SIZE - bin] = real[bin];
        imag[WAVETABLE_SIZE - bin] = -imag[bin];
    }
}
for (var i = 0; i < WAVETABLE_SIZE; i++) {
    imag[i] = -imag[i];
}
fft.process(real, imag);
var scale = 1.0 / WAVETABLE_SIZE;
for (var i = 0; i < WAVETABLE_SIZE; i++) {
    real[i] *= scale;
    imag[i] *= -scale;
}
var max = 0;
for (var i = 0; i < WAVETABLE_SIZE; i++) {
    var abs = Math.abs(real[i]);
    if (abs > max)
        max = abs;
}
var gain = 0.7 / max;
var audioData = lib_dsp_1.AudioData.create(sampleRate, WAVETABLE_SIZE, 2);
var framesLeft = audioData.frames[0];
var framesRight = audioData.frames[1];
for (var i = 0; i < WAVETABLE_SIZE; i++) {
    framesLeft[i] = real[i] * gain;
    framesRight[i] = real[(i + WAVETABLE_SIZE / 2) % WAVETABLE_SIZE] * gain;
}
var sample = await openDAW.addSample(audioData, "Lush Chorus Pad");
var project = openDAW.newProject("Time");
project.bpm = 80;
var nanoUnit = project.addInstrumentUnit("Nano", function (x) { return x.sample = sample; });
nanoUnit.volume = -6;
nanoUnit.addAudioEffect("delay", {
    delay: 4,
    feedback: 0.75,
    cross: 1.0,
    wet: -3.0,
    dry: 0.0
});
var noteTrack = nanoUnit.addNoteTrack();
var region = noteTrack.addRegion({
    position: 0,
    duration: lib_dsp_1.PPQN.Bar * 4
});
var chords = [
    [36, 48, 55, 60, 67],
    [33, 45, 52, 57, 64],
    [38, 50, 57, 62, 69],
    [41, 53, 60, 65, 72]
];
var events = [];
for (var bar = 0; bar < 4; bar++) {
    for (var _i = 0, _a = chords[bar]; _i < _a.length; _i++) {
        var note = _a[_i];
        events.push({
            position: lib_dsp_1.PPQN.Bar * bar,
            pitch: note,
            velocity: 0.7,
            duration: lib_dsp_1.PPQN.Bar
        });
    }
}
region.addEvents(events);
project.openInStudio();
