"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValueMenu = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var createValueMenu = function (_a) {
    var editing = _a.editing, selection = _a.selection, events = _a.events;
    var modify = function (procedure) {
        var adapters = selection.isEmpty() ? events.asArray() : selection.selected();
        if (adapters.length === 0) {
            return;
        }
        editing.modify(function () { return procedure(adapters); });
    };
    return function (collector) { return collector.addItems(studio_core_1.MenuItem.default({ label: "Delete", selectable: !selection.isEmpty() })
        .setTriggerProcedure(function () { return editing.modify(function () { return selection.selected()
        .forEach(function (adapter) { return adapter.box.delete(); }); }); }), studio_core_1.MenuItem.default({ label: "Inverse", separatorBefore: true })
        .setTriggerProcedure(function () { return modify(function (adapters) { return adapters
        .forEach(function (_a) {
        var box = _a.box, value = _a.value;
        return box.value.setValue(1.0 - value);
    }); }); }), studio_core_1.MenuItem.default({ label: "Reverse" })
        .setTriggerProcedure(function () { return modify(function (adapters) {
        var min = Number.MAX_SAFE_INTEGER;
        var max = 0;
        var counts = new Map();
        adapters.forEach(function (_a) {
            var _b;
            var position = _a.position;
            min = Math.min(min, position);
            max = Math.max(max, position);
            counts.set(position, ((_b = counts.get(position)) !== null && _b !== void 0 ? _b : 0) + 1);
        });
        adapters.forEach(function (_a) {
            var box = _a.box, position = _a.position, index = _a.index;
            box.position.setValue(min + (max - position));
            if ((0, lib_std_1.asDefined)(counts.get(position)) > 1) {
                box.index.setValue(index === 0 ? 1 : 0);
            }
        });
    }); })); };
};
exports.createValueMenu = createValueMenu;
