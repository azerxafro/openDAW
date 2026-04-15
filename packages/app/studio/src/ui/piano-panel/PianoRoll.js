"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoRoll = void 0;
var PianoRoll_sass_inline_1 = require("./PianoRoll.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var PianoRollLayout_ts_1 = require("@/ui/PianoRollLayout.ts");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var className = lib_dom_1.Html.adoptStyleSheet(PianoRoll_sass_inline_1.default, "PianoRoll");
var PianoRoll = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, updateNotifier = _a.updateNotifier;
    var project = service.project;
    var engine = project.engine, _b = project.rootBoxAdapter.pianoMode, keyboard = _b.keyboard, transpose = _b.transpose;
    var position = engine.position;
    var getPianoLayout = function () { return PianoRollLayout_ts_1.PianoRollLayout.Defaults()[keyboard.getValue()]; };
    var createSVG = function () {
        var pianoLayout = getPianoLayout();
        var _a = pianoLayout.sizes, whiteKeys = _a.whiteKeys, blackKeys = _a.blackKeys;
        return (<svg classList={className} viewBox={"0.5 0 ".concat(pianoLayout.whiteKeys.length * whiteKeys.width - 1, " ").concat((whiteKeys.height))} width="100%">
                {pianoLayout.whiteKeys.map(function (_a) {
                var key = _a.key, x = _a.x;
                return (<rect classList="white" data-key={key} x={x + 0.5} y={0} width={whiteKeys.width - 1} height={whiteKeys.height}/>);
            })}
                {pianoLayout.blackKeys.map(function (_a) {
                var key = _a.key, x = _a.x;
                return (<rect classList="black" data-key={key} x={x} y={2} width={blackKeys.width} height={blackKeys.height} rx={4} ry={4}/>);
            })}
            </svg>);
    };
    var svg = createSVG();
    var update = function (position) {
        svg.querySelectorAll("rect.playing")
            .forEach(function (rect) {
            rect.style.removeProperty("fill");
            rect.classList.remove("playing");
        });
        var pianoLayout = getPianoLayout();
        project.rootBoxAdapter.audioUnits.adapters().forEach(function (audioUnitAdapter) {
            var trackBoxAdapters = audioUnitAdapter.tracks.values()
                .filter(function (adapter) { return !adapter.box.excludePianoMode.getValue(); });
            trackBoxAdapters
                .forEach(function (trackAdapter) {
                var region = trackAdapter.regions.collection.lowerEqual(position);
                if (region === null || !(0, lib_std_1.isInstanceOf)(region, studio_adapters_1.NoteRegionBoxAdapter) || position >= region.complete) {
                    return;
                }
                var collection = region.optCollection.unwrap();
                var events = collection.events;
                var loopIterator = lib_dsp_1.LoopableRegion.locateLoops(region, position, position);
                for (var _i = 0, loopIterator_1 = loopIterator; _i < loopIterator_1.length; _i++) {
                    var _a = loopIterator_1[_i], resultStart = _a.resultStart, resultEnd = _a.resultEnd, rawStart = _a.rawStart;
                    var searchStart = Math.floor(resultStart - rawStart);
                    var searchEnd = Math.floor(resultEnd - rawStart);
                    for (var _b = 0, _c = events.iterateRange(searchStart - collection.maxDuration, searchEnd); _b < _c.length; _b++) {
                        var note = _c[_b];
                        if (note.position + rawStart <= position && position < note.complete + rawStart) {
                            var pitch = note.pitch + transpose.getValue();
                            if (pitch < pianoLayout.min || pitch > pianoLayout.max) {
                                continue;
                            }
                            var rect = svg.querySelector("[data-key=\"".concat(pitch, "\"]"));
                            if ((0, lib_std_1.isDefined)(rect)) {
                                rect.style.fill = pianoLayout.getFillStyle(region.hue, true);
                                rect.classList.add("playing");
                            }
                        }
                    }
                }
            });
        });
    };
    var placeholder = <lib_jsx_1.Group>{svg}</lib_jsx_1.Group>;
    lifecycle.ownAll(keyboard.subscribe(function () {
        svg.remove();
        svg = createSVG();
        placeholder.appendChild(svg);
    }), updateNotifier.subscribe(function () { return update(position.getValue()); }));
    update(position.getValue());
    return placeholder;
};
exports.PianoRoll = PianoRoll;
