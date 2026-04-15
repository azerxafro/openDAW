"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapButton = void 0;
var TapButton_sass_inline_1 = require("./TapButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var className = lib_dom_1.Html.adoptStyleSheet(TapButton_sass_inline_1.default, "TapButton");
// TODO when engine is running, try to approach the actual signature
var TapButton = function (_a) {
    var service = _a.service;
    var projectProfileService = service.projectProfileService;
    var lastTapTime = performance.now();
    var lastMeasuredBpm = 0.0;
    var lastFilteredBpm = 0.0;
    return (<div className={className} onpointerdown={function (event) {
            var profileOption = projectProfileService.getValue();
            var tapTime = event.timeStamp;
            var differenceInSeconds = (tapTime - lastTapTime) / 1000.0;
            var denominator = profileOption.match({
                none: function () { return 4; },
                some: function (_a) {
                    var denominator = _a.project.timelineBox.signature.denominator;
                    return denominator.getValue();
                }
            });
            var quarter = lib_dsp_1.PPQN.fromSignature(1, denominator);
            var measuredBpm = lib_dsp_1.PPQN.secondsToBpm(differenceInSeconds, quarter);
            var ratio = lastMeasuredBpm / measuredBpm;
            var percentOff = Math.abs(Math.log10(ratio)) * 100.0;
            if (percentOff > 5.0) {
                // reset value
                lastFilteredBpm = measuredBpm;
            }
            else {
                // smooth exponentially
                var coeff = 0.125;
                lastFilteredBpm *= Math.pow(measuredBpm / lastFilteredBpm, coeff);
                profileOption
                    .ifSome(function (_a) {
                    var _b = _a.project, editing = _b.editing, bpm = _b.timelineBox.bpm;
                    return editing.modify(function () { return bpm.setValue(lastFilteredBpm); }, false);
                });
            }
            lastTapTime = tapTime;
            lastMeasuredBpm = measuredBpm;
        }}>TAP</div>);
};
exports.TapButton = TapButton;
