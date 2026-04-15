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
exports.showVideoExportDialog = void 0;
var Dialog_1 = require("@/ui/components/Dialog");
var Surface_1 = require("@/ui/surface/Surface");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_std_1 = require("@opendaw/lib-std");
var Button_1 = require("@/ui/components/Button");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var NumberInput_1 = require("@/ui/components/NumberInput");
var Checkbox_1 = require("@/ui/components/Checkbox");
var Icon_1 = require("@/ui/components/Icon");
var QUALITY_PRESETS = [
    { label: "Medium", bitrate: 8000000 },
    { label: "High", bitrate: 16000000 },
    { label: "Very High", bitrate: 32000000 }
];
var PRESETS = [
    { label: "HD", width: 1280, height: 720 },
    { label: "Full HD", width: 1920, height: 1080 },
    { label: "4K", width: 3840, height: 2160 },
    { label: "Vertical", width: 1080, height: 1920 }
];
var FPS_OPTIONS = [30, 60, 120];
var widthModel = new lib_std_1.DefaultObservableValue(1280);
var heightModel = new lib_std_1.DefaultObservableValue(720);
var fpsModel = new lib_std_1.DefaultObservableValue(60);
var durationModel = new lib_std_1.DefaultObservableValue(0);
var overlayModel = new lib_std_1.DefaultObservableValue(true);
var qualityModel = new lib_std_1.DefaultObservableValue(QUALITY_PRESETS[1].bitrate);
var showVideoExportDialog = function (sampleRate) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, resolve, reject, promise, lifecycle, setDimensions, dialog;
    return __generator(this, function (_b) {
        _a = Promise.withResolvers(), resolve = _a.resolve, reject = _a.reject, promise = _a.promise;
        lifecycle = new lib_std_1.Terminator();
        setDimensions = function (width, height) {
            widthModel.setValue(width);
            heightModel.setValue(height);
        };
        dialog = (<Dialog_1.Dialog headline="Export Video" icon={studio_enums_1.IconSymbol.Film} style={{ minWidth: "24em" }} buttons={[
                {
                    text: "Cancel",
                    onClick: function (handler) {
                        handler.close();
                        reject(lib_std_1.Errors.AbortError);
                    }
                },
                {
                    text: "Export",
                    primary: true,
                    onClick: function (handler) {
                        if ((0, lib_std_1.isInstanceOf)(document.activeElement, HTMLElement)) {
                            document.activeElement.blur();
                        }
                        handler.close();
                        resolve({
                            width: widthModel.getValue(),
                            height: heightModel.getValue(),
                            frameRate: fpsModel.getValue(),
                            sampleRate: sampleRate,
                            duration: durationModel.getValue(),
                            overlay: overlayModel.getValue(),
                            videoBitrate: qualityModel.getValue()
                        });
                    }
                }
            ]} cancelable={true}>
            <div style={{ padding: "1em 0", display: "flex", flexDirection: "column", gap: "1em" }}>
                <div>
                    <div style={{ marginBottom: "0.5em", fontWeight: "bold" }}>Dimensions</div>
                    <div style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
                        <NumberInput_1.NumberInput lifecycle={lifecycle} model={widthModel} maxChars={5}/>
                        <span>×</span>
                        <NumberInput_1.NumberInput lifecycle={lifecycle} model={heightModel} maxChars={5}/>
                        <span style={{ opacity: "0.5" }}>px</span>
                    </div>
                    <div style={{
                display: "flex",
                gap: "0.25em",
                flexWrap: "wrap",
                marginTop: "0.5em",
                fontSize: "0.75em"
            }}>
                        {PRESETS.map(function (preset) { return (<Button_1.Button lifecycle={lifecycle} onClick={function () { return setDimensions(preset.width, preset.height); }}>
                                <span>{preset.label}</span>
                            </Button_1.Button>); })}
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: "0.5em", fontWeight: "bold" }}>Frame Rate</div>
                    <div style={{ display: "flex", gap: "0.5em", alignItems: "center", fontSize: "10px" }}>
                        <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={fpsModel} elements={FPS_OPTIONS.map(function (fps) { return ({ value: fps, element: <span>{fps}</span> }); })}/>
                        <span style={{ opacity: "0.5" }}>fps</span>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: "0.5em", fontWeight: "bold" }}>Quality</div>
                    <div style={{ display: "flex", gap: "0.5em", alignItems: "center", fontSize: "10px" }}>
                        <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={qualityModel} elements={QUALITY_PRESETS.map(function (preset) { return ({
                value: preset.bitrate,
                element: <span>{preset.label}</span>
            }); })}/>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: "0.5em", fontWeight: "bold" }}>Duration</div>
                    <div style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
                        <NumberInput_1.NumberInput lifecycle={lifecycle} model={durationModel} maxChars={4}/>
                        <span style={{ fontSize: "0.875em", opacity: "0.5" }}>seconds (0 = full)</span>
                    </div>
                </div>
                <div style={{ fontSize: "0.875em", marginTop: "1em" }}>
                    <Checkbox_1.Checkbox lifecycle={lifecycle} model={overlayModel}>
                        <span>Render Overlay</span>
                        <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                    </Checkbox_1.Checkbox>
                </div>
                {!(0, lib_std_1.isDefined)(window.showSaveFilePicker) && (<div style={{
                    fontSize: "0.875em",
                    opacity: "0.8",
                    marginTop: "0.5em",
                    color: studio_enums_1.Colors.orange.toString()
                }}>For larger video files, Chrome is recommended.</div>)}
            </div>
        </Dialog_1.Dialog>);
        dialog.oncancel = function () { return reject(lib_std_1.Errors.AbortError); };
        Surface_1.Surface.get().flyout.appendChild(dialog);
        dialog.showModal();
        return [2 /*return*/, promise.finally(function () { return lifecycle.terminate(); })];
    });
}); };
exports.showVideoExportDialog = showVideoExportDialog;
