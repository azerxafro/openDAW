"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoRoll = void 0;
var PianoRoll_sass_inline_1 = require("./PianoRoll.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_dom_1 = require("@opendaw/lib-dom");
var Fonts_1 = require("@/ui/Fonts");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(PianoRoll_sass_inline_1.default, "PianoRoll");
var PianoRoll = function (_a) {
    var lifecycle = _a.lifecycle, positioner = _a.positioner, scale = _a.scale, noteReceiver = _a.noteReceiver, captureRef = _a.captureRef;
    var canvas = <canvas />;
    var canvasPainter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
        var context = painter.context;
        var width = context.canvas.width;
        var pitchToY = function (pitch) { return positioner.pitchToY(pitch) * devicePixelRatio; };
        context.textBaseline = "middle";
        context.textAlign = "right";
        var fontSize = positioner.noteHeight * 0.95 * devicePixelRatio;
        context.font = "".concat(fontSize, "px ").concat(Fonts_1.Fonts.Rubik["font-family"], ", sans-serif");
        var topNote = positioner.yToPitch(0);
        var bottomNote = positioner.yToPitch(canvas.clientHeight);
        var noteTrackHeight = (positioner.noteHeight - 1) * devicePixelRatio;
        for (var note = bottomNote; note <= topNote; note++) {
            var noteToY = pitchToY(note);
            context.fillStyle = lib_dsp_1.MidiKeys.isBlackKey(note) ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)";
            context.fillRect(0, noteToY, width, noteTrackHeight);
            if (!scale.has(note)) {
                context.fillStyle = "rgb(192, 64, 64)";
                context.fillRect(width - devicePixelRatio * 3, noteToY, devicePixelRatio * 3, noteTrackHeight);
            }
            if (noteReceiver.isNoteOn(note)) {
                context.fillStyle = studio_enums_1.Colors.blue.toString();
                context.fillRect(0, noteToY, width, noteTrackHeight);
            }
        }
        context.fillStyle = "rgba(0, 0, 0, 0.66)";
        for (var note = bottomNote; note <= topNote; note++) {
            if (note % 12 === 0) {
                var noteToY = pitchToY(note);
                var label = lib_dsp_1.MidiKeys.toFullString(note);
                context.fillText(label, width - devicePixelRatio * 2, noteToY + noteTrackHeight / 2 + 1);
            }
        }
    }));
    var element = <div className={className}>{canvas}</div>;
    lifecycle.ownAll(lib_dom_1.Events.subscribe(canvas, "wheel", function (event) {
        event.preventDefault();
        positioner.scrollModel.moveBy(event.deltaY);
    }, { passive: false }), lib_dom_1.Dragging.attach(canvas, function (_a) {
        var clientY = _a.clientY;
        var capture = captureRef.current;
        var pitch = positioner.yToPitch(clientY - canvas.getBoundingClientRect().top);
        capture.notify(studio_adapters_1.NoteSignal.on(capture.uuid, pitch, 1.0));
        return lib_std_1.Option.wrap({
            update: function (_a) {
                var clientY = _a.clientY;
                var newPitch = positioner.yToPitch(clientY - canvas.getBoundingClientRect().top);
                if (pitch !== newPitch) {
                    capture.notify(studio_adapters_1.NoteSignal.off(capture.uuid, pitch));
                    pitch = newPitch;
                    capture.notify(studio_adapters_1.NoteSignal.on(capture.uuid, pitch, 1.0));
                }
            },
            finally: function () { return capture.notify(studio_adapters_1.NoteSignal.off(capture.uuid, pitch)); }
        });
    }), scale.subscribe(function () { return canvasPainter.requestUpdate(); }), positioner.subscribe(function () { return canvasPainter.requestUpdate(); }), noteReceiver.subscribe(function () { return canvasPainter.requestUpdate(); }), lib_dom_1.Html.watchResize(element, function () { return canvasPainter.requestUpdate(); }));
    return element;
};
exports.PianoRoll = PianoRoll;
