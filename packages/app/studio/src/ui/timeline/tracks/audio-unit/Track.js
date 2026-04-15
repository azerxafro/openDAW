"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
var Track_sass_inline_1 = require("./Track.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var TrackHeader_tsx_1 = require("@/ui/timeline/tracks/audio-unit/headers/TrackHeader.tsx");
var ClipLane_tsx_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipLane.tsx");
var RegionLane_tsx_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionLane.tsx");
var className = lib_dom_1.Html.adoptStyleSheet(Track_sass_inline_1.default, "Track");
var Track = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, trackManager = _a.trackManager, audioUnitBoxAdapter = _a.audioUnitBoxAdapter, trackBoxAdapter = _a.trackBoxAdapter;
    var element = (<div className={className}>
            <TrackHeader_tsx_1.TrackHeader lifecycle={lifecycle} service={service} audioUnitBoxAdapter={audioUnitBoxAdapter} trackBoxAdapter={trackBoxAdapter}/>
            <ClipLane_tsx_1.ClipLane lifecycle={lifecycle} service={service} adapter={trackBoxAdapter} trackManager={trackManager}/>
            <RegionLane_tsx_1.RegionLane lifecycle={lifecycle} adapter={trackBoxAdapter} trackManager={trackManager} range={service.timeline.range}/>
        </div>);
    var indexField = trackBoxAdapter.indexField, enabled = trackBoxAdapter.box.enabled;
    lifecycle.ownAll(indexField.catchupAndSubscribe(function (owner) { return element.style.gridRow = String(owner.getValue() + 1); }), enabled.catchupAndSubscribe(function (owner) { return element.classList.toggle("mute", !owner.getValue()); }));
    return element;
};
exports.Track = Track;
