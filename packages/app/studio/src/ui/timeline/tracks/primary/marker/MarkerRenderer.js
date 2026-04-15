"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerRenderer = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var MarkerRenderer;
(function (MarkerRenderer) {
    MarkerRenderer.createTrackRenderer = function (canvas, range, _a, markerState) {
        var events = _a.events;
        return new studio_core_1.CanvasPainter(canvas, function (_a) {
            var context = _a.context;
            var width = canvas.width, height = canvas.height;
            var _b = getComputedStyle(canvas), fontFamily = _b.fontFamily, fontSize = _b.fontSize;
            context.clearRect(0, 0, width, height);
            context.textBaseline = "middle";
            context.font = "".concat(parseFloat(fontSize) * devicePixelRatio, "px ").concat(fontFamily);
            var renderMarker = function (curr, next) {
                var state = markerState.getValue();
                var isPlaying = (0, lib_std_1.isDefined)(state) && lib_std_1.UUID.equals(curr.uuid, state[0]);
                MarkerRenderer.renderMarker(context, range, curr, height, isPlaying, (0, lib_std_1.isDefined)(state) ? state[1] : 0, next);
            };
            var unitMin = range.unitMin;
            var unitMax = range.unitMax;
            var iterator = events.iterateFrom(unitMin);
            var _c = iterator.next(), value = _c.value, done = _c.done;
            if (done) {
                return;
            }
            var prev = value;
            for (var _i = 0, iterator_1 = iterator; _i < iterator_1.length; _i++) {
                var curr = iterator_1[_i];
                renderMarker(prev, curr);
                prev = curr;
                if (curr.position > unitMax) {
                    break;
                }
            }
            renderMarker(prev);
        });
    };
    MarkerRenderer.renderMarker = function (context, range, adapter, height, isPlaying, repeat, next) {
        var x0 = Math.floor(range.unitToX(adapter.position) * devicePixelRatio);
        var label = renderLabel(adapter, isPlaying, repeat);
        var text;
        var width;
        if ((0, lib_std_1.isDefined)(next)) {
            var x1 = Math.floor(range.unitToX(next.position) * devicePixelRatio);
            var truncate = lib_dom_1.Context2d.truncateText(context, label, x1 - x0 - (isPlaying ? textPadding << 2 : textPadding));
            text = truncate.text;
            width = truncate.width;
        }
        else {
            text = label;
            width = context.measureText(text).width;
        }
        var vPadding = Math.ceil(height / 5);
        if (isPlaying) {
            context.beginPath();
            context.roundRect(x0, vPadding, width + textPadding * 2, height - (vPadding << 1), [0, 99, 99, 0]);
            context.fillStyle = "hsl(".concat(adapter.hue, ", 60%, 40%)");
            context.fill();
            context.fillStyle = "hsl(".concat(adapter.hue, ", 60%, 5%)");
            context.fillText(text, x0 + textPadding, height >> 1);
        }
        else {
            context.fillStyle = "hsl(".concat(adapter.hue, ", 60%, 40%)");
            context.fillRect(x0, vPadding, 2, height - (vPadding << 1));
            context.fillText(text, x0 + textPadding, height >> 1);
        }
    };
    MarkerRenderer.computeWidth = function (context, adapter, isPlaying, repeat) {
        var label = renderLabel(adapter, isPlaying, repeat);
        var width = context.measureText(label).width;
        if (isPlaying) {
            return (width + textPadding * 2) / devicePixelRatio;
        }
        else {
            return (width + textPadding) / devicePixelRatio;
        }
    };
    var renderLabel = function (adapter, isPlaying, repeat) {
        if (adapter.plays === 1) {
            return adapter.label;
        }
        else if (adapter.plays === 0) {
            return "".concat(adapter.label, " \u21A9");
        }
        else {
            return isPlaying ? "".concat(adapter.label, " \u21A9").concat(repeat + 1, "/").concat(adapter.plays) : "".concat(adapter.label, " \u21A9").concat(adapter.plays);
        }
    };
    var textPadding = 8;
})(MarkerRenderer || (exports.MarkerRenderer = MarkerRenderer = {}));
