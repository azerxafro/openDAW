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
var _PanelContent_instances, _PanelContent_factory, _PanelContent_panelType, _PanelContent_terminator, _PanelContent_id, _PanelContent_placeholder, _PanelContent_onPlaceholderLeaves, _PanelContent_onSurfaceCloses, _PanelContent_closePopout;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelContent = void 0;
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_std_1 = require("@opendaw/lib-std");
var Surface_1 = require("../surface/Surface");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var PanelContent = /** @class */ (function () {
    function PanelContent(factory, panelType) {
        _PanelContent_instances.add(this);
        _PanelContent_factory.set(this, void 0);
        _PanelContent_panelType.set(this, void 0);
        _PanelContent_terminator.set(this, void 0);
        _PanelContent_id.set(this, void 0);
        _PanelContent_placeholder.set(this, lib_std_1.Option.None);
        __classPrivateFieldSet(this, _PanelContent_factory, factory, "f");
        __classPrivateFieldSet(this, _PanelContent_panelType, panelType, "f");
        __classPrivateFieldSet(this, _PanelContent_terminator, new lib_std_1.Terminator(), "f");
        __classPrivateFieldSet(this, _PanelContent_id, lib_std_1.UUID.toString(lib_std_1.UUID.generate()), "f");
    }
    PanelContent.prototype.bind = function (panelState, container, listener) {
        var _this = this;
        var _a;
        (0, lib_std_1.assert)(__classPrivateFieldGet(this, _PanelContent_placeholder, "f").isEmpty(), "Cannot have panel open in multiple location (".concat((_a = __classPrivateFieldGet(this, _PanelContent_placeholder, "f").unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.panelState, ")"));
        __classPrivateFieldSet(this, _PanelContent_placeholder, lib_std_1.Option.wrap({ panelState: panelState, container: container, listener: listener }), "f");
        if (this.isPopout) {
            listener.onPopout();
        }
        else if (panelState.isMinimized) {
            listener.onMinimized();
        }
        else {
            (0, lib_jsx_1.replaceChildren)(container, __classPrivateFieldGet(this, _PanelContent_factory, "f").create(__classPrivateFieldGet(this, _PanelContent_terminator, "f"), __classPrivateFieldGet(this, _PanelContent_panelType, "f")));
            listener.onEmbed();
        }
        return {
            togglePopout: this.togglePopout.bind(this),
            toggleMinimize: this.toggleMinimize.bind(this),
            terminate: __classPrivateFieldGet(this, _PanelContent_instances, "m", _PanelContent_onPlaceholderLeaves).bind(this),
            isPopout: function () { return _this.isPopout; }
        };
    };
    Object.defineProperty(PanelContent.prototype, "isPopout", {
        get: function () { return Surface_1.Surface.getById(__classPrivateFieldGet(this, _PanelContent_id, "f")).nonEmpty(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelContent.prototype, "panelState", {
        get: function () { return __classPrivateFieldGet(this, _PanelContent_placeholder, "f").map(function (placeholder) { return placeholder.panelState; }); },
        enumerable: false,
        configurable: true
    });
    PanelContent.prototype.togglePopout = function () {
        var _this = this;
        if (__classPrivateFieldGet(this, _PanelContent_placeholder, "f").isEmpty()) {
            console.debug("Cannot togglePopout. No Placeholder available.");
            return;
        }
        var _a = __classPrivateFieldGet(this, _PanelContent_placeholder, "f").unwrap(), panelState = _a.panelState, container = _a.container, listener = _a.listener;
        if (!panelState.popoutable) {
            return;
        }
        if (this.isPopout) {
            __classPrivateFieldGet(this, _PanelContent_instances, "m", _PanelContent_closePopout).call(this);
        }
        else {
            Surface_1.Surface.get()
                .new(640, 480, __classPrivateFieldGet(this, _PanelContent_id, "f"), panelState.name)
                .match({
                none: function () {
                    dialogs_tsx_1.Dialogs.info({ message: "Could not open window. Check popup blocker?" }).finally();
                },
                some: function (surface) {
                    __classPrivateFieldGet(_this, _PanelContent_terminator, "f").terminate();
                    lib_dom_1.Html.empty(container);
                    (0, lib_jsx_1.replaceChildren)(surface.ground, __classPrivateFieldGet(_this, _PanelContent_factory, "f").create(__classPrivateFieldGet(_this, _PanelContent_terminator, "f"), __classPrivateFieldGet(_this, _PanelContent_panelType, "f")));
                    listener.onPopout();
                    surface.own({
                        terminate: function () {
                            __classPrivateFieldGet(_this, _PanelContent_terminator, "f").terminate();
                            lib_dom_1.Html.empty(surface.ground);
                            __classPrivateFieldGet(_this, _PanelContent_instances, "m", _PanelContent_onSurfaceCloses).call(_this);
                        }
                    });
                }
            });
        }
    };
    PanelContent.prototype.focusPopout = function () { Surface_1.Surface.getById(__classPrivateFieldGet(this, _PanelContent_id, "f")).ifSome(function (surface) { return surface.owner.focus(); }); };
    PanelContent.prototype.toggleMinimize = function () {
        if (__classPrivateFieldGet(this, _PanelContent_placeholder, "f").isEmpty()) {
            console.debug("Cannot toggleMinimize. No Placeholder available.");
            return;
        }
        var _a = __classPrivateFieldGet(this, _PanelContent_placeholder, "f").unwrap(), panelState = _a.panelState, container = _a.container, listener = _a.listener;
        if (!panelState.minimizable) {
            return;
        }
        if (this.isPopout) {
            __classPrivateFieldGet(this, _PanelContent_instances, "m", _PanelContent_closePopout).call(this);
        }
        else if (panelState.isMinimized) {
            (0, lib_jsx_1.replaceChildren)(container, __classPrivateFieldGet(this, _PanelContent_factory, "f").create(__classPrivateFieldGet(this, _PanelContent_terminator, "f"), __classPrivateFieldGet(this, _PanelContent_panelType, "f")));
            panelState.isMinimized = false;
            listener.onEmbed();
        }
        else {
            __classPrivateFieldGet(this, _PanelContent_terminator, "f").terminate();
            lib_dom_1.Html.empty(container);
            panelState.isMinimized = true;
            listener.onMinimized();
        }
    };
    return PanelContent;
}());
exports.PanelContent = PanelContent;
_PanelContent_factory = new WeakMap(), _PanelContent_panelType = new WeakMap(), _PanelContent_terminator = new WeakMap(), _PanelContent_id = new WeakMap(), _PanelContent_placeholder = new WeakMap(), _PanelContent_instances = new WeakSet(), _PanelContent_onPlaceholderLeaves = function _PanelContent_onPlaceholderLeaves() {
    var container = __classPrivateFieldGet(this, _PanelContent_placeholder, "f").unwrap("Illegal State Error (no placeholder)").container;
    __classPrivateFieldSet(this, _PanelContent_placeholder, lib_std_1.Option.None, "f");
    if (!this.isPopout) {
        __classPrivateFieldGet(this, _PanelContent_terminator, "f").terminate();
        lib_dom_1.Html.empty(container);
    }
}, _PanelContent_onSurfaceCloses = function _PanelContent_onSurfaceCloses() {
    if (__classPrivateFieldGet(this, _PanelContent_placeholder, "f").isEmpty()) {
        // No placeholder available, so we do not care
        return;
    }
    var _a = __classPrivateFieldGet(this, _PanelContent_placeholder, "f").unwrap(), panelState = _a.panelState, container = _a.container, listener = _a.listener;
    if (panelState.isMinimized) {
        listener.onMinimized();
    }
    else {
        (0, lib_jsx_1.replaceChildren)(container, __classPrivateFieldGet(this, _PanelContent_factory, "f").create(__classPrivateFieldGet(this, _PanelContent_terminator, "f"), __classPrivateFieldGet(this, _PanelContent_panelType, "f")));
        panelState.isMinimized = false;
        listener.onEmbed();
    }
}, _PanelContent_closePopout = function _PanelContent_closePopout() { Surface_1.Surface.getById(__classPrivateFieldGet(this, _PanelContent_id, "f")).ifSome(function (surface) { return surface.close(); }); };
