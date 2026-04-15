"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarChart = exports.LineChart = void 0;
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var DEFAULT_PADDING = { top: 16, right: 16, bottom: 28, left: 40 };
var COMPACT_PADDING = { top: 8, right: 8, bottom: 8, left: 8 };
var GRID_LINES = 4;
var formatAxisDate = function (date) { return date.slice(5); };
var buildAreaPath = function (points, baseY) {
    if (points.length === 0)
        return "";
    var segments = points.map(function (_a, index) {
        var x = _a[0], y = _a[1];
        return "".concat(index === 0 ? "M" : "L", " ").concat(x, " ").concat(y);
    });
    var firstX = points[0][0];
    var lastX = points[points.length - 1][0];
    return "".concat(segments.join(" "), " L ").concat(lastX, " ").concat(baseY, " L ").concat(firstX, " ").concat(baseY, " Z");
};
var buildLinePath = function (points) {
    return points.map(function (_a, index) {
        var x = _a[0], y = _a[1];
        return "".concat(index === 0 ? "M" : "L", " ").concat(x, " ").concat(y);
    }).join(" ");
};
var LineChart = function (_a) {
    var lifecycle = _a.lifecycle, series = _a.series, color = _a.color, _b = _a.showAxis, showAxis = _b === void 0 ? true : _b, _c = _a.showAverage, showAverage = _c === void 0 ? true : _c;
    var accent = color !== null && color !== void 0 ? color : studio_enums_1.Colors.blue.toString();
    var padding = showAxis ? DEFAULT_PADDING : COMPACT_PADDING;
    return (<div className="chart" onInit={function (element) {
            var render = function () {
                lib_dom_1.Html.empty(element);
                var data = series.getValue();
                if (data.length === 0)
                    return;
                var width = element.clientWidth;
                var height = element.clientHeight;
                if (width === 0 || height === 0)
                    return;
                var chartWidth = Math.max(1, width - padding.left - padding.right);
                var chartHeight = Math.max(1, height - padding.top - padding.bottom);
                var values = data.map(function (_a) {
                    var value = _a[1];
                    return value;
                });
                var labels = data.map(function (_a) {
                    var date = _a[0];
                    return date;
                });
                var maxValue = Math.max.apply(Math, values);
                var minValue = Math.min.apply(Math, __spreadArray([0], values, false));
                var valueRange = Math.max(1, maxValue - minValue);
                var stepX = values.length > 1 ? chartWidth / (values.length - 1) : 0;
                var points = values.map(function (value, index) {
                    var x = padding.left + index * stepX;
                    var y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
                    return [x, y];
                });
                var baseY = padding.top + chartHeight;
                var gradientId = "lineFill-".concat(Math.random().toString(36).slice(2, 8));
                var dateLabelMinSpacing = 64;
                var dateLabelStep = stepX === 0 ? values.length : Math.max(1, Math.ceil(dateLabelMinSpacing / stepX));
                (0, lib_jsx_1.replaceChildren)(element, (<svg viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color={accent} stop-opacity="0.5"/>
                                <stop offset="100%" stop-color={accent} stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        {showAxis && Array.from({ length: GRID_LINES + 1 }, function (_, index) {
                        var y = padding.top + (chartHeight / GRID_LINES) * index;
                        var value = Math.round(maxValue - (valueRange / GRID_LINES) * index);
                        return (<lib_jsx_1.Frag>
                                    <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke={studio_enums_1.Colors.shadow.toString()} stroke-width="1" stroke-opacity="0.4"/>
                                    <text x={"".concat(padding.left - 6)} y={"".concat(y + 4)} fill={studio_enums_1.Colors.shadow.toString()} font-size="10" font-family="sans-serif" text-anchor="end">{value}</text>
                                </lib_jsx_1.Frag>);
                    })}
                        <path d={buildAreaPath(points, baseY)} fill={"url(#".concat(gradientId, ")")}/>
                        <path d={buildLinePath(points)} fill="none" stroke={accent} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
                        {showAxis && labels.map(function (label, index) { return index % dateLabelStep === 0 && (<text x={"".concat(padding.left + index * stepX)} y={"".concat(baseY + 16)} fill={studio_enums_1.Colors.shadow.toString()} font-size="10" font-family="sans-serif" text-anchor="middle">{formatAxisDate(label)}</text>); })}
                        {showAverage && values.length > 1 && (function () {
                        var total = values.reduce(function (sum, value) { return sum + value; }, 0);
                        var avg = total / values.length;
                        var y = padding.top + chartHeight - ((avg - minValue) / valueRange) * chartHeight;
                        return (<line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke={studio_enums_1.Colors.orange.toString()} stroke-width="1" stroke-dasharray="4 3" stroke-opacity="0.7"/>);
                    })()}
                    </svg>));
            };
            lifecycle.own(lib_dom_1.Html.watchResize(element, render));
            lifecycle.own(series.subscribe(render));
        }}/>);
};
exports.LineChart = LineChart;
var BarChart = function (_a) {
    var lifecycle = _a.lifecycle, series = _a.series, color = _a.color, _b = _a.showAxis, showAxis = _b === void 0 ? true : _b;
    var accent = color !== null && color !== void 0 ? color : studio_enums_1.Colors.purple.toString();
    var padding = showAxis ? DEFAULT_PADDING : COMPACT_PADDING;
    return (<div className="chart" onInit={function (element) {
            var render = function () {
                lib_dom_1.Html.empty(element);
                var data = series.getValue();
                if (data.length === 0)
                    return;
                var width = element.clientWidth;
                var height = element.clientHeight;
                if (width === 0 || height === 0)
                    return;
                var chartWidth = Math.max(1, width - padding.left - padding.right);
                var chartHeight = Math.max(1, height - padding.top - padding.bottom);
                var values = data.map(function (_a) {
                    var value = _a[1];
                    return value;
                });
                var labels = data.map(function (_a) {
                    var date = _a[0];
                    return date;
                });
                var maxValue = Math.max.apply(Math, __spreadArray(__spreadArray([], values, false), [1], false));
                var slotWidth = chartWidth / values.length;
                var barWidth = Math.max(1, slotWidth * 0.7);
                var baseY = padding.top + chartHeight;
                var dateLabelMinSpacing = 64;
                var dateLabelStep = Math.max(1, Math.ceil(dateLabelMinSpacing / slotWidth));
                (0, lib_jsx_1.replaceChildren)(element, (<svg viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height}>
                        {showAxis && Array.from({ length: GRID_LINES + 1 }, function (_, index) {
                        var y = padding.top + (chartHeight / GRID_LINES) * index;
                        var value = Math.round(maxValue - (maxValue / GRID_LINES) * index);
                        return (<lib_jsx_1.Frag>
                                    <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke={studio_enums_1.Colors.shadow.toString()} stroke-width="1" stroke-opacity="0.4"/>
                                    <text x={"".concat(padding.left - 6)} y={"".concat(y + 4)} fill={studio_enums_1.Colors.shadow.toString()} font-size="10" font-family="sans-serif" text-anchor="end">{value}</text>
                                </lib_jsx_1.Frag>);
                    })}
                        {values.map(function (value, index) {
                        var barHeight = (value / maxValue) * chartHeight;
                        var x = padding.left + index * slotWidth + (slotWidth - barWidth) / 2;
                        var y = baseY - barHeight;
                        return (<rect x={x} y={y} width={barWidth} height={barHeight} fill={accent} rx="2" ry="2" opacity="0.85"/>);
                    })}
                        {showAxis && labels.map(function (label, index) { return index % dateLabelStep === 0 && (<text x={"".concat(padding.left + index * slotWidth + slotWidth / 2)} y={"".concat(baseY + 16)} fill={studio_enums_1.Colors.shadow.toString()} font-size="10" font-family="sans-serif" text-anchor="middle">{formatAxisDate(label)}</text>); })}
                    </svg>));
            };
            lifecycle.own(lib_dom_1.Html.watchResize(element, render));
            lifecycle.own(series.subscribe(render));
        }}/>);
};
exports.BarChart = BarChart;
