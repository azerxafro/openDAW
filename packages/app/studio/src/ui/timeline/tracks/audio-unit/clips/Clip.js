"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clip = exports.ClipState = void 0;
var Clip_sass_inline_1 = require("./Clip.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var NoteClipPainter_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/painter/NoteClipPainter.ts");
var AudioClipPainter_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/painter/AudioClipPainter.ts");
var ValueClipPainter_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/painter/ValueClipPainter.ts");
var ClipPlaybackButton_1 = require("./ClipPlaybackButton");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(Clip_sass_inline_1.default, "Clip");
var ClipState;
(function (ClipState) {
    ClipState[ClipState["Idle"] = 0] = "Idle";
    ClipState[ClipState["Waiting"] = 1] = "Waiting";
    ClipState[ClipState["Playing"] = 2] = "Playing";
})(ClipState || (exports.ClipState = ClipState = {}));
var Clip = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter, gridColumn = _a.gridColumn;
    var engine = project.engine, userEditingManager = project.userEditingManager;
    var canvas = (<canvas />);
    var progress = (<div className="progress"/>);
    var state = new lib_std_1.DefaultObservableValue(ClipState.Idle);
    var updateProgress = function (position) { return element.style.setProperty("--progress", String(position / adapter.duration * 360)); };
    var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, (0, lib_std_1.asDefined)(adapter.accept({
        visitAudioClipBoxAdapter: function (adapter) { return (0, AudioClipPainter_ts_1.createAudioClipPainter)(adapter); },
        visitNoteClipBoxAdapter: function (adapter) { return (0, NoteClipPainter_ts_1.createNoteClipPainter)(adapter); },
        visitValueClipBoxAdapter: function (adapter) { return (0, ValueClipPainter_ts_1.createValueClipPainter)(adapter); }
    }), "Could not find paintProcedure for ".concat(adapter))));
    var label = <span className="label"/>;
    var element = (<div className={className} style={{ gridColumn: gridColumn }}>
            {label}
            <div className="content">
                {progress}
                {canvas}
                <ClipPlaybackButton_1.ClipPlaybackButton lifecycle={lifecycle} engine={engine} adapter={adapter} state={state}/>
            </div>
        </div>);
    element.style.setProperty("--hue", String(adapter.hue));
    element.classList.toggle("selected", adapter.isSelected);
    element.classList.toggle("mirrored", adapter.isMirrowed);
    element.classList.toggle("muted", adapter.box.mute.getValue());
    label.textContent = adapter.label.length === 0 ? "◻" : adapter.label;
    var timelineEditing = userEditingManager.timeline;
    lifecycle.ownAll(state.catchupAndSubscribe(function (owner) {
        element.classList.remove("waiting", "playing");
        switch (owner.getValue()) {
            case ClipState.Idle:
                break;
            case ClipState.Waiting:
                element.classList.add("waiting");
                break;
            case ClipState.Playing:
                element.classList.add("playing");
                break;
        }
    }), lib_dom_1.Html.watchResize(canvas, painter.requestUpdate), lib_dom_1.Events.subscribeDblDwn(element, function () { return timelineEditing.edit(adapter.box); }), timelineEditing.catchupAndSubscribe(function () { return element.classList.toggle("edit-mode", timelineEditing.isEditing(adapter.box)); }), adapter.subscribeChange(function () {
        label.textContent = adapter.label.length === 0 ? "◻" : adapter.label;
        element.style.setProperty("--hue", String(adapter.hue));
        element.classList.toggle("mirrored", adapter.isMirrowed);
        element.classList.toggle("muted", adapter.box.mute.getValue() || adapter.trackBoxAdapter.mapOr(function (track) { return !track.enabled.getValue(); }, false));
        painter.requestUpdate();
    }), adapter.catchupAndSubscribeSelected(function (owner) { return element.classList.toggle("selected", owner.getValue()); }), adapter.trackBoxAdapter.unwrap().enabled.catchupAndSubscribe(function (owner) {
        return element.classList.toggle("muted", adapter.box.mute.getValue() || !owner.getValue());
    }));
    var running = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(engine.subscribeClipNotification(function (notification) {
        if (notification.type === "sequencing") {
            var _a = notification.changes, started = _a.started, stopped = _a.stopped, obsolete = _a.obsolete;
            if (started.some(function (uuid) { return lib_std_1.UUID.equals(uuid, adapter.uuid); })) {
                running.own(engine.position.subscribe(function (owner) { return updateProgress(owner.getValue()); }));
                state.setValue(ClipState.Playing);
            }
            else if (stopped.some(function (uuid) { return lib_std_1.UUID.equals(uuid, adapter.uuid); }) || obsolete.some(function (uuid) { return lib_std_1.UUID.equals(uuid, adapter.uuid); })) {
                state.setValue(ClipState.Idle);
                running.terminate();
                updateProgress(0.0);
            }
        }
        else if (notification.type === "waiting") {
            if (notification.clips.some(function (uuid) { return lib_std_1.UUID.equals(uuid, adapter.uuid); })) {
                state.setValue(ClipState.Waiting);
            }
        }
    }));
    return element;
};
exports.Clip = Clip;
