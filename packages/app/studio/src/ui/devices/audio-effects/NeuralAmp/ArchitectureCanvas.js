"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchitectureCanvas = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_std_1 = require("@opendaw/lib-std");
var ArchitectureCanvas = function (_a) {
    var lifecycle = _a.lifecycle, model = _a.model;
    var layers = model.config.layers;
    if (layers.length === 0)
        return <div className="empty">No layers</div>;
    var canvas = <canvas />;
    lifecycle.own(lib_dom_1.Html.watchResize(canvas, function () {
        if (!canvas.isConnected)
            return;
        var width = canvas.clientWidth;
        if (width === 0)
            return;
        var dpr = window.devicePixelRatio;
        var height = 72;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.height = "".concat(height, "px");
        var ctx = canvas.getContext("2d");
        if ((0, lib_std_1.isNull)(ctx))
            return;
        ctx.scale(dpr, dpr);
        var maxChannels = Math.max.apply(Math, layers.map(function (layer) { return layer.channels; }));
        var layerCount = layers.length;
        var layerWidth = 24;
        var spacing = 6;
        var maxHeight = 50;
        var minHeight = 12;
        var blue = studio_enums_1.Colors.blue.toString();
        var green = studio_enums_1.Colors.green.toString();
        var orange = studio_enums_1.Colors.orange.toString();
        var shadow = studio_enums_1.Colors.shadow.toString();
        ctx.clearRect(0, 0, width, height);
        ctx.font = "9px Rubik";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        var ioWidth = 10;
        var ioHeight = 20;
        var centerY = height / 2;
        ctx.fillStyle = blue;
        ctx.beginPath();
        ctx.roundRect(0, centerY - ioHeight / 2, ioWidth, ioHeight, 2);
        ctx.fill();
        ctx.fillStyle = shadow;
        ctx.fillText("In", ioWidth / 2, centerY + ioHeight / 2 + 2);
        for (var index = 0; index < layerCount; index++) {
            var layer = layers[index];
            var x = ioWidth + spacing + index * (layerWidth + spacing);
            var layerHeight = Math.max(minHeight, (layer.channels / maxChannels) * maxHeight);
            var y = centerY - layerHeight / 2;
            var prevX = index === 0
                ? ioWidth
                : ioWidth + spacing + (index - 1) * (layerWidth + spacing) + layerWidth;
            ctx.strokeStyle = shadow;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(prevX, centerY);
            ctx.lineTo(x, centerY);
            ctx.stroke();
            ctx.fillStyle = layer.gated ? orange : green;
            ctx.beginPath();
            ctx.roundRect(x, y, layerWidth, layerHeight, 2);
            ctx.fill();
            ctx.fillStyle = shadow;
            ctx.fillText(String(layer.channels), x + layerWidth / 2, y + layerHeight + 2);
        }
        var lastLayerX = ioWidth + spacing + (layerCount - 1) * (layerWidth + spacing) + layerWidth;
        var outX = ioWidth + spacing + layerCount * (layerWidth + spacing);
        ctx.strokeStyle = shadow;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lastLayerX, centerY);
        ctx.lineTo(outX, centerY);
        ctx.stroke();
        ctx.fillStyle = blue;
        ctx.beginPath();
        ctx.roundRect(outX, centerY - ioHeight / 2, ioWidth, ioHeight, 2);
        ctx.fill();
        ctx.fillStyle = shadow;
        ctx.fillText("Out", outX + ioWidth / 2, centerY + ioHeight / 2 + 2);
    }));
    return canvas;
};
exports.ArchitectureCanvas = ArchitectureCanvas;
