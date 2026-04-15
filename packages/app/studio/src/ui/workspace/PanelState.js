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
var _PanelState_panelType, _PanelState_name, _PanelState_icon, _PanelState_constrains, _PanelState_minimizable, _PanelState_popoutable, _PanelState_minimized;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelState = void 0;
var PanelState = /** @class */ (function () {
    function PanelState(config) {
        var _a;
        this.type = "panel";
        _PanelState_panelType.set(this, void 0);
        _PanelState_name.set(this, void 0);
        _PanelState_icon.set(this, void 0);
        _PanelState_constrains.set(this, void 0);
        _PanelState_minimizable.set(this, void 0);
        _PanelState_popoutable.set(this, void 0);
        _PanelState_minimized.set(this, void 0);
        __classPrivateFieldSet(this, _PanelState_panelType, config.panelType, "f");
        __classPrivateFieldSet(this, _PanelState_name, config.name, "f");
        __classPrivateFieldSet(this, _PanelState_icon, config.icon, "f");
        __classPrivateFieldSet(this, _PanelState_constrains, config.constrains, "f");
        __classPrivateFieldSet(this, _PanelState_minimizable, config.notMinimizable !== true, "f");
        __classPrivateFieldSet(this, _PanelState_popoutable, config.notPopoutable !== true, "f");
        __classPrivateFieldSet(this, _PanelState_minimized, (_a = config.minimized) !== null && _a !== void 0 ? _a : false, "f");
    }
    PanelState.create = function (schema) { return new PanelState(schema); };
    Object.defineProperty(PanelState.prototype, "panelType", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_panelType, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelState.prototype, "name", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_name, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelState.prototype, "icon", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_icon, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelState.prototype, "constrains", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_constrains, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelState.prototype, "isMinimized", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_minimized, "f") && __classPrivateFieldGet(this, _PanelState_minimizable, "f"); },
        set: function (value) { __classPrivateFieldSet(this, _PanelState_minimized, value && __classPrivateFieldGet(this, _PanelState_minimizable, "f"), "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelState.prototype, "minimizable", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_minimizable, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelState.prototype, "popoutable", {
        get: function () { return __classPrivateFieldGet(this, _PanelState_popoutable, "f"); },
        enumerable: false,
        configurable: true
    });
    return PanelState;
}());
exports.PanelState = PanelState;
_PanelState_panelType = new WeakMap(), _PanelState_name = new WeakMap(), _PanelState_icon = new WeakMap(), _PanelState_constrains = new WeakMap(), _PanelState_minimizable = new WeakMap(), _PanelState_popoutable = new WeakMap(), _PanelState_minimized = new WeakMap();
