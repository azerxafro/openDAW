"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meters = void 0;
var Meters_sass_inline_1 = require("./Meters.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var className = lib_dom_1.Html.adoptStyleSheet(Meters_sass_inline_1.default, "PushMeters");
var Meters = function (_a) {
    var lifecycle = _a.lifecycle, inputPeaks = _a.inputPeaks, outputPeaks = _a.outputPeaks, reduction = _a.reduction;
    var meterWidth = 7;
    var meterGap = 4;
    var labelWidth = 14;
    var width = meterWidth * 5 + meterGap * 4 + labelWidth;
    var paddingTop = 8;
    var dbLabels = [3, 0, -3, -6, -9, -12, -15, -18, -21, -24];
    var mapping = lib_std_1.ValueMapping.linear(-24, 3);
    var rmsFill = studio_enums_1.Colors.blue.toString();
    var peakFill = studio_enums_1.Colors.blue.opacity(0.3).toString();
    var textFill = "rgba(255, 255, 255, 0.25)";
    var backgroundFill = studio_enums_1.Colors.blue.brightness(-66).opacity(0.3).toString();
    var meterRects = [
        <rect x={labelWidth} width={meterWidth} height="0" fill={peakFill} rx="1" ry="1"/>,
        <rect x={labelWidth} width={meterWidth} height="0" fill={rmsFill} rx="1" ry="1"/>,
        <rect x={labelWidth + meterWidth + meterGap} width={meterWidth} height="0" fill={peakFill} rx="1" ry="1"/>,
        <rect x={labelWidth + meterWidth + meterGap} width={meterWidth} height="0" fill={rmsFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 2} y="0" width={meterWidth} height="0" fill={studio_enums_1.Colors.blue.toString()} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 2 + meterWidth + meterGap} width={meterWidth} height="0" fill={peakFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 2 + meterWidth + meterGap} width={meterWidth} height="0" fill={rmsFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 3 + meterWidth + meterGap} width={meterWidth} height="0" fill={peakFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 3 + meterWidth + meterGap} width={meterWidth} height="0" fill={rmsFill} rx="1" ry="1"/>
    ];
    var backgroundRects = [
        <rect x={labelWidth} y="0" width={meterWidth} fill={backgroundFill} rx="1" ry="1"/>,
        <rect x={labelWidth + meterWidth + meterGap} y="0" width={meterWidth} fill={backgroundFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 2} y="0" width={meterWidth} fill={backgroundFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 2 + meterWidth + meterGap} y="0" width={meterWidth} fill={backgroundFill} rx="1" ry="1"/>,
        <rect x={labelWidth + (meterWidth + meterGap) * 3 + meterWidth + meterGap} y="0" width={meterWidth} fill={backgroundFill} rx="1" ry="1"/>
    ];
    var labelTexts = dbLabels.map(function (db, index) {
        var last = index === dbLabels.length - 1;
        return (<text x={String(labelWidth - 4)} font-size="7px" fill={textFill} alignment-baseline={last ? "bottom" : "middle"} text-anchor="end">{db}</text>);
    });
    var contentGroup = (<g>
            {labelTexts}
            {backgroundRects}
            {meterRects}
        </g>);
    var svg = (<svg classList={className}>{contentGroup}</svg>);
    var innerHeight = 0;
    var setLevelMeter = function (meter, dbValue) {
        var h = mapping.x(Math.round(dbValue)) * innerHeight;
        meter.y.baseVal.value = innerHeight - h;
        meter.height.baseVal.value = h;
    };
    var setReductionMeter = function (meter, reductionDb) {
        var h0 = (1.0 - mapping.x(0)) * innerHeight;
        var h1 = (1.0 - mapping.x(Math.min(0, reductionDb))) * innerHeight;
        meter.y.baseVal.value = h0;
        meter.height.baseVal.value = h1 - h0;
    };
    lifecycle.ownAll(lib_dom_1.Html.watchResize(svg, function () {
        if (!svg.isConnected) {
            return;
        }
        var clientHeight = svg.clientHeight;
        svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(clientHeight));
        innerHeight = clientHeight - paddingTop;
        contentGroup.setAttribute("transform", "translate(0, ".concat(paddingTop, ")"));
        backgroundRects.forEach(function (rect, index) {
            if (index === 2) {
                // Reduction background: 0dB to -24dB only
                var zeroDbY = (1.0 - mapping.x(0)) * innerHeight;
                rect.y.baseVal.value = zeroDbY;
                rect.height.baseVal.value = innerHeight - zeroDbY;
            }
            else {
                rect.height.baseVal.value = innerHeight;
            }
        });
        labelTexts.forEach(function (text, index) { return text.setAttribute("y", String(Math.ceil((1.0 - mapping.x(dbLabels[index])) * innerHeight))); });
    }), lib_dom_1.AnimationFrame.add(function () {
        var inpPeakL = inputPeaks[0], inpPeakR = inputPeaks[1], inpRmsL = inputPeaks[2], inpRmsR = inputPeaks[3];
        var outPeakL = outputPeaks[0], outPeakR = outputPeaks[1], outRmsL = outputPeaks[2], outRmsR = outputPeaks[3];
        setLevelMeter(meterRects[0], (0, lib_dsp_1.gainToDb)(inpPeakL));
        setLevelMeter(meterRects[1], (0, lib_dsp_1.gainToDb)(inpRmsL));
        setLevelMeter(meterRects[2], (0, lib_dsp_1.gainToDb)(outPeakL));
        setLevelMeter(meterRects[3], (0, lib_dsp_1.gainToDb)(outRmsL));
        setReductionMeter(meterRects[4], reduction[0]);
        setLevelMeter(meterRects[5], (0, lib_dsp_1.gainToDb)(outPeakR));
        setLevelMeter(meterRects[6], (0, lib_dsp_1.gainToDb)(outRmsR));
        setLevelMeter(meterRects[7], (0, lib_dsp_1.gainToDb)(inpPeakR));
        setLevelMeter(meterRects[8], (0, lib_dsp_1.gainToDb)(inpRmsR));
    }));
    return svg;
};
exports.Meters = Meters;
