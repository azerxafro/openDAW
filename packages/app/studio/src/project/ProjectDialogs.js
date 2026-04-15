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
exports.ProjectDialogs = void 0;
var Dialog_1 = require("@/ui/components/Dialog");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var Surface_1 = require("@/ui/surface/Surface");
var lib_std_1 = require("@opendaw/lib-std");
var ProjectBrowser_1 = require("@/project/ProjectBrowser");
var ExportStemsConfigurator_1 = require("@/service/ExportStemsConfigurator");
var ProjectDialogs;
(function (ProjectDialogs) {
    var _this = this;
    ProjectDialogs.showSaveDialog = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
        var _c, resolve, reject, promise, inputField, approve, dialog;
        var headline = _b.headline, meta = _b.meta;
        return __generator(this, function (_d) {
            _c = Promise.withResolvers(), resolve = _c.resolve, reject = _c.reject, promise = _c.promise;
            inputField = <input className="default" type="text" placeholder="Enter a name"/>;
            if ((0, lib_std_1.isDefined)(meta)) {
                inputField.value = meta.name;
                inputField.select();
                inputField.focus();
            }
            approve = function () {
                var _a, _b, _c, _d;
                var date = new Date().toISOString();
                resolve({
                    artist: (_a = meta === null || meta === void 0 ? void 0 : meta.artist) !== null && _a !== void 0 ? _a : "",
                    name: inputField.value,
                    description: (_b = meta === null || meta === void 0 ? void 0 : meta.description) !== null && _b !== void 0 ? _b : "",
                    tags: (_c = meta === null || meta === void 0 ? void 0 : meta.tags) !== null && _c !== void 0 ? _c : [],
                    created: (_d = meta === null || meta === void 0 ? void 0 : meta.created) !== null && _d !== void 0 ? _d : date,
                    modified: date
                });
            };
            dialog = (<Dialog_1.Dialog headline={headline} icon={studio_enums_1.IconSymbol.FileList} cancelable={true} buttons={[{
                        text: "Save",
                        primary: true,
                        onClick: function (handler) {
                            handler.close();
                            approve();
                        }
                    }]}>
                <div style={{ padding: "1em 0", display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "1em" }}>
                    <div>Name:</div>
                    {inputField}
                </div>
            </Dialog_1.Dialog>);
            dialog.oncancel = function () { return reject(lib_std_1.Errors.AbortError); };
            dialog.onkeydown = function (event) {
                if (event.code === "Enter") {
                    dialog.close();
                    approve();
                }
            };
            Surface_1.Surface.get().flyout.appendChild(dialog);
            dialog.showModal();
            return [2 /*return*/, promise];
        });
    }); };
    ProjectDialogs.showBrowseDialog = function (service) { return __awaiter(_this, void 0, void 0, function () {
        var _a, resolve, reject, promise, lifecycle, dialog;
        return __generator(this, function (_b) {
            _a = Promise.withResolvers(), resolve = _a.resolve, reject = _a.reject, promise = _a.promise;
            lifecycle = new lib_std_1.Terminator();
            dialog = (<Dialog_1.Dialog headline={"Browse Projects"} icon={studio_enums_1.IconSymbol.FileList} buttons={[{ text: "Cancel", onClick: function () { return dialog.close(); } }]} cancelable={true} style={{ height: "30em" }}>
                <div style={{ height: "2em" }}/>
                <ProjectBrowser_1.ProjectBrowser lifecycle={lifecycle} service={service} select={function (result) {
                    resolve(result);
                    dialog.close();
                }}/>
            </Dialog_1.Dialog>);
            dialog.oncancel = function () { return reject("cancel"); };
            dialog.onkeydown = function (event) { if (event.code === "Enter") {
                dialog.close();
            } };
            Surface_1.Surface.get().flyout.appendChild(dialog);
            dialog.showModal();
            return [2 /*return*/, promise.finally(function () { return lifecycle.terminate(); })];
        });
    }); };
    ProjectDialogs.showExportStemsDialog = function (project) { return __awaiter(_this, void 0, void 0, function () {
        var _a, resolve, reject, promise, terminator, configuration, dialog;
        return __generator(this, function (_b) {
            _a = Promise.withResolvers(), resolve = _a.resolve, reject = _a.reject, promise = _a.promise;
            terminator = new lib_std_1.Terminator();
            configuration = Object
                .fromEntries(project.rootBoxAdapter.audioUnits.adapters()
                .map(function (unit) { return ([
                lib_std_1.UUID.toString(unit.uuid),
                {
                    type: unit.type,
                    label: unit.input.label.unwrap(),
                    include: !unit.isOutput,
                    includeAudioEffects: true,
                    includeSends: true,
                    useInstrumentOutput: false,
                    fileName: studio_adapters_1.ExportStemsConfiguration.sanitizeFileName(unit.input.label.unwrap())
                }
            ]); }));
            dialog = (<Dialog_1.Dialog headline={"Export Stems"} icon={studio_enums_1.IconSymbol.FileList} style={{ maxWidth: "40em" }} buttons={[
                    {
                        text: "Cancel",
                        onClick: function () {
                            dialog.close();
                            reject(lib_std_1.Errors.AbortError);
                        }
                    },
                    {
                        text: "Export", onClick: function () {
                            resolve(Object.fromEntries(Object.entries(configuration)
                                .filter(function (_a) {
                                var _ = _a[0], value = _a[1];
                                return value.include;
                            })
                                .map(function (_a) {
                                var key = _a[0], value = _a[1];
                                return [key, lib_std_1.Objects.include.apply(lib_std_1.Objects, __spreadArray([value], [
                                        "includeAudioEffects",
                                        "includeSends",
                                        "fileName"
                                    ], false))];
                            })));
                            dialog.close();
                        },
                        primary: true
                    }
                ]} cancelable={true}>
                <ExportStemsConfigurator_1.ExportStemsConfigurator lifecycle={terminator} configuration={configuration}/>
            </Dialog_1.Dialog>);
            dialog.oncancel = function () { return reject(lib_std_1.Errors.AbortError); };
            dialog.onkeydown = function (event) { if (event.code === "Enter") {
                dialog.close();
            } };
            Surface_1.Surface.get().flyout.appendChild(dialog);
            dialog.showModal();
            return [2 /*return*/, promise.finally(function () { return terminator.terminate(); })];
        });
    }); };
})(ProjectDialogs || (exports.ProjectDialogs = ProjectDialogs = {}));
