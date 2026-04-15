"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GainMapping = void 0;
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var GainMapping = /** @class */ (function () {
    function GainMapping(maxDb, bend) {
        if (bend === void 0) { bend = 1.0; }
        this.linear = lib_std_1.ValueMapping.linear(0.0, (0, lib_dsp_1.dbToGain)(maxDb));
        this.bend = bend;
    }
    GainMapping.prototype.x = function (y) { return Math.pow(this.linear.x((0, lib_dsp_1.dbToGain)(y)), 1.0 / this.bend); };
    GainMapping.prototype.y = function (x) { return (0, lib_dsp_1.gainToDb)(this.linear.y(Math.pow(x, this.bend))); };
    GainMapping.prototype.clamp = function (y) { return y; };
    GainMapping.prototype.floating = function () { return true; };
    return GainMapping;
}());
exports.GainMapping = GainMapping;
