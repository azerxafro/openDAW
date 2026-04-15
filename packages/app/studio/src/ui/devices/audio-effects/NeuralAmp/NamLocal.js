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
exports.NamLocal = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var NamLocal;
(function (NamLocal) {
    var _this = this;
    NamLocal.browse = function (boxGraph, editing, adapter) { return function () { return __awaiter(_this, void 0, void 0, function () {
        var files, file_1, text_1, jsonBuffer, uuid_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, lib_dom_1.Files.open({
                            types: [{ description: "NAM Model", accept: { "application/json": [".nam"] } }],
                            multiple: false
                        })];
                case 1:
                    files = _a.sent();
                    if (!(files.length > 0)) return [3 /*break*/, 4];
                    file_1 = files[0];
                    return [4 /*yield*/, file_1.text()];
                case 2:
                    text_1 = _a.sent();
                    jsonBuffer = new TextEncoder().encode(text_1);
                    return [4 /*yield*/, lib_std_1.UUID.sha256(jsonBuffer.buffer)];
                case 3:
                    uuid_1 = _a.sent();
                    editing.modify(function () {
                        var oldTarget = adapter.box.model.targetVertex;
                        var modelBox = boxGraph.findBox(uuid_1).unwrapOrElse(function () {
                            return studio_boxes_1.NeuralAmpModelBox.create(boxGraph, uuid_1, function (box) {
                                box.label.setValue(file_1.name.replace(/\.nam$/i, ""));
                                box.model.setValue(text_1);
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
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    if (error_1 instanceof DOMException && error_1.name === "AbortError") {
                        return [2 /*return*/];
                    }
                    console.error("Failed to load NAM model:", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }; };
})(NamLocal || (exports.NamLocal = NamLocal = {}));
