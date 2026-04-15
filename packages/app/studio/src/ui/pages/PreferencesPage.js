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
exports.PreferencesPage = void 0;
var PreferencesPage_sass_inline_1 = require("./PreferencesPage.sass?inline");
var BackButton_1 = require("@/ui/pages/BackButton");
var lib_dom_1 = require("@opendaw/lib-dom");
var PreferencePanel_1 = require("@/ui/PreferencePanel");
var studio_core_1 = require("@opendaw/studio-core");
var StudioShortcutManager_1 = require("@/service/StudioShortcutManager");
var lib_std_1 = require("@opendaw/lib-std");
var ShortcutManagerView_1 = require("@/ui/components/ShortcutManagerView");
var Button_1 = require("@/ui/components/Button");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var PreferencesPageLabels_1 = require("@/ui/pages/PreferencesPageLabels");
var className = lib_dom_1.Html.adoptStyleSheet(PreferencesPage_sass_inline_1.default, "PreferencesPage");
var PreferencesPage = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    // this is for the shortcuts panel
    var updateNotifier = new lib_std_1.Notifier();
    var contexts = {};
    lib_std_1.Objects.entries(StudioShortcutManager_1.StudioShortcutManager.Contexts).forEach(function (_a) {
        var key = _a[0], shortcuts = _a[1];
        return contexts[key] = lib_dom_1.ShortcutDefinitions.copy(shortcuts.workingDefinition);
    });
    return (<div className={className}>
            <BackButton_1.BackButton />
            <h1>Preferences</h1>
            <div className="sections">
                <section>
                    <div className="header">
                        <h2>Studio UI</h2>
                        <span>(Changes are applied immediately)</span>
                    </div>
                    <PreferencePanel_1.PreferencePanel lifecycle={lifecycle} preferences={studio_core_1.StudioPreferences} labels={PreferencesPageLabels_1.PreferencesPageLabels.StudioSettingsLabels} options={PreferencesPageLabels_1.PreferencesPageLabels.StudioSettingsOptions}/>
                </section>
                <section>
                    <div className="header">
                        <h2>Audio Engine</h2>
                        <span>(Changes are applied immediately)</span>
                    </div>
                    <PreferencePanel_1.PreferencePanel lifecycle={lifecycle} preferences={service.engine.preferences} labels={PreferencesPageLabels_1.PreferencesPageLabels.EngineSettingsLabels} options={PreferencesPageLabels_1.PreferencesPageLabels.EngineSettingsOptions}/>
                </section>
                <section>
                    <div className="shortcuts">
                        <h2>Shortcuts</h2>
                        <div className="buttons">
                            <Button_1.Button lifecycle={lifecycle} onClick={function () {
            lib_std_1.Objects.entries(StudioShortcutManager_1.StudioShortcutManager.Contexts).forEach(function (_a) {
                var key = _a[0], workingDefinition = _a[1].workingDefinition;
                return lib_dom_1.ShortcutDefinitions.copyInto(contexts[key], workingDefinition);
            });
            StudioShortcutManager_1.StudioShortcutManager.store();
        }} appearance={{ color: studio_enums_1.Colors.purple }}>APPLY</Button_1.Button>
                            <Button_1.Button lifecycle={lifecycle} onClick={function () {
            lib_std_1.Objects.entries(StudioShortcutManager_1.StudioShortcutManager.Contexts).forEach(function (_a) {
                var key = _a[0], factory = _a[1].factory;
                return contexts[key] = lib_dom_1.ShortcutDefinitions.copy(factory);
            });
            updateNotifier.notify();
        }} appearance={{ color: studio_enums_1.Colors.cream }}>FACTORY</Button_1.Button>
                            <Button_1.Button lifecycle={lifecycle} onClick={function () {
            lib_std_1.Objects.entries(StudioShortcutManager_1.StudioShortcutManager.Contexts).forEach(function (_a) {
                var key = _a[0], workingDefinition = _a[1].workingDefinition;
                return contexts[key] = lib_dom_1.ShortcutDefinitions.copy(workingDefinition);
            });
            updateNotifier.notify();
        }} appearance={{ color: studio_enums_1.Colors.cream }}>RESET</Button_1.Button>
                            <Button_1.Button lifecycle={lifecycle} onClick={function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, status, jsonString, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises
                            .tryCatch(lib_dom_1.Files.open({ types: [studio_core_1.FilePickerAcceptTypes.JsonFileType] })
                            .then(function (_a) {
                            var file = _a[0];
                            return file.text();
                        }))];
                    case 1:
                        _a = _b.sent(), status = _a.status, jsonString = _a.value, error = _a.error;
                        if (status === "resolved") {
                            StudioShortcutManager_1.StudioShortcutManager.fromJSONString(contexts, jsonString);
                            updateNotifier.notify();
                        }
                        else {
                            console.warn(error);
                        }
                        return [2 /*return*/];
                }
            });
        }); }} appearance={{ color: studio_enums_1.Colors.green }}>LOAD</Button_1.Button>
                            <Button_1.Button lifecycle={lifecycle} onClick={function () { return StudioShortcutManager_1.StudioShortcutManager.toJSONString(contexts)
            .ifSome(function (jsonString) { return lib_dom_1.Files.save(new TextEncoder().encode(jsonString).buffer, { suggestedName: "openDAW.shortcuts.json" }); }); }} appearance={{ color: studio_enums_1.Colors.green }}>SAVE</Button_1.Button>
                        </div>
                    </div>
                    <ShortcutManagerView_1.ShortcutManagerView lifecycle={lifecycle} contexts={contexts} updateNotifier={updateNotifier}/>
                </section>
            </div>
        </div>);
};
exports.PreferencesPage = PreferencesPage;
