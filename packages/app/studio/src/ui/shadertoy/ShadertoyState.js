"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ShadertoyState_instances, _ShadertoyState_terminable, _ShadertoyState_audioData, _ShadertoyState_midiCCData, _ShadertoyState_midiNoteData, _ShadertoyState_noteVelocities, _ShadertoyState_peaks, _ShadertoyState_beat, _ShadertoyState_setWaveform, _ShadertoyState_setSpectrum, _ShadertoyState_setPeaks, _ShadertoyState_onMidiCC, _ShadertoyState_onMidiNoteOn, _ShadertoyState_onMidiNoteOff, _ShadertoyState_listen, _ShadertoyState_updateNoteData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadertoyState = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ShadertoyMIDIOutput_1 = require("@/ui/shadertoy/ShadertoyMIDIOutput");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_midi_1 = require("@opendaw/lib-midi");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ShadertoyState = /** @class */ (function () {
    function ShadertoyState(project) {
        _ShadertoyState_instances.add(this);
        _ShadertoyState_terminable.set(this, void 0);
        _ShadertoyState_audioData.set(this, new Uint8Array(512 * 2));
        _ShadertoyState_midiCCData.set(this, new Uint8Array(128));
        _ShadertoyState_midiNoteData.set(this, new Uint8Array(128));
        _ShadertoyState_noteVelocities.set(this, Array.from({ length: 128 }, function () { return []; }));
        _ShadertoyState_peaks.set(this, new Float32Array(4)); // [leftPeak, leftRMS, rightPeak, rightRMS]
        _ShadertoyState_beat.set(this, 0.0);
        __classPrivateFieldSet(this, _ShadertoyState_terminable, __classPrivateFieldGet(this, _ShadertoyState_instances, "m", _ShadertoyState_listen).call(this, project), "f");
    }
    Object.defineProperty(ShadertoyState.prototype, "audioData", {
        get: function () { return __classPrivateFieldGet(this, _ShadertoyState_audioData, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShadertoyState.prototype, "midiCCData", {
        get: function () { return __classPrivateFieldGet(this, _ShadertoyState_midiCCData, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShadertoyState.prototype, "midiNoteData", {
        get: function () { return __classPrivateFieldGet(this, _ShadertoyState_midiNoteData, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShadertoyState.prototype, "peaks", {
        get: function () { return __classPrivateFieldGet(this, _ShadertoyState_peaks, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShadertoyState.prototype, "beat", {
        get: function () { return __classPrivateFieldGet(this, _ShadertoyState_beat, "f"); },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the beat position.
     * @param ppqn Position in PPQN ticks
     */
    ShadertoyState.prototype.setPPQN = function (ppqn) {
        __classPrivateFieldSet(this, _ShadertoyState_beat, ppqn / lib_dsp_1.PPQN.Quarter, "f");
    };
    ShadertoyState.prototype.terminate = function () { __classPrivateFieldGet(this, _ShadertoyState_terminable, "f").terminate(); };
    return ShadertoyState;
}());
exports.ShadertoyState = ShadertoyState;
_ShadertoyState_terminable = new WeakMap(), _ShadertoyState_audioData = new WeakMap(), _ShadertoyState_midiCCData = new WeakMap(), _ShadertoyState_midiNoteData = new WeakMap(), _ShadertoyState_noteVelocities = new WeakMap(), _ShadertoyState_peaks = new WeakMap(), _ShadertoyState_beat = new WeakMap(), _ShadertoyState_instances = new WeakSet(), _ShadertoyState_setWaveform = function _ShadertoyState_setWaveform(data) {
    var length = Math.min(data.length, 512);
    for (var i = 0; i < length; i++) {
        __classPrivateFieldGet(this, _ShadertoyState_audioData, "f")[512 + i] = Math.round(((0, lib_std_1.clamp)(data[i], -1.0, 1.0) + 1.0) * 127.5);
    }
}, _ShadertoyState_setSpectrum = function _ShadertoyState_setSpectrum(data, sampleRate) {
    var minFreq = 20.0;
    var maxFreq = 20000.0;
    var nyquist = sampleRate / 2.0;
    var numBins = data.length;
    var binWidth = nyquist / numBins;
    var ratio = maxFreq / minFreq;
    for (var i = 0; i < 512; i++) {
        var t = i / 512.0;
        var freq = minFreq * Math.pow(ratio, t);
        var bin = freq / binWidth;
        var binLow = Math.floor(bin);
        var binHigh = Math.min(binLow + 1, numBins - 1);
        var frac = bin - binLow;
        var valueLow = binLow > 0 ? data[binLow] : 0.0;
        var valueHigh = data[binHigh];
        var value = valueLow + frac * (valueHigh - valueLow);
        var normalized = ((0, lib_dsp_1.gainToDb)(value) + 60.0) / 60.0;
        __classPrivateFieldGet(this, _ShadertoyState_audioData, "f")[i] = Math.floor((0, lib_std_1.clampUnit)(normalized) * 255.0);
    }
}, _ShadertoyState_setPeaks = function _ShadertoyState_setPeaks(peaks) {
    __classPrivateFieldGet(this, _ShadertoyState_peaks, "f").set(peaks);
}, _ShadertoyState_onMidiCC = function _ShadertoyState_onMidiCC(cc, value) {
    __classPrivateFieldGet(this, _ShadertoyState_midiCCData, "f")[cc] = Math.floor(value * 255.0);
}, _ShadertoyState_onMidiNoteOn = function _ShadertoyState_onMidiNoteOn(pitch, velocity) {
    __classPrivateFieldGet(this, _ShadertoyState_noteVelocities, "f")[pitch].push(velocity);
    __classPrivateFieldGet(this, _ShadertoyState_instances, "m", _ShadertoyState_updateNoteData).call(this, pitch);
}, _ShadertoyState_onMidiNoteOff = function _ShadertoyState_onMidiNoteOff(pitch) {
    __classPrivateFieldGet(this, _ShadertoyState_noteVelocities, "f")[pitch].shift();
    __classPrivateFieldGet(this, _ShadertoyState_instances, "m", _ShadertoyState_updateNoteData).call(this, pitch);
}, _ShadertoyState_listen = function _ShadertoyState_listen(project) {
    var _this = this;
    var _a = project.engine, position = _a.position, sampleRate = _a.sampleRate, liveStreamReceiver = project.liveStreamReceiver;
    return lib_std_1.Terminable.many(lib_dom_1.AnimationFrame.add(function () { return _this.setPPQN(position.getValue()); }), ShadertoyMIDIOutput_1.ShadertoyMIDIOutput.subscribe(function (message) { return lib_midi_1.MidiData.accept(message, {
        controller: function (id, value) { return __classPrivateFieldGet(_this, _ShadertoyState_instances, "m", _ShadertoyState_onMidiCC).call(_this, id, value); },
        noteOn: function (note, velocity) { return __classPrivateFieldGet(_this, _ShadertoyState_instances, "m", _ShadertoyState_onMidiNoteOn).call(_this, note, velocity); },
        noteOff: function (note) { return __classPrivateFieldGet(_this, _ShadertoyState_instances, "m", _ShadertoyState_onMidiNoteOff).call(_this, note); }
    }); }), liveStreamReceiver.subscribeFloats(studio_adapters_1.EngineAddresses.PEAKS, function (peaks) { return __classPrivateFieldGet(_this, _ShadertoyState_instances, "m", _ShadertoyState_setPeaks).call(_this, peaks); }), liveStreamReceiver.subscribeFloats(studio_adapters_1.EngineAddresses.SPECTRUM, function (spectrum) { return __classPrivateFieldGet(_this, _ShadertoyState_instances, "m", _ShadertoyState_setSpectrum).call(_this, spectrum, sampleRate); }), liveStreamReceiver.subscribeFloats(studio_adapters_1.EngineAddresses.WAVEFORM, function (waveform) { return __classPrivateFieldGet(_this, _ShadertoyState_instances, "m", _ShadertoyState_setWaveform).call(_this, waveform); }));
}, _ShadertoyState_updateNoteData = function _ShadertoyState_updateNoteData(pitch) {
    var velocities = __classPrivateFieldGet(this, _ShadertoyState_noteVelocities, "f")[pitch];
    if (velocities.length === 0) {
        __classPrivateFieldGet(this, _ShadertoyState_midiNoteData, "f")[pitch] = 0;
    }
    else {
        var maxVelocity = Math.max.apply(Math, velocities);
        __classPrivateFieldGet(this, _ShadertoyState_midiNoteData, "f")[pitch] = Math.floor(maxVelocity * 255.0);
    }
};
