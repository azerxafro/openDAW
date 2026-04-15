"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipsHeader = void 0;
var ClipsHeader_sass_inline_1 = require("./ClipsHeader.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var className = lib_dom_1.Html.adoptStyleSheet(ClipsHeader_sass_inline_1.default, "ClipsHeader");
var ClipsHeader = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var resizer = <div className="resizer"/>;
    var element = (<div className={className}>{resizer}</div>);
    var runtime = lifecycle.own(new lib_std_1.Terminator());
    var project = service.project, timeline = service.timeline;
    var engine = project.engine, rootBoxAdapter = project.rootBoxAdapter;
    var clips = timeline.clips;
    var cells = [];
    var requestRebuild = (0, lib_dom_1.deferNextFrame)(function () {
        var count = clips.count.getValue();
        var _loop_1 = function (index) {
            var isPlaying = new lib_std_1.DefaultObservableValue(false);
            var terminator = lifecycle.spawn();
            var playIcon = <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Play} className="icon-play"/>;
            var stopIcon = <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Stop} className="icon-stop"/>;
            var selector = (<div className="selector">
                    <span>{index + 1}</span>
                    {playIcon}
                    {stopIcon}
                </div>);
            element.appendChild(selector);
            terminator.ownAll(lib_dom_1.Events.subscribe(playIcon, "pointerdown", function () {
                var clipsIds = [];
                rootBoxAdapter.audioUnits.adapters()
                    .forEach(function (unit) { return unit.tracks.values()
                    .forEach(function (track) { return track.clips.collection.getAdapterByIndex(index)
                    .ifSome(function (clip) { if (!clip.mute) {
                    clipsIds.push(clip.uuid);
                } }); }); });
                engine.scheduleClipPlay(clipsIds);
            }), lib_dom_1.Events.subscribe(stopIcon, "pointerdown", function () {
                var trackIds = [];
                rootBoxAdapter.audioUnits.adapters()
                    .forEach(function (unit) { return unit.tracks.values()
                    .forEach(function (track) { return trackIds.push(track.uuid); }); });
                engine.scheduleClipStop(trackIds);
            }), TextTooltip_1.TextTooltip.default(playIcon, function () { return "Schedule column to play"; }), TextTooltip_1.TextTooltip.default(stopIcon, function () { return "Schedule column to stop"; }));
            cells[index] = { terminator: terminator, selector: selector, isPlaying: isPlaying };
        };
        for (var index = cells.length; index < count; index++) {
            _loop_1(index);
        }
        if (count < cells.length) {
            cells
                .splice(count)
                .forEach(function (_a) {
                var terminator = _a.terminator, selector = _a.selector;
                selector.remove();
                terminator.terminate();
            });
        }
    }).request;
    lifecycle.ownAll(clips.visible.catchupAndSubscribe(function (owner) {
        runtime.terminate();
        if (owner.getValue()) {
            runtime.ownAll(clips.count.catchupAndSubscribe(requestRebuild), {
                terminate: function () {
                    while (cells.length > 0) {
                        var _a = cells.pop(), terminator = _a.terminator, selector = _a.selector;
                        selector.remove();
                        terminator.terminate();
                    }
                }
            });
            requestRebuild();
        }
    }), lib_dom_1.Dragging.attach(resizer, function (_a) {
        var beginPosition = _a.clientX;
        var beginValue = clips.count.getValue();
        var cellSize = parseInt(window.getComputedStyle(element).getPropertyValue("--clips-width")) + 1; // gaps
        return lib_std_1.Option.wrap({
            update: function (_a) {
                var newPosition = _a.clientX;
                var newValue = Math.max(0, beginValue + Math.round((newPosition - beginPosition) / cellSize));
                clips.count.setValue(Math.max(1, newValue));
                clips.visible.setValue(newValue > 0);
            },
            cancel: function () { }
        });
    }));
    return element;
};
exports.ClipsHeader = ClipsHeader;
