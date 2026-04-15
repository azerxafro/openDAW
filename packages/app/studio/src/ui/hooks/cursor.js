"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCursor = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var installCursor = function (element, capturing, provider) {
    var clientX = 0.0;
    var clientY = 0.0;
    var buttons = 0;
    var captured = false;
    var keyboardSubscription = lib_std_1.Terminable.Empty;
    var lifecycle = new lib_std_1.Terminator();
    var changeCursor = function (event) {
        var _a;
        var identifier = (_a = provider.get(capturing.captureEvent(event), event)) !== null && _a !== void 0 ? _a : "auto";
        Surface_tsx_1.Surface.forEach(function (surface) { return lib_dom_1.CssUtils.setCursor(identifier, surface.owner.document); });
    };
    var keyboardListener = function (event) {
        if (!event.repeat && !captured) {
            changeCursor({
                clientX: clientX,
                clientY: clientY,
                buttons: buttons,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                type: event.type
            });
        }
    };
    lifecycle.own(lib_dom_1.Events.subscribe(element, "pointerenter", function () {
        var eventTarget = Surface_tsx_1.Surface.get(element).owner;
        keyboardSubscription.terminate();
        keyboardSubscription = lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(eventTarget, "keydown", keyboardListener), lib_dom_1.Events.subscribe(eventTarget, "keyup", keyboardListener));
    }));
    lifecycle.own(lib_dom_1.Events.subscribe(element, "pointermove", function (event) {
        clientX = event.clientX;
        clientY = event.clientY;
        buttons = event.buttons;
        if (event.buttons === 0) {
            changeCursor(event);
        }
    }));
    lifecycle.own(lib_dom_1.Events.subscribe(element, "gotpointercapture", function () { return captured = true; }));
    lifecycle.own(lib_dom_1.Events.subscribe(element, "lostpointercapture", function (event) {
        captured = false;
        changeCursor(event);
    }));
    lifecycle.own(lib_dom_1.Events.subscribe(element, "pointerup", function (event) { return changeCursor(event); }));
    lifecycle.own(lib_dom_1.Events.subscribe(element, "pointerleave", function (event) {
        if (event.buttons > 0) {
            return;
        }
        keyboardSubscription.terminate();
        if ((0, lib_std_1.isDefined)(provider.leave)) {
            provider.leave();
        }
        lib_dom_1.CssUtils.setCursor("auto");
    }));
    lifecycle.own({ terminate: function () { return keyboardSubscription.terminate(); } });
    return lifecycle;
};
exports.installCursor = installCursor;
