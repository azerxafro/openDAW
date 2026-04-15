"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueTooltip = void 0;
var ValueTooltip_sass_inline_1 = require("./ValueTooltip.sass?inline");
var Surface_1 = require("./Surface");
var lib_std_1 = require("@opendaw/lib-std");
var AbstractTooltip_ts_1 = require("@/ui/surface/AbstractTooltip.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var ValueTooltip = /** @class */ (function (_super) {
    __extends(ValueTooltip, _super);
    function ValueTooltip(surface) {
        return _super.call(this, surface) || this;
    }
    ValueTooltip.default = function (element, provider) {
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(element, "pointerdown", function () {
            var surface = Surface_1.Surface.get(element);
            surface.valueTooltip.show(provider);
            lib_dom_1.Events.subscribe(element, "pointerleave", function () { return surface.valueTooltip.hide(); }, { once: true });
        }), lib_dom_1.Events.subscribe(element, "pointerenter", function () {
            var surface = Surface_1.Surface.get(element);
            surface.valueTooltip.show(provider);
            lib_dom_1.Events.subscribe(element, "pointerleave", function () { return surface.valueTooltip.hide(); }, { once: true });
        }), lib_std_1.Terminable.create(function () { return Surface_1.Surface.get(element).textTooltip.forceHide(); }));
    };
    ValueTooltip.prototype.createElement = function () { return (<div className={__classPrivateFieldGet(_a, _a, "f", _ValueTooltip_CLASS_NAME)}/>); };
    ValueTooltip.prototype.showDelayInFrames = function () { return 30; };
    ValueTooltip.prototype.hideDelayInFrames = function () { return 20; };
    ValueTooltip.prototype.update = function (_b) {
        var value = _b.value, unit = _b.unit;
        this.element.setAttribute("unit", unit);
        this.element.textContent = value;
    };
    var _a, _ValueTooltip_CLASS_NAME;
    _a = ValueTooltip;
    // DO NOT INLINE: This sheet needs to be initialized upfront to be copied over to new documents
    _ValueTooltip_CLASS_NAME = { value: lib_dom_1.Html.adoptStyleSheet(ValueTooltip_sass_inline_1.default, "ValueTooltip") };
    return ValueTooltip;
}(AbstractTooltip_ts_1.AbstractTooltip));
exports.ValueTooltip = ValueTooltip;
