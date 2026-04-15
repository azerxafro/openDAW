"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _VideoOverlay_instances, _a, _VideoOverlay_loadImage, _VideoOverlay_config, _VideoOverlay_canvas, _VideoOverlay_ctx, _VideoOverlay_logo, _VideoOverlay_logoSize, _VideoOverlay_renderLogo, _VideoOverlay_renderPosition;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoOverlay = void 0;
var VideoOverlay = /** @class */ (function () {
    function VideoOverlay(config, canvas, ctx, logo) {
        _VideoOverlay_instances.add(this);
        _VideoOverlay_config.set(this, void 0);
        _VideoOverlay_canvas.set(this, void 0);
        _VideoOverlay_ctx.set(this, void 0);
        _VideoOverlay_logo.set(this, void 0);
        _VideoOverlay_logoSize.set(this, void 0);
        __classPrivateFieldSet(this, _VideoOverlay_config, config, "f");
        __classPrivateFieldSet(this, _VideoOverlay_canvas, canvas, "f");
        __classPrivateFieldSet(this, _VideoOverlay_ctx, ctx, "f");
        __classPrivateFieldSet(this, _VideoOverlay_logo, logo, "f");
        __classPrivateFieldSet(this, _VideoOverlay_logoSize, Math.round(config.height * 0.25), "f");
    }
    VideoOverlay.create = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, ctx, logo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        canvas = new OffscreenCanvas(config.width, config.height);
                        ctx = canvas.getContext("2d");
                        return [4 /*yield*/, __classPrivateFieldGet(_a, _a, "m", _VideoOverlay_loadImage).call(_a, "/cover.png")];
                    case 1:
                        logo = _b.sent();
                        return [2 /*return*/, new _a(config, canvas, ctx, logo)];
                }
            });
        });
    };
    Object.defineProperty(VideoOverlay.prototype, "canvas", {
        get: function () { return __classPrivateFieldGet(this, _VideoOverlay_canvas, "f"); },
        enumerable: false,
        configurable: true
    });
    VideoOverlay.prototype.render = function (position) {
        var _b = __classPrivateFieldGet(this, _VideoOverlay_config, "f"), width = _b.width, height = _b.height;
        var ctx = __classPrivateFieldGet(this, _VideoOverlay_ctx, "f");
        ctx.globalAlpha = 0.4;
        var fontSize = Math.round(height * 0.033);
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(0, -height * 0.07);
        __classPrivateFieldGet(this, _VideoOverlay_instances, "m", _VideoOverlay_renderLogo).call(this);
        ctx.restore();
        __classPrivateFieldGet(this, _VideoOverlay_instances, "m", _VideoOverlay_renderPosition).call(this, position, fontSize);
    };
    VideoOverlay.prototype.terminate = function () { __classPrivateFieldGet(this, _VideoOverlay_logo, "f").close(); };
    return VideoOverlay;
}());
exports.VideoOverlay = VideoOverlay;
_a = VideoOverlay, _VideoOverlay_config = new WeakMap(), _VideoOverlay_canvas = new WeakMap(), _VideoOverlay_ctx = new WeakMap(), _VideoOverlay_logo = new WeakMap(), _VideoOverlay_logoSize = new WeakMap(), _VideoOverlay_instances = new WeakSet(), _VideoOverlay_loadImage = function _VideoOverlay_loadImage(src) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blob;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch(src)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.blob()];
                case 2:
                    blob = _b.sent();
                    return [2 /*return*/, createImageBitmap(blob)];
            }
        });
    });
}, _VideoOverlay_renderLogo = function _VideoOverlay_renderLogo() {
    var ctx = __classPrivateFieldGet(this, _VideoOverlay_ctx, "f");
    var size = __classPrivateFieldGet(this, _VideoOverlay_logoSize, "f");
    var x = __classPrivateFieldGet(this, _VideoOverlay_config, "f").width - size;
    var y = 0;
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    ctx.shadowBlur = 15;
    ctx.drawImage(__classPrivateFieldGet(this, _VideoOverlay_logo, "f"), x, y, size, size);
    ctx.shadowBlur = 0;
}, _VideoOverlay_renderPosition = function _VideoOverlay_renderPosition(position, fontSize) {
    var ctx = __classPrivateFieldGet(this, _VideoOverlay_ctx, "f");
    var _b = __classPrivateFieldGet(this, _VideoOverlay_config, "f"), width = _b.width, height = _b.height, projectName = _b.projectName, toParts = _b.toParts;
    var _c = toParts(position), bars = _c.bars, beats = _c.beats, semiquavers = _c.semiquavers, ticks = _c.ticks;
    var positionFontSize = Math.round(fontSize * 0.7);
    var charWidth = positionFontSize * 0.65;
    var separatorWidth = positionFontSize * 0.4;
    var margin = height * 0.01;
    var chars = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], String(bars + 1).padStart(3, "0").split(""), true), [
        "."
    ], false), String(beats + 1).padStart(1, "0").split(""), true), [
        "."
    ], false), String(semiquavers + 1).padStart(1, "0").split(""), true), [
        ":"
    ], false), String(ticks).padStart(3, "0").split(""), true);
    var totalWidth = chars.reduce(function (sum, char) {
        return sum + (char === "." || char === ":" ? separatorWidth : charWidth);
    }, 0);
    var x = (width - totalWidth) / 2;
    var y = height - margin;
    ctx.font = "300 ".concat(fontSize, "px Rubik");
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(255, 255, 255, 1)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillText(projectName, width / 2, y - fontSize);
    ctx.font = "300 ".concat(positionFontSize, "px Rubik");
    for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
        var char = chars_1[_i];
        var w = char === "." || char === ":" ? separatorWidth : charWidth;
        ctx.fillText(char, x + w / 2, y);
        x += w;
    }
    ctx.shadowBlur = 0;
};
