"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpMarkerEditor = void 0;
var WarpMarkerEditor_sass_inline_1 = require("./WarpMarkerEditor.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var WheelScaling_1 = require("@/ui/timeline/WheelScaling");
var WarpMarkerEditing_1 = require("@/ui/timeline/editors/audio/WarpMarkerEditing");
var TransientMarkerUtils_1 = require("@/ui/timeline/editors/audio/TransientMarkerUtils");
var WarpMarkerUtils_1 = require("@/ui/timeline/editors/audio/WarpMarkerUtils");
var Surface_1 = require("@/ui/surface/Surface");
var className = lib_dom_1.Html.adoptStyleSheet(WarpMarkerEditor_sass_inline_1.default, "AudioWrapMarkers");
var WarpMarkerEditor = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, range = _a.range, snapping = _a.snapping, reader = _a.reader, hoverTransient = _a.hoverTransient, cursorModel = _a.cursorModel;
    var audioContent = reader.audioContent;
    var file = audioContent.file, observableOptPlayMode = audioContent.observableOptPlayMode;
    var markerRadius = 7;
    return (<div className={className} onInit={function (element) {
            return lifecycle.own(observableOptPlayMode.catchupAndSubscribe(function () {
                return element.classList.toggle("no-content", audioContent.isPlayModeNoStretch);
            }));
        }}>
            <canvas tabIndex={-1} onInit={function (canvas) {
            var requestUpdate = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                if (observableOptPlayMode.isEmpty()) {
                    return;
                }
                if (audioContent.isPlayModeNoStretch) {
                    return;
                }
                var warpMarkers = observableOptPlayMode.unwrap().warpMarkers;
                for (var _i = 0, _a = warpMarkers.iterateFrom(range.unitMin - reader.offset); _i < _a.length; _i++) {
                    var marker = _a[_i];
                    var unit = reader.offset + marker.position;
                    if (unit > range.unitMax) {
                        break;
                    }
                    var x = range.unitToX(unit) * devicePixelRatio;
                    context.beginPath();
                    context.arc(x, actualHeight * 0.5, markerRadius, 0.0, lib_std_1.TAU);
                    context.fillStyle = marker.isSelected
                        ? "hsl(".concat(reader.hue, ", 60%, 80%)")
                        : "hsl(".concat(reader.hue, ", 60%, 50%)");
                    context.fill();
                }
            })).requestUpdate;
            var audioPlayModeLifeCycle = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.ownAll(WheelScaling_1.WheelScaling.install(canvas, range), range.subscribe(requestUpdate), reader.subscribeChange(requestUpdate), observableOptPlayMode.catchupAndSubscribe(function (optPlayMode) {
                audioPlayModeLifeCycle.terminate();
                optPlayMode.ifSome(function (audioPlayMode) {
                    audioPlayModeLifeCycle.ownAll(audioPlayMode.subscribe(requestUpdate), WarpMarkerEditing_1.WarpMarkerEditing.install(project, canvas, range, snapping, reader, audioPlayMode, hoverTransient));
                    if (audioPlayMode instanceof studio_adapters_1.AudioTimeStretchBoxAdapter) {
                        var warpMarkers_1 = audioPlayMode.warpMarkers;
                        var transientCapturing_1 = TransientMarkerUtils_1.TransientMarkerUtils.createCapturing(canvas, range, reader, warpMarkers_1, file.transients);
                        var updatePreview_1 = function (noSnapping) {
                            var point = Surface_1.Surface.get(canvas).pointer;
                            var target = transientCapturing_1.captureEvent({
                                clientX: point.x,
                                clientY: point.y
                            });
                            hoverTransient.setValue(target);
                            var local;
                            if ((0, lib_std_1.isDefined)(target) && !noSnapping) {
                                local = TransientMarkerUtils_1.TransientMarkerUtils.secondsToUnits(target.position, warpMarkers_1);
                            }
                            else {
                                var x = point.x - canvas.getBoundingClientRect().left;
                                local = noSnapping ? range.xToUnit(x) - reader.offset : snapping.xToUnitRound(x) - reader.offset;
                            }
                            var adjacentWarpMarkers = WarpMarkerUtils_1.WarpMarkerUtils
                                .findAdjacent(local, warpMarkers_1, true);
                            var left = adjacentWarpMarkers[0], right = adjacentWarpMarkers[1];
                            if ((0, lib_std_1.isNull)(left) || (0, lib_std_1.isNull)(right)) {
                                cursorModel.setValue(null);
                                return;
                            }
                            if (local - left.position < WarpMarkerEditing_1.WarpMarkerEditing.MIN_DISTANCE
                                || right.position - local < WarpMarkerEditing_1.WarpMarkerEditing.MIN_DISTANCE) {
                                cursorModel.setValue(null);
                                return;
                            }
                            cursorModel.setValue(local);
                        };
                        audioPlayModeLifeCycle.ownAll(lib_dom_1.Events.subscribe(canvas, "pointermove", function (event) {
                            if (event.buttons !== 0) {
                                return;
                            }
                            updatePreview_1(event.shiftKey);
                        }), lib_dom_1.Events.subscribe(canvas, "pointerout", function () {
                            cursorModel.setValue(null);
                            hoverTransient.setValue(null);
                        }), lib_dom_1.Events.subscribe(canvas, "keydown", function (event) { return updatePreview_1(event.shiftKey); }), lib_dom_1.Events.subscribe(canvas, "keyup", function (event) { return updatePreview_1(event.shiftKey); }));
                    }
                });
            }));
        }}/>
        </div>);
};
exports.WarpMarkerEditor = WarpMarkerEditor;
