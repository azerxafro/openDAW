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
exports.connectRoom = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_core_1 = require("@opendaw/studio-core");
var studio_p2p_1 = require("@opendaw/studio-p2p");
var StudioLiveRoomDialog_tsx_1 = require("@/service/StudioLiveRoomDialog.tsx");
var RoomAwareness_1 = require("@/service/RoomAwareness");
var ChatService_1 = require("@/chat/ChatService");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var connectRoom = function (service, prefillRoomName) { return __awaiter(void 0, void 0, void 0, function () {
    var result, roomName, userName, userColor, progressDialog, _a, status, roomResult, error, project, provider_1, p2pSession, terminator_1, roomAwareness_1, chatService;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, StudioLiveRoomDialog_tsx_1.showConnectRoomDialog)(prefillRoomName).catch(function () { return null; })];
            case 1:
                result = _b.sent();
                if (result === null) {
                    return [2 /*return*/];
                }
                roomName = result.roomName, userName = result.userName, userColor = result.userColor;
                (0, RoomAwareness_1.writeIdentity)(userName, userColor);
                progressDialog = lib_std_1.RuntimeNotifier.progress({
                    headline: "Connecting to Room...",
                    message: "Please wait while we connect to the room..."
                });
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.YService.getOrCreateRoom(service.projectProfileService.getValue()
                        .map(function (profile) { return profile.project; }), service, roomName))];
            case 2:
                _a = _b.sent(), status = _a.status, roomResult = _a.value, error = _a.error;
                if (!(status === "resolved")) return [3 /*break*/, 4];
                project = roomResult.project, provider_1 = roomResult.provider;
                p2pSession = new studio_p2p_1.P2PSession({
                    chainedSampleProvider: service.chainedSampleProvider,
                    chainedSoundfontProvider: service.chainedSoundfontProvider,
                    createSocket: function (url) { return new WebSocket(url); },
                    localPeerId: lib_std_1.UUID.toString(lib_std_1.UUID.generate()),
                    assetReader: {
                        hasSample: function (uuid) { return studio_core_1.SampleStorage.get().exists(uuid); },
                        hasSoundfont: function (uuid) { return studio_core_1.Workers.Opfs.exists("".concat(studio_core_1.SoundfontStorage.Folder, "/").concat(lib_std_1.UUID.toString(uuid))); },
                        readSample: function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
                            var path, _a, wavBytes, metaBytes;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        path = "".concat(studio_core_1.SampleStorage.Folder, "/").concat(lib_std_1.UUID.toString(uuid));
                                        return [4 /*yield*/, Promise.all([
                                                studio_core_1.Workers.Opfs.read("".concat(path, "/audio.wav")),
                                                studio_core_1.Workers.Opfs.read("".concat(path, "/meta.json"))
                                            ])];
                                    case 1:
                                        _a = _b.sent(), wavBytes = _a[0], metaBytes = _a[1];
                                        return [2 /*return*/, [wavBytes.buffer, JSON.parse(new TextDecoder().decode(metaBytes))]];
                                }
                            });
                        }); },
                        readSoundfont: function (uuid) { return studio_core_1.SoundfontStorage.get().load(uuid); }
                    }
                }, roomName, "wss://live.opendaw.studio");
                project.own(p2pSession);
                terminator_1 = new lib_std_1.Terminator();
                project.own(terminator_1);
                roomAwareness_1 = new RoomAwareness_1.RoomAwareness(provider_1.awareness, roomName, userName, userColor);
                terminator_1.own(roomAwareness_1);
                terminator_1.own(lib_dom_1.Events.subscribe(window, "pointermove", function (event) {
                    var _a;
                    var target = event.target;
                    if (target instanceof Element) {
                        var panel = target.closest("[data-panel-type]");
                        roomAwareness_1.panel.setValue((_a = panel === null || panel === void 0 ? void 0 : panel.getAttribute("data-panel-type")) !== null && _a !== void 0 ? _a : null);
                    }
                    else {
                        roomAwareness_1.panel.setValue(null);
                    }
                }));
                service.factoryFooterLabel().ifSome(function (factory) {
                    var label = factory();
                    terminator_1.own(label);
                    var awareness = provider_1.awareness;
                    var update = function () { return label.setValue(String(awareness.getStates().size)); };
                    awareness.on("update", update);
                    terminator_1.own({ terminate: function () { return awareness.off("update", update); } });
                    label.setTitle("Room Users");
                    update();
                });
                lib_jsx_1.RouteLocation.get().navigateTo("/");
                service.projectProfileService.setProject(project, roomName);
                service.setRoomAwareness(roomAwareness_1);
                terminator_1.own({ terminate: function () { return service.setRoomAwareness(null); } });
                service.setTrafficMeter(p2pSession.trafficMeter);
                terminator_1.own({ terminate: function () { return service.setTrafficMeter(null); } });
                chatService = new ChatService_1.ChatService(provider_1.doc, userName, userColor);
                terminator_1.own(chatService);
                service.chatService.wrap(chatService);
                terminator_1.own({ terminate: function () { return service.chatService.clear(); } });
                return [4 /*yield*/, lib_runtime_1.Wait.timeSpan(lib_std_1.TimeSpan.seconds(1))];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                    headline: "Failed Connecting Room",
                    message: String(error)
                })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                progressDialog.terminate();
                return [2 /*return*/];
        }
    });
}); };
exports.connectRoom = connectRoom;
