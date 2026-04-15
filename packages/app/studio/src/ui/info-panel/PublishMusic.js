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
exports.PublishMusic = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var PublishMusic;
(function (PublishMusic) {
    var _this = this;
    PublishMusic.publishMusic = function (profile, progress, log) { return __awaiter(_this, void 0, void 0, function () {
        var _a, bundleProgress, ffmpegProgress, convertProgress, uploadProgress, bundleResult, renderProgress, mixdownResult, FFmpegWorker, ffmpegResult, mp3File, formData, _b, resolve, reject, promise, xhr;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = lib_std_1.Progress.split(progress, 5), bundleProgress = _a[0], ffmpegProgress = _a[1], convertProgress = _a[2], uploadProgress = _a[3];
                    log("Preparing project for upload...");
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.ProjectBundle.encode(profile.copyForUpload(), bundleProgress))];
                case 1:
                    bundleResult = _c.sent();
                    if (bundleResult.status === "rejected") {
                        return [2 /*return*/, (0, lib_std_1.panic)(bundleResult.error)];
                    }
                    log("Mixdown audio...");
                    renderProgress = new lib_std_1.DefaultObservableValue(0.0);
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.OfflineEngineRenderer.start(profile.project.copy(), lib_std_1.Option.None, renderProgress))];
                case 2:
                    mixdownResult = _c.sent();
                    if (mixdownResult.status === "rejected") {
                        return [2 /*return*/, (0, lib_std_1.panic)(mixdownResult.error)];
                    }
                    log("Loading FFmpeg...");
                    return [4 /*yield*/, lib_runtime_1.Promises.guardedRetry(function () {
                            return Promise.resolve().then(function () { return require("@opendaw/studio-core/FFmpegWorker"); });
                        }, function (_, count) { return count < 10; })];
                case 3:
                    FFmpegWorker = (_c.sent()).FFmpegWorker;
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(FFmpegWorker.load(ffmpegProgress))];
                case 4:
                    ffmpegResult = _c.sent();
                    if (ffmpegResult.status === "rejected") {
                        return [2 /*return*/, (0, lib_std_1.panic)(ffmpegResult.error)];
                    }
                    log("Converting to MP3...");
                    return [4 /*yield*/, ffmpegResult.value.mp3Converter()
                            .convert(new Blob([lib_dsp_1.WavFile.encodeFloats(mixdownResult.value)]), convertProgress)];
                case 5:
                    mp3File = _c.sent();
                    formData = new FormData();
                    formData.append("mixdown", new Blob([mp3File], { type: "audio/mpeg" }), "mixdown.mp3");
                    formData.append("bundle", new Blob([bundleResult.value], { type: "application/zip" }), "project.odb");
                    if ((0, lib_std_1.isDefined)(profile.meta.radioToken)) {
                        formData.append("token", profile.meta.radioToken);
                    }
                    log("Uploading...");
                    _b = Promise.withResolvers(), resolve = _b.resolve, reject = _b.reject, promise = _b.promise;
                    xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (event) {
                        if (event.lengthComputable) {
                            uploadProgress(event.loaded / event.total);
                        }
                    });
                    xhr.addEventListener("load", function () {
                        if (xhr.status === 200 || xhr.status === 201) {
                            var response = JSON.parse(xhr.responseText);
                            profile.meta.radioToken = response.id;
                            profile.save();
                            resolve(response.id);
                        }
                        else {
                            console.warn(xhr.status, xhr.responseText);
                            var error = JSON.parse(xhr.responseText);
                            reject(new Error(error.error || "Upload failed"));
                        }
                    });
                    xhr.addEventListener("error", function () { return reject(new Error("Network error")); });
                    xhr.addEventListener("abort", function () { return reject(new Error("Upload cancelled")); });
                    xhr.open("POST", "https://api.opendaw.studio/music/upload.php");
                    xhr.send(formData);
                    return [2 /*return*/, promise];
            }
        });
    }); };
    PublishMusic.deleteMusic = function (token) { return __awaiter(_this, void 0, void 0, function () {
        var formData, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append("token", token);
                    return [4 /*yield*/, fetch("https://api.opendaw.studio/music/delete.php", {
                            method: "POST",
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || "Delete failed");
                case 3: return [2 /*return*/];
            }
        });
    }); };
})(PublishMusic || (exports.PublishMusic = PublishMusic = {}));
