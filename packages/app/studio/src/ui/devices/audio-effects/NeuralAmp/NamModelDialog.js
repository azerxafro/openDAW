"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNamModelDialog = void 0;
var NamModelDialog_sass_inline_1 = require("./NamModelDialog.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var Dialog_1 = require("@/ui/components/Dialog");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_std_1 = require("@opendaw/lib-std");
var ArchitectureCanvas_1 = require("./ArchitectureCanvas");
var HistogramCanvas_1 = require("./HistogramCanvas");
var MagnitudeCanvas_1 = require("./MagnitudeCanvas");
var Surface_1 = require("@/ui/surface/Surface");
var className = lib_dom_1.Html.adoptStyleSheet(NamModelDialog_sass_inline_1.default, "NamModelDialog");
var formatDate = function (date) {
    if (!(0, lib_std_1.isDefined)(date))
        return "Unknown";
    var year = date.year, month = date.month, day = date.day, hour = date.hour, minute = date.minute;
    var dateStr = "".concat(year, "-").concat(String(month).padStart(2, "0"), "-").concat(String(day).padStart(2, "0"));
    if ((0, lib_std_1.isDefined)(hour) && (0, lib_std_1.isDefined)(minute)) {
        return "".concat(dateStr, " ").concat(String(hour).padStart(2, "0"), ":").concat(String(minute).padStart(2, "0"));
    }
    return dateStr;
};
var StatRow = function (_a) {
    var label = _a.label, value = _a.value;
    if (!(0, lib_std_1.isDefined)(value) || value === "") {
        return null;
    }
    return (<div className="stat">
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </div>);
};
var showNamModelDialog = function (model) {
    var lifecycle = new lib_std_1.Terminator();
    var weights = model.weights;
    var hasWeights = (0, lib_std_1.isDefined)(weights) && weights.length > 0;
    var stats = hasWeights ? (0, HistogramCanvas_1.computeStats)(weights) : null;
    var meta = model.metadata;
    var training = model.training;
    var dialog = (<Dialog_1.Dialog headline="NAM Properties" icon={studio_enums_1.IconSymbol.NeuralAmp} buttons={[{ text: "Close", onClick: function (handler) { return handler.close(); }, primary: true }]} growWidth>
            <div className={className}>
                {(0, lib_std_1.isDefined)(meta === null || meta === void 0 ? void 0 : meta.name) && <div className="name">{meta.name}</div>}
                <div className="section">
                    <h2>Model</h2>
                    <div className="stats">
                        <StatRow label="Modeled by" value={meta === null || meta === void 0 ? void 0 : meta.modeled_by}/>
                        <StatRow label="Gear Make" value={meta === null || meta === void 0 ? void 0 : meta.gear_make}/>
                        <StatRow label="Gear Model" value={meta === null || meta === void 0 ? void 0 : meta.gear_model}/>
                        <StatRow label="Gear Type" value={meta === null || meta === void 0 ? void 0 : meta.gear_type}/>
                        <StatRow label="Tone Type" value={meta === null || meta === void 0 ? void 0 : meta.tone_type}/>
                        <StatRow label="Date" value={(meta === null || meta === void 0 ? void 0 : meta.date) ? formatDate(meta.date) : undefined}/>
                    </div>
                </div>
                <div className="section">
                    <h2>Architecture</h2>
                    <div className="stats single-column">
                        <StatRow label="Type" value={model.architecture}/>
                        <StatRow label="Version" value={model.version}/>
                        <StatRow label="Layers" value={model.config.layers.length}/>
                        <StatRow label="Weights" value={stats === null || stats === void 0 ? void 0 : stats.count.toLocaleString()}/>
                    </div>
                </div>
                <div className="section">
                    <h2>Layer Diagram</h2>
                    <ArchitectureCanvas_1.ArchitectureCanvas lifecycle={lifecycle} model={model}/>
                </div>
                <div className="section">
                    <h2>Calibration</h2>
                    <div className="stats single-column">
                        <StatRow label="Input Level" value={(0, lib_std_1.isDefined)(meta === null || meta === void 0 ? void 0 : meta.input_level_dbu) ? "".concat(meta.input_level_dbu.toFixed(1), " dBu") : undefined}/>
                        <StatRow label="Output Level" value={(0, lib_std_1.isDefined)(meta === null || meta === void 0 ? void 0 : meta.output_level_dbu) ? "".concat(meta.output_level_dbu.toFixed(1), " dBu") : undefined}/>
                        <StatRow label="Loudness" value={(0, lib_std_1.isDefined)(meta === null || meta === void 0 ? void 0 : meta.loudness) ? "".concat(meta.loudness.toFixed(2), " dB") : undefined}/>
                        <StatRow label="Gain" value={(0, lib_std_1.isDefined)(meta === null || meta === void 0 ? void 0 : meta.gain) ? meta.gain.toFixed(4) : undefined}/>
                    </div>
                </div>
                {(0, lib_std_1.isDefined)(training) && (<div className="section">
                        <h2>Training</h2>
                        <div className="stats single-column">
                            <StatRow label="Validation ESR" value={(0, lib_std_1.isDefined)(training.validation_esr) ? training.validation_esr.toFixed(6) : undefined}/>
                        </div>
                    </div>)}
                {hasWeights && stats !== null && (<div className="section">
                        <h2>Weight Statistics</h2>
                        <div className="stats">
                            <StatRow label="Range" value={"[".concat(stats.min.toFixed(4), ", ").concat(stats.max.toFixed(4), "]")}/>
                            <StatRow label="Mean" value={stats.mean.toFixed(6)}/>
                            <StatRow label="Std Dev" value={stats.stdDev.toFixed(6)}/>
                            <StatRow label="Distribution" value={"".concat(stats.positive, " pos, ").concat(stats.negative, " neg, ").concat(stats.zeros, " zero")}/>
                        </div>
                    </div>)}
                {hasWeights && (<div className="section">
                        <h2>Weight Distribution</h2>
                        <HistogramCanvas_1.HistogramCanvas lifecycle={lifecycle} weights={weights}/>
                    </div>)}
                {hasWeights && (<div className="section">
                        <h2>Weight Magnitude</h2>
                        <MagnitudeCanvas_1.MagnitudeCanvas lifecycle={lifecycle} weights={weights}/>
                    </div>)}
            </div>
        </Dialog_1.Dialog>);
    dialog.addEventListener("close", function () { return lifecycle.terminate(); });
    Surface_1.Surface.get().body.appendChild(dialog);
    dialog.showModal();
};
exports.showNamModelDialog = showNamModelDialog;
