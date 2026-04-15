"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WheelScaling = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var WheelScaling;
(function (WheelScaling) {
    WheelScaling.install = function (element, range) {
        return lib_dom_1.Events.subscribe(element, "wheel", function (event) {
            event.preventDefault();
            var scale = studio_core_1.StudioPreferences.settings.pointer["normalize-mouse-wheel"]
                ? Math.sign(event.deltaY) * 0.1
                : event.deltaY * 0.01;
            var rect = element.getBoundingClientRect();
            range.scaleBy(scale, range.xToValue(event.clientX - rect.left));
        }, { passive: false });
    };
})(WheelScaling || (exports.WheelScaling = WheelScaling = {}));
