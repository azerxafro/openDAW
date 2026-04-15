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
var _Camera_instances, _Camera_element, _Camera_terminator, _Camera_notifier, _Camera_x, _Camera_y, _Camera_scale, _Camera_listening, _Camera_update;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var Camera = /** @class */ (function () {
    function Camera(element) {
        var _this = this;
        _Camera_instances.add(this);
        _Camera_element.set(this, void 0);
        _Camera_terminator.set(this, void 0);
        _Camera_notifier.set(this, void 0);
        _Camera_x.set(this, 0);
        _Camera_y.set(this, 0);
        _Camera_scale.set(this, 1); // TODO 2 will break when deleting a module and undo (wire is misplaced)
        _Camera_listening.set(this, false);
        __classPrivateFieldSet(this, _Camera_element, element, "f");
        __classPrivateFieldSet(this, _Camera_terminator, new lib_std_1.Terminator(), "f");
        __classPrivateFieldSet(this, _Camera_notifier, __classPrivateFieldGet(this, _Camera_terminator, "f").own(new lib_std_1.Notifier()), "f");
        __classPrivateFieldGet(this, _Camera_terminator, "f").own(lib_dom_1.Html.watchResize(__classPrivateFieldGet(this, _Camera_element, "f"), function () { return __classPrivateFieldGet(_this, _Camera_instances, "m", _Camera_update).call(_this); }));
    }
    Camera.prototype.set = function (x, y) {
        __classPrivateFieldSet(this, _Camera_x, Math.round(x), "f");
        __classPrivateFieldSet(this, _Camera_y, Math.round(y), "f");
        __classPrivateFieldGet(this, _Camera_instances, "m", _Camera_update).call(this);
    };
    Camera.prototype.globalToLocal = function (x, y) {
        var clientRect = __classPrivateFieldGet(this, _Camera_element, "f").getBoundingClientRect();
        return {
            x: Math.round(x - (clientRect.x + clientRect.width * 0.5 - __classPrivateFieldGet(this, _Camera_x, "f"))),
            y: Math.round(y - (clientRect.y + clientRect.height * 0.5 - __classPrivateFieldGet(this, _Camera_y, "f")))
        };
    };
    Camera.prototype.localToGlobal = function (x, y) {
        var clientRect = __classPrivateFieldGet(this, _Camera_element, "f").getBoundingClientRect();
        return {
            x: x + (clientRect.x + clientRect.width * 0.5 - __classPrivateFieldGet(this, _Camera_x, "f")),
            y: y + (clientRect.y + clientRect.height * 0.5 - __classPrivateFieldGet(this, _Camera_y, "f"))
        };
    };
    Object.defineProperty(Camera.prototype, "x", {
        get: function () { return __classPrivateFieldGet(this, _Camera_x, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "y", {
        get: function () { return __classPrivateFieldGet(this, _Camera_y, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "scale", {
        get: function () { return __classPrivateFieldGet(this, _Camera_scale, "f"); },
        enumerable: false,
        configurable: true
    });
    Camera.prototype.listen = function () {
        var _this = this;
        (0, lib_std_1.assert)(!__classPrivateFieldGet(this, _Camera_listening, "f"), "You cannot call listen() twice.");
        __classPrivateFieldSet(this, _Camera_listening, true, "f");
        __classPrivateFieldGet(this, _Camera_terminator, "f").own(lib_dom_1.Dragging.attach(__classPrivateFieldGet(this, _Camera_element, "f"), function (event) {
            var startX = __classPrivateFieldGet(_this, _Camera_x, "f");
            var startY = __classPrivateFieldGet(_this, _Camera_y, "f");
            var pointerX = event.clientX;
            var pointerY = event.clientY;
            return lib_std_1.Option.wrap({
                update: function (event) {
                    return _this.set(startX + (pointerX - event.clientX) / __classPrivateFieldGet(_this, _Camera_scale, "f"), startY + (pointerY - event.clientY) / __classPrivateFieldGet(_this, _Camera_scale, "f"));
                },
                cancel: function () {
                    return _this.set(__classPrivateFieldGet(_this, _Camera_x, "f"), __classPrivateFieldGet(_this, _Camera_y, "f"));
                }
            });
        }));
        if (window.matchMedia("(pointer: fine)").matches) {
            __classPrivateFieldGet(this, _Camera_terminator, "f").own(lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Camera_element, "f"), "wheel", function (event) {
                return _this.set(__classPrivateFieldGet(_this, _Camera_x, "f") + event.deltaX / __classPrivateFieldGet(_this, _Camera_scale, "f"), __classPrivateFieldGet(_this, _Camera_y, "f") + event.deltaY / __classPrivateFieldGet(_this, _Camera_scale, "f"));
            }, { passive: true }));
        }
    };
    Camera.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _Camera_notifier, "f").subscribe(observer); };
    Camera.prototype.terminate = function () { __classPrivateFieldGet(this, _Camera_notifier, "f").terminate(); };
    return Camera;
}());
exports.Camera = Camera;
_Camera_element = new WeakMap(), _Camera_terminator = new WeakMap(), _Camera_notifier = new WeakMap(), _Camera_x = new WeakMap(), _Camera_y = new WeakMap(), _Camera_scale = new WeakMap(), _Camera_listening = new WeakMap(), _Camera_instances = new WeakSet(), _Camera_update = function _Camera_update() {
    __classPrivateFieldGet(this, _Camera_element, "f").style.setProperty("--x", "calc(50% + ".concat(-__classPrivateFieldGet(this, _Camera_x, "f"), "px)"));
    __classPrivateFieldGet(this, _Camera_element, "f").style.setProperty("--y", "calc(50% + ".concat(-__classPrivateFieldGet(this, _Camera_y, "f"), "px)"));
    __classPrivateFieldGet(this, _Camera_element, "f").style.setProperty("--scale", "".concat(__classPrivateFieldGet(this, _Camera_scale, "f")));
    __classPrivateFieldGet(this, _Camera_notifier, "f").notify(this);
};
