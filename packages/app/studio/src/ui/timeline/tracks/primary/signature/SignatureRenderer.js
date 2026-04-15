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
exports.SignatureRenderer = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var SignatureRenderer;
(function (SignatureRenderer) {
    var textPadding = 8;
    SignatureRenderer.forTrack = function (canvas, range, trackAdapter, getPreview) { return new studio_core_1.CanvasPainter(canvas, function (_a) {
        var context = _a.context;
        var width = canvas.width, height = canvas.height;
        var _b = getComputedStyle(canvas), fontFamily = _b.fontFamily, fontSize = _b.fontSize;
        context.clearRect(0, 0, width, height);
        context.textBaseline = "middle";
        context.font = "".concat(parseFloat(fontSize) * devicePixelRatio, "px ").concat(fontFamily);
        var unitMin = range.unitMin;
        var unitMax = range.unitMax;
        var preview = getPreview === null || getPreview === void 0 ? void 0 : getPreview();
        var signatures = __spreadArray([], trackAdapter.iterateAll(), true);
        for (var i = 0; i < signatures.length; i++) {
            var curr = signatures[i];
            var next = signatures[i + 1];
            if ((0, lib_std_1.isDefined)(next) && next.accumulatedPpqn < unitMin) {
                continue;
            }
            if (curr.accumulatedPpqn > unitMax) {
                break;
            }
            var isDragging = preview !== null && preview !== undefined && curr.index === preview.event.index;
            renderSignature(context, range, curr, height, next, isDragging ? 0.3 : 1.0);
        }
        if (preview !== null && preview !== undefined) {
            renderPreview(context, range, preview, height);
        }
    }); };
    var renderSignature = function (context, range, signature, height, next, alpha) {
        if (alpha === void 0) { alpha = 1.0; }
        var x0 = Math.floor(range.unitToX(signature.accumulatedPpqn) * devicePixelRatio);
        var label = "".concat(signature.nominator, "/").concat(signature.denominator);
        var text;
        if ((0, lib_std_1.isDefined)(next)) {
            var x1 = Math.floor(range.unitToX(next.accumulatedPpqn) * devicePixelRatio);
            var truncate = lib_dom_1.Context2d.truncateText(context, label, x1 - x0 - textPadding);
            text = truncate.text;
        }
        else {
            text = label;
        }
        var vPadding = Math.ceil(height / 5);
        context.globalAlpha = alpha;
        context.fillStyle = signature.index > -1 ? studio_enums_1.Colors.dark.toString() : studio_enums_1.Colors.shadow.toString();
        context.fillRect(x0, vPadding, 2, height - (vPadding << 1));
        context.fillText(text, x0 + textPadding, height >> 1);
        context.globalAlpha = 1.0;
    };
    var renderPreview = function (context, range, preview, height) {
        var x0 = Math.floor(range.unitToX(preview.targetPpqn) * devicePixelRatio);
        var label = "".concat(preview.event.nominator, "/").concat(preview.event.denominator);
        var vPadding = Math.ceil(height / 5);
        context.globalAlpha = 0.7;
        context.fillStyle = studio_enums_1.Colors.dark.toString();
        context.fillRect(x0, vPadding, 2, height - (vPadding << 1));
        context.fillText(label, x0 + textPadding, height >> 1);
        context.globalAlpha = 1.0;
    };
    SignatureRenderer.computeWidth = function (context, signature) {
        var label = "".concat(signature.nominator, "/").concat(signature.denominator);
        var width = context.measureText(label).width;
        return (width + textPadding) / devicePixelRatio;
    };
})(SignatureRenderer || (exports.SignatureRenderer = SignatureRenderer = {}));
