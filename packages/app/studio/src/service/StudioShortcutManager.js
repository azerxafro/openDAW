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
exports.StudioShortcutManager = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var Default_1 = require("@/ui/workspace/Default");
var PanelType_1 = require("@/ui/workspace/PanelType");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ContentEditorShortcuts_1 = require("@/ui/shortcuts/ContentEditorShortcuts");
var PianoPanelShortcuts_1 = require("@/ui/shortcuts/PianoPanelShortcuts");
var RegionsShortcuts_1 = require("@/ui/shortcuts/RegionsShortcuts");
var NoteEditorShortcuts_1 = require("@/ui/shortcuts/NoteEditorShortcuts");
var SoftwareMIDIShortcuts_1 = require("@/ui/shortcuts/SoftwareMIDIShortcuts");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var StudioShortcutManager;
(function (StudioShortcutManager) {
    var _this = this;
    var localStorageKey = "shortcuts";
    StudioShortcutManager.Contexts = {
        "global": { factory: GlobalShortcuts_1.GlobalShortcutsFactory, workingDefinition: GlobalShortcuts_1.GlobalShortcuts },
        "regions": { factory: RegionsShortcuts_1.RegionsShortcutsFactory, workingDefinition: RegionsShortcuts_1.RegionsShortcuts },
        "note-editor": { factory: NoteEditorShortcuts_1.NoteEditorShortcutsFactory, workingDefinition: NoteEditorShortcuts_1.NoteEditorShortcuts },
        "content-editor": { factory: ContentEditorShortcuts_1.ContentEditorShortcutsFactory, workingDefinition: ContentEditorShortcuts_1.ContentEditorShortcuts },
        "software-midi": { factory: SoftwareMIDIShortcuts_1.SoftwareMIDIShortcutsFactory, workingDefinition: SoftwareMIDIShortcuts_1.SoftwareMIDIShortcuts },
        "piano-panel": { factory: PianoPanelShortcuts_1.PianoPanelShortcutsFactory, workingDefinition: PianoPanelShortcuts_1.PianoPanelShortcuts }
    };
    StudioShortcutManager.toJSONString = function (source) {
        var contexts = lib_std_1.Objects.entries(source).reduce(function (record, _a) {
            var key = _a[0], definition = _a[1];
            record[key] = lib_dom_1.ShortcutDefinitions.toJSON(definition);
            return record;
        }, {});
        return lib_std_1.Option.tryCatch(function () { return JSON.stringify(contexts); });
    };
    StudioShortcutManager.fromJSONString = function (target, source) {
        var _a = (0, lib_std_1.tryCatch)(function () { return JSON.parse(source); }), status = _a.status, stored = _a.value, error = _a.error;
        if (status === "success") {
            lib_std_1.Objects.entries(target).forEach(function (_a) {
                var key = _a[0], definition = _a[1];
                return lib_dom_1.ShortcutDefinitions.fromJSON(definition, stored[key]);
            });
        }
        else {
            console.warn(error);
        }
    };
    StudioShortcutManager.store = function () {
        var shortcuts = {};
        lib_std_1.Objects.entries(StudioShortcutManager.Contexts).forEach(function (_a) {
            var key = _a[0], workingDefinition = _a[1].workingDefinition;
            return shortcuts[key] = workingDefinition;
        });
        StudioShortcutManager.toJSONString(shortcuts).ifSome(function (jsonString) { return localStorage.setItem(localStorageKey, jsonString); });
    };
    StudioShortcutManager.install = function (service) {
        var gc = lib_dom_1.ShortcutManager.get().global;
        var engine = service.engine;
        var _a = service.engine, metronome = _a.preferences.settings.metronome, isPlaying = _a.isPlaying, isRecording = _a.isRecording, isCountingIn = _a.isCountingIn, position = _a.position, panelLayout = service.panelLayout, _b = service.timeline, clipsVisibility = _b.clips.visible, followCursor = _b.followCursor, _c = _b.primaryVisibility, markers = _c.markers, tempo = _c.tempo, signature = _c.signature, snapping = _b.snapping;
        var gs = GlobalShortcuts_1.GlobalShortcuts;
        var storedShortcuts = localStorage.getItem(localStorageKey);
        if ((0, lib_std_1.isDefined)(storedShortcuts)) {
            var _d = (0, lib_std_1.tryCatch)(function () { return JSON.parse(storedShortcuts); }), status_1 = _d.status, stored_1 = _d.value, error = _d.error;
            if (status_1 === "success") {
                lib_std_1.Objects.entries(StudioShortcutManager.Contexts).forEach(function (_a) {
                    var name = _a[0], workingDefinition = _a[1].workingDefinition;
                    return lib_dom_1.ShortcutDefinitions.fromJSON(workingDefinition, stored_1[name]);
                });
                console.debug("Custom shortcuts loaded.");
            }
            else {
                console.warn(error);
            }
        }
        return lib_std_1.Terminable.many(gc.register(gs["project-undo"].shortcut, function () { return service.runIfProject(function (project) { return project.editing.undo(); }); }, { allowRepeat: true }), gc.register(gs["project-redo"].shortcut, function () { return service.runIfProject(function (project) { return project.editing.redo(); }); }, { allowRepeat: true }), gc.register(gs["project-open"].shortcut, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.browseLocalProjects()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }), gc.register(gs["project-save"].shortcut, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.projectProfileService.save()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }, { activeInTextField: true }), gc.register(gs["project-save-as"].shortcut, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.projectProfileService.saveAs()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }, { activeInTextField: true }), gc.register(gs["position-increment"].shortcut, function () {
            if (!isPlaying.getValue()) {
                var pos = position.getValue();
                engine.setPosition(snapping.floor(pos) + snapping.value(pos));
            }
        }, { allowRepeat: true }), gc.register(gs["position-decrement"].shortcut, function () {
            if (!engine.isPlaying.getValue()) {
                var pos = position.getValue();
                engine.setPosition(Math.max(0, snapping.ceil(pos) - snapping.value(pos)));
            }
        }, { allowRepeat: true }), gc.register(gs["toggle-playback"].shortcut, function () {
            var engine = service.engine;
            var isPlaying = engine.isPlaying.getValue();
            if (isPlaying) {
                engine.stop();
            }
            else {
                engine.play();
            }
        }), gc.register(gs["stop-playback"].shortcut, function () { return engine.stop(true); }), gc.register(gs["start-recording"].shortcut, function () {
            var _a;
            if (isCountingIn.getValue()) {
                engine.stop();
            }
            else if (isRecording.getValue()) {
                service.runIfProject(function (project) { return project.stopRecording(); });
            }
            else {
                service.runIfProject(function (project) { return project.startRecording(true); });
                (_a = document.querySelector("[data-scope=\"regions\"]")) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }), gc.register(gs["restart-recording"].shortcut, function () { return service.runIfProject(function (project) { return project.restartRecording(); }); }), gc.register(gs["start-recording-direct"].shortcut, function () {
            var _a;
            if (isCountingIn.getValue()) {
                engine.stop();
            }
            else if (isRecording.getValue()) {
                service.runIfProject(function (project) { return project.stopRecording(); });
            }
            else {
                service.runIfProject(function (project) { return project.startRecording(false); });
                (_a = document.querySelector("[data-scope=\"regions\"]")) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }), gc.register(gs["toggle-software-keyboard"].shortcut, function () { return service.toggleSoftwareKeyboard(); }), gc.register(gs["toggle-device-panel"].shortcut, function () { return panelLayout.getByType(PanelType_1.PanelType.DevicePanel).toggleMinimize(); }), gc.register(gs["toggle-content-editor-panel"].shortcut, function () { return panelLayout.getByType(PanelType_1.PanelType.ContentEditor).toggleMinimize(); }), gc.register(gs["toggle-browser-panel"].shortcut, function () { return panelLayout.getByType(PanelType_1.PanelType.BrowserPanel).toggleMinimize(); }), gc.register(gs["toggle-tempo-track"].shortcut, function () { return tempo.setValue(!tempo.getValue()); }), gc.register(gs["toggle-markers-track"].shortcut, function () { return markers.setValue(!markers.getValue()); }), gc.register(gs["toggle-signature-track"].shortcut, function () { return signature.setValue(!signature.getValue()); }), gc.register(gs["toggle-clips"].shortcut, function () { return clipsVisibility.setValue(!clipsVisibility.getValue()); }), gc.register(gs["toggle-follow-cursor"].shortcut, function () { return followCursor.setValue(!followCursor.getValue()); }), gc.register(gs["toggle-metronome"].shortcut, function () { return metronome.enabled = !metronome.enabled; }), gc.register(gs["toggle-loop"].shortcut, function () {
            return service.runIfProject(function (_a) {
                var editing = _a.editing, enabled = _a.timelineBox.loopArea.enabled;
                return editing.modify(function () { return enabled.setValue(!enabled.getValue()); });
            });
        }), gc.register(gs["copy-device"].shortcut, function () { return service.runIfProject(function (_a) {
            var editing = _a.editing, boxAdapters = _a.boxAdapters, userEditingManager = _a.userEditingManager, skeleton = _a.skeleton;
            return userEditingManager.audioUnit.get()
                .ifSome(function (_a) {
                var box = _a.box;
                var deviceHost = boxAdapters.adapterFor(box, studio_adapters_1.Devices.isHost);
                var copies = editing.modify(function () { return studio_adapters_1.TransferAudioUnits
                    .transfer([deviceHost.audioUnitBoxAdapter().box], skeleton); }, false).unwrap();
                userEditingManager.audioUnit.edit(copies[0].editing);
            });
        }); }), gc.register(gs["workspace-next-screen"].shortcut, function () {
            if (!service.hasProfile) {
                return;
            }
            var keys = Object.entries(Default_1.DefaultWorkspace)
                .map(function (_a) {
                var key = _a[0];
                return key;
            })
                .filter(function (key) { return key !== "dashboard"; });
            var screen = service.layout.screen;
            var current = screen.getValue();
            if ((0, lib_std_1.isNull)(current) || !keys.includes(current)) {
                return;
            }
            screen.setValue(lib_std_1.Arrays.getNext(keys, current));
        }), gc.register(gs["workspace-prev-screen"].shortcut, function () {
            if (!service.hasProfile) {
                return;
            }
            var keys = lib_std_1.Objects.entries(Default_1.DefaultWorkspace)
                .map(function (_a) {
                var key = _a[0];
                return key;
            })
                .filter(function (key) { return key !== "dashboard"; });
            var screen = service.layout.screen;
            var current = screen.getValue();
            if ((0, lib_std_1.isNull)(current) || !keys.includes(current)) {
                return;
            }
            screen.setValue(lib_std_1.Arrays.getPrev(keys, current));
        }), gc.register(gs["workspace-screen-dashboard"].shortcut, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.closeProject()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }), gc.register(gs["workspace-screen-default"].shortcut, function () { return service.runIfProject(function () { return service.switchScreen("default"); }); }), gc.register(gs["workspace-screen-mixer"].shortcut, function () { return service.runIfProject(function () { return service.switchScreen("mixer"); }); }), gc.register(gs["workspace-screen-piano"].shortcut, function () { return service.runIfProject(function () { return service.switchScreen("piano"); }); }), gc.register(gs["workspace-screen-project"].shortcut, function () { return service.runIfProject(function () { return service.switchScreen("project"); }); }), gc.register(gs["workspace-screen-meter"].shortcut, function () { return service.runIfProject(function () { return service.switchScreen("meter"); }); }), gc.register(gs["workspace-screen-shadertoy"].shortcut, function () { return service.runIfProject(function () { return service.switchScreen("shadertoy"); }); }), gc.register(gs["show-preferences"].shortcut, function () { return lib_jsx_1.RouteLocation.get().navigateTo("/preferences"); }));
    };
})(StudioShortcutManager || (exports.StudioShortcutManager = StudioShortcutManager = {}));
