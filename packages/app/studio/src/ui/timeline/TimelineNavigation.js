"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineNavigation = void 0;
var TimelineNavigation_sass_inline_1 = require("./TimelineNavigation.sass?inline");
var LoopAreaEditor_tsx_1 = require("@/ui/timeline/LoopAreaEditor.tsx");
var TimeAxis_tsx_1 = require("@/ui/timeline/TimeAxis.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TimelineNavigation_sass_inline_1.default, "TimelineNavigation");
var TimelineNavigation = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var _b = service.timeline, range = _b.range, snapping = _b.snapping;
    var _c = service.project, editing = _c.editing, timelineBox = _c.timelineBox;
    return (<div className={className}>
            <LoopAreaEditor_tsx_1.LoopAreaEditor lifecycle={lifecycle} range={range} snapping={snapping} editing={editing} loopArea={timelineBox.loopArea}/>
            <TimeAxis_tsx_1.TimeAxis lifecycle={lifecycle} service={service} snapping={snapping} range={range}/>
        </div>);
};
exports.TimelineNavigation = TimelineNavigation;
