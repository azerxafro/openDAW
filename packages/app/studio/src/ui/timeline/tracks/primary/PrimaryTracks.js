"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryTracks = void 0;
var PrimaryTracks_sass_inline_1 = require("./PrimaryTracks.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var MarkerTrack_1 = require("./marker/MarkerTrack");
var lib_dom_1 = require("@opendaw/lib-dom");
var TempoTrack_1 = require("@/ui/timeline/tracks/primary/tempo/TempoTrack");
var SignatureTrack_1 = require("@/ui/timeline/tracks/primary/signature/SignatureTrack");
var className = lib_dom_1.Html.adoptStyleSheet(PrimaryTracks_sass_inline_1.default, "primary-tracks");
var PrimaryTracks = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var _b = service.timeline.primaryVisibility, markers = _b.markers, tempo = _b.tempo, signature = _b.signature;
    var element = (<div className={className}/>);
    var trackTerminator = lifecycle.own(new lib_std_1.Terminator());
    var request = lifecycle.own((0, lib_dom_1.deferNextFrame)(function () {
        trackTerminator.terminate();
        var isMarkerTrackVisible = markers.getValue();
        var isTempoTrackVisible = tempo.getValue();
        var isSignatureTrackVisible = signature.getValue();
        var anyPrimaryTrackVisible = isMarkerTrackVisible || isTempoTrackVisible || isSignatureTrackVisible;
        element.classList.toggle("hidden", !anyPrimaryTrackVisible);
        if (anyPrimaryTrackVisible) {
            (0, lib_jsx_1.replaceChildren)(element, <lib_jsx_1.Frag>
                    {isMarkerTrackVisible && <MarkerTrack_1.MarkerTrack lifecycle={trackTerminator} service={service}/>}
                    {isSignatureTrackVisible && <SignatureTrack_1.SignatureTrack lifecycle={trackTerminator} service={service}/>}
                    {isTempoTrackVisible && <TempoTrack_1.TempoTrack lifecycle={trackTerminator} service={service}/>}
                </lib_jsx_1.Frag>);
        }
    })).request;
    lifecycle.ownAll(markers.catchupAndSubscribe(request), tempo.catchupAndSubscribe(request), signature.catchupAndSubscribe(request));
    return element;
};
exports.PrimaryTracks = PrimaryTracks;
