"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installValueContextMenu = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var ValueEventEditing_1 = require("@/ui/timeline/editors/value/ValueEventEditing");
var debug_1 = require("@/ui/menu/debug");
var installValueContextMenu = function (_a) {
    var element = _a.element, capturing = _a.capturing, editing = _a.editing, selection = _a.selection;
    return studio_core_1.ContextMenu.subscribe(element, function (_a) {
        var addItems = _a.addItems, client = _a.client;
        var target = capturing.captureEvent(client);
        if (target === null || target.type === "loop-duration") {
            return;
        }
        if ("event" in target && !selection.isSelected(target.event)) {
            selection.deselectAll();
            selection.select(target.event);
        }
        addItems(studio_core_1.MenuItem.default({ label: "Delete" })
            .setTriggerProcedure(function () { return editing.modify(function () { return selection.selected()
            .forEach(function (adapter) { return ValueEventEditing_1.ValueEventEditing.deleteEvent(adapter.collection.unwrap(), adapter); }); }); }), studio_core_1.MenuItem.default({ label: "Interpolation" })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({
            label: "None",
            checked: target.event.interpolation.type === "none"
        }).setTriggerProcedure(function () { return editing.modify(function () { return selection.selected()
            .forEach(function (adapter) { return adapter.interpolation = lib_dsp_1.Interpolation.None; }); }); }), studio_core_1.MenuItem.default({
            label: "Linear",
            checked: target.event.interpolation.type === "linear"
        }).setTriggerProcedure(function () { return editing.modify(function () { return selection.selected()
            .forEach(function (adapter) { return adapter.interpolation = lib_dsp_1.Interpolation.Linear; }); }); }), studio_core_1.MenuItem.default({
            label: "Curve",
            checked: target.event.interpolation.type === "curve"
        }).setTriggerProcedure(function () {
            editing.modify(function () {
                var interpolation = lib_dsp_1.Interpolation.Curve(0.75);
                selection.selected().forEach(function (adapter) { return adapter.interpolation = interpolation; });
            });
        })); }), studio_core_1.MenuItem.default({ label: "Print events to console" })
            .setTriggerProcedure(function () {
            console.debug(JSON.stringify(target.event.collection.unwrap().events.asArray()
                .map(function (event) { return lib_std_1.Objects.include(event, "position", "value", "interpolation", "index"); })));
        }), debug_1.DebugMenus.debugBox(target.event.box));
    });
};
exports.installValueContextMenu = installValueContextMenu;
