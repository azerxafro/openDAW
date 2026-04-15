"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeStats = exports.HistogramCanvas = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_std_1 = require("@opendaw/lib-std");
var computeStats = function (weights) {
    var count = weights.length;
    var min = Infinity;
    var max = -Infinity;
    var sum = 0;
    var zeros = 0;
    var positive = 0;
    var negative = 0;
    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
        var weight = weights_1[_i];
        if (weight < min)
            min = weight;
        if (weight > max)
            max = weight;
        sum += weight;
        if (weight === 0)
            zeros++;
        else if (weight > 0)
            positive++;
        else
            negative++;
    }
    var mean = sum / count;
    var varianceSum = 0;
    for (var _a = 0, weights_2 = weights; _a < weights_2.length; _a++) {
        var weight = weights_2[_a];
        varianceSum += Math.pow((weight - mean), 2);
    }
    var stdDev = Math.sqrt(varianceSum / count);
    return { count: count, min: min, max: max, mean: mean, stdDev: stdDev, zeros: zeros, positive: positive, negative: negative };
};
exports.computeStats = computeStats;
var HistogramCanvas = function (_a) {
    var lifecycle = _a.lifecycle, weights = _a.weights;
    var canvas = <canvas />;
    var stats = computeStats(weights);
    lifecycle.own(lib_dom_1.Html.watchResize(canvas, function () {
        if (!canvas.isConnected)
            return;
        var width = canvas.clientWidth;
        if (width === 0)
            return;
        var dpr = window.devicePixelRatio;
        var height = 60;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.height = "".concat(height, "px");
        var ctx = canvas.getContext("2d");
        if ((0, lib_std_1.isNull)(ctx))
            return;
        ctx.scale(dpr, dpr);
        var bins = 80;
        var range = stats.max - stats.min;
        var binWidth = range / bins;
        var histogram = new Array(bins).fill(0);
        for (var _i = 0, weights_3 = weights; _i < weights_3.length; _i++) {
            var weight = weights_3[_i];
            var binIndex = Math.min(Math.floor((weight - stats.min) / binWidth), bins - 1);
            histogram[binIndex]++;
        }
        var maxCount = Math.max.apply(Math, histogram);
        var barW = width / bins;
        var blue = studio_enums_1.Colors.blue.toString();
        var shadow = studio_enums_1.Colors.shadow.toString();
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = blue;
        for (var index = 0; index < bins; index++) {
            var barHeight = (histogram[index] / maxCount) * height;
            var x = index * barW;
            var y = height - barHeight;
            ctx.fillRect(x, y, barW - 1, barHeight);
        }
        var zeroX = width * (-stats.min / range);
        ctx.strokeStyle = shadow;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(zeroX, 0);
        ctx.lineTo(zeroX, height);
        ctx.stroke();
        ctx.setLineDash([]);
    }));
    return canvas;
};
exports.HistogramCanvas = HistogramCanvas;
