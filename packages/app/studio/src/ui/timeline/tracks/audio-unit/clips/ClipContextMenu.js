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
exports.installClipContextMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var name_ts_1 = require("@/ui/validator/name.ts");
var debug_1 = require("@/ui/menu/debug");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var ColorMenu_1 = require("@/ui/timeline/ColorMenu");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var installClipContextMenu = function (_a) {
    var element = _a.element, project = _a.project, selection = _a.selection, capturing = _a.capturing;
    return studio_core_1.ContextMenu.subscribe(element, function (collector) {
        var client = collector.client;
        var target = capturing.captureEvent(client);
        var editing = project.editing;
        if (target === null) {
            // TODO Create clips
        }
        else if (target.type === "clip") {
            var clip_1 = target.clip;
            if (!selection.isSelected(clip_1)) {
                selection.deselectAll();
                selection.select(clip_1);
            }
            var modify_1 = function (procedure) {
                return editing.modify(function () { return selection.selected().forEach(function (adapter) { return procedure(adapter); }); });
            };
            collector.addItems(studio_core_1.MenuItem.default({ label: "Delete" })
                .setTriggerProcedure(function () { return editing.modify(function () {
                return selection.selected().forEach(function (clip) { return clip.box.delete(); });
            }); }), studio_core_1.MenuItem.default({ label: "Rename" })
                .setTriggerProcedure(function () { return Surface_tsx_1.Surface.get(element).requestFloatingTextInput(client, clip_1.label)
                .then(function (value) {
                name_ts_1.NameValidator.validate(value, {
                    success: function (name) { return editing.modify(function () { return selection.selected()
                        .forEach(function (adapter) { return adapter.box.label.setValue(name); }); }); }
                });
            }, lib_std_1.EmptyExec); }), studio_core_1.MenuItem.default({ label: "Mute", checked: clip_1.box.mute.getValue() })
                .setTriggerProcedure(function () {
                var newValue = !clip_1.box.mute.getValue();
                modify_1(function (_a) {
                    var mute = _a.box.mute;
                    return mute.setValue(newValue);
                });
            }), ColorMenu_1.ColorMenu.createItem(function (hue) { return modify_1(function (adapter) { return adapter.box.hue.setValue(hue); }); }), studio_core_1.MenuItem.default({ label: "Consolidate", selectable: clip_1.isMirrowed })
                .setTriggerProcedure(function () { return editing.modify(function () {
                return selection.selected().forEach(function (clip) { return clip.consolidate(); });
            }); }), studio_core_1.MenuItem.default({
                label: "Playback",
                hidden: clip_1.type !== "audio-clip",
                separatorBefore: true
            }).setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({
                label: "Pitch",
                checked: clip_1.type === "audio-clip" && clip_1.asPlayModePitchStretch.nonEmpty()
            }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, status, modifier, error;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioContentModifier.toPitchStretch(selection.selected()
                                .filter(function (clip) { return clip.type === "audio-clip"; })))];
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
                checked: clip_1.type === "audio-clip" && clip_1.asPlayModeTimeStretch.nonEmpty()
            }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, status, modifier, error;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioContentModifier.toTimeStretch(selection.selected()
                                .filter(function (clip) { return clip.type === "audio-clip"; })))];
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
                checked: clip_1.type === "audio-clip" && clip_1.isPlayModeNoStretch
            }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, status, modifier, error;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioContentModifier.toNotStretched(selection.selected()
                                .filter(function (clip) { return clip.type === "audio-clip"; })))];
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
            }); })); }), studio_core_1.MenuItem.default({ label: "Trigger" })
                .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Loop", checked: clip_1.box.triggerMode.loop.getValue() })
                .setTriggerProcedure(function () {
                var newValue = !clip_1.box.triggerMode.loop.getValue();
                modify_1(function (_a) {
                    var loop = _a.box.triggerMode.loop;
                    return loop.setValue(newValue);
                });
            })); }), studio_core_1.MenuItem.default({
                label: "Convert to Region", separatorBefore: true
            }).setTriggerProcedure(function () {
                var _a;
                var trackBoxAdapter = clip_1.trackBoxAdapter.unwrap();
                var regions = trackBoxAdapter.regions;
                var lastRegion = regions.collection.lowerEqual(Number.POSITIVE_INFINITY);
                var position = (_a = lastRegion === null || lastRegion === void 0 ? void 0 : lastRegion.complete) !== null && _a !== void 0 ? _a : 0;
                // TODO Move to ClipTransformer and put into edit mode
                editing.modify(function () {
                    if (clip_1.type === "note-clip") {
                        studio_boxes_1.NoteRegionBox.create(clip_1.box.graph, lib_std_1.UUID.generate(), function (box) {
                            box.position.setValue(position);
                            box.duration.setValue(clip_1.duration);
                            box.loopOffset.setValue(0);
                            box.loopDuration.setValue(clip_1.duration);
                            box.hue.setValue(clip_1.hue);
                            box.label.setValue(clip_1.label);
                            box.mute.setValue(clip_1.mute);
                            box.events.refer(clip_1.box.events.targetVertex.unwrap());
                            box.regions.refer(trackBoxAdapter.box.regions);
                        });
                    }
                    else if (clip_1.type === "audio-clip") {
                        studio_boxes_1.AudioRegionBox.create(clip_1.box.graph, lib_std_1.UUID.generate(), function (box) {
                            box.position.setValue(position);
                            box.duration.setValue(clip_1.duration);
                            box.loopOffset.setValue(0);
                            box.loopDuration.setValue(clip_1.duration);
                            box.hue.setValue(clip_1.hue);
                            box.label.setValue(clip_1.label);
                            box.mute.setValue(clip_1.mute);
                            box.timeBase.setValue(clip_1.timeBase);
                            box.file.refer(clip_1.box.file.targetVertex.unwrap());
                            box.events.refer(clip_1.box.events.targetVertex.unwrap());
                            box.regions.refer(trackBoxAdapter.box.regions);
                            clip_1.box.playMode.ifVertex(function (vertex) { return box.playMode.refer(vertex); });
                        });
                    }
                    else if (clip_1.type === "value-clip") {
                        studio_boxes_1.ValueRegionBox.create(clip_1.box.graph, lib_std_1.UUID.generate(), function (box) {
                            box.position.setValue(position);
                            box.duration.setValue(clip_1.duration);
                            box.loopOffset.setValue(0);
                            box.loopDuration.setValue(clip_1.duration);
                            box.hue.setValue(clip_1.hue);
                            box.label.setValue(clip_1.label);
                            box.mute.setValue(clip_1.mute);
                            box.events.refer(clip_1.box.events.targetVertex.unwrap());
                            box.regions.refer(trackBoxAdapter.box.regions);
                        });
                    }
                });
            }), studio_core_1.MenuItem.default({
                label: "Export to Midi-File",
                hidden: clip_1.type !== "note-clip"
            }).setTriggerProcedure(function () {
                if (clip_1.type === "note-clip") {
                    var label = clip_1.label;
                    studio_core_1.NoteMidiExport.toFile(clip_1.optCollection.unwrap(), "".concat(label.length === 0 ? "clip" : label, ".mid")).then();
                }
            }), debug_1.DebugMenus.debugBox(clip_1.box));
        }
    });
};
exports.installClipContextMenu = installClipContextMenu;
