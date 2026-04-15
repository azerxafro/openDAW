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
exports.MidiImport = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_midi_1 = require("@opendaw/lib-midi");
var MidiImport;
(function (MidiImport) {
    var _this = this;
    MidiImport.toTracks = function (project, audioUnitBoxAdapter) { return __awaiter(_this, void 0, void 0, function () {
        function generate() {
            var _i, _a, midiTrack, _loop_1, _b, _c, _d, channel, midiEvents;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _i = 0, _a = format.tracks;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        midiTrack = _a[_i];
                        _loop_1 = function (channel, midiEvents) {
                            var trackBox, collection, map, duration, _loop_2, _f, midiEvents_1, midiEvent;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        console.debug("Importing ".concat(midiEvents.length, " events of channel #").concat(channel, "."));
                                        if (midiEvents.length === 0) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        if (midiEvents.every(function (event) { return event.type !== lib_midi_1.ControlType.NOTE_ON && event.type !== lib_midi_1.ControlType.NOTE_OFF; })) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        if ((0, lib_std_1.isDefined)(reuseTrackBox)) {
                                            trackBox = reuseTrackBox;
                                            reuseTrackBox = null;
                                            trackIndex++;
                                        }
                                        else {
                                            trackBox = studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                                                box.type.setValue(studio_adapters_1.TrackType.Notes);
                                                box.tracks.refer(audioUnitBoxAdapter.box.tracks);
                                                box.index.setValue(trackIndex++);
                                                box.target.refer(audioUnitBoxAdapter.box);
                                            });
                                        }
                                        collection = studio_boxes_1.NoteEventCollectionBox.create(boxGraph, lib_std_1.UUID.generate());
                                        map = new Map;
                                        duration = 0 | 0;
                                        _loop_2 = function (midiEvent) {
                                            var index, position;
                                            return __generator(this, function (_h) {
                                                switch (_h.label) {
                                                    case 0:
                                                        index = midiEvents.indexOf(midiEvent);
                                                        position = lib_dsp_1.PPQN.fromSignature(midiEvent.ticks / format.timeDivision, 4) | 0;
                                                        midiEvent.accept({
                                                            noteOn: function (note, velocity) { return map.set(note, { position: position, note: note, velocity: velocity }); },
                                                            noteOff: function (note) {
                                                                var data = map.get(note);
                                                                map.delete(note);
                                                                if (!(0, lib_std_1.isDefined)(data)) {
                                                                    return;
                                                                }
                                                                studio_boxes_1.NoteEventBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                                                                    box.position.setValue(data.position);
                                                                    box.duration.setValue(position - data.position);
                                                                    box.pitch.setValue(data.note);
                                                                    box.velocity.setValue(data.velocity);
                                                                    box.events.refer(collection.events);
                                                                });
                                                                duration = Math.max(duration, position);
                                                            }
                                                        });
                                                        progress.setValue(index / midiEvents.length);
                                                        if (!(Date.now() - lastTime > 16.0)) return [3 /*break*/, 2];
                                                        lastTime = Date.now();
                                                        return [4 /*yield*/];
                                                    case 1:
                                                        _h.sent();
                                                        _h.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _f = 0, midiEvents_1 = midiEvents;
                                        _g.label = 1;
                                    case 1:
                                        if (!(_f < midiEvents_1.length)) return [3 /*break*/, 4];
                                        midiEvent = midiEvents_1[_f];
                                        return [5 /*yield**/, _loop_2(midiEvent)];
                                    case 2:
                                        _g.sent();
                                        _g.label = 3;
                                    case 3:
                                        _f++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        duration = (0, lib_std_1.quantizeCeil)(duration, lib_dsp_1.PPQN.Bar);
                                        studio_boxes_1.NoteRegionBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                                            box.position.setValue(0);
                                            box.duration.setValue(duration);
                                            box.loopDuration.setValue(duration);
                                            box.events.refer(collection.owners);
                                            box.hue.setValue(studio_adapters_1.ColorCodes.forTrackType(studio_adapters_1.TrackType.Notes));
                                            box.label.setValue("Ch#".concat(channel));
                                            box.regions.refer(trackBox.regions);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _b = 0, _c = midiTrack.controlEvents;
                        _e.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3 /*break*/, 5];
                        _d = _c[_b], channel = _d[0], midiEvents = _d[1];
                        return [5 /*yield**/, _loop_1(channel, midiEvents)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        }
        var fileResult, progress, dialog, formatResult, format, boxGraph, editing, reuseTrackBox, trackIndex, lastTime, boxEditing, modificationProcess, _a, status, error;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Files.open().then(function (_a) {
                        var file = _a[0];
                        return file.arrayBuffer();
                    }))];
                case 1:
                    fileResult = _c.sent();
                    if (fileResult.status === "rejected") {
                        if (!lib_std_1.Errors.isAbort(fileResult.error)) {
                            throw fileResult.error;
                        }
                        return [2 /*return*/];
                    }
                    progress = new lib_std_1.DefaultObservableValue(0.0);
                    dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Import Midi", progress: progress });
                    return [4 /*yield*/, lib_runtime_1.Wait.frame()];
                case 2:
                    _c.sent();
                    formatResult = (0, lib_std_1.tryCatch)(function () { return lib_midi_1.MidiFile.decoder(fileResult.value).decode(); });
                    if (formatResult.status === "failure") {
                        dialog.terminate();
                        dialogs_tsx_1.Dialogs.info({ message: String(formatResult.error) }).then();
                        return [2 /*return*/];
                    }
                    format = formatResult.value;
                    boxGraph = project.boxGraph, editing = project.editing;
                    reuseTrackBox = (_b = lib_std_1.Arrays.peekLast(audioUnitBoxAdapter.tracks.collection.adapters())) === null || _b === void 0 ? void 0 : _b.box;
                    trackIndex = 0;
                    if ((0, lib_std_1.isDefined)(reuseTrackBox)) {
                        if (reuseTrackBox.type.getValue() === studio_adapters_1.TrackType.Notes && reuseTrackBox.regions.pointerHub.isEmpty()) {
                            trackIndex = reuseTrackBox.index.getValue();
                        }
                        else {
                            trackIndex = reuseTrackBox.index.getValue() + 1;
                            reuseTrackBox = null;
                        }
                    }
                    lastTime = Date.now();
                    console.time("midi-import");
                    boxEditing = editing;
                    modificationProcess = boxEditing.beginModification();
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_runtime_1.Wait.complete(generate()))];
                case 3:
                    _a = _c.sent(), status = _a.status, error = _a.error;
                    console.timeEnd("midi-import");
                    if (!(status === "resolved")) return [3 /*break*/, 4];
                    modificationProcess.approve();
                    return [3 /*break*/, 6];
                case 4:
                    modificationProcess.revert();
                    return [4 /*yield*/, dialogs_tsx_1.Dialogs.info({ headline: "Error Importing Midi-File", message: String(error) })];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    console.debug("finished import.");
                    dialog.terminate();
                    return [2 /*return*/];
            }
        });
    }); };
})(MidiImport || (exports.MidiImport = MidiImport = {}));
