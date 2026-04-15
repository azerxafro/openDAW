"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioEditorCanvas = void 0;
var AudioEditorCanvas_sass_inline_1 = require("./AudioEditorCanvas.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var TimeGridRenderer_ts_1 = require("@/ui/timeline/editors/TimeGridRenderer.ts");
var EditorBody_1 = require("../EditorBody");
var lib_dom_1 = require("@opendaw/lib-dom");
var AudioCapturing_1 = require("@/ui/timeline/editors/audio/AudioCapturing");
var cursor_1 = require("@/ui/hooks/cursor");
var className = lib_dom_1.Html.adoptStyleSheet(AudioEditorCanvas_sass_inline_1.default, "AudioEditorCanvas");
var AudioEditorCanvas = function (_a) {
    var lifecycle = _a.lifecycle, _b = _a.project, editing = _b.editing, signatureTrack = _b.timelineBoxAdapter.signatureTrack, range = _a.range, cursorModel = _a.cursorModel, snapping = _a.snapping, reader = _a.reader;
    var _c = reader.audioContent, file = _c.file, observableOptPlayMode = _c.observableOptPlayMode, waveformOffset = _c.waveformOffset, gain = _c.gain;
    return (<div className={className}>
            <canvas tabIndex={-1} onInit={function (canvas) {
            var capturing = (0, AudioCapturing_1.createAudioCapturing)(canvas, range, reader);
            var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                (0, TimeGridRenderer_ts_1.renderTimeGrid)(context, signatureTrack, range, snapping, 0, actualHeight);
                var x0 = Math.floor(range.unitToX(reader.offset) * devicePixelRatio);
                var x1 = Math.floor(range.unitToX(reader.offset + reader.loopDuration) * devicePixelRatio);
                if (x0 > 0) {
                    context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.30)");
                    context.fillRect(x0, 0, devicePixelRatio, actualHeight);
                }
                if (x1 > 0) {
                    context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.03)");
                    context.fillRect(x0, 0, x1 - x0, actualHeight);
                    context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.30)");
                    context.fillRect(x1, 0, devicePixelRatio, actualHeight);
                }
                var pass = lib_dsp_1.LoopableRegion.locateLoop(reader, range.unitMin - range.unitPadding, range.unitMax);
                if (pass.isEmpty()) {
                    return;
                }
                var tempoMap = reader.trackBoxAdapter.unwrap().context.tempoMap;
                studio_core_1.AudioRenderer.render(context, range, file, tempoMap, observableOptPlayMode, waveformOffset.getValue(), gain.getValue(), { top: 0, bottom: painter.height }, "hsl(".concat(reader.hue, ", ").concat(60, "%, 45%)"), pass.unwrap(), false);
                var cursor = cursorModel.getValue();
                if ((0, lib_std_1.isDefined)(cursor)) {
                    var x = Math.floor(range.unitToX(cursor + reader.offset) * devicePixelRatio);
                    context.fillStyle = "rgba(255, 255, 255, 0.5)";
                    context.fillRect(x, 0, devicePixelRatio, actualHeight);
                }
            }));
            var playModeTerminator = lifecycle.own(new lib_std_1.Terminator());
            var unitToSeconds = function (ppqn, warpMarkers) {
                var first = warpMarkers.first();
                var last = warpMarkers.last();
                if (first === null || last === null) {
                    return 0.0;
                }
                // Before the first marker: extrapolate backwards
                if (ppqn < first.position) {
                    var second = warpMarkers.greaterEqual(first.position + 1);
                    if (second === null) {
                        return first.seconds;
                    }
                    var rate = (second.seconds - first.seconds) / (second.position - first.position);
                    return first.seconds + (ppqn - first.position) * rate;
                }
                // After last marker: extrapolate forwards
                if (ppqn > last.position) {
                    var secondLast = warpMarkers.lowerEqual(last.position - 1);
                    if (secondLast === null) {
                        return last.seconds;
                    }
                    var rate = (last.seconds - secondLast.seconds) / (last.position - secondLast.position);
                    return last.seconds + (ppqn - last.position) * rate;
                }
                // Within range: find bracketing markers directly
                var w0 = warpMarkers.lowerEqual(ppqn);
                var w1 = warpMarkers.greaterEqual(ppqn);
                if (w0 === null || w1 === null) {
                    return last.seconds;
                }
                if (w0.position === w1.position) {
                    return w0.seconds;
                }
                var t = (ppqn - w0.position) / (w1.position - w0.position);
                return w0.seconds + t * (w1.seconds - w0.seconds);
            };
            lifecycle.ownAll((0, EditorBody_1.installEditorBody)({ element: canvas, range: range, reader: reader }), (0, cursor_1.installCursor)(canvas, capturing, {
                get: function (target) {
                    return (target === null || target === void 0 ? void 0 : target.type) === "loop-duration" && (target === null || target === void 0 ? void 0 : target.reader.audioContent.canResize)
                        ? 2 /* Cursor.ExpandWidth */ : null;
                }
            }), cursorModel.subscribe(painter.requestUpdate), reader.subscribeChange(painter.requestUpdate), observableOptPlayMode.catchupAndSubscribe(function (optPlayMode) {
                playModeTerminator.terminate();
                optPlayMode.ifSome(function (playMode) { return playModeTerminator.own(playMode.subscribe(painter.requestUpdate)); });
            }), range.subscribe(painter.requestUpdate), snapping.subscribe(painter.requestUpdate), lib_dom_1.Dragging.attach(canvas, function (event) {
                var target = capturing.captureEvent(event);
                if ((target === null || target === void 0 ? void 0 : target.type) !== "loop-duration") {
                    return lib_std_1.Option.None;
                }
                if (!reader.audioContent.canResize)
                    return lib_std_1.Option.None;
                var startPPQN = range.xToUnit(event.clientX);
                var beginPPQN = reader.loopDuration;
                return lib_std_1.Option.wrap({
                    update: function (event) {
                        var delta = snapping.computeDelta(startPPQN, event.clientX, beginPPQN);
                        editing.modify(function () { return reader.contentDuration = beginPPQN + delta; });
                    },
                    approve: function () { return editing.mark(); }
                });
            }, { permanentUpdates: true }), lib_dom_1.Dragging.attach(canvas, function (startEvent) {
                var rect = canvas.getBoundingClientRect();
                var startX = startEvent.clientX - rect.left;
                var startOffset = waveformOffset.getValue();
                var startPPQN = range.xToUnit(startX) - reader.offset;
                var optWarping = observableOptPlayMode.map(function (optPlayMode) { return optPlayMode.warpMarkers; });
                var startAudioSeconds = optWarping.match({
                    none: function () {
                        // NoSync: linear mapping based on loop duration ratio
                        var audioDuration = file.endInSeconds - file.startInSeconds;
                        var ratio = audioDuration / reader.loopDuration;
                        return startPPQN * ratio + startOffset;
                    },
                    some: function (warpMarkers) { return unitToSeconds(startPPQN, warpMarkers) + startOffset; }
                });
                return lib_std_1.Option.wrap({
                    update: function (event) {
                        var currentX = event.clientX - rect.left;
                        var currentPPQN = range.xToUnit(currentX) - reader.offset;
                        var currentAudioSecondsWithoutOffset = optWarping.match({
                            none: function () {
                                var audioDuration = file.endInSeconds - file.startInSeconds;
                                var ratio = audioDuration / reader.loopDuration;
                                return currentPPQN * ratio;
                            },
                            some: function (warpMarkers) { return unitToSeconds(currentPPQN, warpMarkers); }
                        });
                        var newOffset = startAudioSeconds - currentAudioSecondsWithoutOffset;
                        editing.modify(function () { return waveformOffset.setValue(newOffset); }, false);
                    },
                    approve: function () { return editing.mark(); }
                });
            }));
        }}/>
        </div>);
};
exports.AudioEditorCanvas = AudioEditorCanvas;
