"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.SyncLogService = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_core_1 = require("@opendaw/studio-core");
var SyncLogService;
(function (SyncLogService) {
    var _this = this;
    SyncLogService.start = function (service) { return __awaiter(_this, void 0, void 0, function () {
        var _a, status, handle, label, count;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(0, lib_std_1.isDefined)(window.showSaveFilePicker)) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(window.showSaveFilePicker(__assign({ suggestedName: "New.odsl" }, studio_core_1.FilePickerAcceptTypes.ProjectSyncLog)))];
                case 1:
                    _a = _b.sent(), status = _a.status, handle = _a.value;
                    if (status === "rejected") {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, service.newProject()];
                case 2:
                    _b.sent();
                    label = (0, lib_std_1.asDefined)(service.factoryFooterLabel().unwrap()());
                    label.setTitle("SyncLog");
                    count = 0 | 0;
                    studio_core_1.SyncLogWriter.attach(service.project, wrapBlockWriter(handle, function () { return label.setValue("".concat(++count, " commits")); }));
                    return [2 /*return*/];
            }
        });
    }); };
    SyncLogService.append = function (service) { return __awaiter(_this, void 0, void 0, function () {
        var openResult, handle, queryPermissionResult, requestPermissionResult, arrayBufferResult, _a, project, lastCommit, numCommits, label, count;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(window.showOpenFilePicker(studio_core_1.FilePickerAcceptTypes.ProjectSyncLog))];
                case 1:
                    openResult = _b.sent();
                    if (openResult.status === "rejected") {
                        return [2 /*return*/];
                    }
                    handle = (0, lib_std_1.asDefined)(openResult.value[0], "No handle");
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(handle.queryPermission({ mode: "readwrite" }))];
                case 2:
                    queryPermissionResult = _b.sent();
                    if (queryPermissionResult.status === "rejected") {
                        console.warn(queryPermissionResult.error);
                        // do not return
                    }
                    else {
                        console.debug("queryPermission", queryPermissionResult.value);
                    }
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(handle.requestPermission({ mode: "readwrite" }))];
                case 3:
                    requestPermissionResult = _b.sent();
                    if (requestPermissionResult.status === "rejected") {
                        console.warn("permission-status", requestPermissionResult.error);
                        return [2 /*return*/];
                    }
                    if (requestPermissionResult.value !== "granted") {
                        console.warn("permission-value", requestPermissionResult.value);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(handle.getFile().then(function (x) { return x.arrayBuffer(); }))];
                case 4:
                    arrayBufferResult = _b.sent();
                    if (arrayBufferResult.status === "rejected") {
                        console.warn("arrayBuffer", arrayBufferResult.error);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, studio_core_1.SyncLogReader.unwrap(service, arrayBufferResult.value)];
                case 5:
                    _a = _b.sent(), project = _a.project, lastCommit = _a.lastCommit, numCommits = _a.numCommits;
                    service.projectProfileService.setProject(project, "SyncLog");
                    label = (0, lib_std_1.asDefined)(service.factoryFooterLabel().unwrap()());
                    label.setTitle("SyncLog");
                    count = numCommits;
                    studio_core_1.SyncLogWriter.attach(service.project, wrapBlockWriter(handle, function () { return label.setValue("".concat(++count, " commits")); }), lastCommit);
                    return [2 /*return*/];
            }
        });
    }); };
    var wrapBlockWriter = function (handle, callback) {
        var blocks = [];
        var lastPromise = Promise.resolve();
        return function (commit) {
            blocks.push(commit);
            callback();
            lastPromise = lastPromise.then(function () { return __awaiter(_this, void 0, void 0, function () {
                var writable, file, buffers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, handle.createWritable({ keepExistingData: true })];
                        case 1:
                            writable = _a.sent();
                            return [4 /*yield*/, handle.getFile()];
                        case 2:
                            file = _a.sent();
                            return [4 /*yield*/, writable.seek(file.size)];
                        case 3:
                            _a.sent();
                            buffers = blocks.map(function (block) { return block.serialize(); });
                            blocks = [];
                            return [4 /*yield*/, writable.write(appendArrayBuffers(buffers))];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, writable.close()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
    };
    var appendArrayBuffers = function (buffers) {
        var totalLength = buffers.reduce(function (sum, buffer) { return sum + buffer.byteLength; }, 0);
        var result = new Uint8Array(totalLength);
        buffers.reduce(function (offset, buffer) {
            result.set(new Uint8Array(buffer), offset);
            return offset + buffer.byteLength;
        }, 0);
        return result.buffer;
    };
})(SyncLogService || (exports.SyncLogService = SyncLogService = {}));
