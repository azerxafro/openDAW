"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoteClipPainter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var createNoteClipPainter = function (adapter) { return function (painter) {
    var context = painter.context, size = painter.actualHeight;
    var radius = size >> 1;
    context.save();
    context.lineCap = "butt";
    context.lineJoin = "bevel";
    context.translate(radius, radius);
    var duration = adapter.duration;
    var minRadius = 2 * devicePixelRatio;
    var maxRadius = radius - 2 * devicePixelRatio;
    var collection = adapter.optCollection.unwrap();
    var minPitch = collection.minPitch, maxPitch = collection.maxPitch;
    for (var _i = 0, _a = collection.events.asArray(); _i < _a.length; _i++) {
        var event_1 = _a[_i];
        context.beginPath(); // TODO move out of loop with moveTo
        context.strokeStyle = "hsl(".concat(adapter.hue, ", 50%, 80%)");
        context.lineWidth = devicePixelRatio;
        var rangePitch = maxPitch - minPitch;
        var normalised = rangePitch === 0 ? 0.5 : 1.0 - (event_1.pitch - minPitch) / rangePitch;
        var a0 = event_1.position / duration * lib_std_1.TAU - lib_std_1.PI_HALF;
        var a1 = event_1.complete / duration * lib_std_1.TAU - lib_std_1.PI_HALF;
        var r = minRadius + normalised * (maxRadius - minRadius);
        context.arc(0.0, 0.0, r, a0, a1, false);
        context.stroke();
    }
    context.restore();
}; };
exports.createNoteClipPainter = createNoteClipPainter;
