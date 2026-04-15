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
exports.SampleUploadPage = void 0;
var SampleUploadPage_sass_inline_1 = require("./SampleUploadPage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(SampleUploadPage_sass_inline_1.default, "SampleUploadPage");
var SampleUploadPage = function (_a) {
    var service = _a.service;
    return (<div className={className}>
            <h1>Upload Sample</h1>
            <div>
                <button onclick={function () { return __awaiter(void 0, void 0, void 0, function () {
            var file, arrayBuffer, buffer, name_1, sample_rate, duration, bpm, wav, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, lib_dom_1.Files.open(studio_core_1.FilePickerAcceptTypes.WavFiles)];
                    case 1:
                        file = (_a.sent())[0];
                        return [4 /*yield*/, file.arrayBuffer()];
                    case 2:
                        arrayBuffer = _a.sent();
                        if (arrayBuffer.byteLength === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, service.audioContext.decodeAudioData(arrayBuffer.slice())];
                    case 3:
                        buffer = _a.sent();
                        if (arrayBuffer.byteLength === 0) {
                            return [2 /*return*/];
                        }
                        name_1 = file.name.substring(0, file.name.lastIndexOf(".wav"));
                        sample_rate = buffer.sampleRate;
                        duration = buffer.duration;
                        bpm = (0, lib_dsp_1.estimateBpm)(duration);
                        wav = lib_dsp_1.WavFile.encodeFloats(buffer);
                        console.debug("name", name_1);
                        console.debug("sampleRate", sample_rate);
                        console.debug("duration", duration);
                        console.debug("bpm", bpm);
                        return [4 /*yield*/, studio_core_1.OpenSampleAPI.get().upload(wav, { name: name_1, bpm: bpm, sample_rate: sample_rate, duration: duration, origin: "openDAW" })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1 instanceof DOMException && error_1.name === "AbortError") {
                            console.debug("Caught an AbortError");
                        }
                        else {
                            dialogs_tsx_1.Dialogs.info({ message: String(error_1) }).finally();
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); }}>
                    Browse
                </button>
            </div>
        </div>);
};
exports.SampleUploadPage = SampleUploadPage;
