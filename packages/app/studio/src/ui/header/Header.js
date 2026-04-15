"use strict";
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
exports.Header = void 0;
var Header_sass_inline_1 = require("./Header.sass?inline");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var TransportGroup_tsx_1 = require("@/ui/header/TransportGroup.tsx");
var TimeStateDisplay_tsx_1 = require("@/ui/header/TimeStateDisplay.tsx");
var RadioGroup_tsx_1 = require("@/ui/components/RadioGroup.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var Workspace_ts_1 = require("@/ui/workspace/Workspace.ts");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_2 = require("@opendaw/lib-std");
var Manuals_1 = require("@/ui/pages/Manuals");
var HorizontalPeakMeter_1 = require("@/ui/components/HorizontalPeakMeter");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var ShortcutTooltip_1 = require("@/ui/shortcuts/ShortcutTooltip");
var UndoRedoButtons_1 = require("@/ui/header/UndoRedoButtons");
var MetronomeControl_1 = require("@/ui/header/MetronomeControl");
var PerformanceStats_1 = require("@/ui/header/PerformanceStats");
var BaseFrequencyControl_1 = require("@/ui/header/BaseFrequencyControl");
var className = lib_dom_1.Html.adoptStyleSheet(Header_sass_inline_1.default, "Header");
var ScreenShortcutKeys = {
    "dashboard": "workspace-screen-dashboard",
    "default": "workspace-screen-default",
    "mixer": "workspace-screen-mixer",
    "piano": "workspace-screen-piano",
    "project": "workspace-screen-project",
    "shadertoy": "workspace-screen-shadertoy",
    "meter": "workspace-screen-meter",
    "code": "workspace-screen-default"
};
var Header = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var peaksInDb = new Float32Array(2);
    var runtime = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(service.projectProfileService.catchupAndSubscribe(function (optProfile) {
        runtime.terminate();
        optProfile.match({
            none: function () { return peaksInDb.fill(Number.NEGATIVE_INFINITY); },
            some: function (_a) {
                var liveStreamReceiver = _a.project.liveStreamReceiver;
                return runtime.own(liveStreamReceiver
                    .subscribeFloats(studio_adapters_1.EngineAddresses.PEAKS, function (_a) {
                    var l = _a[0], r = _a[1];
                    peaksInDb[0] = (0, lib_dsp_1.gainToDb)(l);
                    peaksInDb[1] = (0, lib_dsp_1.gainToDb)(r);
                }));
            }
        });
    }));
    var addManualMenuItems = function (manuals) { return manuals.map(function (manual) {
        var _a, _b;
        if (manual.type === "page") {
            return studio_core_1.MenuItem.default({
                label: manual.label,
                icon: manual.icon,
                checked: lib_jsx_1.RouteLocation.get().path === manual.path,
                separatorBefore: (_a = manual.separatorBefore) !== null && _a !== void 0 ? _a : false
            }).setTriggerProcedure(function () { return lib_jsx_1.RouteLocation.get().navigateTo(manual.path); });
        }
        else if (manual.type === "folder") {
            return studio_core_1.MenuItem.default({
                label: manual.label,
                icon: manual.icon,
                separatorBefore: (_b = manual.separatorBefore) !== null && _b !== void 0 ? _b : false
            }).setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, addManualMenuItems(manual.files)); });
        }
        else {
            return (0, lib_std_1.panic)();
        }
    }); };
    var preferences = service.engine.preferences;
    return (<header className={className}>
            <MenuButton_tsx_1.MenuButton root={service.menu} appearance={{ color: studio_enums_1.Colors.gray, activeColor: studio_enums_1.Colors.bright, tinyTriangle: true }}>
                <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                    <img src="/assets/lucid-logo.svg" alt="LUCID" style={{ height: "1.4em", pointerEvents: "none" }}/>
                    <h5>LUCID</h5>
                </div>
            </MenuButton_tsx_1.MenuButton>
            <hr />
            <lib_jsx_1.Group onInit={function (element) { return studio_core_1.StudioPreferences.catchupAndSubscribe(function (enabled) {
            return element.classList.toggle("hidden", !enabled);
        }, "visibility", "enable-history-buttons"); }}>
                <UndoRedoButtons_1.UndoRedoButtons lifecycle={lifecycle} service={service}/>
                <hr />
            </lib_jsx_1.Group>
            <div style={{ display: "flex", columnGap: "4px" }}>
                <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={studio_core_1.MidiDevices.available()} appearance={{ activeColor: studio_enums_1.Colors.orange, tooltip: "Midi Access", cursor: "pointer" }}>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Midi}/>
                </Checkbox_tsx_1.Checkbox>
                <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) {
            return parent.addMenuItem.apply(parent, __spreadArray([studio_core_1.MenuItem.header({ label: "Manuals", icon: studio_enums_1.IconSymbol.OpenDAW, color: studio_enums_1.Colors.green })], addManualMenuItems(Manuals_1.Manuals), false));
        })} appearance={{ color: studio_enums_1.Colors.green, tinyTriangle: true }}>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Help}/>
                </MenuButton_tsx_1.MenuButton>
            </div>
            <hr />
            <TransportGroup_tsx_1.TransportGroup lifecycle={lifecycle} service={service}/>
            <hr />
            <TimeStateDisplay_tsx_1.TimeStateDisplay lifecycle={lifecycle} service={service}/>
            <BaseFrequencyControl_1.BaseFrequencyControl lifecycle={lifecycle} service={service}/>
            <hr />
            <MetronomeControl_1.MetronomeControl lifecycle={lifecycle} service={service} preferences={preferences}/>
            <hr />
            <div style={{ flex: "1 0 0" }}/>
                location.origin.includes("dev.opendaw.studio")
                && (<h5 style={{ color: studio_enums_1.Colors.cream.toString() }}>DEV VERSION (UNSTABLE)</h5>)}
            
            <button className="button" style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid #00ffff', color: '#00ffff', padding: '0 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={function () {
            if (!service.hasProfile)
                return;
            // If already joined a room, just copy URL, else create logic would bounce to /join
            var url = window.location.href;
            if (!url.includes('/join/')) {
                var room = lib_std_2.UUID.generate();
                lib_jsx_1.RouteLocation.get().navigateTo("/join/".concat(room));
                url = "".concat(window.location.origin, "/join/").concat(room);
            }
            navigator.clipboard.writeText(url);
            lib_std_2.RuntimeNotifier.info({ headline: "Room Active", message: "Link copied to clipboard: ".concat(url) });
        }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Link}/> Share
            </button>
            <button className="button" style={{ background: 'rgba(255, 119, 0, 0.1)', border: '1px solid #ff7700', color: '#ff7700', padding: '0 8px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }} onClick={function () { return Promise.resolve().then(function () { return require("@/service/audio/AutoMastering"); }).then(function (m) { return m.AutoMastering.trigger(service); }); }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Wand}/> Auto-Master
            </button>

            <div style={{ flex: "2 0 0" }}/>
            <hr />
            <HorizontalPeakMeter_1.HorizontalPeakMeter lifecycle={lifecycle} peaksInDb={peaksInDb} width="4em"/>
            <hr />
            <div className="panel-selector">
                <RadioGroup_tsx_1.RadioGroup lifecycle={lifecycle} model={new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.setValue = function (value) {
                if (service.hasProfile) {
                    service.switchScreen(value);
                }
            };
            class_1.prototype.getValue = function () {
                return service.layout.screen.getValue();
            };
            class_1.prototype.subscribe = function (observer) {
                return service.layout.screen.subscribe(observer);
            };
            class_1.prototype.catchupAndSubscribe = function (observer) {
                observer(this);
                return this.subscribe(observer);
            };
            return class_1;
        }())} elements={Object.entries(Workspace_ts_1.Workspace.Default)
            .filter(function (_a) {
            var _ = _a[0], hidden = _a[1].hidden;
            return hidden !== true;
        })
            .map(function (_a) {
            var key = _a[0], _b = _a[1], iconSymbol = _b.icon, name = _b.name;
            return ({
                value: key,
                element: <Icon_tsx_1.Icon symbol={iconSymbol}/>,
                tooltip: ShortcutTooltip_1.ShortcutTooltip.create(name, GlobalShortcuts_1.GlobalShortcuts[ScreenShortcutKeys[key]].shortcut)
            });
        })} appearance={{ framed: true, landscape: true }}/>
            </div>
            <hr />
            <PerformanceStats_1.PerformanceStats lifecycle={lifecycle} service={service}/>
        </header>);
};
exports.Header = Header;
