"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionLane = void 0;
var RegionLane_sass_inline_1 = require("./RegionLane.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var RegionRenderer_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionRenderer.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(RegionLane_sass_inline_1.default, "RegionLane");
var RegionLane = function (_a) {
    var lifecycle = _a.lifecycle, trackManager = _a.trackManager, range = _a.range, adapter = _a.adapter;
    if (adapter.type === studio_adapters_1.TrackType.Undefined) {
        return <div className={lib_dom_1.Html.buildClassList(className, "deactive")}/>;
    }
    var updated = false;
    var visible = false;
    var canvas = <canvas />;
    var element = (<div className={className}>{canvas}</div>);
    var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (_a) {
        var context = _a.context;
        if (visible) {
            RegionRenderer_ts_1.RegionRenderer.render(context, trackManager, range, adapter.listIndex);
            updated = true;
        }
    }));
    var requestUpdate = function () {
        updated = false;
        painter.requestUpdate();
    };
    var timelineFocus = trackManager.service.project.timelineFocus;
    lifecycle.ownAll(range.subscribe(requestUpdate), adapter.regions.subscribeChanges(requestUpdate), adapter.enabled.subscribe(requestUpdate), trackManager.service.project.timelineBoxAdapter.catchupAndSubscribeSignature(requestUpdate), timelineFocus.track.catchupAndSubscribe(function (owner) {
        return element.classList.toggle("focused", owner.contains(adapter));
    }), lib_dom_1.Html.watchIntersection(element, function (entries) { return entries
        .forEach(function (_a) {
        var isIntersecting = _a.isIntersecting;
        visible = isIntersecting;
        if (!updated) {
            painter.requestUpdate();
        }
    }); }, { root: trackManager.scrollableContainer }));
    return element;
};
exports.RegionLane = RegionLane;
