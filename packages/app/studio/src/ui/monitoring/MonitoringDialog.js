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
exports.MonitoringDialog = void 0;
var MonitoringDialog_sass_inline_1 = require("./MonitoringDialog.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var Dialog_1 = require("@/ui/components/Dialog");
var Checkbox_1 = require("@/ui/components/Checkbox");
var Icon_1 = require("@/ui/components/Icon");
var Knob_1 = require("@/ui/components/Knob");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var HorizontalPeakMeter_1 = require("@/ui/components/HorizontalPeakMeter");
var studio_enums_1 = require("@opendaw/studio-enums");
var Surface_1 = require("@/ui/surface/Surface");
var lib_dom_1 = require("@opendaw/lib-dom");
var AudioDevices_1 = require("@/audio/AudioDevices");
var configs_1 = require("@/ui/configs");
var className = lib_dom_1.Html.adoptStyleSheet(MonitoringDialog_sass_inline_1.default, "MonitoringDialog");
var DefaultDevice = { id: "", label: "Default" };
var ParamKnob = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, parameter = _a.parameter, anchor = _a.anchor, color = _a.color, label = _a.label, options = _a.options;
    var valueLabel = <span className="value"/>;
    var update = function () {
        var printValue = parameter.getPrintValue();
        valueLabel.textContent = "".concat(printValue.value).concat(printValue.unit);
    };
    lifecycle.own(parameter.subscribe(update));
    update();
    return (<div className="param-knob">
            <h5>{label}</h5>
            <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} options={options}>
                <Knob_1.Knob lifecycle={lifecycle} value={parameter} anchor={anchor} color={color}/>
            </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            {valueLabel}
        </div>);
};
var MonitoringDialog;
(function (MonitoringDialog) {
    var _this = this;
    MonitoringDialog.open = function (service, capture) { return __awaiter(_this, void 0, void 0, function () {
        var switchable, outputDevices, devices, _reason_1, lifecycle, volumeParam, panParam, muteModel, peaksInDb, meterTerminator, reconnectMeter, modeSelect, currentDeviceId, deviceSelect, dialog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    switchable = "setSinkId" in AudioContext.prototype;
                    outputDevices = [DefaultDevice];
                    if (!switchable) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, AudioDevices_1.AudioDevices.queryListOutputDevices()];
                case 2:
                    devices = _a.sent();
                    outputDevices = __spreadArray([DefaultDevice], devices.map(function (device) { return ({ id: device.deviceId, label: device.label }); }), true);
                    return [3 /*break*/, 4];
                case 3:
                    _reason_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4:
                    lifecycle = new lib_std_1.Terminator();
                    volumeParam = lifecycle.own(new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.linear(-48, 12), lib_std_1.StringMapping.numeric({ unit: "dB", fractionDigits: 1 }), "Volume", capture.monitorVolumeDb));
                    panParam = lifecycle.own(new lib_std_1.DefaultParameter(lib_std_1.ValueMapping.bipolar(), lib_std_1.StringMapping.numeric({ fractionDigits: 2, bipolar: true }), "Pan", capture.monitorPan));
                    muteModel = lifecycle.own(new lib_std_1.DefaultObservableValue(capture.monitorMuted));
                    lifecycle.ownAll(volumeParam.subscribe(function () { return capture.monitorVolumeDb = volumeParam.getValue(); }), panParam.subscribe(function () { return capture.monitorPan = panParam.getValue(); }), muteModel.subscribe(function (owner) { return capture.monitorMuted = owner.getValue(); }));
                    peaksInDb = new Float32Array(2).fill(Number.NEGATIVE_INFINITY);
                    meterTerminator = lifecycle.own(new lib_std_1.Terminator());
                    reconnectMeter = function () {
                        meterTerminator.terminate();
                        try {
                            var meterWorklet_1 = service.audioWorklets.createMeter(2);
                            capture.monitorPanNode.connect(meterWorklet_1);
                            meterTerminator.ownAll(meterWorklet_1.subscribe(function (_a) {
                                var _b;
                                var peak = _a.peak;
                                peaksInDb[0] = (0, lib_dsp_1.gainToDb)(peak[0]);
                                peaksInDb[1] = (0, lib_dsp_1.gainToDb)((_b = peak[1]) !== null && _b !== void 0 ? _b : peak[0]);
                            }), lib_std_1.Terminable.create(function () { return meterWorklet_1.disconnect(); }));
                        }
                        catch (_reason) {
                            peaksInDb.fill(Number.NEGATIVE_INFINITY);
                        }
                    };
                    reconnectMeter();
                    modeSelect = (<select className="select" onchange={function () {
                            capture.monitoringMode = modeSelect.value;
                            reconnectMeter();
                        }}>
                <option value="off" selected={capture.monitoringMode === "off"}>Off</option>
                <option value="direct" selected={capture.monitoringMode === "direct"}>Direct</option>
                <option value="effects" selected={capture.monitoringMode === "effects"}>With Effects</option>
            </select>);
                    currentDeviceId = capture.monitorOutputDeviceId.unwrapOrElse("");
                    deviceSelect = (<select className="select" onchange={function () {
                            var deviceId = deviceSelect.value === "" ? lib_std_1.Option.None : lib_std_1.Option.wrap(deviceSelect.value);
                            capture.setMonitorOutputDevice(deviceId);
                        }}>
                {outputDevices.map(function (device) { return (<option value={device.id} selected={device.id === currentDeviceId}>{device.label}</option>); })}
            </select>);
                    dialog = (<Dialog_1.Dialog headline="Monitoring" icon={studio_enums_1.IconSymbol.SpeakerHeadphone} style={{ minWidth: "auto", maxWidth: "auto" }} buttons={[{ text: "Close", primary: true, onClick: function (handler) { return handler.close(); } }]}>
                <div className={className}>
                    <div className="controls-row">
                        <ParamKnob lifecycle={lifecycle} editing={service.project.editing} parameter={volumeParam} anchor={0.8} color={studio_enums_1.Colors.yellow} label="Volume"/>
                        <ParamKnob lifecycle={lifecycle} editing={service.project.editing} parameter={panParam} anchor={0.5} color={studio_enums_1.Colors.green} label="Pan" options={configs_1.SnapCenter}/>
                        <div className="param-knob">
                            <h5>Mute</h5>
                            <Checkbox_1.Checkbox lifecycle={lifecycle} model={muteModel}>
                                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                            </Checkbox_1.Checkbox>
                        </div>
                    </div>
                    <div className="select-row">
                        <div className="field">
                            <label>Mode</label>
                            {modeSelect}
                        </div>
                        {switchable && (<div className="field">
                                <label>Output</label>
                                {deviceSelect}
                            </div>)}
                    </div>
                    <HorizontalPeakMeter_1.HorizontalPeakMeter lifecycle={lifecycle} peaksInDb={peaksInDb}/>
                </div>
            </Dialog_1.Dialog>);
                    dialog.addEventListener("close", function () { return lifecycle.terminate(); });
                    Surface_1.Surface.get().body.appendChild(dialog);
                    dialog.showModal();
                    return [2 /*return*/];
            }
        });
    }); };
})(MonitoringDialog || (exports.MonitoringDialog = MonitoringDialog = {}));
