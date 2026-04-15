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
exports.RoomStatus = void 0;
var RoomStatus_sass_inline_1 = require("./RoomStatus.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var TrafficWatch_1 = require("@/ui/TrafficWatch");
var className = lib_dom_1.Html.adoptStyleSheet(RoomStatus_sass_inline_1.default, "room-status");
var RoomStatus = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var element = <div className={className}/>;
    var roomLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(service.roomAwareness.catchupAndSubscribe(function (owner) {
        roomLifecycle.terminate();
        var awareness = owner.getValue();
        if ((0, lib_std_1.isDefined)(awareness)) {
            element.style.display = "";
            var roomLabel_1 = (<div className="room-label">
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Copy}/>
                    <span className="room-name" title="Click to copy join link" onclick={function () { return __awaiter(void 0, void 0, void 0, function () {
                    var joinUrl, status;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                joinUrl = "".concat(location.origin, "/join/").concat(awareness.roomName);
                                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Clipboard.writeText(joinUrl))];
                            case 1:
                                status = (_a.sent()).status;
                                if (!(status === "resolved")) return [3 /*break*/, 3];
                                return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                        headline: "Clipboard",
                                        message: "Join link copied to clipboard."
                                    })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }}>{"Room '".concat(awareness.roomName, "'")}</span>
                </div>);
            var render_1 = function () {
                var states = awareness.awareness.getStates();
                var localId = awareness.clientID;
                var users = [];
                states.forEach(function (state, clientId) {
                    var user = state.user;
                    if ((0, lib_std_1.isDefined)(user)) {
                        users.push({ name: user.name, color: user.color, self: clientId === localId });
                    }
                });
                users.sort(function (first, second) { return first.self === second.self ? 0 : first.self ? -1 : 1; });
                var trafficWatch = <TrafficWatch_1.TrafficWatch lifecycle={roomLifecycle} trafficMeter={service.trafficMeter.getValue()}/>;
                lib_jsx_1.replaceChildren.apply(void 0, __spreadArray(__spreadArray([element, roomLabel_1], users.map(function (user) { return (<div className={user.self ? "user self" : "user"}>
                        <span className="dot" style={{ backgroundColor: user.color }}/>
                        <span>{user.name}</span>
                    </div>); }), false), [trafficWatch], false));
            };
            var awarenessApi_1 = awareness.awareness;
            awarenessApi_1.on("change", render_1);
            roomLifecycle.own({ terminate: function () { return awarenessApi_1.off("change", render_1); } });
            render_1();
        }
        else {
            element.style.display = "none";
            (0, lib_jsx_1.replaceChildren)(element);
        }
    }));
    element.style.display = "none";
    return element;
};
exports.RoomStatus = RoomStatus;
