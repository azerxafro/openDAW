"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
var Display_sass_inline_1 = require("./Display.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var className = lib_dom_1.Html.adoptStyleSheet(Display_sass_inline_1.default, "Display");
var Display = function (_a) {
    var lifecycle = _a.lifecycle, liveStreamReceiver = _a.liveStreamReceiver, adapter = _a.adapter, _b = _a.gridUV, u = _b.u, v = _b.v;
    var _c = adapter.namedParameter, bandwidth = _c.bandwidth, decay = _c.decay, damping = _c.damping;
    var maxPeak = 0.0;
    return (<div className={className} style={{ gridArea: "".concat(v + 1, "/").concat(u + 1, "/auto/span 3") }}>
            <canvas onInit={function (canvas) {
            var padding = 8;
            var project = function (x, z, focalLength) {
                return x * focalLength / (focalLength + z);
            };
            var particles = Array.from({ length: 500 }, function () { return ({
                unitX: (Math.random() - Math.random()) * 0.5 + 0.5,
                unitY: (Math.random() - Math.random()) * 0.25 + 0.75, // push to center
                unitZ: Math.random(),
                energy: 0.0
            }); });
            var canvasPainter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                var context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight, devicePixelRatio = painter.devicePixelRatio;
                var x1 = actualWidth - padding;
                var y1 = actualHeight - padding;
                var decayValue = decay.getControlledValue();
                var alphaExp = 1.0 + damping.getControlledValue() * 4.0;
                context.lineWidth = 1.0 / devicePixelRatio;
                context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle();
                var cx = x1 * 0.5;
                var cy = y1 * 0.5;
                var numberOfBoxes = 24;
                var focalLength = 500.0;
                var maxZ = numberOfBoxes * (10.0 + decayValue * 90.0);
                var x0 = padding + cx * (0.75 - bandwidth.getControlledValue() * 0.75);
                var y0 = padding;
                for (var i = 0; i < numberOfBoxes; i++) {
                    var z = i * (10.0 + decayValue * 90.0);
                    var x = project(x0 - cx, z, focalLength) + cx;
                    var y = project(y0 - cy, z, focalLength) + cy;
                    var scale = focalLength / (focalLength + z);
                    var width = (cx - x0) * 2.0 * scale;
                    var height = (cy - y0) * 2.0 * scale;
                    context.globalAlpha = Math.pow((1.0 - i / numberOfBoxes), alphaExp);
                    lib_dom_1.Context2d.strokeRoundedRect(context, x, y, width, height, 8);
                }
                context.fillStyle = DisplayPaint_1.DisplayPaint.strokeStyle();
                for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
                    var particle = particles_1[_i];
                    var worldX = x0 + particle.unitX * 2.0 * (cx - x0);
                    var worldY = y0 + particle.unitY * 2.0 * (cy - y0);
                    var worldZ = particle.unitZ * maxZ;
                    var x = project(worldX - cx, worldZ, focalLength) + cx;
                    var y = project(worldY - cy, worldZ, focalLength) + cy;
                    var scale = focalLength / (focalLength + worldZ);
                    context.globalAlpha = particle.energy * 0.5;
                    context.beginPath();
                    context.arc(x, y, 2.0 * scale, 0.0, lib_std_1.TAU);
                    context.fill();
                }
                particles.forEach(function (particle) {
                    particle.unitZ += 0.01;
                    if (particle.unitZ > 1.0) {
                        particle.unitZ -= 1.0;
                        particle.energy = maxPeak;
                    }
                    else {
                        particle.energy *= 0.98;
                    }
                });
                maxPeak *= 0.96;
            }));
            lifecycle.ownAll(bandwidth.subscribe(canvasPainter.requestUpdate), decay.subscribe(canvasPainter.requestUpdate), lib_dom_1.AnimationFrame.add(canvasPainter.requestUpdate), liveStreamReceiver.subscribeFloats(adapter.address, function (_a) {
                var l = _a[0], r = _a[1];
                maxPeak = Math.max(maxPeak, l, r);
            }));
            return canvasPainter;
        }}/>
        </div>);
};
exports.Display = Display;
