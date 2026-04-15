"use strict";
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
var _RoomAwareness_terminator, _RoomAwareness_awareness, _RoomAwareness_name, _RoomAwareness_color, _RoomAwareness_panel, _RoomAwareness_roomName;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomAwareness = exports.userColors = exports.writeIdentity = exports.readIdentity = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var StorageKeyName = "opendaw:user:name";
var StorageKeyColor = "opendaw:user:color";
var UserColors = [
    "#E06C75", "#61AFEF", "#98C379", "#E5C07B", "#C678DD",
    "#56B6C2", "#BE5046", "#D19A66", "#ABB2BF", "#FF79C6"
];
var readIdentity = function () {
    var _a;
    var name = (_a = localStorage.getItem(StorageKeyName)) !== null && _a !== void 0 ? _a : "";
    var color = localStorage.getItem(StorageKeyColor);
    if (color === null) {
        var bytes = new Uint8Array(1);
        crypto.getRandomValues(bytes);
        color = UserColors[bytes[0] % UserColors.length];
        localStorage.setItem(StorageKeyColor, color);
    }
    return { name: name, color: color };
};
exports.readIdentity = readIdentity;
var writeIdentity = function (name, color) {
    localStorage.setItem(StorageKeyName, name);
    localStorage.setItem(StorageKeyColor, color);
};
exports.writeIdentity = writeIdentity;
var userColors = function () { return UserColors; };
exports.userColors = userColors;
var RoomAwareness = /** @class */ (function () {
    function RoomAwareness(awareness, roomName, name, color) {
        var _this = this;
        _RoomAwareness_terminator.set(this, new lib_std_1.Terminator());
        _RoomAwareness_awareness.set(this, void 0);
        _RoomAwareness_name.set(this, void 0);
        _RoomAwareness_color.set(this, void 0);
        _RoomAwareness_panel.set(this, void 0);
        _RoomAwareness_roomName.set(this, void 0);
        __classPrivateFieldSet(this, _RoomAwareness_awareness, awareness, "f");
        __classPrivateFieldSet(this, _RoomAwareness_roomName, roomName, "f");
        __classPrivateFieldSet(this, _RoomAwareness_name, __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own(new lib_std_1.DefaultObservableValue(name)), "f");
        __classPrivateFieldSet(this, _RoomAwareness_color, __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own(new lib_std_1.DefaultObservableValue(color)), "f");
        __classPrivateFieldSet(this, _RoomAwareness_panel, __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own(new lib_std_1.DefaultObservableValue(null)), "f");
        var broadcast = __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own((0, lib_dom_1.deferNextFrame)(function () {
            var name = __classPrivateFieldGet(_this, _RoomAwareness_name, "f").getValue();
            var color = __classPrivateFieldGet(_this, _RoomAwareness_color, "f").getValue();
            var panel = __classPrivateFieldGet(_this, _RoomAwareness_panel, "f").getValue();
            __classPrivateFieldGet(_this, _RoomAwareness_awareness, "f").setLocalStateField("user", { name: name, color: color, panel: panel });
            (0, exports.writeIdentity)(name, color);
        }));
        __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own(__classPrivateFieldGet(this, _RoomAwareness_name, "f").subscribe(broadcast.request));
        __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own(__classPrivateFieldGet(this, _RoomAwareness_color, "f").subscribe(broadcast.request));
        __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").own(__classPrivateFieldGet(this, _RoomAwareness_panel, "f").subscribe(broadcast.request));
        broadcast.request();
    }
    Object.defineProperty(RoomAwareness.prototype, "name", {
        get: function () { return __classPrivateFieldGet(this, _RoomAwareness_name, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomAwareness.prototype, "color", {
        get: function () { return __classPrivateFieldGet(this, _RoomAwareness_color, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomAwareness.prototype, "panel", {
        get: function () { return __classPrivateFieldGet(this, _RoomAwareness_panel, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomAwareness.prototype, "roomName", {
        get: function () { return __classPrivateFieldGet(this, _RoomAwareness_roomName, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomAwareness.prototype, "awareness", {
        get: function () { return __classPrivateFieldGet(this, _RoomAwareness_awareness, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomAwareness.prototype, "clientID", {
        get: function () { return __classPrivateFieldGet(this, _RoomAwareness_awareness, "f").clientID; },
        enumerable: false,
        configurable: true
    });
    RoomAwareness.prototype.terminate = function () { __classPrivateFieldGet(this, _RoomAwareness_terminator, "f").terminate(); };
    return RoomAwareness;
}());
exports.RoomAwareness = RoomAwareness;
_RoomAwareness_terminator = new WeakMap(), _RoomAwareness_awareness = new WeakMap(), _RoomAwareness_name = new WeakMap(), _RoomAwareness_color = new WeakMap(), _RoomAwareness_panel = new WeakMap(), _RoomAwareness_roomName = new WeakMap();
