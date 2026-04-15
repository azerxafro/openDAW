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
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = void 0;
if ("stackTraceLimit" in Error) {
    Error.stackTraceLimit = 50;
}
var virtual_pwa_register_1 = require("virtual:pwa-register");
(0, virtual_pwa_register_1.registerSW)({ immediate: true });
require("./main.sass");
var App_tsx_1 = require("@/ui/App.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var StudioService_1 = require("@/service/StudioService");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var Cursors_ts_1 = require("@/ui/Cursors.ts");
var BuildInfo_1 = require("./BuildInfo");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_core_1 = require("@opendaw/studio-core");
var features_ts_1 = require("@/features.ts");
var MissingFeature_tsx_1 = require("@/ui/MissingFeature.tsx");
var UpdateMessage_tsx_1 = require("@/ui/UpdateMessage.tsx");
var AppDialogs_1 = require("@/AppDialogs");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_dom_1 = require("@opendaw/lib-dom");
var AudioOutputDevice_1 = require("@/audio/AudioOutputDevice");
var FontLoader_1 = require("@/ui/FontLoader");
var ErrorHandler_ts_1 = require("@/errors/ErrorHandler.ts");
var studio_p2p_1 = require("@opendaw/studio-p2p");
var StudioShortcutManager_1 = require("@/service/StudioShortcutManager");
var Menu_1 = require("@/ui/components/Menu");
var loadBuildInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fetch("/build-info.json?v=".concat(Date.now()))
                .then(function (x) { return x.json(); })
                .then(function (x) { return BuildInfo_1.BuildInfo.parse(x); })];
    });
}); };
var boot = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _c, status, buildInfo, testFeaturesResult, sampleRate, context, audioWorklets, audioDevices, chainedSampleProvider, chainedSoundfontProvider, sampleManager, soundfontManager, cloudAuthManager, service, errorHandler, surface, checkExtensions_1, checkUpdates_1, persisted;
    var _d, _e, _f;
    var workersUrl = _b.workersUrl, workletsUrl = _b.workletsUrl, offlineEngineUrl = _b.offlineEngineUrl;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                console.debug("booting...");
                console.debug(location.origin);
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(loadBuildInfo())];
            case 1:
                _c = _g.sent(), status = _c.status, buildInfo = _c.value;
                if (status === "rejected") {
                    alert("Error loading build info. Please reload the page.");
                    return [2 /*return*/];
                }
                console.debug("buildInfo", JSON.stringify(buildInfo, null, 2));
                return [4 /*yield*/, FontLoader_1.FontLoader.load()];
            case 2:
                _g.sent();
                return [4 /*yield*/, studio_core_1.Workers.install(workersUrl)];
            case 3:
                _g.sent();
                studio_core_1.AudioWorklets.install(workletsUrl);
                studio_core_1.OfflineEngineRenderer.install(offlineEngineUrl);
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch((0, features_ts_1.testFeatures)())];
            case 4:
                testFeaturesResult = _g.sent();
                if (testFeaturesResult.status === "rejected") {
                    (_d = document.querySelector("#preloader")) === null || _d === void 0 ? void 0 : _d.remove();
                    (0, lib_jsx_1.replaceChildren)(document.body, (0, MissingFeature_tsx_1.MissingFeature)({ error: testFeaturesResult.error }));
                    return [2 /*return*/];
                }
                console.debug("isLocalHost", lib_dom_1.Browser.isLocalHost());
                console.debug("agent", lib_dom_1.Browser.userAgent);
                sampleRate = lib_dom_1.Browser.isFirefox() ? undefined : 48000;
                console.debug("requesting custom sampleRate", sampleRate !== null && sampleRate !== void 0 ? sampleRate : "'No (Firefox)'");
                context = new AudioContext({ sampleRate: sampleRate, latencyHint: 0 });
                console.debug("AudioContext state: ".concat(context.state, ", sampleRate: ").concat(context.sampleRate));
                console.debug("Error.stackTraceLimit: ".concat((_e = Error.stackTraceLimit) !== null && _e !== void 0 ? _e : "N/A"));
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioWorklets.createFor(context))];
            case 5:
                audioWorklets = _g.sent();
                if (audioWorklets.status === "rejected") {
                    return [2 /*return*/, (0, lib_std_1.panic)(audioWorklets.error)];
                }
                if (context.state === "suspended") {
                    window.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.resume().then(function () {
                                        return console.debug("AudioContext resumed (".concat(context.state, ")"));
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, { capture: true, once: true });
                }
                return [4 /*yield*/, AudioOutputDevice_1.AudioOutputDevice.create(context)];
            case 6:
                audioDevices = _g.sent();
                chainedSampleProvider = new studio_p2p_1.ChainedSampleProvider({
                    fetch: function (uuid, progress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, studio_core_1.OpenSampleAPI.get().load(uuid, progress)];
                    }); }); }
                });
                chainedSoundfontProvider = new studio_p2p_1.ChainedSoundfontProvider({
                    fetch: function (uuid, progress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, studio_core_1.OpenSoundfontAPI.get().load(uuid, progress)];
                    }); }); }
                });
                sampleManager = new studio_core_1.GlobalSampleLoaderManager(chainedSampleProvider);
                soundfontManager = new studio_core_1.GlobalSoundfontLoaderManager(chainedSoundfontProvider);
                cloudAuthManager = studio_core_1.CloudAuthManager.create({
                    Dropbox: "jtehjzxaxf3bf1l",
                    GoogleDrive: "628747153367-gt1oqcn3trr9l9a7jhigja6l1t3f1oik.apps.googleusercontent.com"
                });
                service = new StudioService_1.StudioService(context, audioWorklets.value, audioDevices, sampleManager, soundfontManager, chainedSampleProvider, chainedSoundfontProvider, cloudAuthManager, buildInfo);
                StudioShortcutManager_1.StudioShortcutManager.install(service);
                errorHandler = new ErrorHandler_ts_1.ErrorHandler(buildInfo, function () { return service.recovery.createBackupCommand(); });
                surface = Surface_tsx_1.Surface.main({
                    config: function (surface) { return surface.own(studio_core_1.ContextMenu.install(surface.owner, function (menuItem, _a) {
                        var clientX = _a.clientX, clientY = _a.clientY;
                        lib_dom_1.Html.unfocus(surface.owner);
                        var offset = 2;
                        var x = clientX - offset;
                        var y = clientY;
                        var menu = Menu_1.Menu.create(menuItem);
                        menu.moveTo(x, y);
                        menu.attach(Surface_tsx_1.Surface.get(surface.owner).flyout);
                    })); }
                }, errorHandler);
                Surface_tsx_1.Surface.subscribeKeyboard("keydown", function (event) { return lib_dom_1.ShortcutManager.get().handleEvent(event); }, Number.MAX_SAFE_INTEGER);
                (_f = document.querySelector("#preloader")) === null || _f === void 0 ? void 0 : _f.remove();
                (0, lib_jsx_1.replaceChildren)(surface.ground, (0, App_tsx_1.App)(service));
                lib_dom_1.AnimationFrame.start(window);
                (0, Cursors_ts_1.installCursors)();
                lib_std_1.RuntimeNotifier.install({
                    info: function (request) { return dialogs_tsx_1.Dialogs.info(request); },
                    approve: function (request) { return dialogs_tsx_1.Dialogs.approve(__assign(__assign({}, request), { reverse: true })); },
                    progress: function (request) { return dialogs_tsx_1.Dialogs.progress(request); }
                });
                if (buildInfo.env === "production" && !lib_dom_1.Browser.isLocalHost()) {
                    if (import.meta.env.BUILD_UUID !== buildInfo.uuid) {
                        console.warn("Cache issue:");
                        console.warn("expected uuid", buildInfo.uuid);
                        console.warn("embedded uuid", import.meta.env.BUILD_UUID);
                        dialogs_tsx_1.Dialogs.cache();
                        return [2 /*return*/];
                    }
                    checkExtensions_1 = setInterval(function () {
                        if (document.scripts.length > 1) {
                            dialogs_tsx_1.Dialogs.info({
                                headline: "Warning",
                                message: "Please disable extensions to avoid undefined behavior.",
                                okText: "Ignore"
                            }).finally();
                            clearInterval(checkExtensions_1);
                        }
                    }, 5000);
                    checkUpdates_1 = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, status, newBuildInfo;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!navigator.onLine) {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(loadBuildInfo())];
                                case 1:
                                    _a = _b.sent(), status = _a.status, newBuildInfo = _a.value;
                                    if (status === "resolved" && newBuildInfo.uuid !== undefined && newBuildInfo.uuid !== buildInfo.uuid) {
                                        document.body.prepend((0, UpdateMessage_tsx_1.UpdateMessage)());
                                        console.warn("A new version is online.");
                                        clearInterval(checkUpdates_1);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 5000);
                }
                else {
                    console.debug("No production checks (build version & updates).");
                }
                if (!lib_dom_1.Browser.isFirefox()) return [3 /*break*/, 9];
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(navigator.storage.persisted())];
            case 7:
                persisted = _g.sent();
                console.debug("Firefox.isPersisted", persisted.value);
                if (!(persisted.status === "resolved" && !persisted.value)) return [3 /*break*/, 9];
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch((0, AppDialogs_1.showStoragePersistDialog)())];
            case 8:
                _g.sent();
                _g.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.boot = boot;
