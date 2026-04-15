"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_enums_1 = require("@opendaw/studio-enums");
var Timeline = function (_a) {
    var lifecycle = _a.lifecycle, position = _a.position, tracks = _a.tracks;
    var canvas = <canvas />;
    var context = (0, lib_std_1.asDefined)(canvas.getContext("2d"));
    var unitMin = -lib_dsp_1.PPQN.Quarter * 12;
    var unitMax = lib_dsp_1.PPQN.Quarter * 12;
    var mapping = function (unit) { return (unit - unitMin) / (unitMax - unitMin); };
    var redraw = (0, lib_dom_1.deferNextFrame)(function () {
        var width = canvas.width, height = canvas.height;
        var ppqn = position.getValue();
        context.resetTransform();
        context.clearRect(0, 0, width, height);
        var heightHalf = height / 2;
        for (var _i = 0, _a = tracks.collection.adapters()
            .toSorted(function (a, b) { return a.indexField.getValue() - b.indexField.getValue(); }).entries(); _i < _a.length; _i++) {
            var _b = _a[_i], index = _b[0], track = _b[1];
            for (var _c = 0, _d = track.regions.collection.iterateRange(unitMin + ppqn, unitMax + ppqn); _c < _d.length; _c++) {
                var region = _d[_c];
                var x0 = Math.floor(mapping(region.position - ppqn) * width);
                var x1 = Math.floor(mapping(region.complete - ppqn) * width);
                var xn = x1 - x0;
                if (xn >= 1) {
                    context.fillStyle = "hsl(".concat(region.hue, ", 60%, 60%)");
                    context.fillRect(x0, 4 + index * heightHalf, xn, heightHalf / 2);
                    context.fill();
                }
            }
        }
        context.fillStyle = studio_enums_1.Colors.cream.toString();
        var interval = lib_dsp_1.PPQN.Bar;
        for (var pulse = (0, lib_std_1.quantizeFloor)(unitMin + ppqn, interval); pulse < unitMax + ppqn; pulse += interval) {
            var n = mapping(pulse - ppqn);
            var x = Math.floor(n * width);
            var _e = lib_dsp_1.PPQN.toParts(pulse), beats = _e.beats, ticks = _e.ticks;
            var isBeat = ticks === 0;
            var isBar = isBeat && beats === 0;
            if (isBar) {
                if (pulse < 0) {
                    context.fillRect(x, 1, 1, 1);
                }
                else {
                    context.fillRect(x, 0, 1, 3);
                }
            }
        }
    });
    lifecycle.own(lib_dom_1.Html.watchResize(canvas, function () {
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;
        redraw.request();
    }));
    lifecycle.own(position.subscribe(function () { return redraw.request(); }));
    lifecycle.own(tracks.subscribeAnyChange(redraw.request));
    return canvas;
};
exports.Timeline = Timeline;
