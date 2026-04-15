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
var _SamplePlayback_instances, _SamplePlayback_audio, _SamplePlayback_notifiers, _SamplePlayback_linearVolume, _SamplePlayback_current, _SamplePlayback_errorDialogOpen, _SamplePlayback_notify, _SamplePlayback_watchAudio, _SamplePlayback_unwatchAudio;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplePlayback = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var SamplePlayback = /** @class */ (function () {
    function SamplePlayback() {
        var _this = this;
        _SamplePlayback_instances.add(this);
        _SamplePlayback_audio.set(this, void 0);
        _SamplePlayback_notifiers.set(this, void 0);
        _SamplePlayback_linearVolume.set(this, void 0);
        _SamplePlayback_current.set(this, lib_std_1.Option.None);
        _SamplePlayback_errorDialogOpen.set(this, false);
        __classPrivateFieldSet(this, _SamplePlayback_audio, new Audio(), "f");
        __classPrivateFieldGet(this, _SamplePlayback_audio, "f").crossOrigin = "use-credentials";
        __classPrivateFieldGet(this, _SamplePlayback_audio, "f").preload = "auto";
        __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onerror = function () {
            __classPrivateFieldGet(_this, _SamplePlayback_current, "f").ifSome(function (uuid) { return __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuid, { type: "error", reason: "Unsupported format" }); });
            if (__classPrivateFieldGet(_this, _SamplePlayback_errorDialogOpen, "f")) {
                return;
            }
            __classPrivateFieldSet(_this, _SamplePlayback_errorDialogOpen, true, "f");
            lib_std_1.RuntimeNotifier.info({
                headline: "Playback Error",
                message: "Your browser does not support playing this audio format."
            }).finally(function () { return __classPrivateFieldSet(_this, _SamplePlayback_errorDialogOpen, false, "f"); });
        };
        __classPrivateFieldSet(this, _SamplePlayback_notifiers, new lib_std_1.ArrayMultimap(), "f");
        __classPrivateFieldSet(this, _SamplePlayback_linearVolume, new lib_std_1.DefaultObservableValue(0.0, {
            guard: function (value) { return (0, lib_std_1.clamp)(value, -36, 0); }
        }), "f");
        __classPrivateFieldGet(this, _SamplePlayback_linearVolume, "f").catchupAndSubscribe(function (owner) { return __classPrivateFieldGet(_this, _SamplePlayback_audio, "f").volume = (0, lib_dsp_1.dbToGain)(owner.getValue()); });
    }
    SamplePlayback.prototype.toggle = function (uuidAsString) {
        var _this = this;
        if (__classPrivateFieldGet(this, _SamplePlayback_current, "f").contains(uuidAsString)) {
            if (__classPrivateFieldGet(this, _SamplePlayback_audio, "f").paused) {
                __classPrivateFieldGet(this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(this, uuidAsString, { type: "buffering" });
                __classPrivateFieldGet(this, _SamplePlayback_audio, "f").play().catch(lib_std_1.EmptyExec);
            }
            else {
                __classPrivateFieldGet(this, _SamplePlayback_audio, "f").currentTime = 0.0;
                __classPrivateFieldGet(this, _SamplePlayback_audio, "f").pause();
            }
        }
        else {
            __classPrivateFieldGet(this, _SamplePlayback_instances, "m", _SamplePlayback_watchAudio).call(this, uuidAsString);
            __classPrivateFieldGet(this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(this, uuidAsString, { type: "buffering" });
            studio_core_1.SampleStorage.get().load(lib_std_1.UUID.parse(uuidAsString))
                .then(function (_a) {
                var audio = _a[0];
                __classPrivateFieldGet(_this, _SamplePlayback_audio, "f").src = URL.createObjectURL(new Blob([lib_dsp_1.WavFile.encodeFloats({
                        frames: audio.frames.slice(),
                        sampleRate: audio.sampleRate,
                        numberOfFrames: audio.numberOfFrames,
                        numberOfChannels: audio.numberOfChannels
                    })], { type: "audio/wav" }));
            }, function () {
                __classPrivateFieldGet(_this, _SamplePlayback_audio, "f").src = "".concat(studio_core_1.OpenSampleAPI.FileRoot, "/").concat(uuidAsString);
            })
                .finally(function () { return __classPrivateFieldGet(_this, _SamplePlayback_audio, "f").play().catch(lib_std_1.EmptyExec); });
            __classPrivateFieldGet(this, _SamplePlayback_current, "f").ifSome(function (uuid) { return __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuid, { type: "idle" }); });
            __classPrivateFieldSet(this, _SamplePlayback_current, lib_std_1.Option.wrap(uuidAsString), "f");
        }
    };
    SamplePlayback.prototype.eject = function () {
        var _this = this;
        __classPrivateFieldGet(this, _SamplePlayback_current, "f").ifSome(function (uuid) { return __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuid, { type: "idle" }); });
        __classPrivateFieldSet(this, _SamplePlayback_current, lib_std_1.Option.None, "f");
        __classPrivateFieldGet(this, _SamplePlayback_audio, "f").pause();
        __classPrivateFieldGet(this, _SamplePlayback_instances, "m", _SamplePlayback_unwatchAudio).call(this);
    };
    SamplePlayback.prototype.subscribe = function (uuidAsString, procedure) {
        var _this = this;
        __classPrivateFieldGet(this, _SamplePlayback_notifiers, "f").add(uuidAsString, procedure);
        return { terminate: function () { return __classPrivateFieldGet(_this, _SamplePlayback_notifiers, "f").remove(uuidAsString, procedure); } };
    };
    Object.defineProperty(SamplePlayback.prototype, "linearVolume", {
        get: function () { return __classPrivateFieldGet(this, _SamplePlayback_linearVolume, "f"); },
        enumerable: false,
        configurable: true
    });
    return SamplePlayback;
}());
exports.SamplePlayback = SamplePlayback;
_SamplePlayback_audio = new WeakMap(), _SamplePlayback_notifiers = new WeakMap(), _SamplePlayback_linearVolume = new WeakMap(), _SamplePlayback_current = new WeakMap(), _SamplePlayback_errorDialogOpen = new WeakMap(), _SamplePlayback_instances = new WeakSet(), _SamplePlayback_notify = function _SamplePlayback_notify(uuidAsString, event) {
    __classPrivateFieldGet(this, _SamplePlayback_notifiers, "f").get(uuidAsString).forEach(function (procedure) { return procedure(event); });
}, _SamplePlayback_watchAudio = function _SamplePlayback_watchAudio(uuidAsString) {
    var _this = this;
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onended = function () { return __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuidAsString, { type: "idle" }); };
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").ontimeupdate = function () {
        if (!__classPrivateFieldGet(_this, _SamplePlayback_audio, "f").paused && __classPrivateFieldGet(_this, _SamplePlayback_audio, "f").duration > 0.0) {
            __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuidAsString, { type: "playing" });
        }
    };
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onpause = function () { return __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuidAsString, { type: "idle" }); };
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onstalled = function () { return __classPrivateFieldGet(_this, _SamplePlayback_instances, "m", _SamplePlayback_notify).call(_this, uuidAsString, { type: "buffering" }); };
}, _SamplePlayback_unwatchAudio = function _SamplePlayback_unwatchAudio() {
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onended = null;
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onplay = null;
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onpause = null;
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").onstalled = null;
    __classPrivateFieldGet(this, _SamplePlayback_audio, "f").ontimeupdate = null;
};
