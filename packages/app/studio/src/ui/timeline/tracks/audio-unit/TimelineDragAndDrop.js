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
var _TimelineDragAndDrop_service, _TimelineDragAndDrop_capturing;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineDragAndDrop = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var TimelineDragAndDrop = /** @class */ (function () {
    function TimelineDragAndDrop(service, capturing) {
        _TimelineDragAndDrop_service.set(this, void 0);
        _TimelineDragAndDrop_capturing.set(this, void 0);
        __classPrivateFieldSet(this, _TimelineDragAndDrop_service, service, "f");
        __classPrivateFieldSet(this, _TimelineDragAndDrop_capturing, capturing, "f");
    }
    Object.defineProperty(TimelineDragAndDrop.prototype, "project", {
        get: function () { return __classPrivateFieldGet(this, _TimelineDragAndDrop_service, "f").project; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimelineDragAndDrop.prototype, "capturing", {
        get: function () { return __classPrivateFieldGet(this, _TimelineDragAndDrop_capturing, "f"); },
        enumerable: false,
        configurable: true
    });
    TimelineDragAndDrop.prototype.canDrop = function (event, data) {
        var target = __classPrivateFieldGet(this, _TimelineDragAndDrop_capturing, "f").captureEvent(event);
        if ((target === null || target === void 0 ? void 0 : target.type) === "track" && target.track.trackBoxAdapter.type !== studio_adapters_1.TrackType.Audio) {
            return lib_std_1.Option.None;
        }
        if ((target === null || target === void 0 ? void 0 : target.type) === "clip") {
            var adapter = target.clip.trackBoxAdapter;
            if (adapter.isEmpty() || adapter.unwrap().type !== studio_adapters_1.TrackType.Audio) {
                return lib_std_1.Option.None;
            }
        }
        if ((target === null || target === void 0 ? void 0 : target.type) === "region") {
            var adapter = target.region.trackBoxAdapter;
            if (adapter.isEmpty() || adapter.unwrap().type !== studio_adapters_1.TrackType.Audio) {
                return lib_std_1.Option.None;
            }
        }
        if (data.type !== "sample" && data.type !== "instrument" && data.type !== "file") {
            return lib_std_1.Option.None;
        }
        return lib_std_1.Option.wrap(target !== null && target !== void 0 ? target : "instrument");
    };
    TimelineDragAndDrop.prototype.drop = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var optDrop, drop, project, boxAdapters, boxGraph, editing, api, aborted, subscription, sample, file_1, _a, status_1, value, error, uuidAsString, name, uuid, audioDataResult, audioFileBoxResult, audioFileBoxFactory;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        optDrop = this.canDrop(event, data);
                        if (optDrop.isEmpty()) {
                            return [2 /*return*/];
                        }
                        drop = optDrop.unwrap();
                        project = this.project;
                        boxAdapters = project.boxAdapters, boxGraph = project.boxGraph, editing = project.editing, api = project.api;
                        aborted = false;
                        subscription = __classPrivateFieldGet(this, _TimelineDragAndDrop_service, "f").projectProfileService.subscribe(function () { aborted = true; });
                        if (!(data.type === "sample")) return [3 /*break*/, 1];
                        sample = data.sample;
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(data.type === "file")) return [3 /*break*/, 3];
                        file_1 = data.file;
                        if (!(0, lib_std_1.isDefined)(file_1)) {
                            subscription.terminate();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(file_1.arrayBuffer()
                                .then(function (arrayBuffer) { return __classPrivateFieldGet(_this, _TimelineDragAndDrop_service, "f").sampleService.importFile({ name: file_1.name, arrayBuffer: arrayBuffer }); }))];
                    case 2:
                        _a = _b.sent(), status_1 = _a.status, value = _a.value, error = _a.error;
                        if (aborted) {
                            subscription.terminate();
                            return [2 /*return*/];
                        }
                        if (status_1 === "rejected") {
                            console.warn(error);
                            subscription.terminate();
                            return [2 /*return*/];
                        }
                        project.trackUserCreatedSample(lib_std_1.UUID.parse(value.uuid));
                        sample = value;
                        return [3 /*break*/, 4];
                    case 3:
                        if (data.type === "instrument") {
                            subscription.terminate();
                            editing.modify(function () { return api.createAnyInstrument(studio_adapters_1.InstrumentFactories[data.device]); });
                            return [2 /*return*/];
                        }
                        else {
                            subscription.terminate();
                            return [2 /*return*/];
                        }
                        _b.label = 4;
                    case 4:
                        uuidAsString = sample.uuid, name = sample.name;
                        uuid = lib_std_1.UUID.parse(uuidAsString);
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(__classPrivateFieldGet(this, _TimelineDragAndDrop_service, "f").sampleManager.getAudioData(uuid))];
                    case 5:
                        audioDataResult = _b.sent();
                        if (aborted) {
                            subscription.terminate();
                            return [2 /*return*/];
                        }
                        if (!(audioDataResult.status === "rejected")) return [3 /*break*/, 7];
                        console.warn("Failed to load sample:", audioDataResult.error);
                        subscription.terminate();
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Sample Error", message: "Failed to load sample '".concat(name, "'.") })];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.AudioFileBoxFactory
                            .createModifier(studio_core_1.Workers.Transients, boxGraph, audioDataResult.value, uuid, name))];
                    case 8:
                        audioFileBoxResult = _b.sent();
                        if (aborted) {
                            subscription.terminate();
                            return [2 /*return*/];
                        }
                        if (!(audioFileBoxResult.status === "rejected")) return [3 /*break*/, 10];
                        console.warn("Failed to create audio file:", audioFileBoxResult.error);
                        subscription.terminate();
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Sample Error", message: "Failed to process sample '".concat(name, "'.") })];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                    case 10:
                        subscription.terminate();
                        audioFileBoxFactory = audioFileBoxResult.value;
                        editing.modify(function () {
                            var trackBoxAdapter;
                            if (drop === "instrument") {
                                trackBoxAdapter = boxAdapters
                                    .adapterFor(api.createInstrument(studio_adapters_1.InstrumentFactories.Tape).trackBox, studio_adapters_1.TrackBoxAdapter);
                            }
                            else if ((drop === null || drop === void 0 ? void 0 : drop.type) === "track") {
                                trackBoxAdapter = drop.track.trackBoxAdapter;
                            }
                            else if ((drop === null || drop === void 0 ? void 0 : drop.type) === "clip") {
                                var clipTrack = drop.clip.trackBoxAdapter;
                                if (clipTrack.isEmpty()) {
                                    return;
                                }
                                trackBoxAdapter = clipTrack.unwrap();
                            }
                            else if ((drop === null || drop === void 0 ? void 0 : drop.type) === "region") {
                                var regionTrack = drop.region.trackBoxAdapter;
                                if (regionTrack.isEmpty()) {
                                    return;
                                }
                                trackBoxAdapter = regionTrack.unwrap();
                            }
                            else {
                                return (0, lib_std_1.panic)("Illegal State");
                            }
                            var audioFileBox = audioFileBoxFactory();
                            _this.handleSample({ event: event, trackBoxAdapter: trackBoxAdapter, audioFileBox: audioFileBox, sample: sample, type: data.type });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return TimelineDragAndDrop;
}());
exports.TimelineDragAndDrop = TimelineDragAndDrop;
_TimelineDragAndDrop_service = new WeakMap(), _TimelineDragAndDrop_capturing = new WeakMap();
