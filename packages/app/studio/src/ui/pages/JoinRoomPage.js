"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRoomPage = void 0;
var lib_jsx_1 = require("@opendaw/lib-jsx");
var StudioLiveRoomConnect_1 = require("@/service/StudioLiveRoomConnect");
var JoinRoomPage = function (_a) {
    var service = _a.service, path = _a.path;
    var roomName = path.replace(/^\/join\//, "").trim();
    if (roomName.length > 0) {
        (0, StudioLiveRoomConnect_1.connectRoom)(service, roomName)
            .catch(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/"); });
    }
    else {
        queueMicrotask(function () { return lib_jsx_1.RouteLocation.get().navigateTo("/"); });
    }
    return <div style={{ flex: "1", backgroundColor: "var(--color-background)" }}/>;
};
exports.JoinRoomPage = JoinRoomPage;
