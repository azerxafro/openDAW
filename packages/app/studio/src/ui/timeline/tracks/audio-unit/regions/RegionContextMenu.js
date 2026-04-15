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
exports.installRegionContextMenu = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var AIPipeline_1 = require("@/service/ai/AIPipeline");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var RegionTransformer_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionTransformer.ts");
var name_ts_1 = require("@/ui/validator/name.ts");
var debug_1 = require("@/ui/menu/debug");
var studio_core_2 = require("@opendaw/studio-core");
var ColorMenu_1 = require("@/ui/timeline/ColorMenu");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var RegionsShortcuts_1 = require("@/ui/shortcuts/RegionsShortcuts");
var installRegionContextMenu = function (_a) {
    var element = _a.element, service = _a.service, capturing = _a.capturing, selection = _a.selection, timelineBox = _a.timelineBox, range = _a.range;
    var project = service.project;
    var editing = project.editing, vertexSelection = project.selection;
    var computeSelectionRange = function () { return selection.selected().reduce(function (range, region) {
        range[0] = Math.min(region.position, range[0]);
        range[1] = Math.max(region.complete, range[1]);
        return range;
    }, [Number.MAX_VALUE, -Number.MAX_VALUE]); };
    return studio_core_1.ContextMenu.subscribe(element, function (_a) {
        var addItems = _a.addItems, client = _a.client;
        var target = capturing.captureEvent(client);
        if (target === null || target.type === "track") {
            return;
        }
        if (!selection.isSelected(target.region)) {
            selection.deselectAll();
            selection.select(target.region);
        }
        var region = target.region;
        addItems(studio_core_1.MenuItem.default({ label: "Delete", shortcut: "⌫" })
            .setTriggerProcedure(function () { return editing.modify(function () { return selection.selected().slice()
            .forEach(function (adapter) { return adapter.box.delete(); }); }); }), studio_core_1.MenuItem.default({ label: "Duplicate" })
            .setTriggerProcedure(function () { return editing.modify(function () {
            project.api.duplicateRegion(region)
                .ifSome(function (duplicate) {
                selection.deselectAll();
                selection.select(duplicate);
            });
        }); }), studio_core_1.MenuItem.default({
            label: "Mute",
            checked: region.mute,
            shortcut: RegionsShortcuts_1.RegionsShortcuts["toggle-mute"].shortcut.format()
        }).setTriggerProcedure(function () { return editing.modify(function () {
            var newValue = !region.mute;
            return selection.selected().slice().forEach(function (adapter) { return adapter.box.mute.setValue(newValue); });
        }); }), ColorMenu_1.ColorMenu.createItem(function (hue) { return editing.modify(function () {
            return selection.selected().slice().forEach(function (adapter) { return adapter.box.hue.setValue(hue); });
        }); }), studio_core_1.MenuItem.default({ label: "Rename" })
            .setTriggerProcedure(function () { return Surface_tsx_1.Surface.get(element).requestFloatingTextInput(client, region.label)
            .then(function (value) { return name_ts_1.NameValidator.validate(value, {
            success: function (name) { return editing.modify(function () { return selection.selected()
                .forEach(function (adapter) { return adapter.box.label.setValue(name); }); }); }
        }); }, lib_std_1.EmptyExec); }), studio_core_1.MenuItem.default({ label: "Loop Selection" })
            .setTriggerProcedure(function () {
            var _a = computeSelectionRange(), min = _a[0], max = _a[1];
            editing.modify(function () {
                timelineBox.loopArea.from.setValue(min);
                timelineBox.loopArea.to.setValue(max);
            });
        }), studio_core_1.MenuItem.default({ label: "Zoom Selection" })
            .setTriggerProcedure(function () {
            var _a = computeSelectionRange(), min = _a[0], max = _a[1];
            range.zoomRange(min, max);
        }), studio_core_1.MenuItem.default({
            label: "Consolidate",
            selectable: selection.selected().some(function (x) { return x.isMirrowed; }),
            separatorBefore: true
        }).setTriggerProcedure(function () { return editing.modify(function () { return selection.selected().slice()
            .forEach(function (adapter) { return adapter.consolidate(); }); }); }), studio_core_1.MenuItem.default({ label: "Flatten", selectable: region.canFlatten(selection.selected()) })
            .setTriggerProcedure(function () {
            if (region instanceof studio_adapters_1.AudioRegionBoxAdapter) {
                var audioRegions = selection.selected()
                    .filter(function (adapter) {
                    return (0, lib_std_1.isInstanceOf)(adapter, studio_adapters_1.AudioRegionBoxAdapter);
                });
                studio_core_1.AudioConsolidation.flatten(project, service.sampleService, audioRegions)
                    .then(lib_std_1.EmptyExec, console.warn);
            }
            else {
                editing.modify(function () {
                    return region.flatten(selection.selected()).ifSome(function (box) { return project.selection.select(box); });
                });
            }
        }), studio_core_1.MenuItem.default({ label: "Convert to Clip" })
            .setTriggerProcedure(function () { return region.trackBoxAdapter.ifSome(function () { return editing.modify(function () {
            service.timeline.clips.visible.setValue(true);
            var clip = RegionTransformer_ts_1.RegionTransformer.toClip(region);
            vertexSelection.select(clip);
            project.userEditingManager.timeline.edit(clip);
        }); }); }), studio_core_1.MenuItem.default({
            label: "✨ AI Processing",
            hidden: region.type !== "audio-region",
            separatorBefore: true
        }).setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Extract Stems (Demucs)" })
            .setTriggerProcedure(function () { return AIPipeline_1.AIPipeline.extractStems(region, service); }), studio_core_1.MenuItem.default({ label: "Remove Noise (RNNoise)" })
            .setTriggerProcedure(function () { return AIPipeline_1.AIPipeline.removeNoise(region, service); }), studio_core_1.MenuItem.default({ label: "Convert to MIDI (Basic Pitch)" })
            .setTriggerProcedure(function () { return AIPipeline_1.AIPipeline.convertToMidi(region, service); })); }), studio_core_1.MenuItem.default({
            label: "Export to Midi-File",
            hidden: region.type !== "note-region"
        }).setTriggerProcedure(function () {
            if (region.type === "note-region") {
                var label = region.label;
                studio_core_2.NoteMidiExport.toFile(region.optCollection.unwrap(), "".concat(label.length === 0 ? "region" : label, ".mid")).then(lib_std_1.EmptyExec, lib_std_1.EmptyExec);
            }
        }), studio_core_1.MenuItem.default({
            label: "Reset Fades",
            hidden: region.type !== "audio-region"
        }).setTriggerProcedure(function () {
            if ((0, lib_std_1.isInstanceOf)(region, studio_adapters_1.AudioRegionBoxAdapter)) {
                editing.modify(function () { return region.fading.reset(); });
            }
        }), studio_core_1.MenuItem.default({
            label: "Play Mode",
            hidden: region.type !== "audio-region"
        }).setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({
            label: "Pitch",
            checked: region.type === "audio-region" && region.asPlayModePitchStretch.nonEmpty()
        }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, status, modifier, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioContentModifier.toPitchStretch(selection.selected()
                            .filter(function (region) { return region.type === "audio-region"; })))];
                    case 1:
                        _a = _b.sent(), status = _a.status, modifier = _a.value, error = _a.error;
                        if (status === "resolved") {
                            editing.modify(modifier);
                        }
                        else {
                            console.warn(error);
                        }
                        return [2 /*return*/];
                }
            });
        }); }), studio_core_1.MenuItem.default({
            label: "Timestretch",
            checked: region.type === "audio-region" && region.asPlayModeTimeStretch.nonEmpty()
        }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, status, modifier, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioContentModifier.toTimeStretch(selection.selected()
                            .filter(function (region) { return region.type === "audio-region"; })))];
                    case 1:
                        _a = _b.sent(), status = _a.status, modifier = _a.value, error = _a.error;
                        if (status === "resolved") {
                            editing.modify(modifier);
                        }
                        else {
                            console.warn(error);
                        }
                        return [2 /*return*/];
                }
            });
        }); }), studio_core_1.MenuItem.default({
            label: "No Warp",
            checked: region.type === "audio-region" && region.isPlayModeNoStretch
        }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, status, modifier, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioContentModifier.toNotStretched(selection.selected()
                            .filter(function (region) { return region.type === "audio-region"; })))];
                    case 1:
                        _a = _b.sent(), status = _a.status, modifier = _a.value, error = _a.error;
                        if (status === "resolved") {
                            editing.modify(modifier);
                        }
                        else {
                            console.warn(error);
                        }
                        return [2 /*return*/];
                }
            });
        }); })); }), studio_core_1.MenuItem.default({
            label: "Calc Bpm",
            hidden: region.type !== "audio-region" || !lib_dom_1.Browser.isLocalHost()
        }).setTriggerProcedure(function () {
            if (region.type === "audio-region") {
                region.file.data.ifSome(function (data) {
                    var bpm = lib_dsp_1.BPMTools.detect(data.frames[0], data.sampleRate);
                    dialogs_tsx_1.Dialogs.info({ headline: "BPMTools", message: "".concat(bpm.toFixed(3), " BPM") })
                        .finally();
                });
            }
        }), debug_1.DebugMenus.debugBox(region.box));
    });
};
exports.installRegionContextMenu = installRegionContextMenu;
