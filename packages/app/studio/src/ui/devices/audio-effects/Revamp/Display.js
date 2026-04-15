"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDisplay = void 0;
var constants_ts_1 = require("./constants.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var createDisplay = function (xAxis, yAxis, svg) {
    return lib_dom_1.Html.watchResize(svg, function () {
        if (!svg.isConnected) {
            return;
        }
        var paddingInPixels = parseFloat(getComputedStyle(svg).fontSize);
        var width = svg.clientWidth - paddingInPixels * 2;
        var height = svg.clientHeight - paddingInPixels * 2;
        lib_dom_1.Html.empty(svg);
        svg.appendChild(<g transform={"translate(".concat(paddingInPixels, ", ").concat(paddingInPixels, ")")} stroke="none" fill="rgba(255, 255, 255, 0.125)" font-size="7px">
                {constants_ts_1.verticalUnits.map(function (hz, index, labels) {
                return <text text-anchor={index === 0 ? "start" : index === labels.length - 1 ? "end" : "middle"} alignment-baseline="baseline" x={"".concat((Math.floor(xAxis.unitToNorm(hz) * width)))} y={"".concat(-4.5)}>{hz >= 1000 ? "".concat(Math.floor(hz / 1000), "k") : hz}</text>;
            })}
                {constants_ts_1.horizontalUnits.map(function (db) {
                return <text text-anchor="end" alignment-baseline="middle" x="-3" y={"".concat((Math.floor((1.0 - yAxis.unitToNorm(db)) * height)))}>{db}</text>;
            })}
            </g>);
    });
};
exports.createDisplay = createDisplay;
