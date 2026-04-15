"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleConfigurator = void 0;
var ScaleConfigurator_sass_inline_1 = require("./ScaleConfigurator.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ScaleConfigurator_sass_inline_1.default, "ScaleConfigurator");
var ScaleConfigurator = function (_a) {
    var lifecycle = _a.lifecycle, scale = _a.scale;
    var buttons = lib_std_1.Arrays.create(function (index) { return (<div onclick={function () { return scale.toggle(index); }}/>); }, 12);
    var updater = function () { return buttons.forEach(function (button, index) { return button.classList.toggle("active", scale.getBit(index)); }); };
    lifecycle.own(scale.subscribe(updater));
    updater();
    return (<div className={className}>{buttons}</div>);
};
exports.ScaleConfigurator = ScaleConfigurator;
