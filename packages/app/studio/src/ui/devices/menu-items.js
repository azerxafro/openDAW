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
exports.MenuItems = void 0;
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var Surface_1 = require("@/ui/surface/Surface");
var FloatingTextInput_1 = require("@/ui/components/FloatingTextInput");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var MenuItems;
(function (MenuItems) {
    var _this = this;
    MenuItems.forAudioUnitInput = function (parent, service, deviceHost) {
        var project = service.project;
        var editing = project.editing, api = project.api;
        var audioUnit = deviceHost.audioUnitBoxAdapter();
        var _a = deviceHost.inputAdapter.mapOr(function (input) { return ({
            canProcessMidi: input.type === "instrument",
            manualUrl: input.manualUrl,
            name: input.labelField.getValue()
        }); }, { canProcessMidi: false, manualUrl: "manuals", name: "Unknown" }), canProcessMidi = _a.canProcessMidi, manualUrl = _a.manualUrl, name = _a.name;
        parent.addMenuItem(populateMenuItemToNavigateToManual(manualUrl, name), studio_core_1.MenuItem.default({
            label: "Delete '".concat(audioUnit.label, "'"),
            hidden: audioUnit.isOutput
        }).setTriggerProcedure(function () { return editing.modify(function () { return project.api.deleteAudioUnit(audioUnit.box); }); }), populateMenuItemToRenameDevice(editing, audioUnit.inputAdapter.unwrap().labelField), studio_core_1.MenuItem.default({ label: "Add Midi-Effect", separatorBefore: true, selectable: canProcessMidi })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, studio_core_1.EffectFactories.MidiList
            .map(function (entry) { return studio_core_1.MenuItem.default({
            label: entry.defaultName,
            icon: entry.defaultIcon,
            separatorBefore: entry.separatorBefore
        }).setTriggerProcedure(function () { return editing.modify(function () {
            return api.insertEffect(deviceHost.midiEffects.field(), entry, 0);
        }); }); })); }), studio_core_1.MenuItem.default({ label: "Add Audio Effect" })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, studio_core_1.EffectFactories.AudioList
            .map(function (entry) { return studio_core_1.MenuItem.default({
            label: entry.defaultName,
            icon: entry.defaultIcon,
            separatorBefore: entry.separatorBefore
        }).setTriggerProcedure(function () { return editing.modify(function () {
            return api.insertEffect(deviceHost.audioEffects.field(), entry, 0);
        }); }); })); }), studio_core_1.MenuItem.default({ label: "Save Preset..." })
            .setTriggerProcedure(function () { return __awaiter(_this, void 0, void 0, function () {
            var presetBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presetBytes = studio_adapters_1.PresetEncoder.encode(audioUnit.box);
                        return [4 /*yield*/, lib_dom_1.Files.save(presetBytes, {
                                types: [studio_core_1.FilePickerAcceptTypes.PresetFileType],
                                suggestedName: "".concat(audioUnit.label, ".odp")
                            }).catch(console.warn)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), studio_core_1.MenuItem.default({ label: "Load Preset..." })
            .setTriggerProcedure(function () { return __awaiter(_this, void 0, void 0, function () {
            var keepEffects, files, arrayBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                            headline: "Load Preset",
                            message: "Replace current effects?",
                            approveText: "Yes",
                            cancelText: "No"
                        })];
                    case 1:
                        keepEffects = !(_a.sent());
                        return [4 /*yield*/, lib_dom_1.Files.open({ types: [studio_core_1.FilePickerAcceptTypes.PresetFileType], multiple: false })];
                    case 2:
                        files = _a.sent();
                        if (files.length === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, files[0].arrayBuffer()];
                    case 3:
                        arrayBuffer = _a.sent();
                        editing.modify(function () {
                            var attempt = studio_adapters_1.PresetDecoder.replaceAudioUnit(arrayBuffer, audioUnit.box, {
                                keepMIDIEffects: keepEffects,
                                keepAudioEffects: keepEffects
                            });
                            if (attempt.isFailure()) {
                                lib_std_1.RuntimeNotifier.info({ headline: "Can't do...", message: attempt.failureReason() }).then();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); }), studio_core_1.MenuItem.default({
            label: "Load Deprecated Preset...",
            hidden: location.hash !== "#riffle"
        }).setTriggerProcedure(function () { return __awaiter(_this, void 0, void 0, function () {
            var files, string, _a, _b, json, input;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, lib_dom_1.Files.open({ types: [studio_core_1.FilePickerAcceptTypes.JsonFileType] })];
                    case 1:
                        files = _d.sent();
                        if (files.length === 0) {
                            return [2 /*return*/];
                        }
                        _b = (_a = new TextDecoder()).decode;
                        return [4 /*yield*/, files[0].arrayBuffer()];
                    case 2:
                        string = _b.apply(_a, [_d.sent()]);
                        json = JSON.parse(string);
                        if (!(json["2"] !== "Vaporisateur")) return [3 /*break*/, 4];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                headline: "Cannot Load Preset",
                                message: "This feature is deprecated (code: 0)."
                            })];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        delete json["1"];
                        input = (_c = audioUnit.box.input.pointerHub.incoming().at(0)) === null || _c === void 0 ? void 0 : _c.box;
                        if (!!(0, lib_std_1.isInstanceOf)(input, studio_boxes_1.VaporisateurDeviceBox)) return [3 /*break*/, 6];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                headline: "Cannot Load Preset",
                                message: "This feature is deprecated (code: 1)."
                            })];
                    case 5:
                        _d.sent();
                        return [2 /*return*/];
                    case 6:
                        editing.modify(function () { return input.fromJSON(json); });
                        return [2 /*return*/];
                }
            });
        }); }));
    };
    MenuItems.createForValue = function (editing, label, primitive, value) {
        return studio_core_1.MenuItem.default({ label: label, checked: primitive.getValue() === value })
            .setTriggerProcedure(function () { return editing.modify(function () { return primitive.setValue(value); }); });
    };
    MenuItems.forEffectDevice = function (parent, service, host, device) {
        var project = service.project;
        var editing = project.editing;
        parent.addMenuItem(populateMenuItemToNavigateToManual(device.manualUrl, device.labelField.getValue()), populateMenuItemToDeleteDevice(editing, device), populateMenuItemToCreateEffect(service, host, device), populateMenuItemToMoveEffect(project, host, device));
    };
    var populateMenuItemToRenameDevice = function (editing, labelField) {
        return studio_core_1.MenuItem.default({ label: "Rename..." }).setTriggerProcedure(function () {
            var resolvers = Promise.withResolvers();
            var surface = Surface_1.Surface.get();
            surface.flyout.appendChild((0, FloatingTextInput_1.FloatingTextInput)({
                position: surface.pointer,
                value: labelField.getValue(),
                resolvers: resolvers
            }));
            resolvers.promise.then(function (newName) { return editing.modify(function () { return labelField.setValue(newName); }); }, lib_std_1.EmptyExec);
        });
    };
    var populateMenuItemToNavigateToManual = function (path, name) {
        return studio_core_1.MenuItem.default({ label: "Visit '".concat(name, "' Manual...") })
            .setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo(path); });
    };
    var populateMenuItemToDeleteDevice = function (editing) {
        var devices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            devices[_i - 1] = arguments[_i];
        }
        var label = "Delete '".concat(devices.map(function (device) { return device.labelField.getValue(); }).join(", "), "'");
        return studio_core_1.MenuItem.default({ label: label })
            .setTriggerProcedure(function () { return editing.modify(function () { return studio_adapters_1.Devices.deleteEffectDevices(devices); }); });
    };
    var populateMenuItemToCreateEffect = function (service, host, adapter) {
        var project = service.project;
        var editing = project.editing, api = project.api;
        return adapter.accepts === "audio"
            ? studio_core_1.MenuItem.default({ label: "Add Audio Effect", separatorBefore: true })
                .setRuntimeChildrenProcedure(function (parent) { return parent
                .addMenuItem.apply(parent, studio_core_1.EffectFactories.AudioList
                .map(function (factory) { return studio_core_1.MenuItem.default({
                label: factory.defaultName,
                icon: factory.defaultIcon,
                separatorBefore: factory.separatorBefore
            }).setTriggerProcedure(function () {
                return editing.modify(function () { return api.insertEffect(host.audioEffects.field(), factory, adapter.indexField.getValue() + 1); });
            }); })); })
            : adapter.accepts === "midi"
                ? studio_core_1.MenuItem.default({ label: "Add Midi Effect", separatorBefore: true })
                    .setRuntimeChildrenProcedure(function (parent) { return parent
                    .addMenuItem.apply(parent, studio_core_1.EffectFactories.MidiList
                    .map(function (factory) { return studio_core_1.MenuItem.default({
                    label: factory.defaultName,
                    icon: factory.defaultIcon,
                    separatorBefore: factory.separatorBefore
                }).setTriggerProcedure(function () { return editing.modify(function () { return api
                    .insertEffect(host.midiEffects.field(), factory, adapter.indexField.getValue() + 1); }); }); })); }) : (0, lib_std_1.panic)("Unknown accepts value: ".concat(adapter.accepts));
    };
    var populateMenuItemToMoveEffect = function (_a, host, adapter) {
        var editing = _a.editing;
        var adapters = adapter.accepts === "audio"
            ? host.audioEffects.adapters()
            : adapter.accepts === "midi"
                ? host.midiEffects.adapters()
                : (0, lib_std_1.panic)("Unknown accept type: ".concat(adapter.accepts));
        var index = adapter.indexField.getValue();
        return studio_core_1.MenuItem.default({ label: "Move Effect", selectable: index > 0 || index < adapters.length - 1 })
            .setRuntimeChildrenProcedure(function (parent) {
            return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Left", selectable: index > 0 })
                .setTriggerProcedure(function () { return editing.modify(function () {
                adapter.indexField.setValue(index - 1);
                adapters[index - 1].indexField.setValue(index);
            }); }), studio_core_1.MenuItem.default({ label: "Right", selectable: index < adapters.length - 1 })
                .setTriggerProcedure(function () { return editing.modify(function () {
                adapter.indexField.setValue(index + 1);
                adapters[index + 1].indexField.setValue(index);
            }); }));
        });
    };
})(MenuItems || (exports.MenuItems = MenuItems = {}));
