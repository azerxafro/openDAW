"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicePeakMeter = void 0;
var DevicePeakMeter_sass_inline_1 = require("./DevicePeakMeter.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(DevicePeakMeter_sass_inline_1.default, "DevicePeakMeter");
var DevicePeakMeter = function (_a) {
    var lifecycle = _a.lifecycle, receiver = _a.receiver, address = _a.address;
    var element = (<div className={className}/>);
    var peaks = new Float32Array(2);
    var numChannels = 2;
    var gradientID = lib_dom_1.Html.nextID();
    var animation = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(lib_dom_1.Html.watchResize(element, function () {
        if (!element.isConnected) {
            return;
        }
        lib_dom_1.Html.empty(element);
        var barWidth = 2;
        var barPadding = 1;
        var mapping = lib_std_1.ValueMapping.linear(-60, 6);
        var s0 = "".concat(mapping.x(-18));
        var s1 = "".concat(mapping.x(0));
        var width = numChannels * barWidth + (numChannels + 1) * barPadding;
        var height = element.clientHeight;
        var innerHeight = height - barPadding * 2;
        var bars = lib_std_1.Arrays.create(function (channelIndex) {
            var x = barPadding + (barWidth + barPadding) * channelIndex;
            return <rect x={x} y={barPadding} width={barWidth} height={0} rx="1" ry="1" fill={"url(#".concat(gradientID, ")")}/>;
        }, numChannels);
        element.appendChild(<svg viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height}>
                <defs>
                    <linearGradient id={gradientID} x1="0" x2="0" y2={barPadding} y1={innerHeight} gradientUnits="userSpaceOnUse">
                        <stop offset={s0} stop-color={studio_enums_1.Colors.green}/>
                        <stop offset={s0} stop-color={studio_enums_1.Colors.yellow}/>
                        <stop offset={s1} stop-color={studio_enums_1.Colors.yellow}/>
                        <stop offset={s1} stop-color={studio_enums_1.Colors.red}/>
                    </linearGradient>
                </defs>
                {bars}
            </svg>);
        animation.terminate();
        animation.own(receiver.subscribeFloats(address, function (values) {
            peaks[0] = (0, lib_dsp_1.gainToDb)(values[0]);
            peaks[1] = (0, lib_dsp_1.gainToDb)(values[1]);
            peaks.forEach(function (db, index) {
                var bar = bars[index];
                var ratio = db === Number.NEGATIVE_INFINITY ? 0.0 : mapping.x(db);
                var barHeight = Math.ceil(innerHeight * ratio);
                bar.y.baseVal.value = barPadding + (innerHeight - barHeight);
                bar.height.baseVal.value = barHeight;
            });
        }));
    }));
    return element;
};
exports.DevicePeakMeter = DevicePeakMeter;
