"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGainButton = void 0;
var AutoGainButton_sass_inline_1 = require("./AutoGainButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var constants_1 = require("@/ui/devices/constants");
var Column_1 = require("@/ui/devices/Column");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var className = lib_dom_1.Html.adoptStyleSheet(AutoGainButton_sass_inline_1.default, "AutoGainButton");
var AutoGainButton = function (_a) {
    var lifecycle = _a.lifecycle, _b = _a.project, editing = _b.editing, liveStreamReceiver = _b.liveStreamReceiver, adapter = _a.adapter;
    var autoGainButton = (<div className={className}>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.AutoGain}/>
        </div>);
    var max = 0.0;
    var startTime = 0.0;
    var canProbe = true;
    var probing = lifecycle.own(new lib_std_1.Terminator());
    var minDuration = 1000; // ms
    var targetDb = -0.1;
    var startProbing = function () {
        max = 0.0;
        startTime = Date.now();
        autoGainButton.classList.add("probing");
        canProbe = false;
    };
    var stopProbing = function () {
        probing.terminate();
        autoGainButton.classList.remove("probing");
        canProbe = true;
        var volume = adapter.namedParameter.volume;
        var normalizeDb = (volume.getValue() - (0, lib_dsp_1.gainToDb)(max)) + targetDb;
        if (normalizeDb > 48.0) {
            console.debug("greater than 48db. do nothing.");
        }
        else if (normalizeDb > 12.0) {
            console.debug("greater than 12db");
            editing.modify(function () { return volume.setValue(12.0); });
        }
        else {
            editing.modify(function () { return volume.setValue(normalizeDb); });
        }
    };
    lifecycle.ownAll(lib_dom_1.Events.subscribe(autoGainButton, "pointerdown", function (event) {
        if (!canProbe) {
            return;
        }
        autoGainButton.setPointerCapture(event.pointerId);
        startProbing();
        probing.ownAll(liveStreamReceiver.subscribeFloats(adapter.address, function (peaks) { return max = Math.max(peaks[0], peaks[1], max); }), lib_dom_1.Events.subscribe(autoGainButton, "pointerup", function () {
            var duration = Date.now() - startTime;
            if (duration < minDuration) {
                probing.own(lib_runtime_1.Runtime.scheduleTimeout(stopProbing, minDuration - duration));
            }
            else {
                stopProbing();
            }
        }, { once: true }));
    }));
    return (<Column_1.Column ems={constants_1.LKR} color={studio_enums_1.Colors.cream}>
            <h5>Auto Gain</h5>
            {autoGainButton}
        </Column_1.Column>);
};
exports.AutoGainButton = AutoGainButton;
