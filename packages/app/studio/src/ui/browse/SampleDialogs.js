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
exports.SampleDialogs = void 0;
var Dialog_1 = require("@/ui/components/Dialog");
var studio_enums_1 = require("@opendaw/studio-enums");
var Surface_1 = require("@/ui/surface/Surface");
var dialogs_1 = require("@/ui/components/dialogs");
var lib_std_1 = require("@opendaw/lib-std");
var SampleDialogs;
(function (SampleDialogs) {
    var _this = this;
    SampleDialogs.showEditSampleDialog = function (sample) { return __awaiter(_this, void 0, void 0, function () {
        var _a, resolve, reject, promise, inputName, inputBpm, approve, dialog;
        return __generator(this, function (_b) {
            if (sample.origin === "openDAW") {
                return [2 /*return*/, Promise.reject("Cannot change sample from the cloud")];
            }
            _a = Promise.withResolvers(), resolve = _a.resolve, reject = _a.reject, promise = _a.promise;
            inputName = <input className="default" type="text" value={sample.name} placeholder="Enter a name"/>;
            inputName.select();
            inputName.focus();
            inputBpm = <input className="default" type="number" value={String(sample.bpm)}/>;
            approve = function () {
                var name = inputName.value;
                if (name.trim().length < 3) {
                    dialogs_1.Dialogs.info({ headline: "Invalid Name", message: "Must be at least 3 letters long." }).finally();
                    return false;
                }
                var bpm = parseFloat(inputBpm.value);
                if (isNaN(bpm)) {
                    dialogs_1.Dialogs.info({ headline: "Invalid Bpm", message: "Must be a number." }).finally();
                    return false;
                }
                sample.name = name;
                sample.bpm = bpm;
                resolve(sample);
                return true;
            };
            dialog = (<Dialog_1.Dialog headline="Edit Sample" icon={studio_enums_1.IconSymbol.Waveform} cancelable={true} buttons={[{
                        text: "Save",
                        primary: true,
                        onClick: function (handler) {
                            if (approve()) {
                                handler.close();
                            }
                        }
                    }]}>
                <div style={{ padding: "1em 0", display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "1em" }}>
                    <div>Name:</div>
                    {inputName}
                    <div>Bpm:</div>
                    {inputBpm}
                </div>
            </Dialog_1.Dialog>);
            dialog.oncancel = function () { return reject(lib_std_1.Errors.AbortError); };
            dialog.onkeydown = function (event) {
                if (event.code === "Enter") {
                    if (approve()) {
                        dialog.close();
                    }
                }
            };
            Surface_1.Surface.get().flyout.appendChild(dialog);
            dialog.showModal();
            return [2 /*return*/, promise];
        });
    }); };
})(SampleDialogs || (exports.SampleDialogs = SampleDialogs = {}));
