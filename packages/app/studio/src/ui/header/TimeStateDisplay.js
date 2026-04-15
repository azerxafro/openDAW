"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeStateDisplay = void 0;
var TimeStateDisplay_sass_inline_1 = require("./TimeStateDisplay.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var TapButton_1 = require("@/ui/header/TapButton");
var MusicalUnitDisplay_1 = require("@/ui/header/MusicalUnitDisplay");
var AbsoluteUnitDisplay_1 = require("@/ui/header/AbsoluteUnitDisplay");
var TempoControl_1 = require("@/ui/header/TempoControl");
var MeterControl_1 = require("@/ui/header/MeterControl");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(TimeStateDisplay_sass_inline_1.default, "TimeStateDisplay");
var TimeStateDisplay = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var projectProfileService = service.projectProfileService;
    var shuffleDigit = lib_jsx_1.Inject.value("60");
    var projectActiveLifeTime = lifecycle.own(new lib_std_1.Terminator());
    var projectProfileObserver = function (optProfile) {
        projectActiveLifeTime.terminate();
        if (optProfile.isEmpty()) {
            return;
        }
        var project = optProfile.unwrap().project;
        var rootBoxAdapter = project.rootBoxAdapter;
        projectActiveLifeTime.ownAll(rootBoxAdapter.groove.box.amount.catchupAndSubscribe(function (owner) {
            return shuffleDigit.value = String(Math.round(owner.getValue() * 100));
        }));
    };
    lifecycle.own(projectProfileService.catchupAndSubscribe(projectProfileObserver));
    var element = (<div className={className} onInit={function (element) {
            var values = studio_core_1.StudioPreferences.settings["time-display"];
            return studio_core_1.ContextMenu.subscribe(element, function (collector) { return collector.addItems(studio_core_1.MenuItem.header({ label: "Time Units", icon: studio_enums_1.IconSymbol.Time, color: studio_enums_1.Colors.green }), studio_core_1.MenuItem.default({
                label: "Musical Time (Bars, Beats)",
                checked: values.musical
            }).setTriggerProcedure(function () { return values.musical = !values.musical; }), studio_core_1.MenuItem.default({
                label: "Absolute Time (Hours, Minutes, Seconds)",
                checked: values.absolute
            }).setTriggerProcedure(function () { return values.absolute = !values.absolute; }), studio_core_1.MenuItem.default({
                label: "Fine Details (Ticks, Frames)",
                checked: values.details
            }).setTriggerProcedure(function () { return values.details = !values.details; }), studio_core_1.MenuItem.default({
                label: "FPS"
            }).setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, studio_core_1.FpsOptions
                .map(function (fps) { return studio_core_1.MenuItem.default({
                label: String(fps),
                checked: values.fps === fps
            }).setTriggerProcedure(function () { return values.fps = fps; }); })); })); });
        }}>
            <MusicalUnitDisplay_1.MusicalUnitDisplay lifecycle={lifecycle} service={service}/>
            <AbsoluteUnitDisplay_1.AbsoluteUnitDisplay lifecycle={lifecycle} service={service}/>
            <TempoControl_1.TempoControl lifecycle={lifecycle} service={service}/>
            <TapButton_1.TapButton service={service}/>
            <MeterControl_1.MeterControl lifecycle={lifecycle} service={service}/>
        </div>);
    return element;
};
exports.TimeStateDisplay = TimeStateDisplay;
