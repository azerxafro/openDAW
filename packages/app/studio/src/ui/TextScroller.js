"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextScroller = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextScroller;
(function (TextScroller) {
    TextScroller.install = function (element) {
        element.style.overflow = "hidden";
        var scrolling = new lib_std_1.Terminator();
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(element, "pointerenter", function () {
            element.style.textOverflow = "clip";
            var x = 0.0;
            scrolling.own(lib_dom_1.AnimationFrame.add(function () {
                var smoothStep = function (k) { return k * k * (3.0 - 2.0 * k); };
                var t = 1.0 - Math.abs(2.0 * (Math.floor(x) - x) + 1.0);
                var moveFunc = smoothStep((0, lib_std_1.clamp)((t - 0.25) / (0.75 - 0.25), 0.0, 1.0));
                element.scrollTop = moveFunc * (element.scrollHeight - element.clientHeight);
                element.scrollLeft = moveFunc * (element.scrollWidth - element.clientWidth);
                x += 0.125 / Math.max(element.scrollWidth, element.scrollHeight);
            }));
        }), lib_dom_1.Events.subscribe(element, "pointerleave", function () {
            element.style.textOverflow = "ellipsis";
            element.scrollLeft = 0;
            scrolling.terminate();
        }), scrolling);
    };
})(TextScroller || (exports.TextScroller = TextScroller = {}));
