"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerTrack = void 0;
var MarkerTrack_sass_inline_1 = require("./MarkerTrack.sass?inline");
var MarkerTrackBody_tsx_1 = require("@/ui/timeline/tracks/primary/marker/MarkerTrackBody.tsx");
var MarkerTrackHeader_tsx_1 = require("@/ui/timeline/tracks/primary/marker/MarkerTrackHeader.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(MarkerTrack_sass_inline_1.default, "MarkerTrack");
var MarkerTrack = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    return (<div className={className}>
            <MarkerTrackHeader_tsx_1.MarkerTrackHeader lifecycle={lifecycle} editing={service.project.editing} timelineBox={service.project.timelineBox}/>
            <div className="void"/>
            <MarkerTrackBody_tsx_1.MarkerTrackBody lifecycle={lifecycle} service={service}/>
        </div>);
};
exports.MarkerTrack = MarkerTrack;
