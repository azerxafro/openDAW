"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValueClipPainter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var createValueClipPainter = function (adapter) { return function (painter) {
    var context = painter.context, size = painter.actualHeight;
    var radius = size >> 1;
    var duration = adapter.duration, optCollection = adapter.optCollection;
    var numRays = 256; // TODO We should make this dependent on the size
    context.save();
    context.translate(radius, radius);
    context.strokeStyle = "hsl(".concat(adapter.hue, ", 50%, 80%)");
    context.beginPath();
    var minRadius = 4 * devicePixelRatio;
    var maxRadius = radius - 4 * devicePixelRatio;
    var polar = function (angle, value) {
        var sin = Math.sin(angle);
        var cos = -Math.cos(angle);
        var r = minRadius + value * (maxRadius - minRadius);
        return { x: sin * r, y: cos * r };
    };
    var move = true;
    for (var _i = 0, _a = lib_dsp_1.ValueEvent.quantise(optCollection.unwrap().events, 0, duration, numRays); _i < _a.length; _i++) {
        var _b = _a[_i], position = _b.position, value = _b.value;
        if (move) {
            var _c = polar(position / duration * lib_std_1.TAU, value), x = _c.x, y = _c.y;
            context.moveTo(x, y);
            move = false;
        }
        else {
            var _d = polar(position / duration * lib_std_1.TAU, value), x = _d.x, y = _d.y;
            context.lineTo(x, y);
        }
    }
    context.stroke();
    context.restore();
}; };
exports.createValueClipPainter = createValueClipPainter;
