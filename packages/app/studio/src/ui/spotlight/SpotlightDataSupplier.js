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
var _SpotlightDataSupplier_actions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotlightDataSupplier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var SpotlightDataSupplier = /** @class */ (function () {
    function SpotlightDataSupplier() {
        _SpotlightDataSupplier_actions.set(this, void 0);
        __classPrivateFieldSet(this, _SpotlightDataSupplier_actions, [], "f");
    }
    SpotlightDataSupplier.prototype.query = function (text) {
        text = text.trim().toLowerCase();
        if (text.length === 0) {
            return lib_std_1.Arrays.empty();
        }
        return __classPrivateFieldGet(this, _SpotlightDataSupplier_actions, "f").filter(function (action) { return action.name.toLowerCase().startsWith(text); }).map(function (_a) {
            var name = _a.name, exec = _a.exec;
            return ({ name: name, icon: studio_enums_1.IconSymbol.Play, exec: exec });
        });
        // TODO Search for more entries
    };
    SpotlightDataSupplier.prototype.registerAction = function (name, exec) {
        (0, lib_std_1.assert)(-1 === __classPrivateFieldGet(this, _SpotlightDataSupplier_actions, "f").findIndex(function (action) { return action.name === name; }), "".concat(name, " already exists"));
        __classPrivateFieldGet(this, _SpotlightDataSupplier_actions, "f").push({ name: name, exec: exec });
    };
    return SpotlightDataSupplier;
}());
exports.SpotlightDataSupplier = SpotlightDataSupplier;
_SpotlightDataSupplier_actions = new WeakMap();
