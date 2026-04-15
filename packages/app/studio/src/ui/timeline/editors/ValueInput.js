"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installValueInput = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var FloatingTextInput_tsx_1 = require("@/ui/components/FloatingTextInput.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var installValueInput = function (_a) {
    var element = _a.element, selection = _a.selection, getter = _a.getter, setter = _a.setter;
    var lastSelected = null;
    return lib_std_1.Terminable.many(selection.subscribe({
        onSelected: function (adapter) { return lastSelected = adapter; },
        onDeselected: function (adapter) { if (lastSelected === adapter) {
            lastSelected = null;
        } }
    }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        if (lastSelected === null) {
            return;
        }
        if (event.key === "Enter") {
            var resolvers = Promise.withResolvers();
            var surface = Surface_tsx_1.Surface.get(element);
            surface.flyout.appendChild((0, FloatingTextInput_tsx_1.FloatingTextInput)({
                numeric: true,
                position: lib_std_1.Point.add(surface.pointer, { x: 0, y: 16 }),
                value: getter(lastSelected),
                resolvers: resolvers
            }));
            resolvers.promise.then(function (text) { return setter(text); }, lib_std_1.EmptyExec);
        }
    }), { terminate: function () { return lastSelected = null; } });
};
exports.installValueInput = installValueInput;
