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
var _ChatService_terminator, _ChatService_chatArray, _ChatService_name, _ChatService_color, _ChatService_listeners;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ChatService = /** @class */ (function () {
    function ChatService(doc, name, color) {
        var _this = this;
        _ChatService_terminator.set(this, new lib_std_1.Terminator());
        _ChatService_chatArray.set(this, void 0);
        _ChatService_name.set(this, void 0);
        _ChatService_color.set(this, void 0);
        _ChatService_listeners.set(this, void 0);
        __classPrivateFieldSet(this, _ChatService_chatArray, doc.getArray("chat"), "f");
        __classPrivateFieldSet(this, _ChatService_name, name, "f");
        __classPrivateFieldSet(this, _ChatService_color, color, "f");
        __classPrivateFieldSet(this, _ChatService_listeners, __classPrivateFieldGet(this, _ChatService_terminator, "f").own(new lib_std_1.Listeners()), "f");
        var handler = function (event) {
            for (var _i = 0, _a = event.delta; _i < _a.length; _i++) {
                var delta = _a[_i];
                if (Array.isArray(delta.insert)) {
                    for (var _b = 0, _c = delta.insert; _b < _c.length; _b++) {
                        var message = _c[_b];
                        __classPrivateFieldGet(_this, _ChatService_listeners, "f").proxy.onMessageAdded(message);
                    }
                }
            }
        };
        __classPrivateFieldGet(this, _ChatService_chatArray, "f").observe(handler);
        __classPrivateFieldGet(this, _ChatService_terminator, "f").own({ terminate: function () { return __classPrivateFieldGet(_this, _ChatService_chatArray, "f").unobserve(handler); } });
    }
    ChatService.prototype.sendMessage = function (text) {
        var trimmed = text.trim();
        if (trimmed.length === 0) {
            return;
        }
        __classPrivateFieldGet(this, _ChatService_chatArray, "f").push([{
                id: lib_std_1.UUID.toString(lib_std_1.UUID.generate()),
                name: __classPrivateFieldGet(this, _ChatService_name, "f"),
                color: __classPrivateFieldGet(this, _ChatService_color, "f"),
                text: trimmed.substring(0, 300),
                timestamp: Date.now()
            }]);
    };
    ChatService.prototype.messages = function () { return __classPrivateFieldGet(this, _ChatService_chatArray, "f").toArray(); };
    ChatService.prototype.subscribe = function (listener) { return __classPrivateFieldGet(this, _ChatService_listeners, "f").subscribe(listener); };
    ChatService.prototype.terminate = function () { __classPrivateFieldGet(this, _ChatService_terminator, "f").terminate(); };
    return ChatService;
}());
exports.ChatService = ChatService;
_ChatService_terminator = new WeakMap(), _ChatService_chatArray = new WeakMap(), _ChatService_name = new WeakMap(), _ChatService_color = new WeakMap(), _ChatService_listeners = new WeakMap();
