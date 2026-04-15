"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceStats = void 0;
var PerformanceStats_sass_inline_1 = require("./PerformanceStats.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var className = lib_dom_1.Html.adoptStyleSheet(PerformanceStats_sass_inline_1.default, "PerformanceStats");
var WIDTH = 64;
var HEIGHT = 28;
var PerformanceStats = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var maxValues = new Float32Array(WIDTH);
    var lastReadIndex = 0;
    var currentMax = 0;
    var blocksInPixel = 0;
    var writePixelIndex = 0;
    var budgetMs = (lib_dsp_1.RenderQuantum / service.audioContext.sampleRate) * 1000;
    lifecycle.own(service.projectProfileService.catchupAndSubscribe(function () {
        maxValues.fill(0);
        lastReadIndex = 0;
        currentMax = 0;
        blocksInPixel = 0;
        writePixelIndex = 0;
        budgetMs = (lib_dsp_1.RenderQuantum / service.audioContext.sampleRate) * 1000;
    }));
    var powerButton = (<div className="power" title="Toggle DSP load measurement" onclick={function () {
            var settings = service.engine.preferences.settings;
            settings.debug.dspLoadMeasurement = !settings.debug.dspLoadMeasurement;
        }}>
            {"\u23FB"}
        </div>);
    return (<div className={className} onInit={function (element) {
            var animationLifeSpan = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.own(studio_core_1.StudioPreferences.catchupAndSubscribe(function (show) {
                element.classList.toggle("hidden", !show);
                animationLifeSpan.terminate();
                if (show) {
                    var canvas = element.querySelector("canvas");
                    var painter = animationLifeSpan.own(new studio_core_1.CanvasPainter(canvas, function (_a) {
                        var context = _a.context, actualWidth = _a.actualWidth, actualHeight = _a.actualHeight;
                        var engine = service.engine;
                        var perfBuffer = engine.perfBuffer;
                        var perfIndex = engine.perfIndex;
                        var readIndex = lastReadIndex;
                        while (readIndex !== perfIndex) {
                            var ms = perfBuffer[readIndex];
                            if (ms > currentMax) {
                                currentMax = ms;
                            }
                            blocksInPixel++;
                            if (blocksInPixel >= 6) {
                                maxValues[writePixelIndex] = currentMax;
                                writePixelIndex = (writePixelIndex + 1) % WIDTH;
                                currentMax = 0;
                                blocksInPixel = 0;
                            }
                            readIndex = (readIndex + 1) % studio_adapters_1.PERF_BUFFER_SIZE;
                        }
                        lastReadIndex = readIndex;
                        context.clearRect(0, 0, actualWidth, actualHeight);
                        var barWidth = actualWidth / WIDTH;
                        for (var pixel = 0; pixel < WIDTH; pixel++) {
                            var index = (writePixelIndex + pixel) % WIDTH;
                            var ratio = Math.min(maxValues[index] / budgetMs, 1.0);
                            var barHeight = ratio * actualHeight;
                            if (ratio < 0.75) {
                                context.fillStyle = studio_enums_1.Colors.green.toString();
                            }
                            else if (ratio < 1.0) {
                                context.fillStyle = studio_enums_1.Colors.orange.toString();
                            }
                            else {
                                context.fillStyle = studio_enums_1.Colors.red.toString();
                            }
                            context.fillRect(pixel * barWidth, actualHeight - barHeight, barWidth, barHeight);
                        }
                    }));
                    animationLifeSpan.own(lib_dom_1.AnimationFrame.add(painter.requestUpdate));
                }
            }, "debug", "show-cpu-stats"));
            lifecycle.own(service.engine.preferences.catchupAndSubscribe(function (enabled) {
                powerButton.classList.toggle("hidden", enabled);
            }, "debug", "dspLoadMeasurement"));
        }}>
            {powerButton}
            <div className="label">CPU</div>
            <canvas style={{ width: "".concat(WIDTH, "px"), height: "".concat(HEIGHT, "px") }}/>
            <div className="end"/>
        </div>);
};
exports.PerformanceStats = PerformanceStats;
