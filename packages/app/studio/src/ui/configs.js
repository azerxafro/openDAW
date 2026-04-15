"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapCommonDecibel = exports.SnapCenter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
exports.SnapCenter = { snap: { threshold: 0.5, snapLength: 12 } };
exports.SnapCommonDecibel = {
    snap: {
        threshold: [-12, -9, -6, -3]
            .map(function (y) { return lib_std_1.ValueMapping.DefaultDecibel.x(y); }), snapLength: 12
    }
};
