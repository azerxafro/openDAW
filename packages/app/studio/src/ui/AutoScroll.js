"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installAutoScroll = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var installAutoScroll = function (target, autoScroller, options) {
    var _a, _b;
    var lifeTime = new lib_std_1.Terminator();
    var measure = (_a = options === null || options === void 0 ? void 0 : options.measure) !== null && _a !== void 0 ? _a : (function () {
        var _a = target.getBoundingClientRect(), bottom = _a.bottom, left = _a.left, right = _a.right, top = _a.top;
        return { xMin: left, yMin: top, xMax: right, yMax: bottom };
    });
    var padding = (_b = options === null || options === void 0 ? void 0 : options.padding) !== null && _b !== void 0 ? _b : lib_std_1.Padding.Identity;
    var scrolling = lib_std_1.Option.None;
    var deltaX = 0.0;
    var deltaY = 0.0;
    var moveListener = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        var _b = lib_std_1.AABB.padding(measure(), padding), xMin = _b.xMin, xMax = _b.xMax, yMin = _b.yMin, yMax = _b.yMax;
        deltaX = clientX < xMin ? clientX - xMin : clientX > xMax ? clientX - xMax : 0;
        deltaY = clientY < yMin ? clientY - yMin : clientY > yMax ? clientY - yMax : 0;
        var inside = deltaX === 0 && deltaY === 0;
        if (scrolling.isEmpty()) {
            if (!inside) {
                scrolling = lib_std_1.Option.wrap(lib_dom_1.AnimationFrame.add(function () { return autoScroller(deltaX, deltaY); }));
            }
        }
        else {
            if (inside) {
                scrolling.unwrap().terminate();
                scrolling = lib_std_1.Option.None;
            }
        }
    };
    return lib_dom_1.Events.subscribe(target, "pointerdown", function () {
        var owner = Surface_tsx_1.Surface.get(target).owner.document;
        lifeTime.terminate();
        var upListener = function () {
            scrolling.ifSome(function (terminable) { return terminable.terminate(); });
            scrolling = lib_std_1.Option.None;
            lifeTime.terminate();
        };
        lifeTime.ownAll(lib_dom_1.Events.subscribe(owner, "dragover", moveListener, { capture: true }), lib_dom_1.Events.subscribe(owner, "pointermove", moveListener, { capture: true }), lib_dom_1.Events.subscribe(owner, "pointerup", upListener), lib_dom_1.Events.subscribe(owner, "dragend", upListener));
    }, { capture: true });
};
exports.installAutoScroll = installAutoScroll;
