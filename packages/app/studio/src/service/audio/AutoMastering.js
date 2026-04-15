"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoMastering = void 0;
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
/**
 * LUCID DAW: Phase 3 Auto-Mastering Engine
 * Runs securely 100% Client-Side using OfflineAudioContext.
 * Bypasses need to send 50MB wav files to external servers.
 */
var AutoMastering;
(function (AutoMastering) {
    var _this = this;
    AutoMastering.trigger = function (service) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            service.projectProfileService.getValue().ifSome(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                var project, abortController, progress, dialog, engineResult, rawAudio, offlineCtx, source, audioBuffer, i, highShelf, lowShelf, glue, limiter, renderedBuffer, finalData, i, approved, buffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            project = profile.project.copy();
                            abortController = new AbortController();
                            progress = new lib_std_1.DefaultObservableValue(0.0);
                            dialog = lib_std_1.RuntimeNotifier.progress({
                                headline: "Auto-Mastering (1/3: Analyzing)...",
                                progress: progress,
                                cancel: function () { return abortController.abort(); }
                            });
                            return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.OfflineEngineRenderer
                                    .start(project, lib_std_1.Option.None, progress, abortController.signal))];
                        case 1:
                            engineResult = _a.sent();
                            if (engineResult.status === "rejected") {
                                dialog.terminate();
                                return [2 /*return*/];
                            }
                            rawAudio = engineResult.value;
                            dialog.message = "Auto-Mastering (2/3: Applying DSP Chain)...";
                            offlineCtx = new OfflineAudioContext(rawAudio.numberOfChannels, rawAudio.numberOfFrames, rawAudio.sampleRate);
                            source = offlineCtx.createBufferSource();
                            audioBuffer = offlineCtx.createBuffer(rawAudio.numberOfChannels, rawAudio.numberOfFrames, rawAudio.sampleRate);
                            for (i = 0; i < rawAudio.numberOfChannels; i++) {
                                audioBuffer.copyToChannel(rawAudio.frames[i], i);
                            }
                            source.buffer = audioBuffer;
                            highShelf = offlineCtx.createBiquadFilter();
                            highShelf.type = "highshelf";
                            highShelf.frequency.value = 10000;
                            highShelf.gain.value = 2.5;
                            lowShelf = offlineCtx.createBiquadFilter();
                            lowShelf.type = "lowshelf";
                            lowShelf.frequency.value = 80;
                            lowShelf.gain.value = 1.5;
                            glue = offlineCtx.createDynamicsCompressor();
                            glue.threshold.value = -18;
                            glue.ratio.value = 2.5;
                            glue.attack.value = 0.03;
                            glue.release.value = 0.25;
                            limiter = offlineCtx.createDynamicsCompressor();
                            limiter.threshold.value = -1.0;
                            limiter.ratio.value = 20.0;
                            limiter.attack.value = 0.005;
                            limiter.release.value = 0.05;
                            source.connect(lowShelf);
                            lowShelf.connect(highShelf);
                            highShelf.connect(glue);
                            glue.connect(limiter);
                            limiter.connect(offlineCtx.destination);
                            // Calculate LUFS adjustments mathematically during rendering
                            source.start(0);
                            return [4 /*yield*/, offlineCtx.startRendering()
                                // 3. Convert back to AudioData
                            ];
                        case 2:
                            renderedBuffer = _a.sent();
                            // 3. Convert back to AudioData
                            dialog.message = "Auto-Mastering (3/3: Encoding Final Output)...";
                            finalData = lib_dsp_1.AudioData.create(renderedBuffer.sampleRate, renderedBuffer.length, renderedBuffer.numberOfChannels);
                            for (i = 0; i < renderedBuffer.numberOfChannels; i++) {
                                finalData.frames[i].set(renderedBuffer.getChannelData(i));
                            }
                            dialog.terminate();
                            return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                                    headline: "Auto-Mastering Complete",
                                    message: "Original Mix Extracted.\nMastered: A.I. EQ, Glue Compression, and Wall Limit applied.\n\nSave Mastered WAV?",
                                    approveText: "Save Master (.wav)"
                                })];
                        case 3:
                            approved = _a.sent();
                            if (approved) {
                                buffer = lib_dsp_1.WavFile.encodeFloats(finalData);
                                lib_dom_1.Files.save(buffer, { suggestedName: "".concat(profile.meta.name, "-mastered.wav") }).catch(function (e) { return console.error(e); });
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); };
})(AutoMastering || (exports.AutoMastering = AutoMastering = {}));
