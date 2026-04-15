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
exports.MetronomeControl = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var ShortcutTooltip_1 = require("@/ui/shortcuts/ShortcutTooltip");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var Icon_1 = require("@/ui/components/Icon");
var Checkbox_1 = require("@/ui/components/Checkbox");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var MetronomeControl = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, preferences = _a.preferences;
    var _b = preferences.settings, metronome = _b.metronome, recording = _b.recording;
    var gainModel = lifecycle.own(preferences.createMutableObservableValue("metronome", "gain"));
    var loadClickSound = function (index) { return __awaiter(void 0, void 0, void 0, function () {
        var fileResult, file, arrayBuffer, decodingResult, audioBuffer, data, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Files.open(studio_core_1.FilePickerAcceptTypes.WavFiles))];
                case 1:
                    fileResult = _a.sent();
                    if (fileResult.status === "rejected") {
                        return [2 /*return*/];
                    }
                    file = fileResult.value.at(0);
                    if ((0, lib_std_1.isAbsent)(file)) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, file.arrayBuffer()];
                case 2:
                    arrayBuffer = _a.sent();
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(service.audioContext.decodeAudioData(arrayBuffer))];
                case 3:
                    decodingResult = _a.sent();
                    if (decodingResult.status === "rejected") {
                        return [2 /*return*/];
                    }
                    audioBuffer = decodingResult.value;
                    data = lib_dsp_1.AudioData.create(audioBuffer.sampleRate, audioBuffer.length, audioBuffer.numberOfChannels);
                    for (i = 0; i < audioBuffer.numberOfChannels; i++) {
                        data.frames[i].set(audioBuffer.getChannelData(i));
                    }
                    service.engine.loadClickSound(index, data);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<Checkbox_1.Checkbox lifecycle={lifecycle} onInit={function (element) { return lifecycle.own(studio_core_1.ContextMenu.subscribe(element, function (collector) { return collector.addItems(studio_core_1.MenuItem.inputValue({
            name: "Volume",
            icon: studio_enums_1.IconSymbol.Metronome,
            color: studio_enums_1.Colors.orange,
            model: gainModel,
            valueMapping: lib_std_1.ValueMapping.linear(-48, 0),
            stringMapping: lib_std_1.StringMapping.decible,
            minValueWidth: "2.5em"
        }), studio_core_1.MenuItem.default({
            label: "Enabled",
            checked: metronome.enabled,
            shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-metronome"].shortcut.format()
        }).setTriggerProcedure(function () { return metronome.enabled = !metronome.enabled; }), studio_core_1.MenuItem.default({
            label: "Monophonic",
            checked: metronome.monophonic
        }).setTriggerProcedure(function () { return metronome.monophonic = !metronome.monophonic; }), studio_core_1.MenuItem.default({ label: "Beat Divider" })
            .setRuntimeChildrenProcedure(function (parent) {
            return parent.addMenuItem.apply(parent, studio_adapters_1.EngineSettings.BeatSubDivisionOptions
                .map(function (division) { return studio_core_1.MenuItem.default({
                label: String(division),
                checked: metronome.beatSubDivision === division
            }).setTriggerProcedure(function () { return metronome.beatSubDivision = division; }); }));
        }), studio_core_1.MenuItem.default({ label: "Set Count-In (Bars)" })
            .setRuntimeChildrenProcedure(function (parent) {
            return parent.addMenuItem.apply(parent, studio_adapters_1.EngineSettings.RecordingCountInBars
                .map(function (count) { return studio_core_1.MenuItem.default({
                label: String(count),
                checked: count === recording.countInBars
            }).setTriggerProcedure(function () { return recording.countInBars = count; }); }));
        }), studio_core_1.MenuItem.default({ label: "Browse click sound for" })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Numerator..." })
            .setTriggerProcedure(function () { return loadClickSound(0); }), studio_core_1.MenuItem.default({ label: "Denominator..." })
            .setTriggerProcedure(function () { return loadClickSound(1); })); })); })); }} model={preferences.createMutableObservableValue("metronome", "enabled")} appearance={{
            activeColor: studio_enums_1.Colors.orange,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Metronome", GlobalShortcuts_1.GlobalShortcuts["toggle-metronome"].shortcut)
        }}>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Metronome}/>
        </Checkbox_1.Checkbox>);
};
exports.MetronomeControl = MetronomeControl;
