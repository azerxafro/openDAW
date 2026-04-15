"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotePitchPainter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var NoteModifyStrategies_ts_1 = require("@/ui/timeline/editors/notes/NoteModifyStrategies.ts");
var TimeGridRenderer_ts_1 = require("@/ui/timeline/editors/TimeGridRenderer.ts");
var createNotePitchPainter = function (_a) {
    var canvas = _a.canvas, positioner = _a.positioner, scale = _a.scale, range = _a.range, snapping = _a.snapping, modifyContext = _a.modifyContext, reader = _a.reader;
    return function (painter) {
        var context = painter.context;
        var _a = context.canvas, width = _a.width, height = _a.height;
        var unitToX = function (unit) { return Math.floor(range.unitToX(unit + reader.offset) * devicePixelRatio); };
        var pitchToY = function (pitch) { return positioner.pitchToY(pitch) * devicePixelRatio; };
        (0, TimeGridRenderer_ts_1.renderTimeGrid)(context, reader.timelineBoxAdapter.signatureTrack, range, snapping, 0, height);
        var modifier = modifyContext.modifier;
        var strategy = modifier.unwrapOrElse(NoteModifyStrategies_ts_1.NoteModifyStrategies.Identity);
        // LOOP DURATION
        var x0 = unitToX(0);
        var x1 = unitToX(strategy.readContentDuration(reader));
        if (x0 > 0) {
            context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.30)");
            context.fillRect(x0, 0, devicePixelRatio, height);
        }
        if (x1 > 0) {
            context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.03)");
            context.fillRect(x0, 0, x1 - x0, height);
            context.fillStyle = "hsla(".concat(reader.hue, ", 60%, 60%, 0.30)");
            context.fillRect(x1, 0, devicePixelRatio, height);
        }
        var noteHeight = (positioner.noteHeight - 1) * devicePixelRatio;
        var noteOutlineHeight = (positioner.noteHeight + 1) * devicePixelRatio;
        // NOTE ROWS
        var topNote = positioner.yToPitch(0);
        var bottomNote = positioner.yToPitch(canvas.clientHeight);
        for (var note = bottomNote; note <= topNote; note++) {
            if (scale.has(note)) {
                context.fillStyle = lib_dsp_1.MidiKeys.isBlackKey(note) ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.02)";
                context.fillRect(0, pitchToY(note), width, noteHeight);
            }
            else {
                context.fillStyle = "rgba(255, 128, 128, 0.08)";
                context.fillRect(0, pitchToY(note), width, noteHeight);
            }
        }
        // NOTES
        var unitMin = range.unitMin - range.unitPadding - reader.offset;
        var unitMax = range.unitMax - reader.offset;
        var eventCollection = reader.content;
        var render = function (strategy, filterSelected, hideSelected) {
            for (var _i = 0, _a = strategy
                .iterateRange(eventCollection.events, unitMin - eventCollection.maxDuration, unitMax); _i < _a.length; _i++) {
                var noteEvent = _a[_i];
                if (noteEvent.isSelected ? hideSelected : !filterSelected) {
                    continue;
                }
                var selected = noteEvent.isSelected && !filterSelected;
                var position = strategy.readPosition(noteEvent);
                var complete = strategy.readComplete(noteEvent);
                var pitch = strategy.readPitch(noteEvent);
                var x0_1 = unitToX(position);
                var x1_1 = unitToX(complete);
                var y0 = pitchToY(pitch);
                var xn = Math.max(x1_1 - x0_1, 3); // ensure that the note color is coming through the outline
                context.fillStyle = selected ? "white" : "black";
                context.fillRect(x0_1, y0 - devicePixelRatio, xn + devicePixelRatio, noteOutlineHeight);
                var w = xn - devicePixelRatio;
                if (w > 0) {
                    var saturation = strategy.readChance(noteEvent) * 0.50;
                    var opacity = (0, lib_std_1.linear)(33, 100, Math.pow(strategy.readVelocity(noteEvent), 2.0));
                    context.fillStyle = "hsla(".concat(reader.hue, ", ").concat(saturation, "%, 50%, ").concat(opacity, "%)");
                    context.fillRect(x0_1 + devicePixelRatio, y0, w, noteHeight);
                }
                var ftRange = noteHeight >>> 1;
                var ft = strategy.readCent(noteEvent) / 50.0 * (ftRange - devicePixelRatio * 2);
                context.fillStyle = selected ? "rgba(255, 255, 255, 0.75)" : "rgba(0, 0, 0, 0.5)";
                var y = y0 + ftRange - ft - 1;
                var playCount = noteEvent.playCount;
                var playCurve = noteEvent.playCurve;
                var duration = complete - position;
                for (var cycle = 0; cycle < playCount; cycle++) {
                    var b0 = lib_dsp_1.NoteEvent.curveFunc(cycle / playCount, playCurve);
                    var b1 = lib_dsp_1.NoteEvent.curveFunc((cycle + 1) / playCount, playCurve);
                    var cx0 = Math.max(unitToX(position + duration * b0), x0_1 + devicePixelRatio);
                    var cx1 = Math.min(unitToX(position + duration * b1), x1_1 - devicePixelRatio);
                    context.fillRect(cx0 + devicePixelRatio, y, cx1 - cx0 - devicePixelRatio, devicePixelRatio);
                }
            }
        };
        var unselectedStrategy = strategy.unselectedModifyStrategy();
        var selectedStrategy = strategy.selectedModifyStrategy();
        render(unselectedStrategy, true, !strategy.showOrigin());
        render(selectedStrategy, false, false);
        // painting the notes on the scroller track
        //
        var left = width - 5 * devicePixelRatio;
        var bottom = painter.actualHeight - devicePixelRatio;
        var scrollerWidth = 2 * devicePixelRatio;
        context.fillStyle = "hsl(".concat(reader.hue, ", 50%, 50%)");
        for (var _i = 0, _b = eventCollection.events.asArray(); _i < _b.length; _i++) {
            var event_1 = _b[_i];
            if (event_1.isSelected) {
                continue;
            }
            var ny = (1.0 - unselectedStrategy.readPitch(event_1) / 127) * bottom;
            context.fillRect(left, ny, scrollerWidth, devicePixelRatio);
        }
        context.fillStyle = "white";
        for (var _c = 0, _d = eventCollection.events.asArray(); _c < _d.length; _c++) {
            var event_2 = _d[_c];
            if (!event_2.isSelected) {
                continue;
            }
            var ny = (1.0 - selectedStrategy.readPitch(event_2) / 127) * bottom;
            context.fillRect(left, ny, scrollerWidth, devicePixelRatio);
        }
    };
};
exports.createNotePitchPainter = createNotePitchPainter;
