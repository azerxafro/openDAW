"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficWatch = void 0;
var TrafficWatch_sass_inline_1 = require("./TrafficWatch.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TrafficWatch_sass_inline_1.default, "traffic-watch");
var formatRate = function (bytesPerSec) {
    if (bytesPerSec >= 1048576) {
        return "".concat((bytesPerSec / 1048576).toFixed(1), " MB/s");
    }
    if (bytesPerSec >= 1024) {
        return "".concat((bytesPerSec / 1024).toFixed(0), " KB/s");
    }
    return "".concat(bytesPerSec.toFixed(0), " B/s");
};
var TrafficWatch = function (_a) {
    var lifecycle = _a.lifecycle, trafficMeter = _a.trafficMeter;
    var upLabel = <span className="up"/>;
    var downLabel = <span className="down"/>;
    var element = <div className={className}>{upLabel}{downLabel}</div>;
    element.classList.add("hidden");
    var update = function (meter) {
        var up = meter.uploadRate;
        var down = meter.downloadRate;
        if (up === 0 && down === 0) {
            element.classList.add("hidden");
            return;
        }
        element.classList.remove("hidden");
        upLabel.textContent = up > 0 ? "\u2191 ".concat(formatRate(up)) : "";
        downLabel.textContent = down > 0 ? "\u2193 ".concat(formatRate(down)) : "";
    };
    if ((0, lib_std_1.isDefined)(trafficMeter)) {
        lifecycle.own(trafficMeter.subscribe(update));
    }
    return element;
};
exports.TrafficWatch = TrafficWatch;
