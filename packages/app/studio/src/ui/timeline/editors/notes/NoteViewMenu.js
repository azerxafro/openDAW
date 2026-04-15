"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installNoteViewMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var NoteSizes = {
    "Small": 8,
    "Default": 11,
    "Big": 14,
    "Large": 17
};
var installNoteViewMenu = function (range, owner, pitchPositioner, events) {
    return function (collector) { return collector.addItems(studio_core_1.MenuItem.default({ label: "Set Note Height" })
        .setRuntimeChildrenProcedure(function (parent) {
        Object.entries(NoteSizes).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            return parent
                .addMenuItem(studio_core_1.MenuItem.default({ label: key, checked: value === pitchPositioner.noteHeight })
                .setTriggerProcedure(function () { return pitchPositioner.noteHeight = value; }));
        });
    }), studio_core_1.MenuItem.default({ label: "Center Notes", selectable: !events.isEmpty() })
        .setTriggerProcedure(function () {
        if (events.isEmpty()) {
            return;
        }
        var content = owner.content;
        pitchPositioner.centerNote = Math.round((content.minPitch + content.maxPitch) / 2);
    }), studio_core_1.MenuItem.default({ label: "Zoom To All Notes", selectable: !events.isEmpty() })
        .setTriggerProcedure(function () {
        if (events.isEmpty()) {
            return;
        }
        var _a = events.asArray().reduce(function (minmax, adapter) {
            minmax[0] = Math.min(minmax[0], adapter.position);
            minmax[1] = Math.max(minmax[1], adapter.complete);
            return minmax;
        }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]), min = _a[0], max = _a[1];
        range.zoomRange(min + owner.offset, max + owner.offset);
    })); };
};
exports.installNoteViewMenu = installNoteViewMenu;
