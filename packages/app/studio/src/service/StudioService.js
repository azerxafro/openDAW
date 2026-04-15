"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StudioService_instances, _StudioService_softwareKeyboardLifeCycle, _StudioService_signals, _StudioService_projectProfileService, _StudioService_sampleService, _StudioService_soundfontService, _StudioService_shadertoyState, _StudioService_activeCodeEditor, _StudioService_factoryFooterLabel, _StudioService_roomAwareness, _StudioService_trafficMeter, _StudioService_chatService, _StudioService_listenProject, _StudioService_installConsoleCommands, _StudioService_populateSpotlightData, _StudioService_configBeforeUnload, _StudioService_checkRecovery, _StudioService_listenPreferences;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioService = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var StudioMenu_1 = require("@/service/StudioMenu");
var Snapping_ts_1 = require("@/ui/timeline/Snapping.ts");
var PanelContents_tsx_1 = require("@/ui/workspace/PanelContents.tsx");
var PanelFactory_tsx_1 = require("@/ui/workspace/PanelFactory.tsx");
var SpotlightDataSupplier_ts_1 = require("@/ui/spotlight/SpotlightDataSupplier.ts");
var PanelType_ts_1 = require("@/ui/workspace/PanelType.ts");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var SamplePlayback_1 = require("@/service/SamplePlayback");
var ProjectProfileService_1 = require("./ProjectProfileService");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_box_1 = require("@opendaw/lib-box");
var studio_core_1 = require("@opendaw/studio-core");
var ProjectDialogs_1 = require("@/project/ProjectDialogs");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var studio_enums_1 = require("@opendaw/studio-enums");
var Surface_1 = require("@/ui/surface/Surface");
var SoftwareMIDIPanel_1 = require("@/ui/software-midi/SoftwareMIDIPanel");
var Mixdowns_1 = require("@/service/Mixdowns");
var ShadertoyState_1 = require("@/ui/shadertoy/ShadertoyState");
/**
 * I am just piling stuff after stuff in here to boot the environment.
 * I suppose this gets cleaned up sooner or later.
 */
