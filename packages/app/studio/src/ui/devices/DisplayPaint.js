"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayPaint = void 0;
var DisplayPaint;
(function (DisplayPaint) {
    DisplayPaint.strokeStyle = function (opacity) {
        if (opacity === void 0) { opacity = 0.75; }
        return "hsla(200, 83%, 60%, ".concat(opacity, ")");
    };
})(DisplayPaint || (exports.DisplayPaint = DisplayPaint = {}));
