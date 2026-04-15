"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPitchMenu = void 0;
var NoteEditorShortcuts_1 = require("@/ui/shortcuts/NoteEditorShortcuts");
var studio_core_1 = require("@opendaw/studio-core");
var createPitchMenu = function (_a) {
    var editing = _a.editing, snapping = _a.snapping, selection = _a.selection, events = _a.events, stepRecording = _a.stepRecording;
    var modify = function (procedure) {
        var adapters = selection.isEmpty() ? events.asArray() : selection.selected();
        if (adapters.length === 0) {
            return;
        }
        editing.modify(function () { return procedure(adapters); });
    };
    return function (collector) { return collector.addItems(studio_core_1.MenuItem.default({ label: "Delete", selectable: !selection.isEmpty() })
        .setTriggerProcedure(function () { return editing.modify(function () { return selection.selected()
        .forEach(function (adapter) { return adapter.box.delete(); }); }); }), studio_core_1.MenuItem.default({
        label: "Step Recording",
        checked: stepRecording.getValue(),
        shortcut: NoteEditorShortcuts_1.NoteEditorShortcuts["toggle-step-recording"].shortcut.format()
    })
        .setTriggerProcedure(function () { return stepRecording.setValue(!stepRecording.getValue()); }), studio_core_1.MenuItem.default({
        label: "Consolidate",
        selectable: selection.selected().some(function (adapter) { return adapter.canConsolidate(); })
    }).setTriggerProcedure(function () { return editing.modify(function () {
        var adapters = selection.selected().filter(function (adapter) { return adapter.canConsolidate(); });
        selection.deselectAll();
        adapters.forEach(function (adapter) { return selection.select.apply(selection, adapter.consolidate()); });
    }); }), studio_core_1.MenuItem.default({ label: "Quantize Notes", separatorBefore: true })
        .setTriggerProcedure(function () { return modify(function (adapters) { return adapters.forEach(function (_a) {
        var box = _a.box, position = _a.position;
        return box.position.setValue(snapping.round(position));
    }); }); }), studio_core_1.MenuItem.default({ label: "Resize x2" })
        .setTriggerProcedure(function () { return modify(function (adapters) {
        var origin = adapters.reduce(function (min, _a) {
            var position = _a.position;
            return Math.min(min, position);
        }, Number.MAX_SAFE_INTEGER);
        adapters.forEach(function (_a) {
            var box = _a.box, position = _a.position, duration = _a.duration;
            box.position.setValue(((position - origin) << 1) + origin);
            box.duration.setValue(duration << 1);
        });
    }); }), studio_core_1.MenuItem.default({ label: "Resize ÷2" })
        .setTriggerProcedure(function () { return modify(function (adapters) {
        var origin = adapters.reduce(function (min, _a) {
            var position = _a.position;
            return Math.min(min, position);
        }, Number.MAX_SAFE_INTEGER);
        adapters.forEach(function (_a) {
            var box = _a.box, position = _a.position, duration = _a.duration;
            box.position.setValue(((position - origin) >> 1) + origin);
            box.duration.setValue(duration >> 1);
        });
    }); }), studio_core_1.MenuItem.default({ label: "Inverse" })
        .setTriggerProcedure(function () { return modify(function (adapters) {
        var origin = adapters.reduce(function (minmax, _a) {
            var pitch = _a.pitch;
            minmax[0] = Math.max(minmax[0], pitch);
            minmax[1] = Math.min(minmax[1], pitch);
            return minmax;
        }, [0, 127]);
        adapters.forEach(function (_a) {
            var box = _a.box, pitch = _a.pitch;
            return box.pitch.setValue(origin[1] - (pitch - origin[0]));
        });
    }); }), studio_core_1.MenuItem.default({ label: "Reverse" })
        .setTriggerProcedure(function () { return modify(function (adapters) {
        var origin = adapters.reduce(function (minmax, _a) {
            var position = _a.position;
            minmax[0] = Math.max(minmax[0], position);
            minmax[1] = Math.min(minmax[1], position);
            return minmax;
        }, [0, Number.MAX_SAFE_INTEGER]);
        adapters.forEach(function (_a) {
            var box = _a.box, position = _a.position;
            return box.position.setValue(origin[1] - (position - origin[0]));
        });
    }); }), studio_core_1.MenuItem.default({ label: "Transpose" })
        .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "+1 semitone" })
        .setTriggerProcedure(function () { return modify(function (adapters) { return adapters
        .forEach(function (_a) {
        var box = _a.box, pitch = _a.pitch;
        return box.pitch.setValue(Math.min(127, pitch + 1));
    }); }); }), studio_core_1.MenuItem.default({ label: "-1 semitone" })
        .setTriggerProcedure(function () { return modify(function (adapters) { return adapters
        .forEach(function (_a) {
        var box = _a.box, pitch = _a.pitch;
        return box.pitch.setValue(Math.max(0, pitch - 1));
    }); }); }), studio_core_1.MenuItem.default({ label: "+1 octave" })
        .setTriggerProcedure(function () { return modify(function (adapters) { return adapters
        .forEach(function (_a) {
        var box = _a.box, pitch = _a.pitch;
        var newPitch = pitch + 12;
        if (newPitch <= 127) {
            box.pitch.setValue(newPitch);
        }
    }); }); }), studio_core_1.MenuItem.default({ label: "-1 octave" })
        .setTriggerProcedure(function () { return modify(function (adapters) { return adapters
        .forEach(function (_a) {
        var box = _a.box, pitch = _a.pitch;
        var newPitch = pitch - 12;
        if (newPitch >= 0) {
            box.pitch.setValue(newPitch);
        }
    }); }); })); })); };
};
exports.createPitchMenu = createPitchMenu;
