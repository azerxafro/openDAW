"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoTrackBody = void 0;
var TempoTrackBody_sass_inline_1 = require("./TempoTrackBody.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var ValueEditor_1 = require("@/ui/timeline/editors/value/ValueEditor");
var TempoValueContext_1 = require("@/ui/timeline/tracks/primary/tempo/TempoValueContext");
var TempoValueEventOwnerReader_1 = require("@/ui/timeline/tracks/primary/tempo/TempoValueEventOwnerReader");
var className = lib_dom_1.Html.adoptStyleSheet(TempoTrackBody_sass_inline_1.default, "TempoTrackBody");
var TempoTrackBody = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, bpmRange = _a.bpmRange;
    var timelineBoxAdapter = service.project.timelineBoxAdapter, _b = service.timeline, range = _b.range, snapping = _b.snapping;
    var editorLifecycle = lifecycle.own(new lib_std_1.Terminator());
    return (<div className={className} onInit={function (element) {
            // Chrome bug: grid item collapses to 0 height when containing flex children
            lifecycle.own(lib_dom_1.Html.watchResize(element, function () {
                // This is a fix for a bug in Chrome where grid items collapsing to 0 height
                // To reproduce: Remove this code, open tempo-track, add one event, add an instrument, canvas goes black
                // Works fine in Firefox and Safari
                var parent = element.parentElement;
                element.style.height = (0, lib_std_1.isDefined)(parent) && element.clientHeight === 0 ? "".concat(parent.clientHeight, "px") : "";
            }));
            timelineBoxAdapter.tempoTrackEvents.catchupAndSubscribe(function (option) {
                editorLifecycle.terminate();
                option.match({
                    none: function () { return lib_dom_1.Html.empty(element); },
                    some: function () {
                        var tempoValueContext = editorLifecycle.own(new TempoValueContext_1.TempoValueContext(timelineBoxAdapter, bpmRange));
                        return (0, lib_jsx_1.replaceChildren)(element, (<ValueEditor_1.ValueEditor lifecycle={editorLifecycle} service={service} range={range} snapping={snapping} context={tempoValueContext} eventMapping={tempoValueContext.valueMapping} reader={new TempoValueEventOwnerReader_1.TempoValueEventOwnerReader(timelineBoxAdapter)}/>));
                    }
                });
            });
        }}/>);
};
exports.TempoTrackBody = TempoTrackBody;
