"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitchEditor = void 0;
var PitchEditor_sass_inline_1 = require("./PitchEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var Scroller_tsx_1 = require("@/ui/components/Scroller.tsx");
var PitchPainter_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchPainter.ts");
var cursor_ts_1 = require("@/ui/hooks/cursor.ts");
var SelectionRectangle_tsx_1 = require("@/ui/timeline/SelectionRectangle.tsx");
var AutoScroll_ts_1 = require("@/ui/AutoScroll.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var NoteContentDurationModifier_ts_1 = require("@/ui/timeline/editors/notes/NoteContentDurationModifier.ts");
var PitchEventCapturing_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchEventCapturing.ts");
var PitchSelectionLocator_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchSelectionLocator.ts");
var Config_ts_1 = require("@/ui/timeline/Config.ts");
var NoteMoveModifier_ts_1 = require("@/ui/timeline/editors/notes/NoteMoveModifier.ts");
var NoteDurationModifier_ts_1 = require("@/ui/timeline/editors/notes/NoteDurationModifier.ts");
var PitchContextMenu_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchContextMenu.ts");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var NoteCreateModifier_ts_1 = require("@/ui/timeline/editors/notes/NoteCreateModifier.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var Surface_1 = require("@/ui/surface/Surface");
var NoteEditorShortcuts_1 = require("@/ui/shortcuts/NoteEditorShortcuts");
var ContentEditorShortcuts_1 = require("@/ui/shortcuts/ContentEditorShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(PitchEditor_sass_inline_1.default, "PitchEditor");
var CursorMap = {
    "note-end": "e-resize",
    "note-position": "default",
    "loop-duration": "ew-resize"
};
var PitchEditor = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, boxAdapters = _a.boxAdapters, range = _a.range, snapping = _a.snapping, positioner = _a.positioner, scale = _a.scale, selection = _a.selection, modifyContext = _a.modifyContext, reader = _a.reader, stepRecording = _a.stepRecording;
    var previewNote = null;
    var editing = project.editing;
    var canvas = <canvas tabIndex={-1}/>;
    var capturing = (0, PitchEventCapturing_ts_1.createPitchEventCapturing)(canvas, positioner, range, reader);
    var locator = (0, PitchSelectionLocator_ts_1.createPitchSelectionLocator)(reader, range, positioner.valueAxis, capturing);
    var pitchPainter = (0, PitchPainter_ts_1.createNotePitchPainter)({ canvas: canvas, modifyContext: modifyContext, positioner: positioner, scale: scale, range: range, snapping: snapping, reader: reader });
    var renderer = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
        if ((0, lib_std_1.isNotNull)(previewNote)) {
            var position = previewNote.position;
            var complete = position + previewNote.duration;
            var context = painter.context;
            var x0 = Math.floor(range.unitToX(position + reader.offset) + 1) * devicePixelRatio;
            var x1 = Math.floor(range.unitToX(complete + reader.offset) * devicePixelRatio);
            var y0 = positioner.pitchToY(previewNote.pitch) * devicePixelRatio;
            var y1 = y0 + (positioner.noteHeight - 1) * devicePixelRatio;
            context.fillStyle = "rgba(255, 255, 255, 0.08)";
            context.fillRect(x0, y0, x1 - x0, y1 - y0);
        }
        pitchPainter(painter);
    }));
    var auditionNote = function (pitch, duration) {
        if (!studio_core_1.StudioPreferences.settings.engine["note-audition-while-editing"]) {
            return;
        }
        project.engine.noteSignal({
            type: "note-audition",
            uuid: reader.trackBoxAdapter.unwrap().audioUnit.address.uuid,
            pitch: pitch,
            duration: duration,
            velocity: 1.0
        });
    };
    // before selection
    lifecycle.ownAll((0, AutoScroll_ts_1.installAutoScroll)(canvas, function (_deltaX, deltaY) {
        if (deltaY !== 0) {
            positioner.moveBy(deltaY * 0.05);
        }
    }, { padding: Config_ts_1.Config.AutoScrollPadding }), lib_dom_1.Dragging.attach(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if ((target === null || target === void 0 ? void 0 : target.type) !== "loop-duration") {
            return lib_std_1.Option.None;
        }
        var clientRect = canvas.getBoundingClientRect();
        return modifyContext.startModifier(NoteContentDurationModifier_ts_1.NoteContentDurationModifier.create({
            editing: editing,
            element: canvas,
            pointerPulse: range.xToUnit(event.clientX - clientRect.left),
            snapping: snapping,
            reference: target.reader
        }));
    }, { permanentUpdates: true }), lib_dom_1.Dragging.attach(canvas, function (event) {
        if (!event.altKey) {
            return lib_std_1.Option.None;
        }
        var target = capturing.captureEvent(event);
        if (target !== null) {
            return lib_std_1.Option.None;
        }
        var clientRect = canvas.getBoundingClientRect();
        var pitch = positioner.yToPitch(event.clientY - clientRect.top);
        auditionNote(pitch, lib_dsp_1.PPQN.SemiQuaver);
        return modifyContext.startModifier(NoteCreateModifier_ts_1.NoteCreateModifier.create({
            editing: editing,
            element: canvas,
            pointerPulse: range.xToUnit(event.clientX - clientRect.left) - reader.offset,
            pointerPitch: pitch,
            selection: selection,
            snapping: snapping,
            reference: reader
        }));
    }, { permanentUpdates: true }));
    var selectionRectangle = (<SelectionRectangle_tsx_1.SelectionRectangle lifecycle={lifecycle} target={canvas} selection={selection} locator={locator} xAxis={range.valueAxis} yAxis={positioner.valueAxis}/>);
    var modifySelection = function (procedure) {
        var adapters = selection.selected();
        if (adapters.length === 0) {
            return false;
        }
        var first = adapters[0];
        editing.modify(function () { return adapters.forEach(procedure); });
        auditionNote(first.pitch, first.duration);
        return true;
    };
    var updatePreview = function () {
        var point = Surface_1.Surface.get(canvas).pointer;
        var captureEvent = capturing.captureEvent({ clientX: point.x, clientY: point.y });
        if ((0, lib_std_1.isNull)(captureEvent)) {
            var rect = canvas.getBoundingClientRect();
            var pitch = positioner.yToPitch(point.y - rect.top);
            var position = snapping.xToUnitFloor(point.x - rect.left) - reader.offset;
            // TODO #58
            var duration = snapping.value(position + reader.offset);
            var velocity = 1.0;
            if ((0, lib_std_1.isNotNull)(previewNote)) {
                if (previewNote.pitch === pitch
                    && previewNote.position === position
                    && previewNote.duration === duration
                    && previewNote.velocity === velocity) {
                    return;
                }
            }
            // check if equal > return
            previewNote = { pitch: pitch, position: position, duration: duration, velocity: velocity };
        }
        else {
            previewNote = null;
        }
        renderer.requestUpdate();
    };
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(canvas, "PitchEditor");
    lifecycle.ownAll(shortcuts, shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["increment-note-semitone"].shortcut, function () {
        return modifySelection(function (_a) {
            var box = _a.box, pitch = _a.pitch;
            return box.pitch.setValue(Math.min(pitch + 1, 127));
        });
    }), shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["decrement-note-semitone"].shortcut, function () {
        return modifySelection(function (_a) {
            var box = _a.box, pitch = _a.pitch;
            return box.pitch.setValue(Math.max(pitch - 1, 0));
        });
    }), shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["increment-note-octave"].shortcut, function () {
        return modifySelection(function (_a) {
            var box = _a.box, pitch = _a.pitch;
            if (pitch + 12 <= 127) {
                box.pitch.setValue(pitch + 12);
            }
        });
    }, { allowRepeat: true }), shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["decrement-note-octave"].shortcut, function () {
        return modifySelection(function (_a) {
            var box = _a.box, pitch = _a.pitch;
            if (pitch - 12 >= 0) {
                box.pitch.setValue(pitch - 12);
            }
        });
    }, { allowRepeat: true }), shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["increment-note-position"].shortcut, function () {
        return modifySelection(function (_a) {
            var box = _a.box, position = _a.position;
            return box.position.setValue(position + snapping.value(reader.position + position));
        });
    }, { allowRepeat: true }), shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["decrement-note-position"].shortcut, function () {
        return modifySelection(function (_a) {
            var box = _a.box, position = _a.position;
            return box.position.setValue(position - snapping.value(reader.position + position));
        });
    }, { allowRepeat: true }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["select-all"].shortcut, function () { return selection.select.apply(selection, locator.selectable()); }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["deselect-all"].shortcut, function () { return selection.deselectAll(); }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["delete-selection"].shortcut, function () {
        var selected = selection.selected();
        if (selected.length === 0) {
            return false;
        }
        editing.modify(function () { return selected.forEach(function (adapter) { return adapter.box.delete(); }); });
        return true;
    }), lib_dom_1.Html.watchResize(canvas, function () { return range.width = canvas.clientWidth; }), lib_dom_1.Events.subscribe(canvas, "wheel", function (event) {
        event.preventDefault();
        positioner.scrollModel.moveBy(event.deltaY);
    }, { passive: false }), lib_dom_1.Events.subscribeDblDwn(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null) {
            var rect = canvas.getBoundingClientRect();
            var clientX = event.clientX - rect.left;
            var clientY = event.clientY - rect.top;
            var pulse_1 = snapping.floor(range.xToUnit(clientX)) - reader.offset;
            var pitch_1 = positioner.yToPitch(clientY);
            var absolutePulse = reader.position + pulse_1;
            var duration_1 = snapping.value(absolutePulse);
            var boxOpt = editing.modify(function () { return studio_boxes_1.NoteEventBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.position.setValue(pulse_1);
                box.pitch.setValue(pitch_1);
                box.duration.setValue(duration_1);
                box.events.refer(reader.content.box.events);
            }); });
            if (boxOpt.nonEmpty()) {
                selection.deselectAll();
                selection.select(boxAdapters.adapterFor(boxOpt.unwrap(), studio_adapters_1.NoteEventBoxAdapter));
                auditionNote(pitch_1, duration_1);
            }
        }
        else if (target.type !== "loop-duration") {
            editing.modify(function () { return target.event.box.delete(); });
        }
    }), lib_dom_1.Dragging.attach(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null || selection.isEmpty()) {
            return lib_std_1.Option.None;
        }
        var clientRect = canvas.getBoundingClientRect();
        if (target.type === "note-position") {
            var noteEventBoxAdapter = target.event;
            var pitch = noteEventBoxAdapter.pitch, duration_2 = noteEventBoxAdapter.duration;
            auditionNote(pitch, duration_2);
            var modifier = NoteMoveModifier_ts_1.NoteMoveModifier.create({
                editing: editing,
                element: canvas,
                selection: selection,
                positioner: positioner,
                pointerPulse: range.xToUnit(event.clientX - clientRect.left),
                pointerPitch: positioner.yToPitch(event.clientY - clientRect.top),
                snapping: snapping,
                reference: noteEventBoxAdapter
            });
            modifier.subscribePitchChanged(function (pitch) { return auditionNote(pitch, duration_2); });
            return modifyContext.startModifier(modifier);
        }
        else if (target.type === "note-end") {
            var noteEventBoxAdapter = target.event;
            var pitch = noteEventBoxAdapter.pitch, duration = noteEventBoxAdapter.duration;
            auditionNote(pitch, duration);
            return modifyContext.startModifier(NoteDurationModifier_ts_1.NoteDurationModifier.create({
                editing: editing,
                element: canvas,
                selection: selection,
                pointerPulse: range.xToUnit(event.clientX - clientRect.left),
                snapping: snapping,
                reference: target.event
            }));
        }
        else {
            return (0, lib_std_1.panic)("Unknown capture");
        }
    }, { permanentUpdates: true }), (0, PitchContextMenu_ts_1.installContextMenu)({
        element: canvas,
        snapping: snapping,
        selection: selection,
        capturing: capturing,
        editing: editing,
        events: reader.content.events,
        stepRecording: stepRecording
    }), positioner.subscribe(renderer.requestUpdate), range.subscribe(renderer.requestUpdate), snapping.subscribe(renderer.requestUpdate), scale.subscribe(renderer.requestUpdate), reader.subscribeChange(renderer.requestUpdate), modifyContext.subscribeUpdate(renderer.requestUpdate), lib_dom_1.Events.subscribe(canvas, "pointermove", function (event) {
        canvas.focus({ preventScroll: true });
        if (event.altKey && event.buttons === 0) {
            updatePreview();
        }
    }), lib_dom_1.Events.subscribe(canvas, "pointerleave", function () {
        previewNote = null;
        renderer.requestUpdate();
    }), (0, cursor_ts_1.installCursor)(canvas, capturing, {
        get: function (target, event) {
            return target === null ? event.altKey && event.buttons === 0
                ? 0 /* Cursor.Pencil */
                : null : CursorMap[target.type];
        }
    }), lib_dom_1.Events.subscribe(canvas, "keyup", function () {
        previewNote = null;
        renderer.requestUpdate();
    }), lib_dom_1.Events.subscribe(canvas, "keydown", function (event) {
        if (event.altKey) {
            updatePreview();
            return;
        }
    }));
    return (<div className={className} tabIndex={-1}>
            {canvas}
            <Scroller_tsx_1.Scroller lifecycle={lifecycle} model={positioner.scrollModel} floating/>
            {selectionRectangle}
        </div>);
};
exports.PitchEditor = PitchEditor;
