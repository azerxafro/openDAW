"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteEditor = void 0;
var NoteEditor_sass_inline_1 = require("./NoteEditor.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var PitchEditor_tsx_1 = require("@/ui/timeline/editors/notes/pitch/PitchEditor.tsx");
var PitchPositioner_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchPositioner.ts");
var studio_core_1 = require("@opendaw/studio-core");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var PianoRoll_tsx_1 = require("@/ui/timeline/editors/notes/pitch/PianoRoll.tsx");
var ScaleConfig_ts_1 = require("@/ui/timeline/editors/notes/pitch/ScaleConfig.ts");
var PitchEditorHeader_tsx_1 = require("@/ui/timeline/editors/notes/pitch/PitchEditorHeader.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ObservableModifyContext_ts_1 = require("@/ui/timeline/ObservableModifyContext.ts");
var PropertyEditor_tsx_1 = require("./property/PropertyEditor.tsx");
var EditorBody_ts_1 = require("@/ui/timeline/editors/EditorBody.ts");
var NoteViewMenu_ts_1 = require("@/ui/timeline/editors/notes/NoteViewMenu.ts");
var PropertyHeader_tsx_1 = require("@/ui/timeline/editors/notes/property/PropertyHeader.tsx");
var PropertyAccessor_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyAccessor.ts");
var PitchMenu_ts_1 = require("@/ui/timeline/editors/notes/pitch/PitchMenu.ts");
var NoteEditorShortcuts_1 = require("@/ui/shortcuts/NoteEditorShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(NoteEditor_sass_inline_1.default, "NoteEditor");
var scale = new ScaleConfig_ts_1.ScaleConfig();
var pitchPositioner = new PitchPositioner_ts_1.PitchPositioner();
var NoteEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, _b = _a.menu, editMenu = _b.editMenu, viewMenu = _b.viewMenu, range = _a.range, snapping = _a.snapping, reader = _a.reader;
    var project = service.project;
    var captureDevices = project.captureDevices, editing = project.editing, engine = project.engine, boxGraph = project.boxGraph, boxAdapters = project.boxAdapters;
    var resolveCapture = function () { return reader.trackBoxAdapter
        .flatMap(function (adapter) { return captureDevices.get(adapter.audioUnit.address.uuid); })
        .map(function (capture) { return (0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureMidi) ? capture : null; }).unwrap("No CaptureMidi available"); };
    var captureRef = { current: resolveCapture() };
    var noteReceiver = lifecycle.own(new studio_adapters_1.NoteStreamReceiver(project.liveStreamReceiver));
    var trackBindings = lifecycle.own(new lib_std_1.Terminator());
    var bindToTrack = function () {
        var oldCapture = captureRef.current;
        for (var pitch = 0; pitch < 128; pitch++) {
            if (noteReceiver.isNoteOn(pitch)) {
                oldCapture.notify(studio_adapters_1.NoteSignal.off(oldCapture.uuid, pitch));
            }
        }
        trackBindings.terminate();
        captureRef.current = resolveCapture();
        var audioUnitAddress = reader.trackBoxAdapter.unwrap().audioUnit.address;
        noteReceiver.bind(project.liveStreamReceiver, audioUnitAddress);
        trackBindings.own(captureRef.current.subscribeNotes(function (signal) {
            if (engine.isPlaying.getValue() || !stepRecording.getValue()) {
                return;
            }
            if (studio_adapters_1.NoteSignal.isOn(signal)) {
                var pitch_1 = signal.pitch, velocity_1 = signal.velocity;
                var position_1 = snapping.floor(engine.position.getValue());
                var duration_1 = snapping.value(position_1);
                var createdNote_1 = false;
                editing.modify(function () {
                    studio_boxes_1.NoteEventBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                        box.events.refer(eventsField);
                        box.position.setValue(position_1 - reader.offset);
                        box.duration.setValue(duration_1);
                        box.pitch.setValue(pitch_1);
                        box.velocity.setValue(velocity_1);
                    });
                    createdNote_1 = true;
                });
                if (createdNote_1) {
                    engine.setPosition(position_1 + duration_1);
                }
            }
        }));
    };
    bindToTrack();
    lifecycle.own(reader.subscribeTrackChange(function () {
        if (reader.trackBoxAdapter.nonEmpty()) {
            bindToTrack();
        }
    }));
    var stepRecording = lifecycle.own(new lib_std_1.DefaultObservableValue(false));
    var modifyContext = new ObservableModifyContext_ts_1.ObservableModifyContext();
    var propertyOwner = new lib_std_1.DefaultObservableValue(PropertyAccessor_ts_1.NotePropertyVelocity);
    var eventsField = reader.content.box.events;
    var selection = lifecycle.own(project.selection
        .createFilteredSelection(function (box) { return box instanceof studio_boxes_1.NoteEventBox
        && box.events.targetVertex.contains(eventsField); }, {
        fx: function (adapter) { return adapter.box; },
        fy: function (vertex) { return project.boxAdapters.adapterFor(vertex.box, studio_adapters_1.NoteEventBoxAdapter); }
    }));
    var pitchHeader = (<div className="pitch-header">
                <PitchEditorHeader_tsx_1.PitchEditorHeader lifecycle={lifecycle} selection={selection} editing={editing} modifyContext={modifyContext} scale={scale}/>
                <PianoRoll_tsx_1.PianoRoll lifecycle={lifecycle} positioner={pitchPositioner} scale={scale} noteReceiver={noteReceiver} captureRef={captureRef}/>
            </div>);
    var pitchBody = (<div className="pitch-body">
                <PitchEditor_tsx_1.PitchEditor lifecycle={lifecycle} project={project} boxAdapters={boxAdapters} range={range} snapping={snapping} positioner={pitchPositioner} scale={scale} selection={selection} modifyContext={modifyContext} reader={reader} stepRecording={stepRecording}/>
            </div>);
    lifecycle.ownAll(selection.catchupAndSubscribe({
        onSelected: function (adapter) { return adapter.onSelected(); },
        onDeselected: function (adapter) { return adapter.onDeselected(); }
    }), viewMenu.attach((0, NoteViewMenu_ts_1.installNoteViewMenu)(range, reader, pitchPositioner, reader.content.events)), editMenu.attach((0, PitchMenu_ts_1.createPitchMenu)({
        editing: editing,
        snapping: snapping,
        selection: selection,
        events: reader.content.events,
        stepRecording: stepRecording
    })), (0, EditorBody_ts_1.installEditorBody)({ element: pitchBody, range: range, reader: reader }), lib_dom_1.Html.watchResize(pitchBody, (function () {
        var init = true;
        var centerNote = 60;
        return function () {
            if (init) {
                init = false;
                var content = reader.content;
                if (content.events.isEmpty()) {
                    centerNote = 60;
                }
                else {
                    centerNote = Math.round((content.minPitch + content.maxPitch) / 2);
                }
            }
            else {
                centerNote = pitchPositioner.centerNote;
            }
            pitchPositioner.height = pitchHeader.clientHeight;
            pitchPositioner.centerNote = centerNote;
        };
    })()));
    var element = (<div className={className} tabIndex={-1} onConnect={function (self) { return self.focus(); }}>
                {pitchHeader}
                {pitchBody}
                <PropertyHeader_tsx_1.PropertyHeader lifecycle={lifecycle} propertyOwner={propertyOwner}/>
                <PropertyEditor_tsx_1.PropertyEditor lifecycle={lifecycle} range={range} editing={editing} selection={selection} snapping={snapping} propertyOwner={propertyOwner} modifyContext={modifyContext} reader={reader}/>
            </div>);
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(element, "NoteEditor (Main)");
    var clipboardHandler = studio_core_1.NotesClipboard.createHandler({
        getEnabled: function () { return !engine.isPlaying.getValue(); },
        getPosition: function () { return engine.position.getValue() - reader.offset; },
        setPosition: function (position) { return engine.setPosition(position + reader.offset); },
        editing: editing,
        selection: selection,
        targetAddress: reader.content.box.events.address,
        boxGraph: boxGraph,
        boxAdapters: boxAdapters
    });
    lifecycle.ownAll(shortcuts, shortcuts.register(NoteEditorShortcuts_1.NoteEditorShortcuts["toggle-step-recording"].shortcut, function () { return stepRecording.setValue(!stepRecording.getValue()); }), stepRecording.catchupAndSubscribe(function (owner) { return document.querySelectorAll("[data-component='cursor']")
        .forEach(function (cursor) { return cursor.classList.toggle("step-recording", owner.getValue()); }); }), lib_std_1.Terminable.create(function () { return document.querySelectorAll("[data-component='cursor']")
        .forEach(function (cursor) { return cursor.classList.remove("step-recording"); }); }), studio_core_1.ClipboardManager.install(element, clipboardHandler));
    return element;
};
exports.NoteEditor = NoteEditor;
