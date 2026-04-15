"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureTrack = void 0;
var SignatureTrack_sass_inline_1 = require("./SignatureTrack.sass?inline");
var SignatureTrackBody_tsx_1 = require("@/ui/timeline/tracks/primary/signature/SignatureTrackBody.tsx");
var SignatureTrackHeader_tsx_1 = require("@/ui/timeline/tracks/primary/signature/SignatureTrackHeader.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(SignatureTrack_sass_inline_1.default, "SignatureTrack");
var SignatureTrack = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    return (<div className={className}>
            <SignatureTrackHeader_tsx_1.SignatureTrackHeader lifecycle={lifecycle} editing={service.project.editing} timelineBox={service.project.timelineBox}/>
            <div className="void"/>
            <SignatureTrackBody_tsx_1.SignatureTrackBody lifecycle={lifecycle} service={service}/>
        </div>);
};
exports.SignatureTrack = SignatureTrack;
