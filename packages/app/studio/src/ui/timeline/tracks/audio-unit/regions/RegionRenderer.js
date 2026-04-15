"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionRenderer = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var RegionPaintBucket_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionPaintBucket");
var RegionLabel_1 = require("@/ui/timeline/RegionLabel");
var RegionRenderer;
(function (RegionRenderer) {
    var audioRenderStrategy = studio_core_1.AudioRenderer.DefaultStrategy;
    RegionRenderer.setAudioRenderStrategy = function (strategy) { audioRenderStrategy = strategy; };
    RegionRenderer.render = function (context, tracks, range, index) {
        var canvas = context.canvas;
        var width = canvas.width, height = canvas.height;
        var fontFamily = getComputedStyle(canvas).fontFamily;
        // subtract one pixel to avoid making special cases for a possible outline
        var unitMin = range.unitMin - range.unitPadding - range.unitsPerPixel;
        var unitMax = range.unitMax;
        var dpr = devicePixelRatio;
        var cssLabelHeight = RegionLabel_1.RegionLabel.labelHeight();
        var fontSize = RegionLabel_1.RegionLabel.fontSize() * dpr;
        var labelHeight = cssLabelHeight * dpr;
        var bound = { top: cssLabelHeight + 1, bottom: canvas.clientHeight - 2 };
        context.clearRect(0, 0, width, height);
        context.textBaseline = "middle";
        context.font = "".concat(fontSize, "px ").concat(fontFamily);
        var grid = true;
        if (grid) {
            var signatureTrack = tracks.service.project.timelineBoxAdapter.signatureTrack;
            context.fillStyle = "rgba(0, 0, 0, 0.3)";
            studio_core_1.TimeGrid.fragment(signatureTrack, range, function (_a) {
                var pulse = _a.pulse;
                var x0 = Math.floor(range.unitToX(pulse)) * dpr;
                context.fillRect(x0, 0, dpr, height);
            }, { minLength: 32 });
        }
        var renderRegions = function (strategy, filterSelected, hideSelected) {
            var _a;
            var optTrack = tracks.getByIndex(strategy.translateTrackIndex(index));
            if (optTrack.isEmpty()) {
                return;
            }
            var trackBoxAdapter = optTrack.unwrap().trackBoxAdapter;
            var trackDisabled = !trackBoxAdapter.enabled.getValue();
            var regions = strategy.iterateRange(trackBoxAdapter.regions.collection, unitMin, unitMax);
            var _loop_1 = function (region, next) {
                if (region.isSelected ? hideSelected : !filterSelected) {
                    return "continue";
                }
                var actualComplete = strategy.readComplete(region);
                var position = strategy.readPosition(region);
                var complete = region.isSelected
                    ? actualComplete
                    : // for no-stretched audio region
                        Math.min(actualComplete, (_a = next === null || next === void 0 ? void 0 : next.position) !== null && _a !== void 0 ? _a : Number.POSITIVE_INFINITY);
                var x0Int = Math.floor(range.unitToX(Math.max(position, unitMin))) * dpr;
                var x1Int = Math.max(Math.floor(range.unitToX(Math.min(complete, unitMax)) - 1) * dpr, x0Int + dpr);
                var xnInt = x1Int - x0Int;
                var _d = RegionPaintBucket_1.RegionPaintBucket.create(region, region.isSelected && !filterSelected, trackDisabled), labelColor = _d.labelColor, labelBackground = _d.labelBackground, contentColor = _d.contentColor, contentBackground = _d.contentBackground, loopStrokeColor = _d.loopStrokeColor;
                context.clearRect(x0Int, 0, xnInt, height);
                context.fillStyle = labelBackground;
                context.fillRect(x0Int, 0, xnInt, labelHeight);
                context.fillStyle = contentBackground;
                context.fillRect(x0Int, labelHeight, xnInt, height - labelHeight);
                var maxTextWidth = xnInt - 3 * dpr; // subtract text-padding
                context.fillStyle = labelColor;
                if (strategy.readMirror(region)) {
                    context.font = "italic ".concat(fontSize, "px ").concat(fontFamily);
                }
                else {
                    context.font = "".concat(fontSize, "px ").concat(fontFamily);
                }
                var text = region.label.length === 0 ? "◻" : region.label;
                context.fillText(lib_dom_1.Context2d.truncateText(context, text, maxTextWidth).text, x0Int + 3 * dpr, 1 + labelHeight / 2);
                if (!region.hasCollection) {
                    return "continue";
                }
                context.fillStyle = contentColor;
                region.accept({
                    visitNoteRegionBoxAdapter: function (region) {
                        var optCollection = region.optCollection;
                        if (optCollection.isEmpty()) {
                            return;
                        }
                        for (var _i = 0, _a = lib_dsp_1.LoopableRegion.locateLoops({
                            position: position,
                            complete: complete,
                            loopOffset: strategy.readLoopOffset(region),
                            loopDuration: strategy.readLoopDuration(region)
                        }, unitMin, unitMax); _i < _a.length; _i++) {
                            var pass = _a[_i];
                            if (pass.index > 0) {
                                var x = Math.floor(range.unitToX(pass.resultStart) * dpr);
                                context.fillStyle = loopStrokeColor;
                                context.fillRect(x, labelHeight, 1, height - labelHeight);
                            }
                            studio_core_1.NotesRenderer.render(context, range, optCollection.unwrap(), bound, contentColor, pass);
                        }
                    },
                    visitAudioRegionBoxAdapter: function (region) {
                        for (var _i = 0, _a = lib_dsp_1.LoopableRegion.locateLoops({
                            position: position,
                            complete: complete,
                            loopOffset: strategy.readLoopOffset(region),
                            loopDuration: strategy.readLoopDuration(region)
                        }, unitMin, unitMax); _i < _a.length; _i++) {
                            var pass = _a[_i];
                            if (pass.index > 0) {
                                var x = Math.floor(range.unitToX(pass.resultStart) * dpr);
                                context.fillStyle = loopStrokeColor;
                                context.fillRect(x, labelHeight, 1, height - labelHeight);
                            }
                            var tempoMap = region.trackBoxAdapter.unwrap().context.tempoMap;
                            studio_core_1.AudioRenderer.render(context, range, region.file, tempoMap, region.observableOptPlayMode, region.waveformOffset.getValue(), region.gain.getValue(), bound, contentColor, pass, true, audioRenderStrategy);
                        }
                        studio_core_1.AudioFadingRenderer.render(context, range, region.fading, bound, position, complete, labelBackground);
                        var isRecording = region.file.getOrCreateLoader().state.type === "record";
                        if (isRecording) { }
                    },
                    visitValueRegionBoxAdapter: function (region) {
                        var padding = dpr;
                        var top = labelHeight + padding;
                        var bottom = height - padding * 2;
                        context.save();
                        context.beginPath();
                        context.rect(x0Int + padding, top, x1Int - x0Int - padding, bottom - top + padding);
                        context.clip();
                        var valueToY = function (value) { return bottom + value * (top - bottom); };
                        var events = region.events.unwrap();
                        for (var _i = 0, _a = lib_dsp_1.LoopableRegion.locateLoops({
                            position: position,
                            complete: complete,
                            loopOffset: strategy.readLoopOffset(region),
                            loopDuration: strategy.readLoopDuration(region)
                        }, unitMin, unitMax); _i < _a.length; _i++) {
                            var pass = _a[_i];
                            if (pass.index > 0) {
                                var x = Math.floor(range.unitToX(pass.resultStart) * dpr);
                                context.fillStyle = loopStrokeColor;
                                context.fillRect(x, labelHeight, 1, height - labelHeight);
                            }
                            var windowMin = pass.resultStart - pass.rawStart;
                            var windowMax = pass.resultEnd - pass.rawStart;
                            context.strokeStyle = contentColor;
                            context.beginPath();
                            var adapters = lib_dsp_1.ValueEvent.iterateWindow(events, windowMin, windowMax);
                            studio_core_1.ValueStreamRenderer.render(context, range, adapters, valueToY, contentColor, 0.2, 0.0, pass);
                            context.stroke();
                        }
                        context.restore();
                    }
                });
                var isEditing = tracks.service.project.userEditingManager.timeline.isEditing(region.box);
                if (isEditing) {
                    context.fillStyle = labelBackground;
                    context.fillRect(x1Int - dpr, labelHeight, dpr, height - labelHeight - dpr);
                    context.fillRect(x0Int, labelHeight, dpr, height - labelHeight - dpr);
                    context.fillRect(x0Int, height - dpr, xnInt, height - dpr);
                }
            };
            for (var _i = 0, _b = lib_std_1.Iterables.pairWise(regions); _i < _b.length; _i++) {
                var _c = _b[_i], region = _c[0], next = _c[1];
                _loop_1(region, next);
            }
        };
        var modifier = tracks.currentRegionModifier;
        var strategy = modifier.unwrapOrElse(studio_core_1.RegionModifyStrategies.Identity);
        renderRegions(strategy.unselectedModifyStrategy(), true, !strategy.showOrigin());
        renderRegions(strategy.selectedModifyStrategy(), false, false);
    };
})(RegionRenderer || (exports.RegionRenderer = RegionRenderer = {}));
