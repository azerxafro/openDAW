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
var _PanelContents_factory, _PanelContents_contents;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelContents = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var PanelContent_tsx_1 = require("@/ui/workspace/PanelContent.tsx");
var PanelContents = /** @class */ (function () {
    function PanelContents(factory) {
        _PanelContents_factory.set(this, void 0);
        _PanelContents_contents.set(this, void 0);
        __classPrivateFieldSet(this, _PanelContents_factory, factory, "f");
        __classPrivateFieldSet(this, _PanelContents_contents, new Map(), "f");
    }
    PanelContents.prototype.isClosed = function (content) {
        return content.type === "panel" && (content.isMinimized || this.getByType(content.panelType).isPopout);
    };
    PanelContents.prototype.getByType = function (panelType) {
        var _this = this;
        return lib_std_1.Maps.createIfAbsent(__classPrivateFieldGet(this, _PanelContents_contents, "f"), panelType, function (panelType) { return new PanelContent_tsx_1.PanelContent(__classPrivateFieldGet(_this, _PanelContents_factory, "f"), panelType); });
    };
    PanelContents.prototype.showIfAvailable = function (panelType) {
        var content = this.getByType(panelType);
        content.panelState.ifSome(function (state) {
            if (content.isPopout) {
                content.focusPopout();
            }
            else if (state.isMinimized) {
                content.toggleMinimize();
            }
        });
    };
    Object.defineProperty(PanelContents.prototype, "factory", {
        get: function () { return __classPrivateFieldGet(this, _PanelContents_factory, "f"); },
        enumerable: false,
        configurable: true
    });
    return PanelContents;
}());
exports.PanelContents = PanelContents;
_PanelContents_factory = new WeakMap(), _PanelContents_contents = new WeakMap();
