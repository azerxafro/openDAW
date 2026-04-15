"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksFooter = void 0;
var TracksFooter_sass_inline_1 = require("./TracksFooter.sass?inline");
var TimelineRangeSlider_tsx_1 = require("@/ui/timeline/TimelineRangeSlider.tsx");
var TracksFooterHeader_tsx_1 = require("@/ui/timeline/tracks/footer/TracksFooterHeader.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TracksFooter_sass_inline_1.default, "TracksFooter");
var TracksFooter = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    return (<div className={className}>
            <TracksFooterHeader_tsx_1.TracksFooterHeader />
            <div className="void"/>
            <TimelineRangeSlider_tsx_1.TimelineRangeSlider lifecycle={lifecycle} range={service.timeline.range} className="clips-aware"/>
        </div>);
};
exports.TracksFooter = TracksFooter;
