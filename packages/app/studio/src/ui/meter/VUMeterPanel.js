"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VUMeterPanel = void 0;
var VUMeterPanel_sass_inline_1 = require("./VUMeterPanel.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var VUMeterDesign_tsx_1 = require("@/ui/meter/VUMeterDesign.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var className = lib_dom_1.Html.adoptStyleSheet(VUMeterPanel_sass_inline_1.default, "VUMeterPanel");
var VUMeterPanel = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var peakL = lifecycle.own(new lib_std_1.DefaultObservableValue(0.0));
    var peakR = lifecycle.own(new lib_std_1.DefaultObservableValue(0.0));
    var runtime = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(service.projectProfileService.catchupAndSubscribe(function (optProfile) {
        runtime.terminate();
        optProfile.match({
            none: function () {
                peakL.setValue(0.0);
                peakR.setValue(0.0);
            },
            some: function (_a) {
                var liveStreamReceiver = _a.project.liveStreamReceiver;
                runtime.own(liveStreamReceiver.subscribeFloats(studio_adapters_1.EngineAddresses.PEAKS, function (peaks) {
                    var pl = peaks[0], pr = peaks[1];
                    peakL.setValue(pl >= peakL.getValue() ? pl : peakL.getValue() * 0.98);
                    peakR.setValue(pr >= peakR.getValue() ? pr : peakR.getValue() * 0.98);
                }));
            }
        });
    }));
    return (<div className={className}>
            <div className="meters">
                <div><VUMeterDesign_tsx_1.VUMeterDesign.Default model={peakL}/></div>
                <div><VUMeterDesign_tsx_1.VUMeterDesign.Default model={peakR}/></div>
            </div>
        </div>);
};
exports.VUMeterPanel = VUMeterPanel;
