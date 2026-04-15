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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoOverlayPreview = void 0;
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var VideoOverlay_1 = require("./VideoOverlay");
var WIDTH = 1280;
var HEIGHT = 720;
var BPM = 120;
var VideoOverlayPreview = function (_a) {
    var lifecycle = _a.lifecycle;
    return (<div style={{
            margin: "0",
            background: "#111",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "16px"
        }}>
            <canvas width={WIDTH} height={HEIGHT} style={{
            maxWidth: "90vw",
            maxHeight: "80vh",
            border: "1px solid #333",
            borderRadius: "4px"
        }} onInit={function (canvas) { return __awaiter(void 0, void 0, void 0, function () {
            var ctx, overlay, render, slider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = canvas.getContext("2d");
                        return [4 /*yield*/, VideoOverlay_1.VideoOverlay.create({
                                width: WIDTH,
                                height: HEIGHT,
                                projectName: "Dub Techno",
                                toParts: function (position) { return lib_dsp_1.PPQN.toParts(Math.abs(position) | 0); }
                            })];
                    case 1:
                        overlay = _a.sent();
                        lifecycle.own(overlay);
                        render = function (seconds) {
                            var gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
                            gradient.addColorStop(0, "#1a0a2e");
                            gradient.addColorStop(0.5, "#16213e");
                            gradient.addColorStop(1, "#0f3460");
                            ctx.fillStyle = gradient;
                            ctx.fillRect(0, 0, WIDTH, HEIGHT);
                            var ppqn = lib_dsp_1.PPQN.secondsToPulses(seconds, BPM);
                            overlay.render(ppqn);
                            ctx.globalCompositeOperation = "screen";
                            ctx.drawImage(overlay.canvas, 0, 0);
                            ctx.globalCompositeOperation = "source-over";
                        };
                        slider = canvas.parentElement.querySelector("input[type=range]");
                        lifecycle.own(lib_dom_1.Events.subscribe(slider, "input", function () { return render(parseFloat(slider.value)); }));
                        render(0);
                        return [2 /*return*/];
                }
            });
        }); }}/>
            <input type="range" min="0" max="2" value="0" step="0.00001" style={{ width: "400px" }}/>
        </div>);
};
exports.VideoOverlayPreview = VideoOverlayPreview;
