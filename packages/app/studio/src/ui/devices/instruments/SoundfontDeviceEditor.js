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
exports.SoundfontDeviceEditor = void 0;
var SoundfontDeviceEditor_sass_inline_1 = require("./SoundfontDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var MenuButton_1 = require("@/ui/components/MenuButton");
var Icon_1 = require("@/ui/components/Icon");
var FlexSpacer_1 = require("@/ui/components/FlexSpacer");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(SoundfontDeviceEditor_sass_inline_1.default, "editor");
var SoundfontDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var _b = adapter.namedParameter;
    var project = service.project;
    var boxGraph = project.boxGraph, editing = project.editing, liveStreamReceiver = project.liveStreamReceiver;
    var labelSoundfontName = <span />;
    var labelPresetName = <span data-index="1"/>;
    var loaderLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.ownAll(adapter.loader.catchupAndSubscribe(function (optLoader) {
        loaderLifecycle.terminate();
        optLoader.ifSome(function (loader) {
            if (loader.soundfont.isEmpty()) {
                labelSoundfontName.textContent = "Loading...";
            }
            loaderLifecycle.own(loader.subscribe(function (state) {
                if (state.type === "progress") {
                    labelSoundfontName.textContent = "Loading... ".concat(Math.round(state.progress * 100), "%");
                }
            }));
        });
    }), adapter.soundfont.catchupAndSubscribe(function (optSoundfont) { return labelSoundfontName.textContent = optSoundfont
        .mapOr(function (soundfont) { return soundfont.metaData.name; }, "No Soundfont"); }), adapter.preset.catchupAndSubscribe(function (optPreset) { return optPreset.match({
        none: function () {
            labelPresetName.textContent = "No Preset";
            labelPresetName.dataset["index"] = "";
        },
        some: function (preset) {
            labelPresetName.textContent = preset.header.name;
            labelPresetName.dataset["index"] = "#".concat(adapter.presetIndex + 1);
        }
    }); }));
    var applySoundfont = function (soundfont) {
        var uuid = lib_std_1.UUID.parse(soundfont.uuid);
        editing.modify(function () {
            var targetVertex = adapter.box.file.targetVertex.unwrapOrNull();
            var fileBox = boxGraph.findBox(uuid).unwrapOrElse(function () {
                return studio_boxes_1.SoundfontFileBox.create(boxGraph, uuid, function (box) { return box.fileName.setValue(soundfont.name); });
            });
            adapter.box.presetIndex.setValue(0);
            adapter.box.file.refer(fileBox);
            if ((targetVertex === null || targetVertex === void 0 ? void 0 : targetVertex.box.isValid()) === false) {
                targetVertex.box.delete();
            }
        });
    };
    var populateMenu = function (scope) {
        return scope.match({
            none: function () { return [studio_core_1.MenuItem.default({
                    label: "Could not load library",
                    selectable: false
                })]; },
            some: function (list) { return list.map(function (soundfont) {
                return studio_core_1.MenuItem.default({
                    label: soundfont.name,
                    checked: adapter.box.file.targetAddress.match({
                        none: function () { return false; },
                        some: function (_a) {
                            var uuid = _a.uuid;
                            return lib_std_1.UUID.toString(uuid) === soundfont.uuid;
                        }
                    })
                }).setTriggerProcedure(function () { return applySoundfont(soundfont); });
            }); }
        });
    };
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost); }} populateControls={function () { return (<div className={className}>
                              <FlexSpacer_1.FlexSpacer pixels={2}/>
                              <header>
                                  <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Book}/>
                                  <h1>Soundfont</h1>
                              </header>
                              <div className="label">
                                  <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) {
                parent.addMenuItem(studio_core_1.MenuItem.default({
                    label: "Stock",
                    icon: studio_enums_1.IconSymbol.CloudFolder,
                    selectable: service.soundfontService
                        .remote.mapOr(function (list) { return list.length > 0; }, false)
                }).setRuntimeChildrenProcedure(function (parent) { return parent
                    .addMenuItem.apply(parent, populateMenu(service.soundfontService.remote)); }), studio_core_1.MenuItem.default({
                    label: "Local",
                    icon: studio_enums_1.IconSymbol.UserFolder,
                    selectable: service.soundfontService
                        .local.mapOr(function (list) { return list.length > 0; }, false)
                }).setRuntimeChildrenProcedure(function (parent) { return parent
                    .addMenuItem.apply(parent, populateMenu(service.soundfontService.local)); }), studio_core_1.MenuItem.default({ label: "Import Soundfont...", separatorBefore: true })
                    .setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var soundfonts;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.soundfontService.browse(false)];
                            case 1:
                                soundfonts = _a.sent();
                                if (soundfonts.length > 0) {
                                    applySoundfont(soundfonts[0]);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }));
            })}>
                                      {labelSoundfontName}
                                  </MenuButton_1.MenuButton>
                              </div>
                              <FlexSpacer_1.FlexSpacer pixels={4}/>
                              <header>
                                  <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Piano}/>
                                  <h1 onInit={function (element) { return lifecycle.own(adapter.soundfont
                .catchupAndSubscribe(function (optSoundfont) {
                return element.dataset["count"] = optSoundfont.match({
                    none: function () { return ""; },
                    some: function (soundfont) { return "(".concat(soundfont.presets.length, ")"); }
                });
            })); }}>Preset</h1>
                              </header>
                              <div className="label">
                                  <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, adapter.soundfont.mapOr(function (sf) { return sf.presets
                .map(function (preset, index) { return studio_core_1.MenuItem.default({
                label: "#".concat(index + 1, " ").concat(preset.header.name),
                checked: adapter.presetIndex === index
            }).setTriggerProcedure(function () {
                return editing.modify(function () { return adapter.box.presetIndex.setValue(index); });
            }); }); }, [studio_core_1.MenuItem.default({ label: "No soundfonts available" })])); })}>
                                      {labelPresetName}
                                  </MenuButton_1.MenuButton>
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={liveStreamReceiver} address={adapter.address}/>); }} icon={studio_adapters_1.InstrumentFactories.Soundfont.defaultIcon}/>);
};
exports.SoundfontDeviceEditor = SoundfontDeviceEditor;
