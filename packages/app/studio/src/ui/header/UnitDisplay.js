"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitDisplay = void 0;
var UnitDisplay_sass_inline_1 = require("./UnitDisplay.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(UnitDisplay_sass_inline_1.default, "UnitDisplay");
var UnitDisplay = function (_a) {
    var lifecycle = _a.lifecycle, name = _a.name, value = _a.value, numChars = _a.numChars, onInit = _a.onInit;
    return (<div className={className} style={{ flex: "0 0 ".concat(numChars !== null && numChars !== void 0 ? numChars : 2, "ch") }} onInit={onInit}>
            <div onInit={function (element) { return lifecycle.own(value.catchupAndSubscribe(function (owner) { return element.textContent = owner.getValue(); })); }}/>
            <div>{name}</div>
        </div>);
};
exports.UnitDisplay = UnitDisplay;
