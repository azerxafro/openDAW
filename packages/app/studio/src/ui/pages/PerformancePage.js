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
exports.PerformancePage = void 0;
var PerformancePage_sass_inline_1 = require("./PerformancePage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var benchmarks_1 = require("@/perf/benchmarks");
var lib_std_1 = require("@opendaw/lib-std");
var Button_1 = require("@/ui/components/Button");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(PerformancePage_sass_inline_1.default, "PerformancePage");
var CategoryOrder = ["Baseline", "Audio Effect", "Instrument"];
var activeAudio = null;
var createAudioElement = function (audio) {
    var length = audio[0].length;
    var numChannels = Math.min(audio.length, 2);
    var buffer = new ArrayBuffer(44 + length * numChannels * 2);
    var view = new DataView(buffer);
    var writeString = function (offset, str) {
        for (var i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    };
    var dataSize = length * numChannels * 2;
    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, benchmarks_1.SAMPLE_RATE, true);
    view.setUint32(28, benchmarks_1.SAMPLE_RATE * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);
    var offset = 44;
    for (var i = 0; i < length; i++) {
        for (var ch = 0; ch < numChannels; ch++) {
            var sample = Math.max(-1, Math.min(1, audio[ch][i]));
            view.setInt16(offset, sample * 0x7FFF, true);
            offset += 2;
        }
    }
    var blob = new Blob([buffer], { type: "audio/wav" });
    var audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.src = URL.createObjectURL(blob);
    audioElement.addEventListener("play", function () {
        if (activeAudio !== null && activeAudio !== audioElement) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
        }
        activeAudio = audioElement;
    });
    return audioElement;
};
var PerformancePage = function (_a) {
    var service = _a.service, lifecycle = _a.lifecycle;
    var results = [];
    var tbody = <tbody />;
    var statusEl = <span className="status">Ready</span>;
    var running = false;
    var renderRow = function (result, maxMarginal) {
        if ((0, lib_std_1.isDefined)(result.error)) {
            return (<tr className="error">
                    <td className="name">{result.name}</td>
                    <td className="number" colSpan={5}>{result.error}</td>
                </tr>);
        }
        var barWidth = result.marginalMs > 0 && maxMarginal > 0
            ? (result.marginalMs / maxMarginal) * 100 : 0;
        var isBaseline = result.category === "Baseline";
        return (<tr>
                <td className="name">{result.name}</td>
                <td className="number">{result.renderMs.toFixed(0)}</td>
                <td className="number">{isBaseline ? "-" : result.marginalMs.toFixed(0)}</td>
                <td className="number">{isBaseline ? "-" : result.perQuantumUs.toFixed(2)}</td>
                <td className="bar-cell">
                    <div className="bar" style={{ width: "".concat(barWidth.toFixed(1), "%") }}/>
                </td>
                <td className="audio-cell">
                    {(0, lib_std_1.isDefined)(result.audio) ? createAudioElement(result.audio) : null}
                </td>
            </tr>);
    };
    var updateTable = function () {
        var maxMarginal = results.reduce(function (max, result) { return Math.max(max, result.marginalMs); }, 0);
        tbody.replaceChildren();
        var _loop_1 = function (category) {
            var categoryResults = results.filter(function (result) { return result.category === category; });
            if (categoryResults.length === 0) {
                return "continue";
            }
            tbody.appendChild(<tr className="category">
                    <td colSpan={6}>{category}</td>
                </tr>);
            for (var _a = 0, _b = categoryResults.sort(function (a, b) { return b.renderMs - a.renderMs; }); _a < _b.length; _a++) {
                var result = _b[_a];
                tbody.appendChild(renderRow(result, maxMarginal));
            }
        };
        for (var _i = 0, CategoryOrder_1 = CategoryOrder; _i < CategoryOrder_1.length; _i++) {
            var category = CategoryOrder_1[_i];
            _loop_1(category);
        }
    };
    var run = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (running) {
                        return [2 /*return*/];
                    }
                    running = true;
                    results.length = 0;
                    updateTable();
                    statusEl.textContent = "Starting benchmarks...";
                    return [4 /*yield*/, (0, benchmarks_1.runAllBenchmarks)(service, function (progress) {
                            statusEl.textContent = "[".concat(progress.index + 1, "/").concat(progress.total, "] ").concat(progress.current, "...");
                        }, function (result) {
                            results.push(result);
                            updateTable();
                        })];
                case 1:
                    _a.sent();
                    running = false;
                    statusEl.textContent = "Done. ".concat(results.length, " benchmarks completed.");
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className={className}>
            <h1>DSP Performance Benchmarks</h1>
            <div style={{ opacity: "0.5", fontSize: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span>Each device runs in its own project that renders {benchmarks_1.RENDER_SECONDS}s of audio at {benchmarks_1.SAMPLE_RATE / 1000}kHz offline (faster than real-time, no playback).</span>
                <span><b>render</b> — wall-clock time to render the full {benchmarks_1.RENDER_SECONDS}s. Includes engine overhead, channel strip, and the device itself.</span>
                <span><b>marginal</b> — render time minus the baseline (a project with only a Tape instrument, no effects). This isolates the cost added by the device.</span>
                <span><b>per quantum</b> — marginal cost divided by the number of 128-sample blocks rendered ({(benchmarks_1.RENDER_SECONDS * benchmarks_1.SAMPLE_RATE / 128).toLocaleString()} blocks). Shows how much time the device adds to each audio callback.</span>
            </div>
            <div className="controls">
                <Button_1.Button lifecycle={lifecycle} appearance={{ framed: true, color: studio_enums_1.Colors.blue }} style={{ fontSize: "0.75em" }} onClick={run}>Run All</Button_1.Button>
                {statusEl}
            </div>
            <table>
                <thead>
                <tr>
                    <th>Device</th>
                    <th>render (ms)</th>
                    <th>marginal (ms)</th>
                    <th>per quantum (us)</th>
                    <th>relative</th>
                    <th></th>
                </tr>
                </thead>
                {tbody}
            </table>
            <div style={{ opacity: "0.4", fontSize: "11px" }}>
                Negative marginal values indicate measurement noise — the device cost is too small to measure reliably.
            </div>
        </div>);
};
exports.PerformancePage = PerformancePage;
