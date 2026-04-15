"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpMarkerEditing = void 0;
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_std_1 = require("@opendaw/lib-std");
var debug_1 = require("@/ui/menu/debug");
var WarpMarkerUtils_1 = require("@/ui/timeline/editors/audio/WarpMarkerUtils");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var WarpMarkerEditing;
(function (WarpMarkerEditing) {
    WarpMarkerEditing.MIN_DISTANCE = lib_dsp_1.PPQN.SemiQuaver;
    var MARKER_RADIUS = 4;
    WarpMarkerEditing.install = function (project, canvas, range, snapping, reader, audioPlayMode, hoverTransient) {
        var terminator = new lib_std_1.Terminator();
        var capturing = WarpMarkerUtils_1.WarpMarkerUtils.createCapturing(canvas, range, reader, MARKER_RADIUS);
        var warpMarkersField = reader.audioContent.observableOptPlayMode.map(function (playMode) { return playMode.box.warpMarkers; });
        var selection = terminator.own(project.selection
            .createFilteredSelection(function (box) { return box instanceof studio_boxes_1.WarpMarkerBox
            && box.owner.targetVertex.equals(warpMarkersField); }, {
            fx: function (adapter) { return adapter.box; },
            fy: function (vertex) { return project.boxAdapters.adapterFor(vertex.box, studio_adapters_1.WarpMarkerBoxAdapter); }
        }));
        var warpMarkers = audioPlayMode.warpMarkers, audioPlayModeBox = audioPlayMode.box;
        var waveformOffset = reader.audioContent.waveformOffset;
        terminator.ownAll(selection.catchupAndSubscribe({
            onSelected: function (adapter) { return adapter.onSelected(); },
            onDeselected: function (adapter) { return adapter.onDeselected(); }
        }), studio_core_1.ContextMenu.subscribe(canvas, function (collector) {
            var marker = capturing.captureEvent(collector.client);
            if ((0, lib_std_1.isNotNull)(marker)) {
                selection.deselectAll();
                selection.select(marker);
                collector.addItems(studio_core_1.MenuItem.default({
                    label: "Remove warp marker",
                    selectable: !marker.isAnchor
                }).setTriggerProcedure(function () {
                    project.editing.modify(function () { return selection.selected()
                        .filter(function (marker) { return !marker.isAnchor; })
                        .forEach(function (marker) { return marker.box.delete(); }); });
                }), debug_1.DebugMenus.debugBox(marker.box, true));
            }
        }), lib_dom_1.Events.subscribeDblDwn(canvas, function (event) {
            var marker = capturing.captureEvent(event);
            if ((0, lib_std_1.isNotNull)(marker)) {
                if (!marker.isAnchor) {
                    project.editing.modify(function () { return marker.box.delete(); });
                }
            }
            else {
                var transient = hoverTransient.getValue();
                if ((0, lib_std_1.isNull)(transient)) {
                    var rect = canvas.getBoundingClientRect();
                    var x = event.clientX - rect.left;
                    var unit = event.shiftKey ? range.xToUnit(x) : snapping.xToUnitRound(x);
                    var local_1 = unit - reader.offset;
                    var adjacentWarpMarkers = WarpMarkerUtils_1.WarpMarkerUtils.findAdjacent(local_1, warpMarkers, true);
                    if ((0, lib_std_1.isNull)(adjacentWarpMarkers)) {
                        return;
                    }
                    var left = adjacentWarpMarkers[0], right = adjacentWarpMarkers[1];
                    if ((0, lib_std_1.isNull)(left) || (0, lib_std_1.isNull)(right)) {
                        return;
                    }
                    if (local_1 - left.position < WarpMarkerEditing.MIN_DISTANCE || right.position - local_1 < WarpMarkerEditing.MIN_DISTANCE) {
                        return;
                    }
                    var clamped = (0, lib_std_1.clamp)(local_1, left.position + WarpMarkerEditing.MIN_DISTANCE, right.position - WarpMarkerEditing.MIN_DISTANCE);
                    var alpha = (clamped - left.position) / (right.position - left.position);
                    var seconds_1 = left.seconds + alpha * (right.seconds - left.seconds);
                    project.editing.modify(function () { return studio_boxes_1.WarpMarkerBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                        box.owner.refer(audioPlayMode.box.warpMarkers);
                        box.position.setValue(local_1);
                        box.seconds.setValue(seconds_1);
                    }); });
                }
                else {
                    var adjustedSeconds_1 = transient.position - waveformOffset.getValue();
                    var markers = warpMarkers.asArray();
                    if (markers.length < 2) {
                        return;
                    }
                    var first = markers[0];
                    var second = markers[1];
                    var secondLast = markers[markers.length - 2];
                    var last = markers[markers.length - 1];
                    var firstRate = (second.position - first.position) / (second.seconds - first.seconds);
                    var lastRate = (last.position - secondLast.position) / (last.seconds - secondLast.seconds);
                    var position_1;
                    if (adjustedSeconds_1 < first.seconds) {
                        position_1 = first.position + (adjustedSeconds_1 - first.seconds) * firstRate;
                    }
                    else if (adjustedSeconds_1 > last.seconds) {
                        position_1 = last.position + (adjustedSeconds_1 - last.seconds) * lastRate;
                    }
                    else {
                        var found = false;
                        for (var _i = 0, _a = lib_std_1.Iterables.pairWise(markers); _i < _a.length; _i++) {
                            var _b = _a[_i], left = _b[0], right = _b[1];
                            if ((0, lib_std_1.isNull)(right)) {
                                break;
                            }
                            if (left.seconds <= adjustedSeconds_1 && adjustedSeconds_1 <= right.seconds) {
                                var alpha = (adjustedSeconds_1 - left.seconds) / (right.seconds - left.seconds);
                                position_1 = left.position + alpha * (right.position - left.position);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            return;
                        }
                    }
                    var _c = WarpMarkerUtils_1.WarpMarkerUtils.findAdjacent(position_1, warpMarkers, true), adjLeft = _c[0], adjRight = _c[1];
                    if ((0, lib_std_1.isNull)(adjLeft) || (0, lib_std_1.isNull)(adjRight)) {
                        return;
                    }
                    if (position_1 - adjLeft.position < WarpMarkerEditing.MIN_DISTANCE || adjRight.position - position_1 < WarpMarkerEditing.MIN_DISTANCE) {
                        return;
                    }
                    project.editing.modify(function () { return studio_boxes_1.WarpMarkerBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                        box.owner.refer(audioPlayModeBox.warpMarkers);
                        box.position.setValue(position_1);
                        box.seconds.setValue(adjustedSeconds_1);
                    }); });
                }
            }
        }), lib_dom_1.Events.subscribe(canvas, "keydown", function (event) {
            if (lib_dom_1.Keyboard.isDelete(event)) {
                project.editing.modify(function () { return selection.selected()
                    .filter(function (marker) { return !marker.isAnchor; })
                    .forEach(function (marker) { return marker.box.delete(); }); });
            }
        }), lib_dom_1.Dragging.attach(canvas, function (startEvent) {
            var marker = capturing.captureEvent(startEvent);
            selection.deselectAll();
            if ((0, lib_std_1.isNull)(marker)) {
                return lib_std_1.Option.None;
            }
            selection.select(marker);
            var _a = WarpMarkerUtils_1.WarpMarkerUtils.findAdjacent(marker.position, warpMarkers, false), left = _a[0], right = _a[1];
            if ((0, lib_std_1.isNull)(left) && (0, lib_std_1.isNull)(right)) {
                console.warn("Broken warp-markers");
                return lib_std_1.Option.None;
            }
            return lib_std_1.Option.wrap({
                update: function (event) {
                    var _a, _b;
                    var rect = canvas.getBoundingClientRect();
                    var x = event.clientX - rect.left;
                    var unit = event.shiftKey ? range.xToUnit(x) : snapping.xToUnitRound(x);
                    var local = unit - reader.offset;
                    var min = (_a = left === null || left === void 0 ? void 0 : left.position) !== null && _a !== void 0 ? _a : Number.MIN_SAFE_INTEGER;
                    var max = (_b = right === null || right === void 0 ? void 0 : right.position) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER;
                    var clamped = (0, lib_std_1.clamp)(local, min + WarpMarkerEditing.MIN_DISTANCE, max - WarpMarkerEditing.MIN_DISTANCE);
                    project.editing.modify(function () { return marker.box.position.setValue(clamped); }, false);
                },
                approve: function () { return project.editing.mark(); }
            });
        }));
        return terminator;
    };
})(WarpMarkerEditing || (exports.WarpMarkerEditing = WarpMarkerEditing = {}));
