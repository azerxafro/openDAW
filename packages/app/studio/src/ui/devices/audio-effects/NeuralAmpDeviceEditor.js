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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralAmpDeviceEditor = void 0;
var NeuralAmpDeviceEditor_sass_inline_1 = require("./NeuralAmpDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var ControlBuilder_1 = require("@/ui/devices/ControlBuilder");
var nam_wasm_1 = require("@opendaw/nam-wasm");
var NamModelDialog_1 = require("./NeuralAmp/NamModelDialog");
var SpectrumRenderer_1 = require("./NeuralAmp/SpectrumRenderer");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var Button_1 = require("@/ui/components/Button");
var MenuButton_1 = require("@/ui/components/MenuButton");
var studio_core_1 = require("@opendaw/studio-core");
var NamLocal_1 = require("@/ui/devices/audio-effects/NeuralAmp/NamLocal");
var NamTone3000_1 = require("@/ui/devices/audio-effects/NeuralAmp/NamTone3000");
var className = lib_dom_1.Html.adoptStyleSheet(NeuralAmpDeviceEditor_sass_inline_1.default, "NeuralAmpDeviceEditor");
var SizeOrder = ["standard", "lite", "feather", "nano", "custom"];
var NeuralAmpDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var boxGraph = project.boxGraph, editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, inputGain = _b.inputGain, outputGain = _b.outputGain, mix = _b.mix;
    var model = new lib_std_1.DefaultObservableValue(null);
    var packMeta = new lib_std_1.MutableObservableOption();
    var cachedModelIds = new lib_std_1.SortedSet(function (id) { return id; }, function (a, b) { return a - b; });
    var isDownloading = new lib_std_1.DefaultObservableValue(false);
    var urlsExpired = new lib_std_1.DefaultObservableValue(false);
    var switchController = null;
    var updateModel = function () {
        var modelJson = adapter.getModelJson();
        if (modelJson.length === 0) {
            model.setValue(null);
        }
        else {
            try {
                model.setValue(nam_wasm_1.NamModel.parse(modelJson));
            }
            catch (_a) {
                model.setValue(null);
            }
        }
    };
    var updatePackMeta = function () {
        var target = adapter.box.model.targetVertex;
        if (target.isEmpty()) {
            packMeta.clear();
            cachedModelIds.clear();
            return;
        }
        var modelBox = target.unwrap().box;
        var packId = modelBox.packId.getValue();
        if (packId.length === 0) {
            packMeta.clear();
            cachedModelIds.clear();
            return;
        }
        (0, NamTone3000_1.readPackMetaFromId)(packId).then(function (meta) {
            if ((0, lib_std_1.isDefined)(meta)) {
                packMeta.wrap(meta);
                (0, NamTone3000_1.scanCachedModels)(packId, meta).then(function (ids) {
                    cachedModelIds.clear();
                    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                        var id = ids_1[_i];
                        cachedModelIds.add(id);
                    }
                });
            }
            else {
                packMeta.clear();
                cachedModelIds.clear();
            }
        });
    };
    lifecycle.own(model);
    lifecycle.own(packMeta);
    lifecycle.own(isDownloading);
    lifecycle.own(urlsExpired);
    lifecycle.own(adapter.modelField.subscribe(function () {
        updateModel();
        updatePackMeta();
    }));
    updateModel();
    updatePackMeta();
    var browseApi = NamTone3000_1.NamTone3000.browse(boxGraph, editing, adapter);
    var browseLocal = NamLocal_1.NamLocal.browse(boxGraph, editing, adapter);
    var showModelInfo = function () {
        var current = model.getValue();
        if ((0, lib_std_1.isDefined)(current)) {
            (0, NamModelDialog_1.showNamModelDialog)(current);
        }
    };
    var getCurrentModelId = function () {
        var meta = packMeta.unwrapOrNull();
        if (!(0, lib_std_1.isDefined)(meta)) {
            return undefined;
        }
        var target = adapter.box.model.targetVertex;
        if (target.isEmpty()) {
            return undefined;
        }
        var modelBox = target.unwrap().box;
        var label = modelBox.label.getValue();
        var entry = meta.models.find(function (entry) { return label.endsWith(entry.name); });
        return entry === null || entry === void 0 ? void 0 : entry.id;
    };
    var getSortedModels = function (meta) {
        return __spreadArray([], meta.models, true).sort(function (entryA, entryB) {
            var sizeA = SizeOrder.indexOf(entryA.size);
            var sizeB = SizeOrder.indexOf(entryB.size);
            if (sizeA !== sizeB) {
                return sizeA - sizeB;
            }
            return entryA.name.localeCompare(entryB.name);
        });
    };
    var switchModel = function (entry) { return __awaiter(void 0, void 0, void 0, function () {
        var meta, controller, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    meta = packMeta.unwrapOrNull();
                    if (!(0, lib_std_1.isDefined)(meta)) {
                        return [2 /*return*/];
                    }
                    if ((0, lib_std_1.isDefined)(switchController)) {
                        switchController.abort();
                    }
                    controller = new AbortController();
                    switchController = controller;
                    isDownloading.setValue(true);
                    urlsExpired.setValue(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, NamTone3000_1.NamTone3000.loadModelFromPack(meta.toneId.toString(), entry.id, entry.name, boxGraph, editing, adapter, meta.title, controller.signal)];
                case 2:
                    _a.sent();
                    cachedModelIds.add(entry.id);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    if (lib_std_1.Errors.isAbort(error_1)) {
                        return [2 /*return*/];
                    }
                    console.error("Failed to switch model:", error_1);
                    urlsExpired.setValue(true);
                    return [3 /*break*/, 5];
                case 4:
                    if (switchController === controller) {
                        isDownloading.setValue(false);
                        switchController = null;
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var canStep = function (direction) {
        var meta = packMeta.unwrapOrNull();
        if (!(0, lib_std_1.isDefined)(meta)) {
            return false;
        }
        var sorted = getSortedModels(meta);
        if (sorted.length === 0) {
            return false;
        }
        var currentId = getCurrentModelId();
        if (!(0, lib_std_1.isDefined)(currentId)) {
            return true;
        }
        var currentIndex = sorted.findIndex(function (entry) { return entry.id === currentId; });
        if (currentIndex === -1) {
            return true;
        }
        return direction === -1 ? currentIndex > 0 : currentIndex < sorted.length - 1;
    };
    var stepModel = function (direction) {
        var meta = packMeta.unwrapOrNull();
        if (!(0, lib_std_1.isDefined)(meta)) {
            return;
        }
        var sorted = getSortedModels(meta);
        if (sorted.length === 0) {
            return;
        }
        var currentId = getCurrentModelId();
        var currentIndex = (0, lib_std_1.isDefined)(currentId) ? sorted.findIndex(function (entry) { return entry.id === currentId; }) : -1;
        var nextIndex;
        if (currentIndex === -1) {
            nextIndex = direction === 1 ? 0 : sorted.length - 1;
        }
        else {
            nextIndex = currentIndex + direction;
            if (nextIndex < 0 || nextIndex >= sorted.length) {
                return;
            }
        }
        switchModel(sorted[nextIndex]);
    };
    var modelMenuRoot = studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) {
        if (isDownloading.getValue()) {
            parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Downloading…", selectable: false }));
            return;
        }
        var meta = packMeta.unwrapOrNull();
        if (!(0, lib_std_1.isDefined)(meta)) {
            parent.addMenuItem(studio_core_1.MenuItem.default({ label: "No pack available", selectable: false }));
            return;
        }
        var currentId = getCurrentModelId();
        var sorted = getSortedModels(meta);
        var lastSize = "";
        var _loop_1 = function (entry) {
            var isCached = cachedModelIds.hasKey(entry.id);
            var item = studio_core_1.MenuItem.default({
                label: entry.name,
                checked: entry.id === currentId,
                icon: isCached ? studio_enums_1.IconSymbol.Box : studio_enums_1.IconSymbol.CloudFolder,
                separatorBefore: entry.size !== lastSize && lastSize !== ""
            }).setTriggerProcedure(function () { return switchModel(entry); });
            parent.addMenuItem(item);
            lastSize = entry.size;
        };
        for (var _i = 0, sorted_1 = sorted; _i < sorted_1.length; _i++) {
            var entry = sorted_1[_i];
            _loop_1(entry);
        }
    });
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <canvas className="spectrum" onInit={function (canvas) {
                lifecycle.own((0, SpectrumRenderer_1.createSpectrumRenderer)(canvas, adapter, project.liveStreamReceiver, project.engine.sampleRate));
            }}/>
                              <div className="browse-row">
                                  <Button_1.Button lifecycle={lifecycle} onClick={browseApi} appearance={{
                framed: true,
                landscape: false,
                cursor: "pointer",
                color: studio_enums_1.Colors.shadow,
                activeColor: studio_enums_1.Colors.white,
                tooltip: "Browse tone3000.com"
            }} className="tone3000-button">
                                      <img src="images/tone3000.svg" alt="tone3000 logo"/>
                                  </Button_1.Button>
                                  <Button_1.Button lifecycle={lifecycle} onClick={browseLocal} appearance={{
                framed: true,
                cursor: "pointer",
                color: studio_enums_1.Colors.shadow,
                activeColor: studio_enums_1.Colors.white,
                tooltip: "Browse local hard-drive"
            }}>
                                      <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Browse}/>
                                  </Button_1.Button>
                                  <div className="pack-label">
                                      <span className="pack-header">Tone3000 Pack</span>
                                      <span className="pack-name" onInit={function (element) {
                lifecycle.own(packMeta.catchupAndSubscribe(function (observable) {
                    var meta = observable.unwrapOrNull();
                    element.textContent = (0, lib_std_1.isDefined)(meta) ? meta.title : "N/A";
                    element.classList.toggle("empty", !(0, lib_std_1.isDefined)(meta));
                }));
            }}/>
                                  </div>
                              </div>
                              <div className="model-row">
                                  <MenuButton_1.MenuButton root={modelMenuRoot} appearance={{
                framed: true,
                color: studio_enums_1.Colors.shadow,
                activeColor: studio_enums_1.Colors.white
            }} stretch={true}>
                                      <span className="model-label" onInit={function (element) {
                var updateLabel = function () {
                    var _a, _b;
                    if (isDownloading.getValue()) {
                        element.textContent = "Downloading…";
                        element.classList.toggle("empty", false);
                    }
                    else if (urlsExpired.getValue()) {
                        element.textContent = "URLs expired — re-select pack";
                        element.classList.toggle("empty", true);
                    }
                    else {
                        var current = model.getValue();
                        if ((0, lib_std_1.isDefined)(current)) {
                            element.textContent = (_b = (_a = current.metadata) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unknown Model";
                            element.classList.toggle("empty", false);
                        }
                        else {
                            element.textContent = "No model loaded";
                            element.classList.toggle("empty", true);
                        }
                    }
                };
                lifecycle.own(model.subscribe(updateLabel));
                lifecycle.own(isDownloading.subscribe(updateLabel));
                lifecycle.own(urlsExpired.subscribe(updateLabel));
                updateLabel();
            }}/>
                                  </MenuButton_1.MenuButton>
                                  <div className="step-arrows" onInit={function (container) {
                var prevBtn = <button className="step-arrow" onclick={function () { return stepModel(-1); }}>&#9650;</button>;
                var nextBtn = <button className="step-arrow" onclick={function () { return stepModel(1); }}>&#9660;</button>;
                container.append(prevBtn, nextBtn);
                var updateArrows = function () {
                    prevBtn.classList.toggle("disabled", !canStep(-1));
                    nextBtn.classList.toggle("disabled", !canStep(1));
                };
                lifecycle.own(model.subscribe(updateArrows));
                lifecycle.own(packMeta.subscribe(updateArrows));
                queueMicrotask(updateArrows);
            }}/>
                                  <Button_1.Button lifecycle={lifecycle} onClick={showModelInfo} onInit={function (element) {
                var updateColor = function () {
                    element.parentElement.style.setProperty("--color", (0, lib_std_1.isDefined)(model.getValue())
                        ? studio_enums_1.Colors.blue.toString()
                        : studio_enums_1.Colors.shadow.toString());
                };
                lifecycle.own(model.subscribe(function () { return updateColor(); }));
                queueMicrotask(updateColor);
            }} appearance={{
                framed: true,
                cursor: "pointer",
                color: studio_enums_1.Colors.shadow,
                activeColor: studio_enums_1.Colors.white
            }}>
                                      <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Info}/>
                                  </Button_1.Button>
                              </div>
                              <div className="controls-row">
                                  {ControlBuilder_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: inputGain,
                anchor: 0.5
            })}
                                  {ControlBuilder_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: mix,
                anchor: 1.0
            })}
                                  {ControlBuilder_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: outputGain,
                anchor: 0.5
            })}
                                  <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, adapter.monoField)} className="mono-checkbox" appearance={{ cursor: "pointer" }}>
                                      <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/><span>Mono</span>
                                  </Checkbox_tsx_1.Checkbox>
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_enums_1.IconSymbol.Tone3000}/>);
};
exports.NeuralAmpDeviceEditor = NeuralAmpDeviceEditor;
