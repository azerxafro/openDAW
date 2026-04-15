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
exports.testAudioProject = void 0;
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var testAudioProject = function (service) { return __awaiter(void 0, void 0, void 0, function () {
    var skeleton, boxGraph, _a, userInterfaceBoxes, timelineBox, audioUnitBox, tapeBox, trackBox, arrayBuffer, sample, uuid, audioData, transients, audioFileBox, durationInSeconds, valueEventCollectionBox, timeStretchBox, audioRegionBox;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                skeleton = studio_adapters_1.ProjectSkeleton.empty({ createDefaultUser: true, createOutputMaximizer: false });
                boxGraph = skeleton.boxGraph, _a = skeleton.mandatoryBoxes, userInterfaceBoxes = _a.userInterfaceBoxes, timelineBox = _a.timelineBox;
                boxGraph.beginTransaction();
                timelineBox.bpm.setValue(140);
                audioUnitBox = studio_adapters_1.AudioUnitFactory.create(skeleton, studio_enums_1.AudioUnitType.Instrument, lib_std_1.Option.wrap(studio_boxes_1.CaptureAudioBox.create(boxGraph, lib_std_1.UUID.generate())));
                tapeBox = studio_adapters_1.InstrumentFactories.Tape
                    .create(boxGraph, audioUnitBox.input, "Tape", studio_enums_1.IconSymbol.Play);
                trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.target.refer(tapeBox);
                    box.type.setValue(studio_adapters_1.TrackType.Audio);
                    box.tracks.refer(audioUnitBox.tracks);
                });
                return [4 /*yield*/, fetch("test/Drum.02.wav").then(function (response) { return response.arrayBuffer(); })];
            case 1:
                arrayBuffer = _b.sent();
                return [4 /*yield*/, service.sampleService.importFile({ name: "Test", arrayBuffer: arrayBuffer, progressHandler: lib_std_1.Progress.Empty })];
            case 2:
                sample = _b.sent();
                uuid = lib_std_1.UUID.parse(sample.uuid);
                return [4 /*yield*/, studio_core_1.SampleStorage.get().load(uuid)];
            case 3:
                audioData = (_b.sent())[0];
                return [4 /*yield*/, studio_core_1.Workers.Transients.detect(audioData)];
            case 4:
                transients = _b.sent();
                audioFileBox = studio_boxes_1.AudioFileBox.create(boxGraph, uuid, function (box) {
                    box.endInSeconds.setValue(sample.duration);
                });
                transients.forEach(function (position) { return studio_boxes_1.TransientMarkerBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.owner.refer(audioFileBox.transientMarkers);
                    box.position.setValue(position);
                }); });
                durationInSeconds = audioData.numberOfFrames / audioData.sampleRate;
                valueEventCollectionBox = studio_boxes_1.ValueEventCollectionBox.create(boxGraph, lib_std_1.UUID.generate());
                timeStretchBox = studio_boxes_1.AudioTimeStretchBox.create(boxGraph, lib_std_1.UUID.generate());
                studio_boxes_1.WarpMarkerBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.owner.refer(timeStretchBox.warpMarkers);
                    box.position.setValue(0);
                    box.seconds.setValue(0);
                });
                studio_boxes_1.WarpMarkerBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.owner.refer(timeStretchBox.warpMarkers);
                    box.position.setValue(lib_dsp_1.PPQN.Bar * 2);
                    box.seconds.setValue(durationInSeconds * 0.5);
                });
                studio_boxes_1.WarpMarkerBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.owner.refer(timeStretchBox.warpMarkers);
                    box.position.setValue(lib_dsp_1.PPQN.Bar * 4);
                    box.seconds.setValue(durationInSeconds);
                });
                audioRegionBox = studio_boxes_1.AudioRegionBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.timeBase.setValue(lib_dsp_1.TimeBase.Musical);
                    box.duration.setValue(lib_dsp_1.PPQN.Bar * 4);
                    box.loopDuration.setValue(lib_dsp_1.PPQN.Bar * 4);
                    box.file.refer(audioFileBox);
                    box.events.refer(valueEventCollectionBox.owners);
                    box.regions.refer(trackBox.regions);
                    box.label.setValue("Test Audio Region");
                    box.hue.setValue(180);
                    box.playMode.refer(timeStretchBox);
                });
                userInterfaceBoxes[0].editingTimelineRegion.refer(audioRegionBox);
                userInterfaceBoxes[0].editingDeviceChain.refer(audioUnitBox.editing);
                boxGraph.endTransaction();
                service.projectProfileService.setProject(studio_core_1.Project.fromSkeleton(service, skeleton), "Test Project");
                return [2 /*return*/];
        }
    });
}); };
exports.testAudioProject = testAudioProject;
