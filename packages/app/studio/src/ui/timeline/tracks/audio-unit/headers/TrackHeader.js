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
exports.TrackHeader = void 0;
var TrackHeader_sass_inline_1 = require("./TrackHeader.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var AudioUnitChannelControls_tsx_1 = require("@/ui/timeline/tracks/audio-unit/AudioUnitChannelControls.tsx");
var TrackHeaderMenu_ts_1 = require("@/ui/timeline/tracks/audio-unit/headers/TrackHeaderMenu.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var Surface_1 = require("@/ui/surface/Surface");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var className = lib_dom_1.Html.adoptStyleSheet(TrackHeader_sass_inline_1.default, "TrackHeader");
var TrackHeader = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, trackBoxAdapter = _a.trackBoxAdapter, audioUnitBoxAdapter = _a.audioUnitBoxAdapter;
    var nameLabel = <h5 style={{ color: studio_enums_1.Colors.dark.toString() }}/>;
    var controlLabel = <h5 style={{ color: studio_enums_1.Colors.shadow.toString() }}/>;
    var project = service.project;
    lifecycle.own(trackBoxAdapter.catchupAndSubscribePath(function (option) { return option.match({
        none: function () {
            nameLabel.textContent = "";
            controlLabel.textContent = "";
        },
        some: function (_a) {
            var device = _a[0], target = _a[1];
            nameLabel.textContent = device;
            controlLabel.textContent = target;
        }
    }); }));
    var color = studio_adapters_1.ColorCodes.forAudioType(audioUnitBoxAdapter.type);
    var lockIcon = <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Lock} className="lock-icon"/>;
    var element = (<div className={lib_dom_1.Html.buildClassList(className, "is-primary")} tabindex={-1}>
            <div className="icon-container">
                <Icon_tsx_1.Icon symbol={studio_adapters_1.TrackType.toIconSymbol(trackBoxAdapter.type)} style={{ color: color.toString() }}/>
                {lockIcon}
            </div>
            <div className="labels">
                {nameLabel}
                {controlLabel}
            </div>
            <lib_jsx_1.Group onInit={function (element) {
            var channelLifeCycle = lifecycle.own(new lib_std_1.Terminator());
            trackBoxAdapter.indexField
                .catchupAndSubscribe(function (owner) {
                channelLifeCycle.terminate();
                lib_dom_1.Html.empty(element);
                if (owner.getValue() === 0) {
                    (0, lib_jsx_1.replaceChildren)(element, (<AudioUnitChannelControls_tsx_1.AudioUnitChannelControls lifecycle={channelLifeCycle} service={service} adapter={audioUnitBoxAdapter}/>));
                }
                else {
                    (0, lib_jsx_1.replaceChildren)(element, <div />);
                }
            });
        }}/>
            <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure((0, TrackHeaderMenu_ts_1.installTrackHeaderMenu)(service, audioUnitBoxAdapter, trackBoxAdapter))} style={{ minWidth: "0", justifySelf: "end" }} appearance={{ color: studio_enums_1.Colors.shadow, activeColor: studio_enums_1.Colors.cream }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Menu} style={{ fontSize: "0.75em" }}/>
            </MenuButton_tsx_1.MenuButton>
        </div>);
    var audioUnitFreeze = project.audioUnitFreeze;
    var updateFrozenState = function () {
        var frozen = audioUnitFreeze.isFrozen(audioUnitBoxAdapter);
        lockIcon.style.display = frozen ? "" : "none";
    };
    updateFrozenState();
    var audioUnitEditing = project.userEditingManager.audioUnit;
    lifecycle.ownAll(audioUnitFreeze.subscribe(function (uuid) {
        if (lib_std_1.UUID.equals(uuid, audioUnitBoxAdapter.uuid)) {
            updateFrozenState();
        }
    }), lib_dom_1.Events.subscribeDblDwn(nameLabel, function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, error, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(Surface_1.Surface.get(nameLabel)
                        .requestFloatingTextInput(event, trackBoxAdapter.targetName.unwrapOrElse("")))];
                case 1:
                    _a = _b.sent(), status = _a.status, error = _a.error, value = _a.value;
                    if (status === "rejected") {
                        if (!lib_std_1.Errors.isAbort(error)) {
                            return [2 /*return*/, (0, lib_std_1.panic)(error)];
                        }
                    }
                    else {
                        project.editing.modify(function () { return trackBoxAdapter.targetName = value; });
                    }
                    return [2 /*return*/];
            }
        });
    }); }), lib_dom_1.Events.subscribe(element, "pointerdown", function () {
        project.timelineFocus.focusTrack(trackBoxAdapter);
        if (!audioUnitEditing.isEditing(audioUnitBoxAdapter.box.editing)) {
            audioUnitEditing.edit(audioUnitBoxAdapter.box.editing);
        }
    }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        if (!lib_dom_1.Keyboard.isDelete(event)) {
            return;
        }
        project.editing.modify(function () {
            if (audioUnitBoxAdapter.tracks.collection.size() === 1) {
                project.api.deleteAudioUnit(audioUnitBoxAdapter.box);
            }
            else {
                audioUnitBoxAdapter.deleteTrack(trackBoxAdapter);
            }
        });
    }), DragAndDrop_1.DragAndDrop.installTarget(element, {
        drag: function (_event, data) {
            return (data.type === "midi-effect" || data.type === "audio-effect") && data.start_index === null;
        },
        drop: function (_event, data) {
            var _a;
            if (data.type === "midi-effect") {
                if (data.start_index !== null) {
                    return;
                }
                var factory_1 = studio_core_1.EffectFactories.MidiNamed[data.device];
                if (factory_1.type !== ((_a = audioUnitBoxAdapter.input.adapter().unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.accepts)) {
                    return;
                }
                var effectField_1 = audioUnitBoxAdapter.box.midiEffects;
                project.editing.modify(function () {
                    return factory_1.create(project, effectField_1, effectField_1.pointerHub.incoming().length);
                });
            }
            else if (data.type === "audio-effect") {
                if (data.start_index !== null) {
                    return;
                }
                var factory_2 = studio_core_1.EffectFactories.AudioNamed[data.device];
                var effectField_2 = audioUnitBoxAdapter.box.audioEffects;
                project.editing.modify(function () {
                    return factory_2.create(project, effectField_2, effectField_2.pointerHub.incoming().length);
                });
            }
        },
        enter: function (allowDrop) { return element.classList.toggle("accept-drop", allowDrop); },
        leave: function () { return element.classList.remove("accept-drop"); }
    }));
    return element;
};
exports.TrackHeader = TrackHeader;
