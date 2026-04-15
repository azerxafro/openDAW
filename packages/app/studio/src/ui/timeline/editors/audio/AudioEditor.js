"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioEditor = void 0;
var AudioEditor_sass_inline_1 = require("./AudioEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var AudioEditorCanvas_tsx_1 = require("@/ui/timeline/editors/audio/AudioEditorCanvas.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var TransientMarkerEditor_1 = require("@/ui/timeline/editors/audio/TransientMarkerEditor");
var WarpMarkerEditor_1 = require("@/ui/timeline/editors/audio/WarpMarkerEditor");
var AudioEditorHeader_1 = require("@/ui/timeline/editors/audio/AudioEditorHeader");
var className = lib_dom_1.Html.adoptStyleSheet(AudioEditor_sass_inline_1.default, "AudioEditor");
var AudioEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, range = _a.range, snapping = _a.snapping, reader = _a.reader;
    var hoverTransient = new lib_std_1.DefaultObservableValue(null);
    var cursorModel = new lib_std_1.DefaultObservableValue(null);
    return (<div className={className}>
            <lib_jsx_1.Frag>
                <div className="label"><h5>Transients</h5></div>
                <div className="label"><h5>Warp Markers</h5></div>
                <AudioEditorHeader_1.AudioEditorHeader lifecycle={lifecycle} project={service.project} reader={reader}/>
            </lib_jsx_1.Frag>
            <lib_jsx_1.Frag>
                <TransientMarkerEditor_1.TransientMarkerEditor lifecycle={lifecycle} project={service.project} range={range} snapping={snapping} reader={reader} hoverTransient={hoverTransient}/>
                <WarpMarkerEditor_1.WarpMarkerEditor lifecycle={lifecycle} project={service.project} range={range} snapping={snapping} reader={reader} hoverTransient={hoverTransient} cursorModel={cursorModel}/>
                <AudioEditorCanvas_tsx_1.AudioEditorCanvas lifecycle={lifecycle} project={service.project} range={range} snapping={snapping} reader={reader} cursorModel={cursorModel}/>
            </lib_jsx_1.Frag>
        </div>);
};
exports.AudioEditor = AudioEditor;
