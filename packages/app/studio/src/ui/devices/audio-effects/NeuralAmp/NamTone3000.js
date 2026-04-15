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
exports.NamTone3000 = exports.scanCachedModels = exports.readModelFromPack = exports.readPackMetaFromId = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var studio_core_1 = require("@opendaw/studio-core");
var Tone3000Dialog_1 = require("./Tone3000Dialog");
var AppId = "openDAW";
var SelectEndpoint = "https://www.tone3000.com/api/v1/select";
var StorageKey = "tone3000_tone_url";
var StorageDoneKey = "tone3000_done";
var packPath = function (toneId) { return "tone3000/".concat(toneId); };
var packMetaPath = function (toneId) { return "".concat(packPath(toneId), "/pack.json"); };
var modelPath = function (toneId, modelId) { return "".concat(packPath(toneId), "/models/").concat(modelId, ".nam"); };
var waitForToneUrl = function () {
    return new Promise(function (resolve) {
        localStorage.removeItem(StorageKey);
        localStorage.removeItem(StorageDoneKey);
        var onStorage = function (event) {
            if (event.key === StorageKey && event.newValue !== null) {
                window.removeEventListener("storage", onStorage);
                resolve(event.newValue);
            }
        };
        window.addEventListener("storage", onStorage);
    });
};
var fetchTone = function (toneUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(toneUrl)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch tone: ".concat(response.status));
                }
                return [2 /*return*/, response.json()];
        }
    });
}); };
var downloadModel = function (modelUrl, signal) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(modelUrl, signal ? { signal: signal } : undefined)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to download model: ".concat(response.status));
                }
                return [2 /*return*/, response.text()];
        }
    });
}); };
var readPackMeta = function (toneId) { return __awaiter(void 0, void 0, void 0, function () {
    var path, bytes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = packMetaPath(toneId);
                return [4 /*yield*/, studio_core_1.Workers.Opfs.exists(path)];
            case 1:
                if (!(_a.sent())) {
                    return [2 /*return*/, null];
                }
                return [4 /*yield*/, studio_core_1.Workers.Opfs.read(path)];
            case 2:
                bytes = _a.sent();
                return [2 /*return*/, JSON.parse(new TextDecoder().decode(bytes))];
        }
    });
}); };
var readPackMetaFromId = function (packId) { return __awaiter(void 0, void 0, void 0, function () {
    var toneId;
    return __generator(this, function (_a) {
        toneId = parseInt(packId, 10);
        if (isNaN(toneId)) {
            return [2 /*return*/, null];
        }
        return [2 /*return*/, readPackMeta(toneId)];
    });
}); };
exports.readPackMetaFromId = readPackMetaFromId;
var readModelFromPack = function (packId, modelId, signal) { return __awaiter(void 0, void 0, void 0, function () {
    var toneId, path, bytes, meta, entry, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                toneId = parseInt(packId, 10);
                path = modelPath(toneId, modelId);
                return [4 /*yield*/, studio_core_1.Workers.Opfs.exists(path)];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, studio_core_1.Workers.Opfs.read(path)];
            case 2:
                bytes = _a.sent();
                return [2 /*return*/, new TextDecoder().decode(bytes)];
            case 3: return [4 /*yield*/, readPackMeta(toneId)];
            case 4:
                meta = _a.sent();
                if (meta === null) {
                    throw new Error("Pack metadata not found");
                }
                entry = meta.models.find(function (entry) { return entry.id === modelId; });
                if (!(0, lib_std_1.isDefined)(entry) || entry.model_url.length === 0) {
                    throw new Error("Model URL not available — re-select pack to refresh URLs");
                }
                return [4 /*yield*/, downloadModel(entry.model_url, signal)];
            case 5:
                text = _a.sent();
                return [4 /*yield*/, studio_core_1.Workers.Opfs.write(path, new TextEncoder().encode(text))];
            case 6:
                _a.sent();
                return [2 /*return*/, text];
        }
    });
}); };
exports.readModelFromPack = readModelFromPack;
var storePackToOpfs = function (tone) { return __awaiter(void 0, void 0, void 0, function () {
    var toneId, existingMeta, newModelIds, _i, _a, model, _b, meta, defaultModel, text;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                toneId = tone.id;
                return [4 /*yield*/, readPackMeta(toneId)];
            case 1:
                existingMeta = _c.sent();
                if (!((0, lib_std_1.isDefined)(existingMeta) && existingMeta.updatedAt !== tone.updated_at)) return [3 /*break*/, 7];
                newModelIds = new Set(tone.models.map(function (model) { return model.id; }));
                _i = 0, _a = existingMeta.models;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                model = _a[_i];
                _b = !newModelIds.has(model.id);
                if (!_b) return [3 /*break*/, 4];
                return [4 /*yield*/, studio_core_1.Workers.Opfs.exists(modelPath(toneId, model.id))];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                if (!_b) return [3 /*break*/, 6];
                return [4 /*yield*/, studio_core_1.Workers.Opfs.delete(modelPath(toneId, model.id))];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                meta = {
                    toneId: toneId,
                    title: tone.title,
                    updatedAt: tone.updated_at,
                    models: tone.models.map(function (model) { return ({
                        id: model.id, name: model.name, size: model.size, model_url: model.model_url
                    }); })
                };
                return [4 /*yield*/, studio_core_1.Workers.Opfs.write(packMetaPath(toneId), new TextEncoder().encode(JSON.stringify(meta)))];
            case 8:
                _c.sent();
                defaultModel = pickDefaultModel(meta);
                return [4 /*yield*/, studio_core_1.Workers.Opfs.exists(modelPath(toneId, defaultModel.id))];
            case 9:
                if (!!(_c.sent())) return [3 /*break*/, 12];
                return [4 /*yield*/, downloadModel(defaultModel.model_url)];
            case 10:
                text = _c.sent();
                return [4 /*yield*/, studio_core_1.Workers.Opfs.write(modelPath(toneId, defaultModel.id), new TextEncoder().encode(text))];
            case 11:
                _c.sent();
                _c.label = 12;
            case 12: return [2 /*return*/, meta];
        }
    });
}); };
var pickDefaultModel = function (meta) {
    var standard = meta.models.find(function (model) { return model.size === "standard"; });
    return standard !== null && standard !== void 0 ? standard : meta.models[0];
};
var scanCachedModels = function (packId, meta) { return __awaiter(void 0, void 0, void 0, function () {
    var toneId, entries, fileNames, cached, _i, _a, model;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                toneId = parseInt(packId, 10);
                if (isNaN(toneId)) {
                    return [2 /*return*/, new Set()];
                }
                return [4 /*yield*/, studio_core_1.Workers.Opfs.list("".concat(packPath(toneId), "/models"))
                        .catch(function () { return []; })];
            case 1:
                entries = _b.sent();
                fileNames = new Set(entries.filter(function (entry) { return entry.kind === "file"; }).map(function (entry) { return entry.name; }));
                cached = new Set();
                for (_i = 0, _a = meta.models; _i < _a.length; _i++) {
                    model = _a[_i];
                    if (fileNames.has("".concat(model.id, ".nam"))) {
                        cached.add(model.id);
                    }
                }
                return [2 /*return*/, cached];
        }
    });
}); };
exports.scanCachedModels = scanCachedModels;
var NamTone3000;
(function (NamTone3000) {
    var _this = this;
    NamTone3000.browse = function (boxGraph, editing, adapter) { return function () { return __awaiter(_this, void 0, void 0, function () {
        var status, redirectUrl, url, toneUrlPromise, toneUrl, tone, meta_1, defaultModel_1, text_1, jsonBuffer, uuid_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch((0, Tone3000Dialog_1.showTone3000Dialog)())];
                case 1:
                    status = (_a.sent()).status;
                    if (status === "rejected") {
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    redirectUrl = "".concat(window.location.origin, "/tone3000-callback.html");
                    url = "".concat(SelectEndpoint, "?app_id=").concat(AppId, "&redirect_url=").concat(encodeURIComponent(redirectUrl), "&platform=nam");
                    toneUrlPromise = waitForToneUrl();
                    window.open(url, "tone3000");
                    return [4 /*yield*/, toneUrlPromise];
                case 3:
                    toneUrl = _a.sent();
                    localStorage.setItem(StorageDoneKey, "true");
                    return [4 /*yield*/, fetchTone(toneUrl)];
                case 4:
                    tone = _a.sent();
                    if (tone.models.length === 0) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, storePackToOpfs(tone)];
                case 5:
                    meta_1 = _a.sent();
                    defaultModel_1 = pickDefaultModel(meta_1);
                    return [4 /*yield*/, (0, exports.readModelFromPack)(meta_1.toneId.toString(), defaultModel_1.id)];
                case 6:
                    text_1 = _a.sent();
                    jsonBuffer = new TextEncoder().encode(text_1);
                    return [4 /*yield*/, lib_std_1.UUID.sha256(jsonBuffer.buffer)];
                case 7:
                    uuid_1 = _a.sent();
                    editing.modify(function () {
                        var oldTarget = adapter.box.model.targetVertex;
                        var modelBox = boxGraph.findBox(uuid_1).unwrapOrElse(function () {
                            return studio_boxes_1.NeuralAmpModelBox.create(boxGraph, uuid_1, function (box) {
                                box.label.setValue("".concat(meta_1.title, " \u2014 ").concat(defaultModel_1.name));
                                box.model.setValue(text_1);
                                box.packId.setValue(meta_1.toneId.toString());
                            });
                        });
                        adapter.box.model.refer(modelBox);
                        if (oldTarget.nonEmpty()) {
                            var oldVertex = oldTarget.unwrap();
                            if (oldVertex !== modelBox && oldVertex.pointerHub.isEmpty()) {
                                oldVertex.box.unstage();
                            }
                        }
                    });
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    if (lib_std_1.Errors.isAbort(error_1)) {
                        return [2 /*return*/];
                    }
                    console.error("Failed to load NAM model from Tone 3000:", error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); }; };
    NamTone3000.loadModelFromPack = function (packId, modelId, modelName, boxGraph, editing, adapter, packTitle, signal) { return __awaiter(_this, void 0, void 0, function () {
        var text, jsonBuffer, uuid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.readModelFromPack)(packId, modelId, signal)];
                case 1:
                    text = _a.sent();
                    jsonBuffer = new TextEncoder().encode(text);
                    return [4 /*yield*/, lib_std_1.UUID.sha256(jsonBuffer.buffer)];
                case 2:
                    uuid = _a.sent();
                    editing.modify(function () {
                        var oldTarget = adapter.box.model.targetVertex;
                        var modelBox = boxGraph.findBox(uuid).unwrapOrElse(function () {
                            return studio_boxes_1.NeuralAmpModelBox.create(boxGraph, uuid, function (box) {
                                box.label.setValue("".concat(packTitle, " \u2014 ").concat(modelName));
                                box.model.setValue(text);
                                box.packId.setValue(packId);
                            });
                        });
                        adapter.box.model.refer(modelBox);
                        if (oldTarget.nonEmpty()) {
                            var oldVertex = oldTarget.unwrap();
                            if (oldVertex !== modelBox && oldVertex.pointerHub.isEmpty()) {
                                oldVertex.box.unstage();
                            }
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); };
})(NamTone3000 || (exports.NamTone3000 = NamTone3000 = {}));
