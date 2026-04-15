"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransientMarkerEditor = void 0;
var TransientMarkerEditor_sass_inline_1 = require("./TransientMarkerEditor.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var WheelScaling_1 = require("@/ui/timeline/WheelScaling");
var className = lib_dom_1.Html.adoptStyleSheet(TransientMarkerEditor_sass_inline_1.default, "TransientMarkerEditor");
var TransientMarkerEditor = function (_a) {
    var lifecycle = _a.lifecycle, range = _a.range, reader = _a.reader, hoverTransient = _a.hoverTransient;
    var audioContent = reader.audioContent;
    return (<div className={className} onInit={function (element) {
            return lifecycle.own(audioContent.observableOptPlayMode.catchupAndSubscribe(function () {
                return element.classList.toggle("no-content", audioContent.asPlayModeTimeStretch.isEmpty());
            }));
        }}>
            <canvas onInit={function (canvas) {
            var requestUpdate = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                var optWarpMarkers = audioContent.optWarpMarkers;
                if (optWarpMarkers.isEmpty() || audioContent.asPlayModeTimeStretch.isEmpty()) {
                    return;
                }
                var transientsCollection = audioContent.file.transients;
                if (transientsCollection.length() < 2) {
                    return;
                }
                var warpMarkers = optWarpMarkers.unwrap();
                var waveformOffset = audioContent.waveformOffset.getValue();
                var markers = warpMarkers.asArray();
                if (markers.length < 2) {
                    return;
                }
                var first = markers[0];
                var second = markers[1];
                var secondLast = markers[markers.length - 2];
                var last = markers[markers.length - 1];
                // Rates in ppqn per second (inverse of waveform's seconds per ppqn)
                var firstRate = (second.position - first.position) / (second.seconds - first.seconds);
                var lastRate = (last.position - secondLast.position) / (last.seconds - secondLast.seconds);
                var secondsToLocalUnit = function (seconds) {
                    if (seconds < first.seconds) {
                        return first.position + (seconds - first.seconds) * firstRate;
                    }
                    if (seconds > last.seconds) {
                        return last.position + (seconds - last.seconds) * lastRate;
                    }
                    var index = Math.min(markers.length - 2, lib_std_1.BinarySearch.rightMostMapped(markers, seconds, lib_std_1.NumberComparator, function (_a) {
                        var seconds = _a.seconds;
                        return seconds;
                    }));
                    var left = markers[index];
                    var right = markers[index + 1];
                    var t = (seconds - left.seconds) / (right.seconds - left.seconds);
                    return left.position + t * (right.position - left.position);
                };
                var localUnitToSeconds = function (localUnit) {
                    if (localUnit < first.position) {
                        return first.seconds + (localUnit - first.position) / firstRate;
                    }
                    if (localUnit > last.position) {
                        return last.seconds + (localUnit - last.position) / lastRate;
                    }
                    var index = warpMarkers.floorLastIndex(localUnit);
                    var left = markers[index];
                    var right = markers[index + 1];
                    var t = (localUnit - left.position) / (right.position - left.position);
                    return left.seconds + t * (right.seconds - left.seconds);
                };
                var visibleStartSeconds = localUnitToSeconds(range.unitMin - range.unitPadding - reader.offset) + waveformOffset;
                var transients = transientsCollection.asArray();
                var startIndex = Math.max(0, transientsCollection.floorLastIndex(visibleStartSeconds));
                for (var i = startIndex; i < transients.length; i++) {
                    var transient = transients[i];
                    var adjustedSeconds = transient.position - waveformOffset;
                    var localUnit = secondsToLocalUnit(adjustedSeconds);
                    var unit = reader.offset + localUnit;
                    if (unit < range.unitMin - range.unitPadding) {
                        continue;
                    }
                    if (unit > range.unitMax) {
                        break;
                    }
                    var x = range.unitToX(unit) * devicePixelRatio;
                    context.beginPath();
                    context.moveTo(x, actualHeight * 0.85);
                    context.lineTo(x - 7, actualHeight * 0.50);
                    context.lineTo(x + 7, actualHeight * 0.50);
                    context.fillStyle = hoverTransient.getValue() === transient
                        ? studio_enums_1.Colors.white.toString()
                        : studio_enums_1.Colors.shadow.toString();
                    context.fill();
                }
            })).requestUpdate;
            var playModeTerminator = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.ownAll(WheelScaling_1.WheelScaling.install(canvas, range), range.subscribe(requestUpdate), reader.subscribeChange(requestUpdate), audioContent.observableOptPlayMode.catchupAndSubscribe(function (optPlayMode) {
                playModeTerminator.terminate();
                optPlayMode.ifSome(function (playMode) { return playModeTerminator.ownAll(playMode.subscribe(requestUpdate), hoverTransient.subscribe(requestUpdate)); });
            }));
        }}/>
        </div>);
};
exports.TransientMarkerEditor = TransientMarkerEditor;
