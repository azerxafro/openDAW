"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexSpacer = void 0;
var FlexSpacer = function (_a) {
    var pixels = _a.pixels;
    return (<div style={{ display: "flex", flex: pixels === undefined ? "1 0 auto" : "0 0 ".concat(pixels, "px") }}/>);
};
exports.FlexSpacer = FlexSpacer;
