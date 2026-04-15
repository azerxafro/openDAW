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
exports.runAllBenchmarks = exports.SAMPLE_RATE = exports.RENDER_SECONDS = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
exports.RENDER_SECONDS = 60;
exports.SAMPLE_RATE = 48000;
var audioEffects = [
    {
        name: "Compressor",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.CompressorDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Crusher",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.CrusherDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Dattorro Reverb",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.DattorroReverbDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Delay",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.DelayDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Fold",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.FoldDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Gate",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.GateDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Maximizer",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.MaximizerDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Reverb (FreeVerb)",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.ReverbDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Revamp (EQ)",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.RevampDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Stereo Tool",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.StereoToolDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Tidal",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.TidalDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    },
    {
        name: "Waveshaper",
        addToUnit: function (boxGraph, unit) { return studio_boxes_1.WaveshaperDeviceBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.host.refer(unit.audioEffects);
            box.index.setValue(0);
        }); }
    }
];
var sampleUuid = lib_std_1.UUID.generate();
var createSampleData = function () {
    var durationFrames = exports.SAMPLE_RATE * 10;
    var data = lib_dsp_1.AudioData.create(exports.SAMPLE_RATE, durationFrames, 2);
    var _a = data.frames, left = _a[0], right = _a[1];
    for (var i = 0; i < durationFrames; i++) {
        var sample = Math.sin(2 * Math.PI * 440 * i / exports.SAMPLE_RATE) * 0.5;
        left[i] = sample;
        right[i] = sample;
    }
    return data;
};
var createTapeSkeleton = function (effect) {
    var skeleton = studio_adapters_1.ProjectSkeleton.empty({ createDefaultUser: true, createOutputMaximizer: false });
    var boxGraph = skeleton.boxGraph;
    boxGraph.beginTransaction();
    var audioUnitBox = studio_adapters_1.AudioUnitFactory.create(skeleton, studio_enums_1.AudioUnitType.Instrument, lib_std_1.Option.wrap(studio_boxes_1.CaptureAudioBox.create(boxGraph, lib_std_1.UUID.generate())));
    studio_adapters_1.InstrumentFactories.Tape.create(boxGraph, audioUnitBox.input, "Tape", studio_enums_1.IconSymbol.Tape);
    var trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
        box.target.refer(audioUnitBox);
        box.type.setValue(studio_adapters_1.TrackType.Audio);
        box.tracks.refer(audioUnitBox.tracks);
    });
    studio_boxes_1.AudioFileBox.create(boxGraph, sampleUuid, function (box) {
        box.endInSeconds.setValue(10);
    });
    var valueEventCollectionBox = studio_boxes_1.ValueEventCollectionBox.create(boxGraph, lib_std_1.UUID.generate());
    studio_boxes_1.AudioRegionBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
        box.timeBase.setValue(lib_dsp_1.TimeBase.Musical);
        box.position.setValue(0);
        box.duration.setValue(lib_dsp_1.PPQN.Bar * 16);
        box.loopDuration.setValue(lib_dsp_1.PPQN.Bar * 16);
        box.file.refer(boxGraph.findBox(sampleUuid).unwrap());
        box.events.refer(valueEventCollectionBox.owners);
        box.regions.refer(trackBox.regions);
    });
    if (effect !== null) {
        effect.addToUnit(boxGraph, audioUnitBox);
    }
    boxGraph.endTransaction();
    return skeleton;
};
var defaultPitches = [60, 64, 67, 72, 60, 65, 69, 72, 60, 62, 65, 69];
var addNoteRegion = function (boxGraph, trackBox, pitches) {
    if (pitches === void 0) { pitches = defaultPitches; }
    var noteEventCollectionBox = studio_boxes_1.NoteEventCollectionBox.create(boxGraph, lib_std_1.UUID.generate());
    pitches.forEach(function (pitch, index) {
        studio_boxes_1.NoteEventBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.position.setValue(index * lib_dsp_1.PPQN.Quarter);
            box.duration.setValue(lib_dsp_1.PPQN.Quarter * 0.9);
            box.pitch.setValue(pitch);
            box.velocity.setValue(0.8);
            box.events.refer(noteEventCollectionBox.events);
        });
    });
    studio_boxes_1.NoteRegionBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
        box.position.setValue(0);
        box.duration.setValue(lib_dsp_1.PPQN.Bar * 4);
        box.loopDuration.setValue(lib_dsp_1.PPQN.Bar * 4);
        box.regions.refer(trackBox.regions);
        box.events.refer(noteEventCollectionBox.owners);
    });
};
var instruments = [
    {
        name: "Vaporisateur",
        needsSample: false,
        create: function (skeleton) {
            var boxGraph = skeleton.boxGraph;
            var audioUnitBox = studio_adapters_1.AudioUnitFactory.create(skeleton, studio_enums_1.AudioUnitType.Instrument, lib_std_1.Option.wrap(studio_boxes_1.CaptureMidiBox.create(boxGraph, lib_std_1.UUID.generate())));
            studio_adapters_1.InstrumentFactories.Vaporisateur.create(boxGraph, audioUnitBox.input, "Vaporisateur", studio_enums_1.IconSymbol.Waveform);
            var trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.target.refer(audioUnitBox);
                box.type.setValue(studio_adapters_1.TrackType.Notes);
                box.tracks.refer(audioUnitBox.tracks);
            });
            addNoteRegion(boxGraph, trackBox);
        }
    },
    {
        name: "Nano",
        needsSample: true,
        create: function (skeleton) {
            var boxGraph = skeleton.boxGraph;
            var audioUnitBox = studio_adapters_1.AudioUnitFactory.create(skeleton, studio_enums_1.AudioUnitType.Instrument, lib_std_1.Option.wrap(studio_boxes_1.CaptureMidiBox.create(boxGraph, lib_std_1.UUID.generate())));
            studio_boxes_1.AudioFileBox.create(boxGraph, sampleUuid, function (box) {
                box.endInSeconds.setValue(10);
            });
            studio_adapters_1.InstrumentFactories.Nano.create(boxGraph, audioUnitBox.input, "Nano", studio_enums_1.IconSymbol.NanoWave, boxGraph.findBox(sampleUuid).unwrap());
            var trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.target.refer(audioUnitBox);
                box.type.setValue(studio_adapters_1.TrackType.Notes);
                box.tracks.refer(audioUnitBox.tracks);
            });
            addNoteRegion(boxGraph, trackBox);
        }
    },
    {
        name: "Playfield",
        needsSample: true,
        create: function (skeleton) {
            var boxGraph = skeleton.boxGraph;
            var audioUnitBox = studio_adapters_1.AudioUnitFactory.create(skeleton, studio_enums_1.AudioUnitType.Instrument, lib_std_1.Option.wrap(studio_boxes_1.CaptureMidiBox.create(boxGraph, lib_std_1.UUID.generate())));
            studio_boxes_1.AudioFileBox.create(boxGraph, sampleUuid, function (box) {
                box.endInSeconds.setValue(10);
            });
            var pads = [36, 38, 42, 46].map(function (note) { return ({
                note: note,
                uuid: sampleUuid, name: "perf-sine", durationInSeconds: 10, exclude: false
            }); });
            studio_adapters_1.InstrumentFactories.Playfield.create(boxGraph, audioUnitBox.input, "Playfield", studio_enums_1.IconSymbol.Playfield, pads);
            var trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.target.refer(audioUnitBox);
                box.type.setValue(studio_adapters_1.TrackType.Notes);
                box.tracks.refer(audioUnitBox.tracks);
            });
            addNoteRegion(boxGraph, trackBox, [36, 38, 42, 46, 36, 38, 42, 46, 36, 38, 42, 46]);
        }
    },
    {
        name: "Soundfont",
        needsSample: false,
        create: function (skeleton) {
            var boxGraph = skeleton.boxGraph;
            var audioUnitBox = studio_adapters_1.AudioUnitFactory.create(skeleton, studio_enums_1.AudioUnitType.Instrument, lib_std_1.Option.wrap(studio_boxes_1.CaptureMidiBox.create(boxGraph, lib_std_1.UUID.generate())));
            studio_adapters_1.InstrumentFactories.Soundfont.create(boxGraph, audioUnitBox.input, "Soundfont", studio_enums_1.IconSymbol.SoundFont);
            var trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.target.refer(audioUnitBox);
                box.type.setValue(studio_adapters_1.TrackType.Notes);
                box.tracks.refer(audioUnitBox.tracks);
            });
            addNoteRegion(boxGraph, trackBox);
        }
    },
];
var createInstrumentSkeleton = function (instrument) {
    var skeleton = studio_adapters_1.ProjectSkeleton.empty({ createDefaultUser: true, createOutputMaximizer: false });
    var boxGraph = skeleton.boxGraph;
    boxGraph.beginTransaction();
    instrument.create(skeleton);
    boxGraph.endTransaction();
    return skeleton;
};
var injectSample = function (service, sampleData) {
    service.sampleManager.remove(sampleUuid);
    var loader = new studio_core_1.DefaultSampleLoader(sampleUuid);
    var emptyPeaks = { stages: [], data: [], numFrames: 0, numChannels: 0, nearest: function () { return null; } };
    loader.setLoaded(sampleData, emptyPeaks, {
        name: "perf-sine", duration: 10, sample_rate: exports.SAMPLE_RATE, bpm: 120, origin: "openDAW"
    });
    service.sampleManager.record(loader);
};
var renderAndMeasure = function (service, skeleton, sampleData) { return __awaiter(void 0, void 0, void 0, function () {
    var project, renderer, start, audio, elapsed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (sampleData !== null) {
                    injectSample(service, sampleData);
                }
                project = studio_core_1.Project.fromSkeleton(service, skeleton, false);
                return [4 /*yield*/, studio_core_1.OfflineEngineRenderer.create(project, lib_std_1.Option.None, exports.SAMPLE_RATE)];
            case 1:
                renderer = _a.sent();
                return [4 /*yield*/, renderer.waitForLoading()];
            case 2:
                _a.sent();
                renderer.play();
                start = performance.now();
                return [4 /*yield*/, renderer.step(exports.RENDER_SECONDS * exports.SAMPLE_RATE)];
            case 3:
                audio = _a.sent();
                elapsed = performance.now() - start;
                renderer.stop();
                renderer.terminate();
                project.terminate();
                return [2 /*return*/, { elapsed: elapsed, audio: audio }];
        }
    });
}); };
var tryRender = function (service, skeleton, sampleData) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, renderAndMeasure(service, skeleton, sampleData)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, error_1 instanceof Error ? error_1.message : String(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var runAllBenchmarks = function (service, onProgress, onResult) { return __awaiter(void 0, void 0, void 0, function () {
    var sampleData, totalDevices, totalQuanta, step, emitResult, warmupSkeleton, emptySkeleton, emptyResult, emptyMs, baselineResult, baselineMs, _i, audioEffects_1, effect, _a, _b, instruments_1, instrument, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, service.audioContext.suspend()];
            case 1:
                _d.sent();
                sampleData = createSampleData();
                totalDevices = audioEffects.length + instruments.length + 3;
                totalQuanta = exports.RENDER_SECONDS * exports.SAMPLE_RATE / 128;
                step = 0;
                emitResult = function (result, category, name, baselineMs) {
                    if (typeof result === "string") {
                        onResult({ category: category, name: name, renderMs: 0, marginalMs: 0, perQuantumUs: 0,
                            durationSeconds: exports.RENDER_SECONDS, error: result });
                    }
                    else {
                        var marginalMs = result.elapsed - baselineMs;
                        onResult({ category: category, name: name, renderMs: result.elapsed, marginalMs: marginalMs, perQuantumUs: (marginalMs / totalQuanta) * 1000, durationSeconds: exports.RENDER_SECONDS,
                            audio: result.audio });
                    }
                };
                onProgress({ current: "Warmup", index: step, total: totalDevices });
                warmupSkeleton = studio_adapters_1.ProjectSkeleton.empty({ createDefaultUser: true, createOutputMaximizer: false });
                return [4 /*yield*/, tryRender(service, warmupSkeleton, null)];
            case 2:
                _d.sent();
                step++;
                onProgress({ current: "Empty engine", index: step, total: totalDevices });
                emptySkeleton = studio_adapters_1.ProjectSkeleton.empty({ createDefaultUser: true, createOutputMaximizer: false });
                return [4 /*yield*/, tryRender(service, emptySkeleton, null)];
            case 3:
                emptyResult = _d.sent();
                emptyMs = typeof emptyResult === "string" ? 0 : emptyResult.elapsed;
                emitResult(emptyResult, "Baseline", "Empty engine", emptyMs);
                step++;
                onProgress({ current: "Tape only", index: step, total: totalDevices });
                return [4 /*yield*/, tryRender(service, createTapeSkeleton(null), sampleData)];
            case 4:
                baselineResult = _d.sent();
                baselineMs = typeof baselineResult === "string" ? 0 : baselineResult.elapsed;
                emitResult(baselineResult, "Baseline", "Tape only", emptyMs);
                step++;
                _i = 0, audioEffects_1 = audioEffects;
                _d.label = 5;
            case 5:
                if (!(_i < audioEffects_1.length)) return [3 /*break*/, 8];
                effect = audioEffects_1[_i];
                onProgress({ current: effect.name, index: step, total: totalDevices });
                _a = emitResult;
                return [4 /*yield*/, tryRender(service, createTapeSkeleton(effect), sampleData)];
            case 6:
                _a.apply(void 0, [_d.sent(), "Audio Effect", effect.name, baselineMs]);
                step++;
                _d.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8:
                _b = 0, instruments_1 = instruments;
                _d.label = 9;
            case 9:
                if (!(_b < instruments_1.length)) return [3 /*break*/, 12];
                instrument = instruments_1[_b];
                onProgress({ current: instrument.name, index: step, total: totalDevices });
                _c = emitResult;
                return [4 /*yield*/, tryRender(service, createInstrumentSkeleton(instrument), instrument.needsSample ? sampleData : null)];
            case 10:
                _c.apply(void 0, [_d.sent(), "Instrument", instrument.name, baselineMs]);
                step++;
                _d.label = 11;
            case 11:
                _b++;
                return [3 /*break*/, 9];
            case 12: return [4 /*yield*/, service.audioContext.resume()];
            case 13:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.runAllBenchmarks = runAllBenchmarks;
