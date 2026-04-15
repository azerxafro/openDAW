"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagnitudeCanvas = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_std_1 = require("@opendaw/lib-std");
var MagnitudeCanvas = function (_a) {
    var lifecycle = _a.lifecycle, weights = _a.weights;
    var canvas = <canvas />;
    lifecycle.own(lib_dom_1.Html.watchResize(canvas, function () {
        if (!canvas.isConnected) {
            return;
        }
        var width = canvas.clientWidth;
        if (width === 0) {
            return;
        }
        var dpr = window.devicePixelRatio;
        var height = 32;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.height = "".concat(height, "px");
        var ctx = canvas.getContext("2d");
        if ((0, lib_std_1.isNull)(ctx)) {
            return;
        }
        ctx.scale(dpr, dpr);
        var segmentCount = 40;
        var segmentSize = Math.floor(weights.length / segmentCount);
        var segments = [];
        for (var i = 0; i < segmentCount; i++) {
            var start = i * segmentSize;
            var end = Math.min(start + segmentSize, weights.length);
            var sum = 0;
            for (var j = start; j < end; j++) {
                sum += Math.abs(weights[j]);
            }
            segments.push(sum / (end - start));
        }
        var maxAvg = Math.max.apply(Math, segments);
        var barW = width / segmentCount;
        var purple = studio_enums_1.Colors.purple.toString();
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = purple;
        for (var index = 0; index < segmentCount; index++) {
            var barHeight = (segments[index] / maxAvg) * height;
            var x = index * barW;
            var y = height - barHeight;
            ctx.fillRect(x, y, barW - 1, barHeight);
        }
    }));
    return canvas;
};
exports.MagnitudeCanvas = MagnitudeCanvas;
