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
exports.populateStudioMenu = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_core_1 = require("@opendaw/studio-core");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var VideoRenderer_1 = require("@/video/VideoRenderer");
var DebugMenu_1 = require("@/service/DebugMenu");
var StudioLiveRoomConnect_1 = require("@/service/StudioLiveRoomConnect");
var populateStudioMenu = function (service) {
    var Global = GlobalShortcuts_1.GlobalShortcuts;
    return studio_core_1.MenuItem.root()
        .setRuntimeChildrenProcedure(function (parent) {
        parent.addMenuItem(studio_core_1.MenuItem.header({ label: "openDAW", icon: studio_enums_1.IconSymbol.OpenDAW, color: studio_enums_1.Colors.green }), studio_core_1.MenuItem.default({
            label: "Dashboard",
            shortcut: Global["workspace-screen-dashboard"].shortcut.format()
        }).setTriggerProcedure(function () { return service.closeProject(); }), studio_core_1.MenuItem.default({
            label: "New",
            separatorBefore: true
        }).setTriggerProcedure(function () { return service.newProject(); }), studio_core_1.MenuItem.default({
            label: "Open...",
            shortcut: Global["project-open"].shortcut.format()
        }).setTriggerProcedure(function () { return service.browseLocalProjects(); }), studio_core_1.MenuItem.default({
            label: "Save",
            shortcut: Global["project-save"].shortcut.format(),
            selectable: service.hasProfile
        }).setTriggerProcedure(function () { return service.projectProfileService.save(); }), studio_core_1.MenuItem.default({
            label: "Save As...",
            shortcut: Global["project-save-as"].shortcut.format(),
            selectable: service.hasProfile
        }).setTriggerProcedure(function () { return service.projectProfileService.saveAs(); }), studio_core_1.MenuItem.default({ label: "Import", separatorBefore: true })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Audio Files..." })
            .setTriggerProcedure(function () { return service.sampleService.browse(true); }), studio_core_1.MenuItem.default({ label: "Stems (Zip)..." })
            .setTriggerProcedure(function () { return service.importStems(); }), studio_core_1.MenuItem.default({ label: "Soundfont Files..." })
            .setTriggerProcedure(function () { return service.soundfontService.browse(true); }), studio_core_1.MenuItem.default({ label: "Project Bundle..." })
            .setTriggerProcedure(function () { return service.importBundle(); }), studio_core_1.MenuItem.default({ label: "DAWproject..." })
            .setTriggerProcedure(function () { return service.importDawproject().then(lib_std_1.EmptyExec, lib_std_1.EmptyExec); }), studio_core_1.MenuItem.default({ label: "Preset..." })
            .setTriggerProcedure(function () { return service.importPreset().then(lib_std_1.EmptyExec); })); }), studio_core_1.MenuItem.default({ label: "Export", selectable: service.hasProfile })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Mixdown...", selectable: service.hasProfile })
            .setTriggerProcedure(function () { return service.exportMixdown(); }), studio_core_1.MenuItem.default({ label: "Stems...", selectable: service.hasProfile })
            .setTriggerProcedure(function () { return service.exportStems(); }), studio_core_1.MenuItem.default({ label: "Project Bundle...", selectable: service.hasProfile })
            .setTriggerProcedure(function () { return service.exportBundle(); }), studio_core_1.MenuItem.default({ label: "DAWproject...", selectable: service.hasProfile })
            .setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, service.exportDawproject()];
        }); }); }), studio_core_1.MenuItem.default({
            label: "JSON...",
            selectable: service.hasProfile,
            hidden: !lib_dom_1.Browser.isLocalHost()
        }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
            var arrayBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayBuffer = new TextEncoder().encode(JSON.stringify(service.project.boxGraph.toJSON(), null, 2)).buffer;
                        return [4 /*yield*/, lib_dom_1.Files.save(arrayBuffer, {
                                types: [studio_core_1.FilePickerAcceptTypes.JsonFileType],
                                suggestedName: "project.json"
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), studio_core_1.MenuItem.default({
            label: "Video...",
            selectable: service.hasProfile
        }).setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, lib_runtime_1.Promises.tryCatch(VideoRenderer_1.VideoRenderer.render(service.project, service.profile.meta.name, service.project.engine.sampleRate))];
            });
        }); })); }), studio_core_1.MenuItem.default({
            label: "Join Live Room...",
            icon: studio_enums_1.IconSymbol.Connected,
            separatorBefore: true,
        }).setTriggerProcedure(function () { return (0, StudioLiveRoomConnect_1.connectRoom)(service); }), studio_core_1.MenuItem.default({
            label: "Show MIDI-Keyboard",
            icon: studio_enums_1.IconSymbol.Piano,
            separatorBefore: true,
            shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-software-keyboard"].shortcut.format(),
            checked: service.isSoftwareKeyboardVisible()
        }).setTriggerProcedure(function () { return service.toggleSoftwareKeyboard(); }), studio_core_1.MenuItem.default({
            label: "Cloud Backup",
            icon: studio_enums_1.IconSymbol.CloudFolder,
            separatorBefore: true,
        }).setRuntimeChildrenProcedure(function (parent) {
            parent.addMenuItem(studio_core_1.MenuItem.default({
                label: "Dropbox",
                icon: studio_enums_1.IconSymbol.Dropbox
            }).setTriggerProcedure(function () {
                return studio_core_1.CloudBackup.backup(service.cloudAuthManager, "Dropbox").catch(lib_std_1.EmptyExec);
            }), studio_core_1.MenuItem.default({
                label: "GoogleDrive",
                icon: studio_enums_1.IconSymbol.GoogleDrive
            }).setTriggerProcedure(function () {
                return studio_core_1.CloudBackup.backup(service.cloudAuthManager, "GoogleDrive").catch(lib_std_1.EmptyExec);
            }), studio_core_1.MenuItem.default({
                label: "Supabase",
                icon: studio_enums_1.IconSymbol.CloudFolder
            }).setTriggerProcedure(function () {
                return studio_core_1.CloudBackup.backup(service.cloudAuthManager, "Supabase").catch(lib_std_1.EmptyExec);
            }), studio_core_1.MenuItem.default({ label: "Help", icon: studio_enums_1.IconSymbol.Help, separatorBefore: true })
                .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/manuals/cloud-backup"); }));
        }), studio_core_1.MenuItem.default({
            label: "Script Editor",
            separatorBefore: true,
            icon: studio_enums_1.IconSymbol.Code,
        }).setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/scripting"); }), studio_core_1.MenuItem.default({
            label: "Preferences",
            shortcut: GlobalShortcuts_1.GlobalShortcuts["show-preferences"].shortcut.format(),
            separatorBefore: true,
            icon: studio_enums_1.IconSymbol.System
        }).setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/preferences"); }), studio_core_1.MenuItem.default({
            label: "Statistics",
            icon: studio_enums_1.IconSymbol.Charts
        }).setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/stats"); }), (0, DebugMenu_1.createDebugMenu)(service));
    });
};
exports.populateStudioMenu = populateStudioMenu;
