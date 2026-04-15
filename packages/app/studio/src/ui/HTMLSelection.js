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
var _HTMLSelection_instances, _HTMLSelection_terminator, _HTMLSelection_container, _HTMLSelection_lastSelection, _HTMLSelection_select, _HTMLSelection_unselectAll, _HTMLSelection_find;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLSelection = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var HTMLSelection = /** @class */ (function () {
    function HTMLSelection(container) {
        var _this = this;
        _HTMLSelection_instances.add(this);
        _HTMLSelection_terminator.set(this, new lib_std_1.Terminator());
        _HTMLSelection_container.set(this, void 0);
        _HTMLSelection_lastSelection.set(this, null);
        __classPrivateFieldSet(this, _HTMLSelection_container, container, "f");
        __classPrivateFieldGet(this, _HTMLSelection_terminator, "f").own(lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _HTMLSelection_container, "f"), "pointerdown", function (event) {
            var _a;
            var target = __classPrivateFieldGet(_this, _HTMLSelection_instances, "m", _HTMLSelection_find).call(_this, event.target);
            if ((0, lib_std_1.isDefined)(target)) {
                if (lib_dom_1.Keyboard.isControlKey(event)) {
                    target.classList.toggle("selected");
                }
                else if (event.shiftKey) {
                    var nodes = Array.from(__classPrivateFieldGet(_this, _HTMLSelection_container, "f").children);
                    if (nodes.length === 0) {
                        return;
                    }
                    var lastSelection = (_a = __classPrivateFieldGet(_this, _HTMLSelection_lastSelection, "f")) !== null && _a !== void 0 ? _a : nodes[0];
                    var i0 = nodes.indexOf(target);
                    var i1 = nodes.indexOf(lastSelection);
                    var n = Math.max(i0, i1);
                    for (var i = Math.min(i0, i1); i <= n; i++) {
                        nodes[i].classList.add("selected");
                    }
                }
                else if (!target.classList.contains("selected")) {
                    __classPrivateFieldGet(_this, _HTMLSelection_instances, "m", _HTMLSelection_unselectAll).call(_this);
                    __classPrivateFieldGet(_this, _HTMLSelection_instances, "m", _HTMLSelection_select).call(_this, target);
                }
            }
        }));
    }
    HTMLSelection.prototype.getSelected = function () { return Array.from(__classPrivateFieldGet(this, _HTMLSelection_container, "f").querySelectorAll(".selected")); };
    HTMLSelection.prototype.clear = function () {
        __classPrivateFieldSet(this, _HTMLSelection_lastSelection, null, "f");
    };
    HTMLSelection.prototype.terminate = function () { __classPrivateFieldGet(this, _HTMLSelection_terminator, "f").terminate(); };
    return HTMLSelection;
}());
exports.HTMLSelection = HTMLSelection;
_HTMLSelection_terminator = new WeakMap(), _HTMLSelection_container = new WeakMap(), _HTMLSelection_lastSelection = new WeakMap(), _HTMLSelection_instances = new WeakSet(), _HTMLSelection_select = function _HTMLSelection_select(element) {
    element.classList.toggle("selected");
    __classPrivateFieldSet(this, _HTMLSelection_lastSelection, element, "f");
}, _HTMLSelection_unselectAll = function _HTMLSelection_unselectAll() {
    __classPrivateFieldGet(this, _HTMLSelection_container, "f").querySelectorAll(".selected")
        .forEach(function (element) { element.classList.remove("selected"); });
}, _HTMLSelection_find = function _HTMLSelection_find(target) {
    if (target === __classPrivateFieldGet(this, _HTMLSelection_container, "f")) {
        return null;
    }
    while (target instanceof Element) {
        if (target.parentElement === __classPrivateFieldGet(this, _HTMLSelection_container, "f")) {
            return target;
        }
        target = target.parentElement;
    }
    return null;
};
