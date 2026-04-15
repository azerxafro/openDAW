"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonCheckboxRadio = void 0;
var ButtonCheckboxRadio_sass_inline_1 = require("./ButtonCheckboxRadio.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var TextTooltip_tsx_1 = require("@/ui/surface/TextTooltip.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ButtonCheckboxRadio_sass_inline_1.default, "ButtonCheckboxRadio");
var ButtonCheckboxRadio = function (_a, children) {
    var lifecycle = _a.lifecycle, dataClass = _a.dataClass, style = _a.style, externalClassName = _a.className, appearance = _a.appearance, onInit = _a.onInit;
    var wrapper = (<div className={lib_dom_1.Html.buildClassList(className, (appearance === null || appearance === void 0 ? void 0 : appearance.framed) && "framed", (appearance === null || appearance === void 0 ? void 0 : appearance.landscape) && "landscape", externalClassName)} onInit={onInit} data-class={dataClass} onpointerdown={function (event) {
            var _a;
            (_a = self.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
            event.preventDefault();
            event.stopPropagation();
        }}>
            {children}
        </div>);
    if (appearance === null || appearance === void 0 ? void 0 : appearance.tooltip) {
        lifecycle.own(TextTooltip_tsx_1.TextTooltip.simple(wrapper, function () {
            var _a;
            var _b = wrapper.getBoundingClientRect(), left = _b.left, bottom = _b.bottom;
            return {
                clientX: left,
                clientY: bottom + 8,
                text: (_a = appearance.tooltip) !== null && _a !== void 0 ? _a : ""
            };
        }));
    }
    if ((0, lib_std_1.isDefined)(appearance === null || appearance === void 0 ? void 0 : appearance.color)) {
        wrapper.style.setProperty("--color", appearance.color.toString());
    }
    if ((0, lib_std_1.isDefined)(appearance === null || appearance === void 0 ? void 0 : appearance.activeColor)) {
        wrapper.style.setProperty("--color-active", appearance.activeColor.toString());
    }
    if ((0, lib_std_1.isDefined)(style)) {
        Object.assign(wrapper.style, style);
    }
    return wrapper;
};
exports.ButtonCheckboxRadio = ButtonCheckboxRadio;
