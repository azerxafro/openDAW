"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsoluteUnitDisplay = void 0;
var AbsoluteUnitDisplay_sass_inline_1 = require("./AbsoluteUnitDisplay.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var UnitDisplay_1 = require("@/ui/header/UnitDisplay");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(AbsoluteUnitDisplay_sass_inline_1.default, "AbsoluteUnitDisplay");
var AbsoluteUnitDisplay = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var hoursUnitString = new lib_std_1.DefaultObservableValue("1");
    var minutesUnitString = new lib_std_1.DefaultObservableValue("01");
    var secondsUnitString = new lib_std_1.DefaultObservableValue("01");
    var framesUnitString = new lib_std_1.DefaultObservableValue("00");
    var subFramesUnitString = new lib_std_1.DefaultObservableValue("00");
    var unitDisplays = [
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="hr" value={hoursUnitString} numChars={2}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="min" value={minutesUnitString} numChars={2}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="sec" value={secondsUnitString} numChars={2}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="fr" value={framesUnitString} numChars={2}/>,
        <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="sub" value={subFramesUnitString} numChars={2}/>
    ];
    var subscription = lifecycle.own(new lib_std_1.Terminator());
    return (<div className={className} onInit={function (element) {
            lifecycle.ownAll(service.projectProfileService.catchupAndSubscribe(function (optProfile) {
                subscription.terminate();
                if (optProfile.nonEmpty()) {
                    var _a = optProfile.unwrap().project, position_1 = _a.engine.position, tempoMap_1 = _a.tempoMap, timelineBoxAdapter = _a.timelineBoxAdapter;
                    var values_1 = studio_core_1.StudioPreferences.settings["time-display"];
                    var update = function () {
                        var ppqn = position_1.getValue();
                        var _a = lib_dsp_1.SMPTE.fromSeconds(tempoMap_1.ppqnToSeconds(ppqn), values_1.fps), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, frames = _a.frames, subframes = _a.subframes;
                        hoursUnitString.setValue(Math.abs(hours).toFixed(0).padStart(2, "0"));
                        minutesUnitString.setValue(Math.abs(minutes).toFixed(0).padStart(2, "0"));
                        secondsUnitString.setValue(Math.abs(seconds).toFixed(0).padStart(2, "0"));
                        framesUnitString.setValue(frames.toFixed(0).padStart(2, "0"));
                        subFramesUnitString.setValue(subframes.toFixed(0).padStart(2, "0"));
                    };
                    subscription.ownAll(service.engine.position.catchupAndSubscribe(update), timelineBoxAdapter.catchupAndSubscribeTempoAutomation(update));
                }
                else {
                    hoursUnitString.setValue("00");
                    minutesUnitString.setValue("00");
                    secondsUnitString.setValue("00");
                    framesUnitString.setValue("00");
                    subFramesUnitString.setValue("00");
                }
            }), studio_core_1.StudioPreferences.catchupAndSubscribe(function (enabled) {
                return element.classList.toggle("hidden", !enabled);
            }, "time-display", "absolute"), studio_core_1.StudioPreferences.catchupAndSubscribe(function (details) {
                var maxIndex = details ? 4 : 2;
                unitDisplays.forEach(function (element, index) { return element.classList.toggle("hidden", index > maxIndex); });
            }, "time-display", "details"));
        }}>
            {unitDisplays[0]}
            {unitDisplays[1]}
            {unitDisplays[2]}
            {unitDisplays[3]}
            {unitDisplays[4]}
        </div>);
};
exports.AbsoluteUnitDisplay = AbsoluteUnitDisplay;
