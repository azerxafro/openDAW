"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
var Timeline_sass_inline_1 = require("./Timeline.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var TracksFooter_tsx_1 = require("@/ui/timeline/tracks/footer/TracksFooter.tsx");
var TimelineHeader_tsx_1 = require("@/ui/timeline/TimelineHeader.tsx");
var TimelineNavigation_tsx_1 = require("@/ui/timeline/TimelineNavigation.tsx");
var PrimaryTracks_1 = require("./tracks/primary/PrimaryTracks");
var AudioUnitsTimeline_tsx_1 = require("./tracks/audio-unit/AudioUnitsTimeline.tsx");
var ClipsHeader_tsx_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipsHeader.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Timeline_sass_inline_1.default, "Timeline");
var Timeline = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var project = service.project, timeline = service.timeline;
    var engine = project.engine;
    var snapping = timeline.snapping, clips = timeline.clips, followCursor = timeline.followCursor, _b = timeline.primaryVisibility, markers = _b.markers, tempo = _b.tempo;
    var snappingName = lib_jsx_1.Inject.value(snapping.unit.name);
    lifecycle.own(snapping.subscribe(function (snapping) { snappingName.value = snapping.unit.name; }));
    var timelineHeader = <TimelineHeader_tsx_1.TimelineHeader lifecycle={lifecycle} service={service}/>;
    var tracksFooter = <TracksFooter_tsx_1.TracksFooter lifecycle={lifecycle} service={service}/>;
    var element = (<div className={className}>
            {timelineHeader}
            <ClipsHeader_tsx_1.ClipsHeader lifecycle={lifecycle} service={service}/>
            <TimelineNavigation_tsx_1.TimelineNavigation lifecycle={lifecycle} service={service}/>
            <PrimaryTracks_1.PrimaryTracks lifecycle={lifecycle} service={service}/>
            <AudioUnitsTimeline_tsx_1.AudioUnitsTimeline lifecycle={lifecycle} service={service}/>
            {tracksFooter}
        </div>);
    var updateRecordingState = function () {
        return element.classList.toggle("recording", engine.isRecording.getValue() || engine.isCountingIn.getValue());
    };
    var request = lifecycle.own((0, lib_dom_1.deferNextFrame)(function () {
        return element.classList.toggle("primary-tracks-visible", markers.getValue() || tempo.getValue());
    })).request;
    lifecycle.ownAll(lib_dom_1.Html.watchResize(element, function () {
        var cursorHeight = element.clientHeight
            - timelineHeader.clientHeight
            - tracksFooter.clientHeight;
        element.style.setProperty("--cursor-height", "".concat(cursorHeight - 1, "px"));
    }), engine.isRecording.subscribe(updateRecordingState), engine.isCountingIn.subscribe(updateRecordingState), followCursor.subscribe(function (owner) {
        if (owner.getValue()) {
            var range = service.timeline.range;
            var position = engine.position.getValue();
            if (position < range.unitMin || position > range.unitMax) {
                range.moveToUnit(position);
            }
        }
    }), engine.position.subscribe((function () {
        var lastPosition = 0;
        return function (owner) {
            if (!followCursor.getValue() || service.regionModifierInProgress) {
                return;
            }
            var range = service.timeline.range;
            var position = owner.getValue();
            if (lastPosition <= range.unitMax && position > range.unitMax) {
                range.moveUnitBy(range.unitMax - range.unitMin);
            }
            else if (lastPosition >= range.unitMin && position < range.unitMin) {
                range.moveUnitBy(range.unitMin - range.unitMax);
            }
            lastPosition = position;
        };
    })()), clips.visible.catchupAndSubscribe(function (owner) { return element.classList.toggle("clips-visible", owner.getValue()); }), clips.count.catchupAndSubscribe(function (owner) { return element.style.setProperty("--clips-count", String(owner.getValue())); }), markers.catchupAndSubscribe(request), tempo.catchupAndSubscribe(request));
    return element;
};
exports.Timeline = Timeline;
