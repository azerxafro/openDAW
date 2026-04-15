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
exports.Mixdowns = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var dialogs_1 = require("@/ui/components/dialogs");
var Mixdowns;
(function (Mixdowns) {
    var _this = this;
    Mixdowns.exportMixdown = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
        var project, abortController, progress, dialog, result, audioData, _c, resolve, reject, promise, _d, status, error;
        var source = _b.project, meta = _b.meta;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    project = source.copy();
                    abortController = new AbortController();
                    progress = new lib_std_1.DefaultObservableValue(0.0);
                    dialog = lib_std_1.RuntimeNotifier.progress({
                        headline: "Rendering mixdown...",
                        progress: progress,
                        cancel: function () { return abortController.abort(); }
                    });
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.OfflineEngineRenderer
                            .start(project, lib_std_1.Option.None, progress, abortController.signal))];
                case 1:
                    result = _e.sent();
                    dialog.terminate();
                    if (result.status === "rejected") {
                        if (!lib_std_1.Errors.isAbort(result.error)) {
                            throw result.error;
                        }
                        return [2 /*return*/];
                    }
                    audioData = result.value;
                    _c = Promise.withResolvers(), resolve = _c.resolve, reject = _c.reject, promise = _c.promise;
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(dialogs_1.Dialogs.show({
                            headline: "Encode Mixdown",
                            content: "openDAW will download FFmpeg (30MB) once to encode your mixdown unless you choose 'Wav'.",
                            excludeOk: true,
                            buttons: [
                                {
                                    text: "Mp3", onClick: function (handler) {
                                        handler.close();
                                        saveMp3File(audioData, meta).then(resolve, reject);
                                    }, primary: false
                                }, {
                                    text: "Flac", onClick: function (handler) {
                                        handler.close();
                                        saveFlacFile(audioData, meta).then(resolve, reject);
                                    }, primary: false
                                }, {
                                    text: "Wav", onClick: function (handler) {
                                        handler.close();
                                        saveWavFile(audioData, meta).then(resolve, reject);
                                    }, primary: true
                                }
                            ]
                        }))];
                case 2:
                    _d = _e.sent(), status = _d.status, error = _d.error;
                    if (status === "rejected" && !lib_std_1.Errors.isAbort(error)) {
                        reject(error);
                        return [2 /*return*/];
                    }
                    return [2 /*return*/, promise];
            }
        });
    }); };
    Mixdowns.exportStems = function (_a, config_1) { return __awaiter(_this, [_a, config_1], void 0, function (_b, config) {
        var project, abortController, progress, dialog, _c, status, value, renderError, _d, zipStatus, zipError;
        var source = _b.project, meta = _b.meta;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    project = source.copy();
                    abortController = new AbortController();
                    progress = new lib_std_1.DefaultObservableValue(0.0);
                    dialog = lib_std_1.RuntimeNotifier.progress({
                        headline: "Rendering mixdown...",
                        progress: progress,
                        cancel: function () { return abortController.abort(); }
                    });
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.OfflineEngineRenderer
                            .start(project, lib_std_1.Option.wrap(config), progress, abortController.signal))];
                case 1:
                    _c = _e.sent(), status = _c.status, value = _c.value, renderError = _c.error;
                    dialog.terminate();
                    if (!(status === "rejected")) return [3 /*break*/, 3];
                    if (lib_std_1.Errors.isAbort(renderError)) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Export Failed", message: String(renderError) })];
                case 2:
                    _e.sent();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(saveZipFile(value, meta, Object.values(config).map(function (_a) {
                        var fileName = _a.fileName;
                        return fileName;
                    })))];
                case 4:
                    _d = _e.sent(), zipStatus = _d.status, zipError = _d.error;
                    if (!(zipStatus === "rejected")) return [3 /*break*/, 6];
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Export Failed", message: String(zipError) })];
                case 5:
                    _e.sent();
                    return [2 /*return*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var saveWavFile = function (audioData, meta) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, saveFileAfterAsync({
                    buffer: lib_dsp_1.WavFile.encodeFloats(audioData),
                    headline: "Save Wav",
                    suggestedName: "".concat(meta.name, ".wav")
                })];
        });
    }); };
    var saveMp3File = function (audioData, meta) { return __awaiter(_this, void 0, void 0, function () {
        var ffmpeg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadFFmepg()];
                case 1:
                    ffmpeg = _a.sent();
                    return [2 /*return*/, encodeAndSaveFile({
                            converter: ffmpeg.mp3Converter(),
                            fileExtension: "mp3",
                            fileType: "Mp3",
                            fileName: meta.name,
                            audioData: audioData
                        })];
            }
        });
    }); };
    var saveFlacFile = function (audioData, meta) { return __awaiter(_this, void 0, void 0, function () {
        var ffmpeg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadFFmepg()];
                case 1:
                    ffmpeg = _a.sent();
                    return [2 /*return*/, encodeAndSaveFile({
                            converter: ffmpeg.flacConverter(),
                            fileExtension: "flac",
                            fileType: "Flac",
                            fileName: meta.name,
                            audioData: audioData
                        })];
            }
        });
    }); };
    var encodeAndSaveFile = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
        var progress, progressDialog, flac;
        var audioData = _b.audioData, converter = _b.converter, fileType = _b.fileType, fileExtension = _b.fileExtension, fileName = _b.fileName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    progress = new lib_std_1.DefaultObservableValue(0.0);
                    progressDialog = lib_std_1.RuntimeNotifier.progress({ headline: "Encoding ".concat(fileType, "..."), progress: progress });
                    return [4 /*yield*/, converter.convert(new Blob([lib_dsp_1.WavFile.encodeFloats(audioData)]), function (value) { return progress.setValue(value); })];
                case 1:
                    flac = _c.sent();
                    progressDialog.terminate();
                    return [2 /*return*/, saveFileAfterAsync({
                            buffer: flac,
                            headline: "Save ".concat(fileType),
                            suggestedName: "".concat(fileName, ".").concat(fileExtension)
                        })];
            }
        });
    }); };
    var saveZipFile = function (audioData, meta, trackNames) { return __awaiter(_this, void 0, void 0, function () {
        var libResult, dialog, numStems, zip, stemIndex, l, r, stemData, file, _a, status, arrayBuffer, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, studio_core_1.ExternalLib.JSZip()];
                case 1:
                    libResult = _b.sent();
                    if (!(libResult.status === "rejected")) return [3 /*break*/, 3];
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                            headline: "Error",
                            message: "Could not load JSZip: ".concat(String(libResult.error))
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, Promise.reject(libResult.error)];
                case 3:
                    dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Creating Zip File..." });
                    numStems = audioData.numberOfChannels >> 1;
                    zip = new libResult.value();
                    for (stemIndex = 0; stemIndex < numStems; stemIndex++) {
                        l = audioData.frames[stemIndex * 2];
                        r = audioData.frames[stemIndex * 2 + 1];
                        stemData = lib_dsp_1.AudioData.create(audioData.sampleRate, audioData.numberOfFrames, 2);
                        stemData.frames[0].set(l);
                        stemData.frames[1].set(r);
                        file = lib_dsp_1.WavFile.encodeFloats(stemData);
                        zip.file("".concat(trackNames[stemIndex], ".wav"), file, { binary: true });
                    }
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(zip.generateAsync({
                            type: "arraybuffer",
                            compression: "DEFLATE",
                            compressionOptions: { level: 6 }
                        }))];
                case 4:
                    _a = _b.sent(), status = _a.status, arrayBuffer = _a.value, error = _a.error;
                    dialog.terminate();
                    if (!(status === "rejected")) return [3 /*break*/, 6];
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                            headline: "Error",
                            message: "Could not create zip file: ".concat(String(error))
                        })];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
                case 6: return [2 /*return*/, saveFileAfterAsync({
                        buffer: arrayBuffer,
                        headline: "Save Zip",
                        message: "Size: ".concat(arrayBuffer.byteLength >> 20, "M"),
                        suggestedName: "".concat(meta.name, ".zip")
                    })];
            }
        });
    }); };
    var loadFFmepg = function () { return __awaiter(_this, void 0, void 0, function () {
        var FFmpegWorker, progress, progressDialog, _a, status, value, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.guardedRetry(function () {
                        return Promise.resolve().then(function () { return require("@opendaw/studio-core/FFmpegWorker"); });
                    }, function (_, count) { return count < 60; })];
                case 1:
                    FFmpegWorker = (_b.sent()).FFmpegWorker;
                    progress = new lib_std_1.DefaultObservableValue(0.0);
                    progressDialog = lib_std_1.RuntimeNotifier.progress({ headline: "Loading FFmpeg...", progress: progress });
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(FFmpegWorker.load(function (value) { return progress.setValue(value); }))];
                case 2:
                    _a = _b.sent(), status = _a.status, value = _a.value, error = _a.error;
                    progressDialog.terminate();
                    if (!(status === "rejected")) return [3 /*break*/, 4];
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                            headline: "Error",
                            message: "Could not load FFmpeg: ".concat(String(error))
                        })];
                case 3:
                    _b.sent();
                    throw error;
                case 4: return [2 /*return*/, value];
            }
        });
    }); };
    // browsers need a user-input to allow download
    var saveFileAfterAsync = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
        var approved, saveResult;
        var buffer = _b.buffer, headline = _b.headline, message = _b.message, suggestedName = _b.suggestedName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({ headline: headline, message: message !== null && message !== void 0 ? message : "", approveText: "Save" })];
                case 1:
                    approved = _c.sent();
                    if (!approved) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Files.save(buffer, { suggestedName: suggestedName }))];
                case 2:
                    saveResult = _c.sent();
                    if (saveResult.status === "rejected" && !lib_std_1.Errors.isAbort(saveResult.error)) {
                        (0, lib_std_1.panic)(String(saveResult.error));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
})(Mixdowns || (exports.Mixdowns = Mixdowns = {}));
