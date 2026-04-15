"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamPeakMeter = void 0;
var StreamPeakMeter_sass_inline_1 = require("./StreamPeakMeter.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(StreamPeakMeter_sass_inline_1.default, "StreamPeakMeter");
var StreamPeakMeter = function (_a) {
    var lifecycle = _a.lifecycle, peaks = _a.peaks;
    var element = (<div className={className}/>);
    var numChannels = peaks.length;
    var gradientID = lib_dom_1.Html.nextID();
    var animation = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(lib_dom_1.Html.watchResize(element, function () {
        if (!element.isConnected) {
            return;
        }
        lib_dom_1.Html.empty(element);
        var barHeight = 2;
        var barPadding = 1;
        var mapping = lib_std_1.ValueMapping.linear(-48, 6);
        var s0 = "".concat(mapping.x(-18));
        var s1 = "".concat(mapping.x(0));
        var width = element.clientWidth;
        var height = numChannels * barHeight + (numChannels + 1) * barPadding;
        var innerWidth = width - barPadding * 2;
        var bars = lib_std_1.Arrays.create(function (channelIndex) {
            var y = barPadding + (barHeight + barPadding) * channelIndex;
            return (<rect x={barPadding} y={y} width={0} height={barHeight} rx="1" ry="1" fill={"url(#".concat(gradientID, ")")}/>);
        }, numChannels);
        element.appendChild(<svg viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height}>
                <defs>
                    <linearGradient id={gradientID} x1={barPadding} x2={innerWidth} y1="0" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset={s0} stop-color={studio_enums_1.Colors.green}/>
                        <stop offset={s0} stop-color={studio_enums_1.Colors.yellow}/>
                        <stop offset={s1} stop-color={studio_enums_1.Colors.yellow}/>
                        <stop offset={s1} stop-color={studio_enums_1.Colors.red}/>
                    </linearGradient>
                </defs>
                {bars}
            </svg>);
        animation.terminate();
        animation.own(lib_dom_1.AnimationFrame.add(function () {
            peaks.forEach(function (db, index) {
                var bar = bars[index];
                var ratio = db === Number.NEGATIVE_INFINITY ? 0.0 : mapping.x(db);
                var barWidth = Math.ceil(innerWidth * ratio);
                bar.x.baseVal.value = barPadding;
                bar.width.baseVal.value = barWidth;
            });
        }));
    }));
    return element;
};
exports.StreamPeakMeter = StreamPeakMeter;
