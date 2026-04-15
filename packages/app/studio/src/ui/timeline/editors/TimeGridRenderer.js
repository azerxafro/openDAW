"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTimeGrid = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var SnapColor = "rgba(0, 0, 0, 0.20)";
var SubSnapColor = "rgba(0, 0, 0, 0.06)";
var renderTimeGrid = function (context, signatureTrack, range, snapping, top, bottom) {
    var snapValue = snapping.value(0);
    studio_core_1.TimeGrid.fragment(signatureTrack, range, function (_a) {
        var pulse = _a.pulse;
        var x = Math.floor(range.unitToX(pulse) * devicePixelRatio);
        context.fillStyle = pulse % snapValue === 0 ? SnapColor : SubSnapColor;
        context.fillRect(x, top, devicePixelRatio, bottom - top);
    }, { minLength: 16, snapInterval: snapValue });
};
exports.renderTimeGrid = renderTimeGrid;
