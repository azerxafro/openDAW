"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var _a, _WebCodecsVideoExporter_pickAudioCodec, _WebCodecsVideoExporter_config, _WebCodecsVideoExporter_output, _WebCodecsVideoExporter_videoSource, _WebCodecsVideoExporter_audioSource, _WebCodecsVideoExporter_AudioSample, _WebCodecsVideoExporter_ctx, _WebCodecsVideoExporter_progress, _StreamVideoExporter_writable, _BufferVideoExporter_bufferTarget;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferVideoExporter = exports.StreamVideoExporter = exports.WebCodecsVideoExporter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var WebCodecsVideoExporter = /** @class */ (function () {
    function WebCodecsVideoExporter(config, encoder) {
        _WebCodecsVideoExporter_config.set(this, void 0);
        _WebCodecsVideoExporter_output.set(this, void 0);
        _WebCodecsVideoExporter_videoSource.set(this, void 0);
        _WebCodecsVideoExporter_audioSource.set(this, void 0);
        _WebCodecsVideoExporter_AudioSample.set(this, void 0);
        _WebCodecsVideoExporter_ctx.set(this, void 0);
        _WebCodecsVideoExporter_progress.set(this, new lib_std_1.DefaultObservableValue(0));
        __classPrivateFieldSet(this, _WebCodecsVideoExporter_config, config, "f");
        __classPrivateFieldSet(this, _WebCodecsVideoExporter_output, encoder.output, "f");
        __classPrivateFieldSet(this, _WebCodecsVideoExporter_videoSource, encoder.videoSource, "f");
        __classPrivateFieldSet(this, _WebCodecsVideoExporter_audioSource, encoder.audioSource, "f");
        __classPrivateFieldSet(this, _WebCodecsVideoExporter_AudioSample, encoder.AudioSample, "f");
        __classPrivateFieldSet(this, _WebCodecsVideoExporter_ctx, encoder.ctx, "f");
    }
    WebCodecsVideoExporter.isSupported = function () {
        return typeof VideoEncoder !== "undefined" && typeof AudioEncoder !== "undefined";
    };
    WebCodecsVideoExporter.createEncoder = function (config, target) {
        return __awaiter(this, void 0, void 0, function () {
            var _b, Output, Mp4OutputFormat, CanvasSource, AudioSampleSource, AudioSample, canvas, ctx, output, videoSource, audioBitrate, audioCodec, audioSource;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("mediabunny"); })];
                    case 1:
                        _b = _e.sent(), Output = _b.Output, Mp4OutputFormat = _b.Mp4OutputFormat, CanvasSource = _b.CanvasSource, AudioSampleSource = _b.AudioSampleSource, AudioSample = _b.AudioSample;
                        canvas = new OffscreenCanvas(config.width, config.height);
                        ctx = (0, lib_std_1.asDefined)(canvas.getContext("2d"));
                        output = new Output({ format: new Mp4OutputFormat(), target: target });
                        videoSource = new CanvasSource(canvas, {
                            codec: "avc",
                            bitrate: (_c = config.videoBitrate) !== null && _c !== void 0 ? _c : 5000000,
                            bitrateMode: "constant",
                            keyFrameInterval: 2
                        });
                        output.addVideoTrack(videoSource);
                        audioBitrate = (_d = config.audioBitrate) !== null && _d !== void 0 ? _d : 192000;
                        return [4 /*yield*/, __classPrivateFieldGet(_a, _a, "m", _WebCodecsVideoExporter_pickAudioCodec).call(_a, config.sampleRate, config.numberOfChannels, audioBitrate)];
                    case 2:
                        audioCodec = _e.sent();
                        audioSource = new AudioSampleSource({ codec: audioCodec, bitrate: audioBitrate });
                        output.addAudioTrack(audioSource);
                        console.debug("VideoExport codecs \u2192 video: avc, audio: ".concat(audioCodec));
                        return [4 /*yield*/, output.start()];
                    case 3:
                        _e.sent();
                        return [2 /*return*/, { output: output, videoSource: videoSource, audioSource: audioSource, AudioSample: AudioSample, ctx: ctx }];
                }
            });
        });
    };
    Object.defineProperty(WebCodecsVideoExporter.prototype, "progress", {
        get: function () { return __classPrivateFieldGet(this, _WebCodecsVideoExporter_progress, "f"); },
        enumerable: false,
        configurable: true
    });
    WebCodecsVideoExporter.prototype.addFrame = function (canvas, audio, timestampSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var frameDuration, numberOfChannels, numberOfFrames, timestampUs, audioBuffer, channel, audioData, audioSample;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        __classPrivateFieldGet(this, _WebCodecsVideoExporter_ctx, "f").drawImage(canvas, 0, 0);
                        frameDuration = 1 / __classPrivateFieldGet(this, _WebCodecsVideoExporter_config, "f").frameRate;
                        return [4 /*yield*/, __classPrivateFieldGet(this, _WebCodecsVideoExporter_videoSource, "f").add(timestampSeconds, frameDuration)];
                    case 1:
                        _b.sent();
                        if (!(audio.length > 0 && audio[0].length > 0)) return [3 /*break*/, 3];
                        numberOfChannels = audio.length;
                        numberOfFrames = audio[0].length;
                        timestampUs = Math.round(timestampSeconds * 1000000);
                        audioBuffer = new Float32Array(numberOfChannels * numberOfFrames);
                        for (channel = 0; channel < numberOfChannels; channel++) {
                            audioBuffer.set(audio[channel], channel * numberOfFrames);
                        }
                        audioData = new AudioData({
                            format: "f32-planar",
                            sampleRate: __classPrivateFieldGet(this, _WebCodecsVideoExporter_config, "f").sampleRate,
                            numberOfFrames: numberOfFrames,
                            numberOfChannels: numberOfChannels,
                            timestamp: timestampUs,
                            data: audioBuffer
                        });
                        audioSample = new (__classPrivateFieldGet(this, _WebCodecsVideoExporter_AudioSample, "f"))(audioData);
                        return [4 /*yield*/, __classPrivateFieldGet(this, _WebCodecsVideoExporter_audioSource, "f").add(audioSample)];
                    case 2:
                        _b.sent();
                        audioSample.close();
                        audioData.close();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WebCodecsVideoExporter.prototype.finalizeOutput = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, __classPrivateFieldGet(this, _WebCodecsVideoExporter_output, "f").finalize()];
                    case 1:
                        _b.sent();
                        __classPrivateFieldGet(this, _WebCodecsVideoExporter_progress, "f").setValue(1);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebCodecsVideoExporter.prototype.terminate = function () { };
    return WebCodecsVideoExporter;
}());
exports.WebCodecsVideoExporter = WebCodecsVideoExporter;
_a = WebCodecsVideoExporter, _WebCodecsVideoExporter_config = new WeakMap(), _WebCodecsVideoExporter_output = new WeakMap(), _WebCodecsVideoExporter_videoSource = new WeakMap(), _WebCodecsVideoExporter_audioSource = new WeakMap(), _WebCodecsVideoExporter_AudioSample = new WeakMap(), _WebCodecsVideoExporter_ctx = new WeakMap(), _WebCodecsVideoExporter_progress = new WeakMap(), _WebCodecsVideoExporter_pickAudioCodec = function _WebCodecsVideoExporter_pickAudioCodec(sampleRate, numberOfChannels, bitrate) {
    return __awaiter(this, void 0, void 0, function () {
        var aacSupported;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(AudioEncoder.isConfigSupported({
                        codec: "mp4a.40.2",
                        sampleRate: sampleRate,
                        numberOfChannels: numberOfChannels,
                        bitrate: bitrate
                    }))];
                case 1:
                    aacSupported = _b.sent();
                    if (aacSupported.status === "resolved" && aacSupported.value.supported === true) {
                        return [2 /*return*/, "aac"];
                    }
                    return [2 /*return*/, "opus"];
            }
        });
    });
};
var StreamVideoExporter = /** @class */ (function (_super) {
    __extends(StreamVideoExporter, _super);
    function StreamVideoExporter(config, encoder, writable) {
        var _this = _super.call(this, config, encoder) || this;
        _StreamVideoExporter_writable.set(_this, void 0);
        __classPrivateFieldSet(_this, _StreamVideoExporter_writable, writable, "f");
        return _this;
    }
    StreamVideoExporter.create = function (config, writable) {
        return __awaiter(this, void 0, void 0, function () {
            var StreamTarget, encoder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("mediabunny"); })];
                    case 1:
                        StreamTarget = (_b.sent()).StreamTarget;
                        return [4 /*yield*/, WebCodecsVideoExporter.createEncoder(config, new StreamTarget(writable, { chunked: true }))];
                    case 2:
                        encoder = _b.sent();
                        return [2 /*return*/, new StreamVideoExporter(config, encoder, writable)];
                }
            });
        });
    };
    StreamVideoExporter.prototype.finalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.finalizeOutput()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StreamVideoExporter.prototype.abort = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(__classPrivateFieldGet(this, _StreamVideoExporter_writable, "f").abort())];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return StreamVideoExporter;
}(WebCodecsVideoExporter));
exports.StreamVideoExporter = StreamVideoExporter;
_StreamVideoExporter_writable = new WeakMap();
var BufferVideoExporter = /** @class */ (function (_super) {
    __extends(BufferVideoExporter, _super);
    function BufferVideoExporter(config, encoder, bufferTarget) {
        var _this = _super.call(this, config, encoder) || this;
        _BufferVideoExporter_bufferTarget.set(_this, void 0);
        __classPrivateFieldSet(_this, _BufferVideoExporter_bufferTarget, bufferTarget, "f");
        return _this;
    }
    BufferVideoExporter.create = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var BufferTarget, bufferTarget, encoder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("mediabunny"); })];
                    case 1:
                        BufferTarget = (_b.sent()).BufferTarget;
                        bufferTarget = new BufferTarget();
                        return [4 /*yield*/, WebCodecsVideoExporter.createEncoder(config, bufferTarget)];
                    case 2:
                        encoder = _b.sent();
                        return [2 /*return*/, new BufferVideoExporter(config, encoder, bufferTarget)];
                }
            });
        });
    };
    BufferVideoExporter.prototype.finalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.finalizeOutput()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, lib_dom_1.Files.save((0, lib_std_1.asDefined)(__classPrivateFieldGet(this, _BufferVideoExporter_bufferTarget, "f").buffer), { suggestedName: "opendaw-video.mp4" })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BufferVideoExporter.prototype.abort = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    return BufferVideoExporter;
}(WebCodecsVideoExporter));
exports.BufferVideoExporter = BufferVideoExporter;
_BufferVideoExporter_bufferTarget = new WeakMap();
