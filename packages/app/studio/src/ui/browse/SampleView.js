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
exports.SampleView = void 0;
var SampleView_sass_inline_1 = require("./SampleView.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_1 = require("../components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var SampleDialogs_1 = require("@/ui/browse/SampleDialogs");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var className = lib_dom_1.Html.adoptStyleSheet(SampleView_sass_inline_1.default, "Sample");
var SampleView = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, sampleSelection = _a.sampleSelection, sample = _a.sample, playback = _a.playback, location = _a.location, refresh = _a.refresh;
    var name = sample.name, duration = sample.duration, bpm = sample.bpm;
    return (<div className={className} onInit={function (element) { return lifecycle.ownAll(DragAndDrop_1.DragAndDrop.installSource(element, function () { return ({ type: "sample", sample: sample }); }), studio_core_1.ContextMenu.subscribe(element, function (collector) { return collector.addItems(studio_core_1.MenuItem.default({ label: "Create Audio Track(s)", selectable: service.hasProfile })
            .setTriggerProcedure(function () { return sampleSelection.requestDevice(); }), studio_core_1.MenuItem.default({ label: "Delete Sample(s)", selectable: location === 1 /* AssetLocation.Local */ })
            .setTriggerProcedure(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sampleSelection.deleteSelected()];
                    case 1:
                        _a.sent();
                        refresh();
                        return [2 /*return*/];
                }
            });
        }); })); })); }} data-selection={JSON.stringify(sample)} ondragstart={function () { return playback.eject(); }} draggable>
            <div className="meta" onInit={function (element) { return lifecycle.own(playback.subscribe(sample.uuid, function (event) {
            element.classList.remove("buffering", "playing", "error");
            element.classList.add(event.type);
        })); }} ondblclick={function () { return playback.toggle(sample.uuid); }}>
                <span>{name}</span>
                <span className="right">{bpm.toFixed(1)}</span>
                <span className="right">{duration.toFixed(1)}</span>
            </div>
            {location === 1 /* AssetLocation.Local */ && (<div className="edit">
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Pencil} className="edit-icon" onInit={function (element) { return element.onclick = function (event) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, status, meta;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            event.stopPropagation();
                            return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(SampleDialogs_1.SampleDialogs.showEditSampleDialog(sample))];
                        case 1:
                            _a = _b.sent(), status = _a.status, meta = _a.value;
                            if (!(status === "resolved")) return [3 /*break*/, 3];
                            return [4 /*yield*/, studio_core_1.SampleStorage.get()
                                    .updateSampleMeta(lib_std_1.UUID.parse(meta.uuid), lib_std_1.Objects.exclude(meta, "uuid"))];
                        case 2:
                            _b.sent();
                            refresh();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }; }}/>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Close} className="delete-icon" onInit={function (element) { return element.onclick = function (event) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.stopPropagation();
                            return [4 /*yield*/, sampleSelection.deleteSamples(sample)];
                        case 1:
                            _a.sent();
                            refresh();
                            return [2 /*return*/];
                    }
                });
            }); }; }}/>
                </div>)}
        </div>);
};
exports.SampleView = SampleView;
