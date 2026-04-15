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
exports.installTrackHeaderMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var MonitoringDialog_1 = require("@/ui/monitoring/MonitoringDialog");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var debug_1 = require("@/ui/menu/debug");
var MidiImport_ts_1 = require("@/ui/timeline/MidiImport.ts");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var capture_1 = require("@/ui/timeline/tracks/audio-unit/menu/capture");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var installTrackHeaderMenu = function (service, audioUnitBoxAdapter, trackBoxAdapter) { return function (parent) {
    var inputAdapter = audioUnitBoxAdapter.input.adapter();
    if (inputAdapter.isEmpty()) {
        return parent;
    }
    var accepts = inputAdapter.unwrap("Cannot unwrap input adapter").accepts;
    var acceptMidi = audioUnitBoxAdapter.captureBox.mapOr(function (box) { return (0, lib_std_1.isInstanceOf)(box, studio_boxes_1.CaptureMidiBox); }, false);
    var trackType = studio_adapters_1.DeviceAccepts.toTrackType(accepts);
    var project = service.project;
    var audioUnitFreeze = project.audioUnitFreeze, captureDevices = project.captureDevices, editing = project.editing, userEditingManager = project.userEditingManager, selection = project.selection;
    var isFrozen = audioUnitFreeze.isFrozen(audioUnitBoxAdapter);
    return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Enabled", checked: trackBoxAdapter.enabled.getValue() })
        .setTriggerProcedure(function () { return editing.modify(function () { return trackBoxAdapter.enabled.toggle(); }); }), studio_core_1.MenuItem.default({
        label: "New ".concat(studio_adapters_1.TrackType.toLabelString(trackType), " Track"),
        hidden: trackBoxAdapter.type === studio_adapters_1.TrackType.Undefined
    }).setTriggerProcedure(function () { return editing.modify(function () {
        studio_boxes_1.TrackBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (box) {
            box.type.setValue(trackType);
            box.tracks.refer(audioUnitBoxAdapter.box.tracks);
            box.index.setValue(audioUnitBoxAdapter.tracks.values().length);
            box.target.refer(audioUnitBoxAdapter.box);
        });
    }); }), capture_1.MenuCapture.createItem(service, audioUnitBoxAdapter, trackBoxAdapter, editing, captureDevices.get(audioUnitBoxAdapter.uuid)), studio_core_1.MenuItem.default({
        label: "Monitoring",
        hidden: captureDevices.get(audioUnitBoxAdapter.uuid)
            .mapOr(function (capture) { return !(0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio); }, true)
    }).setTriggerProcedure(function () {
        var optCapture = captureDevices.get(audioUnitBoxAdapter.uuid);
        if (optCapture.isEmpty()) {
            return;
        }
        var capture = optCapture.unwrap();
        if (!(0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio)) {
            return;
        }
        capture.armed.setValue(true);
        MonitoringDialog_1.MonitoringDialog.open(service, capture).finally();
    }), studio_core_1.MenuItem.default({
        label: "Force Mono",
        checked: captureDevices.get(audioUnitBoxAdapter.uuid)
            .mapOr(function (capture) { return (0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio)
            ? capture.requestChannels.mapOr(function (channels) { return channels === 1; }, false)
            : false; }, false),
        hidden: captureDevices.get(audioUnitBoxAdapter.uuid)
            .mapOr(function (capture) { return !(0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio); }, true)
    }).setTriggerProcedure(function () { return captureDevices.get(audioUnitBoxAdapter.uuid)
        .ifSome(function (capture) {
        if ((0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio)) {
            var currentMono_1 = capture.requestChannels.mapOr(function (channels) { return channels === 1; }, false);
            editing.modify(function () { return capture.requestChannels = currentMono_1 ? 2 : 1; });
        }
    }); }), studio_core_1.MenuItem.default({
        label: "Copy AudioUnit",
        shortcut: GlobalShortcuts_1.GlobalShortcuts["copy-device"].shortcut.format(),
        separatorBefore: true
    }).setTriggerProcedure(function () {
        var copies = editing.modify(function () { return studio_adapters_1.TransferAudioUnits
            .transfer([trackBoxAdapter.audioUnit], project.skeleton, {
            insertIndex: trackBoxAdapter.audioUnit.index.getValue() + 1
        }); }, false).unwrap();
        userEditingManager.audioUnit.edit(copies[0].editing);
    }), studio_core_1.MenuItem.default({
        label: "Freeze AudioUnit",
        hidden: !audioUnitBoxAdapter.isInstrument || isFrozen
    }).setTriggerProcedure(function () { return project.audioUnitFreeze.freeze(audioUnitBoxAdapter); }), studio_core_1.MenuItem.default({
        label: "Unfreeze AudioUnit",
        hidden: !audioUnitBoxAdapter.isInstrument || !isFrozen
    }).setTriggerProcedure(function () { return project.audioUnitFreeze.unfreeze(audioUnitBoxAdapter); }), studio_core_1.MenuItem.default({
        label: "Extract AudioUnit Into New Project"
    }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
        var approved, newProject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(service.hasProfile && !project.editing.hasNoChanges())) return [3 /*break*/, 2];
                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                            headline: "Closing Project?",
                            message: "You will lose all progress!"
                        })];
                case 1:
                    approved = _a.sent();
                    if (!approved) {
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    newProject = studio_core_1.Project.new(service);
                    editing.modify(function () {
                        var boxGraph = newProject.boxGraph, skeleton = newProject.skeleton;
                        boxGraph.beginTransaction();
                        studio_adapters_1.TransferAudioUnits.transfer([trackBoxAdapter.audioUnit], skeleton);
                        boxGraph.endTransaction();
                    });
                    service.projectProfileService.setProject(newProject, "NEW");
                    return [2 /*return*/];
            }
        });
    }); }), studio_core_1.MenuItem.default({ label: "Move", separatorBefore: true, selectable: !isFrozen })
        .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Track 1 Up", selectable: trackBoxAdapter.indexField.getValue() > 0 })
        .setTriggerProcedure(function () { return editing.modify(function () { return audioUnitBoxAdapter.moveTrack(trackBoxAdapter, -1); }); }), studio_core_1.MenuItem.default({
        label: "Track 1 Down",
        selectable: trackBoxAdapter.indexField.getValue() < audioUnitBoxAdapter.tracks.collection.size() - 1
    }).setTriggerProcedure(function () { return editing.modify(function () { return audioUnitBoxAdapter.moveTrack(trackBoxAdapter, 1); }); }), studio_core_1.MenuItem.default({
        label: "AudioUnit 1 Up",
        selectable: audioUnitBoxAdapter.indexField.getValue() > 0 && false
    }).setTriggerProcedure(function () { return editing.modify(function () { return audioUnitBoxAdapter.move(-1); }); }), studio_core_1.MenuItem.default({
        label: "AudioUnit 1 Down",
        selectable: audioUnitBoxAdapter.indexField.getValue() < project.rootBoxAdapter.audioUnits.adapters()
            .filter(function (adapter) { return !adapter.isOutput; }).length - 1 && false
    }).setTriggerProcedure(function () { return editing.modify(function () { return audioUnitBoxAdapter.move(1); }); })); }), studio_core_1.MenuItem.default({
        label: "Select Clips",
        selectable: !trackBoxAdapter.clips.collection.isEmpty() && !isFrozen
    }).setTriggerProcedure(function () { return trackBoxAdapter.clips.collection.adapters()
        .forEach(function (clip) { return selection.select(clip.box); }); }), studio_core_1.MenuItem.default({
        label: "Select Regions",
        selectable: !trackBoxAdapter.regions.collection.isEmpty() && !isFrozen
    }).setTriggerProcedure(function () { return trackBoxAdapter.regions.collection.asArray()
        .forEach(function (region) { return selection.select(region.box); }); }), studio_core_1.MenuItem.default({
        label: "Import MIDI File...",
        hidden: !acceptMidi,
        selectable: !isFrozen,
        separatorBefore: true
    }).setTriggerProcedure(function () { return MidiImport_ts_1.MidiImport.toTracks(project, audioUnitBoxAdapter); }), studio_core_1.MenuItem.default({
        label: "Delete '".concat(audioUnitBoxAdapter.input.label.unwrapOrElse("No Input"), "'"),
        selectable: !audioUnitBoxAdapter.isOutput,
        separatorBefore: true
    }).setTriggerProcedure(function () { return editing.modify(function () {
        return project.api.deleteAudioUnit(audioUnitBoxAdapter.box);
    }); }), studio_core_1.MenuItem.default({
        label: "Delete ".concat(studio_adapters_1.TrackType.toLabelString(trackBoxAdapter.type), " Track"),
        selectable: !audioUnitBoxAdapter.isOutput && !isFrozen,
        hidden: audioUnitBoxAdapter.tracks.collection.size() === 1
    }).setTriggerProcedure(function () { return editing.modify(function () {
        if (audioUnitBoxAdapter.tracks.collection.size() === 1) {
            project.api.deleteAudioUnit(audioUnitBoxAdapter.box);
        }
        else {
            audioUnitBoxAdapter.deleteTrack(trackBoxAdapter);
        }
    }); }), debug_1.DebugMenus.debugBox(audioUnitBoxAdapter.box));
}; };
exports.installTrackHeaderMenu = installTrackHeaderMenu;
