"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerTrackBody = void 0;
var MarkerTrackBody_sass_inline_1 = require("./MarkerTrackBody.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var MarkerRenderer_1 = require("@/ui/timeline/tracks/primary/marker/MarkerRenderer");
var MarkerContextMenu_1 = require("@/ui/timeline/tracks/primary/marker/MarkerContextMenu");
var Markers_1 = require("@/ui/timeline/tracks/primary/marker/Markers");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(MarkerTrackBody_sass_inline_1.default, "marker-track-body");
var MarkerTrackBody = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var project = service.project, timeline = service.timeline;
    var editing = project.editing, engine = project.engine, boxGraph = project.boxGraph;
    var range = timeline.range, snapping = timeline.snapping;
    var markerState = engine.markerState;
    var canvas = <canvas style={{ fontSize: "1.25em" }}/>;
    var position = engine.position;
    var timelineAdapter = project.boxAdapters.adapterFor(project.timelineBox, studio_adapters_1.TimelineBoxAdapter);
    var markerTrackAdapter = timelineAdapter.markerTrack;
    var events = markerTrackAdapter.events;
    var _b = lifecycle.own(MarkerRenderer_1.MarkerRenderer.createTrackRenderer(canvas, range, markerTrackAdapter, markerState)), context = _b.context, requestUpdate = _b.requestUpdate;
    var capturing = new studio_core_1.ElementCapturing(canvas, {
        capture: function (localX, _localY) {
            var pointer = range.xToUnit(localX);
            var marker = events.lowerEqual(pointer);
            if (marker === null) {
                return null;
            }
            var state = markerState.getValue();
            var markerWidth;
            if (state === null || !lib_std_1.UUID.equals(marker.uuid, state[0])) {
                markerWidth = MarkerRenderer_1.MarkerRenderer.computeWidth(context, marker, false, 1);
            }
            else {
                markerWidth = MarkerRenderer_1.MarkerRenderer.computeWidth(context, marker, true, state[1]);
            }
            return localX - range.unitToX(marker.position) < markerWidth ? marker : null;
        }
    });
    var lastTimeDown = 0;
    lifecycle.ownAll(position.subscribe(requestUpdate), range.subscribe(requestUpdate), markerTrackAdapter.subscribe(requestUpdate), markerState.catchupAndSubscribe(requestUpdate), MarkerContextMenu_1.MarkerContextMenu.install(canvas, range, capturing, editing), lib_dom_1.Dragging.attach(canvas, function (startEvent) {
        var now = Date.now();
        var dblclck = now - lastTimeDown < lib_dom_1.Events.DOUBLE_DOWN_THRESHOLD;
        lastTimeDown = now;
        var adapter = capturing.captureEvent(startEvent);
        if (adapter === null) {
            if (dblclck) {
                var rect = canvas.getBoundingClientRect();
                var position_1 = snapping.xToUnitFloor(startEvent.clientX - rect.left);
                var lowerEqual = markerTrackAdapter.events.lowerEqual(position_1);
                if ((lowerEqual === null || lowerEqual === void 0 ? void 0 : lowerEqual.position) === position_1) {
                    return lib_std_1.Option.None;
                }
                var label_1 = (0, lib_std_1.isDefined)(lowerEqual) ? Markers_1.Markers.nextName(lowerEqual.label) : Markers_1.Markers.DefaultNames[0];
                editing.modify(function () { return studio_boxes_1.MarkerBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.position.setValue(position_1);
                    box.label.setValue(label_1);
                    box.hue.setValue(190);
                    box.track.refer(markerTrackAdapter.object.markers);
                }); });
            }
            return lib_std_1.Option.None;
        }
        var oldPosition = adapter.position;
        return lib_std_1.Option.wrap({
            update: function (event) {
                var rect = canvas.getBoundingClientRect();
                var position = snapping.xToUnitFloor(event.clientX - rect.left);
                editing.modify(function () {
                    var atPosition = events.lowerEqual(position);
                    if (atPosition !== null && atPosition.position === position && atPosition !== adapter) {
                        atPosition.box.delete();
                    }
                    adapter.box.position.setValue(position);
                }, false);
            },
            cancel: function () { return editing.modify(function () { return adapter.box.position.setValue(oldPosition); }); },
            approve: function () { return editing.mark(); }
        });
    }));
    return (<div className={className}>{canvas}</div>);
};
exports.MarkerTrackBody = MarkerTrackBody;
