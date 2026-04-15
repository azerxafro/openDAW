"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertical = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var height = 157;
var padding = 10;
exports.Vertical = {
    scale: new studio_core_1.LinearScale(0, 27),
    height: height,
    padding: padding,
    innerHeight: height - padding * 2
};
