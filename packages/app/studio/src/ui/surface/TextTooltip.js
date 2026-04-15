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
exports.TextTooltip = void 0;
var TextTooltip_sass_inline_1 = require("./TextTooltip.sass?inline");
var Surface_1 = require("./Surface");
var lib_std_1 = require("@opendaw/lib-std");
var AbstractTooltip_ts_1 = require("@/ui/surface/AbstractTooltip.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextTooltip = /** @class */ (function (_super) {
    __extends(TextTooltip, _super);
    function TextTooltip(surface) {
        return _super.call(this, surface) || this;
    }
    TextTooltip.simple = function (element, provider) {
        var _this = this;
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(element, "pointerdown", function () {
            if (!_this.enabled) {
                return;
            }
            var surface = Surface_1.Surface.get(element);
            surface.textTooltip.show(provider);
            lib_dom_1.Events.subscribe(element, "pointerleave", function () { return surface.textTooltip.hide(); }, { once: true });
        }, { capture: true }), lib_dom_1.Events.subscribe(element, "pointerover", function () {
            if (!_this.enabled) {
                return;
            }
            var surface = Surface_1.Surface.get(element);
            surface.textTooltip.show(provider);
            lib_dom_1.Events.subscribe(element, "pointerleave", function () { return surface.textTooltip.hide(); }, { once: true });
        }, { capture: true }), lib_std_1.Terminable.create(function () { return Surface_1.Surface.get(element).textTooltip.forceHide(); }));
    };
    TextTooltip.default = function (element, provider) {
        return this.simple(element, function () {
            var clientRect = element.getBoundingClientRect();
            return {
                clientX: clientRect.left,
                clientY: clientRect.bottom + 8,
                text: provider()
            };
        });
    };
    TextTooltip.prototype.createElement = function () { return (<div className={__classPrivateFieldGet(_a, _a, "f", _TextTooltip_CLASS_NAME)}/>); };
    TextTooltip.prototype.showDelayInFrames = function () { return 45; };
    TextTooltip.prototype.hideDelayInFrames = function () { return 15; };
    TextTooltip.prototype.update = function (_b) {
        var text = _b.text;
        this.element.textContent = (0, lib_std_1.getOrProvide)(text);
    };
    var _a, _TextTooltip_CLASS_NAME;
    _a = TextTooltip;
    TextTooltip.enabled = true;
    // DO NOT INLINE: This sheet needs to be initialized upfront to be copied over to new documents
    _TextTooltip_CLASS_NAME = { value: lib_dom_1.Html.adoptStyleSheet(TextTooltip_sass_inline_1.default, "TextTooltip") };
    return TextTooltip;
}(AbstractTooltip_ts_1.AbstractTooltip));
exports.TextTooltip = TextTooltip;
