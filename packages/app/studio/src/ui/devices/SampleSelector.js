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
var _SampleSelector_service, _SampleSelector_strategy;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleSelector = exports.SampleSelectStrategy = void 0;
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_std_1 = require("@opendaw/lib-std");
var dialogs_1 = require("@/ui/components/dialogs");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_core_1 = require("@opendaw/studio-core");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var SampleSelectStrategy;
(function (SampleSelectStrategy) {
    SampleSelectStrategy.changePointer = function (filePointer, replacement) {
        if (!filePointer.box.isAttached()) {
            return;
        }
        replacement.match({
            none: function () { return filePointer.box.delete(); },
            some: function (newFile) { return filePointer.targetVertex.match({
                none: function () { return filePointer.refer(newFile); }, // just refer
                some: function (_a) {
                    var existingFile = _a.box;
                    if (lib_std_1.UUID.equals(newFile.address.uuid, existingFile.address.uuid)) {
                        console.debug("Same Sample. Ignore.");
                    }
                    else {
                        var mustDelete = existingFile.pointerHub.size() === 1; // filePointer was the only pointer > delete
                        filePointer.refer(newFile);
                        if (mustDelete) {
                            existingFile.delete();
                        }
                    }
                }
            }); }
        });
    };
    SampleSelectStrategy.forPointerField = function (filePointer) { return ({
        hasSample: function () { return filePointer.nonEmpty(); },
        replace: function (replacement) { return SampleSelectStrategy.changePointer(filePointer, replacement); }
    }); };
})(SampleSelectStrategy || (exports.SampleSelectStrategy = SampleSelectStrategy = {}));
var SampleSelector = /** @class */ (function () {
    function SampleSelector(service, strategy) {
        _SampleSelector_service.set(this, void 0);
        _SampleSelector_strategy.set(this, void 0);
        __classPrivateFieldSet(this, _SampleSelector_service, service, "f");
        __classPrivateFieldSet(this, _SampleSelector_strategy, strategy, "f");
    }
    SampleSelector.prototype.newSample = function (sample) {
        var _this = this;
        if (!__classPrivateFieldGet(this, _SampleSelector_service, "f").hasProfile) {
            return;
        }
        var _a = __classPrivateFieldGet(this, _SampleSelector_service, "f").project, boxGraph = _a.boxGraph, editing = _a.editing;
        var uuidAsString = sample.uuid, name = sample.name;
        var uuid = lib_std_1.UUID.parse(uuidAsString);
        editing.modify(function () { return __classPrivateFieldGet(_this, _SampleSelector_strategy, "f").replace(lib_std_1.Option.wrap(boxGraph.findBox(uuid)
            .unwrapOrElse(function () { return studio_boxes_1.AudioFileBox.create(boxGraph, uuid, function (box) {
            box.fileName.setValue(name);
            box.endInSeconds.setValue(sample.duration);
        }); }))); });
    };
    SampleSelector.prototype.replaceSample = function (replacement) {
        var _this = this;
        if (!__classPrivateFieldGet(this, _SampleSelector_service, "f").hasProfile) {
            return;
        }
        var editing = __classPrivateFieldGet(this, _SampleSelector_service, "f").project.editing;
        editing.modify(function () { return __classPrivateFieldGet(_this, _SampleSelector_strategy, "f").replace(replacement); });
    };
    SampleSelector.prototype.hasSample = function () { return __classPrivateFieldGet(this, _SampleSelector_strategy, "f").hasSample(); };
    SampleSelector.prototype.createRemoveMenuData = function () {
        var _this = this;
        return studio_core_1.MenuItem.default({
            label: "Remove Sample",
            selectable: this.hasSample()
        }).setTriggerProcedure(function () { return _this.replaceSample(lib_std_1.Option.None); });
    };
    SampleSelector.prototype.createBrowseMenuData = function () {
        var _this = this;
        return studio_core_1.MenuItem.default({
            label: "Browse Sample..."
        }).setTriggerProcedure(function () { return _this.browse(); });
    };
    SampleSelector.prototype.browse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, sample;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Files.open(studio_core_1.FilePickerAcceptTypes.WavFiles)
                            .then(function (_a) {
                            var file = _a[0];
                            return file.arrayBuffer()
                                .then(function (arrayBuffer) { return __classPrivateFieldGet(_this, _SampleSelector_service, "f").sampleService.importFile({ name: file.name, arrayBuffer: arrayBuffer }); });
                        }))];
                    case 1:
                        _a = _b.sent(), status = _a.status, sample = _a.value;
                        if (status === "resolved") {
                            __classPrivateFieldGet(this, _SampleSelector_service, "f").project.trackUserCreatedSample(lib_std_1.UUID.parse(sample.uuid));
                            this.newSample(sample);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SampleSelector.prototype.configureBrowseClick = function (button) {
        var _this = this;
        return lib_dom_1.Events.subscribe(button, "click", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.browse()];
        }); }); });
    };
    SampleSelector.prototype.configureContextMenu = function (button) {
        var _this = this;
        return studio_core_1.ContextMenu.subscribe(button, function (collector) { return collector.addItems(_this.createRemoveMenuData()); });
    };
    SampleSelector.prototype.configureDrop = function (dropZone) {
        var _this = this;
        return DragAndDrop_1.DragAndDrop.installTarget(dropZone, {
            drag: function (_event, data) { return data.type === "sample" || data.type === "file"; },
            drop: function (_event, data) { return __awaiter(_this, void 0, void 0, function () {
                var dialog, sample, _a, status_1, value, error, _b, _c, _d, _e;
                var _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (!(data.type === "sample" || data.type === "file")) {
                                return [2 /*return*/];
                            }
                            dialog = dialogs_1.Dialogs.processMonolog("Import Sample");
                            if (!(data.type === "sample")) return [3 /*break*/, 1];
                            sample = data.sample;
                            return [3 /*break*/, 5];
                        case 1:
                            if (!(data.type === "file")) return [3 /*break*/, 4];
                            if (!(0, lib_std_1.isDefined)(data.file)) {
                                return [2 /*return*/];
                            }
                            _c = (_b = lib_runtime_1.Promises).tryCatch;
                            _e = (_d = __classPrivateFieldGet(this, _SampleSelector_service, "f").sampleService).importFile;
                            _f = {
                                name: data.file.name
                            };
                            return [4 /*yield*/, data.file.arrayBuffer()];
                        case 2: return [4 /*yield*/, _c.apply(_b, [_e.apply(_d, [(_f.arrayBuffer = _g.sent(),
                                        _f)])])];
                        case 3:
                            _a = _g.sent(), status_1 = _a.status, value = _a.value, error = _a.error;
                            if (status_1 === "rejected") {
                                console.warn(error);
                                dialog.close();
                                return [2 /*return*/];
                            }
                            __classPrivateFieldGet(this, _SampleSelector_service, "f").project.trackUserCreatedSample(lib_std_1.UUID.parse(value.uuid));
                            sample = value;
                            return [3 /*break*/, 5];
                        case 4:
                            dialog.close();
                            return [2 /*return*/];
                        case 5:
                            this.newSample(sample);
                            dialog.close();
                            return [2 /*return*/];
                    }
                });
            }); },
            enter: function (allowDrop) { return dropZone.classList.toggle("accept", allowDrop); },
            leave: function () { return dropZone.classList.remove("accept"); }
        });
    };
    return SampleSelector;
}());
exports.SampleSelector = SampleSelector;
_SampleSelector_service = new WeakMap(), _SampleSelector_strategy = new WeakMap();
