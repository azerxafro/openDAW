"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerContextMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var Surface_1 = require("@/ui/surface/Surface");
var FloatingTextInput_1 = require("@/ui/components/FloatingTextInput");
var lib_std_1 = require("@opendaw/lib-std");
var debug_1 = require("@/ui/menu/debug");
var Markers_1 = require("@/ui/timeline/tracks/primary/marker/Markers");
var MarkerContextMenu;
(function (MarkerContextMenu) {
    MarkerContextMenu.install = function (element, range, capturing, editing) {
        return studio_core_1.ContextMenu.subscribe(element, function (_a) {
            var addItems = _a.addItems, client = _a.client;
            var adapter = capturing.captureEvent(client);
            if (adapter === null) {
                return;
            }
            addItems(studio_core_1.MenuItem.default({ label: "Rename" }).setRuntimeChildrenProcedure(function (parent) {
                parent.addMenuItem.apply(parent, __spreadArray([studio_core_1.MenuItem.default({ label: "Custom" }).setTriggerProcedure(function () {
                        var resolvers = Promise.withResolvers();
                        var clientRect = element.getBoundingClientRect();
                        Surface_1.Surface.get(element).flyout.appendChild((0, FloatingTextInput_1.FloatingTextInput)({
                            position: {
                                x: range.unitToX(adapter.position) + clientRect.left,
                                y: clientRect.top + clientRect.height / 2
                            },
                            value: adapter.label,
                            resolvers: resolvers
                        }));
                        resolvers.promise.then(function (newName) { return editing.modify(function () { return adapter.box.label.setValue(newName); }); }, lib_std_1.EmptyExec);
                    })], Markers_1.Markers.DefaultNames
                    .map(function (name, index) { return studio_core_1.MenuItem.default({
                    label: name,
                    separatorBefore: index === 0,
                    checked: name === adapter.label
                }).setTriggerProcedure(function () { return editing.modify(function () { return adapter.box.label.setValue(name); }); }); }), false));
            }), studio_core_1.MenuItem.default({ label: "Repeat" }).setRuntimeChildrenProcedure(function (parent) {
                parent.addMenuItem.apply(parent, __spreadArray([studio_core_1.MenuItem.default({ label: "Infinite", checked: adapter.plays === 0 })
                        .setTriggerProcedure(function () { return editing.modify(function () { return adapter.box.plays.setValue(0); }); })], lib_std_1.Arrays.create(function (index) { return studio_core_1.MenuItem.default({
                    label: String(index + 1),
                    checked: adapter.plays === index + 1
                }).setTriggerProcedure(function () { return editing.modify(function () { return adapter.box.plays.setValue(index + 1); }); }); }, 16), false));
            }), studio_core_1.MenuItem.default({ label: "Delete" })
                .setTriggerProcedure(function () { return editing.modify(function () { return adapter.box.delete(); }); }), debug_1.DebugMenus.debugBox(adapter.box));
        });
    };
})(MarkerContextMenu || (exports.MarkerContextMenu = MarkerContextMenu = {}));
