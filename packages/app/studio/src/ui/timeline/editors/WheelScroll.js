"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachWheelScroll = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var attachWheelScroll = function (element, range) {
    return lib_dom_1.Events.subscribe(element, "wheel", function (event) {
        var deltaX = event.deltaX;
        var ratio = 0.0001;
        var threshold = 1.0;
        var clamped = Math.max(deltaX - threshold, 0.0) + Math.min(deltaX + threshold, 0.0);
        if (Math.abs(clamped) > 0) {
            event.preventDefault();
            range.moveBy(clamped * ratio);
        }
    }, { passive: false });
};
exports.attachWheelScroll = attachWheelScroll;