var range = new studio_core_1.TimelineRange({ padding: 12 });
range.minimum = lib_dsp_1.PPQN.fromSignature(3, 8);
range.maxUnits = lib_dsp_1.PPQN.fromSignature(128, 1);
range.showUnitInterval(0, lib_dsp_1.PPQN.fromSignature(9, 1));
var snapping = new Snapping_ts_1.Snapping(range);
var StudioService = /** @class */ (function () {
    function StudioService(audioContext, audioWorklets, audioDevices, sampleManager, soundfontManager, chainedSampleProvider, chainedSoundfontProvider, cloudAuthManager, buildInfo) {
        var _this = this;
        _StudioService_instances.add(this);
        this.audioContext = audioContext;
        this.audioWorklets = audioWorklets;
        this.audioDevices = audioDevices;
        this.sampleManager = sampleManager;
        this.soundfontManager = soundfontManager;
        this.chainedSampleProvider = chainedSampleProvider;
        this.chainedSoundfontProvider = chainedSoundfontProvider;
        this.cloudAuthManager = cloudAuthManager;
        this.buildInfo = buildInfo;
        this.layout = {
            screen: new lib_std_1.DefaultObservableValue("default")
        };
        this.timeline = {
            range: range,
            snapping: snapping,
            clips: {
                count: new lib_std_1.DefaultObservableValue(3),
                visible: new lib_std_1.DefaultObservableValue(true)
            },
            followCursor: new lib_std_1.DefaultObservableValue(false),
            primaryVisibility: {
                markers: new lib_std_1.DefaultObservableValue(true),
                tempo: new lib_std_1.DefaultObservableValue(false),
                signature: new lib_std_1.DefaultObservableValue(false)
            }
        };
        this.menu = (0, StudioMenu_1.populateStudioMenu)(this);
        this.panelLayout = new PanelContents_tsx_1.PanelContents((0, PanelFactory_tsx_1.createPanelFactory)(this));
        this.spotlightDataSupplier = new SpotlightDataSupplier_ts_1.SpotlightDataSupplier();
        this.recovery = new studio_core_1.Recovery(function () { return __classPrivateFieldGet(_this, _StudioService_projectProfileService, "f").getValue(); }, this);
        this.engine = new studio_core_1.EngineFacade();
        _StudioService_softwareKeyboardLifeCycle.set(this, new lib_std_1.Terminator());
        _StudioService_signals.set(this, new lib_std_1.Notifier());
        _StudioService_projectProfileService.set(this, void 0);
        _StudioService_sampleService.set(this, void 0);
        _StudioService_soundfontService.set(this, void 0);
        _StudioService_shadertoyState.set(this, lib_std_1.Option.None);
        _StudioService_activeCodeEditor.set(this, new lib_std_1.MutableObservableOption());
        _StudioService_factoryFooterLabel.set(this, lib_std_1.Option.None);
        _StudioService_roomAwareness.set(this, new lib_std_1.DefaultObservableValue(null));
        _StudioService_trafficMeter.set(this, new lib_std_1.DefaultObservableValue(null));
        _StudioService_chatService.set(this, new lib_std_1.MutableObservableOption());
        this.regionModifierInProgress = false;
        __classPrivateFieldSet(this, _StudioService_sampleService, new studio_core_1.SampleService(audioContext), "f");
        __classPrivateFieldGet(this, _StudioService_sampleService, "f").subscribe(function (_a) {
            var sample = _a[0], _ = _a[1];
            return __classPrivateFieldGet(_this, _StudioService_signals, "f").notify({
                type: "import-sample",
                sample: sample
            });
        });
        __classPrivateFieldSet(this, _StudioService_soundfontService, new studio_core_1.SoundfontService(), "f");
        __classPrivateFieldGet(this, _StudioService_soundfontService, "f").subscribe(function (_a) {
            var soundfont = _a[0], _ = _a[1];
            return __classPrivateFieldGet(_this, _StudioService_signals, "f").notify({
                type: "import-soundfont",
                soundfont: soundfont
            });
        });
        this.samplePlayback = new SamplePlayback_1.SamplePlayback();
        __classPrivateFieldSet(this, _StudioService_projectProfileService, new ProjectProfileService_1.ProjectProfileService({
            env: this,
            sampleService: __classPrivateFieldGet(this, _StudioService_sampleService, "f"), sampleManager: this.sampleManager,
            soundfontService: __classPrivateFieldGet(this, _StudioService_soundfontService, "f"), soundfontManager: this.soundfontManager
        }), "f");
        __classPrivateFieldGet(this, _StudioService_instances, "m", _StudioService_listenProject).call(this);
        __classPrivateFieldGet(this, _StudioService_instances, "m", _StudioService_installConsoleCommands).call(this);
        __classPrivateFieldGet(this, _StudioService_instances, "m", _StudioService_populateSpotlightData).call(this);
        __classPrivateFieldGet(this, _StudioService_instances, "m", _StudioService_configBeforeUnload).call(this);
        __classPrivateFieldGet(this, _StudioService_instances, "m", _StudioService_checkRecovery).call(this);
        __classPrivateFieldGet(this, _StudioService_instances, "m", _StudioService_listenPreferences).call(this);
    }
    Object.defineProperty(StudioService.prototype, "sampleRate", {
        get: function () { return this.audioContext.sampleRate; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "sampleService", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_sampleService, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "soundfontService", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_soundfontService, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "projectProfileService", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_projectProfileService, "f"); },
        enumerable: false,
        configurable: true
    });
    StudioService.prototype.panicEngine = function () { this.runIfProject(function (_a) {
        var engine = _a.engine;
        return engine.panic();
    }); };
    StudioService.prototype.newProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var approved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.hasProfile && !this.project.editing.hasNoChanges())) return [3 /*break*/, 2];
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
                        __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").setValue(lib_std_1.Option.wrap(new studio_core_1.ProjectProfile(lib_std_1.UUID.generate(), studio_core_1.Project.new(this), studio_core_1.ProjectMeta.init("Untitled"), lib_std_1.Option.None)));
                        return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.closeProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var approved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lib_jsx_1.RouteLocation.get().navigateTo("/");
                        if (!this.hasProfile) {
                            this.switchScreen("dashboard");
                            return [2 /*return*/];
                        }
                        if (!this.project.editing.hasNoChanges()) return [3 /*break*/, 1];
                        __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").setValue(lib_std_1.Option.None);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                            headline: "Closing Project?",
                            message: "You will lose all progress!"
                        })];
                    case 2:
                        approved = _a.sent();
                        if (approved) {
                            __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").setValue(lib_std_1.Option.None);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.browseLocalProjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, value, uuid, meta;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(ProjectDialogs_1.ProjectDialogs.showBrowseDialog(this))];
                    case 1:
                        _a = _b.sent(), status = _a.status, value = _a.value;
                        if (!(status === "resolved")) return [3 /*break*/, 3];
                        uuid = value[0], meta = value[1];
                        return [4 /*yield*/, __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").load(uuid, meta)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.exportBundle = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").exportBundle()];
        }); });
    };
    StudioService.prototype.importBundle = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").importBundle()];
        }); });
    };
    StudioService.prototype.deleteProject = function (uuid, meta) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(__classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue().ifSome(function (profile) { return lib_std_1.UUID.equals(profile.uuid, uuid); }) === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.closeProject()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.ProjectStorage.deleteProject(uuid))];
                    case 3:
                        status = (_a.sent()).status;
                        if (status === "resolved") {
                            __classPrivateFieldGet(this, _StudioService_signals, "f").notify({ type: "delete-project", meta: meta });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.exportMixdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue()
                        .ifSome(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, status, error;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this.audioContext.suspend()];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(Mixdowns_1.Mixdowns.exportMixdown(profile))];
                                case 2:
                                    _a = _b.sent(), status = _a.status, error = _a.error;
                                    if (!(status === "rejected" && !lib_std_1.Errors.isAbort(error))) return [3 /*break*/, 4];
                                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Export Failed", message: String(error) })];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4:
                                    this.audioContext.resume().then();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    StudioService.prototype.exportStems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue()
                        .ifSome(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                        var project, _a, dialogStatus, dialogError, config, _b, status, error;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    project = profile.project;
                                    if (project.rootBox.audioUnits.pointerHub.incoming()
                                        .every(function (_a) {
                                        var box = _a.box;
                                        return (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.AudioUnitBox).type.getValue() === studio_enums_1.AudioUnitType.Output;
                                    })) {
                                        return [2 /*return*/, lib_std_1.RuntimeNotifier.info({
                                                headline: "Export Error",
                                                message: "No stems to export"
                                            })];
                                    }
                                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(ProjectDialogs_1.ProjectDialogs.showExportStemsDialog(project))];
                                case 1:
                                    _a = _c.sent(), dialogStatus = _a.status, dialogError = _a.error, config = _a.value;
                                    if (!(dialogStatus === "rejected")) return [3 /*break*/, 3];
                                    if (lib_std_1.Errors.isAbort(dialogError)) {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Export Failed", message: String(dialogError) })];
                                case 2:
                                    _c.sent();
                                    return [2 /*return*/];
                                case 3:
                                    studio_adapters_1.ExportStemsConfiguration.sanitizeExportNamesInPlace(config);
                                    return [4 /*yield*/, this.audioContext.suspend()];
                                case 4:
                                    _c.sent();
                                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(Mixdowns_1.Mixdowns.exportStems(profile, config))];
                                case 5:
                                    _b = _c.sent(), status = _b.status, error = _b.error;
                                    if (!(status === "rejected" && !lib_std_1.Errors.isAbort(error))) return [3 /*break*/, 7];
                                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Export Failed", message: String(error) })];
                                case 6:
                                    _c.sent();
                                    _c.label = 7;
                                case 7:
                                    this.audioContext.resume().then(lib_std_1.EmptyExec, lib_std_1.EmptyExec);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    StudioService.prototype.importDawproject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, studio_core_1.DawProjectService.importDawproject(this.sampleService)];
                    case 1:
                        (_a.sent())
                            .ifSome(function (skeleton) { return __classPrivateFieldGet(_this, _StudioService_projectProfileService, "f")
                            .setProject(studio_core_1.Project.fromSkeleton(_this, skeleton), "Dawproject"); });
                        return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.exportDawproject = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue().ifSome(function (profile) { return studio_core_1.DawProjectService.exportDawproject(profile); })];
            });
        });
    };
    StudioService.prototype.importPreset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, files, bytes, _b, editing, skeleton_1, project, editing, skeleton_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Files.open({ types: [studio_core_1.FilePickerAcceptTypes.PresetFileType] }))];
                    case 1:
                        _a = _c.sent(), status = _a.status, files = _a.value;
                        if (status === "rejected") {
                            return [2 /*return*/];
                        }
                        if (files.length === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, files[0].arrayBuffer()];
                    case 2:
                        bytes = _c.sent();
                        console.debug("importing preset", bytes.byteLength);
                        if (this.hasProfile) {
                            _b = this.project, editing = _b.editing, skeleton_1 = _b.skeleton;
                            editing.modify(function () { return studio_adapters_1.PresetDecoder.decode(bytes, skeleton_1); });
                        }
                        else {
                            project = studio_core_1.Project.new(this);
                            editing = project.editing, skeleton_2 = project.skeleton;
                            editing.modify(function () { return studio_adapters_1.PresetDecoder.decode(bytes, skeleton_2); });
                            __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").setValue(lib_std_1.Option.wrap(new studio_core_1.ProjectProfile(lib_std_1.UUID.generate(), project, studio_core_1.ProjectMeta.init("Untitled"), lib_std_1.Option.None)));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.importStems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileResult, firstFile, _a, status, JSZip, zipResult, _b, _c, _d, _e, audioEntries, _f, editing, boxGraph, api, aborted, onCancel, dialog, _loop_1, this_1, index, state_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Files.open({ types: [studio_core_1.FilePickerAcceptTypes.ZipFileType] }))];
                    case 1:
                        fileResult = _g.sent();
                        if (fileResult.status === "rejected") {
                            return [2 /*return*/];
                        }
                        firstFile = fileResult.value.at(0);
                        if ((0, lib_std_1.isAbsent)(firstFile)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, studio_core_1.ExternalLib.JSZip()];
                    case 2:
                        _a = _g.sent(), status = _a.status, JSZip = _a.value;
                        if (status === "rejected") {
                            return [2 /*return*/];
                        }
                        _c = (_b = lib_runtime_1.Promises).tryCatch;
                        _e = (_d = JSZip).loadAsync;
                        return [4 /*yield*/, firstFile.arrayBuffer()];
                    case 3: return [4 /*yield*/, _c.apply(_b, [_e.apply(_d, [_g.sent()])])];
                    case 4:
                        zipResult = _g.sent();
                        if (!(zipResult.status === "rejected")) return [3 /*break*/, 6];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Import Failed", message: String(zipResult.error) })];
                    case 5:
                        _g.sent();
                        return [2 /*return*/];
                    case 6:
                        audioEntries = Object.entries(zipResult.value.files)
                            .filter(function (_a) {
                            var path = _a[0], file = _a[1];
                            if (file.dir) {
                                return false;
                            }
                            var lower = path.toLowerCase();
                            if (!lower.endsWith(".wav")) {
                                return false;
                            }
                            if (lower.startsWith("__macosx/")) {
                                return false;
                            }
                            var name = path.substring(path.lastIndexOf("/") + 1);
                            return !name.startsWith("._");
                        });
                        if (audioEntries.length === 0) {
                            return [2 /*return*/];
                        }
                        if (!this.hasProfile) {
                            __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").setValue(lib_std_1.Option.wrap(new studio_core_1.ProjectProfile(lib_std_1.UUID.generate(), studio_core_1.Project.new(this), studio_core_1.ProjectMeta.init("Untitled"), lib_std_1.Option.None)));
                        }
                        _f = this.project, editing = _f.editing, boxGraph = _f.boxGraph, api = _f.api;
                        aborted = false;
                        onCancel = function () { aborted = true; };
                        dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Importing Stems...", cancel: onCancel });
                        _loop_1 = function (index) {
                            var _h, path, file, name_1, arrayBuffer, _j, status_1, sample, error, skip, uuid;
                            return __generator(this, function (_k) {
                                switch (_k.label) {
                                    case 0:
                                        if (aborted) {
                                            return [2 /*return*/, "break"];
                                        }
                                        _h = audioEntries[index], path = _h[0], file = _h[1];
                                        name_1 = path.substring(path.lastIndexOf("/") + 1).replace(/\.wav$/i, "");
                                        dialog.message = "Importing ".concat(name_1, " (").concat(index + 1, "/").concat(audioEntries.length, ")");
                                        return [4 /*yield*/, file.async("arraybuffer").then(function (buffer) { return buffer.slice(0); })];
                                    case 1:
                                        arrayBuffer = _k.sent();
                                        if (aborted) {
                                            return [2 /*return*/, "break"];
                                        }
                                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(__classPrivateFieldGet(this_1, _StudioService_sampleService, "f").importFile({
                                                name: name_1,
                                                arrayBuffer: arrayBuffer
                                            }))];
                                    case 2:
                                        _j = _k.sent(), status_1 = _j.status, sample = _j.value, error = _j.error;
                                        if (aborted) {
                                            return [2 /*return*/, "break"];
                                        }
                                        if (!(status_1 === "rejected")) return [3 /*break*/, 4];
                                        console.warn("Failed to import '".concat(name_1, "'"), error);
                                        dialog.terminate();
                                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                                                headline: "Failed to import '".concat(name_1, "'"),
                                                message: String(error),
                                                approveText: "Skip",
                                                cancelText: "Cancel Import"
                                            })];
                                    case 3:
                                        skip = _k.sent();
                                        if (!skip) {
                                            return [2 /*return*/, "break"];
                                        }
                                        dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Importing Stems...", cancel: onCancel });
                                        return [2 /*return*/, "continue"];
                                    case 4:
                                        uuid = lib_std_1.UUID.parse(sample.uuid);
                                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(this_1.sampleManager.getAudioData(uuid))];
                                    case 5:
                                        _k.sent();
                                        if (aborted) {
                                            return [2 /*return*/, "break"];
                                        }
                                        editing.modify(function () {
                                            var _a = api.createInstrument(studio_adapters_1.InstrumentFactories.Tape), trackBox = _a.trackBox, instrumentBox = _a.instrumentBox;
                                            instrumentBox.label.setValue(name_1);
                                            var audioFileBox = boxGraph.findBox(uuid)
                                                .unwrapOrElse(function () { return studio_boxes_1.AudioFileBox.create(boxGraph, uuid, function (box) {
                                                box.fileName.setValue(name_1);
                                                box.startInSeconds.setValue(0);
                                                box.endInSeconds.setValue(sample.duration);
                                            }); });
                                            studio_core_1.AudioContentFactory.createNotStretchedRegion({
                                                boxGraph: boxGraph,
                                                sample: sample,
                                                audioFileBox: audioFileBox,
                                                position: 0, targetTrack: trackBox
                                            });
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        index = 0;
                        _g.label = 7;
                    case 7:
                        if (!(index < audioEntries.length)) return [3 /*break*/, 10];
                        return [5 /*yield**/, _loop_1(index)];
                    case 8:
                        state_1 = _g.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 10];
                        _g.label = 9;
                    case 9:
                        index++;
                        return [3 /*break*/, 7];
                    case 10:
                        dialog.terminate();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.runIfProject = function (procedure) {
        return __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue().map(function (_a) {
            var project = _a.project;
            return procedure(project);
        });
    };
    Object.defineProperty(StudioService.prototype, "project", {
        get: function () { return this.profile.project; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "optProject", {
        get: function () { return this.projectProfileService.getValue().map(function (_a) {
            var project = _a.project;
            return project;
        }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "profile", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue().unwrap("No profile available"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "hasProfile", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").getValue().nonEmpty(); },
        enumerable: false,
        configurable: true
    });
    StudioService.prototype.subscribeSignal = function (observer, type) {
        return __classPrivateFieldGet(this, _StudioService_signals, "f").subscribe(function (signal) {
            if (signal.type === type) {
                observer(signal);
            }
        });
    };
    StudioService.prototype.switchScreen = function (key) {
        this.layout.screen.setValue(key);
        lib_jsx_1.RouteLocation.get().navigateTo("/");
    };
    StudioService.prototype.registerFooter = function (factory) {
        __classPrivateFieldSet(this, _StudioService_factoryFooterLabel, lib_std_1.Option.wrap(factory), "f");
    };
    StudioService.prototype.factoryFooterLabel = function () { return __classPrivateFieldGet(this, _StudioService_factoryFooterLabel, "f"); };
    Object.defineProperty(StudioService.prototype, "roomAwareness", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_roomAwareness, "f"); },
        enumerable: false,
        configurable: true
    });
    StudioService.prototype.setRoomAwareness = function (value) { __classPrivateFieldGet(this, _StudioService_roomAwareness, "f").setValue(value); };
    Object.defineProperty(StudioService.prototype, "trafficMeter", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_trafficMeter, "f"); },
        enumerable: false,
        configurable: true
    });
    StudioService.prototype.setTrafficMeter = function (value) { __classPrivateFieldGet(this, _StudioService_trafficMeter, "f").setValue(value); };
    Object.defineProperty(StudioService.prototype, "chatService", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_chatService, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "optShadertoyState", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_shadertoyState, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudioService.prototype, "activeCodeEditor", {
        get: function () { return __classPrivateFieldGet(this, _StudioService_activeCodeEditor, "f"); },
        enumerable: false,
        configurable: true
    });
    StudioService.prototype.openCodeEditor = function (state) {
        var _a;
        var previousScreen = this.layout.screen.getValue() === "code"
            ? (_a = __classPrivateFieldGet(this, _StudioService_activeCodeEditor, "f").map(function (existing) { return existing.previousScreen; }).unwrapOrNull()) !== null && _a !== void 0 ? _a : state.previousScreen
            : state.previousScreen;
        this.layout.screen.setValue(null);
        __classPrivateFieldGet(this, _StudioService_activeCodeEditor, "f").wrap(__assign(__assign({}, state), { previousScreen: previousScreen }));
        this.layout.screen.setValue("code");
        lib_jsx_1.RouteLocation.get().navigateTo("/");
    };
    StudioService.prototype.closeCodeEditor = function () {
        var _this = this;
        var previousScreen = __classPrivateFieldGet(this, _StudioService_activeCodeEditor, "f").map(function (state) { return state.previousScreen; }).unwrapOrNull();
        __classPrivateFieldGet(this, _StudioService_activeCodeEditor, "f").clear();
        if (this.layout.screen.getValue() === "code") {
            // Defer the screen switch to avoid cascading UI updates during synchronous
            // box deletion. Switching the screen triggers DevicePanel re-evaluation which
            // clears mounts before remaining pointerHub onRemoved events have finished.
            queueMicrotask(function () { return _this.layout.screen.setValue(previousScreen !== null && previousScreen !== void 0 ? previousScreen : "default"); });
        }
    };
    StudioService.prototype.resetPeaks = function () { __classPrivateFieldGet(this, _StudioService_signals, "f").notify({ type: "reset-peaks" }); };
    StudioService.prototype.verifyProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boxGraph, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasProfile) {
                            return [2 /*return*/];
                        }
                        boxGraph = this.project.boxGraph;
                        result = boxGraph.verifyPointers();
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ message: "Project is okay. All ".concat(result.count, " pointers are fine.") })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudioService.prototype.toggleSoftwareKeyboard = function () {
        if (this.isSoftwareKeyboardVisible()) {
            __classPrivateFieldGet(this, _StudioService_softwareKeyboardLifeCycle, "f").terminate();
        }
        else {
            var element_1 = (0, SoftwareMIDIPanel_1.SoftwareMIDIPanel)({
                lifecycle: __classPrivateFieldGet(this, _StudioService_softwareKeyboardLifeCycle, "f"),
                service: this
            });
            Surface_1.Surface.get(window).floating.appendChild(element_1);
            __classPrivateFieldGet(this, _StudioService_softwareKeyboardLifeCycle, "f").own(lib_std_1.Terminable.create(function () { return element_1.remove(); }));
        }
    };
    StudioService.prototype.isSoftwareKeyboardVisible = function () { return __classPrivateFieldGet(this, _StudioService_softwareKeyboardLifeCycle, "f").nonEmpty(); };
    return StudioService;
}());
exports.StudioService = StudioService;
_StudioService_softwareKeyboardLifeCycle = new WeakMap(), _StudioService_signals = new WeakMap(), _StudioService_projectProfileService = new WeakMap(), _StudioService_sampleService = new WeakMap(), _StudioService_soundfontService = new WeakMap(), _StudioService_shadertoyState = new WeakMap(), _StudioService_activeCodeEditor = new WeakMap(), _StudioService_factoryFooterLabel = new WeakMap(), _StudioService_roomAwareness = new WeakMap(), _StudioService_trafficMeter = new WeakMap(), _StudioService_chatService = new WeakMap(), _StudioService_instances = new WeakSet(), _StudioService_listenProject = function _StudioService_listenProject() {
    var _this = this;
    var lifeTime = new lib_std_1.Terminator();
    var observer = function (optProfile) {
        var path = lib_jsx_1.RouteLocation.get().path;
        var isRoot = path === "/";
        if (isRoot) {
            _this.layout.screen.setValue(null);
        }
        lifeTime.terminate();
        document.body.classList.toggle("no-project", optProfile.isEmpty());
        if (optProfile.nonEmpty()) {
            var profile = optProfile.unwrap();
            var project_1 = profile.project, meta = profile.meta;
            console.debug("switch to %c".concat(meta.name, "%c"), "color: hsl(25, 69%, 63%)", "color: inherit");
            var timelineBox = project_1.timelineBox, timelineBoxAdapter = project_1.timelineBoxAdapter, userEditingManager = project_1.userEditingManager;
            range.showUnitInterval(0, lib_dsp_1.PPQN.fromSignature(9, 1));
            __classPrivateFieldSet(_this, _StudioService_shadertoyState, lib_std_1.Option.wrap(lifeTime.own(new ShadertoyState_1.ShadertoyState(project_1))), "f");
            //
            // -------------------------------
            // Show views if content available
            // -------------------------------
            //
            // Markers
            _this.timeline.primaryVisibility.markers.setValue(true);
            // Tempo
            _this.timeline.primaryVisibility.tempo.setValue(timelineBoxAdapter
                .tempoTrackEvents.mapOr(function (collection) { return !collection.events.isEmpty(); }, false));
            // Signature
            _this.timeline.primaryVisibility.signature.setValue(timelineBoxAdapter.signatureTrack.size > 0);
            // Clips
            var maxClipIndex = project_1.rootBoxAdapter.audioUnits.adapters()
                .reduce(function (max, unit) { return Math.max(max, unit.tracks.values()
                .reduce(function (max, track) { return Math.max(max, track.clips.collection
                .getMinFreeIndex()); }, 0)); }, 0);
            if (maxClipIndex > 0 || studio_core_1.StudioPreferences.settings.visibility["auto-open-clips"]) {
                _this.timeline.clips.count.setValue(Math.max(maxClipIndex + 1, 3));
                _this.timeline.clips.visible.setValue(true);
            }
            else {
                _this.timeline.clips.count.setValue(3);
                _this.timeline.clips.visible.setValue(false);
            }
            var screen_1 = null;
            var restart_1 = {
                unload: function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        screen_1 = this.layout.screen.getValue();
                        // we need to restart the screen to subscribe to new broadcaster instances
                        this.switchScreen(null);
                        this.engine.releaseWorklet();
                        return [2 /*return*/, dialogs_tsx_1.Dialogs.info({
                                headline: "Audio-Engine Error",
                                message: String((_a = (0, lib_std_1.safeRead)(event, "error", "message")) !== null && _a !== void 0 ? _a : "Unknown error"),
                                okText: "Restart Engine",
                                cancelable: false
                            })];
                    });
                }); },
                load: function (engine) {
                    _this.engine.setWorklet(engine);
                    _this.switchScreen(screen_1);
                }
            };
            _this.engine.releaseWorklet();
            var _a = (0, lib_std_1.tryCatch)(function () { return project_1.startAudioWorklet(restart_1, {}); }), status_2 = _a.status, worklet = _a.value, error = _a.error;
            if (status_2 === "failure") {
                dialogs_tsx_1.Dialogs.info({
                    headline: "Audio-Engine Error",
                    message: "Could not start the audio engine. Your browser may not support all required features. (".concat(lib_std_1.Errors.toString(error), ")"),
                    okText: "OK",
                    cancelable: false
                }).finally();
                return;
            }
            _this.engine.setWorklet(worklet);
            lifeTime.ownAll(project_1, snapping.registerSignatureTrackAdapter(project_1.timelineBoxAdapter.signatureTrack), userEditingManager.timeline.catchupAndSubscribe(function (option) { return option
                .ifSome(function () { return lib_dom_1.AnimationFrame.once(function () { return _this.panelLayout.showIfAvailable(PanelType_ts_1.PanelType.ContentEditor); }); }); }), timelineBox.durationInPulses.catchupAndSubscribe(function (owner) { return range.maxUnits = owner.getValue() + lib_dsp_1.PPQN.Bar; }));
            if (isRoot) {
                _this.switchScreen("default");
            }
        }
        else {
            _this.engine.releaseWorklet();
            range.maxUnits = lib_dsp_1.PPQN.fromSignature(128, 1);
            range.showUnitInterval(0, lib_dsp_1.PPQN.fromSignature(9, 1));
            _this.layout.screen.setValue("dashboard");
        }
    };
    __classPrivateFieldGet(this, _StudioService_projectProfileService, "f").catchupAndSubscribe(observer);
}, _StudioService_installConsoleCommands = function _StudioService_installConsoleCommands() {
    var _this = this;
    lib_dom_1.ConsoleCommands.exportAccessor("box.graph.boxes", function () { return _this.runIfProject(function (_a) {
        var boxGraph = _a.boxGraph;
        return boxGraph.debugBoxes();
    }); });
    lib_dom_1.ConsoleCommands.exportMethod("box.graph.lookup", function (address) { return _this.runIfProject(function (_a) {
        var boxGraph = _a.boxGraph;
        return boxGraph.findVertex(lib_box_1.Address.decode(address)).match({
            none: function () { return "not found"; },
            some: function (vertex) { return vertex.toString(); }
        });
    }).match({ none: function () { return "no project"; }, some: function (value) { return value; } }); });
    lib_dom_1.ConsoleCommands.exportAccessor("box.graph.dependencies", function () { return _this.runIfProject(function (project) { return project.boxGraph.debugDependencies(); }); });
}, _StudioService_populateSpotlightData = function _StudioService_populateSpotlightData() {
    this.spotlightDataSupplier.registerAction("Create Synth", lib_std_1.EmptyExec);
    this.spotlightDataSupplier.registerAction("Create Drumcomputer", lib_std_1.EmptyExec);
    this.spotlightDataSupplier.registerAction("Create ModularSystem", lib_std_1.EmptyExec);
}, _StudioService_configBeforeUnload = function _StudioService_configBeforeUnload() {
    var _this = this;
    if (!lib_dom_1.Browser.isLocalHost()) {
        window.addEventListener("beforeunload", function (event) {
            if (!navigator.onLine) {
                event.preventDefault();
            }
            if (_this.hasProfile && _this.profile.hasUnsavedChanges()) {
                event.preventDefault();
            }
        });
    }
}, _StudioService_checkRecovery = function _StudioService_checkRecovery() {
    var _this = this;
    this.recovery.restoreProfile().then(function (optProfile) {
        if (optProfile.nonEmpty()) {
            __classPrivateFieldGet(_this, _StudioService_projectProfileService, "f").setValue(optProfile);
        }
    }, lib_std_1.EmptyExec);
}, _StudioService_listenPreferences = function _StudioService_listenPreferences() {
    studio_core_1.StudioPreferences.catchupAndSubscribe(function (value) {
        return lib_dom_1.Dragging.usePointerLock = value && lib_dom_1.Browser.isChrome();
    }, "pointer", "dragging-use-pointer-lock");
    studio_core_1.StudioPreferences.catchupAndSubscribe(function (value) {
        return document.body.classList.toggle("experimental-visible", value);
    }, "debug", "enable-beta-features");
    studio_core_1.StudioPreferences.catchupAndSubscribe(function (value) {
        return document.body.classList.toggle("help-hidden", !value);
    }, "visibility", "visible-help-hints");
    studio_core_1.StudioPreferences.catchupAndSubscribe(function (value) {
        return document.body.classList.toggle("scrollbar-padding", value);
    }, "visibility", "scrollbar-padding");
};
