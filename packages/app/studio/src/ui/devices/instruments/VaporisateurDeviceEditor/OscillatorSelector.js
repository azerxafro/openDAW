"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OscillatorSelector = void 0;
var OscillatorSelector_sass_inline_1 = require("./OscillatorSelector.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(OscillatorSelector_sass_inline_1.default, "OscillatorSelector");
var OscillatorSelector = function (_a) {
    var lifecycle = _a.lifecycle, oscIndex = _a.oscIndex;
    var labels = ["A", "B"];
    return (<div className={className}>
            {(function () {
            var elements = labels.map(function (label, index) { return (<span onclick={function () { return oscIndex.setValue(index); }}>{label}</span>); });
            lifecycle.own(oscIndex.catchupAndSubscribe(function (owner) {
                return elements.forEach(function (element, index) {
                    return element.classList.toggle("active", index === owner.getValue());
                });
            }));
            return elements;
        })()}
        </div>);
};
exports.OscillatorSelector = OscillatorSelector;
