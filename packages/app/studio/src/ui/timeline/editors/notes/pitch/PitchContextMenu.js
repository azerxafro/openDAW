"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installContextMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var PitchMenu_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchMenu.ts");
var installContextMenu = function (_a) {
    var element = _a.element, capturing = _a.capturing, snapping = _a.snapping, editing = _a.editing, selection = _a.selection, events = _a.events, stepRecording = _a.stepRecording;
    return studio_core_1.ContextMenu.subscribe(element, function (collector) {
        var target = capturing.captureEvent(collector.client);
        if (target === null) {
            return;
        }
        if ("event" in target && !selection.isSelected(target.event)) {
            selection.deselectAll();
            selection.select(target.event);
        }
        (0, PitchMenu_ts_1.createPitchMenu)({ editing: editing, snapping: snapping, selection: selection, events: events, stepRecording: stepRecording })(collector);
    });
};
exports.installContextMenu = installContextMenu;
