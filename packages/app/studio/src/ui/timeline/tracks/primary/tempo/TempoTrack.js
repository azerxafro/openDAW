"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoTrack = void 0;
var TempoTrack_sass_inline_1 = require("./TempoTrack.sass?inline");
var TempoTrackBody_tsx_1 = require("@/ui/timeline/tracks/primary/tempo/TempoTrackBody.tsx");
var TempoTrackHeader_tsx_1 = require("@/ui/timeline/tracks/primary/tempo/TempoTrackHeader.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var className = lib_dom_1.Html.adoptStyleSheet(TempoTrack_sass_inline_1.default, "TempoTrack");
var TempoTrack = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var _b = service.project, editing = _b.editing, timelineBox = _b.timelineBox;
    var bpmRange = [
        EditWrapper_1.EditWrapper.forValue(editing, timelineBox.tempoTrack.minBpm),
        EditWrapper_1.EditWrapper.forValue(editing, timelineBox.tempoTrack.maxBpm)
    ];
    return (<div className={className}>
            <TempoTrackHeader_tsx_1.TempoTrackHeader lifecycle={lifecycle} service={service} bpmRange={bpmRange}/>
            <div className="void"/>
            <TempoTrackBody_tsx_1.TempoTrackBody lifecycle={lifecycle} service={service} bpmRange={bpmRange}/>
        </div>);
};
exports.TempoTrack = TempoTrack;
