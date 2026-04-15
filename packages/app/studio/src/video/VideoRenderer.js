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
exports.VideoRenderer = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var ShadertoyState_1 = require("@/ui/shadertoy/ShadertoyState");
var ShadertoyRunner_1 = require("@/ui/shadertoy/ShadertoyRunner");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var video_1 = require("@/video");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var MAX_DURATION_SECONDS = lib_std_1.TimeSpan.hours(1).absSeconds();
var SILENCE_THRESHOLD_DB = -72.0;
var SILENCE_DURATION_SECONDS = 10;
var isAllocationError = function (error) {
    return error instanceof RangeError && /alloc|array|memory/i.test(error.message);
};
var VideoRenderer;
(function (VideoRenderer) {
    var _this = this;
    VideoRenderer.render = function (source, projectName, sampleRate) { return __awaiter(_this, void 0, void 0, function () {
        var config, width, height, frameRate, duration, overlayEnabled, videoBitrate, exportConfig, exporter, result, writable, project, boxGraph, enabled, active, progressValue, dialog, estimator, shadertoyCanvas, shadertoyContext, shadertoyState, shadertoyRunner, shadertoy, code, compositionCanvas, compositionCtx, overlay, renderer, tempoMap, estimatedDurationInSeconds, maxDuration, maxFrames, estimatedNumberOfFrames, silenceThreshold, silenceSamplesNeeded, consecutiveSilentSamples, hasHadAudio, idealSamplesPerFrame, samplesRendered, frameIndex, progress, targetSamples, samplesToRender, quantumsNeeded, actualSamplesToRender, channels, maxSample, _i, channels_1, channel, _a, channel_1, sample, absoluteValue, seconds, ppqn_1, timestampSeconds, error_1, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!video_1.WebCodecsVideoExporter.isSupported()) {
                        return [2 /*return*/, (0, lib_std_1.panic)("WebCodecs is not supported in this browser")];
                    }
                    return [4 /*yield*/, (0, video_1.showVideoExportDialog)(sampleRate)];
                case 1:
                    config = _b.sent();
                    width = config.width, height = config.height, frameRate = config.frameRate, duration = config.duration, overlayEnabled = config.overlay, videoBitrate = config.videoBitrate;
                    exportConfig = { width: width, height: height, frameRate: frameRate, sampleRate: sampleRate, numberOfChannels: 2, videoBitrate: videoBitrate };
                    if (!(0, lib_std_1.isDefined)(window.showSaveFilePicker)) return [3 /*break*/, 5];
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(window.showSaveFilePicker({ suggestedName: "opendaw-video.mp4" }))];
                case 2:
                    result = _b.sent();
                    if (result.status === "rejected") {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, result.value.createWritable()];
                case 3:
                    writable = _b.sent();
                    return [4 /*yield*/, lib_runtime_1.Promises.timeout(video_1.StreamVideoExporter.create(exportConfig, writable), lib_std_1.TimeSpan.seconds(10))];
                case 4:
                    exporter = _b.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, lib_runtime_1.Promises.timeout(video_1.BufferVideoExporter.create(exportConfig), lib_std_1.TimeSpan.seconds(10))];
                case 6:
                    exporter = _b.sent();
                    _b.label = 7;
                case 7:
                    console.time("Render Video");
                    project = source.copy();
                    boxGraph = project.boxGraph, enabled = project.timelineBox.loopArea.enabled;
                    boxGraph.beginTransaction();
                    enabled.setValue(false);
                    boxGraph.endTransaction();
                    active = true;
                    progressValue = new lib_std_1.DefaultObservableValue(0.0);
                    dialog = lib_std_1.RuntimeNotifier.progress({
                        headline: "Rendering video...",
                        progress: progressValue,
                        cancel: function () { return active = false; }
                    });
                    _b.label = 8;
                case 8:
                    _b.trys.push([8, 18, , 21]);
                    dialog.message = "Initializing...";
                    estimator = lib_std_1.TimeSpan.createEstimator();
                    shadertoyCanvas = new OffscreenCanvas(width, height);
                    shadertoyContext = shadertoyCanvas.getContext("webgl2");
                    shadertoyState = new ShadertoyState_1.ShadertoyState(project);
                    shadertoyRunner = new ShadertoyRunner_1.ShadertoyRunner(shadertoyState, shadertoyContext);
                    shadertoy = project.rootBoxAdapter.box.shadertoy;
                    if (shadertoy.nonEmpty()) {
                        code = (0, lib_std_1.asInstanceOf)(shadertoy.targetVertex.unwrap().box, studio_boxes_1.ShadertoyBox).shaderCode.getValue();
                        shadertoyRunner.compile(code);
                    }
                    else {
                        shadertoyRunner.compile("void mainImage(out vec4 fragColor, in vec2 fragCoord){vec2 uv = fragCoord/iResolution.xy;vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,1,2));fragColor = vec4(col,1.0);}");
                    }
                    compositionCanvas = new OffscreenCanvas(width, height);
                    compositionCtx = compositionCanvas.getContext("2d");
                    return [4 /*yield*/, video_1.VideoOverlay.create({
                            width: width,
                            height: height,
                            projectName: projectName,
                            toParts: function (position) { return project.timelineBoxAdapter.signatureTrack.toParts(position); }
                        })];
                case 9:
                    overlay = _b.sent();
                    return [4 /*yield*/, studio_core_1.OfflineEngineRenderer.create(project, lib_std_1.Option.None, sampleRate)];
                case 10:
                    renderer = _b.sent();
                    renderer.play();
                    tempoMap = project.tempoMap;
                    estimatedDurationInSeconds = duration > 0
                        ? duration
                        : tempoMap.ppqnToSeconds(project.lastRegionAction());
                    maxDuration = duration > 0
                        ? duration
                        : MAX_DURATION_SECONDS;
                    maxFrames = Math.ceil(maxDuration * frameRate);
                    estimatedNumberOfFrames = Math.ceil(estimatedDurationInSeconds * frameRate);
                    silenceThreshold = (0, lib_dsp_1.dbToGain)(SILENCE_THRESHOLD_DB);
                    silenceSamplesNeeded = Math.ceil(SILENCE_DURATION_SECONDS * sampleRate);
                    consecutiveSilentSamples = 0;
                    hasHadAudio = false;
                    idealSamplesPerFrame = sampleRate / frameRate;
                    samplesRendered = 0;
                    frameIndex = 0;
                    _b.label = 11;
                case 11:
                    if (!(frameIndex < maxFrames && active)) return [3 /*break*/, 14];
                    if (frameIndex >= estimatedNumberOfFrames) {
                        dialog.message = "Waiting for silence...";
                    }
                    else {
                        progress = frameIndex / estimatedNumberOfFrames;
                        dialog.message = "Frame ".concat(frameIndex + 1, " / ").concat(estimatedNumberOfFrames, " (").concat(estimator(progress), ")");
                        progressValue.setValue(progress);
                    }
                    targetSamples = Math.round((frameIndex + 1) * idealSamplesPerFrame);
                    samplesToRender = targetSamples - samplesRendered;
                    quantumsNeeded = Math.ceil(samplesToRender / lib_dsp_1.RenderQuantum);
                    actualSamplesToRender = quantumsNeeded * lib_dsp_1.RenderQuantum;
                    return [4 /*yield*/, renderer.step(actualSamplesToRender)];
                case 12:
                    channels = _b.sent();
                    samplesRendered += actualSamplesToRender;
                    project.liveStreamReceiver.dispatch();
                    if (duration === 0) {
                        maxSample = 0;
                        for (_i = 0, channels_1 = channels; _i < channels_1.length; _i++) {
                            channel = channels_1[_i];
                            for (_a = 0, channel_1 = channel; _a < channel_1.length; _a++) {
                                sample = channel_1[_a];
                                absoluteValue = Math.abs(sample);
                                if (absoluteValue > maxSample) {
                                    maxSample = absoluteValue;
                                }
                            }
                        }
                        if (maxSample > silenceThreshold) {
                            hasHadAudio = true;
                            consecutiveSilentSamples = 0;
                        }
                        else if (hasHadAudio) {
                            consecutiveSilentSamples += actualSamplesToRender;
                            if (consecutiveSilentSamples >= silenceSamplesNeeded) {
                                return [3 /*break*/, 14];
                            }
                        }
                    }
                    seconds = renderer.totalFrames / sampleRate;
                    ppqn_1 = tempoMap.secondsToPPQN(seconds);
                    shadertoyState.setPPQN(ppqn_1);
                    shadertoyRunner.render(seconds);
                    compositionCtx.drawImage(shadertoyCanvas, 0, 0);
                    if (overlayEnabled) {
                        overlay.render(ppqn_1);
                        compositionCtx.globalCompositeOperation = "screen";
                        compositionCtx.drawImage(overlay.canvas, 0, 0);
                        compositionCtx.globalCompositeOperation = "source-over";
                    }
                    timestampSeconds = frameIndex / frameRate;
                    return [4 /*yield*/, exporter.addFrame(compositionCanvas, channels, timestampSeconds)];
                case 13:
                    _b.sent();
                    frameIndex++;
                    return [3 /*break*/, 11];
                case 14:
                    renderer.stop();
                    renderer.terminate();
                    shadertoyState.terminate();
                    shadertoyRunner.terminate();
                    overlay.terminate();
                    if (!!active) return [3 /*break*/, 16];
                    dialog.terminate();
                    return [4 /*yield*/, exporter.abort()];
                case 15:
                    _b.sent();
                    return [2 /*return*/];
                case 16:
                    dialog.message = "Finalizing video...";
                    return [4 /*yield*/, exporter.finalize()];
                case 17:
                    _b.sent();
                    dialog.terminate();
                    return [3 /*break*/, 21];
                case 18:
                    error_1 = _b.sent();
                    dialog.terminate();
                    return [4 /*yield*/, exporter.abort()];
                case 19:
                    _b.sent();
                    message = isAllocationError(error_1)
                        ? "Video is too large for this browser. Please use Chrome."
                        : String(error_1);
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                            headline: "Video Export Failed",
                            message: message
                        })];
                case 20:
                    _b.sent();
                    throw error_1;
                case 21:
                    console.timeEnd("Render Video");
                    return [2 /*return*/];
            }
        });
    }); };
})(VideoRenderer || (exports.VideoRenderer = VideoRenderer = {}));
