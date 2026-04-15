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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SoundfontSelection_instances, _SoundfontSelection_service, _SoundfontSelection_selection, _SoundfontSelection_selected;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundfontSelection = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var dialogs_1 = require("../components/dialogs");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var SoundfontSelection = /** @class */ (function () {
    function SoundfontSelection(service, selection) {
        _SoundfontSelection_instances.add(this);
        _SoundfontSelection_service.set(this, void 0);
        _SoundfontSelection_selection.set(this, void 0);
        __classPrivateFieldSet(this, _SoundfontSelection_service, service, "f");
        __classPrivateFieldSet(this, _SoundfontSelection_selection, selection, "f");
    }
    SoundfontSelection.prototype.requestDevice = function () {
        if (!__classPrivateFieldGet(this, _SoundfontSelection_service, "f").hasProfile) {
            return;
        }
        var project = __classPrivateFieldGet(this, _SoundfontSelection_service, "f").project;
        var soundfont = __classPrivateFieldGet(this, _SoundfontSelection_instances, "m", _SoundfontSelection_selected).call(this)[0];
        if ((0, lib_std_1.isAbsent)(soundfont)) {
            return;
        }
        var uuid = soundfont.uuid, name = soundfont.name;
        var api = project.api, editing = project.editing;
        editing.modify(function () { return api.createInstrument(studio_adapters_1.InstrumentFactories.Soundfont, { attachment: { uuid: uuid, name: name } }); });
    };
    SoundfontSelection.prototype.deleteSelected = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.deleteSoundfonts.apply(this, __classPrivateFieldGet(this, _SoundfontSelection_instances, "m", _SoundfontSelection_selected).call(this))];
        }); });
    };
    SoundfontSelection.prototype.deleteSoundfonts = function () {
        var soundfonts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            soundfonts[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var dialog, used, online, _a, approved, _b, soundfonts_1, _c, uuid, name_1, isUsed, isOnline;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Checking Soundfont Usages" });
                        return [4 /*yield*/, studio_core_1.ProjectStorage.listUsedAssets(studio_boxes_1.SoundfontFileBox)];
                    case 1:
                        used = _d.sent();
                        _a = Set.bind;
                        return [4 /*yield*/, studio_core_1.OpenSoundfontAPI.get().all()];
                    case 2:
                        online = new (_a.apply(Set, [void 0, (_d.sent()).map(function (_a) {
                                var uuid = _a.uuid;
                                return uuid;
                            })]))();
                        dialog.terminate();
                        return [4 /*yield*/, dialogs_1.Dialogs.approve({
                                headline: "Remove Soundfont(s)?",
                                message: "This cannot be undone!",
                                approveText: "Remove"
                            })];
                    case 3:
                        approved = _d.sent();
                        if (!approved) {
                            return [2 /*return*/];
                        }
                        _b = 0, soundfonts_1 = soundfonts;
                        _d.label = 4;
                    case 4:
                        if (!(_b < soundfonts_1.length)) return [3 /*break*/, 9];
                        _c = soundfonts_1[_b], uuid = _c.uuid, name_1 = _c.name;
                        isUsed = used.has(uuid);
                        isOnline = online.has(uuid);
                        if (!(isUsed && !isOnline)) return [3 /*break*/, 6];
                        return [4 /*yield*/, dialogs_1.Dialogs.info({ headline: "Cannot Delete Soundfont", message: "".concat(name_1, " is used by a project.") })];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, studio_core_1.SoundfontStorage.get().deleteItem(lib_std_1.UUID.parse(uuid))];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 4];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return SoundfontSelection;
}());
exports.SoundfontSelection = SoundfontSelection;
_SoundfontSelection_service = new WeakMap(), _SoundfontSelection_selection = new WeakMap(), _SoundfontSelection_instances = new WeakSet(), _SoundfontSelection_selected = function _SoundfontSelection_selected() {
    var selected = __classPrivateFieldGet(this, _SoundfontSelection_selection, "f").getSelected();
    return selected.map(function (element) { return JSON.parse((0, lib_std_1.asDefined)(element.getAttribute("data-selection"))); });
};
