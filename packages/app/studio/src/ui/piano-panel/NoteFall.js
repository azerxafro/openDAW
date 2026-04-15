"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteFall = void 0;
var NoteFall_sass_inline_1 = require("./NoteFall.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var PianoRollLayout_ts_1 = require("@/ui/PianoRollLayout.ts");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var Fonts_ts_1 = require("@/ui/Fonts.ts");
var className = lib_dom_1.Html.adoptStyleSheet(NoteFall_sass_inline_1.default, "NoteFall");
var NoteFall = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, updateNotifier = _a.updateNotifier;
    var project = service.project;
    var engine = project.engine;
    var position = engine.position;
    var pianoMode = project.rootBoxAdapter.pianoMode;
    var keyboard = pianoMode.keyboard, timeRangeInQuarters = pianoMode.timeRangeInQuarters, noteScale = pianoMode.noteScale, noteLabels = pianoMode.noteLabels, transpose = pianoMode.transpose;
    var canvas = <canvas />;
    var renderCalls = [];
    var painter = new studio_core_1.CanvasPainter(canvas, function (painter) {
        var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight;
        var timeRange = lib_dsp_1.PPQN.Quarter * timeRangeInQuarters.getValue();
        var labelEnabled = noteLabels.getValue();
        var min = position.getValue();
        var max = min + timeRange;
        var positionToY = function (position) { return (1.0 - (position - min) / timeRange) * actualHeight; };
        context.clearRect(0, 0, actualWidth, actualHeight);
        context.strokeStyle = "rgba(255, 255, 255, 0.2)";
        context.setLineDash([4, 4]);
        context.beginPath();
        var pianoLayout = PianoRollLayout_ts_1.PianoRollLayout.getByIndex(keyboard.getValue());
        for (var _i = 0, _a = pianoLayout.octaveSplits; _i < _a.length; _i++) {
            var position_1 = _a[_i];
            var x = Math.floor(position_1 * actualWidth);
            context.moveTo(x, 0.0);
            context.lineTo(x, actualHeight);
        }
        var _b = project.timelineBoxAdapter.box.signature, nominator = _b.nominator, denominator = _b.denominator;
        var stepSize = lib_dsp_1.PPQN.fromSignature(nominator.getValue(), denominator.getValue());
        for (var _c = 0, _d = lib_dsp_1.Fragmentor.iterate(min, max, stepSize); _c < _d.length; _c++) {
            var position_2 = _d[_c];
            var y = Math.floor(positionToY(position_2));
            context.moveTo(0.0, y);
            context.lineTo(actualWidth, y);
        }
        context.stroke();
        context.setLineDash(lib_std_1.Arrays.empty());
        context.textAlign = "center";
        context.textBaseline = "bottom";
        var noteWidth = actualWidth / pianoLayout.count * noteScale.getValue();
        context.font = "".concat(noteWidth * devicePixelRatio * 0.55, "px ").concat(Fonts_ts_1.Fonts.Rubik["font-family"]);
        renderCalls.length = 0;
        project.rootBoxAdapter.audioUnits.adapters().forEach(function (audioUnitAdapter) {
            var trackBoxAdapters = audioUnitAdapter.tracks.values()
                .filter(function (adapter) { return !adapter.box.excludePianoMode.getValue(); });
            trackBoxAdapters.forEach(function (trackAdapter) {
                for (var _i = 0, _a = trackAdapter.regions.collection.iterateRange(min, max); _i < _a.length; _i++) {
                    var region = _a[_i];
                    if (!(0, lib_std_1.isInstanceOf)(region, studio_adapters_1.NoteRegionBoxAdapter)) {
                        continue;
                    }
                    var hue = region.hue;
                    var collection = region.optCollection.unwrap();
                    var events = collection.events;
                    for (var _b = 0, _c = lib_dsp_1.LoopableRegion.locateLoops(region, min, max); _b < _c.length; _b++) {
                        var _d = _c[_b], resultStart = _d.resultStart, resultEnd = _d.resultEnd, rawStart = _d.rawStart;
                        var searchStart = Math.floor(resultStart - rawStart);
                        var searchEnd = Math.floor(resultEnd - rawStart);
                        for (var _e = 0, _f = events.iterateRange(searchStart - collection.maxDuration, searchEnd); _e < _f.length; _e++) {
                            var note = _f[_e];
                            var pitch = note.pitch + transpose.getValue();
                            if (pitch < pianoLayout.min || pitch > pianoLayout.max) {
                                continue;
                            }
                            renderCalls.push({
                                pitch: pitch,
                                x: pianoLayout.getCenteredX(pitch) * actualWidth,
                                // inverses the y-axis
                                y0: positionToY(note.complete + rawStart),
                                y1: positionToY(note.position + rawStart),
                                hue: hue
                            });
                        }
                    }
                }
            });
        });
        // render shadow pass
        context.fillStyle = "rgba(0, 0, 0, 0.25)";
        context.beginPath();
        renderCalls.forEach(function (_a) {
            var x = _a.x, y0 = _a.y0, y1 = _a.y1;
            context.roundRect(x - noteWidth / 2, y0 + devicePixelRatio * 4, noteWidth, y1 - y0, 3 * devicePixelRatio);
        });
        context.fill();
        // render solid pass
        context.lineWidth = devicePixelRatio;
        context.strokeStyle = "rgba(0, 0, 0, 0.5)";
        renderCalls.forEach(function (_a) {
            var x = _a.x, y0 = _a.y0, y1 = _a.y1, hue = _a.hue;
            var isPlaying = y1 >= actualHeight;
            context.fillStyle = pianoLayout.getFillStyle(hue, isPlaying);
            context.beginPath();
            context.roundRect(x - noteWidth / 2, y0, noteWidth, y1 - y0, 3 * devicePixelRatio);
            context.fill();
            context.stroke();
            context.restore();
        });
        // render label pass
        if (labelEnabled) {
            renderCalls.forEach(function (_a) {
                var pitch = _a.pitch, x = _a.x, y0 = _a.y0, y1 = _a.y1;
                context.save();
                context.beginPath();
                context.roundRect(x - noteWidth / 2, y0, noteWidth, y1 - y0, 3 * devicePixelRatio);
                context.clip();
                context.fillStyle = "rgba(0, 0, 0, 0.75)";
                lib_dsp_1.MidiKeys.Names.English[pitch % 12]
                    .toUpperCase()
                    .split("")
                    .forEach(function (letter, index) { return context
                    .fillText(letter, x, y1 - index * noteWidth * 0.45 * devicePixelRatio); });
                context.restore();
            });
        }
    });
    var element = (<div className={className}>{canvas}</div>);
    lifecycle.ownAll(painter, updateNotifier.subscribe(painter.requestUpdate), lib_dom_1.Html.watchResize(element, painter.requestUpdate), lib_dom_1.Events.subscribe(canvas, "wheel", function (event) {
        event.preventDefault();
        var ppqn = position.getValue() - Math.sign(event.deltaY) * lib_dsp_1.PPQN.SemiQuaver * 2;
        engine.setPosition(Math.max(0, ppqn));
    }));
    return element;
};
exports.NoteFall = NoteFall;
