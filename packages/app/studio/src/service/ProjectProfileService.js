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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _ProjectProfileService_instances, _ProjectProfileService_profile, _ProjectProfileService_env, _ProjectProfileService_sampleService, _ProjectProfileService_sampleManager, _ProjectProfileService_soundfontService, _ProjectProfileService_soundfontManager, _ProjectProfileService_setProfile, _ProjectProfileService_createProfile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectProfileService = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ProjectDialogs_1 = require("@/project/ProjectDialogs");
var dialogs_1 = require("@/ui/components/dialogs");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_box_1 = require("@opendaw/lib-box");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var ProjectProfileService = /** @class */ (function () {
    function ProjectProfileService(_a) {
        var env = _a.env, sampleService = _a.sampleService, sampleManager = _a.sampleManager, soundfontService = _a.soundfontService, soundfontManager = _a.soundfontManager;
        _ProjectProfileService_instances.add(this);
        _ProjectProfileService_profile.set(this, void 0);
        _ProjectProfileService_env.set(this, void 0);
        _ProjectProfileService_sampleService.set(this, void 0);
        _ProjectProfileService_sampleManager.set(this, void 0);
        _ProjectProfileService_soundfontService.set(this, void 0);
        _ProjectProfileService_soundfontManager.set(this, void 0);
        __classPrivateFieldSet(this, _ProjectProfileService_env, env, "f");
        __classPrivateFieldSet(this, _ProjectProfileService_sampleService, sampleService, "f");
        __classPrivateFieldSet(this, _ProjectProfileService_sampleManager, sampleManager, "f");
        __classPrivateFieldSet(this, _ProjectProfileService_soundfontService, soundfontService, "f");
        __classPrivateFieldSet(this, _ProjectProfileService_soundfontManager, soundfontManager, "f");
        __classPrivateFieldSet(this, _ProjectProfileService_profile, new lib_std_1.MutableObservableOption(), "f");
    }
    ProjectProfileService.prototype.getValue = function () { return __classPrivateFieldGet(this, _ProjectProfileService_profile, "f"); };
    ProjectProfileService.prototype.setValue = function (value) { __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").wrapOption(value); };
    ProjectProfileService.prototype.subscribe = function (observer) {
        return __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").subscribe(observer);
    };
    ProjectProfileService.prototype.catchupAndSubscribe = function (observer) {
        observer(__classPrivateFieldGet(this, _ProjectProfileService_profile, "f"));
        return __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").subscribe(observer);
    };
    ProjectProfileService.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").ifSome(function (profile) { return profile.saved() ? profile.save() : _this.saveAs(); })];
            });
        });
    };
    ProjectProfileService.prototype.saveAs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").ifSome(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, status, meta, optProfile;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(ProjectDialogs_1.ProjectDialogs.showSaveDialog({
                                        headline: "Save Project",
                                        meta: profile.meta
                                    }))];
                                case 1:
                                    _a = _b.sent(), status = _a.status, meta = _a.value;
                                    if (status === "rejected") {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, profile.saveAs(meta)];
                                case 2:
                                    optProfile = _b.sent();
                                    optProfile.ifSome(function (profile) { return __classPrivateFieldGet(_this, _ProjectProfileService_profile, "f").wrap(profile); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProjectProfileService.prototype.load = function (uuid, meta) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, project, error, cover;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.ProjectStorage.loadProject(uuid).then(function (buffer) { return studio_core_1.Project.loadAnyVersion(__classPrivateFieldGet(_this, _ProjectProfileService_env, "f"), buffer); }))];
                    case 1:
                        _a = _b.sent(), status = _a.status, project = _a.value, error = _a.error;
                        if (!(status === "rejected")) return [3 /*break*/, 3];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Could not load project", message: String(error) })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, __classPrivateFieldGet(this, _ProjectProfileService_sampleService, "f").replaceMissingFiles(project.boxGraph, __classPrivateFieldGet(this, _ProjectProfileService_sampleManager, "f"))];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, __classPrivateFieldGet(this, _ProjectProfileService_soundfontService, "f").replaceMissingFiles(project.boxGraph, __classPrivateFieldGet(this, _ProjectProfileService_soundfontManager, "f"))];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, studio_core_1.ProjectStorage.loadCover(uuid)];
                    case 6:
                        cover = _b.sent();
                        __classPrivateFieldGet(this, _ProjectProfileService_instances, "m", _ProjectProfileService_setProfile).call(this, uuid, project, meta, cover, true);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectProfileService.prototype.exportBundle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").ifSome(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                        var progressValue, processDialog, _a, status, arrayBuffer, error, approveStatus, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    progressValue = new lib_std_1.DefaultObservableValue(0.0);
                                    processDialog = lib_std_1.RuntimeNotifier.progress({ headline: "Bundling Project...", progress: progressValue });
                                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.ProjectBundle.encode(profile, function (progress) { return progressValue.setValue(progress); }))];
                                case 1:
                                    _a = _b.sent(), status = _a.status, arrayBuffer = _a.value, error = _a.error;
                                    processDialog.terminate();
                                    if (!(status === "rejected")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Export Failed", message: String(error) })];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 3: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(dialogs_1.Dialogs.approve({
                                        headline: "Save Project Bundle",
                                        message: "",
                                        approveText: "Save"
                                    }))];
                                case 4:
                                    approveStatus = (_b.sent()).status;
                                    if (approveStatus === "rejected") {
                                        return [2 /*return*/];
                                    }
                                    _b.label = 5;
                                case 5:
                                    _b.trys.push([5, 7, , 8]);
                                    return [4 /*yield*/, lib_dom_1.Files.save(arrayBuffer, {
                                            suggestedName: "".concat(profile.meta.name, ".odb"),
                                            types: [studio_core_1.FilePickerAcceptTypes.ProjectBundleFileType],
                                            startIn: "desktop"
                                        })];
                                case 6:
                                    _b.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    error_1 = _b.sent();
                                    if (!lib_std_1.Errors.isAbort(error_1)) {
                                        dialogs_1.Dialogs.info({ headline: "Could not export project", message: String(error_1) }).finally();
                                    }
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProjectProfileService.prototype.importBundle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, arrayBuffer, exclude, profile, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, lib_dom_1.Files.open({ types: [studio_core_1.FilePickerAcceptTypes.ProjectBundleFileType] })];
                    case 1:
                        file = (_a.sent())[0];
                        return [4 /*yield*/, file.arrayBuffer()];
                    case 2:
                        arrayBuffer = _a.sent();
                        exclude = __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").map(function (_a) {
                            var uuid = _a.uuid;
                            return uuid;
                        }).unwrapOrUndefined();
                        return [4 /*yield*/, studio_core_1.ProjectBundle.decode(__classPrivateFieldGet(this, _ProjectProfileService_env, "f"), arrayBuffer, exclude)];
                    case 3:
                        profile = _a.sent();
                        __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").wrap(profile);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        if (!lib_std_1.Errors.isAbort(error_2)) {
                            dialogs_1.Dialogs.info({ headline: "Could not load project", message: String(error_2) }).finally();
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProjectProfileService.prototype.saveFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").ifSome(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                    var arrayBuffer, fileName, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                arrayBuffer = profile.project.toArrayBuffer();
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, lib_dom_1.Files.save(arrayBuffer, {
                                        suggestedName: "project.od",
                                        types: [studio_core_1.FilePickerAcceptTypes.ProjectFileType]
                                    })];
                            case 2:
                                fileName = _a.sent();
                                dialogs_1.Dialogs.info({ message: "Project '".concat(fileName, "' saved successfully!") }).finally();
                                return [3 /*break*/, 4];
                            case 3:
                                error_3 = _a.sent();
                                if (!lib_std_1.Errors.isAbort(error_3)) {
                                    dialogs_1.Dialogs.info({ message: "Error saving project: ".concat(error_3) }).finally();
                                }
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ProjectProfileService.prototype.loadFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, jsonString, json, boxGraph, mandatoryBoxes, skeleton, project, project, _a, _b, _c, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, lib_dom_1.Files.open({
                                types: [
                                    studio_core_1.FilePickerAcceptTypes.ProjectFileType, studio_core_1.FilePickerAcceptTypes.JsonFileType
                                ]
                            })];
                    case 1:
                        file = (_d.sent())[0];
                        if (!file.name.endsWith(".json")) return [3 /*break*/, 4];
                        console.debug("importing json file");
                        return [4 /*yield*/, file.text()];
                    case 2:
                        jsonString = _d.sent();
                        json = JSON.parse(jsonString);
                        console.debug("parsed json", json);
                        boxGraph = new lib_box_1.BoxGraph(lib_std_1.Option.wrap(studio_boxes_1.BoxIO.create));
                        boxGraph.fromJSON(json, false);
                        boxGraph.debugBoxes();
                        mandatoryBoxes = studio_adapters_1.ProjectSkeleton.findMandatoryBoxes(boxGraph);
                        skeleton = { boxGraph: boxGraph, mandatoryBoxes: mandatoryBoxes };
                        return [4 /*yield*/, studio_core_1.ProjectMigration.migrate(__classPrivateFieldGet(this, _ProjectProfileService_env, "f"), skeleton)];
                    case 3:
                        _d.sent();
                        boxGraph.verifyPointers();
                        project = studio_core_1.Project.fromSkeleton(__classPrivateFieldGet(this, _ProjectProfileService_env, "f"), skeleton, false);
                        this.setProject(project, file.name);
                        return [3 /*break*/, 7];
                    case 4:
                        _b = (_a = studio_core_1.Project).loadAnyVersion;
                        _c = [__classPrivateFieldGet(this, _ProjectProfileService_env, "f")];
                        return [4 /*yield*/, file.arrayBuffer()];
                    case 5: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    case 6:
                        project = _d.sent();
                        __classPrivateFieldGet(this, _ProjectProfileService_instances, "m", _ProjectProfileService_setProfile).call(this, lib_std_1.UUID.generate(), project, studio_core_1.ProjectMeta.init(file.name), lib_std_1.Option.None);
                        _d.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _d.sent();
                        if (!lib_std_1.Errors.isAbort(error_4)) {
                            dialogs_1.Dialogs.info({ headline: "Could not load json", message: String(error_4) }).finally();
                        }
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProjectProfileService.prototype.setProject = function (project, name) {
        __classPrivateFieldGet(this, _ProjectProfileService_instances, "m", _ProjectProfileService_setProfile).call(this, lib_std_1.UUID.generate(), project, studio_core_1.ProjectMeta.init(name), lib_std_1.Option.None);
    };
    return ProjectProfileService;
}());
exports.ProjectProfileService = ProjectProfileService;
_ProjectProfileService_profile = new WeakMap(), _ProjectProfileService_env = new WeakMap(), _ProjectProfileService_sampleService = new WeakMap(), _ProjectProfileService_sampleManager = new WeakMap(), _ProjectProfileService_soundfontService = new WeakMap(), _ProjectProfileService_soundfontManager = new WeakMap(), _ProjectProfileService_instances = new WeakSet(), _ProjectProfileService_setProfile = function _ProjectProfileService_setProfile() {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    __classPrivateFieldGet(this, _ProjectProfileService_profile, "f").wrap((_a = __classPrivateFieldGet(this, _ProjectProfileService_instances, "m", _ProjectProfileService_createProfile)).call.apply(_a, __spreadArray([this], args, false)));
}, _ProjectProfileService_createProfile = function _ProjectProfileService_createProfile() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new (studio_core_1.ProjectProfile.bind.apply(studio_core_1.ProjectProfile, __spreadArray([void 0], args, false)))();
};
