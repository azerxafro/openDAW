"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicalUnitDisplay = void 0;
var MusicalUnitDisplay_sass_inline_1 = require("./MusicalUnitDisplay.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var UnitDisplay_1 = require("@/ui/header/UnitDisplay");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(MusicalUnitDisplay_sass_inline_1.default, "MusicalUnitDisplay");
var MusicalUnitDisplay = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var barUnitString = new lib_std_1.DefaultObservableValue("001");
    var beatUnitString = new lib_std_1.DefaultObservableValue("1");
    var semiquaverUnitString = new lib_std_1.DefaultObservableValue("1");
    var ticksUnitString = new lib_std_1.DefaultObservableValue("1");
    var unitDisplays = [
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="bar" value={barUnitString} numChars={3}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="beat" value={beatUnitString} numChars={2}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="semi" value={semiquaverUnitString} numChars={2}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="ticks" value={ticksUnitString} numChars={3}/>
    ];
    return (<div className={className} onInit={function (element) {
            lifecycle.ownAll(service.engine.position.catchupAndSubscribe(function (owner) {
                var position = owner.getValue();
                var _a = service.projectProfileService.getValue().match({
                    some: function (_a) {
                        var project = _a.project;
                        return project.timelineBoxAdapter.signatureTrack.toParts(position);
                    },
                    none: function () { return ({ bars: 0, beats: 0, semiquavers: 0, ticks: 0 }); }
                }), bars = _a.bars, beats = _a.beats, semiquavers = _a.semiquavers, ticks = _a.ticks;
                barUnitString.setValue((bars + 1).toString().padStart(3, "0"));
                beatUnitString.setValue((beats + 1).toString());
                semiquaverUnitString.setValue((semiquavers + 1).toString());
                ticksUnitString.setValue(ticks.toString().padStart(3, "0"));
                element.classList.toggle("negative", position < 0);
            }), studio_core_1.StudioPreferences.catchupAndSubscribe(function (enabled) {
                return element.classList.toggle("hidden", !enabled);
            }, "time-display", "musical"), studio_core_1.StudioPreferences.catchupAndSubscribe(function (details) {
                var maxIndex = details ? 3 : 1;
                unitDisplays.forEach(function (element, index) { return element.classList.toggle("hidden", index > maxIndex); });
            }, "time-display", "details"));
        }}>{unitDisplays}</div>);
};
exports.MusicalUnitDisplay = MusicalUnitDisplay;
