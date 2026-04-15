"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionBound = void 0;
var RegionBound_sass_inline_1 = require("./RegionBound.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var RegionCapturingTarget_ts_1 = require("@/ui/timeline/editors/RegionCapturingTarget.ts");
var cursor_ts_1 = require("@/ui/hooks/cursor.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(RegionBound_sass_inline_1.default, "RegionBound");
var RegionBound = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, range = _a.range;
    var regionSubscriber = lifecycle.own(new lib_std_1.Terminator());
    var editingRegion = service.project.userEditingManager.timeline;
    var canvas = <canvas />;
    var current = lib_std_1.Option.None;
    var capturing = (0, RegionCapturingTarget_ts_1.createRegionCapturing)(canvas, function () { return current; }, range);
    var requestUpdate = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
        if (current.isEmpty()) {
            return;
        }
        var editingRegion = current.unwrap();
        var height = painter.height, context = painter.context;
        var _a = getComputedStyle(canvas), fontFamily = _a.fontFamily, fontSize = _a.fontSize;
        var em = Math.ceil(parseFloat(fontSize) * devicePixelRatio);
        context.textBaseline = "middle";
        context.font = "".concat(em, "px ").concat(fontFamily);
        var unitMin = range.unitMin - range.unitPadding;
        var unitMax = range.unitMax;
        for (var _i = 0, _b = editingRegion.trackBoxAdapter.unwrap().regions.collection.iterateRange(unitMin, unitMax); _i < _b.length; _i++) {
            var region = _b[_i];
            for (var _c = 0, _d = lib_dsp_1.LoopableRegion.locateLoops(region, unitMin, unitMax); _c < _d.length; _c++) {
                var pass = _d[_c];
                var x0_1 = Math.floor((range.unitToX(pass.resultStart) + 1) * devicePixelRatio);
                var x1_1 = Math.floor(range.unitToX(pass.resultEnd) * devicePixelRatio);
                if (pass.index === 0) {
                    context.fillStyle = "hsla(".concat(region.hue, ", 60%, 30%, 0.5)");
                    context.fillRect(x0_1, 0, x1_1 - x0_1, height * devicePixelRatio);
                }
                else {
                    context.fillStyle = "hsla(".concat(region.hue, ", 60%, 30%, 0.25)");
                    context.fillRect(x0_1, 0, x1_1 - x0_1, height * devicePixelRatio);
                }
            }
            var x0_2 = Math.floor((range.unitToX(region.position) + 3) * devicePixelRatio);
            var x1_2 = Math.floor((range.unitToX(region.offset + Math.min(region.duration, region.loopDuration)) - 1) * devicePixelRatio);
            context.fillStyle = "hsl(".concat(region.hue, ", 60%, 60%)");
            var text = lib_dom_1.Context2d.truncateText(context, region.label, x1_2 - x0_2).text;
            context.fillText(text, x0_2, height * devicePixelRatio / 2.0 + 1);
        }
        var x0 = Math.floor((range.unitToX(editingRegion.position) + 1.5) * devicePixelRatio);
        var x1 = Math.floor((range.unitToX(Math.min(editingRegion.offset + editingRegion.loopDuration, editingRegion.complete)) - 0.5) * devicePixelRatio);
        context.strokeStyle = "hsl(".concat(editingRegion.hue, ", 60%, 30%)");
        context.lineWidth = devicePixelRatio;
        context.strokeRect(x0, 1, x1 - x0, (height - 1) * devicePixelRatio);
    })).requestUpdate;
    var listenToRegion = function (region) {
        return lib_std_1.Terminable.many(region.trackBoxAdapter.unwrap().regions.subscribeChanges(requestUpdate), region.box.regions.subscribe(function () {
            if (region.trackBoxAdapter.nonEmpty()) {
                listenToRegion(region);
            }
        }));
    };
    lifecycle.ownAll(range.subscribe(requestUpdate), editingRegion.catchupAndSubscribe(function (option) {
        regionSubscriber.terminate();
        current = option.flatMap(function (vertex) {
            if (studio_adapters_1.UnionBoxTypes.isRegionBox(vertex.box)) {
                return lib_std_1.Option.wrap(studio_adapters_1.RegionAdapters.for(service.project.boxAdapters, vertex.box));
            }
            else {
                return lib_std_1.Option.None;
            }
        });
        if (current.nonEmpty()) {
            regionSubscriber.own(listenToRegion(current.unwrap()));
        }
        requestUpdate();
    }), (0, cursor_ts_1.installCursor)(canvas, capturing, {
        get: function (_target) { return null; } /* TODO{
            if (target === null) {return null}
            switch (target.type) {
                case "region-position":
                    return "move"
                case "region-start":
                    return "w-resize"
                case "region-complete":
                    return "e-resize"
                case "loop-duration":
                    return Cursor.ExpandWidth
                default:
                    return panic()
            }
        }*/
    }));
    return (<div className={className}>
            {canvas}
        </div>);
};
exports.RegionBound = RegionBound;
