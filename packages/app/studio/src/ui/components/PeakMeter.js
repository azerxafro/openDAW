"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeakMeter = void 0;
var PeakMeter_sass_inline_1 = require("./PeakMeter.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(PeakMeter_sass_inline_1.default, "peak-meter");
var PeakMeter = function (_a) {
    var lifecycle = _a.lifecycle, peaks = _a.peaks, channelWidthInEm = _a.channelWidthInEm, channelOffsetInEm = _a.channelOffsetInEm;
    var element = <div className={className} data-class="peak-meter"/>;
    var channelWidth = channelWidthInEm !== null && channelWidthInEm !== void 0 ? channelWidthInEm : 0.3;
    var channelOffset = channelOffsetInEm !== null && channelOffsetInEm !== void 0 ? channelOffsetInEm : 0.125;
    var numChannels = peaks.length;
    var peakHolds = lib_std_1.Arrays.create(function () { return ({
        time: 0,
        value: Number.NEGATIVE_INFINITY
    }); }, numChannels);
    var gradientID = lib_dom_1.Html.nextID();
    var animation = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(lib_dom_1.Html.watchResize(element, function () {
        if (!element.isConnected) {
            return;
        }
        lib_dom_1.Html.empty(element);
        var computedStyle = getComputedStyle(element);
        var emInPixels = parseFloat(computedStyle.fontSize);
        var channelWidthPX = channelWidth * emInPixels;
        var channelOffsetPX = channelOffset * emInPixels;
        var paddingInPX = emInPixels * 0.125;
        var mapping = lib_std_1.ValueMapping.linear(-60, 6);
        var s0 = "".concat(mapping.x(-18));
        var s1 = "".concat(mapping.x(0));
        var s1bar = "".concat(mapping.x(1));
        var barsWidth = numChannels * channelWidthPX + (numChannels - 1) * channelOffsetPX;
        var width = barsWidth + paddingInPX + emInPixels;
        var height = element.clientHeight;
        var trackHeight = height - paddingInPX * 2;
        var backgroundGradientID = lib_dom_1.Html.nextID();
        var backgrounds = lib_std_1.Arrays.create(function (channelIndex) {
            var x = (channelWidthPX + channelOffsetPX) * channelIndex + paddingInPX;
            return <rect classList="bar-background" x={x} y={paddingInPX} width={channelWidthPX} height={trackHeight} rx="1" ry="1" fill={"url(#".concat(backgroundGradientID, ")")}/>;
        }, numChannels);
        var bars = lib_std_1.Arrays.create(function (channelIndex) {
            var x = (channelWidthPX + channelOffsetPX) * channelIndex + paddingInPX;
            return <rect classList="bar" x={x} y={paddingInPX} width={channelWidthPX} height={0} rx="1" ry="1" fill={"url(#".concat(gradientID, ")")}/>;
        }, numChannels);
        var peakLines = lib_std_1.Arrays.create(function (channelIndex) {
            var x = (channelWidthPX + channelOffsetPX) * channelIndex + paddingInPX;
            return (<rect classList="peak-hold" x={x} y={paddingInPX + trackHeight} width={channelWidthPX} height={1} opacity={0.33} fill={"url(#".concat(gradientID, ")")}/>);
        }, numChannels);
        var strokes = (<g stroke={studio_enums_1.Colors.dark} stroke-width={1} fill="none"/>);
        var labels = (<g stroke="none" fill={studio_enums_1.Colors.dark} style={{ fontSize: "0.4375em" }}/>);
        for (var db = -54; db <= 0; db += 6) {
            var y = paddingInPX + trackHeight * (1.0 - mapping.x(db));
            strokes.append(<line x1="1" x2="2" y1={y} y2={y}></line>);
            labels.append(<text x="3" y={"".concat(y + 0.5)} alignment-baseline="middle">{"".concat(Math.abs(db))}</text>);
        }
        labels.append(<text x="3" y={"".concat(trackHeight)} alignment-baseline="middle">db</text>);
        element.appendChild(<svg viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height}>
                <defs>
                    <linearGradient id={backgroundGradientID} x1="0" x2="0" y2={paddingInPX} y1={trackHeight} gradientUnits="userSpaceOnUse">
                        <stop offset={s0} stop-color={studio_enums_1.Colors.green.brightness(-50).opacity(0.03)}/>
                        <stop offset={s0} stop-color={studio_enums_1.Colors.yellow.brightness(-50).opacity(0.03)}/>
                        <stop offset={s1} stop-color={studio_enums_1.Colors.yellow.brightness(-50).opacity(0.03)}/>
                        <stop offset={s1} stop-color={studio_enums_1.Colors.red.brightness(-50).opacity(0.03)}/>
                    </linearGradient>
                    <linearGradient id={gradientID} x1="0" x2="0" y2={paddingInPX} y1={trackHeight} gradientUnits="userSpaceOnUse">
                        <stop offset={s0} stop-color={studio_enums_1.Colors.green}/>
                        <stop offset={s0} stop-color={studio_enums_1.Colors.yellow}/>
                        <stop offset={s1bar} stop-color={studio_enums_1.Colors.yellow}/>
                        <stop offset={s1bar} stop-color={studio_enums_1.Colors.red}/>
                    </linearGradient>
                </defs>
                <rect classList="background" width={barsWidth + paddingInPX * 2} height={height} rx={paddingInPX} ry={paddingInPX}/>
                {backgrounds}
                {bars}
                {peakLines}
                {<g transform={"translate(".concat(barsWidth + paddingInPX + emInPixels * 0.125, ", 0)")}>
                    {strokes}
                    {labels}
                </g>}
            </svg>);
        animation.terminate();
        animation.own(lib_dom_1.AnimationFrame.add(function () {
            var now = Date.now();
            peaks.forEach(function (db, index) {
                var bar = bars[index];
                var ratio = db === Number.NEGATIVE_INFINITY ? 0.0 : mapping.x(db);
                var barHeight = Math.ceil(trackHeight * ratio);
                bar.y.baseVal.value = paddingInPX + (trackHeight - barHeight);
                bar.height.baseVal.value = barHeight;
                var peakHold = peakHolds[index];
                if (peakHold.value <= db) {
                    peakHold.value = db;
                    peakHold.time = now;
                }
                else if (now - peakHold.time >= 2000) {
                    peakHold.value -= 0.25;
                }
                var peakRatio = peakHold.value === Number.NEGATIVE_INFINITY ? 0.0 : mapping.x(peakHold.value);
                var peakY = paddingInPX + trackHeight * (1.0 - peakRatio);
                var peakLine = peakLines[index];
                peakLine.y.baseVal.value = peakY;
                peakLine.style.display = peakRatio > 0 ? "" : "none";
            });
        }));
    }));
    return element;
};
exports.PeakMeter = PeakMeter;
