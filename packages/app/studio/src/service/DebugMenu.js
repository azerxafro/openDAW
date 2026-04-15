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
exports.createDebugMenu = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var CodecsUtils_1 = require("@/CodecsUtils");
var studio_enums_1 = require("@opendaw/studio-enums");
var SyncLogService_1 = require("@/service/SyncLogService");
var dialogs_1 = require("@/ui/components/dialogs");
var createDebugMenu = function (service) { return studio_core_1.MenuItem.default({
    label: "Debug",
    icon: studio_enums_1.IconSymbol.Bug,
    hidden: !studio_core_1.StudioPreferences.settings.debug["enable-debug-menu"]
}).setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.header({ label: "Debugging", icon: studio_enums_1.IconSymbol.System }), studio_core_1.MenuItem.default({
    label: "New SyncLog...",
    selectable: (0, lib_std_1.isDefined)(window.showSaveFilePicker)
}).setTriggerProcedure(function () { return SyncLogService_1.SyncLogService.start(service); }), studio_core_1.MenuItem.default({
    label: "Open SyncLog...",
    selectable: (0, lib_std_1.isDefined)(window.showOpenFilePicker)
}).setTriggerProcedure(function () { return SyncLogService_1.SyncLogService.append(service); }), studio_core_1.MenuItem.default({
    label: "Show Boxes...",
    selectable: service.hasProfile,
    separatorBefore: true
}).setTriggerProcedure(function () { return dialogs_1.Dialogs.debugBoxes(service.project.boxGraph); }), studio_core_1.MenuItem.default({ label: "Validate Project...", selectable: service.hasProfile })
    .setTriggerProcedure(function () { return service.verifyProject(); }), studio_core_1.MenuItem.default({
    label: "Load file...",
    separatorBefore: true
}).setTriggerProcedure(function () { return service.projectProfileService.loadFile(); }), studio_core_1.MenuItem.default({
    label: "Save file...",
    selectable: service.hasProfile
}).setTriggerProcedure(function () { return service.projectProfileService.saveFile(); }), studio_core_1.MenuItem.header({ label: "Pages", icon: studio_enums_1.IconSymbol.Box }), studio_core_1.MenuItem.default({ label: "・ Icons" })
    .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/icons"); }), studio_core_1.MenuItem.default({ label: "・ Components" })
    .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/components"); }), studio_core_1.MenuItem.default({ label: "・ Automation" })
    .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/automation"); }), studio_core_1.MenuItem.default({ label: "・ Errors" })
    .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/errors"); }), studio_core_1.MenuItem.default({ label: "・ Graph" })
    .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/graph"); }), studio_core_1.MenuItem.default({
    label: "Throw an error in main-thread 💣",
    separatorBefore: true,
    hidden: !lib_dom_1.Browser.isLocalHost() && location.hash !== "#admin"
}).setTriggerProcedure(function () { return (0, lib_std_1.panic)("An error has been emulated"); }), studio_core_1.MenuItem.default({
    label: "Throw an error in audio-worklet 💣",
    hidden: !lib_dom_1.Browser.isLocalHost()
}).setTriggerProcedure(function () { return service.panicEngine(); }), studio_core_1.MenuItem.default({ label: "List Supported Codecs...", separatorBefore: true })
    .setTriggerProcedure(function () { return CodecsUtils_1.CodecsUtils.listSupportedCodecs(); }), studio_core_1.MenuItem.default({ label: "Clear Local Storage", separatorBefore: true })
    .setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
    var approved, _a, status_1, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                    headline: "Clear Local Storage",
                    message: "Are you sure? All your samples and projects will be deleted.\nThis cannot be undone!"
                })];
            case 1:
                approved = _b.sent();
                if (!approved) return [3 /*break*/, 6];
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.Workers.Opfs.delete(""))];
            case 2:
                _a = _b.sent(), status_1 = _a.status, error = _a.error;
                if (!(status_1 === "resolved")) return [3 /*break*/, 4];
                lib_std_1.RuntimeSignal.dispatch(studio_core_1.ProjectSignals.StorageUpdated);
                return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                        headline: "Clear Local Storage",
                        message: "Your Local Storage is cleared"
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                    headline: "Clear Local Storage",
                    message: String(error)
                })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); })); }); };
exports.createDebugMenu = createDebugMenu;
