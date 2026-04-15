"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionLabel = void 0;
var RegionLabel;
(function (RegionLabel) {
    RegionLabel.fontSize = function () { return 9; };
    RegionLabel.labelHeight = function () { return Math.ceil(RegionLabel.fontSize() * 1.5); };
})(RegionLabel || (exports.RegionLabel = RegionLabel = {}));
