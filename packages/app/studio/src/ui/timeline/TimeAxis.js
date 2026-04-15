"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeAxis = void 0;
var TimeAxis_sass_inline_1 = require("./TimeAxis.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var DblClckTextInput_1 = require("@/ui/wrapper/DblClckTextInput");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var WheelScaling_1 = require("@/ui/timeline/WheelScaling");
var className = lib_dom_1.Html.adoptStyleSheet(TimeAxis_sass_inline_1.default, "time-axis");
var MIN_TRACK_DURATION = 8 * lib_dsp_1.PPQN.Bar;
var MAX_TRACK_DURATION = 1024 * lib_dsp_1.PPQN.Bar;
var TimeAxis = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, snapping = _a.snapping, range = _a.range, mapper = _a.mapper;
    var endMarkerPosition = null;
    var _b = service.project, durationInPulses = _b.timelineBox.durationInPulses, signatureTrack = _b.timelineBoxAdapter.signatureTrack, engine = _b.engine, editing = _b.editing;
    var position = engine.position, playbackTimestamp = engine.playbackTimestamp;
    var canvas = (<canvas />);
    var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (_a) {
        var context = _a.context;
        var height = canvas.height;
        var _b = getComputedStyle(canvas), fontFamily = _b.fontFamily, fontSize = _b.fontSize;
        context.fillStyle = studio_enums_1.Colors.shadow.toString();
        context.textBaseline = "alphabetic";
        context.font = "".concat(parseFloat(fontSize) * devicePixelRatio, "px ").concat(fontFamily);
        var textY = height - 4 * devicePixelRatio;
        studio_core_1.TimeGrid.fragment(signatureTrack, range, function (_a) {
            var bars = _a.bars, beats = _a.beats, isBar = _a.isBar, isBeat = _a.isBeat, pulse = _a.pulse;
            var x = Math.floor(range.unitToX(pulse)) * devicePixelRatio;
            var textX = x + 5;
            if (isBar) {
                context.fillRect(x, 0, devicePixelRatio, height);
                context.fillText((bars + 1).toFixed(0), textX, textY);
            }
            else if (isBeat) {
                context.fillRect(x, height * 0.5, 1, height * 0.5);
                context.fillRect(x, height * 0.5, 4, 1);
                context.fillText((bars + 1) + "•" + (beats + 1), textX, textY);
            }
            else {
                context.fillRect(x, height * 0.5, 1, height * 0.5);
            }
        });
        var pulse = engine.playbackTimestamp.getValue();
        var x = Math.floor(range.unitToX(pulse)) * devicePixelRatio;
        context.fillStyle = "rgba(255, 255, 255, 0.25)";
        context.fillRect(x, 0, 1, height);
    }));
    var cursorElement = <div className="cursor" data-component="cursor"/>;
    var updateCursor = function () {
        var pulses = (0, lib_std_1.isDefined)(mapper) ? mapper.mapPlaybackCursor(position.getValue()) : position.getValue();
        var x = Math.floor(range.unitToX(pulses));
        cursorElement.style.left = "".concat(x, "px");
        cursorElement.style.visibility = 0 < x && x < range.width ? "visible" : "hidden";
    };
    var endMarkerElement = <div className="end-marker" data-component="end-marker"/>;
    var updateEndMarker = function () {
        var pulses = endMarkerPosition !== null && endMarkerPosition !== void 0 ? endMarkerPosition : durationInPulses.getValue();
        endMarkerElement.style.left = "".concat(Math.floor(range.unitToX(pulses)), "px");
        endMarkerElement.style.visibility = range.unitMin <= pulses && pulses < range.unitMax ? "visible" : "hidden";
    };
    var onResize = function () {
        if (!canvas.isConnected) {
            return;
        }
        range.width = canvas.clientWidth;
        painter.requestUpdate();
        updateCursor();
        updateEndMarker();
    };
    lifecycle.ownAll(range.subscribe(updateCursor), range.subscribe(updateEndMarker), position.subscribe(updateCursor), durationInPulses.catchupAndSubscribe(function () { return updateEndMarker(); }), lib_dom_1.Dragging.attach(canvas, function () { return lib_std_1.Option.wrap({
        update: function (event) {
            var x = event.clientX - canvas.getBoundingClientRect().left;
            var p = Math.max(0, range.xToUnit(x));
            engine.setPosition(snapping.round(p));
            if (p < range.unitMin) {
                range.moveToUnit(p);
            }
            else if (p > range.unitMax) {
                range.moveToUnit(p - range.unitRange);
            }
        }
    }); }, { immediate: true, permanentUpdates: false }), TextTooltip_1.TextTooltip.simple(endMarkerElement, function () {
        var rect = endMarkerElement.getBoundingClientRect();
        return ({
            text: "Double-click to edit",
            clientX: rect.left,
            clientY: rect.top + 24
        });
    }), WheelScaling_1.WheelScaling.install(canvas, range), lib_dom_1.Html.watchResize(canvas, onResize), range.subscribe(painter.requestUpdate), playbackTimestamp.subscribe(painter.requestUpdate), signatureTrack.subscribe(painter.requestUpdate));
    return (<div className={className} tabIndex={-1} onmousedown={function (event) { return event.preventDefault(); }}>
            {canvas}
            <DblClckTextInput_1.DblClckTextInput resolversFactory={function () {
            var resolvers = Promise.withResolvers();
            resolvers.promise.then(function (value) {
                var number = parseFloat(value);
                if (isNaN(number)) {
                    return;
                }
                editing.modify(function () { return durationInPulses.setValue((0, lib_std_1.clamp)((number - 1) * lib_dsp_1.PPQN.Bar, MIN_TRACK_DURATION, MAX_TRACK_DURATION)); });
            }, lib_std_1.EmptyExec);
            return resolvers;
        }} provider={function () { return ({
            unit: "bars",
            value: (signatureTrack.toParts(durationInPulses.getValue()).bars + 1).toString()
        }); }} location={function () {
            var rect = endMarkerElement.getBoundingClientRect();
            return { x: rect.left - 32, y: rect.top };
        }}>
                {endMarkerElement}
            </DblClckTextInput_1.DblClckTextInput>
            {cursorElement}
        </div>);
};
exports.TimeAxis = TimeAxis;
